import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';
import { windowWidth, PublicStyles, ThemeStyle } from "../../utils/style";
import fa from "../../utils/fa"
import { Button, SwipeAction, Toast } from 'antd-mobile-rn';
import CartItem from "../../components/cart/item";
import CartCheckbox from "../../components/cart/checkbox";
import CartEmpty from "../../components/cart/empty";
import CartLogin from "../../components/cart/login";

@connect(({ user })=> ({
    login: user.login,
}))
export default class CartIndex extends Component {
    state = {
        refreshing: true,
        cartListLoadedState: false,
        onLoaded: false,
        goodsId: null,
        specClickGoodsId: null,
        specClickGoodsSkuId: null,
        inCartNumber: 0,
        goodsInfo: null,
        goodsSkuId: null,
        removeCheckSkuIds: [],
        specIdValueIdsChecked: [],
        isSaveMode: false,
        cartSkuShow: false,
        stepper: 1,
        cartList: [],
        total: 0,
        totalNum: 0,
        checkedGoodsSkuInfoIds: [],
        checkedCartIds: [],
        allChecked: false,
        userInfo: null,
    }
    componentDidMount() {
        const { navigation, dispatch, login } = this.props
        navigation.addListener(
            'didFocus',
            async () => {
                if(login){
                    await this.initCartList()
                    dispatch({ type: 'cart/totalNum' });
                }else {
                    this.setState({
                        refreshing: false
                    })
                }
            }
        );
    }

    renderInit() {
        return this.renderCartList()
    }

