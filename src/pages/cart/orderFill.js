import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { PublicStyles, windowWidth, ThemeStyle } from '../../utils/style';
import { Button, List, TextareaItem } from 'antd-mobile-rn';
import fa from "../../utils/fa";
import { connect } from "react-redux";
import { Toast } from '../../utils/function';
import { NetworkImage } from "../../components/theme"

const Item = List.Item;

@connect(({ user, cart }) => ({
    login: user.login,
    userInfo: user.self,
    cartList: cart.list.result.list
}))
export default class CartOrderFill extends Component {
    state = {
        delta: 1,
        way: 'cart', // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
        calculate: null,
        cartList: [],
        cartIds: [],
        addressId: 0,
        address: {},
        message: null,
        payState: false,
        total: 0
    }

    render() {
        const {
            delta,
            way, // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
            calculate,
            cartList,
            cartIds,
            addressId,
            address,
            message,
            payState,
            total
        } = this.state
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <List style={{ marginTop: 8 }}>
                        {
                            addressId > 0 ?
                            <View style={styles.address}>
                                <View style={styles.selected}>
                                    <Item 
                                        arrow='horizontal'
                                        onClick={this.goAddressList}
                                    >
                                        <View style={{ paddingVertical: 10 }}>
                                            <View style={styles.selectedNamePhone}>
                                                <Text style={styles.selectedUserName}>{address.truename}</Text>
                                                <Text style={styles.selectedUserPhone}>{address.phone}</Text>
                                            </View>
                                            <Text style={styles.address}>{address.combine_detail}</Text>
                                        </View>
                                    </Item>
                                </View>
                                <Image 
                                    source={require('../../images/cart/address-footer-line.png')}
                                    style={styles.addressFooterLine} 
                                />
                            </View> : <TouchableOpacity 
                                style={styles.address} 
                                activeOpacity={.8}
                                onPress={() => {
                                    this.goAddressAdd()
                                }}
                            >
                                <View style={styles.unSelect}>
                                    <Image 
                                        style={styles.unSelectImage}
                                        source={require('../../images/cart/address.png')} 
                                    />
                                    <Text style={styles.unSelectText}>添加地址</Text>
                                </View>
                                <Image 
                                    style={styles.addressFooterLine}
                                    source={require('../../images/cart/address-footer-line.png')} 
                                />
                            </TouchableOpacity>
                        }
                        <View>
                            {
                                cartList.length > 0 ? cartList.map((item, index) => (
                                    <Item
                                        key={index}
                                    >
                                        <View style={styles.oneItem}>
                                            <NetworkImage 
                                                style={styles.oneItemImage}
                                                source={{ uri: item.goods_sku_img }} 
                                            />
                                            <View style={styles.oneItemBody}>
                                                <Text style={styles.oneItemBodyTitle}>{item.goods_title}</Text>
                                                <View style={styles.oneItemBodySpec}>
                                                    <Text
                                                        style={styles.oneItemBodySpecText}
                                                    >
                                                    {item.goods_pay_type === 2 ? (item.goods_weight > 0 ? '重量:' + item.goods_weight +
                                                        'kg' : '不计重量') : ''}{item.goods_spec_string ? item.goods_spec_string : ''}
                                                    </Text>
                                                    <Text style={styles.oneItemBodySpecText}>x{item.goods_num}</Text>
                                                </View>
                                                <Text style={styles.oneItemBodyPrice}>¥{item.goods_price}</Text>
                                            </View>
                                        </View>
                                    </Item>
                                )) : null
                            }
                        </View>
                    </List>
                    <View style={styles.message}>
                        <TextareaItem
                            rows={3}
                            value={message}
                            placeholder={'选填 有什么想对商家说的（45字以内）'}
                            count={255}
                            onChange={(value) => {
                                this.onMessageChange(value)
                            }}
                        />
                    </View>
                    <List>
                        <View>
                            {calculate > 0 ? <Item
                                extra={
                                    <Text style={styles.freightPrice}>+ ¥{calculate.pay_freight_fee}}</Text>
                                }
                            >
                                运费
                            </Item> : null}
                            <Item
                                extra={
                                    <View slot="footer">
                                        <Text
                                            style={styles.totalPrice}
                                        >
                                            ¥{calculate ? (calculate.goods_amount + calculate.pay_freight_fee) : total}
                                        </Text>
                                    </View>
                                }
                            >
                                小计
                            </Item>
                        </View>
                    </List>
                </ScrollView>
                <SafeAreaView style={{ backgroundColor: '#fff' }}>
                    <View style={styles.footer}>
                        <View style={styles.footerLeft}>
                            <Text style={styles.footerLeftLabel}>实付：</Text>
                            <Text style={styles.footerLeftText}>¥{calculate ? calculate.pay_amount : total}</Text>
                        </View>
                        <Button
                            style={{ borderRadius: 0, height: 50, width: 120 }}
                            type='primary'
                            onClick={() => {
                                this.onCreateOrder()
                            }}
                            disabled={!calculate}
                        >
                            提交订单
                        </Button>
                    </View>
                </SafeAreaView>
            </View>
        )
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { cart_ids, way } = navigation.state.params
        let cartIds = cart_ids
        this.setState({
            cartIds
        })
        let _way = 'cart'
        let delta = this.state.delta
        if (typeof way !== 'undefined' && way === 'buy_now') {
            _way = 'buy_now'
            delta = 1
        } else {
            _way = 'cart'
            delta = 2
        }
        this.setState({
            cartIds,
            way: _way,
            delta
        })
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                await this.onShow()
            }
        );
    }

    goAddressAdd() {
        this.props.navigation.navigate('AddressAdd')
    }

    goAddressList = () => {
        this.props.navigation.navigate('AddressList', { onAddressChange: this.onAddressChange })
    }

    onAddressChange = (id) => {
        this.setState({
            addressId: id
        })
    }

    // 计算费用
    async initCalculate() {
        const { cartIds, addressId } = this.state
        const { dispatch } = this.props
        dispatch({
            type: 'buy/calculate',
            payload: {
                cart_ids: cartIds,
                address_id: addressId
            },
            callback: ({result}) => this.setState({
                calculate: result
            })
        })
    }

    // 获得默认地址
    async initAddress() {
        const { dispatch } = this.props
        const { addressId } = this.state
        if (addressId) {
            dispatch({
                type: 'address/info',
                payload: {
                    id: addressId
                },
                callback: ({result: { info }})=> {
                    this.setState({
                        addressId: info.id,
                        address: info
                    },()=>this.initCalculate())
                }
            })
        } else {
            dispatch({
                type: 'address/getDefault',
                callback: ({result: { info }})=> {
                    this.setState({
                        addressId: info.id,
                        address: info
                    },()=>this.initCalculate())
                }
            })
        }
    }

    onMessageChange(message) {
        this.setState({
            message
        })
    }

    async onShow() {
        const payState = this.state.payState
        if (payState === false) {
            const { navigation } = this.props;
            const { address_checked_id } = navigation.state.params
            const addressId = address_checked_id
            if (addressId > 0) {
                this.setState({ addressId })
            }
            const cartListState = await this.initCartList()
            if (cartListState === true) {
                await this.initAddress()
            } else {
                fa.toast.show({
                    title: '支付商品状态已变，请重新选择'
                })
                navigation.goBack()
            }
        }

    }

    async initCartList() {
        const { cartIds } = this.state
        const { dispatch } = this.props
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        let total = 0
        try{
            dispatch({
                type: 'cart/list',
                payload: {
                    ids: cartIds
                },
                callback: ({ result: { list } })=>{
                    list.map((item,index)=>{
                        total += parseFloat(item.goods_price).toFixed(2) * item.goods_num
                        item['goods_spec_string'] = item.goods_spec.map((specItem) => {
                            return specItem.id > 0 ? `${specItem.name}:${specItem.value_name}` : ''
                        }).join(',')
                    })

                    this.setState({
                        checkedGoodsSkuInfoIds,
                        checkedCartIds,
                        total,
                        cartList: list,
                    })
                }
            })
            return true
        }catch(err){
            return false
        }
    }

    async onCreateOrder() {
        const { calculate, total, way, addressId, cartIds, message } = this.state
        const { navigation, dispatch } = this.props;
        if (!addressId) {
            return Toast.info("请选择收货地址");
        }
        dispatch({
            type: 'buy/create',
            payload: {
                'way': way,
                'address_id': addressId,
                'cart_ids': cartIds,
                'message': message,
            },
            callback: ({ result }) => navigation.replace('Pay', {
                orderInfo: result,
                pay_amount: calculate ? parseFloat(calculate.goods_amount + calculate.pay_freight_fee) : parseFloat(total)
            })
        })
    }

}


