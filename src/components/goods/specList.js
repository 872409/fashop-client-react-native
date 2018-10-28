import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "antd-mobile-rn";
import { windowWidth, PublicStyles, ThemeStyle } from '../../utils/publicStyleModule';
import SafeAreaView from "react-native-safe-area-view";
import Stepper from "../../components/goods/stepper";

const specInit = [];

export default class GoodsSpecList extends Component{
    state = {
        spec: this.props.currentSpec.stock === '-' ? specInit : this.props.currentSpec.spec,
        selectNum: this.props.currentSpec.selectNum
    }
    componentDidMount(){
        this.setState({
            sepc: this.props.currentSpec.spec
        })
    }
    render() {
        const { spec, selectNum } = this.state;
        const {
            if_cart,
            specList,
            skuList,
            changeCurrentSpec,
            data,
            closeModal,
            currentSpec,
            navigation
        } = this.props;
        const stock = typeof currentSpec.stock !== 'string' ? currentSpec.stock : (data.stock ? data.stock : 1)
        return <View style={PublicStyles.ViewMax}>
            <View style={styles.popModalTitleView}>
                <View style={styles.popModalTitleLeft} />
                <View style={styles.popModalTitleTight}>
                    <Text style={[styles.popModalTitleTightP]}> ¥{currentSpec.price}</Text>
                    <Text style={[PublicStyles.descTwo9]}>
                        已选：
                        {
                            currentSpec.spec.map((item) => {
                                return `${item.value_name} `;
                            })
                        }
                    </Text>
                </View>
            </View>
            <ScrollView
                style={[{
                    maxHeight: windowWidth - 100
                }, styles.SpecListView]}
            >
                {
                    specList.map((specitem, i) => (
                        <View key={i} style={[styles.specItemView,{borderTopWidth: i===0 ? 0 : .5}]}>
                            <Text style={[PublicStyles.descFour9,{marginBottom: 18}]}>
                                {specitem.name}
                            </Text>
                            <View style={styles.itemView}>
                                {
                                    specitem.value_list.map((specValueItem, j) => {
                                        const newSpec = [...spec]
                                        const newItem = {
                                            id: specitem.id,
                                            name: specitem.name,
                                            value_id: specValueItem.id,
                                            value_name: specValueItem.name,
                                        }
                                        const num = spec.findIndex((value, index) => {
                                            return value.id === specitem.id
                                        })
                                        const selected = spec.findIndex((value, index) => {
                                            return value.id === specitem.id && value.value_id === specValueItem.id
                                        })
                                        return (
                                            <TouchableOpacity
                                                key={j}
                                                activeOpacity={.8}
                                                onPress={() => {
                                                    if (num > -1) {
                                                        newSpec.splice(num, 1, newItem)
                                                    } else {
                                                        newSpec.push(newItem)
                                                    }
                                                    this.setState({
                                                        spec: newSpec
                                                    })
                                                    skuList.map((skuListItem, skuListIndex) => {
                                                        const ifValueId = []
                                                        skuListItem.spec.map((skuListSpecItem) => {
                                                            const ifValueIdItem = spec.findIndex((specItem) => {
                                                                return specItem.value_id === skuListSpecItem.value_id;
                                                            })
                                                            if (ifValueIdItem > -1) {
                                                                ifValueId.push(ifValueIdItem);
                                                            }
                                                        })
                                                        if (ifValueId.length === spec.length) {
                                                            const newList = {
                                                                ...skuList[skuListIndex],
                                                                selectNum
                                                            }
                                                            changeCurrentSpec(newList);
                                                        }
                                                    })
                                                }}
                                                style={[{
                                                    backgroundColor: selected > -1 ? ThemeStyle.ThemeColor : '#f8f8f8',
                                                },styles.sepcItemTouch]}
                                            >
                                                <Text
                                                    style={[{
                                                        color: selected > -1 ? '#fff' : '#333',
                                                    },styles.sepcItemText]}
                                                >
                                                    {
                                                        specValueItem.name
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    ))
                }
                <View style={[PublicStyles.rowBetweenCenter,styles.SpecListNumView]}>
                    <Text>数量</Text>
                    <Stepper
                        stock={stock}
                        defaultValue={selectNum}
                        onChange={(e) => {
                            this.setState({
                                selectNum: e
                            })
                        }}
                    />
                </View>
            </ScrollView>
            <SafeAreaView>
                <Button
                    type='primary'
                    disabled={spec.length !== specList.length || !selectNum}
                    style={{
                        borderRadius: 0
                    }}
                    onClick={() => {
                        closeModal()
                        // if (if_cart === 0) {
                            navigation.navigate("OrderAction",{
                                cart_buy_items: [
                                    {
                                        goods_id: data.id,
                                        quantity: selectNum,
                                        goods_data: data
                                    },
                                    {
                                        goods_id: data.id,
                                        quantity: selectNum,
                                        goods_data: data
                                    }
                                ],
                                if_cart
                            })
                        // }
                        // if (if_cart === 1) {
                        //     console.log('加入购物车');
                        // }
                    }}
                >
                    确定
                </Button>
            </SafeAreaView>
        </View>
    }
}

const styles = StyleSheet.create({
    popModalTitleView: {
        height: 45,
        padding: 15,
    },
    popModalTitleLeft: {
        width: 90,
        height: 90,
        borderRadius: 3,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 15,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.07,
    },
    popModalTitleTight: {
        alignItems: 'flex-start',
        marginLeft: 105,
    },
    popModalTitleTightP: {
        fontSize: 18,
        color: ThemeStyle.ThemeColor,
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
        borderTopWidth: .5,
        borderTopColor: '#eaeaea'
    },
});
