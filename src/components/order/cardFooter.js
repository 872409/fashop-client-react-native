import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";
import { Button } from 'antd-mobile-rn';

export default class OrderCardFooter extends Component {
    static propTypes = {
        goodsNumber: PropTypes.number,
        totalCost: PropTypes.any,
        showEvaluateBtn: PropTypes.bool,
        showPayBtn: PropTypes.bool,
        showReceiveBtn: PropTypes.bool,
        showLogisticsBtn: PropTypes.bool,
        showCancelBtn: PropTypes.bool,
    };
    static defaultProps = {
        goodsNumber: null,
        totalCost: null,
        showEvaluateBtn: false,
        showPayBtn: false,
        showReceiveBtn: false,
        showLogisticsBtn: false,
        showCancelBtn: false,
    };

    render() {
        const {
            goodsNumber,
            totalCost,
            showEvaluateBtn,
            showPayBtn,
            showReceiveBtn,
            showCancelBtn,
            showLogisticsBtn,
            onCancel,
            onPay,
            onEvaluate,
            onReceive,
            onLogistics,
        } = this.props

        return <View style={styles.orderCardFooter}>
            <View style={styles.header}>
                <Text style={styles.number}>共{goodsNumber}件商品</Text>
                <Text style={styles.priceDesc}>实付款：</Text>
                <Text style={styles.price}>¥{totalCost}</Text>
            </View>
            {
                showCancelBtn || showEvaluateBtn || showPayBtn || showReceiveBtn || showLogisticsBtn ?
                <View style={styles.footer}>
                    {
                        showCancelBtn === true ?
                        <Button
                            size="small"
                            onClick={onCancel}
                            style={styles.btn}
                        >
                            取消
                        </Button> : null
                    }
                    {
                        showEvaluateBtn === true ?
                        <Button
                            type="ghost"
                            size="small"
                            onClick={onEvaluate}
                            style={styles.btn}
                        >
                            去评价
                        </Button> : null
                    }
                    {
                        showPayBtn === true ?
                        <Button
                            type="ghost"
                            size="small"
                            onClick={onPay}
                            style={styles.btn}
                        >
                            去支付
                        </Button> : null
                    }
                    {
                        showReceiveBtn === true ?
                        <Button
                            type="ghost"
                            size="small"
                            onClick={onReceive}
                            style={styles.btn}
                        >
                            确认收货
                        </Button> : null
                    }
                    {
                        showLogisticsBtn === true ?
                        <Button
                            type="ghost"
                            size="small"
                            onClick={onLogistics}
                            style={styles.btn}
                        >
                            查看物流
                        </Button> : null
                    }
                </View> : null
            }
        </View>
    }
}
const styles = StyleSheet.create({
    orderCardFooter: {
        paddingVertical: 0,
        paddingHorizontal: 15,
        borderTopColor: '#f8f8f8',
        borderTopWidth:1
    },
    header: {
        textAlign: "right",
        paddingVertical:10,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: 'row'
    },
    number: {
        fontSize: 14,
        color: "#333333",

    },
    priceDesc: {
        fontSize: 14,
        color: "#333333",
        marginLeft: 10
    },
    price: {
        fontSize: 16,
        color: "#333333",
        fontWeight: "800",

    },
    footer: {
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: "#f8f8f8",
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 0,
        flexDirection: 'row'

    },
    btn: {
        paddingLeft: 18, 
        paddingRight: 18,
        marginLeft: 10
    }
})
