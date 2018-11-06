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
