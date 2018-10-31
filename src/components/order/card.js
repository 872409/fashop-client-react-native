import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';

export default class Index extends Component{
    static propTypes = {
    };
    static defaultProps = {
    };
    render(){
        return <View className="order-card">
            <slot></slot>
        </View>
    }
}
