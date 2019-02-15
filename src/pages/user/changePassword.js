import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Toast } from "../../utils/function";
import {
    PublicStyles,
} from "../../utils/style";
import { connect } from "react-redux";
import { List, InputItem, Button } from "antd-mobile-rn";

@connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))
export default class UserChangePassword extends Component {
    state = {
        oldpassword : null,
        password : null,
        repassword : null,
    };
    render() {
        return (
            <View style={PublicStyles.ViewMax}>
                <List>
                    <InputItem
                        placeholder="请填写旧密码"
                        clear
                        onChange={(e)=>{this.state.oldpassword=e}}
                        labelNumber={5}
                    >
                        旧密码
                    </InputItem>
                    <InputItem
                        placeholder="请填写新密码"
                        clear
                        onChange={(e)=>{this.state.password=e}}
                        labelNumber={5}
                    >
                        新密码
                    </InputItem>
                    <InputItem
                        placeholder="请填写新密码"
                        clear
                        onChange={(e)=>{this.state.repassword=e}}
                        labelNumber={5}
                    >
                        确认新密码
                    </InputItem>
                </List>
				<Button
					onClick={this.submit}
					style={{
						marginTop: 15,
                        marginHorizontal: 15,
					}}
					type={"primary"}
				>
					确认修改
				</Button>
            </View>
        );
    }
    submit = () => {
        const {
            navigation,
            dispatch,
        } = this.props
        const {
            oldpassword,
            password,
            repassword,
        } = this.state
        if (!oldpassword) {
            return Toast.warn('请填写旧密码')
        }
        if (!password) {
            return Toast.warn('请填写新密码')
        }
        if (!repassword) {
            return Toast.warn('请填写新密码')
        }
        if (password !== repassword) {
            return Toast.warn('两次密码不一致')
        }
        const payload = {
            oldpassword,
            password,
            repassword,
        }
        dispatch({
            type: 'user/editPassword',
            payload,
            callback: ()=>{
                Toast.info('修改成功')
                navigation.goBack()
            }
        })
    }
}

const styles = StyleSheet.create({
    text1:{
        fontSize:13,
        lineHeight:17,
    },
});
