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
import { ListEmptyView, ListView } from "../../utils/publicViewModule";
import { windowHeight } from "../../utils/publicStyleModule";
import {AddressApi} from "../../config/api/address";

const addressModel = new AddressModel()

export default class Index extends Component {
    onAddressChecked(id) {
        fa.cache.set('address_checked_id', id)
        this.props.navigation.goBack()
    }

    goEdit(id) {
        this.props.navigation.navigate('AddressEdit',{id})
    }

    goAdd() {
        this.props.navigation.navigate('AddressAdd')
    }

    render() {
        return <View style={{
            backgroundColor: '#F8F8F8'
        }}>
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
                    fetchParams={{type_id}}
                    ListEmptyComponent={()=>(
                        <ListEmptyView
                            height={windowHeight-80}
                            uri={require('../../images/fetchStatus/messageEmpty.png')}
                            desc='暂时没有相关消息'
                        />
                    )}
                />
            </View>
            <FixedBottom>
                <Button size="large" onClick={() => this.goAdd()}>+ 新建地址</Button>
            </FixedBottom>
        </View>
    }
}
