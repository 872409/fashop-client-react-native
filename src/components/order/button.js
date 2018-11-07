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
    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render(){
        const { size, text, type, active } = this.props
        return <View style={[styles.orderButton]} onPress={this.onClick()}><Text>{text}</Text></View>
    }
}
const styles = StyleSheet.create({
    "order_button": {
        "border": "1px solid #cccccc",
        "display": "inline-block",
        "textAlign": "center",
        "fontSize": "14px",
        "borderRadius": "3px",
        "padding": "5px 15px",
        "marginLeft": "10px"
    },
    "order_button_active": {
        "border": "1px solid #ff4400",
        "color": "#ff4400"
    },
    "order_button_small": {
        "padding": "2px 10px",
        "fontSize": "12px"
    },
    "order_button_type_danger": {
        "backgroundColor": "#ff4400",
        "color": "#ffffff",
        "border": "1px solid #ff4400"
    }
})
