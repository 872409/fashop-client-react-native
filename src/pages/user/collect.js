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
    SecondHandMarketCollectList,
    RecruitCollectList,
    ReViewCollectList,
} from '../../components/user/collect';
import FeatherIcon from "react-native-vector-icons/Feather";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-View';
import SafeAreaView from "react-native-safe-area-View";

export default class UserCollect extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params || {};
        return {
            title
        }
    }
    state = {
        tabIndex: 0
    }
    render() {
        const { navigation } = this.props;
        const { tabIndex } = this.state;
        const tabList = [
            {
                tabLabel: '交易市场',
                // tabLabel: '二手市场',
                // tabLabel: '宠物秀秀',
                render: () => <SecondHandMarketCollectList navigation={navigation}/>
            }, {
                tabLabel: '招聘',
                // tabLabel: '宠物达人',
                render: () => <RecruitCollectList navigation={navigation}/>
            }, {
                tabLabel: '点评',
                // tabLabel: '宠物说说',
                render: () => <ReViewCollectList navigation={navigation}/>
            }
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <SafeAreaView style={styles.headerWarp}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.BackButton}
                            onPress={() => {
                                navigation.goBack()
                            }}
                            activeOpacity={1}
                        >
                            <FeatherIcon
                                name={'chevron-left'}
                                color={'#000'}
                                size={34}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { marginLeft: tabIndex === 0 ? (windowWidth - 68 - 69) / 2 : (windowWidth - 68 - 34) / 2, }]}>
                            {tabList[tabIndex].tabLabel}
                        </Text>
                    </View>
                </SafeAreaView>
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
                            width: windowWidth * 0.18,
                            left: windowWidth / 13.5,
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
    headerWarp: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    BackButton: {

    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
    },
})
