import {
    StyleSheet,
    View,
} from 'react-native';
import fa from '../../utils/fa'
import OrderModel from '../../models/order'
import BuyModel from "../../models/buy";
import React, { Component } from 'react';
import { Modal, List, WhiteSpace } from "antd-mobile-rn";
import {
    OrderStateCard,
    OrderAddress,
    OrderGoodsList,
    OrderBaseInfo,
    OrderCostList,
    OrderFooterAction
} from '../../components'
import * as WeChat from "react-native-wechat";
import { connect } from "react-redux";
import { Toast } from '../../utils/publicFuncitonModule';

const orderModel = new OrderModel()
const buyModel = new BuyModel()

@connect(
    ({ app: { user: {
        login,
        userInfo,
    }}}) => ({
        login,
        userInfo,
    }),
)
export default class OrderDetail extends Component {
    state = {
        id: null,
        orderInfo: null,
        orderLog: null,
    }

    onRefund(goodsInfo) {
        const orderInfo = this.state.orderInfo
        // 根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
        if (orderInfo.state === 20) {
            // 直接跳转到申请发货
            this.props.navigation.navigate('RefundServiceApply', {
                order_goods_id: goodsInfo.id,
                refund_type: 1
            })

        } else if (orderInfo.state === 30 || orderInfo.state === 40) {
            // 选择是退款还是退款并退货
            this.props.navigation.navigate('RefundServiceType', {
                order_goods_id: goodsInfo.id,
            })
        }
    }

    onRefundDetail(goodsInfo) {
        this.props.navigation.navigate('RefundDetail', {
            id: goodsInfo.refund_id,
        })
    }


    componentWillMount() {
        this.setState({
            id: this.props.navigation.getParam('id')
        },()=>{
            console.log('set ok')
            this.props.navigation.addListener(
                'didFocus', async () => {
                    this.init()
                }
            );
        })

    }

    async init() {
        const result = await orderModel.detail({ id: this.state.id })
        if (result) {
            this.setState({
                orderInfo: result.info,
                orderLog: result.order_log
            })
        }
    }

    onGoodsDetail(goodsInfo) {
        this.props.navigation.navigate('GoodsDetail', {
            id: goodsInfo.goods_id,
        })
    }

    async onCancel() {
        const { orderInfo } = this.state
        const result = await orderModel.cancel({
            'id': orderInfo.id,
        })
        if (result) {
            this.init()
            this.updateListRow(orderInfo.id)
        } else {
            fa.toast.show({
                title: fa.code.parse(orderModel.getException().getCode())
            })
        }
    }

    onEvaluate() {
        const { orderInfo } = this.state
        this.props.navigation.navigate('EvaluateList', {
            order_id: orderInfo.id,
        })
    }

    async onReceive() {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => async () => {
                    const { orderInfo } = this.state
                    const result = await orderModel.confirmReceipt({
                        'id': orderInfo.id,
                    })
                    if (result) {
                        this.init()
                        this.updateListRow(orderInfo.id)
                    } else {
                        fa.toast.show({
                            title: fa.code.parse(orderModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }
    async onPay() {
        const { userInfo } = this.props
        const { orderInfo } = this.state;
        const payResult = await buyModel.pay({
            'order_type': 'goods_buy',
            'pay_sn': orderInfo.pay_sn,
            'payment_code': 'wechat',
            'openid': userInfo.wechat_openid,
            payment_channel: 'wechat_app'
        })
        if (payResult) {
            // todo
            const payOptions = {
                partnerId: `${payResult.partnerid}`,
                prepayId: `${payResult.prepayid}`,
                nonceStr: `${payResult.noncestr}`,
                timeStamp: `${payResult.timestamp}`,
                package: `${payResult.packagestr}`,
                sign: `${payResult.sign}`
            };
            try {
                const a = await WeChat.pay(payOptions)
                // this.paySuccess()
                Toast.info('支付成功');
            } catch (e) {
                Toast.warn('支付失败');
            }
        } else {
            Toast.warn('支付失败');
        }
    }

    updateListRow = () =>{
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        const { orderInfo } = this.state
        return orderInfo ? <View>
            <View style={styles.main}>
                <View style={styles.item}>
                    <OrderStateCard
                        orderState={orderInfo.state}
                        expireSeconds={1000}
                        cost={orderInfo.amount}
                    />

                    <OrderAddress
                        name={orderInfo.extend_order_extend.reciver_name}
                        phone={orderInfo.extend_order_extend.receiver_phone}
                        address={orderInfo.extend_order_extend.reciver_name}
                    />
                    <WhiteSpace size="sm" />
                </View>

                <View style={styles.item}>
                    <OrderGoodsList
                        orderInfo={orderInfo}
                        goodsList={orderInfo.extend_order_goods}
                        onGoodsDetail={({ goodsInfo }) => {
                            this.onGoodsDetail(goodsInfo)
                        }}
                        onRefund={({ goodsInfo }) => {
                            this.onRefund(goodsInfo)
                        }}
                        onRefundDetail={({ goodsInfo }) => {
                            this.onRefundDetail(goodsInfo)
                        }}
                    />
                    <WhiteSpace size="sm" />
                </View>
                <View style={styles.item}>
                    <OrderBaseInfo
                        orderInfo={orderInfo}
                        orderNumber={orderInfo.sn}
                        createTime={orderInfo.create_time}
                        payment="微信支付"
                        payTime={orderInfo.payment_time}
                    />
                    <WhiteSpace size="sm" />
                </View>
                <View style={styles.item}>
                    <OrderCostList
                        goodsTotal={orderInfo.goods_amount}
                        freight={orderInfo.freight_fee}
                        totalCost={orderInfo.amount} />
                    <OrderFooterAction
                        orderInfo={orderInfo}
                        orderState={orderInfo.state}
                        showDelBtn={false}
                        showEvaluateBtn={orderInfo.if_evaluate}
                        showPayBtn={orderInfo.if_pay}
                        showLogisticsBtn={orderInfo.showLogisticsBtn}
                        showReceiveBtn={orderInfo.if_receive}
                        onPay={() => {
                            this.onPay()
                        }}
                        onReceive={() => {
                            this.onReceive()
                        }}
                        onCancel={() => {
                            this.onCancel()
                        }}
                        onEvaluate={() => {
                            this.onEvaluate()
                        }}
                    />
                </View>
            </View>
        </View> : null
    }
}
const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f8f8f8',
    },
    item: {}
})
