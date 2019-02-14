import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import fa from '../../utils/fa'
import { Button } from 'antd-mobile-rn';
import { RefundGoodsCard, Field } from '../../components'
import { connect } from 'react-redux';

/**
 * 添加退货快递单号，只有管理员审核通过(handle_state为20)的退款退货才可以填写订单号
 * @method   post
 * @param  int        id                    退款记录id
 * @param  int        tracking_no        物流单号
 * @param  string    tracking_phone        手机号
 * @param  string    tracking_explain    说明 非必须
 * @param  string    tracking_images    凭证 最多6张
 */
@connect(({ order })=>({
    goodsInfo: order.goodsInfo.result
}))
export default class RefundLogisticsFill extends Component {
    state = {
        tracking_company: '',
        tracking_no: '',
        tracking_phone: '',
        tracking_explain: '',

        images: [],

        uploaderButtonText: '上传凭证(最多6张)',
        uploaderHeader: {},
        uploaderMaxNum: 9
    }

    async componentWillMount() {
        const { navigation, dispatch } = this.props
        const { order_goods_id } = navigation.satte.params
        dispatch({
            type: 'order/goodsInfo',
            payload: {
                id: order_goods_id
            }
        })
    }

    onTrackingCompanyChange({ value }) {
        this.setState({
            tracking_company: value
        })
    }

    onTrackingNoChange({ value }) {
        this.setState({
            tracking_no: parseInt(value)
        })
    }

    onTackingPhoneChange({ value }) {
        this.setState({
            tracking_phone: value
        })
    }

    onTrackingExplainChange({ value }) {
        this.setState({
            tracking_explain: value
        })
    }

    async onSubmit() {
        const {
            tracking_company,
            tracking_no,
            tracking_phone,
            tracking_explain,
            images
        } = this.state
        const { dispatch, navigation } = this.props
        const { id } = navigation.satte.params
        if (!tracking_company) {
            return fa.toast.show({ title: '请填写物流公司' })
        }
        if (!tracking_no) {
            return fa.toast.show({ title: '请输入物流单号' })
        }

        if (!tracking_phone) {
            return fa.toast.show({ title: '请填写手机号码' })
        }
        if (!tracking_explain) {
            return fa.toast.show({ title: '退款说明' })
        }

        let payload = {
            id,
            tracking_company,
            tracking_no,
            tracking_phone,
            tracking_explain,
        }
        if (images.length > 0) {
            payload['tracking_images'] = images
        }
        dispatch({
            type: 'refund/setTrackingNo',
            payload,
            callback: () => navigation.goBack()
        })
    }

    onImagesChange({ value }) {
        this.setState({
            images: value
        })
    }

    render() {
        const {
            tracking_company, tracking_no, tracking_phone, tracking_explain,
            uploaderMaxNum
        } = this.state
        const { goodsInfo } = this.props
        return goodsInfo ? [<View style={{ backgroundColor: '#fff' }}>
            <RefundGoodsCard
                goodsTitle={goodsInfo.goods_title}
                goodsImg={goodsInfo.goods_img}
                goodsSpec={goodsInfo.goods_spec_string}
                goodsNum={goodsInfo.goods_num}
            />
            <Field
                title="物流公司"
                placeholder="请填写物流公司，必填"
                value={tracking_company}
                onChange={(e) => {
                    this.onTrackingCompanyChange(e)
                }}
            >
            </Field>
            <Field
                title="物流单号"
                placeholder="请输入物流单号，必填"
                value={tracking_no}
                onChange={(e) => {
                    this.onTrackingNoChange(e)
                }}
            >
            </Field>
            <Field
                title="联系电话"
                placeholder="请填写手机号码，必填"
                value={tracking_phone}
                onChange={(e) => {
                    this.onTackingPhoneChange(e)
                }}
            >
            </Field>
            <Field
                title="退款说明"
                placeholder="退款说明，必填"
                value={tracking_explain}
                onChange={(e) => {
                    this.onTrackingExplainChange(e)
                }}
            >
            </Field>
            <Field
                title={'上传图片(最多9张)'}
                type={'uploader'}
                value={[]}
                uploaderMaxNum={uploaderMaxNum}
                onChange={(e) => {
                    this.onImagesChange(e)
                }}
            >
            </Field>

        </View>, <SafeAreaView>
            <View style={styles.footer}>
                <Button
                    style={{ flex: 1 }}
                    type={'warning'} size="large" onClick={() => {
                    this.onSubmit()
                }}>提交</Button>
            </View>
        </SafeAreaView>] : null
    }
}
const styles = StyleSheet.create({
    footer: {
        padding: 15,
        flexDirection: 'row',
    }
})
