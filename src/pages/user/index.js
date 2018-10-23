import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
    ImageBackground
} from 'react-native';
import {
    PublicStyles,
    windowWidth,
    ThemeStyle
} from '../../utils/PublicStyleModule';
import { List } from 'antd-mobile-rn';
import { updateUserInfo } from "../../actions/user";
import Avatar from "../../components/public/avatar";

const Item = List.Item;

@connect(
    ({ 
        app: { 
            user: {
                login,
                userInfo,
                refreshing,
                levelData,
                levelDataFetchStatus
            } 
        }, 
        navigation,
    }) => ({
        login,
        userInfo,
        refreshing,
        levelData,
        levelDataFetchStatus,
        nav: navigation,
    }),
)
class UserIndex extends Component {
    render() {
        const { navigation, login, userInfo, refreshing, dispatch, nav } = this.props
        // console.log(userInfo);
        const topList = [
            {
                title: '我的发布',
                path: 'ReleaseList',
            }, {
                title: '我的收藏',
                path: 'UserCollect',
            }
        ]
        if (login && userInfo && userInfo.is_master){
            topList.push({
                title: '我的消息',
                path: 'UserMessage'
            })
        }
        const botList = [
            {
                title: '合作医院',
                path: 'CooperativeHospital',
            }, {
                title: '联系我们',
                path: 'Join',
            }, {
                title: '设置',
                path: 'UserSetting',
            }
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                if (login) {
                                    dispatch(updateUserInfo())
                                }
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
                    {
                        login ? this.loginTop() : this.unloginTop()
                    }
                    <List style={{marginBottom: 10}}>
                        {
                            topList.map((item, index) => (
                                <Item
                                    key={index}
                                    arrow="horizontal"
                                    extra={(<Text style={styles.itemExtraText}>{item.extra ? item.extra : ''}</Text>)}
                                    onClick={() => {
                                        item.path ? navigation.navigate(item.path, item.params) : null
                                    }}
                                >
                                    <Text style={styles.itemTitleText}>
                                        {item.title}
                                    </Text>
                                </Item>
                            ))
                        }
                    </List>
                    <List>
                        {
                            botList.map((item, index) => (
                                <Item
                                    key={index}
                                    arrow="horizontal"
                                    extra={(<Text style={styles.itemExtraText}>{item.extra ? item.extra : ''}</Text>)}
                                    onClick={() => {
                                        item.path ? navigation.navigate(item.path, item.params) : null
                                    }}
                                >
                                    <Text style={styles.itemTitleText}>
                                        {item.title}
                                    </Text>
                                </Item>
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    };
    loginTop() {
        const { userInfo, navigation } = this.props;
        const { nickname, avatar } = userInfo;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('UserInfo')
                }}
            >
                <ImageBackground
                    style={{
                        width: windowWidth,
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    source={require('../../images/userBgc.png')}
                >
                    
                    <Avatar
                        avatar={avatar}
                        size={60}
                    />
                    <Text style={styles.nickname}>
                        {
                            nickname
                        }
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    unloginTop() {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('UserLogin')
                }}
            >
                <ImageBackground
                    style={{
                        width: windowWidth,
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    source={require('../../images/userBgc.png')}
                >

                    <Avatar size={60}/>
                    <Text style={styles.nickname}>
                        登录体验
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    nickname: {
        fontSize: 16,
        fontFamily: 'PingFangSC-Semibold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 12
    },
    ifrealView: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ifrealImage: {
        width: 12,
        marginRight: 5
    },
    ifrealText: {
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular',
        color: 'rgba(255,255,255,.6)',
        marginTop: 10,
    },
    unloginImage: {
        width: 260
    },
    itemTitleText: {
        fontSize: 16,
        color: '#333333',
        fontFamily: 'PingFangSC-Regular'
    },
    itemExtraText: {
        fontSize: 14,
        color: '#999',
        fontFamily: 'PingFangSC-Regular'
    },
})

export default UserIndex;
