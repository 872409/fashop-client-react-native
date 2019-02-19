import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { ThemeStyle, PublicStyles } from '../../utils/style';

export default class OrderButton extends Component {
    static propTypes = {
        size: PropTypes.string,
        text: PropTypes.string,
        type: PropTypes.string,
        active: PropTypes.bool,
    }
    static defaultProps = {
        size: null,
        text: null,
        type: null,
        active: false,
    }

    render() {
        const { size, text, type, active, onClick } = this.props
        return <TouchableOpacity style={[PublicStyles.rowCenter,styles.orderButton]} onPress={onClick}><Text>{text}</Text></TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    orderButton: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#eaeaea",
        fontSize: 14,
        borderRadius: 3,
        height: 30,
        paddingHorizontal: 18,
        marginLeft: 10,
    },
    active: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: ThemeStyle.ThemeColor,
        color: ThemeStyle.ThemeColor
    },
    small: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        fontSize: 12
    },
    danger: {
        backgroundColor: ThemeStyle.ThemeColor,
        color: "#ffffff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: ThemeStyle.ThemeColor,
    }
})
