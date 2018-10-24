import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { windowWidth } from '../../utils/PublicStyleModule';

export default class Index extends Component {
    render() {
        const { options } = this.props.data;
        const { color, style } = options
        return <View
            style={[styles.line,{
                borderBottomWidth: 1,
                borderBottomColor: color,
                borderBottomStyle: style,
            }]}
        />
    }
}

const styles = StyleSheet.create({
    line: {
        flex: 1,
        marginVertical: 20,
    }
});