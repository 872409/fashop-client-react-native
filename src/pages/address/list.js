import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import { Button, Modal } from 'antd-mobile-rn';
import FlatList from "../../components/flatList";
import { AddressApi } from "../../config/api/address";
import { PublicStyles } from '../../utils/style';
import { AddressCard } from "../../components";
import { connect } from 'react-redux'

@connect()
export default class AddressList extends Component {
    onAddressChecked = (id) => {
        const { navigation } = this.props
        const { onAddressChange } = navigation.state.params
        if (typeof onAddressChange === 'function') {
            onAddressChange(id)
        }
        navigation.goBack()
    }
    onAdd = () => {
        this.props.navigation.navigate('UserAddressAdd', { updateListRow: this.updateListRow })
    }
    onEdit = (id) => {
        this.props.navigation.navigate('UserAddressEdit', { id, updateListRow: this.updateListRow })
    }
    onDel = (id) => {
        Modal.alert('您确认删除吗？一旦删除不可恢复', null, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => {
                    this.props.dispatch({
                        type: "address/del",
                        payload: {
                            id
                        },
                        callback: this.updateListRow
                    })
                }
            },
        ]);
    }
    onChangeDefault = (id) => {
        this.props.dispatch({
            type: 'address/setDefault',
            payload: {
                id
            },
            callback: this.updateListRow
        })
    }
    updateListRow = () => {
        this.FlatList.manuallyRefresh()
    }
    render() {
        return <View style={[PublicStyles.ViewMax]}>
            <FlatList
                ref={e => this.FlatList = e}
                api={AddressApi.list}
                keyExtractor={e => String(e.id)}
                renderItem={({ item }) => 
                    <AddressCard
                        id={item.id}
                        name={item.truename}
                        phone={item.phone}
                        address={item.combine_detail}
                        is_default={item.is_default}
                        onEdit={this.onEdit}
                        onDel={this.onDel}
                        onChangeDefault={this.onChangeDefault}
                        onAddressChecked={this.onAddressChecked}
                    />
                }
            />
            <SafeAreaView>
                <Button
                    style={{ borderRadius: 0 }}
                    type='primary'
                    size="large"
                    onClick={this.onAdd}
                >
                    + 新建地址
                </Button>
            </SafeAreaView>
        </View>
    }
}
const styles = StyleSheet.create({})
