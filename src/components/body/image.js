import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';

export default class Index extends Component {
    render() {
        const { url } = this.props
        return <Image
            source={{
                uri: url
            }}
            style={styles.img}
        />
    }
}

const styles = StyleSheet.create({
    img: {
        width: windowWidth,
        height: windowWidth
    },
});
