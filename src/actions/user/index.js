import types from '../../constants';
import { Fetch } from "../../utils";
import { fetchStatus, storageModule } from "moji-react-native-utils";
// import { NavigationActions } from "react-navigation";
import { Toast } from "../../utils/publicFuncitonModule";
import store from "../../store";
import { UserApi } from "../../config/api/user";
// import { initializeSDKWithOptions, logOut } from "ws-im-react-native";
// import JPushModule from "../../utils/JPushModule";
// import {getPushSetting} from '../push'
// import {getUserOrderWebSocket,closeUserOrderWebSocket} from "../../utils/userOrderWebSocket";


/**
 * 登陆方法
**/
export const userLogin = ({userInfoData,func}={})=>{
    return async dispatch => {
        //整理用户信息
        const userInfo = manageUserInfo(userInfoData)

        //设置登陆状态
        await dispatch(setUserStatus(true,userInfo))

        func && func()

        //登陆后需要处理的方法
        userLoginOutFunc({dispatch,userInfo})

    }
}




/**
 * 退出登陆方法
**/
export const userSignOut = ({func,exception}={})=>{
    return async dispatch => {
        if(!exception){
            const e = await Fetch.fetch({
                api: UserApi.logout
            })
            if(e.code===0){
                // Toast.info('退出成功');
            }else{
                Toast.warn(e.errmsg)
            }
        }

        // logOut()
        // .then((e) => {
        //     console.log(e);
        // })

        //设置退出登陆状态
        dispatch(setUserStatus(false,null))

        //退出登陆后需要处理的方法
        userSignOutFunc({dispatch})

        func && func()
    }
}




/**
 * 初始化检查用户登陆
**/
export const initUserInfoStorage = (userInfoData)=>{
    return async dispatch => {
        // userSignOutFunc({dispatch})
        //获取本地缓存用户信息数据
        const userInfoData = await storageModule.getUserInfo()

        if(userInfoData){
            const userInfo = JSON.parse(userInfoData)

            await dispatch(setUserStatus(true,userInfo))

            userLoginOutFunc({userInfo,dispatch})

            dispatch(updateUserInfo())
        }else {
            //没有用户信息缓存
            //未来邀请注册什么的放在这里写逻辑
        }

        dispatch({
            type : types.app.INIT_USERINFO_STORAGE,
            data : true
        })
    }
}




/**
 * 更新用户信息
**/
export const updateUserInfo = ({callback}={})=>{
    return dispatch => {
        dispatch({
            type : types.user.UPDATE_USER_INFO_LOADING,
            refreshing : true,
        })

        Fetch.fetch({
            api: UserApi.self
        })
        .then((e) => {
            if (e.code === 0) {
                dispatch(updateUserInfoFunc(e.result.info))
                callback&&callback()
            } else {
                Toast.warn("获取用户最新数据异常");
                dispatch({
                    type : types.user.UPDATE_USER_INFO_LOADING,
                    refreshing : false,
                })
            }
        })
    }
}




/**
 * 修改用户信息
**/
export const modifyUserInfo = ({params,func=()=>{}})=>{
    return dispatch => {
        Fetch.fetch({
            api: UserApi.editProfile,
            params
        })
        .then((e)=>{
            if(e.code===0){
                Toast.info('保存成功')
                dispatch(updateUserInfoFunc(e.data))
                func&&func()
            }else{
                Toast.error(e.errmsg)
            }
        })
    }
}




/**
 * 被动修改用户信息
**/
export const passiveModifyUserInfo = ({data,callback})=>{
    return dispatch => {
        dispatch(updateUserInfoFunc(data))
        callback&&callback()
    }
}






/**
 * 微信登陆
**/
export const wechatLogin = ({code}) => {
    return dispatch => {
        Fetch.fetch("USERWECHATOAUTH", { code })
        .then(e => {
            if (e.code === 0) {
                dispatch(userLogin({
                    userInfoData : e.data,
                    func : ()=>{
                        dispatch(replace('/index/user'))
                    }
                }))
            } else {
                Message.fail(e.errmsg)
            }
        })
    }
}





//登陆后需要处理的方法
const userLoginOutFunc = async({dispatch,userInfo})=>{
    storageModule.setUserInfo(userInfo)
    storageModule.set('userHistory',JSON.stringify({
        user_id:userInfo.user_id,
        phone:userInfo.phone,
        avatar:userInfo.avatar,
    }))
    // dispatch(getUserPointsSigninfo())
    // const {
    //     index,
    //     routes
    // } = store.getState().navigation
    // const goBackAction = (()=>{
    //     if(routes[index].routeName==='UserRegistered'){
    //         return NavigationActions.back({key:routes[1].key})
    //     }else {
    //         return NavigationActions.back()
    //     }
    // })()
    // dispatch(goBackAction)
    // const imData = await Fetch.fetch({
    //     apiName: 'IMTOKEN'
    // })
    // if (imData.errcode === 0) {
    //     initializeSDKWithOptions({
    //         access_token: imData.data.access_token,
    //         getNavigation: () => {
    //             return store.getState().navigation
    //         },
    //         getStore: () => {
    //             return store
    //         },
    //         unreadMessageNumberChange: (e) => {
    //             let number = 0
    //             Object.keys(e).forEach(key => {
    //                 number += e[key]
    //             })
    //             // const {
    //             //     unreadMessageNumber
    //             // } = store.getState().app.user
    //             // if (unreadMessageNumber !== number) {
    //             //     dispatch(setUnreadMessageNumber(number))
    //             // }
    //         },
    //     })
    // } else {
    //     Toast.warn(imData.errmsg)
    // }

    // JPushModule.SetAlias({
    //     userInfo
    // })
}




