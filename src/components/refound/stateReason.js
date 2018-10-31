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
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onUndo() {
        this.triggerEvent('undo', { refundInfo: this.state.refundInfo });
    }

    onTrack() {
        this.triggerEvent('track', { refundInfo: this.state.refundInfo });
    }
    render(){
        return <View className="order-state-reason">
            <block wx:if="{{refundInfo.is_close===0 && refundInfo.handle_state === 0 }}">
                <View className="header">
                    <text className="state">您已经成功发起退款申请，请耐心等待商家处理。</text>
                </View>
                <View className="body">
                    <span>- 商家同意后，请按照给出的退货地址退货，并请记录退货运单号。</span>
                    <span>- 如商家拒绝，您可以修改申请后再次发起，商家会重新处理。</span>
                    <span>- 如商家超时未处理，退货申请将达成，请按系统给出的退货地址退货</span>
                </View>
                <View className="footer">
                    <order-button text="撤销申请" bind:click="onUndo"></order-button>
                    <!--<order-button text="修改申请"></order-button>-->
                </View>
            </block>
            <block
                wx:if="{{refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 }}">
                <View className="body" wx:if="{{refundInfo.tracking_time > 0}}">
                    <View className="order-address">
                        <View className="info">
                            <View className="user">
                                <text className="name">物流公司：{{ refundInfo.tracking_company}}</text>
                            </View>
                            <View className="address">
                                <text className="phone">联系电话：{{ refundInfo.tracking_phone}}</text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="footer" wx:if="{{!refundInfo.tracking_time}}">
                    <order-button text="我已寄出，点击填写物流单号" bind:click="onTrack"></order-button>
                </View>
            </block>
            <block wx:if="{{refundInfo.handle_state === 30}}">
                <View className="refund-success">
                    <View className="refund-info">
                        <View className="item">
                            <label>退款总金额</label>
                            <text>¥{{ refundInfo.refund_amount}}</text>
                        </View>
                        <View className="item">
                            <label>返回支付方</label>
                            <text>¥{{ refundInfo.refund_amount}}</text>
                        </View>
                    </View>
                    <View className="state-steps">
                        <refund-steps refundInfo="{{refundInfo}}" steps="{{steps}}"></refund-steps>
                    </View>
                </View>
            </block>
            <block wx:if="{{refundInfo.handle_state === 51 }}">
                <View className="header">
                    <text className="state">确认收货，自动关闭退款申请</text>
                </View>
            </block>
        </View>
    }
}
