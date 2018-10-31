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
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
    };
    static defaultProps = {
        name: null,
        phone: null,
        address: null,
    };
    render(){
        return <View className="order-address">
            <View className="info">
                <View className="user">
                    <image src="/themes/default/order/buyer-address.png" mode="scaleToFill" />
                    <text className="name">{{ name }}</text>
                    <text className="phone">{{ phone }}</text>
                </View>
                <View className="address">
                    地址：{{ address }}
                </View>
            </View>
        </View>
    }
}
