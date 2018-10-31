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
    state = {
        order_goods_id: null,
        evaluate: null
    }
    onLoad({ order_goods_id }) {
        this.setState({
            order_goods_id
        })
    }
    preViewImage(e) {
        wx.preViewImage({
            current: e.currentTarget.dataset.url,
            urls: e.currentTarget.dataset.images
        })
    }
    async onShow() {
        const { order_goods_id } = this.state
        const evaluate = await goodsEvaluateModel.info({
            order_goods_id
        })
        this.setState({
            evaluate
        })
        this.updateListRow()
    }
    updateListRow() {
        const { id } = this.state.evaluate
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
    render(){
        return <View style={styles.evaluate-detail}  wx:if="{{evaluate}}">

            <View style={styles.goods-evaluate-item} >
                <View style={styles.header} >
                    <View style={styles.avatar} >
                        <Image source="{{evaluate.avatar}}" resizeMode={'contain'} />
                        <View style={styles.nickname} >
                            <Text>{{ evaluate.nickname}}</Text>
                            <Text>
                                <time-format value="{{evaluate.create_time}}" />
                            </Text>
                        </View>
                    </View>
                    <View style={styles.star} >
                        <common-rater size="12" num="5" value="{{evaluate.score}}"></common-rater>
                    </View>
                </View>

                <View style={styles.content}  wx:if="{{evaluate.content}}">{{ evaluate.content}}</View>
                <block wx:if="{{evaluate.images}}">
                    <View style={styles.photo-list} >
                        <block wx:for="{{evaluate.images}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                            <Image source="{{item}}" resizeMode={'contain'} data-url="{{item}}" onPress={()=>{ this.preViewImage() }}
                                   data-images="{{evaluate.images}}" />
                        </block>
                    </View>
                </block>
                <View style={styles.reply-content}  wx:if="{{evaluate.reply_content}}">
                    <Text>客服：</Text>
                    <Text>{{ evaluate.reply_content}}</Text>
                    <time-format value="{{evaluate.reply_time}}" />
                </View>

                <View style={styles.content}  wx:if="{{evaluate.additional_content || evaluate.additional_images}}">
                    <Text>{{ evaluate.additional_interval_day === 0 ? '当天' : evaluate.additional_interval_day + '天后'}}追评</Text>
                    <Text wx:if="{{evaluate.additional_content}}">{{ evaluate.additional_content}}</Text>
                </View>
                <block wx:if="{{evaluate.additional_images}}">
                    <View style={styles.photo-list} >
                        <block wx:for="{{evaluate.additional_images}}" wx:key="key" wx:for-index="index"
                               wx:for-item="item">
                            <Image source="{{item}}" resizeMode={'contain'} data-url="{{item}}" onPress={()=>{ this.preViewImage() }}
                                   data-images="{{evaluate.additional_images}}" />
                        </block>
                    </View>
                </block>
                <View style={styles.reply-content}  wx:if="{{evaluate.reply_content2}}">
                    <Text>客服：</Text>
                    <Text>{{ evaluate.reply_content2}}</Text>
                    <time-format value="{{evaluate.reply_time2}}" />
                </View>

                <View style={styles.spec} >
                    {{ goodsInfo.goods_spec_string}}
                </View>
                <View style={styles.goods-evaluate} >
                    <Image source="{{goodsInfo.goods_img}}" resizeMode={'contain'} />
                    <Text>{{ goodsInfo.goods_title}}</Text>
                </View>
            </View>

        </View>

    }

}
