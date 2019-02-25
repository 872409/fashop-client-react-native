import React, { Component } from 'react';
import {connect} from 'react-redux';
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';
import fa from '../../utils/fa';
import { PublicStyles, ThemeStyle } from '../../utils/style'
import { List, NoticeBar, Radio, Button } from "antd-mobile-rn";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Alipay from "react-native-yunpeng-alipay";
import { sendWechatAuthRequest } from "../../utils/wechat";
import * as WeChat from 'react-native-wechat';

const RadioItem = Radio.RadioItem;

@connect(({ wechat })=>({
    isWXAppInstalled: wechat.isWXAppInstalled,
}))
export default class Pay extends Component{
    state = {
        center: "",
        wait: 7200,
        payment_code: 'wechat'
    }
    async componentDidMount(){
        let { wait } = this.state
        this.timer = window.setInterval(() => {
            let hour = 0
            let minute = 0
            let second = 0
            if (wait > 0) {
                let day = Math.floor(wait / (60 * 60 * 24))
                hour = Math.floor(wait / (60 * 60)) - (day * 24);
                minute = Math.floor(wait / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(wait) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            if (hour <= 9) hour = '0' + hour;
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            if (wait === 0) {
                window.clearInterval(this.timer)
                this.setState({
                    center: '超时',
                });
            }else {
                --wait;
                this.setState({
                    center: `${hour}小时${minute}分钟${second}秒`
                });
            }
        }, 1000)
    }
    componentWillUnmount() {
        this.timer && window.clearInterval(this.timer)
    }
    render() {
        const { center, payment_code } = this.state;
        const { isWXAppInstalled, navigation } = this.props
        const { orderInfo, pay_amount } = navigation.state.params
        const payment_list = [
            { type: "wechat", name: "微信支付" },
            { type: "alipay", name: "支付宝支付" },
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <NoticeBar
                        icon={
                            <AntDesignIcon
                                color={ThemeStyle.ThemeColor4}
                                size={16}
                                name="exclamationcircleo"
                            />
                        }
                        style={{backgroundColor: '#FFF7E7'}}
                    >
                        <Text style={{ color: ThemeStyle.ThemeColor4 }}>
                            请在 {center} 内完成支付
                        </Text>
                    </NoticeBar>
                    <View style={styles.totalView}>
                        <Text style={[PublicStyles.boldTitle, { fontSize: 15, marginBottom: 10 }]}>此次订单共需支付</Text>
                        <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor, fontSize: 17 }]}>
                            ￥
                            <Text style={{ fontSize: 26 }}>{pay_amount}</Text>
                        </Text>
                    </View>
                    <List 
                        renderHeader={() => (
                            <View style={styles.listHeaderView}>
                                <Text style={PublicStyles.descFour9}>选择支付方式</Text>
                            </View>
                        )}
                    >
                        {
                            payment_list.map(i => {
                                // const disabled = i.type==='wechat'&&isWXAppInstalled===false
                                return (
                                    <RadioItem
                                        key={i.type}
                                        checked={payment_code === i.type}
                                        onChange={() => this.setState({ payment_code: i.type })}
                                        radioStyle={{ tintColor: ThemeStyle.ThemeColor }}
                                        // disabled={disabled}
                                        // extra={disabled && <Text style={{ fontSize: 15, color: 'red' }}>不支持此支付方式</Text>}
                                    >
                                        <Text 
                                            style={[
                                                PublicStyles.title,{ 
                                                    lineHeight: 47, 
                                                    color: payment_code === i.type ? ThemeStyle.ThemeColor : '#333'
                                                }
                                            ]}
                                        >
                                            {i.name}
                                        </Text>
                                    </RadioItem>
                                )
                            })
                        }
                    </List>
                </ScrollView>
                <SafeAreaView>
                    <Button
                        style={{ borderRadius: 0 }}
                        type='primary'
                        size="large"
                        onClick={payment_code==="wechat" ? this.wxPay : this.aliPay}
                    >
                        {
                            payment_code==='wechat' ? `微信支付￥${pay_amount}` : 
                            payment_code==='alipay' ? `支付宝支付￥${pay_amount}` : `￥${pay_amount}`
                        }
                    </Button>
                </SafeAreaView> 
            </View>
        )
    }
    wxPay = async() =>{
        const { navigation, dispatch } = this.props
        const { orderInfo } = navigation.state.params
        const { tokenData } = await sendWechatAuthRequest()
        const payload = {
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'wechat',
            openid: tokenData.openid,
            payment_channel: 'wechat_app' // 支付渠道 "wechat"  "wechat_mini" "wechat_app"
        }
        dispatch({
            type: 'buy/pay',
            payload,
            callback: async (e) => {
                try {
                    const result = e ? e.result : {}
                    const payOptions = {
                        partnerId: result.partnerid,    // 商家向财付通申请的商家id
                        prepayId: result.prepayid,    // 预支付订单
                        nonceStr: result.noncestr,    // 随机串，防重发
                        timeStamp: result.timestamp,    // 时间戳，防重发
                        package: result.package,    // 商家根据财付通文档填写的数据和签名
                        sign: result.sign,    // 商家根据微信开放平台文档对数据做的签名
                    }
                    await WeChat.pay(payOptions)
                    fa.toast.show({ title: '支付成功', type: 'success' });
                    this.paySuccess()
                } catch (err) {
                    this.payFailure()
                    fa.toast.show({ title: '支付失败' });
                }
            }
        })
    }
    aliPay = async() => {
        const { navigation, dispatch } = this.props
        const { orderInfo } = navigation.state.params
        const payload = {
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'alipay',
            payment_channel: 'alipay_app' // 支付渠道 "wechat"  "wechat_mini" "wechat_app" "alipay_app"
        }
        dispatch({
            type: 'buy/pay',
            payload,
            callback: async(e)=>{
                try {
                    const result = e ? e.result : {}
                    await Alipay.pay(result.content)
                    fa.toast.show({ title: '支付成功', type: 'success' });
                    this.paySuccess()
                } catch (err) {
                    this.payFailure()
                    fa.toast.show({ title: '支付失败' });
                }
            }
        })
    }
    paySuccess = () => {
        const { payment_code } = this.state;
        const { navigation } = this.props;
        const { pay_amount, orderInfo } = navigation.state.params;
        navigation.replace('PaySuccess',{
            pay_amount,
            pay_type: payment_code === 'wechat' ? `微信支付` : payment_code === 'alipay' ? `支付宝支付` : ``,
            id: orderInfo.order_id || orderInfo.id
        })
    }
    payFailure = () => {
        const { navigation } = this.props;
        const { orderInfo } = navigation.state.params;
        navigation.replace('OrderDetail', {
            id: orderInfo.order_id || orderInfo.id
        })
    }
}

const styles = StyleSheet.create({
    totalView: {
        backgroundColor: '#fff',
        paddingVertical: 24,
        alignItems: 'center',
    },
    listHeaderView: {
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 10,
    }
})
