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
import {  Modal, Button } from 'antd-mobile-rn';
import { Field, FixedBottom } from '../../../components'
import { AddressApi } from "../../../config/api/address";
import {  ListView } from "../../../utils/publicViewModule";

const addressModel = new AddressModel()

export default class UserAddressList extends Component {
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

    onAddressChecked(e) {
        fa.cache.set('address_checked_id', e.detail.addressId)
        this.props.navigation.goBack()
    }

    onEdit(id) {
        // todo id
        this.props.navigation.navigate('UserAddressEdit',{id})
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
        this.props.navigation.navigate('UserAddressAdd')
    }

    render() {
        return <View>
            <View>
                <ListView
                    renderItem={ item => (
                        <AddressCard
                            name={item.truename}
                            phone={item.phone}
                            addressId={item.id}
                            address={item.combine_detail}
                            checked={item.is_default === 1}
                            goEdit={() => this.goEdit()}
                            onAddressChecked={() => this.onAddressChecked(item.id)} />
                    )}
                    api={AddressApi.list}
                />
            </View>
            <FixedBottom>
                <Button size="large" onClick={() => this.goAdd()}>+ 新建地址</Button>
            </FixedBottom>
        </View>
    }
}
