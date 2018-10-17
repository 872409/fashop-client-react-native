// import React, { Component } from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TouchableOpacity,
//     ScrollView,
//     RefreshControl,
//     StatusBar,
//     Button,
//     Alert,
// } from "react-native";
// import {
//     PublicStyles,
//     windowWidth,
//     windowHeight,
//     ThemeStyle,
//     PublicStylesString
// } from "../../utils/PublicStyleModule";
// import {
//     NumberUtils,
//     BigButton
// } from '../../utils/PublicViewModule';
// import FetchDataModule from "../../utils/FetchDataModule";
// import { Toast, getTimeStamp } from "../../utils/PublicFuncitonModule";
// import { connect } from "react-redux";
// import { AppPlatform } from "../../utils/APP_ROOT_CONFIG";
// import NavigationBar from '../../component/NavigationBar';
// import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
// import fetchStatus from '../../utils/fetchStatus';
// import {
//     getShopCartData,
//     _goodsCheck,
//     _AllCheck,
//     _editGoodsNum,
//     _delShopCart,
// } from "../../actions/shopCart";
// import {
//     LoadingView,
//     FailureView
// } from '../../component/fetchView';
// import { HeaderButton } from '../../component/NavigationHeader';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Swipeout from 'react-native-swipeout'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { stateHOC } from '../../component/hoc';
// import NavigatorModule from "../../utils/NavigatorModule";
// import { ShopCartViewNullDataView } from "../../component/fetchStatus";
// import { AngleRightButton } from "../../utils/PublicViewModule";




// @stateHOC()
// class ShopCartIndexView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//     _editShopCart() {

//     }
//     hocComponentDidMount() {
//         const {
//             login,
//             dispatch
//         } = this.props
//         if (login) {
//             dispatch(getShopCartData())
//         }
//     }
//     render() {
//         const {
//             login,
//         } = this.props

//         if (login) {
//             return (
//                 <View style={PublicStyles.ViewMax}>
//                     {
//                         this._shopCartDataView()
//                     }
//                 </View>
//             );
//         } else {
//             return (
//                 <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ fontSize: 30, color: ThemeStyle.ThemeColor }}>没有登录</Text>
//                     <Text style={{ fontSize: 20, color: ThemeStyle.ThemeColor, marginTop: 15 }}>(这里没有设计场景效果)</Text>
//                     <Text style={{ fontSize: 20, color: ThemeStyle.ThemeColor, marginTop: 15, fontWeight: 'bold' }}>╮(╯▽╰)╭</Text>
//                 </View>
//             )
//         }
//     }
//     _shopCartDataView() {
//         const {
//             shopCartData,
//             allCheck,
//             allPrice,
//             goodsCheck,
//             navigation,
//             coudan_data,
//         } = this.props

//         if (shopCartData.length == 0) {
//             return this._nullDataView()
//         }

