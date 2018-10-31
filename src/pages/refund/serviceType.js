const orderModel = new OrderModel()
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import OrderModel from '../../models/order'

export default class Index extends Component {
    state = {
        goodsInfo: null,
    }

    async componentWillMount(options) {
        const goodsInfoResult = await orderModel.goodsInfo({
            id: typeof options['order_goods_id'] !== 'undefined' ? options['order_goods_id'] : 414
        })
        this.setState({
            goodsInfo: goodsInfoResult.info,
        })
    }

    onClick(e) {
        wx.navigateTo({
            url: `/pages/refund/serviceApply/index?order_goods_id=${this.state.goodsInfo.id}&delta=2&refund_type=${e.currentTarget.dataset.refundType}`
        })
    }

    render() {
        return <View>
            <List>
                <View style={styles.refundGoodsCard}>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.content}>
                                <View style={styles.image}>
                                    <Image source={goodsInfo.goods_img} resizeMode={'contain'} />
                                </View>
                                <View style={styles.body}>
                                    <Text>{goodsInfo.goods_title}</Text>
                                    <View style={styles.end}>
                                        <Text style={styles.spec}>{goodsInfo.goods_spec_string}</Text>
                                        <Text style={styles.number}>x {goodsInfo.goods_num}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </List>
            <List>
                <Cell
                    isLink={true}
                    title="仅退款"
                    label="未收到货（包含未签收），或卖家协商同意前提现"
                    data-refund-type="1"
                    onClick={(e) => this.onClick(e)}
                    icon="../../images/refund/refund-type-1.png"
                >
                </Cell>
                <Cell isLink={true}
                      title="退货退款"
                      label="已收到货，需要退换已收到的货物"
                      data-refund-type="2"
                      onClick={(e) => this.onClick(e)}
                      icon="../../images/refund/refund-type-2.png">
                </Cell>
            </List>
        </View>

    }

}
