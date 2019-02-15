import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Button, List } from 'antd-mobile-rn';
import { Button } from "../../components/theme";
import { PublicStyles } from '../../utils/style'

const Item = List.Item;

@connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))
export default class UserSetting extends Component {
    render() {
        const { navigation, dispatch } = this.props;
        const list = [
            {
                title: '修改密码',
                path: 'UserChangePassword',
            }, {
                title: '账号关联',
                path: 'UserRelation',
            }
        ]
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "space-between", backgroundColor: "#F8F8F8" }}>
                <View style={PublicStyles.ViewMax}>
                    <List>
                        {
                            list.map((item, index) => (
                                <Item
                                    key={index}
                                    arrow="horizontal"
                                    onClick={() => {
                                        navigation.navigate(item.path);
                                    }}
                                >
                                    {
                                        item.title
                                    }
                                </Item>
                            ))
                        }
                    </List>
                </View>
                <Button
                    style={{
                        marginBottom: 15,
                        marginHorizontal: 15,
                        borderWidth: 0,
                    }}
                    onClick={() => {
                        dispatch({
                            type: 'user/logout'
                        })
                    }}
                >
                    <Text style={{ color: '#FB3030' }}>
                        退出账号
                    </Text>
                </Button>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})
