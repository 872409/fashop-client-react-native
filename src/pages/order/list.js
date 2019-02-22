import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Modal } from "antd-mobile-rn";
import { PublicStyles, ThemeStyle, windowWidth } from '../../utils/style';
import { OrderCard, OrderCardHeader, OrderCardGoods, OrderCardFooter } from '../../components'
import FlatList from "../../components/flatList";
import { OrderApi } from "../../config/api/order";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import { connect } from 'react-redux';

@connect()
export default class OrderList extends Component {

    goDetail(id) {
        this.props.navigation.navigate('OrderDetail', { id })
    }

    async onCancel(orderInfo) {
        Modal.alert('您确认取消吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => {
                    this.props.dispatch({
                        type: "order/cancel",
                        payload: {
                            id: orderInfo.id
                        },
                        callback: () => this.updateListRow(orderInfo.id)
                    })
                }
            }
        ])

    }

    onEvaluate() {
        const { navigation } = this.props
        navigation.navigate('EvaluateList')
    }

    async onReceive(orderInfo) {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: async () => {
                    this.props.dispatch({
                        type: "order/confirmReceipt",
                        payload: {
                            id: orderInfo.id
                        },
                        callback: () => this.updateListRow(orderInfo.id)
                    })
                }
            }
        ])
    }

    async onPay(orderInfo) {
        this.props.navigation.navigate('Pay',{ 
            orderInfo,
            pay_amount: parseFloat(orderInfo.amount)
        })
    }

    async onLogistics(orderInfo) {
        const { dispatch, navigation } = this.props
        dispatch({
            type: "order/logistics",
            payload: {
                id: orderInfo.id
            },
            callback: () => navigation.navigate('PublicWebView', {
                title: '物流信息',
                url: e.info.url
            })
        })
    }

    updateListRow = async (id) => {
        this.FlatList.manuallyRefresh()
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
        const { navigation } = this.props
        const { state_type } = navigation.state.params || {}
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
                                borderWidth: 0.5,
                                borderColor: '#eaeaea'
                            }}
                            tabStyle={{ paddingBottom: 0 }}
                        />
                    }
                    tabBarActiveTextColor={ThemeStyle.ThemeColor}
                    tabBarInactiveTextColor='#666'
                    tabBarUnderlineStyle={{
                        width: windowWidth * 0.5 / 4,
                        left: windowWidth / 28,
                        backgroundColor: `${ThemeStyle.ThemeColor}`,
                        height: 3,
                        borderRadius: 4,
                    }}
                    tabBarTextStyle={{}}
                    onChangeTab={({ i }) => {
                        this.FlatList.setFetchParams({
                            state_type: i===0 ? null : tabList[i].state_type,
                        })
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
                <FlatList
                    ref={e => this.FlatList = e}
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
                                showLogisticsBtn={item.state === 30 || item.state === 40}
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
                                onLogistics={() => {
                                    this.onLogistics(item)
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
