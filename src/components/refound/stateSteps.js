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
        refundInfo: PropTypes.object,
        steps: PropTypes.array,
    };
    static defaultProps = {
        refundInfo: null,
        steps: [],
    };

    ready() {
        const refundInfo = this.state.refundInfo
        this.setData({
            steps: [
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
        })
    }
    render(){
        return <View className="refund-steps">
            <fa-steps type="horizon" steps="{{steps}}" hasDesc="true"></fa-steps>
        </View>
    }
}
