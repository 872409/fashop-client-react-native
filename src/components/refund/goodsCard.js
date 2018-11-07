import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundGoodsCard extends Component {
    static propTypes = {
        goodsTitle: PropTypes.string,
        goodsImg: PropTypes.string,
        goodsNum: PropTypes.string,
        goodsSpec: PropTypes.string,
    };
    static defaultProps = {
        goodsTitle: null,
        goodsImg: null,
        goodsNum: null,
        goodsSpec: null,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            goodsTitle,
            goodsImg,
            goodsNum,
            goodsSpec,
        } = this.props
        return <View style={styles.refundGoodsCard}>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <Image source={{ uri: goodsImg }} resizeMode={'contain'} />
                        </View>
                        <View style={styles.body}>
                            <Text>{goodsTitle}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{goodsSpec}</Text>
                                <Text style={styles.number}>x {goodsNum}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    }
}
const styles = StyleSheet.create({
    "refund_goods_card": {},
    "refund_goods_card__item": {
        "padding": "15px",
        "borderBottom": "1px solid #F8F8F8"
    },
    "refund_goods_card__content": {
        "display": "flex",
        "justifyContent": "flex-start"
    },
    "refund_goods_card__item__image": {
        "width": "60px",
        "height": "60px",
        "display": "block",
        "overflow": "hidden",
        "marginRight": "10px"
    },
    "refund_goods_card__item_image": {
        "width": "60px",
        "height": "60px",
        "display": "block"
    },
    "refund_goods_card__item__body": {
        "flex": "1"
    },
    "refund_goods_card__item__body_text": {
        "fontSize": "14px",
        "color": "#333",
        "lineHeight": "20px",
        "display": "block",
        "overflow": "hidden"
    },
    "refund_goods_card__item__end": {
        "display": "flex",
        "justifyContent": "space-between",
        "marginTop": "5px",
        "fontSize": "12px",
        "color": "#999999",
        "lineHeight": "12px",
        "alignItems": "center"
    },
    "refund_goods_card__item__end__spec": {
        "fontSize": "12px",
        "color": "#999999",
        "display": "block"
    },
    "refund_goods_card__item__end__number": {
        "display": "block"
    },
    "refund_goods_card__item__footer": {
        "display": "flex",
        "justifyContent": "flex-end"
    }
})
