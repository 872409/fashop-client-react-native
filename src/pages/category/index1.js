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
//     Animated,
// } from "react-native";

// import {
//     PublicStyles,
//     windowWidth,
//     windowHeight,
//     ThemeStyle,
//     PublicStylesString
// } from "../../utils/PublicStyleModule";
// import FetchDataModule from "../../utils/FetchDataModule";
// import { Toast, getTimeStamp } from "../../utils/PublicFuncitonModule";
// import { connect } from "react-redux";
// import { AppPlatform } from "../../utils/APP_ROOT_CONFIG";
// import NavigationBar from '../../component/NavigationBar';
// import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
// import fetchStatus from '../../utils/fetchStatus';
// import {
//     SortHeader,
// } from "../../component/sort";
// import {
//     getSortData
// } from "../../actions/sort";
// import {
//     LoadingView,
//     FailureView
// } from '../../component/fetchView';
// import {
//     ListViewComponent,
// } from '../../utils/PublicViewModule';
// import {
//     GoodsListViewRow
// } from "../../component/goods";
// import {
//     MallGoodsListViewNullDataView
// } from "../../component/fetchStatus";
// import Parabola from 'react-native-smart-parabola'
// import Badge from 'react-native-smart-badge'
// // sortData: store.sortIndex.sortData,
// //     sortDataFetchStatus: store.sortIndex.sortDataFetchStatus,
// //         shopCartData: store.shopCartIndex.shopCartData,
// @connect(
//     ({
//         app: {
//             location: {
//                 provinceData,
//             }
//         }
//     }) => ({
//         provinceData,
//     }),
// )
// export default class Category extends Component {
//     static navigationOptions = ({ navigation, screenProps }) => {
//         return ({
//             header: (
//                 <SortHeader navigation={navigation} />
//             ),
//         })
//     };
//     constructor(props) {
//         super(props);
//         this.state = {
//             isTrigger: false,
//             ParabolaStart: { x: 0, y: 0 },
//             ParabolaEnd: { x: 0, y: 0 },
//             ParabolaData: null,
//         };
//     }
//     componentDidMount() {
//         this.props.dispatch(getSortData())
//     }
//     render() {
//         const {
//             isTrigger,
//             ParabolaStart,
//             ParabolaEnd,
//         } = this.state
//         const {
//             navigation,
//             shopCartData
//         } = this.props

//         const shopCartNum = (() => {
//             let num = 0
//             shopCartData.map((dataSource) => {
//                 num += dataSource.goods_num
//             })
//             return num
//         })()

//         return (
//             <View style={PublicStyles.ViewMax}>
//                 <StatusBar barStyle={'light-content'} />
//                 {
//                     this._sortDataFetchStatus()
//                 }
//                 <Parabola
//                     isTrigger={isTrigger}
//                     rate={0.7}
//                     start={ParabolaStart}
//                     end={ParabolaEnd}
//                     renderParabola={this._renderParabola.bind(this)}
//                     duration={700}
//                     ref={e => this.Parabola = e}
//                     endFunc={() => {
//                         this.SortShopCartButton.start()
//                     }}
//                 />
//                 <SortShopCartButton
//                     shopCartNum={shopCartNum}
//                     onLayout={(e) => {
//                         const { x, y } = e.nativeEvent.layout
//                         this.setState({
//                             ParabolaEnd: {
//                                 x: x + 15,
//                                 y
//                             }
//                         })
//                     }}
//                     ref={(e) => { this.SortShopCartButton = e }}
//                     navigation={navigation}
//                 />
//             </View>
//         );
//     }
//     _renderParabola = ({ index, AnimatedVaule }) => {
//         const { ParabolaData } = this.state
//         return (
//             <Animated.View
//                 style={[
//                     styles.Animated,
//                     AnimatedVaule
//                 ]}
//                 key={index}
//             >
//                 <Image
//                     source={{ uri: ParabolaData.img }}
//                     style={styles.image2}
//                 />
//             </Animated.View>
//         )
//     }
//     _sortDataFetchStatus() {
//         const {
//             sortDataFetchStatus
//         } = this.props

