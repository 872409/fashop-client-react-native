import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        orderInfo: PropTypes.object,
        orderId: PropTypes.string,
        goodsNumber: PropTypes.number,
        totalCost: PropTypes.number,
        showEvaluateBtn: PropTypes.bool,
        showPayBtn: PropTypes.bool,
        showReceiveBtn: PropTypes.bool,
        showLogisticsBtn: PropTypes.bool,
    };
    static defaultProps = {
        orderInfo: null,
        orderId: null,
        goodsNumber: null,
        totalCost: null,
        showEvaluateBtn: false,
        showPayBtn: false,
        showReceiveBtn: false,
        showLogisticsBtn: false,
    };

    onClick() {
        this.triggerEvent('click', { orderId: this.state.orderId });
    }

    onCancel() {
        this.triggerEvent('cancel', { orderId: this.state.orderId });
    }

    onReceive() {
        this.triggerEvent('receive', { orderInfo: this.state.orderInfo });
    }

    onPay() {
        this.triggerEvent('pay', { orderInfo: this.state.orderInfo });
    }

    onEvaluate() {
        this.triggerEvent('evaluate', { orderInfo: this.state.orderInfo });
    }
    render(){
        return <View className="order-card-footer">
            <View className="header">
                <text className="number">共{{ goodsNumber }}件商品</text>
                <text className="price-desc">实付款：</text>
                <text className="price">¥{{ totalCost }}</text>
            </View>
            <View className="footer" wx:if="{{showCancelBtn || showEvaluateBtn || showPayBtn || showReceiveBtn}}">
                <block wx:if="{{showCancelBtn === true}}">
                    <View className="btn" onPress={this.onCancel()}>取消</View>
                </block>
                <block wx:if="{{showEvaluateBtn === true}}">
                    <View className="btn btn-danger" onPress={this.onEvaluate()}>评价</View>
                </block>
                <block wx:if="{{showPayBtn === true}}">
                    <View className="btn btn-danger" onPress={this.onPay()}>去支付</View>
                </block>
                <block wx:if="{{showReceiveBtn === true}}">
                    <View className="btn btn-danger" onPress={this.onReceive()}>确认收货</View>
                </block>
                <!--<block wx:if="{{showLogisticsBtn === true}}">-->
                <!--<View class="btn">查看物流</View>-->
                <!--</block>-->
            </View>
        </View>

    }
}
