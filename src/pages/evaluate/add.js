import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import fa from '../../utils/fa'
import GoodsEvaluateModel from '../../models/goodsEvaluate'
import OrderModel from '../../models/order'
import { UploadImageInterface } from '../../interface/uploadImage'
import { List, Button } from 'antd-mobile-rn';
import { Rater, Field } from '../../components'
import { PublicStyles } from "../../utils/publicStyleModule";

const Item = List.Item
const goodsEvaluateModel = new GoodsEvaluateModel()
const orderModel = new OrderModel()
// todo
export default class EvaluateAdd extends Component {
    state = {
        id: 0,
        delta: 1,
        score: 5,
        orderGoodsId: 0,
        content: '',
        goodsInfo: null,
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderMaxNum: 9,
        uploaderUrl: null,
        uploaderButtonText: '上传图片(最多9张)',
        uploaderHeader: {},
    }

    async componentWillMount() {
        const order_goods_id = this.props.navigation.getParam('order_goods_id')
        const delta = this.props.navigation.getParam('delta', 1)
        // const accessToken = await fa.cache.get('user_token')
        const goodsInfoResult = await orderModel.goodsInfo({
            id: order_goods_id
        })

        this.setState({
            id: goodsInfoResult.info.id,
            delta: typeof delta !== 'undefined' ? delta : 1,
            // uploaderUrl:null,
            // uploaderHeader: {
            //     'Content-Type': 'multipart/form-data',
            //     'Access-Token': accessToken.access_token
            // },
            goodsInfo: goodsInfoResult.info,
            orderGoodsId: order_goods_id
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

    onContentChange({value}) {
        this.setState({
            content: value
        })
    }

    onScoreChange({value}) {
        this.setState({
            score: parseInt(value)
        })
    }

    async onSubmit() {
        if (!this.state.score) {
            return fa.toast.show({ title: '请选择评分' })
        }
        if (!this.state.content) {
            return fa.toast.show({ title: '请输入评价内容' })
        }

        let data = {
            order_goods_id: this.state.orderGoodsId,
            is_anonymous: 0,
            content: this.state.content,
            score: this.state.score,
        }
        if (this.state.uploaderFiles.length > 0) {
            data['images'] = this.state.uploaderFiles
        }

        const result = await goodsEvaluateModel.add(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(goodsEvaluateModel.getException().getCode())
            })
        } else {
            // todo
            this.updateListRow()
            // 可能存在跳回两页
            this.props.navigation.goBack()
        }
    }

    updateListRow() {
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        const {
            score,
            content,
            goodsInfo,
            uploaderFiles,
            uploaderFormData,
            uploaderMaxNum,
            uploaderUrl,
            uploaderButtonText,
            uploaderHeader,
        } = this.state
        return goodsInfo ? <View style={[PublicStyles.ViewMax]}>
            <View>
                <View style={styles.refundGoodsCard}>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.content}>
                                <View style={styles.image}>
                                    <Image
                                        style={{ width: 80, height: 80 }}
                                        source={{ uri: goodsInfo.goods_img }}
                                        resizeMode={'contain'}
                                    />
                                </View>
                                <View style={styles.body}>
                                    <Text style={styles.bodyText}>商品评价</Text>
                                    <Rater
                                        num={5}
                                        value={score}
                                        size={20}
                                        onChange={(e) => {
                                            this.onScoreChange(e)
                                        }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Field
                    type={'textarea'}
                    title=""
                    placeholder="请输入您要评价的内容"
                    value={content}
                    onChange={(e) => {
                        this.onContentChange(e)
                    }}
                >
                </Field>
                <Field
                    type={'uploader'}
                    title=""
                    value={[]}
                    uploaderButtonText={uploaderButtonText}
                    uploaderFiles={uploaderFiles}
                    uploaderMaxNum={uploaderMaxNum}
                    uploaderAllowDel={true}
                    onSuccess={(e) => {
                        this.onUploadFileSuccess(e)
                    }}
                    onDelete={(e) => {
                        this.onUploadFileDelete(e)
                    }}
                >
                </Field>
            </View>
            <View style={styles.footer}>
                <Button type={'warning'} size="large" onClick={() => {
                    this.onSubmit()
                }}>提交</Button>
            </View>
        </View> : null
    }
}
const styles = StyleSheet.create({
    refundGoodsCard: {
        flexDirection: 'row',
        backgroundColor:'#fff',
        marginBottom:8
    },

    item: {
        padding: 15,
    },
    content: {
        flexDirection: 'row'
    },
    image: {
        marginRight: 15
    },
    body: {
        flexDirection: "column",
        justifyContent: "center"
    },
    bodyText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#333",
        lineHeight: 18,
        marginBottom: 10
    },
    end: {
        textAlign: "right",
        marginLeft: 20
    },
    price: {
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 10,
        lineHeight: 14,
    },
    number: {
        fontSize: 14,
        marginBottom: 10,
        lineHeight: 14,
    },
    footer: {
        padding:15
    }
})