    renderCartList() {
        const { cartList } = this.state
        const { login, navigation } = this.props
        return <View style={PublicStyles.ViewMax}>
            {
                !login ? <CartLogin navigation={navigation} /> : Array.isArray(cartList) && cartList.length > 0 ? <ScrollView>
                    {
                        cartList.map((item, index) => (
                            <SwipeAction
                                key={index}
                                autoClose
                                style={{ backgroundColor: 'transparent' }}
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => this.delete(item.goods_sku_id),
                                        style: { backgroundColor: 'red', color: 'white' },
                                    },
                                ]}
                            >
                                <CartItem
                                    key={index}
                                    title={item.goods_title}
                                    price={item.goods_price}
                                    spec={item.goods_spec_string}
                                    cover={item.goods_sku_img}
                                    checked={item.is_check === 1}
                                    number={item.goods_num}
                                    goodsStock={item.goods_stock}
                                    onStepperChange={(value) => {
                                        this.onStepperChange(item.goods_sku_id, value)
                                    }}
                                    onCheckboxClick={(value) => {
                                        this.onChecked(item, value, index)
                                    }}
                                    onImageClick={() => {
                                        this.props.navigation.navigate('GoodsDetail', { id: item.goods_id })
                                    }}
                                    onTitleClick={() => {
                                        this.props.navigation.navigate('GoodsDetail', { id: item.goods_id })
                                    }}
                                />
                            </SwipeAction>
                        ))
                    }
                </ScrollView> : <CartEmpty />
            }
        </View>
    }

    render() {
        const { refreshing, checkedGoodsSkuInfoIds, cartList, totalNum, total } = this.state
        const { login } = this.props
        return <View style={PublicStyles.ViewMax}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={['#fff']}
                        progressBackgroundColor={ThemeStyle.ThemeColor}
                        tintColor={ThemeStyle.ThemeColor}
                        titleColor={ThemeStyle.ThemeColor}
                        title="加载中..."
                        onRefresh={() => {
                            this.initCartList()
                        }}
                    />
                }
                scrollEventThrottle={50}
            >
                {
                    this.renderInit()
                }
            </ScrollView>
            {
                cartList.length&&login ? 
                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <View style={styles.footerAllAction}>
                            <CartCheckbox
                                checked={checkedGoodsSkuInfoIds.length === cartList.length}
                                onClick={() => {
                                    this.onAllChecked()
                                }}
                            />
                            <Text style={styles.footerAllActionText}>全选</Text>
                        </View>
                        <View style={styles.footerTotal}>
                            <Text style={styles.footerTotalText}>合计：</Text>
                            <Text style={styles.footerTotalPrice}>¥{total}</Text>
                        </View>
                    </View>
                    <Button
                        style={{ borderRadius: 0, height: 50, width: 120 }}
                        type='primary'
                        activeStyle={false}
                        onClick={totalNum ? this.goOrderFill : ()=>Toast.info('您还没有选择商品哦')}
                    >
                        <Text>去结算({totalNum}件)</Text>
                    </Button>
                </View> : null
            }
        </View>
    }

    async delete(goods_sku_id) {
        this.props.dispatch({
            type: 'cart/del',
            payload: {
                goods_sku_ids: [goods_sku_id]
            },
            callback: this.initCartList
        })
    }

    async onChecked(item) {
        this.props.dispatch({
            type: 'cart/check',
            payload: {
                goods_sku_ids: [item.goods_sku_id],
                is_check: item.is_check === 1 ? 0 : 1,
            },
            callback: this.initCartList
        })
    }

    async onStepperChange(goods_sku_id, quantity) {
        this.setState({
            refreshing: true
        })
        this.props.dispatch({
            type: 'cart/edit',
            payload: {
                goods_sku_id,
                quantity
            },
            callback: this.initCartList
        })
    }

    async onAllChecked() {
        const { cartList, checkedGoodsSkuInfoIds } = this.state
        const cartLength = cartList.length
        const checkedLength = checkedGoodsSkuInfoIds.length
        const goodsSkuIds = cartList.map((item)=> item.goods_sku_id)
        this.props.dispatch({
            type: 'cart/check',
            payload: {
                goods_sku_ids: goodsSkuIds,
                is_check: cartLength === checkedLength ? 0 : 1,
            },
            callback: this.initCartList
        })
    }

    toggleGoodsSkuSelect() {
        this.setState({
            cartSkuShow: false
        })
    }

    async onCartGoodsSpecClick(e) {
        this.setState({
            specIdValueIdsChecked: e.detail.goodsSkuId !== this.state.goodsSkuId ? [] : this.state.specIdValueIdsChecked,
            goodsId: e.detail.goodsId,
            specClickGoodsId: e.detail.goodsId,
            specClickGoodsSkuId: e.detail.goodsSkuId,
            goodsSkuId: e.detail.goodsSkuId,
            cartSkuShow: true
        })
        await this.initGoodsInfo()
    }

    bindToggleSave(e) {
        this.setState({
            removeCheckSkuIds: [],
            isSaveMode: !this.state.isSaveMode
        })
        this.initCartList()
    }

    goOrderFill = () => {
        const {checkedCartIds} = this.state
        this.props.navigation.navigate('CartOrderFill', { cart_ids: checkedCartIds })
    }

    initCartList = () => {
        let total = 0
        let totalNum = 0
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        this.props.dispatch({
            type: 'cart/list',
            callback: ({result})=>{
                if (!result.list.length) {
                    this.setState({
                        cartListLoadedState: false,
                        checkedCartIds: [],
                        checkedGoodsSkuInfoIds: [],
                        total: 0,
                        totalNum: 0,
                        cartList: [],
                        refreshing: false
                    })
                } else {
                    const cartList = result.list
                    for (let i = 0; i < cartList.length; i++) {
                        cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function (item) {
                            return item.id > 0 ? `${item.name}:${item.value_name}` : ''
                        }).join(',')
                        if (cartList[i].is_check === 1) {
                            checkedCartIds.push(cartList[i].id)
                            checkedGoodsSkuInfoIds.push(cartList[i].goods_sku_id)
                            total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
                            totalNum += cartList[i].goods_num
                        }
                        cartList[i]['remove_checked'] = fa.inArray(cartList[i].goods_sku_id, this.state.removeCheckSkuIds);
                    }
                    total = total.toFixed(2)
                    this.setState({
                        cartListLoadedState: true,
                        checkedCartIds,
                        checkedGoodsSkuInfoIds,
                        total,
                        totalNum,
                        cartList,
                        refreshing: false
                    })
                }
            }
        })
    }

    async initGoodsInfo() {
        const result = await goodsModel.info({
            id: this.state.goodsId
        })
        if (result) {
            let goodsInfo = result.info
            for (let i = 0; i < this.state.cartList.length; i++) {
                if (this.state.cartList[i].goods_sku_id === this.state.goodsSkuId) {
                    this.setState({
                        stepper: this.state.cartList[i].goods_num
                    })
                    break;
                }
            }
            this.setState({
                goodsInfo
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(goodsModel.getException().getCode())
            })
        }
    }

    async onGoodsSkuMatchSuccess(e) {
        this.setState({
            goodsSkuInfo: e.detail.goodsSkuInfo
        })
        this.props.dispatch({
            type: 'cart/info',
            payload: {
                goods_sku_id: e.detail.goodsSkuInfo.id
            },
            callback: ({result}) => this.setState({
                cartGoods: result,
                inCartNumber: result.goods_num
            })
        })
    }

    async onGoodsSkuMatchFail(e) {
        this.setState({
            specIdValueIdsChecked: e.detail.specIdValueIdsChecked,
            goodsSkuInfo: null,
            cartGoods: null,
            inCartNumber: 0
        })
    }

    async changeSkuConfirm() {
        const { stepper, goodsSkuInfo, specClickGoodsSkuId } = this.state
        if (!goodsSkuInfo) {
            return false
        } else {
            if (stepper > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                this.props.dispatch({
                    type: 'cart/changeSku',
                    payload: {
                        to_goods_sku_id :specClickGoodsSkuId, 
                        goods_sku_id :goodsSkuInfo.id,
                        quantity :stepper
                    },
                    callback: ()=>{
                        this.initCartList()
                        this.toggleGoodsSkuSelect()
                    }
                })
            }
        }
    }

}

