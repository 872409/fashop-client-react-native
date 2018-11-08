import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";

export default class OrderBaseInfo extends Component {
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
        // todo
        wx.setClipboardData({
            data: `${this.state.orderNumber}`
        })
    }

    render() {
        const { orderNumber, createTime, payTime, payment } = this.props
        return <View style={styles.orderBaseInfo}>
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.label}>订单编号：</Text>
                    <Text style={styles.text}>{{ orderNumber }}</Text>
                    <OrderButton text="复制" size="small" onClick={() => {
                        this.setClipboardData()
                    }} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>下单时间：</Text>
                    <TimeFormat style={styles.time} value={createTime} />
                </View>
            </View>
            {payTime > 0 ? <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.label}>支付方式：</Text>
                    <Text style={styles.text}>{payment}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>支付时间：</Text>
                    <TimeFormat style={styles.time} value={payTime} />
                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderBaseInfo: {},
    item: {
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8',
        paddingVertical: 10
    },
    row: {
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 7.5,
        paddingHorizontal: 15
    },
    label: {
        fontSize: 14,
        fontWeight: 800,
        lineHeight: 14,
        color: "#333"
    },
    text: {
        fontSize: 14,
        lineHeight: 14,
        color: "#666"
    },
    time: {
        fontSize: 14,
        lineHeight: 14,
        color: "#666"
    }
})
