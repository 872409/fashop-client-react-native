import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { connect } from "react-redux";
// import { stateHoc } from "../../utils";
import { PublicStyles } from '../../utils/style';
import {
    Goods,
    GoodsGroup,
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
} from "../../components/page"

@connect(({ page }) => ({
    pageInfo: page.info.result.info,
}))
// @stateHoc()
export default class PageDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params || {}
        return {
            title,
        }
    }

    async componentDidMount() {
        const { dispatch, pageInfo, navigation } = this.props;
        const { id } = navigation.state.params
        await dispatch({
            type: "page/info",
            payload: { id }
        })
        navigation.setParams({
            title: pageInfo.name
        })
    }

    render() {
        const { pageInfo } = this.props
        const { background_color, body } = pageInfo
        return <View
            style={[
                PublicStyles.ViewMax, {
                    backgroundColor: background_color
                }
            ]}
        >
            <ScrollView>
                {
                    body.map((item, index) => this.bodyItem(item, index))
                }
            </ScrollView>
        </View>
    }

    handelLink = (link) => {

        const { navigation } = this.props
        switch (link.action) {
            case "portal":
                return navigation.navigate("Home");
            case "goods":
                return navigation.navigate("GoodsDetail", { id: link.param.id });
            case "page":
                return navigation.navigate("PageDetail", { id: link.param.id });
            case "url":
                return navigation.navigate('PublicWebView', {
                    url: link.param.url
                })
            case "goods_category":
                return navigation.navigate("GoodsList", { category_id: link.param.id });
            default:
                return navigation.navigate("Home");
        }
    }

    bodyItem(item, index) {
        const { navigation } = this.props;
        switch (item.type) {
            case "goods":
                return <Goods key={index} data={item} navigation={navigation} />;
            case "goods_list":
                return <GoodsList key={index} data={item} navigation={navigation} />;
            case "goods_search":
                return <GoodsSearch
                    key={index}
                    data={item}
                    goGoodsList={() => navigation.navigate("GoodsList", {
                        autoFocus: true
                    })}
                />;
            case "separator":
                return <Separator key={index} data={item} />;
            case "auxiliary_blank":
                return <AuxiliaryBlank key={index} data={item} />;
            case "image_ads":
                return <ImageAds key={index} data={item} handelLink={this.handelLink} />;
            case "image_nav":
                return <ImageNav key={index} data={item} handelLink={this.handelLink} />;
            case "shop_window":
                return <ShopWindow key={index} data={item} handelLink={this.handelLink} />;
            case "video":
                return <Video key={index} data={item} navigation={navigation} />;
            case "top_menu":
                return <TopMenu key={index} data={item} handelLink={this.handelLink} />;
            case "title":
                return <Title key={index} data={item} />;
            case "text_nav":
                return <TextNav key={index} data={item} handelLink={this.handelLink} />;
            case "goods_group":
                return <GoodsGroup key={index} data={item} navigation={navigation} />;
            default:
                return <Text key={index}>NULL</Text>;
        }
    }
}

const styles = StyleSheet.create({
    
});