// 占位图，登陆提示
const styles = StyleSheet.create({
    cartCardItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFFFF',
    },
    cartCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth - 30 - 16 - 15 - 75 - 10
    },
    cartCardImage: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    cartCardCheck: {
        width: 16,
        height: 16,
        marginRight: 15,
        marginTop: 30
    },
    cartCardTitleSpec: {
        // width:windowWidth,
        // flexDirection: 'column',
        // flexWrap: 'wrap',
    },
    cartCardTitle: {
        color: '#333333',
        lineHeight: 20,
        marginBottom: 6,
        fontSize: 15,
        fontWeight: '800',
        fontFamily: 'PingFangSC-Regular',
    },
    cartCardSpec: {
        justifyContent: 'space-between',
    },
    cartCardSpecCanSkuSelect: {
        alignItems: 'center',
        padding: 5,
    },
    cartCardSpecText: {
        color: '#999',
        lineHeight: 11,
        height: 11,
        fontSize: 11,
        marginRight: 5,
    },
    cartCardPriceSpecImage: {
        width: 6,
        height: 6,
    },
    cartCardFooter: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
    },
    cartCardPrice: {
        lineHeight: 14,
        height: 14,
        color: '#FF635C',
        fontSize: 15,
        fontWeight: '800',
    },
    cartCardStepper: {
        width: 100
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FFF'
    },
    footerLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        height: 50,
        borderTopWidth: 0.5,
        borderTopColor: '#eaeaea',
    },
    footerAllAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerAllActionText: {
        marginRight: 20,
        marginLeft: 5,
        fontSize: 15,
        color: '#333',
    },
    footerTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    footerTotalText: {
        fontSize: 15,
        color: '#999',
    },
    footerTotalPrice: {
        fontSize: 18,
        color: ThemeStyle.ThemeColor,
        fontWeight: '500',
        fontFamily: 'PingFangSC-Medium',
    },
})
