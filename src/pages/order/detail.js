import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import fa from '../../utils/fa'
import OrderModel from '../../models/order'
import BuyModel from "../../models/buy";

const orderModel = new OrderModel()
const buyModel = new BuyModel()
const Dialog = require('../../../ui/dialog/dialog');
import React, { Component } from 'react';

export default class Index extends Component {
    state = {
        id: null,
        orderInfo: null,
        orderLog: null,
    }

    async componentWillMount({ id }) {
        this.setState({
            id
        })
    }

    onRefund(e) {
        const orderInfo = this.state.orderInfo
        const { goodsInfo } = e.detail
        // 根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
        if (orderInfo.state === 20) {
            // 直接跳转到申请发货
            wx.navigateTo({
                url: `/pages/refund/serviceApply/index?order_goods_id=${goodsInfo.id}&refund_type=1`,
                delta: 1
            })

        } else if (orderInfo.state === 30 || orderInfo.state === 40) {
            // 选择是退款还是退款并退货
            wx.navigateTo({
                url: `/pages/refund/serviceType/index?order_goods_id=${goodsInfo.id}`,
            })
        }
    }

    onRefundDetail(e) {
        const { goodsInfo } = e.detail
        wx.navigateTo({
            url: `/pages/refund/detail/index?id=${goodsInfo.refund_id}`,
        })
    }

    async onShow() {
        this.init()
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

    onGoodsDetail(e) {
        const { goodsInfo } = e.detail
        wx.navigateTo({
            url: `/pages/goods/detail/index?id=${goodsInfo.goods_id}`,
        })
    }

    async onCancel(e) {
        const orderInfo = e.detail.orderInfo
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

    onEvaluate(e) {
        const orderInfo = e.detail.orderInfo
        wx.navigateTo({
            url: '/pages/evaluate/list/index?order_id=' + orderInfo.id
        })
    }

    async onReceive(e) {
        Dialog({
            message: '您确认收货吗？状态修改后不能变更',
            selector: '#fa-dialog-receive',
            buttons: [{
                text: '取消',
                type: 'cancel'
            }, {
                text: '确认',
                color: 'red',
                type: 'ok'
            }]
        }).then(async ({ type }) => {
            if (type === 'ok') {
                const orderInfo = e.detail.orderInfo
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
        })
    }

    async onPay() {
        const userInfo = fa.cache.get('user_info')
        const orderInfo = this.state.orderInfo
        const self = this
        // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
        const payResult = await buyModel.pay({
            'order_type': 'goods_buy',
            'pay_sn': orderInfo.pay_sn,
            'payment_code': 'wechat',
            'payment_channel': 'wechat_mini',
            'openid': userInfo.wechat_mini_openid
        })
        if (payResult) {
            wx.requestPayment({
                'timeStamp': payResult.timeStamp,
                'nonceStr': payResult.nonceStr,
                'package': payResult.package,
                'signType': payResult.signType,
                'paySign': payResult.paySign,
                'success': function () {
                    self.init()
                    self.updateListRow()
                },
                'fail': function (res) {
                    fa.toast.show({
                        title: res
                    })
                }
            })
        } else {
            fa.toast.show({
                title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
            })
        }
    }

    updateListRow() {
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        return <View>
            <View style="background-color:#F8F8F8;display: block;overflow: hidden" wx:if="{{orderInfo}}">
                <List>
                    <OrderStateCard
                        orderState="{{orderInfo.state}}"
                        expireSeconds="1000"
                        cost="{{orderInfo.amount}}"
                    />
                    <OrderAddress
                        name="{{orderInfo.extend_order_extend.reciver_name}}"
                        phone="{{orderInfo.extend_order_extend.receiver_phone}}"
                        address="{{orderInfo.extend_order_extend.reciver_name}}"
                    />
                </List>

                <List>
                    <OrderGoodsList
                        orderInfo="{{orderInfo}}"
                        goodsList="{{orderInfo.extend_order_goods}}"
                        bind:goods-detail="onGoodsDetail"
                        bind:goods-refund-click="onRefund"
                        bind:goods-refund-detail="onRefundDetail"
                    />
                    <OrderContact number="{{serviceNumber}}" />
                </List>
                <List>
                    <OrderBaseInfo
                        orderInfo="{{orderInfo}}"
                        orderNumber="{{orderInfo.sn}}"
                        createTime="{{orderInfo.create_time}}"
                        payment="微信支付"
                        payTime="{{orderInfo.payment_time}}"
                    />
                </List>
                <List>
                    <OrderCostList
                        goodsTotal="{{orderInfo.goods_amount}}"
                        freight="{{orderInfo.freight_fee}}"
                        totalCost="{{orderInfo.amount}}" />
                    <OrderFooterAction
                        orderInfo="{{orderInfo}}"
                        orderState="{{orderInfo.state}}"
                        showDelBtn={false}
                        showEvaluateBtn="{{orderInfo.if_evaluate}}"
                        showPayBtn="{{orderInfo.if_pay}}"
                        showLogisticsBtn="{{orderInfo.showLogisticsBtn}}"
                        showReceiveBtn="{{orderInfo.if_receive}}"
                        onPay="onPay"
                        onReceive="onReceive"
                        onCancel="onCancel"
                        onEvaluate="onEvaluate"
                    />
                </List>
            </View>
            <fa-dialog id="fa-dialog-receive" />

        </View>
    }
}
