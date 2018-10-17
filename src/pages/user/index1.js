// import React, { Component } from "react";
// import {
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     ScrollView,
//     Image,
//     RefreshControl,
//     Platform,
//     Alert,
//     Linking,
// } from "react-native";

// import {
//     PublicStyles,
//     PublicStylesString,
//     windowWidth,
//     windowHeight,
//     ThemeStyle
// } from "../../utils/PublicStyleModule";
// import UserStatusModule from "../../utils/UserStatusModule";
// import Icon from "react-native-vector-icons/FontAwesome";
// import NavigatorModule from "../../utils/NavigatorModule";
// import {
//     AngleRightButton,
//     BigButton,
// } from "../../utils/PublicViewModule";
// import { Toast } from "../../utils/PublicFuncitonModule";
// import FetchDataModule from "../../utils/FetchDataModule";
// import ParallaxScrollView from 'react-native-parallax-scroll-view';
// import { connect } from "react-redux";
// import NavigationBar from "../../component/NavigationBar";
// import {
//     UserIndexOrderBar,
//     UserIndexUtils
// } from '../../component/user';
// import NetWorkImage from "../../component/Image";
// import {
//     getUserMixedStateNum,
//     updateUserInfo
// } from "../../actions/user";
// import Badge from 'react-native-smart-badge'



// class UserIndexView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//     componentDidMount() {
//         this.updateUserInfo({ showLoading: false });
//     }
//     updateUserInfo(params) {
//         if (this.props.login) {
//             this.props.dispatch(updateUserInfo(params))
//             this.props.dispatch(getUserMixedStateNum())
//         }
//     }
//     render() {
//         const {
//             navigation,
//             login,
//             couponNum,
//             refreshing,
//             settingData,
//             orderNum,
//             unReadMessageCount,
//         } = this.props;

//         let renderForeground;
//         if (login) {
//             const user = this.props.userInfo;
//             renderForeground = <View style={styles.headerView}>
//                 <View style={styles.viewMod1}>
//                     <View style={styles.viewMod4}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             style={styles.buttonMod1}
//                             onPress={(e) => {
//                                 navigation.navigate('UserFAQView')
//                             }}
//                         >
//                             <Image
//                                 source={require('../../images/user02.png')}
//                                 style={styles.imageMod1}
//                                 resizeMode={'contain'}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.viewMod3}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             style={styles.buttonMod3}
//                             onPress={(e) => {
//                                 navigation.navigate('UserInfoView')
//                             }}
//                         >
//                             <NetWorkImage
//                                 style={styles.imageMod2}
//                                 source={{ uri: user.avatar }}
//                             />
//                             <Text style={styles.Text5}>{user.nickname}</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.viewMod5}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             style={styles.buttonMod1}
//                             onPress={(e) => {
//                                 navigation.navigate('UserMessageView')
//                             }}
//                         >
//                             <Image
//                                 source={require('../../images/user03.png')}
//                                 style={styles.imageMod1}
//                                 resizeMode={'contain'}
//                             />
//                             {
//                                 unReadMessageCount
//                                     ? <Badge
//                                         textStyle={{ color: '#fff', fontSize: 10 }}
//                                         style={{ position: 'absolute', top: -10, right: 5, backgroundColor: '#f3c41f' }}
//                                     >
//                                         {unReadMessageCount}
//                                     </Badge>
//                                     : null
//                             }
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles.viewMod2}>
//                     <TouchableOpacity
//                         style={styles.viewMod6}
//                         activeOpacity={1}
//                         onPress={() => {
//                             navigation.navigate('UserRechargeView')
//                         }}
//                     >
//                         <Text style={styles.Text2}>{user.available_predeposit}</Text>
//                         <Text style={styles.Text3}>账户余额(元)</Text>
//                     </TouchableOpacity>
//                     <View style={styles.viewMod7} />
//                     <TouchableOpacity
//                         style={styles.viewMod6}
//                         activeOpacity={1}
//                         onPress={() => {
//                             navigation.navigate('MallCouponListView')
//                         }}
//                     >
//                         <Text style={styles.Text2}>{couponNum}</Text>
//                         <Text style={styles.Text3}>优惠券(张)</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//         } else {

//             renderForeground = <View style={styles.headerView}>
//                 <View style={styles.viewMod1}>
//                     <View style={styles.viewMod4}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             style={styles.buttonMod1}
//                             onPress={(e) => {
//                                 navigation.navigate('UserLoginView')
//                             }}
//                         >
//                             <Image
//                                 source={require('../../images/user02.png')}
//                                 style={styles.imageMod1}
//                                 resizeMode={'contain'}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.viewMod3}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             style={styles.buttonMod2}
//                             onPress={(e) => {
//                                 navigation.navigate('UserLoginView')
//                             }}
//                         >
//                             <Text style={styles.Text1}>快来登陆</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.viewMod5}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             style={styles.buttonMod1}
//                             onPress={(e) => {
//                                 navigation.navigate('UserLoginView')
//                             }}
//                         >
//                             <Image
//                                 source={require('../../images/user03.png')}
//                                 style={styles.imageMod1}
//                                 resizeMode={'contain'}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles.viewMod2}>
//                     <TouchableOpacity
//                         style={styles.viewMod6}
//                         activeOpacity={1}
//                         onPress={() => {
//                             navigation.navigate('UserLoginView')
//                         }}
//                     >
//                         <Text style={styles.Text2}>0</Text>
//                         <Text style={styles.Text3}>账户余额(元)</Text>
//                     </TouchableOpacity>
//                     <View style={styles.viewMod7} />
//                     <TouchableOpacity
//                         style={styles.viewMod6}
//                         activeOpacity={1}
//                         onPress={() => {
//                             navigation.navigate('UserLoginView')
//                         }}
//                     >
//                         <Text style={styles.Text2}>0</Text>
//                         <Text style={styles.Text3}>优惠券(张)</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//         }



