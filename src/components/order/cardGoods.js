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
        orderId: PropTypes.string,
        goodsList: PropTypes.array,
    };
    static defaultProps = {
        orderId: null,
        goodsList: [],
    };

    onClick(e) {
        this.triggerEvent('click', { orderId: this.state.orderId });
    }

    render() {
        return <View>
            <View wx:if="{{goodsList.length > 1}}" onPress={this.onClick()}>
                <scroll-View className="order-card-goods" scroll-x="true" scroll-with-animation="true">
                    <View>
                        <block wx:for="{{goodsList}}" wx:key="item">
                            <View className="item">
                                <image src="{{item.goods_img}}" mode="aspectFill" />
                            </View>
                        </block>
                    </View>
                </scroll-View>
            </View>
            <View wx:elif="{{goodsList.length === 1}}" onPress={this.onClick()}>
                <View className="order-card-goods-one">
                    <block wx:for="{{goodsList}}" wx:key="item">
                        <View className="one-item" wx:for="{{goodsList}}" wx:key="item">
                            <View className="image">
                                <image src="{{item.goods_img}}" mode="aspectFill" />
                            </View>
                            <View className="body">
                                <text>{{ item.goods_title}}</text>
                                <View className="desc">
                                    <label>{{ item.goods_spec_string}}</label><i>x{{ item.goods_num}}</i></View>
                                <label>¥{{ item.goods_price}}</label>
                            </View>
                        </View>
                    </block>
                </View>
            </View>
        </View>
    }
}
