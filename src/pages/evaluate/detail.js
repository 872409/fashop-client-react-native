import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import GoodsEvaluate from '../../models/goodsEvaluate'
import { Field, FixedBottom } from '../../components'

const goodsEvaluateModel = new GoodsEvaluate()
export default class EvaluateDetail extends Component {
    state = {
        order_goods_id: null,
        evaluate: null
    }

    componentWillMount({ order_goods_id }) {
        this.setState({
            order_goods_id
        })
    }

    preViewImage(e) {
        // todo
        wx.preViewImage({
            current: e.currentTarget.dataset.url,
            urls: e.currentTarget.dataset.images
        })
    }
    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {
                // todo
                const { order_goods_id } = this.state
                const evaluate = await goodsEvaluateModel.info({
                    order_goods_id
                })
                this.setState({
                    evaluate
                })
                this.updateListRow()
            }
        );
    }

    updateListRow() {
        // todo
        const { id } = this.state.evaluate
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        const {
            evaluate
        } = this.state
        return <View style={styles.evaluateDetail}>
            <View style={styles.goodsEvaluateItem}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Image source={{ uri: evaluate.avatar }} resizeMode={'contain'} />
                        <View style={styles.nickname}>
                            <Text>{evaluate.nickname}</Text>
                            <TimeFormat value={evaluate.create_time} />
                        </View>
                    </View>
                    <View style={styles.star}>
                        <Rater size={12} num={5} value={evaluate.score} />
                    </View>
                </View>

                {evaluate.content ? <View style={styles.content}><Text>{evaluate.content}</Text></View> : null}
                {Array.isArray(evaluate.images) && evaluate.images.length > 0 ?
                    <View style={styles.photoList}>
                        {
                            evaluate.images.map((item, index) => {
                                return <Image
                                    source={{ uri: item }}
                                    resizeMode={'contain'}
                                    onPress={() => {
                                        this.preViewImage(item, index, evaluate.images)
                                    }}
                                />
                            })
                        }
                    </View>
                    : null}
                {evaluate.reply_content ? <View style={styles.replyContent}>
                    <Text>客服：</Text>
                    <Text>{evaluate.reply_content}</Text>
                    <TimeFormat value={evaluate.reply_time} />
                </View> : null}

                {evaluate.additional_content || evaluate.additional_images ? <View style={styles.content}>
                    <Text>{evaluate.additional_interval_day === 0 ? '当天' : evaluate.additional_interval_day + '天后'}追评</Text>
                    {evaluate.additional_content ? <Text>{evaluate.additional_content}</Text> : null}
                </View> : null}

                {evaluate.additional_images.length > 0 ?
                    <View style={styles.photoList}>
                        {
                            evaluate.additional_images.map((item, index) => {
                                return <Image
                                    source={{ uri: item }}
                                    resizeMode={'contain'}
                                    onPress={() => {
                                        this.preViewImage(item, index, evaluate.additional_images)
                                    }}
                                />
                            })
                        }
                    </View>
                    : null}

                {evaluate.reply_content2 ? <View style={styles.replyContent}>
                    <Text>客服：</Text>
                    <Text>{evaluate.reply_content2}</Text>
                    <TimeFormat value={evaluate.reply_time2} />
                </View> : null}

                <View style={styles.spec}>
                    <Text>{goodsInfo.goods_spec_string}</Text>
                </View>
                <View style={styles.goodsEvaluate}>
                    <Image source={goodsInfo.goods_img} resizeMode={'contain'} />
                    <Text>{goodsInfo.goods_title}</Text>
                </View>
            </View>
        </View>
    }

}
const styles = StyleSheet.create({
    "evaluate_detail": {
        "padding": "15px",
        "display": "block",
        "boxSizing": "border-box",
        "backgroundColor": "#FFFFFF"
    },
    "goods_evaluate_item__header": {
        "marginTop": "15px",
        "display": "flex",
        "justifyContent": "space-between",
        "marginBottom": "15px"
    },
    "goods_evaluate_item__header__avatar": {
        "display": "flex",
        "justifyContent": "start"
    },
    "goods_evaluate_item__header__avatar_image": {
        "width": "32px",
        "height": "32px",
        "marginRight": "10px"
    },
    "goods_evaluate_item__header__avatar__nickname": {
        "display": "flex",
        "flexDirection": "column"
    },
    "goods_evaluate_item__header__avatar__nickname_text": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "marginBottom": "6px",
        "fontWeight": "bold",
        "flex": "1"
    },
    "goods_evaluate_item__header__avatar__nickname_label": {
        "fontSize": "12px",
        "lineHeight": "12px",
        "flex": "1",
        "color": "#999999"
    },
    "goods_evaluate_item__header__star": {},
    "goods_evaluate_item__content": {
        "fontSize": "14px",
        "color": "#333"
    },
    "goods_evaluate_item__content_label": {
        "borderLeft": "3px solid #FF635C",
        "paddingLeft": "5px",
        "height": "12px",
        "lineHeight": "14px",
        "margin": "10px 0",
        "display": "block",
        "fontWeight": "bold",
        "fontSize": "12px"
    },
    "goods_evaluate_item__content_text": {
        "fontSize": "12px",
        "lineHeight": "22px",
        "color": "#333",
        "display": "block",
        "width": "100%",
        "marginBottom": "10px"
    },
    "goods_evaluate_item__reply_content": {
        "backgroundColor": "#f8f8f8",
        "padding": "5px",
        "fontSize": "12px",
        "lineHeight": "22px",
        "color": "#666",
        "borderRadius": "3px"
    },
    "goods_evaluate_item__reply_content_time_format": {
        "marginLeft": "5px",
        "color": "#999999"
    },
    "goods_evaluate_item__conte_goods_evaluate_item__header": {
        "marginTop": "15px",
        "display": "flex",
        "justifyContent": "space-between",
        "marginBottom": "15px"
    },
    "goods_evaluate_item__reply_content_label": {},
    "goods_evaluate_item__reply_content_text": {
        "marginBottom": "10px"
    },
    "goods_evaluate_item__photo_list": {
        "marginTop": "10px",
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap"
    },
    "goods_evaluate_item__photo_list_last_child": {
        "marginBottom": "10px"
    },
    "goods_evaluate_item__photo_list_image": {
        "width": "80px",
        "height": "80px",
        "marginBottom": "5px",
        "marginRight": "5px"
    },
    "goods_evaluate_item__spec": {
        "fontSize": "12px",
        "lineHeight": "12px",
        "color": "#999",
        "margin": "10px 0 15px 0"
    },
    "goods_evaluate_item__footer": {
        "borderTop": "1px solid #F8F8F8",
        "textAlign": "center",
        "color": "#999999",
        "fontSize": "14px",
        "lineHeight": "14px",
        "padding": "15px 0"
    }
})
