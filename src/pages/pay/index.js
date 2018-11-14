import React, { Component } from 'react';
import {connect} from 'react-redux';
import{
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    TouchableOpacity,
    Alert,
    InteractionManager,
} from 'react-native';
import Fetch from '../../utils/fetch';
import { NavigationActions } from "react-navigation";
import { Toast } from "../../utils/publicFuncitonModule";
import {
    PublicStyles,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/publicStyleModule'
import { List, NoticeBar } from "antd-mobile-rn";
// import Alipay from 'react-native-yunpeng-alipay';
import * as WeChat from 'react-native-wechat';
import { BuyApi } from '../../config/api/buy'

const Item = List.Item;

@connect(({
    app:{wechat:{isWXAppInstalled}},
    navigation,
})=>({
    isWXAppInstalled,
    nav:navigation,
}))
export default class Pay extends Component{
    state = {
        payment_list:[],
        pay_amount:0,
        order_id:''
    }
    async componentDidMount(){
        const { navigation } = this.props
        const { pay_sn } = navigation.state.params
        const e = await Fetch.fetch({
            api: BuyApi.info,
            params:{
                pay_sn,
            }
        })
        console.log(e);
        if (e.code === 0) {
            this.setState({
                payment_list: e.result.payment_list,
                pay_amount: e.result.pay_amount,
                order_id:e.result.order_info.id
            });
        } else {
            Toast.info(e.msg, 1);
        }
    }
    render() {
        const {
            navigation,
            isWXAppInstalled,
            nav
        } = this.props
        const { payment_list } = this.state
        // console.log('pay',nav);
        return (
            <View style={[PublicStyles.ViewMax]}>
                {/* <NoticeBar
                    mode="closable"
                >
                    订单超过15分钟未支付，将会被取消！！！
                </NoticeBar> */}
                <List>
                    {
                        payment_list.map((item,index)=>{
                            const disabled = item.code==='wxpayapp'&&isWXAppInstalled===false
                            return(
                                <Item
                                    key={index}
                                    thumb={item.logo}
                                    arrow="horizontal"
                                    onClick={() => {
                                        // if(!disabled){
                                        //     this.orderPay(item.code)
                                        // }
                                    }}
                                    disabled={disabled}
                                    extra={disabled&&<Text style={{fontSize:14,color:'red'}}>不支持此支付方式</Text>}
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
    async orderPay(payment_code) {
        const { navigation } = this.props
        const { pay_sn } = navigation.state.params;
        // return this.paySuccess()
        const params = {
            order_type: 'house_reserve',
            pay_sn,
            payment_code,
        }
        const e = await Fetch.fetch({
            apiName:"PAYMENTTOPAY",
            params
        })
        if (e.errcode === 0) {
            switch (payment_code) {
                case 'alipay':
                    this.alipay(e)
                    break;
                case 'wxpayapp':
                    this.wxpay(e)
                    break;
                default:
                    Toast.warn('选择的方式用户端暂未支持')
            }
        } else {
            Toast.info(e.errmsg,1)
        }
    }
    alipay(e){
        // Alipay.pay(e.data.ios).then((AlipayData)=>{
		// 	this.paySuccess()
        // },(err)=> {
        //     Toast.warn('支付失败');
        // });
    }
    async wxpay(e){
        const {app_response} = e.data
        const payOptions = {
            partnerId: `${app_response.partnerid}`,
            prepayId: `${app_response.prepayid}`,
            nonceStr: `${app_response.noncestr}`,
            timeStamp: `${app_response.timestamp}`,
            package: `${app_response.packagestr}`,
            sign: `${app_response.sign}`
        };
        try {
            const a = await WeChat.pay(payOptions)
            this.paySuccess()
        } catch (e) {
            Toast.warn('支付失败');
        }
    }
    paySuccess() {
        const {
            nav,
            navigation,
        } = this.props
        const { order_id } = this.state;
        Toast.info('支付成功')
        navigation.goBack(nav.routes[1].key)
        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('OrderDetail', {
                id: order_id
            })
        })
    }
    payFailure() {

    }
}

const styles = StyleSheet.create({

})
