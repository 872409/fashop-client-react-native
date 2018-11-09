import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { PublicStyles, windowWidth } from '../../utils/publicStyleModule';
import { Button, List, InputItem } from 'antd-mobile-rn';
import fa from "../../utils/fa";
import CartModel from "../../models/cart";
import BuyModel from "../../models/buy";
import AddressModel from "../../models/address";

const cartModel = new CartModel()
const buyModel = new BuyModel()
const addressModel = new AddressModel()

const Item = List.Item;

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
                <View style={styles.orderFill}>
                    <List style={{ marginTop: 10 }}>
                        {addressId > 0 ?
                            <View style={styles.address}>
                                <View style={styles.selected}>
                                    <Item arrow={'horizontal'} onClick={() => {
                                        this.goAddressList()
                                    }}>
                                        <View>
                                            <View style={styles.selectedNamePhone}>
                                                <Text style={styles.selectedUserName}>{address.truename}</Text>
                                                <Text style={styles.selectedUserPhone}>{address.phone}</Text>
                                            </View>
                                            <Text style={styles.address}>{address.combine_detail}</Text>
                                        </View>
                                    </Item>
                                </View>
                                <Image source={require('../../images/cart/address-footer-line.png')}
                                       style={styles.addressFooterLine} />
                            </View> : <View style={styles.address} onClick={() => {
                                this.goAddressAdd()
                            }}>
                                <View style={styles.unSelect}>
                                    <Image style={styles.unSelectImage}
                                           source={require('../../images/cart/address.png')} />
                                    <Text style={styles.unSelectText}>添加地址</Text>
                                </View>
                                <Image style={styles.addressFooterLine}
                                       source={require('../../images/cart/address-footer-line.png')} />
                            </View>}
                    </List>
                    <List>
                        <View>
                            {
                                cartList.length > 0 ? cartList.map((item, index) => (
                                    <Item
                                        key={index}
                                    >
                                        <View style={styles.oneItem}>
                                            <View>
                                                <Image style={styles.oneItemImage}
                                                       source={{ uri: item.goods_sku_img }} />
                                            </View>
                                            <View style={styles.oneItemBody}>
                                                <Text style={styles.oneItemBodyTitle}>{item.goods_title}</Text>
                                                <View style={styles.oneItemBodySpec}>
                                                    <Text
                                                        style={styles.oneItemBodySpecText}>{item.goods_pay_type === 2 ? (item.goods_weight > 0 ? '重量:' + item.goods_weight +
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
                            <Item>
                                <View style={styles.message}>
                                    <InputItem
                                        placeholder={'选填 有什么想对商家说的（45字以内）'}
                                        value={message}
                                        onChange={(val) => {
                                            this.onMessageChange(val)
                                        }} />
                                </View>
                            </Item>
                        </View>
                    </List>
                    <List>
                        <View>
                            {calculate > 0 ? <Item title="运费">
                                <Text style={styles.freightPrice}>+ ¥{calculate.pay_freight_fee}}</Text>
                            </Item> : null}
                            <Item title="小计">
                                <View slot="footer">
                                    <Text
                                        style={styles.totalPrice}>¥{calculate ? (calculate.goods_amount + calculate.pay_freight_fee) : total}</Text>
                                </View>
                            </Item>
                        </View>
                    </List>
                    <View>
                        <View style={styles.footer}>
                            <View style={styles.footerLeft}>
                                <Text style={styles.footerLeftLabel}>实付：</Text>
                                <Text style={styles.footerLeftText}>¥{calculate ? calculate.pay_amount : total}</Text>
                            </View>
                            <View>
                                <Button
                                    size={'large'}
                                    type={'warning'}
                                    onClick={() => {
                                        this.onCreateOrder()
                                    }}
                                    disabled={!calculate}
                                    style={{ borderRadius: 0 }}
                                >
                                    提交订单
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
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
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    }

    goAddressList() {
        wx.navigateTo({
            url: '/pages/address/list/index'
        })
    }

    // 计算费用
    async initCalculate() {
        const cartIds = this.state.cartIds
        const calculate = await buyModel.calculate({
            cart_ids: cartIds,
            address_id: this.state.addressId
        })
        if (calculate) {
            this.setState({
                calculate
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(buyModel.getException().getCode())
            })
        }
    }

    // 获得默认地址
    async initAddress() {
        let address
        if (this.state.addressId > 0) {
            address = await addressModel.info({
                id: this.state.addressId
            })
        } else {
            address = await addressModel.getDefault()
        }
        if (address) {
            this.setState({
                addressId: address.id,
                address
            })
            return address
        } else {
            return false
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
                const address = await this.initAddress()
                if (address.id > 0) {
                    await this.initCalculate()
                }
            } else {
                fa.toast.show({
                    title: '支付商品状态已变，请重新选择'
                })
                // setTimeout(function () {
                //     wx.navigateBack({ delta: this.state.delta })
                // }, 1500)
            }
        }

    }

    async initCartList() {
        const cartIds = this.state.cartIds
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        let total = 0
        const result = await cartModel.list({
            ids: cartIds
        })
        if (result.list.length > 0) {
            const cartList = result.list
            for (let i = 0; i < cartList.length; i++) {
                total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function (item) {
                    return item.id > 0 ? `${item.name}:${item.value_name}` : ''
                }).join(',')
            }
            this.setState({
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                cartList,
                total
            })
            return true
        } else {
            return false
        }
    }

    async onCreateOrder() {
        const self = this
        if (!this.state.addressId) {
            fa.toast.show({
                title: '请选择收货地址'
            })
            return
        }
        const result = await buyModel.create({
            'way': this.state.way,
            'address_id': this.state.addressId,
            'cart_ids': this.state.cartIds,
            'message': this.state.message,
        })
        const userInfo = fa.cache.get('user_info')
        if (result) {
            // 支付modal也算onShow 这儿临时限制下
            this.setState({
                payState: true
            })
            const pay_amount = this.state.calculate.pay_amount
            // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
            const payResult = await buyModel.pay({
                'order_type': 'goods_buy',
                'pay_sn': result.pay_sn,
                'payment_code': 'wechat',
                'payment_channel': 'wechat_mini',
                'openid': userInfo.wechat_mini_openid
            })
            if (payResult) {
                wx.requestPayment({
                    'timeStamp': payResult.timeStamp,
                    'nonceStr': payResult.nonceStr,
                    'package': payResult.package,
                    'signType': payResult.signType,
                    'paySign': payResult.paySign,
                    'success': function () {
                        wx.redirectTo({
                            url: `/pages/pay/result/index?pay_amount=${pay_amount}&order_id=${result.order_id}&pay_sn=${result.pay_sn}`
                        })
                    },
                    'fail': function (res) {
                        fa.toast.show({
                            title: '支付被取消'
                        })
                        setTimeout(function () {
                            wx.redirectTo({
                                url: `/pages/order/detail/index?id=${result.order_id}`
                            })
                        }, 1000)
                    }
                })
            } else {
                fa.toast.show({
                    title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
                })
                wx.navigateBack({ delta: self.data.delta })
            }
        } else {
            fa.toast.show({
                title: +fa.code.parse(buyModel.getException().getCode())
            })
        }

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
        color: '#ff4400',
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
        height: 48,
    },
    message: {},
    footer: {
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
        lineHeight: 18,
        fontWeight: '800',
        color: '#FF635C',
        marginRight: 15,
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
        color: '#FF635C'
    },
    oneItem: {
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
        lineHeight: 12,
        fontWeight: '800',
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
