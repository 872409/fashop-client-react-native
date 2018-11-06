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
import { List, Modal, Button } from 'antd-mobile-rn';
import { Field, FixedBottom } from '../../../components'

const addressModel = new AddressModel()

export default class Index extends Component {
    state = {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {
                this.initList()
            }
        );
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

    onEdit(id) {
        // todo
        wx.navigateTo({
            url: '/pages/user/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    }

    async onDelete(id) {
        Modal.alert('您确认删除吗？一旦删除不可恢复', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => async () => {
                    const result = await addressModel.del({ id })
                    if (result) {
                        this.initList()
                    } else {
                        fa.toast.show({
                            title: fa.code.parse(addressModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }

    onAdd() {
        // todo nav
        wx.navigateTo({
            url: '/pages/user/address/add/index'
        })
    }

    render() {
        const {
            list,
        } = this.state
        return <View>
            <View>
                <List>
                    {list.length > 0 ?
                        list.map((item) => <AddressCard
                            name={item.truename}
                            phone={item.phone}
                            addressId={item.id}
                            address={item.combine_detail}
                            checked={item.is_default === 1}
                            goEdit={() => this.goEdit()}
                            onAddressChecked={() => this.onAddressChecked()} />)
                        : null}
                </List>
            </View>
            <FixedBottom>
                <Button size="large" onClick={() => this.goAdd()}>+ 新建地址</Button>
            </FixedBottom>
        </View>
    }
}
