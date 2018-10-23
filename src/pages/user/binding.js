import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import { Toast } from "../../utils/PublicFuncitonModule";
import { Fetch } from "../../utils";
import {
    PublicStyles,
    PublicStylesString,
    windowWidth,
    windowHeight,
    ThemeStyle
} from "../../utils/PublicStyleModule";
import { connect } from "react-redux";
import { CountdownButton } from "../../utils/PublicViewModule";
import { Button, InputItem } from "antd-mobile-rn";
import { env, AppPlatform } from "../../utils/APP_ROOT_CONFIG";
import { ThemeButton } from "../../components/theme";
import {updateUserInfo} from '../../actions/user';

@connect()
export default class UserbindingView extends Component {
    state = {
        phone: null,
        smscode: null,
        password: null,
        passwordtype:"password"
    }
    render() {
        const { passwordtype, phone } = this.state
        let newPwdType = passwordtype === 'password' ? 'text' : 'password'
        return (
            <KeyboardAvoidingView
                style={[
                    PublicStyles.ViewMax,
                    {
                        backgroundColor: "#fff",
                        paddingRight: 15,
                        paddingTop: 20
                    }
                ]}
                behavior={"padding"}
            >
                <View style={styles.viewoutcss}>
                    <InputItem
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={'#CCCCCC'}
                        placeholder="请输入手机号"
                        onChangeText={e => {
                            this.setState({
                                phone:e
                            })
                        }}
                        extra={
                            <CountdownButton
                                apiName={"USERVERIFYREGISTERPHONE"}
                                getParamsFunc={() => {
                                    return {
                                        phone
                                    }
                                }}
                                getData={e => {
                                    if (e.errcode == 0) {
                                        Toast.info("验证码已发送");
                                    } else {
                                        Toast.warn(e.errmsg);
                                    }
                                }}
                            />
                        }
                    />
                    <InputItem
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={'#CCCCCC'}
                        placeholder="请输入验证码"
                        onChangeText={e => {
                            this.setState({
                                smscode:e
                            })
                        }}
                    />
                    <InputItem
                        placeholder="设置登陆密码"
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={'#CCCCCC'}
                        type={passwordtype}
                        onChangeText={e => {
                            this.setState({
                                password:e
                            })
                        }}
                        onExtraClick={()=>{
                            this.setState({
                                passwordtype:newPwdType
                            })
                        }}
                        extra={
                            <Image
                                resizeMode ='contain'
                                source={require('../../images/yan.png')}
                                style={{
                                    width:20,
                                    height:20,
                                    transform:[{ rotateX: passwordtype==='password' ? '0deg' : '180deg' }]
                                }}
                            />
                        }
                    />
                    <ThemeButton
                        style={styles.buttonbelowcss}
                        type={'primary'}
                        onClick={() => {
                            this.bindphonefun()
                        }}
                    >
                        <Text style={styles.bindbuttontext}>确认绑定</Text>
                    </ThemeButton>
                    <View style={styles.belowviewcss}>
                        <Text style={styles.textbelowcss}>
                            绑定成功后，下次登陆即可使用手机号进行登陆
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
    async bindphonefun() {
        const { dispatch, navigation } = this.props
        const { phone, smscode, password } = this.state
        const e = await Fetch.fetch({
            apiName: "BINDPHONEHOME",
            params: {
                phone,
                smscode,
                password
            }
        })
        if (e.errcode === 0) {
            dispatch(updateUserInfo())
            navigation.goBack()
        } else {
            Toast.warn(e.errmsg);
        }
    }
}

const styles = StyleSheet.create({
    viewoutcss: {},
    buttonbelowcss: {
        marginTop: 60,
        marginLeft:15,
    },
    belowviewcss: {
        alignItems: "center"
    },
    bindbuttontext: {
        color: "#FFFFFF"
    },
    buttoncss: {
        width: 100,
        height: 30,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    buttontextcss: {
        fontSize: 13,
        color: "#000000"
    },
    textbelowcss: {
        color: "#CCCCCC",
        fontSize: 13,
        marginTop: 30
    }
});