//         return (
//             <View style={{ flex: 1 }}>
//                 <View style={styles.viewMod2}>
//                     <Text style={styles.Text2}>共{shopCartData.length}件商品</Text>
//                 </View>
//                 <ScrollView style={styles.ScrollView} alwaysBounceVertical={false}>
//                     {
//                         shopCartData.map((goodsDataSource, i) => {
//                             return (
//                                 <Swipeout
//                                     style={styles.Swipeout}
//                                     right={
//                                         [
//                                             {
//                                                 text: '删除',
//                                                 backgroundColor: '#ED4D3D',
//                                                 onPress: this._delShopCart.bind(this, goodsDataSource.cart_id, i)
//                                             }
//                                         ]
//                                     }
//                                     autoClose={true}
//                                     key={i}
//                                 >
//                                     <View
//                                         style={styles.List}
//                                     >
//                                         <TouchableOpacity
//                                             style={styles.checkButton}
//                                             activeOpacity={1}
//                                             onPress={() => {
//                                                 this._goodsCheck(i)
//                                             }}
//                                         >
//                                             {
//                                                 goodsCheck[i].check
//                                                     ? <MaterialIcons name={'check-circle'} color={ThemeStyle.ThemeColor} size={20} />
//                                                     : <MaterialIcons name={'radio-button-unchecked'} color={ThemeStyle.ThemeColor} size={20} />
//                                             }
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             style={styles.ShopImg}
//                                             onPress={() => {
//                                                 navigation.navigate('GoodsDetailView', {
//                                                     id: goodsDataSource.goods_id
//                                                 })
//                                             }}
//                                             activeOpacity={1}
//                                         >
//                                             <Image
//                                                 source={{ uri: goodsDataSource.goods_img + '?x-oss-process=image/resize,w_150' }}
//                                                 style={styles.ShopImg}
//                                                 resizeMode={Image.resizeMode.contain}
//                                             />
//                                         </TouchableOpacity>
//                                         <View style={styles.ShopDetailView}>
//                                             <View style={styles.ShopTopView}>
//                                                 <Text style={styles.ShopTitleText} numberOfLines={1}>{goodsDataSource.goods_title}</Text>
//                                                 <Text style={styles.Text1} numberOfLines={1}>规格：这里没有数据</Text>
//                                             </View>
//                                             <View style={styles.ShopBottomView}>
//                                                 <Text style={styles.ShopPrice}><Text style={{ fontSize: 14 }}>¥ </Text>{goodsDataSource.goods_price}</Text>
//                                                 <NumberUtils
//                                                     initialNum={goodsCheck[i].goods_num}
//                                                     maxNum={goodsDataSource.goods_storage}
//                                                     editNumFun={this._editGoodsNum.bind(this, i, goodsDataSource)}
//                                                     textColor={'#F60000'}
//                                                     buttonTextColor={'#F60000'}
//                                                 />
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </Swipeout>
//                             )
//                         })
//                     }
//                     {
//                         coudan_data.if_coudan
//                             ? <AngleRightButton
//                                 style={{ backgroundColor: '#fff' }}
//                                 onPress={() => {
//                                     navigation.navigate('MallMergeOrderView')
//                                 }}
//                             >
//                                 <Text style={styles.Text4}>{coudan_data.desc}</Text>
//                                 <Text style={{ fontSize: 12, color: '#f6841f' }}>去凑单</Text>
//                             </AngleRightButton>
//                             : undefined
//                     }
//                 </ScrollView>
//                 <View style={styles.BottomView}>
//                     <View style={{ flexDirection: 'row' }}>
//                         <TouchableOpacity
//                             style={styles.allCheckButton}
//                             onPress={() => { this._AllCheck() }}
//                             activeOpacity={1}
//                         >
//                             {
//                                 allCheck
//                                     ? <MaterialIcons name="check-circle" color={ThemeStyle.ThemeColor} size={20} style={styles.ShopCheckIcon} />
//                                     : <MaterialIcons name="radio-button-unchecked" color={ThemeStyle.ThemeColor} size={20} style={styles.ShopCheckIcon} />
//                             }
//                             <Text style={styles.StoreTitile}>全选</Text>
//                         </TouchableOpacity>
//                         {
//                             allCheck
//                                 ? <TouchableOpacity
//                                     style={{ paddingHorizontal: 5, justifyContent: 'center' }}
//                                     onPress={() => {
//                                         this._delAll()
//                                     }}
//                                 >
//                                     <Text style={{ color: ThemeStyle.ThemeColor, fontSize: 15 }}>删除</Text>
//                                 </TouchableOpacity>
//                                 : null
//                         }

