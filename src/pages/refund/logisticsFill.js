import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import fa from '../../utils/fa'
import RefundModel from '../../models/refund'
import OrderModel from '../../models/order'
import { UploadImageInterface } from '../../interface/uploadImage'
import { List } from 'antd-mobile-rn';
import { RefundGoodsCard,Field ,FixedBottom} from '../../components'

const refundModel = new RefundModel()
const orderModel = new OrderModel()

/**
 * 添加退货快递单号，只有管理员审核通过(handle_state为20)的退款退货才可以填写订单号
 * @method   post
 * @param  int        id                    退款记录id
 * @param  int        tracking_no        物流单号
 * @param  string    tracking_phone        手机号
 * @param  string    tracking_explain    说明 非必须
 * @param  string    tracking_images    凭证 最多6张
 */
export default class Index extends Component {
    state = {
        id: null,
        tracking_company: '',
        tracking_no: '',
        tracking_phone: '',
        tracking_explain: '',

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

    async componentWillMount({ id, order_goods_id }) {
        const accessToken = fa.cache.get('user_token')
        const goodsInfoResult = await orderModel.goodsInfo({
            id: order_goods_id
        })
        this.setState({
            id,
            uploaderUrl: api.upload.addImage.url,
            uploaderHeader: {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            },
            goodsInfo: goodsInfoResult.info
        })
    }

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

    onTrackingCompanyChange(e) {
        this.setState({
            tracking_company: e.detail.detail.value
        })
    }

    onTrackingNoChange(e) {
        this.setState({
            tracking_no: parseInt(e.detail.detail.value)
        })
    }

    onTackingPhoneChange(e) {
        this.setState({
            tracking_phone: e.detail.detail.value
        })
    }

    onTrackingExplainChange(e) {
        this.setState({
            tracking_explain: e.detail.detail.value
        })
    }

    async onSubmit() {
        if (!this.state.tracking_company) {
            return fa.toast.show({ title: '请填写物流公司' })
        }
        if (!this.state.tracking_no) {
            return fa.toast.show({ title: '请输入物流单号' })
        }

        if (!this.state.tracking_phone) {
            return fa.toast.show({ title: '请填写手机号码' })
        }
        if (!this.state.tracking_explain) {
            return fa.toast.show({ title: '退款说明' })
        }

        let data = {
            id: this.state.id,
            tracking_company: this.state.tracking_company,
            tracking_no: this.state.tracking_no,
            tracking_phone: this.state.tracking_phone,
            tracking_explain: this.state.tracking_explain,
        }
        if (this.state.uploaderFiles.length > 0) {
            data['tracking_images'] = this.state.uploaderFiles
        }

        const result = await refundModel.setTrackingNo(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(refundModel.getException().getCode())
            })
        } else {
            // todo
            // wx.navigateBack({
            //     delta: this.state.delta
            // })
        }
    }

    render() {
        return <View>
            <View>
                <List>
                    <RefundGoodsCard
                        goodsTitle={goodsInfo.goods_title}
                        goodsImg={goodsInfo.goods_img}
                        goodsSpec={goodsInfo.goods_spec_string}
                        goodsNum={goodsInfo.goods_num}
                    />
                </List>
                <List>
                    <Field
                        title="物流公司"
                        placeholder="请填写物流公司，必填"
                        value="{{tracking_company }}"
                        onChange="onTrackingCompanyChange"
                    >
                    </Field>
                    <Field
                        title="物流单号"
                        placeholder="请输入物流单号，必填"
                        value="{{tracking_no}}"
                        onChange="onTrackingNoChange"
                    >
                    </Field>
                    <Field
                        title="联系电话"
                        placeholder="请填写手机号码，必填"
                        value="{{tracking_phone}}"
                        onChange="onTackingPhoneChange"
                    >
                    </Field>
                    <Field
                        title="退款说明"
                        placeholder="退款说明，必填"
                        value="{{tracking_explain}}"
                        onChange="onTrackingExplainChange"
                    >
                    </Field>
                    <Field
                        type={'uploader'}
                        title="图片上传"
                        uploaderButtonText={uploaderButtonText}
                        uploaderFormData={uploaderFormData}
                        uploaderUrl={uploaderUrl}
                        uploaderHeader={uploaderHeader}
                        uploaderFiles={uploaderFiles}
                        uploaderCount={6}
                        uploaderAllowDel={true}
                        bind:success="onUploadFileSuccess"
                        onChange={(value)=>{this.handleFieldChange(value)}}
                        bind:delete="onUploadFileDelete"
                    >
                    </Field>
                </List>
            </View>
            <FixedBottom>
                <View style={styles.footer}>
                    <Button type={'danger'} size="large" onClick={()=>{this.onSubmit()}}>提交</Button>
                </View>
            </FixedBottom>

        </View>
    }
}
