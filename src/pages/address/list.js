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
import { List, Button } from 'antd-mobile-rn';
import { Field, FixedBottom } from '../../components'

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
            'didFocus', () => {
                this.setState({
                    page: 1
                })
                this.getList()
            }
        );
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
        // todo
        if (this.state.noMore === true) {
            return false
        } else {
            this.getList()
        }
    }

    onAddressChecked(id) {
        fa.cache.set('address_checked_id', id)
        // todo nav
        wx.navigateBack({
            delta: 1
        })
    }

    goEdit(e) {
        // todo nav
        wx.navigateTo({
            url: '/pages/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    }

    goAdd() {
        // todo nav
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    }

    render() {
        const {
            list,
        } = this.state
        return <View style={{
            backgroundColor: '#F8F8F8'
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
                            onAddressChecked={() => this.onAddressChecked(item.id)} />)
                        : null}
                </List>
            </View>
            <FixedBottom>
                <Button size="large" onClick={() => this.goAdd()}>+ 新建地址</Button>
            </FixedBottom>
        </View>
    }
}
