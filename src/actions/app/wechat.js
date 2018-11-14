import types from '../../constants';
import Fetch from "../../utils/fetch";
import { fetchStatus, storageModule } from "moji-react-native-utils";
import { Toast } from "../../utils/publicFuncitonModule";
import * as WeChat from 'react-native-wechat';
import { userLogin, updateUserInfo } from '../../actions/user';
import { UserApi } from "../../config/api/user";

const AppID = "wx1a76ca32a2015cda";
const AppSecret = "047eae21f5bc3f7972bacb9b4a5ceaf5";
const debugSignature = "7b27e420d2289e0a845fb36cf7597fb0";
const releaseSignature = "c9b5ae6301d861909168b53c19db9498";

export const initWechat = ()=>{
    return async dispatch=>{
        const isRegistered = await WeChat.registerApp(AppID)
        const isInstalled = await WeChat.isWXAppInstalled()
        dispatch({
            type: types.wechat.IS_WX_APP_INSTALLED,
            data: isInstalled
        })
    }
}


export const sendWechatAuthRequest=async()=>{
    try {
        const e = await WeChat.sendAuthRequest('snsapi_userinfo','SECRET')
        try {
            return addAuth(e)
        } catch (err) {
            Toast.error(err)
            return new Promise((resolve, reject)=>{
                reject(err)
            })
        }
    } catch (e) {
        Toast.warn('授权失败')
        return new Promise((resolve, reject)=>{
            reject('授权失败')
        })
    }
}


// 'tokenData', {
// 	access_token: '15_3lW4u7VtB5NfnmfZv8bFlFUV-Mg7JDjEOSwDP1Yx7xHsRsAV6EHdv5r1GBjeUrWwr_6APXIPfPNAp71YCAr1X8RhLEFIUtb1bOqHexbVs7I',
// 	expires_in: 7200,
// 	refresh_token: '15_iYU3OKboXSGDa3C_EMsZVg66JYJGMgxBVBVi8QitusqwQYNDIYur5Ee2OkR3FvA1o5Q4JWmN0PyV8awQZ-cJKwiLBGCRpIeMkxs0hjnK4fk',
// 	openid: 'oy0Ue1N9xdbCCdSByzCNj8VjLBNM',
// 	scope: 'snsapi_userinfo',
// 	unionid: 'oUv1d1TqN7Yzwx8Cc-g6YrhhxCts' 
// }
// 'userData', { 
// 	openid: 'oy0Ue1N9xdbCCdSByzCNj8VjLBNM',
// 	nickname: '王小鱼',
// 	sex: 0,
// 	language: 'zh_CN',
// 	city: '',
// 	province: '',
// 	country: '',
// 	headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32 /UEdewS3j9rVstwdw0dkFTcTX3IyMIkQxb4XF4AjwCzxC80iaAX4wWVicJVHUcRwvVgtSngNU8qXraWfxWUibiaQ0xg/132',
// 	privilege: [],
// 	unionid: 'oUv1d1TqN7Yzwx8Cc-g6YrhhxCts' 
// }
export const wechatLogin = ({tokenData,userData, func})=>{
    return async dispatch=>{
        const e = await Fetch.fetch({
            api: UserApi.login,
            params: {
                login_type: 'wechat_openid',
                wechat_openid: userData.openid
                // platform : 'wechat',
                // openid : userData.openid,
                // avatar : userData.headimgurl,
                // nickname : userData.nickname,
                // sex : userData.sex,
                // unionid : userData.unionid,
                // city : userData.city,
                // province : userData.province,
                // access_token : tokenData.access_token,
                // expires_in : tokenData.expires_in,
                // refresh_token : tokenData.refresh_token,
                // scope : tokenData.scope,
            }
        })
        if(e){
            if(e.code===0){
                dispatch(userLogin({
                    userInfoData: e.data,
                    func
                }))
            }else {
                Toast.warn(e.msg)
            }
        }else{
            dispatch(wechatRegister({ tokenData, userData, func }))
        }
    }
}

