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
        goodsNumber: PropTypes.number,
        totalCost: PropTypes.number,
        showEvaluateBtn: PropTypes.bool,
        showPayBtn: PropTypes.bool,
        showReceiveBtn: PropTypes.bool,
        showLogisticsBtn: PropTypes.bool,
    };
    static defaultProps = {
        goodsNumber: null,
        totalCost: null,
        showEvaluateBtn: false,
        showPayBtn: false,
        showReceiveBtn: false,
        showLogisticsBtn: false,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    onReceive() {
        if (this.props.onReceive) {
            this.props.onReceive();
        }
    }

    onPay() {
        if (this.props.onPay) {
            this.props.onPay();
        }
    }

    onEvaluate() {
        if (this.props.onEvaluate) {
            this.props.onEvaluate();
        }
    }

    render() {
        const {
            goodsNumber,
            totalCost,
            showEvaluateBtn,
            showPayBtn,
            showReceiveBtn,
            showLogisticsBtn,
        } = this.props

        return <View style={styles.orderCardFooter}>
            <View style={styles.header}>
                <Text style={styles.number}>共{ goodsNumber}件商品</Text>
                <Text style={styles.priceDesc}>实付款：</Text>
                <Text style={styles.price}>¥{ totalCost }</Text>
            </View>
            {showCancelBtn || showEvaluateBtn || showPayBtn || showReceiveBtn ?
                <View style={styles.footer}>
                    {showCancelBtn === true ?
                        <View style={[styles.btn, styles.btnDanger]} onPress={this.onCancel()}>取消</View> : null}
                    {showEvaluateBtn === true ?
                        <View style={[styles.btn, styles.btnDanger]} onPress={this.onEvaluate()}>评价</View> : null}
                    {showPayBtn === true ?
                        <View style={[styles.btn, styles.btnDanger]} onPress={this.onPay()}>去支付</View> : null}
                    {showReceiveBtn === true ?
                        <View style={[styles.btn, styles.btnDanger]} onPress={this.onReceive()}>确认收货</View> : null}
                </View> : null}
        </View>
    }
}
