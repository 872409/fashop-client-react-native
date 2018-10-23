import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    StatusBar,
    TouchableOpacity,
    Text
} from 'react-native';
import { PublicStyles, ThemeStyle, windowHeight, windowWidth } from '../../utils/PublicStyleModule';
import { Image } from '../../components/theme';
import DogItem from '../../components/dog/item';
import HomeSwiper from '../../components/home/HomeSwiper';
import HomeBtn from '../../components/home/HomeBtn';
// import HomeTab from '../../components/home/HomeTab';
import { getHomeAdData } from "../../actions/home";
import { stateHoc, Fetch, fetchStatus as utilFetchStatus } from "../../utils";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Tabs } from "antd-mobile-rn";
import { AppPlatform } from "../../utils/APP_ROOT_CONFIG";

@connect(({
    app:{
        user:{ 
            login, 
            userInfo 
        },
        location:{
            longitude,
            latitude,
        }
    },
    view:{
        home: { 
            homeAdData,
            homeAdFetchStatus,
        }
    }
}) => ({
    login,
    userInfo,
    homeAdData,
    fetchStatus: homeAdFetchStatus,
    longitude,
    latitude,
}))
@stateHoc()
export default class HomeIndex extends Component{
    state = {
        breedDogList: [],
        puppyList: [],
        tabIndex: 0
    }
    hocComponentDidMount(){
        this.fetch()
    }
    fetch = () => {
        const {
            dispatch,
        } = this.props
        dispatch(getHomeAdData()) // 轮播
    }
    componentWillMount(){
        this.getList()
    }
    getList = async () => {
        const breedDog = await Fetch.fetch({
            apiName: 'BREEDDOGSEARCH',
            params: {
                is_recommend: 1
            }
        })
        const puppy = await Fetch.fetch({
            apiName: 'PUPPYSEARCH',
            params: {
                is_recommend: 1
            }
        })
        if(breedDog.errcode===0){
            this.setState({
                breedDogList: breedDog.list
            })
        }
        if(puppy.errcode===0){
            this.setState({
                puppyList: puppy.list
            })
        }
    }
    render() {
        const { navigation, homeAdData, fetchStatus } = this.props;
        const { breedDogList, puppyList, tabIndex } = this.state;
        const tabList = [
            {
                title: '种犬推荐',
                render: () => this.recommendList(breedDogList)
            }, {
                title: '幼犬推荐',
                render: () => this.recommendList(puppyList)
            }
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={fetchStatus === utilFetchStatus.l}
                            onRefresh={() => {
                                this.getList()
                                this.fetch()
                            }}
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
                    <HomeSwiper 
                        navigation={navigation}
                        data={homeAdData}
                    />
                    <HomeBtn navigation={navigation}/>
                    {
                        AppPlatform==='ios' ? 
                        <View>
                            <ScrollableTabView
                                style={{ backgroundColor: '#fff', flex: 0 }}
                                initialPage={0}
                                renderTabBar={() =>
                                    <DefaultTabBar
                                        style={{
                                            borderWidth: 0.5,
                                            borderColor: '#eaeaea',
                                        }}
                                        tabStyle={{ paddingBottom: 0 }}
                                    />
                                }
                                tabBarActiveTextColor={ThemeStyle.ThemeColor}
                                tabBarInactiveTextColor='#666'
                                tabBarUnderlineStyle={{
                                    width: windowWidth * 0.16,
                                    left: windowWidth / 5.8,
                                    backgroundColor: `${ThemeStyle.ThemeColor}`,
                                    height: 3,
                                }}
                                tabBarTextStyle={{}}
                                onChangeTab={({ i }) => {
                                    this.getList()
                                    this.setState({
                                        tabIndex: i
                                    })
                                }}
                            >
                                {
                                    tabList.map((item, index) => (
                                        <View
                                            key={index}
                                            tabLabel={item.title}
                                        />
                                    ))
                                }
                            </ScrollableTabView>
                        </View> : 
                        <View style={{ flexDirection: 'row', height: 47, backgroundColor: '#fff' }}>
                            {
                                tabList.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={.8}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                        onPress={() => {
                                            this.getList()
                                            this.setState({
                                                tabIndex: index
                                            })
                                        }}
                                    >
                                        <Text
                                            style={{
                                                lineHeight: 44,
                                                color: tabIndex === index ? ThemeStyle.ThemeColor : '#333',
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                        <View
                                            style={{
                                                backgroundColor: tabIndex === index ? ThemeStyle.ThemeColor : 'rgba(0,0,0,0)',
                                                width: windowWidth * 0.16,
                                                height: 3,
                                            }}
                                        />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    }
                    {
                        tabList[tabIndex].render()
                    }
                </ScrollView>
            </View>
        )
    }
    recommendList(list){
        const { navigation } = this.props
        return(
            <View style={styles.list}>
                {
                    list.map((item, index) => (
                        <DogItem
                            key={index}
                            index={index}
                            img={item.images[0]}
                            title={item.title}
                            price={item.price}
                            sex={item.sex}
                            type_title={item.type_title}
                            province_name={item.province_name}
                            name={item.user_nickname}
                            avatar={item.user_avatar}
                            create_time={item.create_time}
                            age={item.age}
                            onPress={()=>{
                                navigation.navigate(!item.sex ? 'BreedDogDetail' : 'PuppyDetail',{
                                    ...item
                                })
                            }}
                        />
                    ))
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff'
    },
})
