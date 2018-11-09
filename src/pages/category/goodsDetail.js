import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';
import { connect } from "react-redux";
import { getGoodsDetail } from "../../actions/category";
import { stateHoc } from "../../utils";
// import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-View';
import { ThemeStyle, windowWidth, PublicStyles } from '../../utils/publicStyleModule';
import { Carousel, Modal } from 'antd-mobile-rn'
import {
    Goods,
    Separator,
    BodyImage,
    Video,
    BodyText
} from '../../components/body'
import SpecList from '../../components/goods/specList'

@connect(({
    View: {
        category: {
            goodsDetailData,
            goodsDetailFetchStatus,
        }
    }
}) => ({
    data: goodsDetailData,
    fetchStatus: goodsDetailFetchStatus ? goodsDetailFetchStatus : {},
}))
@stateHoc({
    detail: true,
})
export default class CategoryDetail extends Component {
    state = {
        specVisible: false,
        if_cart: -1,
        currentSpec: {
            stock: '-',
            price: '-',
            selectNum: 1,
            spec: [{
                id: 0,
                name: '-',
                value_id: 0,
                value_name: '-',
            }]
        },
    }
    hocComponentDidMount() {
        const {
            navigation,
            fetchStatus
        } = this.props
        const { id } = navigation.state.params
        this.props.dispatch(
            getGoodsDetail({
                params: {
                    id
                },
                fetchStatus: fetchStatus ? fetchStatus[id] : null,
            })
        );
    }
    hocDetailKey() {
        return this.props.navigation.state.params.id
    }
    render() {
        const { specVisible, if_cart, currentSpec } = this.state;
        const { navigation } = this.props;
        const { id } = navigation.state.params
        const data = this.props.data[id]
        // console.log(data);
        // const tabList = [
        //     {
        //         render: () => this.goods(),
        //         tabLabel: '商品'
        //     }, {
        //         render: () => this.evaluate(),
        //         tabLabel: '评价'
        //     }, {
        //         render: () => this.detail(),
        //         tabLabel: '详情'
        //     }
        // ]
        return <View style={PublicStyles.ViewMax}>
            {/* <ScrollableTabView
                style={{ backgroundColor: '#fff', flex: 0 }}
                initialPage={0}
                renderTabBar={() =>
                    <DefaultTabBar
                        style={{
                            borderWidth: 0,
                            borderColor: 'rgba(0,0,0,0)'
                        }}
                        tabStyle={{ paddingBottom: 0 }}
                    />
                }
                tabBarActiveTextColor={ThemeStyle.ThemeColor}
                tabBarInactiveTextColor='#666'
                tabBarUnderlineStyle={{
                    width: windowWidth * 0.5 / 4,
                    left: windowWidth / 9.8,
                    backgroundColor: `${ThemeStyle.ThemeColor}`,
                    height: 3,
                    borderRadius: 4
                }}
                tabBarTextStyle={{}}
                onChangeTab={({ i }) => {
                    // this.setState({
                    //     tabIndex: i
                    // })
                }}
            >
                {
                    tabList.map((item, index) => (
                        <View
                            key={index}
                            tabLabel={item.tabLabel}
                        />
                    ))
                }
            </ScrollableTabView> */}
            <ScrollView>
                {
                    this.carousel(data.images)
                }
                {
                    this.titleView(data)
                }
                {
                    this.detail(data)
                }
            </ScrollView>
            {
                this.botView()
            }
            <Modal
                // title={(
                //     <View style={styles.popModalTitleView}>
                //         <View style={styles.popModalTitleLeft} />
                //         <View style={styles.popModalTitleTight}>
                //             <Text style={[styles.popModalTitleTightP]}> ¥{currentSpec.price}</Text>
                //             <Text style={[PublicStyles.descTwo9]}>
                //                 已选：
                //                 {
                //                     currentSpec.spec.map((item) => {
                //                         return `${item.value_name} `;
                //                     })
                //                 }
                //             </Text>
                //         </View>
                //     </View>
                // )}
                closable={true}
                popup={true}
                visible={specVisible}
                onClose={() => {
                    this.setState({
                        specVisible: false
                    })
                }}
                animationType="slide-up"
            >
                <SpecList
                    navigation={navigation}
                    if_cart={if_cart}
                    data={data}
                    skuList={data.sku_list ? data.sku_list : []}
                    specList={data.spec_list ? data.spec_list : []}
                    changeCurrentSpec={this.changeCurrentSpec}
                    currentSpec={currentSpec}
                    closeModal={this.closeModal}
                />
            </Modal>
        </View>
    }
    changeCurrentSpec = (currentSpec) => {
        this.setState({ currentSpec });
    }
    closeModal = () => {
        this.setState({ specVisible: false });
    }
    carousel(data){
        return(
            <Carousel
                autoplay={data.length > 1}
                infinite={data.length > 1}
                dotActiveStyle={styles.dotActive}
                dotStyle={styles.dot}
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                // afterChange={index => console.log('slide to', index)}
            >
                {
                    data.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.carouselImg}
                            onPress={() => {
                                // navigation.navigate('PublicWebView', {
                                //     title: item.title,
                                //     url: `${env.domain}/app/info/detail?id=${item.id}`
                                // })
                            }}
                            key={i}
                        >
                            <Image
                                source={{
                                    uri: item
                                }}
                                style={styles.carouselImg}
                            />
                        </TouchableOpacity>
                    ))
                }
            </Carousel>
        )
    }
    titleView(data){
        return(
            <View style={styles.titleWarp}>
                <View style={styles.titleTop}>
                    <Text style={[styles.title, PublicStyles.boldTitle]}>{data.title}</Text>
                    <View style={PublicStyles.rowBetweenCenter}>
                        <Text style={styles.price}>￥ {data.price}</Text>
                        <Image style={styles.share} source={require('../../images/goodsDetail/share.png')}/>
                    </View>
                </View>
                <View style={[styles.titleBot,PublicStyles.rowBetweenCenter]}>
                    <Text style={PublicStyles.descTwo9}>库存 {data.stock}</Text>
                    <Text style={PublicStyles.descTwo9}>销量 {data.sale_num}</Text>
                    <Text style={PublicStyles.descTwo9}>运费 {data.freight_fee}</Text>
                </View>
            </View>
        )
    }
    detail(data){
        return(
            <View style={styles.body}>
                <Text style={[styles.detailTitle,PublicStyles.boldTitle]}>商品详情</Text>
                {
                    data.body.map((item, index) => {
                        switch (item.type) {
                            case "goods":
                                return <Goods key={index} data={item} />;
                            case "separator":
                                return <Separator key={index} data={item} />;
                            case "image":
                                return <BodyImage key={index} url={item.value.url} />;
                            case "video":
                                return <Video key={index} data={item} />;
                            case "text":
                                return <BodyText key={index} content={item.value.content} />;
                            default:
                                return <Text key={index}>NULL</Text>;
                        }
                    })
                }
            </View>
        )
    }
    botView(){
        const leftText = [PublicStyles.descTwo9,{fontSize: 10, marginTop: 6}]
        return(
            <SafeAreaView style={{backgroundColor: '#fff'}}>
                <View style={styles.bot}>
                    <View style={[PublicStyles.rowCenter,styles.botLeft]}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.botItem}
                            onPress={() => { }}
                        >
                            <Image source={require('../../images/goodsDetail/im.png')}/>
                            <Text style={leftText}>客服</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.botItem}
                            onPress={() => { }}
                        >
                            <Image source={require('../../images/goodsDetail/collect.png')}/>
                            <Text style={leftText}>收藏</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.botItem}
                            onPress={() => { }}
                        >
                            <Image source={require('../../images/goodsDetail/cart.png')}/>
                            <Text style={leftText}>购物车</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.botRight]}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={[styles.botItem,{backgroundColor: ThemeStyle.ThemeColor2}]}
                            onPress={() => {
                                this.setState({
                                    specVisible: true,
                                    if_cart: 1
                                })
                            }}
                        >
                            <Text style={[PublicStyles.title,{color: '#fff'}]}>加入购物车</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={[styles.botItem,{backgroundColor: ThemeStyle.ThemeColor}]}
                            onPress={() => {
                                this.setState({
                                    specVisible: true,
                                    if_cart: 0
                                })
                            }}
                        >
                            <Text style={[PublicStyles.title,{color: '#fff'}]}>立即购买</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    carouselImg: {
        width: windowWidth,
        height: windowWidth
    },
    dotActive: {
        backgroundColor: ThemeStyle.ThemeColor
    },
    dot: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        height: 7,
        width: 7
    },
    titleWarp: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        marginBottom: 10
    },
    titleTop: {
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
    },
    title: {
        marginBottom: 15
    },
    price: {},
    share: {},
    titleBot: {
        height: 36
    },
    body: {
        backgroundColor: '#fff'
    },
    detailTitle: {
        padding: 15
    },
    bot: {
        flexDirection: 'row',
        height: 50
    },
    botLeft: {
        flexDirection: 'row',
        width: windowWidth*0.41
    },
    botRight: {
        flexDirection: 'row',
        flex: 1
    },
    botItem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    popModalTitleView:{
        height: 45,
    },
    popModalTitleLeft:{
        width: 90,
        height: 90,
        borderRadius: 3,
        // boxShadow: "5 0 10 rgba(0,0,0,0.07)",
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        zIndex: 100
    },
    popModalTitleTight:{
        alignItems: 'flex-start',
        marginLeft: 105,
    },
    popModalTitleTightP:{
        fontSize: 18,
        color: ThemeStyle.ThemeColor,
    },
});
