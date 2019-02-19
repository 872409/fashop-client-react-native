import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from "prop-types";
import OrderButton from './button'

export default class OrderFooterAction extends Component {
    static propTypes = {
        showReceiveBtn: PropTypes.bool,
        showCancelBtn: PropTypes.bool,
        showDelBtn: PropTypes.bool,
        showEvaluateBtn: PropTypes.bool,
        showPayBtn: PropTypes.bool,
        showLogisticsBtn: PropTypes.bool,
    };
    static defaultProps = {
        orderInfo: null,
        orderState: null,
        showReceiveBtn: null,
        showCancelBtn: null,
        showEvaluateBtn: false,
        showPayBtn: false,
        showLogisticsBtn: false,
    };

    render() {
        const {
            showReceiveBtn,
            showCancelBtn,
            showEvaluateBtn,
            showPayBtn,
            showLogisticsBtn,
            onCancel,
            onPay,
            onReceive,
            onEvaluate,
            onLogistics,
        } = this.props
        return <View style={styles.orderFooterAction}>
            <View style={styles.footer}>
                <View style={styles.left}/>
                <View style={styles.right}>
                    {showCancelBtn === true ? <OrderButton text="取消订单" onClick={onCancel} /> : null}
                    {showPayBtn === true ? <OrderButton text="去支付" type="danger" onClick={onPay} /> : null}
                    {showReceiveBtn === true ? <OrderButton text="确认收货" type="danger" onClick={onReceive} /> : null}
                    {showEvaluateBtn === true ? <OrderButton text="去评价" onClick={onEvaluate} /> : null}
                    {showLogisticsBtn === true ? <OrderButton text="查看物流" onClick={onLogistics} /> : null}
                </View>
            </View>
        </View>

    }
}
const styles = StyleSheet.create({
    orderFooterAction: {
        backgroundColor: "#ffffff",
        zIndex: 6,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: '#F8F8F8'
    },
    footer: {
        padding: 15,
        justifyContent: "space-between",
        fontSize: 14,
        lineHeight: 14,
        alignItems: "center",
        flexDirection: 'row'
    },
    left: {
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    right: {
        justifyContent: "flex-end",
        flexDirection: 'row'
    }
})
