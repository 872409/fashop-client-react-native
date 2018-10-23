import React, { Component } from "react";
import { Image } from "react-native";
import { ThemeStyle } from "../../utils/PublicStyleModule";
import { createBottomTabNavigator } from 'react-navigation';

import HomeIndex from '../home';
import CategoryIndex from "../category";
import ShopCartIndex from "../shopCart";
import UserIndex from '../user';

class TabBarItem extends Component {
    render() {
        return (
            <Image
                source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
                style={[
                    {
                        // tintColor:this.props.tintColor,
                        width: 28,
                        height: 28
                    }
                ]}
            />
        )
    }
}

export default createBottomTabNavigator(
    {
        Home: {
            screen: HomeIndex,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "首页",
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab1.png")}
                        selectedImage={require("../../images/tabActive1.png")}
                    />
                ),
            }),
        },
        Category: {
            screen: CategoryIndex,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '分类',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab2.png")}
                        selectedImage={require("../../images/tabActive2.png")}
                    />
                ),
            }),
        },
        ShopCart: {
            screen: ShopCartIndex,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "购物车",
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab3.png")}
                        selectedImage={require("../../images/tabActive3.png")}
                    />
                ),
            })
        },
        User: {
            screen: UserIndex,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "我的",
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab4.png")}
                        selectedImage={require("../../images/tabActive4.png")}
                    />
                ),
            })
        }
    },
    {
        initialRouteName: 'Home',
        tabBarPosition: "bottom",
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: ThemeStyle.ThemeColor,
            inactiveTintColor: "#333",
            style: {
                backgroundColor: '#fff',
                borderTopColor: '#eaeaea',
                borderTopWidth: 0.5
            },
            labelStyle: {
                fontSize: 10
            },
        },
    }
);
