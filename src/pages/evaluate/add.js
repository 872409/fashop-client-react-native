import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import fa from '../../utils/fa'
import { Button } from 'antd-mobile-rn';
import { Rater, Field } from '../../components'
import { PublicStyles } from "../../utils/style";
import { StackActions } from 'react-navigation';
import { NetworkImage } from "../../components/theme"
import { connect } from 'react-redux'

@connect(({ order })=>({
    goodsInfo: order.goodsInfo.result.info
}))
export default class EvaluateAdd extends Component {
    state = {
        score: 5,
        content: '',
        uploaderMaxNum: 9,
        uploaderButtonText: '上传图片(最多9张)',
        images: []
    }

    async componentWillMount() {
        const { navigation, dispatch } = this.props
        const { order_goods_id } = navigation.state.params
        dispatch({
            type: 'order/goodsInfo',
            payload: {
                id: order_goods_id
            }
        })
    }

    onImagesChange({ value }) {
        this.setState({
            images: value
        })
    }

    onContentChange({ value }) {
        this.setState({
            content: value
        })
    }

    onScoreChange({ value }) {
        this.setState({
            score: parseInt(value)
        })
    }

    onSubmit = () => {
        const { score, content, images } = this.state
        const { dispatch, navigation } = this.props
        const { updateListRow, order_goods_id, delta } = navigation.state.params
        if (!score) {
            return fa.toast.show({ title: '请选择评分' })
        }
        if (!content) {
            return fa.toast.show({ title: '请输入评价内容' })
        }
        let payload = {
            order_goods_id,
            is_anonymous: 0,
            content,
            score,
        }
        if (Array.isArray(images) && images.length > 0) {
            payload['images'] = images
        }
        dispatch({
            type: "goodsEvaluate/add",
            payload,
            callback: ()=>{
                if (updateListRow) {
                    updateListRow(order_goods_id)
                }
                navigation.dispatch(StackActions.pop({ n: typeof delta !== 'undefined' ? delta : 1 }));
            }
        })
    }

    render() {
        const {
            score,
            content,
            uploaderMaxNum,
        } = this.state
        const { goodsInfo } = this.props
        return goodsInfo ? <View style={[PublicStyles.ViewMax]}>
            <View style={{backgroundColor: '#fff'}}>
                <View style={styles.refundGoodsCard}>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.content}>
                                <View style={styles.image}>
                                    <NetworkImage
                                        style={{ width: 80, height: 80 }}
                                        source={{ uri: goodsInfo.goods_img }}
                                        resizeMode={'cover'}
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
                                        }} 
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Field
                    type={'textarea'}
                    placeholder="请输入您要评价的内容"
                    rows={3}
                    value={content}
                    onChange={(e) => {
                        this.onContentChange(e)
                    }}
                />
                <Field
                    title={'上传图片(最多9张)'}
                    type={'uploader'}
                    value={[]}
                    uploaderMaxNum={uploaderMaxNum}
                    onChange={(e) => {
                        this.onImagesChange(e)
                    }}
                />
            </View>
            <View style={styles.footer}>
                <Button 
                    type='warning' 
                    size="large" 
                    onClick={this.onSubmit}
                >
                    提交
                </Button>
            </View>
        </View> : null
    }
}
const styles = StyleSheet.create({
    refundGoodsCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor:'#f8f8f8',
        borderBottomWidth: 8
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
        padding: 15
    }
})
