import fa from '../../utils/fa'
import GoodsEvaluateModel from '../../models/goodsEvaluate'
import OrderModel from '../../models/order'
import { UploadImageInterface } from '../../interface/uploadImage'
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { List,Button } from 'antd-mobile-rn';
import { Rater, Field, FixedBottom } from '../../components'

const goodsEvaluateModel = new GoodsEvaluateModel()
const orderModel = new OrderModel()

export default class EvaluateAdditional extends Component {
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
    }

    async componentWillMount({ order_goods_id, delta = 1 }) {
        // todo
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

    onContentChange(e) {
        this.setState({
            content: e.detail.detail.value
        })
    }

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
            // todo  2页
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
            content,
            goodsInfo,
            uploaderFiles,
            uploaderFormData,
            uploaderCount,
            uploaderUrl,
            uploaderButtonText,
            uploaderHeader,
        } = this.state
        return <View>
            <View>
                <List>
                    <View style={styles.refundGoodsCard}>
                        <View style={styles.body}>
                            <View style={styles.item}>
                                <View style={styles.content}>
                                    <View style={styles.image}>
                                        <Image source={goodsInfo.goods_img} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.body}>
                                        <Text>已评价</Text>
                                        <Rater num="5" value="5" size="20" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </List>
                <List>
                    <View style={styles.add - title}>
                        追加评价
                    </View>
                    <Field
                        type={'textarea'}
                        title=""
                        placeholder="对评价进行补充，更客观，更全面~"
                        value={content}
                        onChange={(e) => this.onContentChange(e)}
                    >
                    </Field>
                    <Field
                        type={'uploader'}
                        title=""
                        uploaderButtonText={uploaderButtonText}
                        uploaderFormData={uploaderFormData}
                        uploaderUrl={uploaderUrl}
                        uploaderHeader={uploaderHeader}
                        uploaderFiles={uploaderFiles}
                        uploaderCount={uploaderCount}
                        uploaderAllowDel={true}
                        success="onUploadFileSuccess"
                        onChange={(value) => {
                            this.handleFieldChange(value)
                        }}
                        delete="onUploadFileDelete"
                    >
                    </Field>
                </List>
            </View>
            <FixedBottom>
                <View style={styles.footer}>
                    <Button type={'danger'} size="large" onClick={() => {
                        this.onSubmit()
                    }}>提交</Button>
                </View>
            </FixedBottom>
        </View>
    }
}
const styles = StyleSheet.create({
    "fa_panel": {
        "marginBottom": "10px",
        "display": "block"
    },
    "refund_goods_card": {},
    "add_title": {
        "fontSize": "14px",
        "padding": "10px 15px 0 15px",
        "fontWeight": "bold"
    },
    "refund_goods_card__item": {
        "padding": "15px",
        "borderBottom": "1px solid #F8F8F8"
    },
    "refund_goods_card__content": {
        "display": "flex"
    },
    "refund_goods_card__item__image": {
        "marginRight": "15px"
    },
    "refund_goods_card__item_image": {
        "width": "80px",
        "height": "80px",
        "display": "block"
    },
    "refund_goods_card__item__body": {
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center"
    },
    "refund_goods_card__item__body_text": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "color": "#333",
        "lineHeight": "18px",
        "display": "block",
        "overflow": "hidden",
        "marginBottom": "10px"
    },
    "refund_goods_card__item__end": {
        "textAlign": "right",
        "marginLeft": "20px"
    },
    "refund_goods_card__item__end__price": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "marginBottom": "10px",
        "lineHeight": "14px",
        "display": "block"
    },
    "refund_goods_card__item__end__number": {
        "fontSize": "14px",
        "marginBottom": "10px",
        "lineHeight": "14px",
        "display": "block"
    },
    "refund_goods_card__item__footer": {
        "display": "flex",
        "justifyContent": "flex-end"
    }
})
