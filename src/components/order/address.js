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

    render() {
        const { name ,phone,address} = this.props

        return <View style={styles.orderAddress}>
            <View style={styles.info}>
                <View style={styles.user}>
                    <Image source={require('../../images/order/buyer-address.png')} resizeMode="stretch" />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
                <View style={styles.address}>
                    地址：{address}
                </View>
            </View>
        </View>
    }
}
