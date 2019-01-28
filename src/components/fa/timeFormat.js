import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from "prop-types";
import moment from "moment"

export default class TimeFormat extends Component {
    static propTypes = {
        value: PropTypes.number,
        format: PropTypes.string,
        style: PropTypes.object
    };
    static defaultProps = {
        value: null,
        format: 'YYYY-MM-DD HH:mm:ss',
    };

    render() {
        const { value, format, style } = this.props
        const time = moment(value, 'X').format(format)
        return <Text style={[styles.time, style]}>{time}</Text>
    }
}
const styles = StyleSheet.create({
    time: {}
})
