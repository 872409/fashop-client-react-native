import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { PublicStyles, ThemeStyle } from '../../utils/PublicStyleModule';
import HomeSwiper from '../../components/home/HomeSwiper';
import HomeBtn from '../../components/home/HomeBtn';
import { getHomeAdData } from "../../actions/home";
import { stateHoc, fetchStatus as utilFetchStatus } from "../../utils";

@connect(({
    view:{
        home: { 
            homeAdData,
            homeAdFetchStatus,
        }
    }
}) => ({
    homeAdData,
    fetchStatus: homeAdFetchStatus,
}))
@stateHoc()
export default class HomeIndex extends Component{
    state = {}
    hocComponentDidMount(){
        this.fetch()
    }
    fetch = () => {
        const {
            dispatch,
        } = this.props
        dispatch(getHomeAdData()) // 轮播
    }
    render() {
        const { navigation, homeAdData, fetchStatus } = this.props;
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
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
})
