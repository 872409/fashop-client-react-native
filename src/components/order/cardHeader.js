import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        state: PropTypes.number,
        sn: PropTypes.string,
    };
    static defaultProps = {
        state: null,
        sn: null,
    };

    render() {
        const {
            state,
            sn
        } = this.props
        return <View style={styles.orderCardHeader}>
            <View style={styles.left}>
                <Text>单号：{sn}</Text>
            </View>
            <View style={styles.right}>
                {state === 0 ? <Text style={styles.state0}>已取消</Text> : null}
                {state === 10 ? <Text style={styles.state10}>等待付款</Text> : null}
                {state === 20 ? <Text style={styles.state20}>待发货</Text> : null}
                {state === 30 ? <Text style={styles.state30}>已发货</Text> : null}
                {state === 40 ? <Text style={styles.state40}>已完成</Text> : null}
            </View>
        </View>


    }
}
const styles = StyleSheet.create({
    "order_card_header": {
        "display": "flex",
        "justifyContent": "space-between",
        "padding": "10px 15px",
        "borderBottom": "1px solid #F8F8F8"
    },
    "order_card_header__left": {
        "display": "flex",
        "alignItems": "center"
    },
    "order_card_header__left_text": {
        "fontSize": "14px",
        "color": "#999999",
        "lineHeight": "14px",
        "height": "14px",
        "display": "block"
    },
    "order_card_header__right": {
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center"
    },
    "order_card_header__right__state": {
        "fontSize": "14px",
        "color": "#333"
    },
    "order_card_header__right__del_icon": {
        "width": "20px",
        "height": "20px",
        "marginLeft": "10px"
    },
    "order_card_header__right__state_0": {
        "color": "red"
    },
    "order_card_header__right__state_10": {
        "color": "red"
    },
    "order_card_header__right__state_20": {
        "color": "red"
    },
    "order_card_header__right__state_30": {
        "color": "red"
    },
    "order_card_header__right__state_40": {
        "color": "red"
    }
})
