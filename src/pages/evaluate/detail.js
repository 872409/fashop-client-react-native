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
export default class Index extends Component {
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

    async onShow() {
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
        return <View style={styles.evaluateDetail}>
            <View style={styles.goodsEvaluateItem}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Image source={{ uri: evaluate.avatar }} resizeMode={'contain'} />
                        <View style={styles.nickname}>
                            <Text>{evaluate.nickname}</Text>
                            <TimeFormat value="{{evaluate.create_time}}" />
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
