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
        addressId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        checked: PropTypes.bool
    };
    static defaultProps = {
        addressId: null,
        name: null,
        phone: null,
        address: null,
        checked: false,
    };

    onEdit(e) {
        this.triggerEvent('edit', {
            addressId: e.currentTarget.dataset.id
        });
    }

    onChecked(e) {
        console.log(e)
        this.triggerEvent('checked', {
            addressId: e.currentTarget.dataset.id
        });
    }
    render(){
        return <View className="address-card">
            <View className="info">
                <View className="checked" wx:if="{{checked===true}}" data-id="{{addressId}}" bindtap="onChecked">
                    <icon className="weui-icon-radio" type="success" size="16" color="red"></icon>
                </View>
                <View className="user" data-id="{{addressId}}" bindtap="onChecked">
                    <View className="name-phone">
                        <text className="name">{{ name }}</text>
                        <text className="phone">{{ phone }}</text>
                    </View>
                    <View className="address">{{ address }}</View>
                </View>
            </View>
            <View className="action">
                <!--<image src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg" mode="scaleToFill" />-->
                <text className="edit" data-id="{{id}}" bindtap="onEdit">编辑</text>
            </View>
        </View>
    }
};
