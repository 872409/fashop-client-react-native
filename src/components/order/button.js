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
        return <View style={[styles.orderButton]} onPress={this.onClick()}>{text}</View>
    }
}
