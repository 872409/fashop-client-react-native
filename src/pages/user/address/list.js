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
    "fa_panel": {
        "marginBottom": "10px",
        "display": "block"
    },
    "address_card": {
        "padding": "15px",
        "display": "flex",
        "justifyContent": "space-between",
        "flexDirection": "column"
    },
    "address_card__checked": {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "marginRight": "15px"
    },
    "address_card__checked_image": {
        "width": "20px",
        "height": "20px",
        "display": "block"
    },
    "address_card__checked_text": {
        "fontSize": "14px",
        "color": "#999999",
        "marginLeft": "5px"
    },
    "address_card__info": {
        "display": "flex",
        "flex": "1",
        "borderBottom": "1px solid #F8F8F8",
        "paddingBottom": "15px",
        "marginBottom": "15px"
    },
    "address_card__info__name_phone": {
        "display": "flex",
        "alignItems": "center",
        "marginBottom": "10px"
    },
    "address_card__info__user__name": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "marginRight": "15px",
        "lineHeight": "14px",
        "display": "block"
    },
    "address_card__info__user__phone": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "marginRight": "15px",
        "lineHeight": "14px",
        "display": "block"
    },
    "address_card__info__address": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#999999"
    },
    "address_card__action": {
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center"
    },
    "address_card__action_image": {
        "width": "20px",
        "height": "20px"
    },
    "address_card__button_area": {
        "display": "flex",
        "justifyContent": "flex-end",
        "flex": "1"
    },
    "address_card__button_area__item": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "flex",
        "marginLeft": "10px"
    },
    "address_card__button_area__item_image": {
        "width": "15px",
        "height": "15px",
        "marginRight": "5px"
    },
    "address_card__button_area__item_text": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#999999"
    }
})
