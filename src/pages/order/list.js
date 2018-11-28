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
import { PublicStyles, ThemeStyle } from '../../utils/style';
import { OrderCard, OrderCardHeader, OrderCardGoods, OrderCardFooter } from '../../components'
import { ListView } from "../../utils/view";
import { OrderApi } from "../../config/api/order";
import { DefaultTabBar } from "react-native-scrollable-tab-view";
import ScrollableTabView from "react-native-scrollable-tab-view";
import * as WeChat from "react-native-wechat";
import { connect } from "react-redux";
import { Toast } from '../../utils/function';

const orderModel = new OrderModel()
const buyModel = new BuyModel()

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
             }
         }
     }) => ({
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
        if (state_type) {
            this.setState({
                state_type
            })
        }
    }

    goDetail(id) {
        this.props.navigation.navigate('OrderDetail', { id })
    }

    async onCancel(orderInfo) {
        Modal.alert('您确认取消吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: async () => {
                    const result = await orderModel.cancel({
                        'id': orderInfo.id,
                    })
                    if (result === true) {
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

    onEvaluate(orderInfo) {
        this.props.navigation.navigate('OrderDetail', { order_id: orderInfo.id })
    }

    async onReceive(orderInfo) {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: async () => {
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
        console.log(userInfo);
        const payResult = await buyModel.pay({
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'wechat',
            openid: 'oy0Ue1N9xdbCCdSByzCNj8VjLBNM',
            // openid: userInfo.wechat_openid,
            payment_channel: 'wechat_app' // 支付渠道 "wechat"  "wechat_mini" "wechat_app"
        })
        console.log('payResult', payResult);
        // if (payResult) {
            
        //     // todo
        //     const payOptions = {
        //         partnerId: payResult.partnerId, /*商家向财付通申请的商家id*/
        //         prepayId: payResult.prepayId, /*预支付订单*/
        //         nonceStr: payResult.nonceStr, /*随机串，防重发*/
        //         timeStamp: payResult.timeStamp, /*时间戳，防重发*/
        //         package: payResult.package, /*商家根据财付通文档填写的数据和签名*/
        //         sign: payResult.sign, /*商家根据微信开放平台文档对数据做的签名*/
        //     };
        //     try {
        //         const a = await WeChat.pay(payOptions)
        //         // this.paySuccess()
        //         Toast.info('支付成功');
        //     } catch (err) {
        //         console.log(err)
        //         Toast.warn('支付失败1');
        //     }
        // } else {
        //     Toast.warn('支付失败2');
        // }
    }

    updateListRow = async (id) => {
        this.ListView.manuallyRefresh()
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
            params['state_type'] = state_type
        }
        const findResult = tabList.findIndex((row) => row.state_type === state_type)
        const tabIndex = findResult > -1 ? findResult : 0
        return (
            <View style={[PublicStyles.ViewMax]}>
                <ScrollableTabView
                    style={{ backgroundColor: '#fff', flex: 0 }}
                    initialPage={tabIndex}
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
                                    this.onReceive(item)
                                }}
                                onCancel={() => {
                                    this.onCancel(item)
                                }}
                                onEvaluate={() => {
                                    this.onEvaluate(item)
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
