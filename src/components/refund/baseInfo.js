import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundBaseInfo extends Component {
    static propTypes = {
        reason: PropTypes.string,
        amount: PropTypes.number,
        num: PropTypes.number,
        createTime: PropTypes.number,
        refundNumber: PropTypes.string
    };
    static defaultProps = {
        reason: null,
        amount: null,
        num: null,
        createTime: null,
        refundNumber: null
    };

    render() {
        const {
            reason,
            amount,
            num,
            createTime,
            refundNumber
        } = this.props
        return <View style={styles.refundBaseInfo}>
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text>退款原因：</Text>
                    <Text>{reason}</Text>
                </View>
                <View style={styles.row}>
                    <Text>退款金额：</Text>
                    <Text>{amount}</Text>
                </View>
                <View style={styles.row}>
                    <Text>申请件数：</Text>
                    <Text>{num}</Text>
                </View>
                <View style={styles.row}>
                    <Text>申请时间：</Text>
                    <TimeFormat value={createTime} />
                </View>
                <View style={styles.row}>
                    <Text>退款编号：</Text>
                    <Text>{refundNumber}</Text>
                </View>
            </View>
        </View>
    }

}
const styles = StyleSheet.create({
    "refund_base_info": {},
    "refund_base_info__item": {
        "borderBottom": "1px solid #F8F8F8",
        "padding": "10px 0"
    },
    "refund_base_info__item__row": {
        "display": "flex",
        "justifyContent": "flex-start",
        "alignItems": "center",
        "padding": "7.5px 15px"
    },
    "refund_base_info__item__row_label": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "lineHeight": "14px",
        "display": "block",
        "color": "#333"
    },
    "refund_base_info__item__row_text": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#666"
    },
    "time_format": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#666"
    }
})
