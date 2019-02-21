import Fetch from "./fetch";
import { Toast } from "./function";
import * as WeChat from 'react-native-wechat';
import { AppID, AppSecret } from "../config/wechat"

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

// launchMini(params)
// params { Object } 打开小程序的参数
// userName: gh_0a1a182155f9 { String } // 小程序的原始ID，不是APPID
// miniProgramType: 1 { Integer } 拉起小程序的类型. 0-正式版 1-开发版 2-体验版
// path: "/pages/goods/detail/index?id=20" { String } 拉起小程序页面的可带参路径，不填默认拉起小程序首页

const addAuth = (e)=>{
    return new Promise(async(resolve, reject)=>{
        const {
            errCode,
            code,
        } = e
        if(errCode===0){
            const tokenParams = {
                appid: AppID,
                secret: AppSecret,
                code,
                grant_type:'authorization_code',
            }
            const tokenData = await Fetch.externalLinkFetch(`https://api.weixin.qq.com/sns/oauth2/access_token?${toQueryString(tokenParams)}`)
            if(tokenData.errcode!==40029){
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
