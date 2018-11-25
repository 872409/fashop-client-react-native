import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import { windowWidth } from '../../utils/publicStyleModule';

export default class BodyImage extends Component {
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
