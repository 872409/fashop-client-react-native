import React, { Component } from 'react';
import {connect} from 'react-redux';
import{
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Fetch from '../../utils/fetch';
import { Toast } from "../../utils/function";
import {
    PublicStyles, ThemeStyle,
} from '../../utils/style'
import { List, NoticeBar } from "antd-mobile-rn";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Alipay from "react-native-yunpeng-alipay";
import { sendWechatAuthRequest, wechatPay } from "../../actions/app/wechat";
// import { BuyApi } from '../../config/api/buy'

const Item = List.Item;

@connect(({
    app: {
        wechat: {
            isWXAppInstalled
        }
    },
})=>({
    isWXAppInstalled,
}))
export default class Pay extends Component{
    state = {
        // payment_list:[],
        // pay_amount:0,
        // order_id:''
        center: "",
        wait: 7200
    }
    // async componentDidMount(){
    //     const { navigation } = this.props
    //     const { pay_sn } = navigation.state.params
    //     const e = await Fetch.fetch({
    //         api: BuyApi.info,
    //         params:{
    //             pay_sn,
    //         }
    //     })
    //     console.log(e);
    //     if (e.code === 0) {
    //         this.setState({
    //             payment_list: e.result.payment_list,
    //             pay_amount: e.result.pay_amount,
    //             order_id:e.result.order_info.id
    //         });
    //     } else {
    //         Toast.info(e.msg, 1);
    //     }
    // }
    componentDidMount(){
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
        const { isWXAppInstalled } = this.props
        const { 
            center, 
            // payment_list 
        } = this.state;
        const payment_list = [
            {type: "wechat",name: "微信支付"},
            {type: "alipay",name: "支付宝支付"},
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <NoticeBar
                    icon={
                        <AntDesignIcon
                            color="#FE7C04"
                            size={16}
                            name="exclamationcircleo"
                        />
                    }
                    style={{backgroundColor: '#FFF7E7'}}
                >
                    <Text style={{ color: "#FE7C04" }}>
                        请在 {center} 内完成支付
                    </Text>
                </NoticeBar>
                <View style={styles.totalView}>
                    <Text style={[PublicStyles.boldTitle, { fontSize: 14, marginBottom: 10 }]}>此次订单共需支付</Text>
                    <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>
                        ￥
                        <Text style={{fontSize: 25}}>108.00</Text>
                    </Text>
                </View>
                <List renderHeader={() => "选择支付方式" }>
                    {
                        payment_list.map((item,index)=>{
                            const disabled = item.type==='wechat'&&isWXAppInstalled===false
                            return(
                                <Item
                                    key={index}
                                    thumb={item.logo}
                                    arrow="horizontal"
                                    disabled={disabled}
                                    extra={disabled&&<Text style={{fontSize:14,color:'red'}}>不支持此支付方式</Text>}
                                    onClick={() => {
                                        if(!disabled){
                                            this.orderPay(item.type)
                                        }
                                    }}
                                >
                                    {item.name}
                                </Item>
                            )
                        })
                    }
                </List>
            </View>
        )
    }
    async wxPay(){
        const { dispatch, navigation } = this.props
        const { orderInfo } = navigation.state.params
        const { tokenData } = await sendWechatAuthRequest()
        const params = {
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'wechat',
            openid: tokenData.openid,
            payment_channel: 'wechat_app' // 支付渠道 "wechat"  "wechat_mini" "wechat_app"
        }
        dispatch(wechatPay({ params }))
    }
    alipay(e){
        Alipay.pay(e.data.ios)
        .then((AlipayData)=>{
			this.paySuccess()
        },(err)=> {
            Toast.warn('支付失败');
        })
    }
    paySuccess() {
        this.props.navigation.replace('PaySuccess')
    }
    // payFailure() {

    // }
}

const styles = StyleSheet.create({
    totalView: {
        backgroundColor: '#fff',
        paddingVertical: 24,
        alignItems: 'center',
    }
})
