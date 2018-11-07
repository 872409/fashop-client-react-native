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
            showReceiveBtn,
            showCancelBtn,
            showEvaluateBtn,
            showPayBtn,
            showLogisticsBtn,
        } = this.props
        return <View style={styles.orderFooterAction}>
            <View style={styles.footer}>
                <View style={styles.left}>
                </View>
                <View style={styles.right}>
                    {showCancelBtn === true ? <OrderButton text="取消订单" onClick={() => {
                        this.onCancel()
                    }} /> : null}
                    {showPayBtn === true ? <OrderButton text="去支付" type="danger" onClick={() => {
                        this.onPay()
                    }} /> : null}
                    {showReceiveBtn === true ? <OrderButton text="确认收货" type="danger" onClick={() => {
                        this.onReceive()
                    }} /> : null}
                    {showEvaluateBtn === true ? <OrderButton text="评价" onClick={() => {
                        this.onEvaluate()
                    }} /> : null}

                </View>
            </View>
        </View>

    }
}
const styles = StyleSheet.create({
    "order_footer_action": {
        "position": "fixed",
        "bottom": "0",
        "left": "0",
        "backgroundColor": "#ffffff",
        "width": "100vw",
        "zIndex": "6",
        "borderTop": "1px solid #F8F8F8"
    },
    "order_footer_action__footer": {
        "padding": "15px",
        "display": "flex",
        "justifyContent": "space-between",
        "fontSize": "14px",
        "lineHeight": "14px",
        "alignItems": "center"
    },
    "order_footer_action__footer__left": {
        "display": "flex",
        "justifyContent": "space-between"
    },
    "order_footer_action__footer__right": {
        "display": "flex",
        "justifyContent": "space-between"
    }
})
