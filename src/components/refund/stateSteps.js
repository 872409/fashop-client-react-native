import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundStateSteps extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
        steps: PropTypes.array,
    };
    static defaultProps = {
        refundInfo: null,
        steps: [],
    };


    render() {
        const { refundInfo } = this.props
        const steps = [
            {
                current: false,
                done: true,
                text: '买家退款',
                desc: Time.format('M/D h:m', refundInfo.create_time)
            },
            {
                done: true,
                current: false,
                text: '商家受理',
                desc: Time.format('M/D h:m', refundInfo.create_time)
            },
            {
                done: true,
                current: true,
                text: '退款成功',
                desc: Time.format('M/D h:m', refundInfo.create_time)
            }
        ]
            // <fa-steps type="horizon" steps={steps} hasDesc={true} />

        return <View style={styles.refundSteps}>
            <Text>从ant里引入</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    refundSteps: {
        backgroundColor: "#F8F8F8"
    }
})
