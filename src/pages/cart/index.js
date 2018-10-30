import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { windowWidth, PublicStyles, ThemeStyle } from "../../utils/publicStyleModule";
import fa from "../../utils/fa"
import CartItem from "../../components/cart/item";
import CartModel from "../../models/cart";
import CartLogic from "../../logics/cart";
const cartModel = new CartModel()
export default class Cart extends Component {
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
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                await this.initCartList()
            }
        );
    }

    renderInit() {
        return this.renderCartList()
    }

    renderCartList() {
        const { cartList } = this.state
        return <View>
            {Array.isArray(cartList) && cartList.length > 0 ? cartList.map((item, index) => (
                <CartItem
                    key={index}
                    title={item.goods_title}
                    price={item.goods_price}
                    spec={'0.5kg；长款；红色'}
                    cover={item.goods_sku_img}
                    checked={item.is_check === 1}
                    number={item.goods_num}
                    onCheckboxClick={(value) => {
                        this.onChecked(item,value,index)
                    }}
                    onStepperChange={(value) => {
                        this.onStepperChange(item,value,index)
                    }}
                />
            )) : null}
        </View>
    }

    render() {
        const { refreshing } = this.state
        return <View style={PublicStyles.ViewMax}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={['#fff']}
                        progressBackgroundColor={ThemeStyle.ThemeColor}
                        tintColor={ThemeStyle.ThemeColor}
                        titleColor={ThemeStyle.ThemeColor}
                        title="加载中..."
                    />
                }
                onScroll={() => {

                }}
                scrollEventThrottle={50}
            >
                {
                    this.renderInit()
                }
            </ScrollView>
        </View>
    }

    async onRemove() {
        await cartModel.del({
            goods_sku_ids: this.state.removeCheckSkuIds
        })
        await this.initCartList()
    }

    onRemoveChecked(e) {
        const id = e.currentTarget.dataset.goodsSkuId
        let ids = this.state.removeCheckSkuIds
        !fa.inArray(id, ids) ? ids.push(id) : ids = fa.remove(ids, id)
        this.setState({
            removeCheckSkuIds: ids
        })
        this.initCartList()
    }

    onAllRemoveChecked() {
        let ids = this.state.removeCheckSkuIds
        const allIds = this.state.cartList.map(function (item) {
            return item.goods_sku_id
        })
        ids = allIds.length === ids.length ? [] : allIds
        this.setState({
            removeCheckSkuIds: ids
        })
        this.initCartList()
    }

    async onChecked(item,value,index) {
        await cartModel.check({params:{
                goods_sku_ids: [item.goods_sku_id],
                is_check: item.is_check === 1 ? 0 : 1,
            }})
        this.initCartList()
    }

    async onStepperChange(item,number,index) {
        const goods_sku_id = item.goods_sku_id
        const cartLogic = new CartLogic()
        const result = await cartLogic.save(goods_sku_id, number)
        if (result !== false) {
            this.initCartList()
        } else {
            this.setState({

            })
            fa.toast.show({
                title: fa.code.parse(cartLogic.cartModel.getException().getCode())
            })
        }
    }

    async onAllChecked() {
        const cartLength = this.state.cartList.length
        const checkedLength = this.state.checkedGoodsSkuInfoIds.length
        const goodsSkuIds = this.state.cartList.map(function (item) {
            return item.goods_sku_id
        })

        await cartModel.check({
            goods_sku_ids: goodsSkuIds,
            is_check: cartLength === checkedLength ? 0 : 1,
        })
        this.initCartList()
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

    goOrderFill() {
        // wx.navigateTo({
        //     url: '/pages/cart/orderFill/index?cart_ids=' + JSON.stringify(this.state.checkedCartIds)
        // })
    }

    goGoodsDetail(e) {
        // wx.navigateTo({
        //     url: `/pages/goods/detail/index?id=${e.detail.goodsId}`
        // })
    }




    componentWillUnmount() {
        console.warn('xxxxxxxx')
    }


    async initCartList() {
        // 计算金额
        let total = 0
        let totalNum = 0
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        const result = await cartModel.list()
        if (result.list) {
            const cartList = result.list
            for (let i = 0; i < cartList.length; i++) {

                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function (item) {
                    return `${item.name}:${item.value_name}`
                })

                if (cartList[i].checked === true) {
                    checkedCartIds.push(cartList[i].id)
                    checkedGoodsSkuInfoIds.push(cartList[i].goods_sku_id)
                    // todo 多个float相加有bug 暂时想不通
                    total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
                    totalNum += cartList[i].goods_num
                }
                cartList[i]['remove_checked'] = fa.inArray(cartList[i].goods_sku_id, this.state.removeCheckSkuIds);

            }
            total = total.toFixed(2)
            console.log(cartList)
            this.setState({
                cartListLoadedState: true,
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                total,
                totalNum,
                cartList,
                refreshing: false
            })
        } else {
            fa.toast.show({
                title: 'xxx'
            })
        }

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
        const cartGoods = await cartModel.info({ goods_sku_id: e.detail.goodsSkuInfo.id })
        if (cartGoods) {
            this.setState({
                cartGoods: cartGoods,
                inCartNumber: cartGoods.goods_num
            })
        }
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
        const stepper = this.state.stepper
        const goodsSkuInfo = this.state.goodsSkuInfo
        const specClickGoodsSkuId = this.state.specClickGoodsSkuId
        if (!goodsSkuInfo) {
            return false
        } else {
            if (stepper > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                const cartLogic = new CartLogic()
                const result = await cartLogic.change(specClickGoodsSkuId, goodsSkuInfo.id, stepper)
                if (result !== false) {
                    this.initCartList()
                    this.toggleGoodsSkuSelect()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
                    })
                }
            }
        }
    }

}
// 占位图，登陆提示
const styles = StyleSheet.create({
    page: {
        // width:windowWidth
    },
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
        fontSize: 14,
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
        fontSize: 14,
        fontWeight: '800',
    },
    cartCardStepper: {
        width: 100
    }
})
