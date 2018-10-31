import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        goodsList: PropTypes.array,
    };
    static defaultProps = {
        goodsList: null,
    };

    onRefund(goodsInfo) {
        if (this.props.onRefund) {
            this.props.onRefund({ goodsInfo });
        }
    }

    onRefundDetail(goodsInfo) {
        if (this.props.onRefundDetail) {
            this.props.onRefundDetail({ goodsInfo });
        }
    }

    onGoodsDetail(goodsInfo) {
        if (this.props.onGoodsDetail) {
            this.props.onGoodsDetail({ goodsInfo });
        }
    }

    render() {
        const { goodsList } = this.props
        return <View style={styles.orderGoodsList}>
            {goodsList.length > 0 ? goodsList.map((item) => <View style={styles.item}>
                <View style={styles.content} onPress={(item) => this.onGoodsDetail(item)}>
                    <View style={styles.image}>
                        <Image source={{ uri: item.goods_img }} resizeMode={'contain'} />
                    </View>
                    <View style={styles.body}>
                        <Text>{item.goods_title}</Text>
                    </View>
                    <View style={styles.end}>
                        <Text style={styles.price}>¥{item.goods_price}</Text>
                        <Text style={styles.number}>x {item.goods_num}</Text>
                    </View>
                </View>
                {item.refund_state === 1 ? <View style={styles.footer}>
                    <OrderButton
                        text="申请退款"
                        size="small"
                        onClick={(item) => {
                            this.onRefund(item)
                        }} />
                </View> : null}
                {item.refund_state === 2 ? <View style={styles.footer}>
                    <OrderButton
                        text="退款中"
                        size="small"
                        onClick={(item) => {
                            this.onRefundDetail(item)
                        }} />
                </View> : null}
                {item.refund_state === 3 ? <View style={styles.footer}>
                    <OrderButton
                        text="退款完成"
                        size="small"
                        onClick={(item) => {
                            this.onRefundDetail(item)
                        }} />
                </View> : null}
            </View>) : null}
        </View>
    }
}
