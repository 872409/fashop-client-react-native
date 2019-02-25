import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import { Button } from "antd-mobile-rn";
import { windowWidth, PublicStyles, ThemeStyle } from '../../utils/style';
// import SafeAreaView from "react-native-safe-area-view";
import Stepper from "./stepper";
import { NetworkImage } from "../theme";

export default class GoodsSpecList extends Component{
    state = {
        spec_sign: [],
        spec_value_sign: [],
        current_sku: null,
        quantity: 1
    }
    componentDidMount(){
        const { skus } = this.props
        if(skus){
            this.setState({
                spec_sign: JSON.parse(skus[0].spec_sign),
                spec_value_sign: JSON.parse(skus[0].spec_value_sign),
                current_sku: skus[0],
            })
        }
    }
    render() {
        const { spec_sign, spec_value_sign, quantity, current_sku } = this.state;
        const { spec_list, skus, if_cart, title, login, navigation } = this.props;
        const showSpec = spec_list && spec_list.length && spec_list[0].id
        return <View style={{flex: 1}}>
            <View style={styles.popModalTitleView}>
                {
                    current_sku ? <NetworkImage
                        source={{ uri: current_sku.img }}
                        style={styles.popModalTitleLeft}
                    /> : <View style={styles.popModalTitleLeft} />
                }
                <View style={styles.popModalTitleRight}>
                    <Text style={[styles.popModalTitleRightP]}> ¥{current_sku ? current_sku.price : 0}</Text>
                    <Text style={[PublicStyles.descTwo9,{marginLeft: 5}]}>
                        已选：
                        <Text style={{color: '#333'}}>
                            {
                                current_sku && current_sku.spec && current_sku.spec[0].id ? current_sku.spec.map((item) => {
                                    return `${item.value_name} `;
                                }) : title
                            }
                        </Text>
                    </Text>
                </View>
            </View>
            <ScrollView style={styles.SpecListView}>
                {
                    showSpec ? spec_list.map((spec_list_item, i) => {
                        const family_selected_data = spec_list_item.value_list.find((brotherItem) => {
                            if (spec_value_sign.indexOf(brotherItem.id) > -1) {
                                return {
                                    selected_index: spec_value_sign.indexOf(brotherItem.id),
                                }
                            }
                        })
                        return (
                            <View key={i} style={[styles.specItemView, { borderTopWidth: i === 0 ? 0 : .5 }]}>
                                <View style={[PublicStyles.rowCenter, { marginBottom: 18 }]}>
                                    <Text style={PublicStyles.descFour9}>
                                        {spec_list_item.name}
                                    </Text>
                                    {
                                        family_selected_data ? null :
                                        <Text style={[PublicStyles.descTwo6, { marginLeft: 10, color: ThemeStyle.ThemeColor }]}>
                                            请选择{spec_list_item.name}
                                        </Text>
                                    }
                                </View>
                                <View style={styles.itemView}>
                                    {
                                        spec_list_item.value_list.map((spec_value_list_item, j) => {
                                            const selected_index = spec_value_sign.indexOf(spec_value_list_item.id)
                                            const selected = selected_index > -1
                                            return (
                                                <TouchableOpacity
                                                    key={j}
                                                    activeOpacity={.8}
                                                    onPress={() => {
                                                        let new_spec_value_sign = spec_value_sign.concat()
                                                        if (family_selected_data&&!selected) {
                                                            const brother_selected_index = spec_value_sign.indexOf(family_selected_data.id)
                                                            new_spec_value_sign.splice(brother_selected_index, 1, spec_value_list_item.id)
                                                        } else {
                                                            if (selected) {
                                                                new_spec_value_sign.splice(selected_index, 1)
                                                            } else {
                                                                new_spec_value_sign.push(spec_value_list_item.id)
                                                            }
                                                        }
                                                        const current_skus = skus.find((item, index) => {
                                                            return item.spec_value_sign === JSON.stringify(new_spec_value_sign.sort((a, b) => { return a - b }))
                                                        })
                                                        this.setState({
                                                            spec_value_sign: new_spec_value_sign.sort((a, b) => { return a - b }), // 升序
                                                            quantity: 1, // 每次选择要把数量变为1
                                                            current_sku: current_skus
                                                        })
                                                    }}
                                                    style={[
                                                        styles.sepcItemTouch,
                                                        {
                                                            backgroundColor: selected ? ThemeStyle.ThemeColor : '#f8f8f8',
                                                        }
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.sepcItemText,
                                                            {
                                                                color: selected ? '#fff' : '#333',
                                                            }
                                                        ]}
                                                    >
                                                        {
                                                            spec_value_list_item.name
                                                        }
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    }) : null
                }
                <View 
                    style={[
                        PublicStyles.rowBetweenCenter, 
                        styles.SpecListNumView,{
                            borderTopWidth: showSpec ? .5 : 0
                        }
                    ]}
                >
                    <Text style={PublicStyles.descFour9}>数量</Text>
                    <Stepper
                        stock={current_sku ? current_sku.stock : 1}
                        defaultValue={quantity}
                        onChange={(e) => {
                            this.setState({
                                quantity: e
                            })
                        }}
                    />
                </View>
            </ScrollView>
            <SafeAreaView>
                <Button
                    type='primary'
                    disabled={spec_value_sign.length !== spec_list.length || !quantity}
                    style={{
                        borderRadius: 0,
                        margin: 15
                    }}
                    onClick={() => {
                        if(login){
                            if (if_cart) {
                                this.changeCart()
                            } else {
                                this.buyNow()
                            }
                        }else {
                            navigation.navigate('UserLogin')
                        }
                    }}
                >
                    确定
                </Button>
            </SafeAreaView>
        </View>
    }
    changeCart = async () => {
        const { current_sku, quantity } = this.state
        const { dispatch, closeModal } = this.props;
        const payload = {
            goods_sku_id: current_sku.id,
            quantity
        }
        dispatch({
            type: 'cart/change',
            payload,
            callback: () => closeModal()
        })
    }
    buyNow = async () => {
        const { current_sku, quantity } = this.state
        const { dispatch, closeModal, navigation } = this.props;
        dispatch({
            type: 'cart/save',
            payload: {
                goods_sku_id: current_sku.id,
                quantity
            },
            callback: ()=>{
                dispatch({
                    type: 'cart/info',
                    payload: {
                        goods_sku_id: current_sku.id,
                    },
                    callback: (e) => {
                        if(e){
                            navigation.navigate("CartOrderFill", {
                                way: "buy_now",
                                cart_ids: [e.result.info.id]
                            })
                            closeModal()
                        }
                    }
                })
            }
        })
    }
}

const styles = StyleSheet.create({
    popModalTitleView: {
        height: 75,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: .5,
        borderBottomColor: '#eaeaea'
    },
    popModalTitleLeft: {
        width: 90,
        height: 90,
        borderRadius: 3,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 15,
        left: 15,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.07,
    },
    popModalTitleRight: {
        alignItems: 'flex-start',
        marginLeft: 110,
    },
    popModalTitleRightP: {
        fontSize: 19,
        color: ThemeStyle.ThemeColor,
        fontWeight: '500',
        fontFamily: 'PingFangSC-Medium',
    },
    specItemView:{
        alignItems: 'flex-start',
        paddingTop: 18,
        flexShrink: 0,
        borderTopColor: '#eaeaea'
    },
    itemView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sepcItemTouch: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginRight: 15,
        marginBottom: 15,
        borderRadius: 3
    },
    sepcItemText: {},

    SpecListView:{
        padding: 15,
        paddingBottom: 0,
    },
    SpecListBtnView:{
        flexDirection: 'row',
    },
    SpecListNumView:{
        paddingVertical: 12,
        borderTopColor: '#eaeaea'
    },
});
