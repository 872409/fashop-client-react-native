import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const addressModel = new AddressModel()

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
    goEdit(e) {
        wx.navigateTo({
            url: '/pages/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    },
    goAdd() {
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    }
    render(){
        return <View style="background-color:#F8F8F8;display: block;overflow: hidden;margin-bottom:100px">
            <View>
                <fa-panel>
                    <block wx:for="{{list}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                        <address-card name="{{item.truename}}" phone="{{item.phone}}" addressId="{{item.id}}" address="{{item.combine_detail}}"
                                      checked="{{item.is_default ===1}}" data-index="{{index}}" data-id="{{item.id}}"
                                      bind:edit="goEdit" bind:checked="onAddressChecked"></address-card>
                    </block>
                </fa-panel>
            </View>
            <fixed-bottom>
                <fa-button size="large" bindtap="goAdd">+ 新建地址</fa-button>
            </fixed-bottom>
        </View>
    }
}
