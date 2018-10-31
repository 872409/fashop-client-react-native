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
        this.triggerEvent('click', e);
    }
    render(){
        return <View className="order-button {{size}} order-button-type-{{type}} {{active === true?'active':''}}"
                     onPress={this.onClick()}>{{ text }}</View>
    }
}
