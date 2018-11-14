import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import fa from '../../utils/fa'
import OrderModel from '../../models/order'
import BuyModel from '../../models/buy'
import { Modal } from "antd-mobile-rn";
import { PublicStyles, ThemeStyle } from '../../utils/publicStyleModule';
import { OrderCard, OrderCardHeader, OrderCardGoods, OrderCardFooter } from '../../components'
import { ListEmptyView, ListView } from "../../utils/publicViewModule";
import { windowHeight } from "../../utils/publicStyleModule";
import { OrderApi } from "../../config/api/order";
import { DefaultTabBar } from "react-native-scrollable-tab-view";
import ScrollableTabView from "react-native-scrollable-tab-view";
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
export default class OrderList extends Component {
    state = {
        state_type: null,
    }

    async componentWillMount() {
        const state_type = this.props.navigation.getParam('state_type')
        if(state_type){
            this.setState({
                state_type
            })
        }
    }

    goDetail(id) {
        this.props.navigation.navigate('OrderDetail', { id })
    }


    async onCancel(e) {
        const orderInfo = e.detail.orderInfo
        const result = await orderModel.cancel({
            'id': orderInfo.id,
        })
        if (result) {
            this.getList()
        } else {
            fa.toast.show({
                title: fa.code.parse(orderModel.getException().getCode())
            })
        }
    }


    onEvaluate(e) {
        // todo e
        const orderInfo = e.detail.orderInfo
        this.props.navigation.navigate('OrderDetail', { order_id: orderInfo.id })

    }

    async onReceive(e) {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => async () => {
                    const orderInfo = e.detail.orderInfo
                    const result = await orderModel.confirmReceipt({
                        'id': orderInfo.id,
                    })
                    if (result) {
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
    async onPay(orderInfo) {
        const { userInfo } = this.props
        // 支付渠道 "wechat"  "wechat_mini" "wechat_app"
        const payResult = await buyModel.pay({
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'wechat',
            openid: 'oy0Ue1N9xdbCCdSByzCNj8VjLBNM',
            // openid: userInfo.wechat_openid,
            payment_channel: 'wechat_app'
        })
        if (payResult) {
            // todo
            const payOptions = {
                partnerId: `${payResult.partnerid}`,     // 商家向财付通申请的商家id
                prepayId: `${payResult.prepayid}`,     // 预支付订单
                nonceStr: `${payResult.noncestr}`,     // 随机串，防重发
                timeStamp: `${payResult.timestamp}`,     // 时间戳，防重发
                package: `${payResult.packagestr}`,     // 商家根据财付通文档填写的数据和签名
                sign: `${payResult.sign}`     // 商家根据微信开放平台文档对数据做的签名
            };
            try {
                const a = await WeChat.pay(payOptions)
                // this.paySuccess()
                Toast.info('支付成功');
            } catch (err) {
                console.log(err)
                Toast.warn('支付失败1');
            }
        } else {
            Toast.warn('支付失败2');
        }
    }

    // 更新某条
     updateListRow = async(id) => {
        // todo
        let { list } = this.state
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await orderModel.list(requestParam)
            if (result) {
                if (result.list.length === 0) {
                    list = list.splice(listIndex, 1)
                } else {
                    list[listIndex] = result.list[0]
                }
                this.setState({ list })
            }
        }
    }

    render() {
        const tabList = [
            {
                state_type: 'all',
                tabLabel: '全部'
            },
            {
                state_type: 'state_new',
                tabLabel: '待付款'
            },
            {
                state_type: 'state_pay',
                tabLabel: '待发货'
            },
            {
                state_type: 'state_send',
                tabLabel: '待收货'
            },
            {
                state_type: 'state_success',
                tabLabel: '已完成'
            }
        ]
        const { state_type } = this.state
        let params = {}
        if (state_type) {
            params['state_type'] = params
        }
        return (
            <View style={[PublicStyles.ViewMax]}>
                <ScrollableTabView
                    style={{ backgroundColor: '#fff', flex: 0 }}
                    initialPage={0}
                    renderTabBar={() =>
                        <DefaultTabBar
                            style={{
                                borderWidth: 0,
                                borderColor: 'rgba(0,0,0,0)'
                            }}
                            tabStyle={{ paddingBottom: 0 }}
                        />
                    }
                    tabBarActiveTextColor={ThemeStyle.ThemeColor}
                    tabBarInactiveTextColor='#666'
                    tabBarUnderlineStyle={{
                        backgroundColor: `${ThemeStyle.ThemeColor}`,
                        height: 3,
                        borderRadius: 4,
                    }}
                    tabBarTextStyle={{}}
                    onChangeTab={({ i }) => {
                        if (i === 0) {
                            this.ListView.setFetchParams({
                                state_type: null,
                            })
                        } else if (i === 1) {
                            this.ListView.setFetchParams({
                                state_type: 'state_new',
                            })
                        } else if (i === 2) {
                            this.ListView.setFetchParams({
                                state_type: 'state_pay',
                            })
                        } else if (i === 3) {
                            this.ListView.setFetchParams({
                                state_type: 'state_send',
                            })
                        } else if (i === 4) {
                            this.ListView.setFetchParams({
                                state_type: 'state_success',
                            })
                        }
                    }}
                >
                    {
                        tabList.map((item, index) => (
                            <View
                                key={index}
                                tabLabel={item.tabLabel}
                            />
                        ))
                    }
                </ScrollableTabView>
                <ListView
                    ref={e => this.ListView = e}
                    keyExtractor={e => String(e.id)}
                    api={OrderApi.list}
                    fetchParams={params}
                    renderItem={({ item }) => (
                        <OrderCard key={`card_${item.id}`}>
                            <OrderCardHeader
                                orderId={item.id}
                                state={item.state}
                                sn={item.sn}
                            />
                            <OrderCardGoods
                                orderId={item.id}
                                goodsList={item.extend_order_goods}
                                onClick={() => {
                                    this.goDetail(item.id)
                                }}
                            />
                            <OrderCardFooter
                                orderInfo={item}
                                orderId={item.id}
                                goodsNumber={item.goods_num}
                                totalCost={parseFloat(item.amount)}
                                showEvaluateBtn={item.if_evaluate}
                                showPayBtn={item.if_pay}
                                showReceiveBtn={item.if_receive}
                                showLogisticsBtn={item.showLogisticsBtn}
                                showCancelBtn={item.if_cancel}
                                onPay={() => {
                                    this.onPay(item)
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
                        </OrderCard>
                    )}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({})