//                     </View>
//                     <View style={styles.viewMod1}>
//                         <View style={styles.PriceView}>
//                             <Text style={styles.PriceText}>总计：<Text style={styles.PriceTextNum}>¥{allPrice}</Text></Text>
//                             <Text style={styles.ShopContentText}>不含邮费</Text>
//                         </View>
//                         <TouchableOpacity
//                             style={styles.SubmitButton}
//                             activeOpacity={1}
//                             onPress={() => { this._settlement() }}
//                         >
//                             <Text style={styles.SubmitText}>
//                                 {
//                                     (() => {
//                                         let goodsCheckNum = 0
//                                         goodsCheck.map((dataSource) => {
//                                             if (dataSource.check) {
//                                                 goodsCheckNum += dataSource.goods_num
//                                             }
//                                         })
//                                         return `结算(${goodsCheckNum})件`
//                                     })()
//                                 }
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
//     _goodsCheck(i) {
//         const { dispatch, goodsCheck, shopCartData } = this.props
//         dispatch(_goodsCheck(goodsCheck, i, shopCartData))
//     }
//     _AllCheck() {
//         const { dispatch, goodsCheck, allCheck } = this.props
//         dispatch(_AllCheck(allCheck, goodsCheck))
//     }
//     _editGoodsNum(i, goodsDataSource, quantity) {
//         if (quantity) {
//             const { dispatch, goodsCheck } = this.props
//             dispatch(_editGoodsNum(i, quantity, goodsCheck))
//             FetchDataModule.fetch('CARTEDIT', {
//                 cart_id: goodsDataSource.cart_id,
//                 quantity
//             })
//                 .then((e) => {
//                     if (e.errcode == 0) {
//                         // this.props.dispatch(getShopCartData())
//                     } else {
//                         Toast.error(e.errmsg)
//                     }
//                 })
//         } else {
//             Alert.alert(
//                 '提示',
//                 `是否删除${goodsDataSource.goods_title}?`,
//                 [
//                     {
//                         text: '取消',
//                         onPress: () => { }
//                     },
//                     {
//                         text: '确定',
//                         onPress: () => {
//                             this._delShopCart.bind(this, goodsDataSource.cart_id, i)()
//                         },
//                     }
//                 ],
//             );
//         }
//     }
//     _delShopCart(cart_id, i) {
//         const { dispatch, shopCartData, goodsCheck } = this.props

//         FetchDataModule.fetch('CARTDEL', { cart_id })
//             .then((e) => {
//                 if (e.errcode == 0) {
//                     Toast.show('删除成功')
//                 } else {
//                     Toast.show('删除失败')
//                 }
//             })

//         let newShopCartData = [...shopCartData]
//         newShopCartData.splice(i, 1);

//         let newGoodsCheck = [...goodsCheck]
//         newGoodsCheck.splice(i, 1);

//         dispatch(_delShopCart(newShopCartData, newGoodsCheck))

//     }
//     _settlement() {
//         const { navigation } = this.props

//         let cart_buy_items = [];
//         this.props.goodsCheck.map((source, i) => {
//             if (source.check == true) {
//                 cart_buy_items.push({ cart_id: source.cart_id, quantity: source.goods_num })
//             }
//         })
//         if (cart_buy_items.length > 0) {
//             navigation.navigate('MallOrderBuyView', { cart_buy_items, 'if_cart': 1 })
//         } else {
//             Toast.info('请选择商品')
//         }
//     }
//     _delAll() {
//         const { goodsCheck } = this.props

//         const newArray = goodsCheck.map((e) => {
//             return FetchDataModule.fetch('CARTDEL', { cart_id: e.cart_id })
//         })
//         Promise.all(newArray)
//             .then((e) => {
//                 this.props.dispatch(getShopCartData())
//             })
//     }
//     _nullDataView() {
//         const { navigation } = this.props
//         return (
//             <ShopCartViewNullDataView
//                 navigation={navigation}
//             />
//         )
//     }
// }

// const styles = StyleSheet.create({
//     ScrollView: {
//         flex: 1,
//     },
//     viewMax: {
//         flex: 1,
//         backgroundColor: '#F6F6F6',
//     },
//     Swipeout: {

