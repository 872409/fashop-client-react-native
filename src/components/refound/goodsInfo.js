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
    onGoods() {
        this.triggerEvent('goods', { refundInfo: this.state.refundInfo });
    }
    render(){
        return <View className="refund-goods-info">
            <View className="header">退款信息</View>
            <View className="body">
                <View className="item" onPress={this.onGoods()}>
                    <View className="content">
                        <View className="image">
                            <image src="{{refundInfo.goods_img}}" mode="aspectFill" />
                        </View>
                        <View className="body">
                            <text>{{ refundInfo.goods_title}}</text>
                            <View className="end">
                                <text className="spec">{{ refundInfo.goods_spec_string}}</text>
                                <label className="number">x {{ refundInfo.goods_num}}</label>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}
