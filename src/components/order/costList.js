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
const styles = StyleSheet.create({
    "order_cost_list": {
        "backgroundColor": "#fff",
        "padding": "15px 0px"
    },
    "order_cost_list__item": {},
    "order_cost_list__item__row": {
        "display": "flex",
        "justifyContent": "space-between",
        "marginBottom": "10px",
        "padding": "0 15px"
    },
    "order_cost_list__item__row_label": {
        "fontSize": "14px",
        "fontWeight": "bold"
    },
    "order_cost_list__item__row_text": {
        "fontSize": "12px",
        "fontWeight": "bold"
    },
    "order_cost_list__footer": {
        "textAlign": "right",
        "padding": "10px 15px 0 15px",
        "borderTop": "1px solid #F8F8F8"
    },
    "order_cost_list__footer_label": {
        "fontSize": "12px"
    },
    "order_cost_list__footer_text": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "color": "#ff4400"
    }
})