//     },
//     ListTopView: {
//         marginTop: 12,
//         backgroundColor: '#fff',
//         paddingRight: 15,
//         height: 45,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     ListTopViewLeft: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     ListTopViewRight: {
//         height: 30,
//         justifyContent: 'center',
//     },
//     ShopCheckIcon: {
//     },
//     StoreTitile: {
//         fontSize: 14,
//         color: '#313131',
//         marginLeft: 5
//     },
//     CouponText: {
//         fontSize: 12,
//         color: '#fd6000',
//     },
//     ShopStoreIcon: {
//         width: 13,
//         height: 13,
//     },
//     List: {
//         backgroundColor: '#fff',
//         paddingRight: 15,
//         paddingVertical: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: '#F6F6F6',
//     },
//     ShopImg: {
//         height: 75,
//         width: 75,
//     },
//     ShopDetailView: {
//         flex: 1,
//         marginLeft: 10,
//         justifyContent: 'space-between',
//         height: 75,
//     },
//     ShopTitleText: {
//         fontSize: 14,
//         color: '#333',
//         marginBottom: 8,
//         fontFamily: 'PingFangSC-Medium'
//     },
//     ShopContentText: {
//         fontSize: 12,
//         color: '#adadad',
//     },
//     ShopBottomView: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-end'
//     },
//     ShopPrice: {
//         fontSize: 18,
//         color: '#F60000',
//     },
//     checkButton: {
//         height: 45,
//         width: 45,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     ScrollView: {
//         flex: 1,
//     },
//     BottomView: {
//         backgroundColor: '#fff',
//         flexDirection: 'row',
//         height: 50,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     PriceView: {
//         height: 50,
//         marginRight: 10,
//         justifyContent: 'center',
//         alignItems: 'flex-end'
//     },
//     PriceText: {
//         fontSize: 14,
//         color: '#434343',
//         marginBottom: 5,
//     },
//     PriceTextNum: {
//         color: '#F60000',
//         fontSize: 16,
//     },
//     SubmitButton: {
//         width: 105,
//         backgroundColor: '#F75860',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 50,
//     },
//     SubmitText: {
//         color: '#fff',
//         fontSize: 14,
//     },
//     CouponView: {
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     CouponViewTitle: {
//         fontSize: 14,
//         marginTop: 15,
//         marginBottom: 5,
//     },
//     CouponViewContent: {
//         flex: 1,
//         marginTop: 10,
//         paddingHorizontal: 10,
//         height: 220,
//     },
//     CouponViewList: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         // borderBottomWidth:1,
//         borderColor: '#999',
//         flex: 1,
//         paddingVertical: 15,
//     },
//     CouponViewButton: {
//         borderWidth: 1,
//         borderColor: 'red',
//         borderRadius: 5,
//     },
//     CouponViewButtonText: {
//         marginVertical: 5,
//         marginHorizontal: 10,
//         color: 'red',
//         fontSize: 12,
//     },
//     CouponViewCloseButton: {
//         height: 40,
//         backgroundColor: 'red',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dataEmpty: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     dataEmptyIconView: {
//     },
//     dataEmptyIcon: {
//         color: '#ccc',
//         fontSize: 60
//     },
//     dataEmptyTitle: {
//         marginTop: 15,
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#ccc'
//     },
//     dataEmptyDesc: {
//         color: ThemeStyle.ThemeColor
//     },
//     goMallView: {
//         borderWidth: 1,
//         borderBottomColor: ThemeStyle.ThemeColor,
//         padding: 10,
//         marginTop: 20,
//         borderRadius: 3
//     },
//     Text1: {
//         fontSize: 12,
//         color: '#9E9E9E',
//     },
//     allCheckButton: {
//         height: 45,
//         width: 80,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//     },
//     viewMod1: {
//         flexDirection: 'row',
//     },
//     viewMod2: {
//         backgroundColor: '#F8F8F8',
//         height: 35,
//         paddingHorizontal: 15,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     Text2: {
//         fontSize: 14,
//         color: '#9C9C9C',
//     },
//     nullDataView: {
//         flex: 1,
//         backgroundColor: '#F8F8F8',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     nullDataImage: {
//         width: windowWidth * 0.5,
//         height: windowWidth * 0.5,
//     },
//     Text3: {
//         color: '#949494',
//         fontSize: 20,
//         marginTop: 20,
//     },
//     Text4: {
//         fontSize: 12,
//         color: '#999',
//     },
// });

// const mapStateToProps = store => {
//     return {
//         shopCartData: store.shopCartIndex.shopCartData,
//         goodsCheck: store.shopCartIndex.goodsCheck,
//         allCheck: store.shopCartIndex.allCheck,
//         allPrice: store.shopCartIndex.allPrice,
//         fetchStatus: store.shopCartIndex.fetchStatus,
//         coudan_data: store.shopCartIndex.coudan_data,
//         login: store.userIndex.login
//     };
// };

// export default connect(mapStateToProps)(ShopCartIndexView);
