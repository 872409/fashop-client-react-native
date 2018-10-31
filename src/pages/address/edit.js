import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import fa from '../../utils/fa'
import AddressModel from '../../models/address'
import AreaModel from '../../models/area'

const addressModel = new AddressModel()
const areaModel = new AreaModel()
const Dialog = require('../../../ui/dialog/dialog');

export default class Index extends Component {
    state = {
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
    }

    async componentWillMount({ id }) {
        const areaCache = fa.cache.get('area_list_level2')
        const areaResult = areaCache ? areaCache : await areaModel.list({ level: 2 })
        const info = await addressModel.info({ id })
        this.setState({
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
    }

    onAreaChange(e) {
        this.setState({
            area_id: e.detail.detail.ids[2]
        })
    }

    onTruenameChange(e) {
        this.setState({
            truename: e.detail.detail.value
        })
    }

    onMobilePhoneChange(e) {
        this.setState({
            mobile_phone: e.detail.detail.value
        })
    }

    onAddressChange(e) {
        this.setState({
            address: e.detail.detail.value
        })
    }

    onIsDefaultChange(e) {
        this.setState({
            is_default: e.detail.detail.checked ? 1 : 0
        })
    }

    async onWechatAddressChoose() {
        const self = this
        wx.chooseAddress({
            success: async function (res) {
                const result = await areaModel.info({
                    name: res.countyName
                })
                if (result !== false) {
                    self.setData({
                        combine_detail: `${result.items[0].name} ${result.items[1].name} ${result.items[2].name}`,
                        area_id: result.items[2].id,
                        truename: res.userName,
                        mobile_phone: res.telNumber,
                        address: res.detailInfo,
                    })
                } else {
                    fa.toast.show({
                        title: "微信数据未能匹配成功，请使用其他方式"
                    })
                }
                self.setData({
                    truename: res.userName,
                    mobile_phone: res.telNumber,
                    address: res.detailInfo,
                })
            }
        })
    }

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
    }

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

    render() {
        return <View>
            <View style="background-color:#F8F8F8;display: block;overflow: hidden">
                <List>
                    <Field
                        title="收货人："
                        placeholder="请输入姓名"
                        focus={true}
                        value={truename}
                        onChange={(e)=>{ this.onTruenameChange(e) }}
                    >
                    </Field>
                    <Field
                        title="联系方式："
                        inputType="number"
                        placeholder="请输入手机号"
                        value="{{ mobile_phone }}"
                        onChange={(e)=>{ this.onMobilePhoneChange(e) }}
                    >
                    </Field>
                    <Field
                        title="所在地区："
                        type={'area'}
                        areaList="{{areaList}}"
                        areaNames="{{combine_detail}}"
                        onChange={(e)=>{ this.onAreaChange(e) }}
                    >
                    </Field>
                    <Field
                        title="详细地址："
                        value="{{address}}"
                        placeholder="填写楼栋楼层或房间号信息"
                        onChange={(e)=>{ this.onAddressChange(e) }}
                    >
                    </Field>
                    <Field
                        title="设置默认地址："
                        desc="注：每次下单时会使用该地址"
                        type={'switch'}
                        right={true}
                        checked="{{ is_default }}"
                        onChange={(e)=>{ this.onIsDefaultChange(e) }}
                    >
                    </Field>
                </List>
                <View style={styles.choice - wechat - address} onPress={() => {
                    this.onWechatAddressChoose()
                }}>
                    <Image source={require('../../images/user/address/wechat.png')} resizeMode={'contain'}/>

                </View>
                <FixedBottom>
                    <View style={styles.buttonArea}>
                        <Button size="large" bind:btnclick="onDelete">删除地址</Button>
                        <Button type={'danger'} size="large" onClick={()=>{this.onSubmit()}}>保存</Button>
                    </View>
                </FixedBottom>
            </View>
            <fa-dialog id="fa-dialog-confirm"/>
        </View>
    }
}
