import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { PublicStyles } from '../../../utils/publicStyleModule';
import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import { Modal, Button } from 'antd-mobile-rn';
import { FixedBottom, AddressCard } from '../../../components'
import { AddressApi } from "../../../config/api/address";
import { ListView } from "../../../utils/publicViewModule";

const addressModel = new AddressModel()

export default class UserAddressList extends Component {
    onEdit(id) {
        this.props.navigation.navigate('UserAddressEdit', { id })
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
        return <View style={[PublicStyles.ViewMax]}>
            <ListView
                api={AddressApi.list}
                keyExtractor={e => String(e.id)}
                renderItem={({item})=><AddressCard
                    name={item.truename}
                    phone={item.phone}
                    id={item.id}
                    address={item.combine_detail}
                    onEdit={(id) => {
                        this.onEdit(id)
                    }}
                    />
                }
            />
            <FixedBottom>
                <Button size="large" onClick={() => this.onAdd()}>+ 新建地址</Button>
            </FixedBottom>
        </View>
    }
}
const styles = StyleSheet.create({

})
