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
        state: PropTypes.number,
        sn: PropTypes.string,
    };
    static defaultProps = {
        orderInfo: null,
        orderId: null,
        state: null,
        sn: null,
    };

    onDelete() {
        this.triggerEvent('delete');
    }

    onClick(e) {
        this.triggerEvent('click', { orderId: this.state.orderId });
    }

    onPay() {
        this.triggerEvent('pay', { orderInfo: this.state.orderInfo });
    }
    render(){
        return <View className="order-card-header">
            <View className="left">
                <text>单号：{{ sn }}</text>
            </View>
            <View className="right">
                <block wx:if="{{state === 0}}">
                    <span className="state state-0">已取消</span>
                </block>
                <block wx:if="{{state === 10}}">
                    <span className="state state-10">等待付款</span>
                    <!--<image class="del-icon" src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg" mode="scaleToFill"></image>-->
                </block>
                <block wx:if="{{state === 20}}">
                    <span className="state state-20">待发货</span>
                </block>
                <block wx:if="{{state === 30}}">
                    <span className="state state-30">已发货</span>
                </block>
                <block wx:if="{{state === 40}}">
                    <span className="state state-40">已完成</span>
                </block>
            </View>
        </View>


    }
}
