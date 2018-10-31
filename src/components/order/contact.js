import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class Index extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return <View style={styles.orderContact}>
            <Image source={require('../../images/order/customer-service.png')} resizeMode="stretch" />
            <Text>联系客服</Text>
        </View>
    }

}
