import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    ViewPropTypes,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';
import { Image as NewworkImage, ThemeButton } from '../theme'
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeStyle, windowHeight, windowWidth } from '../../utils/PublicStyleModule';

const isIphoneX = (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowHeight === 812 || windowWidth === 812)
);

export default class PublishAddIcon extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        style: ViewPropTypes.style,
    }
    static defaultProps = {
        onPress: () => {},
        style: {}
    }
    render() {
        const {
            onPress,
            style
        } = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={[styles.warp, style]}
            >
                <Ionicons
                    name='ios-add'
                    color={ThemeStyle.ThemeColor}
                    size={40}
                />
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    warp: {
        width: 44,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 22,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 15,
        bottom: isIphoneX ? 35 : 15,
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#1F1F1F',
        //让安卓拥有灰色阴影
        elevation: 4,
    }
})
