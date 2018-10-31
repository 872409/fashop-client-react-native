import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';
import PropTypes from "prop-types";

export default class Index extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : windowWidth*0.4,
        autoLayout : false,
    };
    properties: {
        refundInfo:{
            type:Object,
            value:null
        },
        orderState: {
            type: Number,
            value: null
        },
        expireTime:{
            type: Number,
            value: null
        },
        cost: {
            type: Number,
            value: null
        }
    }
    render(){
        return <View>
            <!--平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)-->
            <View class="order-state-card">
                <block wx:if="{{refundInfo.is_close===0 && refundInfo.handle_state === 0 }}">
                    <View class="left">
                        <text class="state">请等待商家处理</text>
                    </View>
                    <View class="right">
                        <text>还剩</text>
                        <common-static-countdown countdown="{{refundInfo.handle_expiry_seconds}}"
                                                 format="dd天hh时mm分"></common-static-countdown>
                    </View>
                </block>
                <!--<block wx:if="{{refundInfo.handle_state === 20}}">-->
                <!--<View class="left">-->
                <!--<text class="state">订单关闭</text>-->
                <!--</View>-->
                <!--<View class="right">-->
                <!--</View>-->
                <!--</block>-->
                <block wx:if="{{refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 }}">
                    <block wx:if="{{!refundInfo.tracking_time}}">
                        <View class="left">
                            <text class="state">请退货并填写物流信息</text>
                        </View>
                        <View class="right">
                            <text>还剩</text>
                            <common-static-countdown countdown="{{refundInfo.send_expiry_seconds}}"
                                                     format="dd天hh时mm分"></common-static-countdown>
                        </View>
                    </block>
                    <block wx:if="{{refundInfo.tracking_time > 0}}">
                        <View class="left">
                            <text class="state">等待商家确认收货中</text>
                        </View>
                        <View class="right">
                        </View>
                    </block>
                </block>

                <block wx:if="{{refundInfo.handle_state === 30}}">
                    <View class="left">
                        <text class="state">退款成功</text>
                    </View>
                    <View class="right">
                        <text>
                            <time-format value="{{refundInfo.handle_time}}"></time-format>
                        </text>
                    </View>
                </block>
                <block wx:if="{{refundInfo.is_close === 1 }}">
                    <View class="left">
                        <text class="state">退款关闭</text>
                    </View>
                    <View class="right">
                        <text>
                            <time-format value="{{refundInfo.handle_time}}"></time-format>
                        </text>
                    </View>
                </block>
            </View>
        </View>
    }
}
