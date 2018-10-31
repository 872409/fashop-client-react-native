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
        goodsInfo: PropTypes.object,
    };
    static defaultProps = {
        goodsInfo: null,
    };

    onGoods() {
        this.triggerEvent('goods', { goodsId: this.state.goodsInfo.goods_id });
    }

    onDetail() {
        this.triggerEvent('detail', { orderGoodsId: this.state.goodsInfo.id });
    }

    onAdd() {
        this.triggerEvent('add', { orderGoodsId: this.state.goodsInfo.id });
    }

    onAdditional() {
        this.triggerEvent('additional', { orderGoodsId: this.state.goodsInfo.id });
    }
    render(){
        return <View className="evaluate-goods-card">
            <View className="body">
                <View className="item">
                    <View className="content">
                        <View className="image" onPress={this.onGoods()}>
                            <image src="{{goodsInfo.goods_img}}" mode="aspectFill" />
                        </View>
                        <View className="body">
                            <text onPress={this.onGoods()}>{{ goodsInfo.goods_title}}</text>
                            <View className="button-area">
                                <order-button text="查看评价" size="small" bind:click="onDetail"
                                              wx:if="{{goodsInfo.evaluate_state > 0}}"></order-button>
                                <order-button text="去评价" size="small" type="danger" bind:click="onAdd"
                                              wx:if="{{goodsInfo.evaluate_state === 0}}"></order-button>
                                <order-button text="追加评价" size="small" type="danger" bind:click="onAdditional"
                                              wx:if="{{goodsInfo.evaluate_state === 1}}"></order-button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}
