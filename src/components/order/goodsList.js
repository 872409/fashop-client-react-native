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
        goodsList: PropTypes.array,
    };
    static defaultProps = {
        orderInfo: null,
        goodsList: null,
    };

    onRefund(e) {
        this.triggerEvent('goods-refund-click', { goodsInfo: e.currentTarget.dataset.goodsInfo });
    }

    onRefundDetail(e) {
        this.triggerEvent('goods-refund-detail', { goodsInfo: e.currentTarget.dataset.goodsInfo });
    }

    onGoodsDetail(e) {
        this.triggerEvent('goods-detail', { goodsInfo: e.currentTarget.dataset.goodsInfo });
    }
    render(){
        return <View className="order-goods-list">
            <View className="item" wx:for="{{goodsList}}" wx:for-index="{{index}}" wx:key="item">
                <View className="content" onPress={this.onGoodsDetail" data-goods-info="{{item}}()}>
                    <View className="image">
                        <image src="{{item.goods_img}}" mode="aspectFill" />
                    </View>
                    <View className="body">
                        <text>{{ item.goods_title}}</text>
                    </View>
                    <View className="end">
                        <text className="price">¥{{ item.goods_price}}</text>
                        <label className="number">x {{ item.goods_num}}</label>
                    </View>
                </View>
                <block wx:if="{{item.refund_state === 1}}">
                    <View className="footer">
                        <order-button text="申请退款" size="small" data-goods-info="{{item}}"
                                      bind:click="onRefund"></order-button>
                    </View>
                </block>
                <block wx:if="{{item.refund_state === 2}}">
                    <View className="footer">
                        <order-button text="退款中" size="small" data-goods-info="{{item}}"
                                      bind:click="onRefundDetail"></order-button>
                    </View>
                </block>
                <block wx:if="{{item.refund_state === 3}}">
                    <View className="footer">
                        <order-button text="退款完成" size="small" data-goods-info="{{item}}"
                                      bind:click="onRefundDetail"></order-button>
                    </View>
                </block>
            </View>
        </View>

    }
}
