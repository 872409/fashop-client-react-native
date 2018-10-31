import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import AreaModel from '../../../models/area'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const addressModel = new AddressModel()
const areaModel = new AreaModel()
const Dialog = require('../../../ui/dialog/dialog');

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
        id: null,
        truename: '',
        mobile_phone: '',
        type: '个人',
        area_id: '',
        address: '',
        is_default: 1,
        combine_detail: null,

        onLoaded: false,
        checked: true,
        areaList: [],
    },
    async onLoad({ id }) {
        const areaCache = fa.cache.get('area_list_level2')
        const areaResult = areaCache ? areaCache : await areaModel.list({ level: 2 })
        const info = await addressModel.info({ id })
        this.setData({
            id,
            truename: info.truename,
            mobile_phone: info.phone,
            type: info.type,
            area_id: info.area_id,
            address: info.address,
            is_default: info.is_default,
            combine_detail: info.combine_detail,
            areaList: areaResult.list,
            onLoaded: true
        })
    },
    onAreaChange(e) {
        this.setData({
            area_id: e.detail.detail.ids[2]
        })
    },
    onTruenameChange(e) {
        this.setData({
            truename: e.detail.detail.value
        })
    },

    onMobilePhoneChange(e) {
        this.setData({
            mobile_phone: e.detail.detail.value
        })
    },

    onAddressChange(e) {
        this.setData({
            address: e.detail.detail.value
        })
    },
    onIsDefaultChange(e) {
        this.setData({
            is_default: e.detail.detail.checked ? 1 : 0
        })
    },
    async onWechatAddressChoose(){
        const self = this
        wx.chooseAddress({
            success: async function (res) {
                const result = await areaModel.info({
                    name:res.countyName
                })
                if(result !== false){
                    self.setData({
                        combine_detail:`${result.items[0].name} ${result.items[1].name} ${result.items[2].name}`,
                        area_id:result.items[2].id,
                        truename:res.userName,
                        mobile_phone:res.telNumber,
                        address:res.detailInfo,
                    })
                }else{
                    fa.toast.show({
                        title: "微信数据未能匹配成功，请使用其他方式"
                    })
                }
                self.setData({
                    truename:res.userName,
                    mobile_phone:res.telNumber,
                    address:res.detailInfo,
                })
            }
        })
    },
    async onDelete() {
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
                const result = await addressModel.del({
                    id: this.state.id
                })
                if (result === false) {
                    fa.toast.show({
                        title: fa.code.parse(addressModel.getException().getCode())
                    })
                } else {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        })
    },
    async onSubmit() {
        if (!this.state.truename) {
            return fa.toast.show({ title: '请输入姓名' })
        }
        if (!this.state.mobile_phone) {
            return fa.toast.show({ title: '请输入手机号' })
        }
        if (!this.state.area_id) {
            return fa.toast.show({ title: '请选择所在地区' })
        }
        if (!this.state.address) {
            return fa.toast.show({ title: '请填写楼栋楼层或房间号信息' })
        }
        let data = {
            id: this.state.id,
            truename: this.state.truename,
            mobile_phone: this.state.mobile_phone,
            address: this.state.address,
            is_default: this.state.is_default,
            type: this.state.type,
            area_id: this.state.area_id
        }

        const result = await addressModel.edit(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(addressModel.getException().getCode())
            })
        } else {
            wx.navigateBack({
                delta: 1
            })
        }
    }
    render(){
        return <View>
            <View style="background-color:#F8F8F8;display: block;overflow: hidden">
                <fa-panel wx:if="{{onLoaded === true}}">
                    <fa-field
                        title="收货人："
                        placeholder="请输入姓名"
                        focus="true"
                        value="{{truename}}"
                        bind:change="onTruenameChange"
                    >
                    </fa-field>
                    <fa-field
                        title="联系方式："
                        inputType="number"
                        placeholder="请输入手机号"
                        value="{{ mobile_phone }}"
                        bind:change="onMobilePhoneChange"
                    >
                    </fa-field>
                    <fa-field
                        title="所在地区："
                        type="area"
                        areaList="{{areaList}}"
                        areaNames="{{combine_detail}}"
                        bind:change="onAreaChange"
                    >
                    </fa-field>
                    <fa-field
                        title="详细地址："
                        value="{{address}}"
                        placeholder="填写楼栋楼层或房间号信息"
                        bind:change="onAddressChange"
                    >
                    </fa-field>
                    <fa-field
                        title="设置默认地址："
                        desc="注：每次下单时会使用该地址"
                        type="switch"
                        right="true"
                        checked="{{ is_default }}"
                        bind:change="onIsDefaultChange"
                    >
                    </fa-field>
                </fa-panel>
                <View className="choice-wechat-address" bindtap="onWechatAddressChoose">
                    <image src="/themes/default/user/address/wechat.png" mode="aspectFill"></image>
                    <text>使用微信收货地址</text>
                </View>
                <fixed-bottom>
                    <View className="button-area">
                        <fa-button size="large" bind:btnclick="onDelete">删除地址</fa-button>
                        <fa-button type="danger" size="large" bind:btnclick="onSubmit">保存</fa-button>
                    </View>
                </fixed-bottom>
                <!--<View>在个人中心设置的时候语言要变，或者是把这俩封装成组件 完全分离</View>-->
            </View>
            <fa-dialog id="fa-dialog-confirm"></fa-dialog>
        </View>
    }
}
