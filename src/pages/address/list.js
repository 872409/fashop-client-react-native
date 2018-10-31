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

const addressModel = new AddressModel()

export default class Index extends Component {
    state = {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    }

    async onShow() {
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

    goEdit(e) {
        wx.navigateTo({
            url: '/pages/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    }

    goAdd() {
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    }

    render() {
        return <View style={{
            backgroundColor: '#F8F8F8', marginBottom: 100
        }}>
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
