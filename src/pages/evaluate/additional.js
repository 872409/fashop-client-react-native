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
    state = {
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

        this.setState({
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
        this.setState({
            uploaderFiles: files.concat(result.origin.path)
        })
    },
    onUploadFileDelete(e) {
        this.setState({
            uploaderFiles: fa.remove(this.state.uploaderFiles, e.detail.url)
        })
    },
    onContentChange(e) {
        this.setState({
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
                <List>
                    <View style={styles.refund-goods-card} >
                        <View style={styles.body} >
                            <View style={styles.item} >
                                <View style={styles.content} >
                                    <View style={styles.image} >
                                        <Image source="{{goodsInfo.goods_img}}" resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.body} >
                                        <Text>已评价</Text>
                                        <common-rater num="5" value="5" size="20"></common-rater>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </List>
                <List>
                    <View style={styles.add-title} >
                        追加评价
                    </View>
                    <Field
                        type={'textarea'}
                        title=""
                        placeholder="对评价进行补充，更客观，更全面~"
                        value="{{content}}"
                        onChange="onContentChange"
                    >
                    </Field>
                    <Field
                        type={'uploader'}
                        title=""
                        uploaderButtonText="{{uploaderButtonText}}"
                        uploaderFormData="{{uploaderFormData}}"
                        uploaderUrl="{{uploaderUrl}}"
                        uploaderHeader="{{uploaderHeader}}"
                        uploaderFiles="{{uploaderFiles}}"
                        uploaderCount="{{uploaderCount}}"
                        uploaderAllowDel={true}
                        bind:success="onUploadFileSuccess"
                        onChange="handleFieldChange"
                        bind:delete="onUploadFileDelete"
                    >
                    </Field>
                </List>
            </View>
            <FixedBottom>
                <View style={styles.footer} >
                    <Button type={'danger'} size="large" onClick={()=>{this.onSubmit()}}>提交</Button>
                </View>
            </FixedBottom>
        </View>
    }
}