//退出登陆后需要处理的方法
const userSignOutFunc = ({dispatch})=>{
    storageModule.removeUserInfo()
    // const resetAction = NavigationActions.back()
    // dispatch(resetAction)
    // JPushModule.RemoveListener()
}




//管理用户数据
const manageUserInfo = (e)=> {
    // console.log('manageUserInfo',e);
    // { id: 563,
    //     username: 'wechat_mini_oX3Qk0RaO1SPqT-KQNKx6rjdts_I_d1e99fc9',
    //     phone: null,
    //     email: null,
    //     state: 1,
    //     salt: '56ea1c760da8314aab01504529eda896',
    //     is_discard: 0,
    //     create_time: 1534994779,
    //     delete_time: null,
    //     profile: 
    //      { id: 2,
    //        user_id: 563,
    //        name: null,
    //        nickname: '韩文博😊',
    //        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep7piaSYcwom3S1gouQ2nMxpXm2WwJuEA15qEXtkibRBXm7bc9BEuWuABP53ibrMWkJImTTIynzGfjTQ/132',
    //        sex: 1,
    //        birthday: 0,
    //        qq: null,
    //        delete_time: null },
    //     assets: 
    //      { id: 2,
    //        user_id: 563,
    //        points: 0,
    //        balance: '0.00',
    //        delete_time: null } }
    return {
        ...e
    }
}



// 设置用户状态
const setUserStatus = (login,userInfo)=>{
    return dispatch => {
        return new Promise(resolve=>{
            dispatch({
                type : types.user.USER_STATUS_CHANGE,
                login : login,
                userInfo : userInfo
            })
            resolve()
        })
    }
}





// 更新用户信息方法
export const updateUserInfoFunc = (e)=>{
    const userInfo = manageUserInfo(e)
    storageModule.setUserInfo(userInfo)
    storageModule.set('userHistory',JSON.stringify({
        user_id:userInfo.user_id,
        phone:userInfo.phone,
        avatar:userInfo.avatar,
    }))
    return {
        type : types.user.UPDATE_USER_INFO,
        userInfo : userInfo,
        refreshing : false,
    }
}



// 更新个人中心混合的各种状态数量
// export const getUserMixedStateNum = ()=>{
//     return dispatch => {
//         Fetch.fetch({apiName:'USERMIXEDSTATENUM'})
//         .then((e)=>{
//             if(e.code===0){
//                 const {data} = e
//                 dispatch({
//                     type : types.user.GET_USER_MIXEDSTATENUM_DATA,
//                     couponNum : data.voucher,
//                     orderNum : {
//                         order_nopay : data.order_nopay,
//                         order_nosend : data.order_nosend,
//                         order_noreceiving : data.order_noreceiving,
//                         order_noeval : data.order_noeval,
//                         order_refund : data.order_refund,
//                     }
//                 })
//             }else {
//                 Message.offline(e.errmsg)
//             }
//         })
//     }
// }



// 查询用户是否签到和是否领取可领积分
// export const getUserPointsSigninfo = ()=>{
//     return dispatch => {
//         Fetch.fetch({ apiName:'USERPOINTSSIGNINFO' })
//         .then((e)=>{
//             if(e.code===0){
//                 dispatch({
//                     type: types.user.GET_USER_POINTS_SIGNINFO,
//                     pointsSigninfo : e.data,
//                 })
//             }else {
//                 Message.offline(e.errmsg)
//             }
//         })
//     }
// }


// 更新全部未读消息
// export const getUnreadAllCount = ()=>{
//     return dispatch => {
//         Fetch.fetch({apiName:'MESSAGEUNREADALLCOUNT'})
//         .then((e)=>{
//             if(e.code===0){
//                 dispatch({
//                     type : types.user.GET_UNREAD_ALL_COUNT,
//                     data : e.data.unread_count,
//                 })
//             }else {
//                 Message.offline(e.errmsg)
//             }
//         })
//     }
// }


//获得用户卡片列表
// export const getUserCardList = () =>{
//     return async dispatch => {
//         const e = await Fetch.fetch({
//             apiName: 'MANAGECARDLIST'
//         })
//         if(e.code===0){
//             dispatch({
//                 cardList: e.list,
//                 type : types.user.GET_USER_CARD_LIST,
//             })
//         }else {
//             Toast.warn(e.errmsg)
//         }
//     }
// }


//设置未读消息数量
// export const setUnreadMessageNumber = (e) =>{
//     return dispatch => {
//         dispatch({
//             number: e,
//             type : types.user.SET_UNREAD_MESSAGE_NUMBER,
//         })
//     }
// }
