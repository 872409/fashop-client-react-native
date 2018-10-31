import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'

const addressModel = new AddressModel()
const Dialog = require('../../../../ui/dialog/dialog');

export default class Index extends Component{
    state = {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    }
    async onShow() {
        this.initList()
    }
    initList() {
        this.setState({
            page: 1
        })
        this.getList()
    }
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
            this.setState(data)
        }
    }
    async onChecked(e) {
        const result = await addressModel.setDefault({ id: e.currentTarget.dataset.id })
        if (result) {
            this.initList()
        } else {
            fa.toast.show({
                title: fa.code.parse(addressModel.getException().getCode())
            })
        }
    }
    async onReachBottom() {
        if (this.state.noMore === true) {
            return false
        } else {
            this.getList()
        }
    }
    onAddressChecked(e) {
        fa.cache.set('address_checked_id', e.detail.addressId)
        wx.navigateBack({
            delta: 1
        })
    }
    onEdit(e) {
        wx.navigateTo({
            url: '/pages/user/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    }
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

    }
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
                        <List>
                            <View style={styles.address-card} >
                                <View style={styles.info} >
                                    <View style={styles.user}  data-id={item.id} onPress="onChecked">
                                        <View style={styles.name-phone} >
                                            <Text style={styles.name} >{{ item.truename}}</Text>
                                            <Text style={styles.phone} >{{ item.phone}}</Text>
                                        </View>
                                        <View style={styles.address} >{{ item.address}}</View>
                                    </View>
                                </View>
                                <View style={styles.action} >
                                    <View style={styles.checked}  wx:if="{{item.is_default===1}}" data-id={item.id}>
                                        <Icon style={styles.weuiIconRadio}  type={'success'} size="16" color="red"/>
                                        <Text>默认地址</Text>
                                    </View>
                                    <View style={styles.checked}  wx:if="{{item.is_default===0}}" data-id={item.id}
                                          onPress="onChecked">
                                        <Icon style={styles.weuiIconRadio}  type={'success'} size="16" color="#ccc"/>
                                        <Text>设为默认</Text>
                                    </View>
                                    <View style={styles.buttonArea} >
                                        <View style={styles.item}  data-id={item.id} onPress="onEdit">
                                            <Image source={require('../../images/user/address/edit.png')} resizeMode={'contain'} />
                                            <Text style={styles.edit} >编辑</Text>
                                        </View>
                                        <View style={styles.item}  data-id={item.id} onPress="onDelete">
                                            <Image source={require('../../images/user/address/del.png')} resizeMode={'contain'} />
                                            <Text style={styles.edit} >删除</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </List>
                    </block>
                </View>
                <FixedBottom>
                    <Button size="large" type={'danger'} onPress="onAdd">+ 新建地址</Button>
                </FixedBottom>
            </View>
            <fa-dialog id="fa-dialog-confirm"/>
        </View>
    }
}
