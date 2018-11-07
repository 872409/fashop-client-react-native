import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Index extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return <View style={styles.orderCard}>
            {this.props.children}
        </View>
    }
}
const styles = StyleSheet.create({
    "order_card": {
        "backgroundColor": "#ffffff"
    }
})
