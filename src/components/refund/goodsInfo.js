import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundGoodsInfo extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onGoods() {
        if (this.props.onGoods) {
            this.props.onGoods();
        }
    }

    render() {
        const {
            refundInfo,
        } = this.props
        return <View style={styles.refundGoodsInfo}>
            <View style={styles.header}>退款信息</View>
            <View style={styles.body}>
                <View style={styles.item} onPress={this.onGoods()}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <Image source={{ uri: refundInfo.goods_img }} resizeMode={'contain'} />
                        </View>
                        <View style={styles.body}>
                            <Text>{refundInfo.goods_title}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{refundInfo.goods_spec_string}</Text>
                                <Text style={styles.number}>x {refundInfo.goods_num}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    "refund_goods_info": {},
    "refund_goods_info__header": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "padding": "15px 15px 0 15px"
    },
    "refund_goods_info__item": {
        "padding": "15px",
        "borderBottom": "1px solid #F8F8F8"
    },
    "refund_goods_info__content": {
        "display": "flex",
        "justifyContent": "flex-start"
    },
    "refund_goods_info__item__image": {
        "width": "60px",
        "height": "60px",
        "display": "block",
        "overflow": "hidden",
        "marginRight": "10px"
    },
    "refund_goods_info__item_image": {
        "width": "60px",
        "height": "60px",
        "display": "block"
    },
    "refund_goods_info__item__body": {
        "flex": "1"
    },
    "refund_goods_info__item__body_text": {
        "fontSize": "12px",
        "color": "#333",
        "lineHeight": "18px",
        "display": "block",
        "overflow": "hidden"
    },
    "refund_goods_info__item__end": {
        "display": "flex",
        "justifyContent": "space-between",
        "marginTop": "5px",
        "fontSize": "12px",
        "color": "#999999",
        "lineHeight": "12px",
        "alignItems": "center"
    },
    "refund_goods_info__item__end__spec": {
        "color": "#999999",
        "display": "block"
    },
    "refund_goods_info__item__end__number": {
        "display": "block"
    },
    "refund_goods_info__item__footer": {
        "display": "flex",
        "justifyContent": "flex-end"
    }
})
