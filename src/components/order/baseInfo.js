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
        orderNumber: PropTypes.number,
        createTime: PropTypes.number,
        payTime: PropTypes.number,
        payment: PropTypes.string,
    };
    static defaultProps = {
        orderInfo: null,
        orderNumber: null,
        createTime: null,
        payTime: null,
        payment: null,
    };
    setClipboardData() {
        wx.setClipboardData({
            data: `${this.state.orderNumber}`
        })
    }
    render(){
        return <View className="order-base-info" wx:if="{{orderInfo}}">
            <View className="item">
                <View className="row">
                    <label>订单编号：</label>
                    <text>{{ orderNumber }}</text>
                    <order-button text="复制" size="small" bind:click="setClipboardData"></order-button>
                </View>
                <View className="row">
                    <label>下单时间：</label>
                    <time-format className="time" value="{{orderInfo.create_time}}" />
                </View>
            </View>
            <View className="item" wx:if="{{payTime > 0}}">
                <View className="row">
                    <label>支付方式：</label>
                    <text>{{ payment }}</text>
                </View>
                <View className="row">
                    <label>支付时间：</label>
                    <time-format className="time" value="{{payTime}}" />
                </View>
            </View>
        </View>
    }
}
