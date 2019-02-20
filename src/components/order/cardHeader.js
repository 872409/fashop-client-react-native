import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from "prop-types";
import { ThemeStyle } from '../../utils/style';

export default class OrderCardHeader extends Component {
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
                <Text style={styles.leftText}>单号：{sn}</Text>
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
    orderCardHeader: {
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F8F8F8",
        flexDirection: 'row'
    },
    left: {
        alignItems: "center"
    },
    leftText: {
        fontSize: 15,
        color: "#999999",
    },
    right: {
        justifyContent: "space-between",
        alignItems: "center"
    },
    state: {
        fontSize: 15,
        color: "#333"
    },
    delIcon: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    state0: {
        color: ThemeStyle.ThemeColor4
    },
    state10: {
        color: ThemeStyle.ThemeColor4
    },
    state20: {
        color: ThemeStyle.ThemeColor4
    },
    state30: {
        color: ThemeStyle.ThemeColor4
    },
    state40: {
        color: ThemeStyle.ThemeColor4
    }
})
