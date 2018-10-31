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
        goodsTitle: PropTypes.string,
        goodsImg: PropTypes.string,
        goodsNum: PropTypes.string,
        goodsSpec: PropTypes.string,
        goodsInfo: PropTypes.object
    };
    static defaultProps = {
        goodsTitle: null,
        goodsImg: null,
        goodsNum: null,
        goodsSpec: null,
        goodsInfo: null
    };

    onClick(currentTarget) {
        this.triggerEvent('click', { currentTarget });
    }
    render(){
        return <View className="refund-goods-card">
            <View className="body">
                <View className="item">
                    <View className="content">
                        <View className="image">
                            <image src="{{goodsImg}}" mode="aspectFill" />
                        </View>
                        <View className="body">
                            <text>{{ goodsTitle }}</text>
                            <View className="end">
                                <text className="spec">{{ goodsSpec }}</text>
                                <label className="number">x {{ goodsNum }}</label>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    }
}
