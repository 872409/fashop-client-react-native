import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import React, { Component } from 'react';
import { Modal, WhiteSpace, Toast } from "antd-mobile-rn";
import {
    OrderStateCard,
    OrderAddress,
    OrderGoodsList,
    OrderBaseInfo,
    OrderCostList,
    OrderFooterAction
} from '../../components'
import { connect } from 'react-redux';
import { PublicStyles } from '../../utils/style';

@connect(({ order })=>({
    orderInfo: order.info.result.info,
    orderLog: order.info.result.order_log,
}))
export default class OrderDetail extends Component {

    onRefund = (goodsInfo) => {
        const { orderInfo } = this.props
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

    onRefundDetail = (goodsInfo) => {
        this.props.navigation.navigate('RefundDetail', {
            id: goodsInfo.refund_id,
        })
    }


    componentWillMount() {
        this.props.navigation.addListener(
            'didFocus', this.init
        );

    }

    init = () => {
        const { navigation, dispatch } = this.props
        const { id } = navigation.state.params
        dispatch({
            type: 'order/info',
            payload: {
                id
            }
        })
    }

    onGoodsDetail = (goodsInfo) => {
        this.props.navigation.navigate('GoodsDetail', {
            id: goodsInfo.goods_id,
        })
    }

    onCancel = () => {
        Modal.alert('您确认取消吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => {
                    const { orderInfo: { id }, dispatch } = this.props
                    dispatch({
                        type: 'order/cancel',
                        payload: {
                            id
                        },
                        callback: ()=>{
                            this.init()
                            this.updateListRow(id)
                        }
                    })
                }
            }
        ])
    }

    onEvaluate = () => {
        const { navigation } = this.props
        navigation.navigate('EvaluateList')
    }
    
    onLogistics = () => {
        const { orderInfo: { id }, dispatch, navigation } = this.props
        dispatch({
            type: 'order/logistics',
            payload: {
                id
            },
            callback: (e)=>{
                if(e){
                    navigation.navigate('PublicWebView', {
                        title: '物流信息',
                        url: e.result.info.url
                    })
                }else{
                    Toast.info('获取物流信息失败！')
                }
            }
        })
    }

    onReceive = () => {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => {
                    const { orderInfo: { id }, dispatch } = this.props
                    dispatch({
                        type: 'order/logistics',
                        payload: {
                            id
                        },
                        callback: () => {
                            this.init()
                            this.updateListRow(id)
                        }
                    })
                }
            }
        ])
    }

    onPay = () => {
        const { orderInfo } = this.props;
        this.props.navigation.navigate('Pay', {
            orderInfo,
            pay_amount: parseFloat(orderInfo.amount)
        })
    }

    updateListRow = () => {
        const { navigation } = this.props
        const { id, updateListRow } = navigation.state.params
        navigation.dispatch(StackActions.pop({ n: 1 }));
        if (typeof updateListRow === 'function') {
            updateListRow(id)
        }
    }


    render() {
        const { orderInfo } = this.props
        const showLogisticsBtn = orderInfo ? orderInfo.state === 30 || orderInfo.state === 40 : false
        const showEvaluateBtn = orderInfo ? orderInfo.if_evaluate : false
        const showReceiveBtn = orderInfo ? orderInfo.if_receive : false
        const showCancelBtn = orderInfo ? orderInfo.if_cancel : false
        return orderInfo ? <View style={PublicStyles.ViewMax}>
            <ScrollView>
                <OrderStateCard
                    orderState={orderInfo.state}
                    expireSeconds={1000}
                    cost={orderInfo.amount}
                />

                <OrderAddress
                    name={orderInfo.extend_order_extend.reciver_name}
                    phone={orderInfo.extend_order_extend.receiver_phone}
                    address={`${orderInfo.extend_order_extend.reciver_info.combine_detail} ${orderInfo.extend_order_extend.reciver_info.address}`}
                />
                <WhiteSpace size="sm" />

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
                <OrderBaseInfo
                    orderInfo={orderInfo}
                    orderNumber={orderInfo.sn}
                    createTime={orderInfo.create_time}
                    payment="微信支付"
                    payTime={orderInfo.payment_time}
                />
                <WhiteSpace size="sm" />
                <OrderCostList
                    goodsTotal={orderInfo.goods_amount}
                    freight={orderInfo.freight_fee}
                    totalCost={orderInfo.amount} 
                    totalText={
                        showCancelBtn ? '需付款' : (showLogisticsBtn || showEvaluateBtn || showReceiveBtn) ? '实付款' : '应付款'
                    }
                />
            </ScrollView>
            <OrderFooterAction
                orderInfo={orderInfo}
                orderState={orderInfo.state}
                showDelBtn={false}
                showEvaluateBtn={showEvaluateBtn}
                showPayBtn={orderInfo.if_pay}
                showCancelBtn={showCancelBtn}
                showLogisticsBtn={showLogisticsBtn}
                showReceiveBtn={showReceiveBtn}
                onPay={this.pay}
                onReceive={this.onReceive}
                onCancel={this.onCancel}
                onEvaluate={this.onEvaluate}
                onLogistics={this.onLogistics}
            />
        </View> : null
    }
}
const styles = StyleSheet.create({
})