//         switch (sortDataFetchStatus) {
//             case fetchStatus.l:
//                 return <LoadingView autoLayout />
//             case fetchStatus.s:
//                 return this._sortDataView()
//             case fetchStatus.f:
//                 return <FailureView autoLayout />
//         }
//     }
//     _sortDataView() {
//         const {
//             sortData,
//             navigation,
//         } = this.props
//         return sortData.length
//             ? <ScrollableTabView
//                 tabBarActiveTextColor={ThemeStyle.ThemeColor}
//                 tabBarUnderlineStyle={{ backgroundColor: ThemeStyle.ThemeColor, height: 2 }}
//                 renderTabBar={() => (
//                     <ScrollableTabBar
//                         style={{ backgroundColor: '#fff', borderColor: '#F6F6F6', borderBottomWidth: 1, height: 45 }}
//                         tabStyle={{ paddingBottom: 0, height: 45 }}
//                         inactiveTextColor={'#3B3B3B'}
//                     />
//                 )}
//             >
//                 {
//                     sortData.map((data, i) => (
//                         <ListViewComponent
//                             fetchApiName={'GOODSSEARCH'}
//                             fetchParams={{
//                                 category_id: data.id,
//                             }}
//                             renderRow={this._renderRow.bind(this)}
//                             style={{ flex: 1 }}
//                             tabLabel={data.title}
//                             key={i}
//                             removeClippedSubviews={false}
//                             nullDataElement={
//                                 (props) => (
//                                     <MallGoodsListViewNullDataView
//                                         {...props}
//                                         navigation={navigation}
//                                     />
//                                 )
//                             }
//                         />
//                     ))
//                 }
//             </ScrollableTabView>
//             : undefined
//     }
//     _renderRow(data) {
//         const {
//             navigation,
//             dispatch
//         } = this.props
//         return <GoodsListViewRow
//             data={data}
//             navigation={navigation}
//             dispatch={dispatch}
//             shopCartOnPress={this.shopCartOnPress.bind(this)}
//         />
//     }
//     shopCartOnPress(e, data) {
//         const {
//             pageX,
//             pageY,
//         } = e
//         this.setState({
//             isTrigger: true,
//             ParabolaStart: {
//                 x: pageX,
//                 y: pageY - 64,
//             },
//             ParabolaData: data
//         }, () => {
//             this.Parabola.start()
//         })
//     }
// }



// class SortShopCartButton extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             bounceValue: new Animated.Value(1),
//         };
//     }
//     start() {
//         Animated.timing(
//             this.state.bounceValue,
//             {
//                 toValue: 0.8,
//                 duration: 150,
//             }
//         ).start(() => {
//             Animated.timing(
//                 this.state.bounceValue,
//                 {
//                     toValue: 1,
//                     duration: 150,
//                 }
//             ).start()
//         })
//     }
//     render() {
//         const {
//             onLayout,
//             shopCartNum,
//             navigation,
//         } = this.props
//         return (
//             <Animated.View
//                 style={[
//                     styles.viewMod1,
//                     {
//                         transform: [
//                             { scale: this.state.bounceValue }
//                         ]
//                     }
//                 ]}
//                 onLayout={(e) => {
//                     onLayout(e)
//                 }}
//             >
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     style={styles.button1}
//                     onPress={() => {
//                         navigation.navigate('ShopCartIndexView')
//                     }}
//                 >
//                     <Image
//                         source={require('../../images/sort01.png')}
//                         style={styles.image1}
//                     />
//                     {
//                         shopCartNum
//                             ? <Badge
//                                 textStyle={{ color: '#fff', fontSize: 10 }}
//                                 style={{ position: 'absolute', top: 0, right: -15, backgroundColor: '#f3c41f' }}
//                             >
//                                 {shopCartNum}
//                             </Badge>
//                             : null
//                     }
//                 </TouchableOpacity>
//             </Animated.View>
//         )
//     }
// }





// const styles = StyleSheet.create({
//     Animated: {
//         position: 'absolute',
//         height: 30,
//         width: 30,
//         borderRadius: 15,
//     },
//     button1: {
//         height: 50,
//         width: 50,
//         borderRadius: 25,
//         backgroundColor: ThemeStyle.ThemeColor,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image1: {
//         height: 30,
//         width: 30,
//     },
//     viewMod1: {
//         position: 'absolute',
//         height: 50,
//         width: 50,
//         shadowRadius: 10,
//         shadowOpacity: 1,
//         shadowColor: '#999',
//         bottom: 15,
//         left: 15,
//         backgroundColor: 'rgba(0,0,0,0)'
//     },
//     image2: {
//         height: 30,
//         width: 30,
//         borderRadius: 15,
//     },
// });

