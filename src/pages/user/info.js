import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput
} from 'react-native';
import { List, InputItem } from "antd-mobile-rn";
import { modifyUserInfo, updateUserInfo } from "../../actions/user";
import { PublicStyles } from '../../utils/publicStyleModule';
import { imagePicker } from '../../utils/imagePickerModule';
import { ThemeButton } from "../../components/theme";
import Avatar from "../../components/public/avatar";
import { Fetch } from '../../utils';
import { Toast } from '../../utils/publicFuncitonModule';
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native.js";

const Item = List.Item;

@connect(
    ({ app: { user: {
        login,
        userInfo,
    }}}) => ({
        login,
        userInfo,
    }),
)
export default class UserInfo extends Component {
    state = {
        avatar: this.props.userInfo ? this.props.userInfo.avatar : null,
        nickname: this.props.userInfo ? this.props.userInfo.nickname : null,
        name: this.props.userInfo ? this.props.userInfo.name : null,
        wechat_account: this.props.userInfo ? this.props.userInfo.wechat_account : null,
    }
    componentDidMount(){
        this.props.dispatch(updateUserInfo());
    }
    render() {
        const { userInfo, navigation } = this.props
        const { avatar, nickname, name, wechat_account } = this.state;
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <List>
                        <Item
                            extra={
                                <Avatar
                                    avatar={avatar}
                                />
                            }
                            arrow="horizontal"
                            onClick={() => {
                                imagePicker(
                                    (e) => {
                                        if (e.code == 0) {
                                            this.setState({
                                                avatar: e.data.url
                                            })
                                        } else {
                                            Toast.warn('上传图片异常')
                                        }
                                    },
                                    {
                                        type: 'user_avatar'
                                    }
                                )
                            }}
                        >
                            头像
                        </Item>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请输入昵称"
                                defaultValue={userInfo.nickname}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        nickname: e
                                    })
                                }}
                                style={{ fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100 }}
                            />}
                        >
                            昵称
                        </Item>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请输入姓名"
                                defaultValue={userInfo.name}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        name: e
                                    })
                                }}
                                style={{ fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100 }}
                            />}
                        >
                            姓名
                        </Item>
                    </List>
                    <List style={{ marginTop: 10 }}>
                        <Item
                            extra={<TextInput
                                placeholder={userInfo.wechat_account ? "请输入微信号" : '待完善'}
                                defaultValue={userInfo.wechat_account}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        wechat_account: e
                                    })
                                }}
                                style={{ fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100 }}
                            />}
                            arrow="horizontal"
                        >
                            微信号
                        </Item>
                    </List>
                </ScrollView>
                <SafeAreaView>
                    <ThemeButton
                        type='primary'
                        disabled={
                            (avatar === userInfo.avatar) && (nickname === userInfo.nickname) && (name === userInfo.name) && (wechat_account === userInfo.wechat_account)
                        }
                        style={{ margin: 15 }}
                        onClick={()=>{
                            this.submit()
                        }}
                    >
                        保 存
                    </ThemeButton>
                </SafeAreaView>
            </View>
        )
    }
    submit(){
        const { avatar, nickname, name, wechat_account } = this.state
        const { dispatch } = this.props
        dispatch(modifyUserInfo({
            params:{
                avatar,
                nickname,
                name,
                wechat_account
            },
            func:()=>{}
        }))
    }
}

const styles = StyleSheet.create({
    avatarView: {
        height: 28,
        width: 28,
        borderRadius: 14,
        overflow: 'hidden'
    },
    avatar: {
        height: 28,
        width: 28,
    },
    defaultAvatar: {
        width: 12,
        height: 14,
    },
    cleanerList: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    botAgent: {
        paddingVertical: 23,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EAEAEA',
    },
    textLeft: {
        fontSize: 16,
        color: '#333333',
    },
    textright: {
        fontSize: 16,
        color: '#999999',
    }
})
