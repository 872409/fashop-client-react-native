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
        goodsList: [],
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            goodsList,
        } = this.props
        return <View>
            {goodsList.length > 1 ? <View onPress={this.onClick()}>
                <ScrollView contentContainerStyle={styles.orderCardGoods}>
                    <View>
                        {
                            goodsList.length > 0 ? goodsList.map((item) => {
                                return <View style={styles.item}>
                                    <Image source={{ uri: item.goods_img }} resizeMode={'contain'} />
                                </View>
                            }) : null}
                    </View>
                </ScrollView>
            </View> : null}
            {goodsList.length === 1 ? <View onPress={this.onClick()}>
                <View style={styles.orderCardGoodsOne}>
                    {goodsList.map((item) => {
                        return <View style={styles.oneItem}>
                            <View style={styles.image}>
                                <Image source={{ uri: item.goods_img }} resizeMode={'contain'} />
                            </View>
                            <View style={styles.body}>
                                <Text>{item.goods_title}</Text>
                                <View style={styles.desc}>
                                    <Text>{item.goods_spec_string}</Text><i>x{item.goods_num}</i></View>
                                <Text>¥{item.goods_price}</Text>
                            </View>
                        </View>
                    })}

                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    "order_card_goods": {
        "padding": "15px 15px 0 15px",
        "width": "100%",
        "overflow": "hidden",
        "whiteSpace": "nowrap",
        "boxSizing": "border-box"
    },
    "order_card_goods__item": {
        "marginRight": "10px",
        "display": "inline-block",
        "borderBottom": "1px solid #F8F8F8"
    },
    "order_card_goods__item_image": {
        "width": "75px",
        "height": "75px"
    },
    "order_card_goods_one": {
        "padding": "15px 15px 0 15px"
    },
    "order_card_goods_one__one_item": {
        "display": "flex",
        "justifyContent": "flex-start",
        "height": "75px"
    },
    "order_card_goods_one__one_item_image": {
        "width": "75px",
        "height": "75px",
        "display": "block",
        "marginRight": "10px"
    },
    "order_card_goods_one__one_item__body": {
        "overflow": "hidden",
        "flex": "1",
        "color": "#333",
        "position": "relative"
    },
    "order_card_goods_one__one_item__body_text": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "lineHeight": "18px",
        "display": "block",
        "overflow": "hidden"
    },
    "order_card_goods_one__one_item__body_label": {
        "fontSize": "12px",
        "position": "absolute",
        "bottom": "0",
        "left": "0",
        "color": "#666"
    },
    "order_card_goods_one__one_item__body__desc": {
        "fontSize": "12px",
        "color": "#999",
        "lineHeight": "12px",
        "marginBottom": "10px",
        "height": "12px",
        "marginTop": "5px",
        "display": "flex",
        "justifyContent": "space-between"
    },
    "order_card_goods_one__one_item__body__desc_label": {},
    "order_card_goods_one__one_item__body__desc_i": {}
})
