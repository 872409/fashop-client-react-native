import React, { Component } from "react";
import {
    Platform,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { createStackNavigator, HeaderBackButton, NavigationActions } from "react-navigation";
import { PublicStyles, ThemeStyle } from "../utils/PublicStyleModule";
import store from "../store";

import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

// public
import PhotoGalleryView from "../utils/PhotoGalleryView";
import PublicWebView from "../utils/PublicWebView";
import VideoDetail from "../utils/videoDetail";

// tab
import IndexView from "../pages/index";

// user
import UserLogin from "../pages/user/login";
import UserRegister from "../pages/user/register";
import UserbindingView from "../pages/user/binding";
import UserAbout from "../pages/user/about";
import UserRelation from '../pages/user/relation';
import HelpCenter from '../pages/user/helpCenter';
import UserInfo from "../pages/user/info";
import UserSetting from "../pages/user/setting";
import UserChangePassword from "../pages/user/changePassword";
import UserChangePhone from "../pages/user/changePhone";
import UserMessage from "../pages/user/message";
import UserFindPassword from "../pages/user/findPassword";

// home

// category

// shopCart


const modalStyleStackNames = [
    'UserLogin',
]

const indexNavigationOptions = ({ navigation})=>({
    'Home': {
        title:'FaShop商城'
    },
    'Category': {
        title: '分类'
    },
    'ShopCart': {
        title: '购物车',
    },
    'User': {
        title: '我的',
    },
})

const Navigator = createStackNavigator(
    {
        IndexView: {
            screen: IndexView,
            navigationOptions:({ navigation }) => {
                const options = indexNavigationOptions({navigation})[navigation.state.routes[navigation.state.index].routeName]
                return options
            }
        },

        // public

        PhotoGalleryView: {
            screen: PhotoGalleryView,
            navigationOptions: {
                header: null,
            },
        },
        PublicWebView: {
            screen: PublicWebView,
        },
        VideoDetail: {
            screen: VideoDetail,
        },

        // home

        // category

        // shopCart
        
        // user

        HelpCenter:{
            screen:HelpCenter,
            navigationOptions:{
                title:'帮助中心',
            }
        },
        UserRelation:{
            screen:UserRelation,
            navigationOptions:{
                title:'账号关联',
            }
        },
        UserAbout:{
            screen:UserAbout,
            navigationOptions:{
                title:'关于我们'
            }
        },
        UserLogin: {
            screen: UserLogin,
        },
        UserRegister: {
            screen: UserRegister,
            navigationOptions:{
                title:'注册'
            }
        },
        UserbindingView:{
            screen:UserbindingView,
            navigationOptions:{
                title:'绑定手机'
            }
        },
        UserInfo: {
            screen: UserInfo,
            navigationOptions: {
                title: '个人资料',
            }
        },
        UserSetting: {
            screen: UserSetting,
            navigationOptions: {
                title: '设置',
            }
        },
        UserFindPassword: {
            screen: UserFindPassword,
            navigationOptions: {
                title: '找回密码'
            }
        },
        UserChangePassword: {
            screen: UserChangePassword,
            navigationOptions: {
                title: '修改密码',
            },
        },
        UserChangePhone: {
            screen: UserChangePhone,
            navigationOptions: {
                title: '修改手机号',
            },
        },
        UserMessage: {
            screen: UserMessage,
            navigationOptions: {
                title: '消息'
            },
        },
    },
    {
        navigationOptions: ({ navigation })=>({
            headerBackTitle: null,
            gesturesEnabled : true,
            headerStyle : {
                backgroundColor: "#fff",
                elevation: 0,//去掉安卓阴影
                borderBottomWidth:0.5,
                borderBottomColor:'#EAEAEA',
            },
            headerTintColor: '#000',
        }),
        headerTransitionPreset: 'uikit',
        mode: "card",
        // ...Platform.select({
        //     ios: {
        //         headerMode: 'screen',
        //     },
        //     android: {
        //         headerMode: 'screen',
        //     },
        // }),
        transitionConfig:(e) => ({
            screenInterpolator: (sceneProps) => {
                const { scene } = sceneProps;
                const { route } = scene;
                if(modalStyleStackNames.includes(route.routeName)){
                    return CardStackStyleInterpolator.forVertical(sceneProps);
                }
                return CardStackStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
)

export default Navigator
