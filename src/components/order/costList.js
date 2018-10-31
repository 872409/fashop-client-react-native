import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        goodsTotal: PropTypes.number,
        freight: PropTypes.number,
        totalCost: PropTypes.number,
    };
    static defaultProps = {
        goodsTotal: null,
        freight: null,
        totalCost: null,
    };

    render() {
        const {
            goodsTotal,
            freight,
            totalCost
        } = this.props
        return <View style={styles.orderCostList}>
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text>商品总额：</Text>
                    <Text>¥{goodsTotal}</Text>
                </View>
                <View style={styles.row}>
                    <Text>运费：</Text>
                    <Text>¥{freight}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>实付款：</Text>
                <Text>¥{totalCost}</Text>
            </View>
        </View>
    }
}
