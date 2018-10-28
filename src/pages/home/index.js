import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { connect } from "react-redux";
import { getHomeView } from "../../actions/home";
import { stateHoc } from "../../utils";
import SafeAreaView from "react-native-safe-area-view";
import { PublicStyles } from '../../utils/publicStyleModule';
import {
    Goods,
    GoodsList,
    GoodsSearch,
    Separator,
    AuxiliaryBlank,
    ImageAds,
    ImageNav,
    ShopWindow,
    Video,
    TopMenu,
    Title,
    TextNav,
} from "../../components/home"

@connect(({
    view: {
        home: {
            homeView,
            homeViewFetchStatus,
        }
    }
}) => ({
    homeView,
    fetchStatus: homeViewFetchStatus,
}))
@stateHoc()
export default class Home extends Component {
    hocComponentDidMount() {
        this.props.dispatch(getHomeView())
    }
    render() {
        const { homeView } = this.props
        const { background_color, name, body } = homeView
        return <View
            style={[
                PublicStyles.ViewMax, {
                    backgroundColor: background_color
                }
            ]}
        >
            <SafeAreaView style={styles.titleWarp}>
                <Text style={styles.title}>{name}</Text>
            </SafeAreaView>
            <ScrollView>
                {
                    body.map((item,index)=> this.bodyItem(item,index))
                }
            </ScrollView>
        </View>
    }
    bodyItem(item,index){
        const { navigation } = this.props;
        switch (item.type) {
            case "goods":
                return <Goods key={index} data={item} navigation={navigation} />;
            case "goods_list":
                return <GoodsList key={index} data={item} navigation={navigation} />;
            case "goods_search":
                return <GoodsSearch key={index} data={item} />;
            case "separator":
                return <Separator key={index} data={item} />;
            case "auxiliary_blank":
                return <AuxiliaryBlank key={index} data={item} />;
            case "image_ads":
                return <ImageAds key={index} data={item} />;
            case "image_nav":
                return <ImageNav key={index} data={item} />;
            case "shop_window":
                return <ShopWindow key={index} data={item} />;
            case "video":
                return <Video key={index} data={item} />;
            case "top_menu":
                return <TopMenu key={index} data={item} />;
            case "title":
                return <Title key={index} data={item} />;
            case "text_nav":
                return <TextNav key={index} data={item} />;
            default:
                return <Text key={index}>NULL</Text>;
        }
    }
}

const styles = StyleSheet.create({
    titleWarp: {
        backgroundColor: '#fff'
    },
    title: {
        lineHeight: 44,
        fontSize: 17,
        color: '#000',
        fontWeight: '700',
        textAlign: 'center'
    },
});
