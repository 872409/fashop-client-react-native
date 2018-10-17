import types from '../../constants/ActionTypes';
import { Toast } from "../../utils/PublicFuncitonModule";
import { storageModule, Fetch, fetchStatus} from '../../utils';
// import * as WeChat from 'react-native-wechat';
import { userLogin, updateUserInfo } from '../../actions/user';

const AppID = 'wx343bc89a6af7ac15'
const AppSecret = 'eca42b0a761c7f08587f502d17c2c7b8'
const debugSignature = '7b27e420d2289e0a845fb36cf7597fb0'
const releaseSignature = 'c9b5ae6301d861909168b53c19db9498'

export const initWechat = ()=>{
    return async dispatch=>{
        // const isRegistered = await WeChat.registerApp(AppID)
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


export const wechatLogin=({tokenData,userData})=>{
    return async dispatch=>{
        const e = await Fetch.fetch({
            apiName: 'USEROPENLOGIN',
            params: {
                platform : 'wechat',
                openid : userData.openid,
                avatar : userData.headimgurl,
                nickname : userData.nickname,
                sex : userData.sex,
                unionid : userData.unionid,
                city : userData.city,
                province : userData.province,
                access_token : tokenData.access_token,
                expires_in : tokenData.expires_in,
                refresh_token : tokenData.refresh_token,
                scope : tokenData.scope,
            }
        })
        if(e.errcode===0){
            dispatch(userLogin({userInfoData:e.data}))
        }else {
            Toast.warn(e.errmsg)
        }
    }
}


export const wechatBind=({tokenData,userData})=>{
    return async dispatch=>{
        const e = await Fetch.fetch({
            apiName: 'USERACCOUNTBINDOPENUSER',
            params: {
                platform : 'wechat',
                openid : userData.openid,
                avatar : userData.headimgurl,
                nickname : userData.nickname,
                sex : userData.sex,
                unionid : userData.unionid,
                city : userData.city,
                province : userData.province,
                access_token : tokenData.access_token,
                expires_in : tokenData.expires_in,
                refresh_token : tokenData.refresh_token,
                scope : tokenData.scope,
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
        // console.log(e);
        if (parseInt(e.errCode) === 0) {
            Toast.info('分享成功');
        } else {
            Toast.warn('分享失败');
        }
    }

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
