const refundModel = new RefundModel()
const orderModel = new OrderModel()
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import fa from '../../utils/fa'
import RefundModel from '../../models/refund'
import OrderModel from '../../models/order'
import { UploadImageInterface } from '../../interface/uploadImage'

export default class Index extends Component{
    state = {
        delta: 1,
        noMoreThan: 0,

        refundType: 1,
        reasonList: [],
        receiveStateList: ['未收到货', '已收到货'],
        reason: '',
        userReceive: null,
        refundAmount: '',
        userExplain: '',

        goodsInfo: null,
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderUrl: null,
        uploaderButtonText: '上传凭证(最多6张)',
        uploaderHeader: {},
    }
    async componentWillMount({ order_goods_id, refund_type, delta = 1 }) {
        // delta 传的话
        const accessToken = fa.cache.get('user_token')
        const goodsInfoResult = await orderModel.goodsInfo({
            id: typeof  order_goods_id !== 'undefined' ? order_goods_id : 414
        })
        const refundType = parseInt(refund_type) !== 1 ? 2 : 1
        const result = await refundModel.reasonList({
            refund_type: refundType
        })
        const reasonList = result.list.map(function (item) {
            return item.title
        })
        const noMoreThan = parseFloat(goodsInfoResult.info.goods_pay_price) + parseFloat(goodsInfoResult.info.goods_freight_fee)
        this.setState({
            refundType,
            delta: parseInt(delta),
            uploaderUrl: api.upload.addImage.url,
            uploaderHeader: {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            },
            refundAmount: noMoreThan,
            noMoreThan,
            goodsInfo: goodsInfoResult.info,
            reasonList
        })
    }
    // todo 失败处理
    onUploadFileSuccess(e) {
        const result = new UploadImageInterface(e.detail.result)
        let files = this.state.uploaderFiles
        this.setState({
            uploaderFiles: files.concat(result.origin.path)
        })
    }
    onUploadFileDelete(e) {
        this.setState({
            uploaderFiles: fa.remove(this.state.uploaderFiles, e.detail.url)
        })
    }
    onRefundAmountChange(e) {
        this.setState({
            refundAmount: parseFloat(isNaN(e.detail.detail.value) || !e.detail.detail.value ? 0 : e.detail.detail.value).toFixed(2)
        })
    }
    onReceiveStateChange(e) {
        this.setState({
            userReceive: parseInt(e.detail.detail.value)
        })
    }
    onResonChange(e) {
        this.setState({
            reason: e.detail.detail.value
        })
    }
    onUserExplainChange(e) {
        this.setState({
            userExplain: e.detail.detail.value
        })
    }
    async onSubmit() {
        if (!this.state.reason) {
            return fa.toast.show({ title: '请选择退款原因' })
        }
        if (!this.state.refundAmount) {
            return fa.toast.show({ title: '请输入退款金额' })
        }
        if (parseFloat(this.state.refundAmount) > this.state.noMoreThan) {
            return fa.toast.show({ title: '退款金额不得超过¥' + this.state.noMoreThan })
        }
        if (!this.state.userExplain) {
            return fa.toast.show({ title: '请填写退款说明' })
        }
        if (!this.state.refundType === 2 && typeof this.state.userReceive !== "number") {
            return fa.toast.show({ title: '请选择货物状态' })
        }
        let data = {
            refund_type: this.state.refundType,
            order_goods_id: this.state.goodsInfo.id,
            reason: this.state.reasonList[this.state.reason],
            refund_amount: this.state.refundAmount,
            user_explain: this.state.userExplain,
        }
        if (this.state.uploaderFiles.length > 0) {
            data['images'] = this.state.uploaderFiles
        }
        if (this.state.refundType === 2) {
            data['user_receive'] = this.state.userReceive + 1
        }
        const result = await refundModel.apply(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(refundModel.getException().getCode())
            })
        } else {
            wx.navigateBack({
                delta: this.state.delta
            })
        }
    }
    render(){
        return <View style="background-color:#F8F8F8;display: block;overflow: hidden" wx:if="{{goodsInfo}}">
            <List>
                <View style={styles.refund-goods-card} >
                    <View style={styles.body} >
                        <View style={styles.item} >
                            <View style={styles.content} >
                                <View style={styles.image} >
                                    <Image source={goodsInfo.goods_img} resizeMode={'contain'} />
                                </View>
                                <View style={styles.body} >
                                    <Text>{{ goodsInfo.goods_title}}</Text>
                                    <View style={styles.end} >
                                        <Text style={styles.spec} >{ goodsInfo.goods_spec_string}</Text>
                                        <Text style={styles.number} >x {{ goodsInfo.goods_num}}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </List>
            <List>
                <Field
                    wx:if="{{refundType === 2}}"
                    type={'picker'}
                    title="货物状态"
                    placeholder="请选择"
                    range="{{receiveStateList}}"
                    value="{{userReceive}}"
                    onChange="onReceiveStateChange"
                    right={true}
                >
                </Field>
                <Field
                    type={'picker'}
                    title="退款原因"
                    placeholder="请选择"
                    value="{{reason}}"
                    range="{{reasonList}}"
                    onChange="onResonChange"
                    right={true}
                >
                </Field>
                <Field
                    type={'input'}
                    inputType="digit"
                    title="退款金额"
                    placeholder="¥{{noMoreThan}}"
                    value="{{refundAmount ? refundAmount : noMoreThan}}"
                    bind:blur="onRefundAmountChange"
                    desc="最多¥{{noMoreThan}}，含发货邮费¥{{goodsInfo.goods_freight_fee}}"
                    right={true}
                >
                </Field>
                <Field
                    title="退款说明"
                    placeholder="必填"
                    value="{{userExplain}}"
                    onChange="onUserExplainChange"
                    right={true}
                >
                </Field>
                <Field
                    type={'uploader'}
                    title="图片上传"
                    uploaderButtonText="{{uploaderButtonText}}"
                    uploaderFormData="{{uploaderFormData}}"
                    uploaderUrl="{{uploaderUrl}}"
                    uploaderHeader="{{uploaderHeader}}"
                    uploaderFiles="{{uploaderFiles}}"
                    uploaderCount="6"
                    uploaderAllowDel={true}
                    bind:success="onUploadFileSuccess"
                    onChange={(value)=>{this.handleFieldChange(value)}}
                    bind:delete="onUploadFileDelete"
                >
                </Field>
            </List>
            <FixedBottom>
                <View style={styles.footer} >
                    <Button type={'danger'} size="large" onClick={()=>{this.onSubmit()}}>提交</Button>
                </View>
            </FixedBottom>
        </View>

    }
}
