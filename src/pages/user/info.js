import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput
} from 'react-native';
import { List, Modal, DatePicker } from "antd-mobile-rn";
import { PublicStyles, ThemeStyle } from '../../utils/style';
import { imagePicker } from '../../utils/imagePicker';
import { Button } from "../../components/theme";
import Avatar from "../../components/public/avatar";
import moment from "moment";
import fa from '../../utils/fa';

const Item = List.Item;

@connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))
export default class UserInfo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { onPress } = navigation.state.params || {};
        return {
            headerRight: <TouchableOpacity
                activeOpacity={.8}
                style={{ marginRight: 15 }}
                onPress={onPress}
            >
                <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>退出</Text>
            </TouchableOpacity>
        }
    }
    state = {
        avatar: null,
        nickname: null,
        sex: null,
        birthday: null,
    }
    componentDidMount(){
        const { navigation, dispatch, userInfo } = this.props;
        navigation.setParams({
            onPress: this.logout,
        })
        if (!userInfo){
            dispatch({
                type: 'user/self'
            });
        }
    }
    render() {
        const { userInfo } = this.props
        const { profile } = userInfo
        const { avatar, nickname, sex, birthday } = this.state;
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <List>
                        <Item
                            extra={
                                <Avatar
                                    avatar={avatar ? avatar : profile.avatar}
                                />
                            }
                            arrow="horizontal"
                            onClick={() => {
                                imagePicker(
                                    (e) => {
                                        if (e.code === 0) {
                                            this.setState({
                                                avatar: e.result.origin.path
                                            })
                                        } else {
                                            fa.toast.show({ title: '上传图片异常' })
                                        }
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
                                defaultValue={profile.nickname}
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
                                placeholder="请选择性别"
                                defaultValue={profile.sex ? '男' : '女'}
                                value={(sex===null ? profile.sex : sex) ? '男' : '女'}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                editable={false}
                                style={{ fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100 }}
                            />}
                            onClick={() => {
                                Modal.operation([
                                    { text: '男', onPress: () => this.setState({ sex: 1 }) },
                                    { text: '女', onPress: () => this.setState({ sex: 0 }) },
                                ])
                            }}
                        >
                            性别
                        </Item>
                    </List>
                    <List style={{ marginTop: 10 }}>
                        <DatePicker
                            mode="date"
                            title="生日"
                            extra="立即补充"
                            value={(birthday===null ? profile.birthday : birthday) ? new Date(birthday===null ? profile.birthday : birthday) : null}
                            minDate={new Date("1900-01-01")}
                            onChange={date => {
                                this.setState({
                                    birthday: moment(date).format('YYYY-MM-DD')
                                })
                            }}
                        >
                            <Item arrow="horizontal">生日</Item>
                        </DatePicker>
                    </List>
                </ScrollView>
                <SafeAreaView>
                    <Button
                        type='primary'
                        disabled={
                            (avatar === null) && 
                            (nickname === null) && 
                            (sex === null) && 
                            (birthday === null)
                        }
                        style={{ margin: 15 }}
                        onClick={this.submit}
                    >
                        保 存
                    </Button>
                </SafeAreaView>
            </View>
        )
    }
    logout = async() => {
        this.props.dispatch({
            type: 'user/logout'
        })
    }
    submit = () => {
        const { avatar, nickname, sex, birthday } = this.state;
        const { dispatch } = this.props
        const payload = {
            avatar,
            nickname,
            sex,
            birthday
        }
        dispatch({
            type: 'user/editProfile',
            payload,
        })
    }
}
