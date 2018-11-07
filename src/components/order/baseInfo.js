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
        orderNumber: PropTypes.number,
        createTime: PropTypes.number,
        payTime: PropTypes.number,
        payment: PropTypes.string,
    };
    static defaultProps = {
        orderNumber: null,
        createTime: null,
        payTime: null,
        payment: null,
    };

    setClipboardData() {
        wx.setClipboardData({
            data: `${this.state.orderNumber}`
        })
    }

    render() {
        const { orderNumber, createTime, payTime, payment } = this.props
        return <View style={styles.orderBaseInfo}>
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text>订单编号：</Text>
                    <Text>{{ orderNumber }}</Text>
                    <OrderButton text="复制" size="small" onClick={() => {
                        this.setClipboardData()
                    }} />
                </View>
                <View style={styles.row}>
                    <Text>下单时间：</Text>
                    <TimeFormat style={styles.time} value={createTime} />
                </View>
            </View>
            {payTime > 0 ? <View style={styles.item}>
                <View style={styles.row}>
                    <Text>支付方式：</Text>
                    <Text>{{ payment }}</Text>
                </View>
                <View style={styles.row}>
                    <Text>支付时间：</Text>
                    <TimeFormat style={styles.time} value={payTime} />
                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    "order_base_info": {},
    "order_base_info__item": {
        "borderBottom": "1px solid #F8F8F8",
        "padding": "10px 0"
    },
    "order_base_info__item__row": {
        "display": "flex",
        "justifyContent": "flex-start",
        "alignItems": "center",
        "padding": "7.5px 15px"
    },
    "order_base_info__item__row_label": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "lineHeight": "14px",
        "display": "block",
        "color": "#333"
    },
    "order_base_info__item__row_text": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#666"
    },
    "order_base_info__item__row_time_format": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#666"
    }
})
