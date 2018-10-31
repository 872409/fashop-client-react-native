import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component{
    static propTypes = {
    };
    static defaultProps = {
    };
    render(){
        <button className="order-contact kf-button" open-type="contact" session-from="weapp">
            <image src="/themes/default/order/customer-service.png" mode="scaleToFill" />
            <text>联系客服</text>
        </button>
    }

}
