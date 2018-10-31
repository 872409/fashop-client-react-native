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
        reason: PropTypes.string,
        amount: PropTypes.number,
        num: PropTypes.number,
        createTime: PropTypes.number,
        refundNumber: PropTypes.string
    };
    static defaultProps = {
        refundInfo: null,
        reason: null,
        amount: null,
        num: null,
        createTime: null,
        refundNumber: null
    };
    render(){
        return <View className="refund-base-info" wx:if="{{refundInfo}}">
            <View className="item">
                <View className="row">
                    <label>退款原因：</label>
                    <text>{{ refundInfo.user_reason}}</text>
                </View>
                <View className="row">
                    <label>退款金额：</label>
                    <text>{{ refundInfo.refund_amount}}</text>
                </View>
                <View className="row">
                    <label>申请件数：</label>
                    <text>{{ refundInfo.goods_num}}</text>
                </View>
                <View className="row">
                    <label>申请时间：</label>
                    <time-format value="{{refundInfo.create_time}}"></time-format>
                </View>
                <View className="row">
                    <label>退款编号：</label>
                    <text>{{ refundInfo.refund_sn}}</text>
                </View>
            </View>
        </View>
    }

}