const styles = StyleSheet.create({
    address: {
        backgroundColor: '#ffffff'
    },
    unSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 15,
    },
    unSelectImage: {
        width: 32,
        height: 32,
        marginBottom: 10,
    },
    unSelectText: {
        fontSize: 14,
        lineHeight: 14,
        color: ThemeStyle.ThemeColor,
        marginBottom: 15,
    },
    selected: {},
    selectedNamePhone: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    selectedUserName: {
        fontSize: 16,
        fontWeight: '800',
        marginRight: 10,
        lineHeight: 16,
    },

    selectedUserPhone: {
        fontSize: 14,
        fontWeight: '800',
        marginRight: 15,
        lineHeight: 14,
    },
    addressBottomDecoration: {
        width: windowWidth,
        height: 5,

    },
    goodsList: {
        justifyContent: 'flex-start',
    },
    goodsListImage: {
        marginRight: 5,
        width: 48,
        height: 50,
    },
    message: {
        backgroundColor: '#ffffff',
        marginBottom: 8,
        marginTop: 8
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#FFFFFF'

    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerLeftLabel: {
        fontSize: 16,
        lineHeight: 16,
        color: '#999999'
    },
    footerLeftText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FF635C',
        marginRight: 15,
        fontFamily: 'PingFangSC-Medium',
    },
    freightPrice: {
        color: '#FF635C',
        fontSize: 12,
        lineHeight: 12,

    },
    freightDesc: {
        color: '#CCCCCC',
        fontSize: 12,
        lineHeight: 12,

        marginTop: 10,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FF635C',
        fontFamily: 'PingFangSC-Medium',
    },
    oneItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    oneItemImage: {
        width: 75,
        height: 75,
        marginRight: 10,
    },

    oneItemBody: {
        flex: 1
    },
    oneItemBodyTitle: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        fontWeight: '800',
        marginBottom: 10,
    },
    oneItemBodyPrice: {
        fontSize: 12,
        color: '#333',
        fontWeight: '800',
        fontFamily: 'PingFangSC-Medium',
    },
    oneItemBodySpec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flex: 1
    },
    oneItemBodySpecText: {
        fontSize: 12,
        color: '#999',
        lineHeight: 12,
    },
    addressFooterLine: {
        width: windowWidth,
        height: 3,
    },
})
