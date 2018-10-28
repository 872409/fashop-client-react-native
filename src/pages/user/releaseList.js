import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Text
} from 'react-native';
import { PublicStyles, ThemeStyle, windowHeight, windowWidth } from '../../utils/publicStyleModule';
import {
    BreedDogReleaseList,
    PuppyReleaseList,
    SecondHandMarketReleaseList,
    RecruitReleaseList,
    ReviewReleaseList
} from "../../components/user/release";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class ReleaseList extends Component {
    state = {
        tabIndex: 0
    }
    render() {
        const { navigation } = this.props;
        const { tabIndex } = this.state;
        const tabList = [
            {
                tabLabel: '种犬',
                render: () => <BreedDogReleaseList navigation={navigation}/>
            }, {
                tabLabel: '幼犬',
                render: () => <PuppyReleaseList navigation={navigation}/>
            }, {
                // tabLabel: '宠物秀秀',
                // tabLabel: '二手市场',
                tabLabel: '交易市场',
                render: () => <SecondHandMarketReleaseList navigation={navigation}/>
            }, {
                // tabLabel: '宠物达人',
                tabLabel: '招聘',
                render: () => <RecruitReleaseList navigation={navigation}/>
            }, {
                // tabLabel: '宠物说说',
                tabLabel: '点评',
                render: () => <ReviewReleaseList navigation={navigation}/>
            }
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <View>
                    <ScrollableTabView
                        style={{ backgroundColor: '#fff', flex: 0 }}
                        initialPage={0}
                        renderTabBar={() =>
                            <DefaultTabBar
                                style={{
                                    borderWidth: 0,
                                    // borderColor: '#eaeaea',
                                }}
                                tabStyle={{ paddingBottom: 0 }}
                            />
                        }
                        tabBarActiveTextColor={ThemeStyle.ThemeColor}
                        tabBarInactiveTextColor='#666'
                        tabBarUnderlineStyle={{
                            // width: windowWidth * 0.18,
                            // left: windowWidth / 68,
                            backgroundColor: `${ThemeStyle.ThemeColor}`,
                            height: 3,
                            // borderRadius: 4,
                        }}
                        tabBarTextStyle={{}}
                        onChangeTab={({ i }) => {
                            this.setState({
                                tabIndex: i
                            })
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
                    </ScrollableTabView>
                </View>
                {
                    tabList[tabIndex].render()
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({

})