export const wechatRegister = ({tokenData, userData, func})=>{
    return async dispatch=>{
        const e = await Fetch.fetch({
            api: UserApi.register,
            params: {
                register_type: 'wechat_openid',
                wechat_openid: userData.openid,
                wechat: userData
                // platform : 'wechat',
                // openid : userData.openid,
                // avatar : userData.headimgurl,
                // nickname : userData.nickname,
                // sex : userData.sex,
                // unionid : userData.unionid,
                // city : userData.city,
                // province : userData.province,
                // access_token : tokenData.access_token,
                // expires_in : tokenData.expires_in,
                // refresh_token : tokenData.refresh_token,
                // scope : tokenData.scope,
            }
        })
        if(e.code===0){
            dispatch(userLogin({
                userInfoData: e.data,
                func
            }))
        }else {
            Toast.warn(e.msg)
        }
    }
}

export const wechatShare = async ({ type, params }) => {
    let func
    switch (type) {
        case 'timeline':
            func = WeChat.shareToTimeline
            break;
        case 'session':
            func = WeChat.shareToSession
            break;
        case 'favorite':
            func = WeChat.shareToFavorite
            break;
        default:
            return Toast.warn('分享类型异常')
    }
    if (func) {
        const e = await func(params)
        if (parseInt(e.errCode) === 0) {
            Toast.info('分享成功');
        } else {
            Toast.warn('分享失败');
        }
    }
}


export const wechatBind=({tokenData,userData})=>{
    return async dispatch=>{
        const e = await Fetch.fetch({
            api: UserApi.bindWechat,
            params: {
                wechat_openid: userData.openid,
                wechat: userData
                // platform : 'wechat',
                // openid : userData.openid,
                // avatar : userData.headimgurl,
                // nickname : userData.nickname,
                // sex : userData.sex,
                // unionid : userData.unionid,
                // city : userData.city,
                // province : userData.province,
                // access_token : tokenData.access_token,
                // expires_in : tokenData.expires_in,
                // refresh_token : tokenData.refresh_token,
                // scope : tokenData.scope,
            }
        })
        if(e.errcode===0){
            Toast.info('绑定成功')
            dispatch(updateUserInfo())
        }else {
            Toast.warn(e.errmsg)
        }
    }
}



const addAuth = (e)=>{
    return new Promise(async(resolve, reject)=>{
        const {
            errCode,
            code,
        } = e
        if(errCode===0){
            const tokenParams = {
                appid:AppID,
                secret:AppSecret,
                code,
                grant_type:'authorization_code',
            }
            const tokenData = await Fetch.externalLinkFetch(`https://api.weixin.qq.com/sns/oauth2/access_token?${toQueryString(tokenParams)}`)
            if(tokenData.errcode!=40029){
                const openidParams = {
                    appid:AppID,
                    access_token:tokenData.access_token,
                    openid:tokenData.openid,
                    lang:'zh_CN',
                }
                const userData = await Fetch.externalLinkFetch(`https://api.weixin.qq.com/sns/userinfo?${toQueryString(openidParams)}`)
                return resolve({
                    tokenData,
                    userData,
                })
            }else{
                reject('获取用户access_token异常');
            }
        }else{
            reject('授权失败');
        }
    })
}



function toQueryString(obj) {
    return obj
        ? Object.keys(obj)
              .sort()
              .map(function(key) {
                  var val = obj[key];
                  if (Array.isArray(val)) {
                      return val
                          .sort()
                          .map(function(val2) {
                              return encodeURIComponent(key) +
                                  "[]=" +
                                  encodeURIComponent(val2);
                          })
                          .join("&");
                  }
                  if (val) {
                      return encodeURIComponent(key) +
                          "=" +
                          encodeURIComponent(val);
                  } else {
                      return encodeURIComponent(key) + "=";
                  }
              })
              .join("&")
        : "";
}
