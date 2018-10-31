import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        height: PropTypes.number,
        autoLayout: PropTypes.bool,
    };
    static defaultProps = {
        height: windowWidth * 0.4,
        autoLayout: false,
    };
    properties: {
        orderId: {
            type: String,
            value: null
        },
        text: {
            type: String,
            value: null
        },
        active: {
            type: Boolean,
            value: false
        }
    }

    onClick(e) {
        this.triggerEvent('click', { orderId: this.state.orderId });
    }
    render(){
        return <View className="cart-botton">
        </View>
    }
}
