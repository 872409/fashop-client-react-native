import fa from '../../../utils/fa'
import GoodsEvaluateModel from '../../../models/goodsEvaluate'
import OrderModel from '../../../models/order'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import { UploadImageInterface } from '../../../interface/uploadImage'
import { api } from '../../../api'

const goodsEvaluateModel = new GoodsEvaluateModel()
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
        id: 0,
        delta: 1,
        orderGoodsId: 0,
        content: '',
        goodsInfo: null,
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderCount: 9,
        uploaderUrl: null,
        uploaderButtonText: '上传图片(最多9张)',
        uploaderHeader: {},
    },
    async onLoad({ order_goods_id, delta = 1 }) {
        const accessToken = fa.cache.get('user_token')
        const goodsInfoResult = await orderModel.goodsInfo({
            id: order_goods_id
        })

        this.setData({
            id: goodsInfoResult.info.id,
            delta: typeof delta !== 'undefined' ? delta : 1,
            uploaderUrl: api.upload.addImage.url,
            uploaderHeader: {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            },
            goodsInfo: goodsInfoResult.info,
            orderGoodsId: order_goods_id
        })
    },
    onUploadFileSuccess(e) {
        const result = new UploadImageInterface(e.detail.result)
        let files = this.state.uploaderFiles
        this.setData({
            uploaderFiles: files.concat(result.origin.path)
        })
    },
    onUploadFileDelete(e) {
        this.setData({
            uploaderFiles: fa.remove(this.state.uploaderFiles, e.detail.url)
        })
    },
    onContentChange(e) {
        this.setData({
            content: e.detail.detail.value
        })
    },
    async onSubmit() {
        if (!this.state.content) {
            return fa.toast.show({ title: '请输入评价内容' })
        }

        let data = {
            order_goods_id: this.state.orderGoodsId,
            additional_content: this.state.content,
        }
        if (this.state.uploaderFiles.length > 0) {
            data['additional_images'] = this.state.uploaderFiles
        }

        const result = await goodsEvaluateModel.append(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(goodsEvaluateModel.getException().getCode())
            })
        } else {
            this.updateListRow()
            wx.navigateBack({
                delta: this.state.delta
            })
        }
    },
    updateListRow() {
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
    render(){
       return  <View>
            <View style="background-color:#F8F8F8;display: block;overflow: hidden">
                <fa-panel>
                    <View className="refund-goods-card">
                        <View className="body">
                            <View className="item">
                                <View className="content">
                                    <View className="image">
                                        <image src="{{goodsInfo.goods_img}}" mode="aspectFill" />
                                    </View>
                                    <View className="body">
                                        <text>已评价</text>
                                        <common-rater num="5" value="5" size="20"></common-rater>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </fa-panel>
                <fa-panel>
                    <View className="add-title">
                        追加评价
                    </View>
                    <fa-field
                        type="textarea"
                        title=""
                        placeholder="对评价进行补充，更客观，更全面~"
                        value="{{content}}"
                        bind:change="onContentChange"
                    >
                    </fa-field>
                    <fa-field
                        type="uploader"
                        title=""
                        uploaderButtonText="{{uploaderButtonText}}"
                        uploaderFormData="{{uploaderFormData}}"
                        uploaderUrl="{{uploaderUrl}}"
                        uploaderHeader="{{uploaderHeader}}"
                        uploaderFiles="{{uploaderFiles}}"
                        uploaderCount="{{uploaderCount}}"
                        uploaderAllowDel="true"
                        bind:success="onUploadFileSuccess"
                        bind:change="handleFieldChange"
                        bind:delete="onUploadFileDelete"
                    >
                    </fa-field>
                </fa-panel>
            </View>
            <fixed-bottom>
                <View className="footer">
                    <fa-button type="danger" size="large" bind:btnclick="onSubmit">提交</fa-button>
                </View>
            </fixed-bottom>
        </View>
    }
}