//         return (
//             <View style={PublicStyles.ViewMax}>
//                 <ParallaxScrollView
//                     refreshControl={
//                         login
//                             ? <RefreshControl
//                                 refreshing={refreshing}
//                                 onRefresh={() => {
//                                     this.updateUserInfo()
//                                 }}
//                                 colors={['#00BA91']}
//                                 progressBackgroundColor={"#F4F4F4"}
//                                 tintColor={'#fff'}
//                             />
//                             : undefined
//                     }
//                     renderBackground={() => {
//                         return (
//                             <Image source={require('../../images/user01.png')} style={styles.topView} />
//                         )
//                     }}
//                     renderForeground={() => {
//                         return renderForeground
//                     }}
//                     parallaxHeaderHeight={210}
//                     backgroundScaleSpeed={7}
//                 >
//                     <AngleRightButton
//                         icon={require('../../images/user04.png')}
//                         iconStyle={{ width: 20, height: 20 }}
//                         onPress={() => {
//                             if (login) {
//                                 navigation.navigate('MallOrderListView', { index: 0 })
//                             } else {
//                                 navigation.navigate('UserLoginView')
//                             }
//                         }}
//                         style={{ paddingVertical: 14 }}
//                     >
//                         <Text style={styles.Text4}>全部订单</Text>
//                     </AngleRightButton>
//                     <UserIndexOrderBar navigation={navigation} login={login} orderNum={orderNum} />
//                     <UserIndexUtils navigation={navigation} login={login} />
//                     {
//                         settingData
//                             ? <View style={styles.telView}>
//                                 <Image source={require('../../images/uuser23.png')} style={styles.telIcon} />
//                                 <Text style={styles.telText}>{settingData.basic_service_tel.value}</Text>
//                             </View>
//                             : undefined
//                     }
//                 </ParallaxScrollView>
//                 {
//                     // <BigButton
//                     //     text = {'联系客服'}
//                     //     TextColor = {'#ff585d'}
//                     //     ButtonColor = {'#fff'}
//                     //     underlayColor = {'#fff'}
//                     //     onPress = {()=>{
//                     //         Alert.alert(
//                     //             `是否拨打${settingData.basic_service_tel.value}`,
//                     //             '',
//                     //             [
//                     //                 {
//                     //                     text: '取消',
//                     //                     onPress: () => {}
//                     //                 },
//                     //                 {   text: '确定',
//                     //                     onPress: () => {
//                     //                         Linking.openURL(`tel:${settingData.basic_service_tel.value}`).catch(()=>{});
//                     //                     }
//                     //                 }
//                     //             ]
//                     //         );
//                     //     }}
//                     // />
//                 }
//             </View>
//         )


//     }
// }

// const styles = StyleSheet.create({
//     headerView: {
//         flex: 1,
//         ...Platform.select({
//             ios: {
//                 paddingTop: 30,
//             },
//             android: {
//                 paddingTop: 10,
//             },
//         }),
//     },
//     topView: {
//         height: 210,
//         resizeMode: "stretch",
//         width: windowWidth
//     },
//     viewMod1: {
//         flexDirection: 'row',
//         flex: 1,
//     },
//     viewMod2: {
//         height: 50,
//         backgroundColor: 'rgba(255,255,255,0.3)',
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     viewMod3: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     viewMod4: {
//         width: windowWidth * 0.2,
//         alignItems: 'flex-start',
//     },
//     viewMod5: {
//         width: windowWidth * 0.2,
//         alignItems: 'flex-end',
//     },
//     buttonMod1: {
//         padding: 15,
//         paddingTop: 0,
//     },
//     imageMod1: {
//         width: 25,
//         height: 25,
//     },
//     buttonMod2: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         backgroundColor: 'rgba(255,255,255,0.3)',
//         borderWidth: 1,
//         borderColor: 'rgba(255,255,255,0.7)',
//         borderRadius: 20,
//     },
//     Text1: {
//         color: '#ff585d',
//         fontSize: 14,
//     },
//     viewMod6: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     viewMod7: {
//         height: 30,
//         width: 1,
//         backgroundColor: 'rgba(255,255,255,0.3)'
//     },
//     Text2: {
//         color: '#ff585d',
//         fontSize: 20
//     },
//     Text3: {
//         color: '#666',
//         fontSize: 12
//     },
//     Text4: {
//         color: '#333',
//         fontSize: 14,
//         fontFamily: 'PingFangSC-Medium'
//     },
//     buttonMod3: {
//         alignItems: 'center',
//     },
//     imageMod2: {
//         width: 75,
//         height: 75,
//         borderRadius: 37.5,
//     },
//     Text5: {
//         fontSize: 16,
//         color: '#333',
//         marginTop: 5,
//     },
//     telView: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: '#f5f5f5',
//         paddingBottom: 20,
//         paddingTop: 50
//     },
//     telIcon: {
//         width: 12,
//         height: 12
//     },
//     telText: {
//         fontSize: 12,
//         color: '#999',
//         lineHeight: 12,
//         marginLeft: 5
//     },
// });

// const mapStateToProps = store => {
//     return {
//         login: store.userIndex.login,
//         userInfo: store.userIndex.userInfo,
//         couponNum: store.userIndex.couponNum,
//         refreshing: store.userIndex.refreshing,
//         settingData: store.settingIndex.data,
//         orderNum: store.userIndex.orderNum,
//         unReadMessageCount: store.userIndex.unReadMessageCount,
//     };
// };

// export default connect(mapStateToProps)(UserIndexView);
