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
        orderState: PropTypes.number,
        showReceiveBtn: PropTypes.bool,
        showCancelBtn: PropTypes.bool,
        showDelBtn: PropTypes.bool,
        showEvaluateBtn: PropTypes.bool,
        showPayBtn: PropTypes.bool,
        showLogisticsBtn: PropTypes.bool,
    };
    static defaultProps = {
        orderInfo: null,
        orderState: null,
        showReceiveBtn: null,
        showCancelBtn: null,
        showEvaluateBtn: false,
        showPayBtn: false,
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
        return <View className="order-footer-action">
            <View className="footer">
                <View className="left">
                    <!--<block wx:if="{{showDelBtn === true}}">-->
                    <!--<View class="del-action">删除订单</View>-->
                    <!--</block>-->
                </View>
                <View className="right">
                    <block wx:if="{{showCancelBtn === true}}">
                        <order-button text="取消订单" bind:click="onCancel"></order-button>
                    </block>
                    <block wx:if="{{showPayBtn === true}}">
                        <order-button text="去支付" type="danger" bind:click="onPay"></order-button>
                    </block>
                    <block wx:if="{{showReceiveBtn === true}}">
                        <order-button text="确认收货" type="danger" bind:click="onReceive"></order-button>
                    </block>
                    <block wx:if="{{showEvaluateBtn === true}}">
                        <order-button text="评价" bind:click="onEvaluate"></order-button>
                    </block>
                    <!--<block wx:if="{{showLogisticsBtn === true}}">-->
                    <!--<order-button text="查看物流">查看物流</order-button>-->
                    <!--</block>-->
                </View>
            </View>
        </View>

    }
}
