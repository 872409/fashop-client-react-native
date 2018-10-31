import fa from '../../../utils/fa'
import GoodsEvaluate from '../../../models/goodsEvaluate'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const goodsEvaluateModel = new GoodsEvaluate()
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
        order_goods_id: null,
        evaluate: null
    },
    onLoad({ order_goods_id }) {
        this.setData({
            order_goods_id
        })
    },
    preViewImage(e) {
        wx.preViewImage({
            current: e.currentTarget.dataset.url,
            urls: e.currentTarget.dataset.images
        })
    },
    async onShow() {
        const { order_goods_id } = this.state
        const evaluate = await goodsEvaluateModel.info({
            order_goods_id
        })
        this.setData({
            evaluate
        })
        this.updateListRow()
    },
    updateListRow() {
        const { id } = this.state.evaluate
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
    render(){
        return <View className="evaluate-detail" wx:if="{{evaluate}}">

            <View className="goods-evaluate-item">
                <View className="header">
                    <View className="avatar">
                        <image src="{{evaluate.avatar}}" mode="aspectFill" />
                        <View className="nickname">
                            <text>{{ evaluate.nickname}}</text>
                            <label>
                                <time-format value="{{evaluate.create_time}}" />
                            </label>
                        </View>
                    </View>
                    <View className="star">
                        <common-rater size="12" num="5" value="{{evaluate.score}}"></common-rater>
                    </View>
                </View>

                <View className="content" wx:if="{{evaluate.content}}">{{ evaluate.content}}</View>
                <block wx:if="{{evaluate.images}}">
                    <View className="photo-list">
                        <block wx:for="{{evaluate.images}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                            <image src="{{item}}" mode="aspectFill" data-url="{{item}}" bindtap="preViewImage"
                                   data-images="{{evaluate.images}}" />
                        </block>
                    </View>
                </block>
                <View className="reply-content" wx:if="{{evaluate.reply_content}}">
                    <label>客服：</label>
                    <text>{{ evaluate.reply_content}}</text>
                    <time-format value="{{evaluate.reply_time}}" />
                </View>

                <View className="content" wx:if="{{evaluate.additional_content || evaluate.additional_images}}">
                    <label>{{ evaluate.additional_interval_day === 0 ? '当天' : evaluate.additional_interval_day + '天后'}}追评</label>
                    <text wx:if="{{evaluate.additional_content}}">{{ evaluate.additional_content}}</text>
                </View>
                <block wx:if="{{evaluate.additional_images}}">
                    <View className="photo-list">
                        <block wx:for="{{evaluate.additional_images}}" wx:key="key" wx:for-index="index"
                               wx:for-item="item">
                            <image src="{{item}}" mode="aspectFill" data-url="{{item}}" bindtap="preViewImage"
                                   data-images="{{evaluate.additional_images}}" />
                        </block>
                    </View>
                </block>
                <View className="reply-content" wx:if="{{evaluate.reply_content2}}">
                    <label>客服：</label>
                    <text>{{ evaluate.reply_content2}}</text>
                    <time-format value="{{evaluate.reply_time2}}" />
                </View>

                <View className="spec">
                    {{ goodsInfo.goods_spec_string}}
                </View>
                <View className="goods-evaluate">
                    <image src="{{goodsInfo.goods_img}}" mode="aspectFill" />
                    <text>{{ goodsInfo.goods_title}}</text>
                </View>
            </View>

        </View>

    }

}
