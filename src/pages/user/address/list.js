import fa from '../../../../utils/fa'
import AddressModel from '../../../../models/address'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'

const addressModel = new AddressModel()
const Dialog = require('../../../../ui/dialog/dialog');

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';

export default class Index extends Component{
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onShow() {
        this.initList()
    },
    initList() {
        this.setData({
            page: 1
        })
        this.getList()
    },
    async getList() {
        const page = this.state.page
        if (page > 1 && this.state.noMore === true) {
            return
        }
        const rows = this.state.rows
        const list = page === 1 ? [] : this.state.list
        const result = await addressModel.list({
            page,
            rows
        })
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onChecked(e) {
        const result = await addressModel.setDefault({ id: e.currentTarget.dataset.id })
        if (result) {
            this.initList()
        } else {
            fa.toast.show({
                title: fa.code.parse(addressModel.getException().getCode())
            })
        }
    },
    async onReachBottom() {
        if (this.state.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    onAddressChecked(e) {
        fa.cache.set('address_checked_id', e.detail.addressId)
        wx.navigateBack({
            delta: 1
        })
    },
    onEdit(e) {
        wx.navigateTo({
            url: '/pages/user/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    },
    async onDelete(e) {
        Dialog({
            message: '您确认删除吗？一旦删除不可恢复',
            selector: '#fa-dialog-confirm',
            buttons: [{
                text: '取消',
                type: 'cancel'
            }, {
                text: '确认',
                color: 'red',
                type: 'ok'
            }]
        }).then(async ({ type }) => {
            if (type === 'ok') {
                const result = await addressModel.del({ id: e.currentTarget.dataset.id })
                if (result) {
                    this.initList()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(addressModel.getException().getCode())
                    })
                }
            }
        })

    },
    onAdd() {
        wx.navigateTo({
            url: '/pages/user/address/add/index'
        })
    }
    render(){
        return <View>
            <View style="background-color:#F8F8F8;display: block;overflow: hidden;margin-bottom:100px">
                <View>
                    <block wx:for="{{list}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                        <fa-panel>
                            <View className="address-card">
                                <View className="info">
                                    <View className="user" data-id="{{item.id}}" bindtap="onChecked">
                                        <View className="name-phone">
                                            <text className="name">{{ item.truename}}</text>
                                            <text className="phone">{{ item.phone}}</text>
                                        </View>
                                        <View className="address">{{ item.address}}</View>
                                    </View>
                                </View>
                                <View className="action">
                                    <View className="checked" wx:if="{{item.is_default===1}}" data-id="{{item.id}}">
                                        <icon className="weui-icon-radio" type="success" size="16" color="red"></icon>
                                        <text>默认地址</text>
                                    </View>
                                    <View className="checked" wx:if="{{item.is_default===0}}" data-id="{{item.id}}"
                                          bindtap="onChecked">
                                        <icon className="weui-icon-radio" type="success" size="16" color="#ccc"></icon>
                                        <text>设为默认</text>
                                    </View>
                                    <View className="button-area">
                                        <View className="item" data-id="{{item.id}}" bindtap="onEdit">
                                            <image src="/themes/default/user/address/edit.png" mode="aspectFill" />
                                            <text className="edit">编辑</text>
                                        </View>
                                        <View className="item" data-id="{{item.id}}" bindtap="onDelete">
                                            <image src="/themes/default/user/address/del.png" mode="aspectFill" />
                                            <text className="edit">删除</text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </fa-panel>
                    </block>
                </View>
                <fixed-bottom>
                    <fa-button size="large" type="danger" bindtap="onAdd">+ 新建地址</fa-button>
                </fixed-bottom>
            </View>
            <fa-dialog id="fa-dialog-confirm"></fa-dialog>

        </View>
    }
}
