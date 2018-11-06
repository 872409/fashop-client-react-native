import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';

export default class FaFixedBottom extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    render() {
        const { children } = this.props
        return <View style={styles.fixedBottom}>
            {children}
        </View>
    }
}
