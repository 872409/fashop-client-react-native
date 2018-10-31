import OrderModel from '../../../models/order'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const orderModel = new OrderModel()
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';

export default class Index extends Component{
    data: {
        goodsInfo: null,
    },
    async onLoad(options) {
        const goodsInfoResult = await orderModel.goodsInfo({
            id: typeof options['order_goods_id'] !== 'undefined' ? options['order_goods_id'] : 414
        })
        this.setData({
            goodsInfo: goodsInfoResult.info,
        })
    },
    onClick(e) {
        wx.navigateTo({
            url: `/pages/refund/serviceApply/index?order_goods_id=${this.state.goodsInfo.id}&delta=2&refund_type=${e.currentTarget.dataset.refundType}`
        })
    }
    render(){
        return <View style="background-color:#F8F8F8;display: block;overflow: hidden">
            <fa-panel>
                <View className="refund-goods-card">
                    <View className="body">
                        <View className="item">
                            <View className="content">
                                <View className="image">
                                    <image src="{{goodsInfo.goods_img}}" mode="aspectFill" />
                                </View>
                                <View className="body">
                                    <text>{{ goodsInfo.goods_title}}</text>
                                    <View className="end">
                                        <text className="spec">{{ goodsInfo.goods_spec_string}}</text>
                                        <label className="number">x {{ goodsInfo.goods_num}}</label>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </fa-panel>
            <fa-panel>
                <fa-cell-group>
                    <fa-cell is-link="true" title="仅退款"
                             label="未收到货（包含未签收），或卖家协商同意前提现" data-refund-type="1" bind:tap="onClick"
                             icon="/themes/default/refund/refund-type-1.png">
                    </fa-cell>
                    <fa-cell is-link="true" title="退货退款"
                             label="已收到货，需要退换已收到的货物" data-refund-type="2" bind:tap="onClick"
                             icon="/themes/default/refund/refund-type-2.png">
                    </fa-cell>
                </fa-cell-group>
            </fa-panel>
        </View>

    }

}
