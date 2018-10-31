import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';
import PropTypes from "prop-types";

export default class Index extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : windowWidth*0.4,
        autoLayout : false,
    };
    properties: {
        goodsTotal:{
            type:Number,
            value: null
        },
        freight: {
            type: Number,
            value: null
        },
        totalCost: {
            type: Number,
            value: null
        }
    }
    render(){
        return <View className="order-cost-list">
            <View className="item">
                <View className="row">
                    <label>商品总额：</label>
                    <text>¥{{ goodsTotal }}</text>
                </View>
                <View className="row">
                    <label>运费：</label>
                    <text>¥{{ freight }}</text>
                </View>
            </View>
            <View className="footer">
                <label>实付款：</label>
                <text>¥{{ totalCost }}</text>
            </View>
        </View>
    }
}
