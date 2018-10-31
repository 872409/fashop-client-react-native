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
        orderState: PropTypes.number,
        expireSeconds: PropTypes.number,
        cost: PropTypes.number,
    };
    static defaultProps = {
        orderState: null,
        expireSeconds: null,
        cost: null,
    };

    ready() {
        this.setData({
            timeText: this.toHourMinute(this.state.expireSeconds)
        })
    }

    // 将分钟数量转换为小时和分钟字符串
    toHourMinute(seconds) {
        return (Math.floor(seconds / 3600) + "小时" + Math.floor(seconds % 3600 / 60) + "分");
    }
    render(){
        return <View>
            <block wx:if="{{orderState === 40}}">
                <View className="noticebar">
                    <image src="/themes/default/order/horn.png" mode="widthFix"></image>
                    <text>为了您的财产安全，不要点击陌生链接、不要向任何人透露银行卡或验证码信息、谨防诈骗！</text>
                </View>
            </block>
            <View className="order-state-card">
                <block wx:if="{{orderState === 10}}">
                    <View className="left">
                        <image src="/themes/default/order/order-state-wait.png" mode="scaleToFill" />
                        <text className="state">待付款</text>
                    </View>
                    <View className="right">
                        <!--<text>剩余：{{timeText}}</text>-->
                        <label>需付款：¥{{ cost }}</label>
                    </View>
                </block>
                <block wx:elif="{{orderState === 20}}">
                    <View className="left">
                        <image src="/themes/default/order/order-state-wait.png" mode="scaleToFill" />
                        <text className="state">待发货</text>
                    </View>
                    <View className="right">
                    </View>
                </block>
                <block wx:elif="{{orderState === 30}}">
                    <View className="left">
                        <image src="/themes/default/order/order-state-wait.png" mode="scaleToFill" />
                        <text className="state">待收货</text>
                    </View>
                    <View className="right">
                        <!--<text>圆通快递</text>-->
                        <!--<label>预计5月18日送达</label>-->
                    </View>
                </block>
                <block wx:elif="{{orderState === 40}}">
                    <View className="left">
                        <image src="/themes/default/order/order-state-success.png" mode="scaleToFill" />
                        <text className="state">完成</text>
                    </View>
                    <View className="right">
                    </View>
                </block>
            </View>
        </View>
    }
}
