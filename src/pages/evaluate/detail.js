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
                        <Image source={{ uri: evaluate.avatar }} resizeMode={'contain'} style={styles.avatarImage} />
                        <View style={styles.nickname}>
                            <Text style={styles.nicknameText}>{evaluate.nickname}</Text>
                            <TimeFormat value={evaluate.create_time} />
                        </View>
                    </View>
                    <View style={styles.star}>
                        <Rater size={12} num={5} value={evaluate.score} />
                    </View>
                </View>

                {evaluate.content ? <View style={styles.content}><Text
                    style={styles.contentText}>{evaluate.content}</Text></View> : null}
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
                                    style={styles.photoListImage}
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
    evaluateDetail: {
        padding: 15,
        backgroundColor: "#FFFFFF"
    },
    goodsEvaluateItem: {},
    header: {
        marginTop: 15,
        justifyContent: "space-between",
        marginBottom: 15
    },
    avatar: {

        justifyContent: "start"
    },
    avatarImage: {
        width: 32,
        height: 32,
        marginRight: 10
    },
    nickname: {

        flexDirection: "column"
    },
    nicknameText: {
        fontSize: 14,
        lineHeight: 14,
        marginBottom: 6,
        fontWeight: 800,
        flex: 1
    },

    content: {
        fontSize: 14,
        color: "#333"
    },

    contentText: {
        fontSize: 12,
        lineHeight: 22,
        color: "#333",
        width: "100%",
        marginBottom: 10
    },
    replyContent: {
        backgroundColor: "#f8f8f8",
        padding: 5,
        fontSize: 12,
        lineHeight: 22,
        color: "#666",
        borderRadius: 3
    },

    photoList: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    photoListImage: {
        width: 80,
        height: 80,
        marginBottom: 5,
        marginRight: 5
    },
    spec: {
        fontSize: 12,
        lineHeight: 12,
        color: "#999",
        marginTop: 10,
        marginBottom: 15
    },
    footer: {
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: "#F8F8F8",
        textAlign: "center",
        color: "#999999",
        fontSize: 14,
        lineHeight: 14,
        padding: "15px 0"
    }
})
