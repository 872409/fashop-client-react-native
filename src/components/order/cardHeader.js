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
