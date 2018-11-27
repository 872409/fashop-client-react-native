import types from '../../constants';
import { store } from "../../utils";
import Fetch from "../../utils/fetch";
import { storageModule } from "moji-react-native-utils";
import { Toast } from "../../utils/function";
import { UserApi } from "../../config/api/user";
import { OrderApi } from '../../config/api/order';
import { CartApi } from '../../config/api/cart';
import NavigationService from "../../containers/navigationService";

/**
 * 登陆方法
 **/
export const userLogin = ({ user_token } = {}) => {
    return async dispatch => {
        //登陆后需要处理的方法
        userLoginOutFunc({ dispatch, user_token });

    }
}


/**
 * 退出登陆方法
 **/
export const userSignOut = ({ func, exception } = {}) => {
    return async dispatch => {
        //设置退出登陆状态
        dispatch(setUserStatus(false, null))
        //退出登陆后需要处理的方法
        userSignOutFunc({ dispatch })
        func && func()
    }
}


/**
 * 初始化检查用户登陆
 **/
export const initUserInfoStorage = () => {
    return async dispatch => {
        // userSignOutFunc({dispatch})
        //获取本地缓存用户信息数据
        const userInfoData = await storageModule.getUserInfo()
        const user_token_data = await storageModule.get("user_token");

        if (userInfoData) {
            const userInfo = JSON.parse(userInfoData)
            const user_token = JSON.parse(user_token_data)
            console.log('userInfo',userInfo);
            console.log('user_token',user_token);
            await dispatch(setUserStatus(true, userInfo))

            userLoginOutFunc({ user_token, dispatch })

        } else {
            //没有用户信息缓存
            //未来邀请注册什么的放在这里写逻辑
        }

        dispatch({
            type: types.app.INIT_USERINFO_STORAGE,
            data: true
        })
    }
}


/**
 * 更新用户信息
 **/
export const updateUserInfo = () => {
    return dispatch => {
        dispatch({
            type: types.user.UPDATE_USER_INFO_LOADING,
            refreshing: true,
        })
        Fetch.fetch({
            api: UserApi.self
        })
        .then((e) => {
            if (e.code === 0) {
                dispatch(updateUserInfoFunc(e.result.info))
            } else {
                Toast.warn("获取用户最新数据异常");
                dispatch({
                    type: types.user.UPDATE_USER_INFO_LOADING,
                    refreshing: false,
                })
            }
        })
    }
}


/**
 * 修改用户信息
 **/
export const modifyUserInfo = ({params, func = () => {} }) => {
    return dispatch => {
        Fetch.fetch({
            api: UserApi.editProfile,
            params
        })
        .then((e) => {
            if (e.code === 0) {
                Toast.info('保存成功')
                dispatch(updateUserInfoFunc(e.data))
                func && func()
            } else {
                Toast.error(e.errmsg)
            }
        })
    }
}


/**
 * 被动修改用户信息
 **/
export const passiveModifyUserInfo = ({ data, callback }) => {
    return dispatch => {
        dispatch(updateUserInfoFunc(data))
        callback && callback()
    }
}


//登陆后需要处理的方法
const userLoginOutFunc = ({ dispatch, user_token }) => {
    storageModule.set("user_token", JSON.stringify(user_token)).then( ()=>{
        dispatch(updateUserInfo())
        dispatch(getOrderStateNum())
        dispatch(getCartTotalNum())
        NavigationService.goBack()
    })

    // JPushModule.SetAlias({
    //     userInfo
    // })
}


//退出登陆后需要处理的方法
const userSignOutFunc = ({ dispatch }) => {
    storageModule.removeUserInfo()
    // const resetAction = NavigationActions.back()
    // dispatch(resetAction)
    // JPushModule.RemoveListener()
}


// 设置用户状态
const setUserStatus = (login, userInfo) => {
    return dispatch => {
        return new Promise(resolve => {
            dispatch({
                type: types.user.USER_STATUS_CHANGE,
                login,
                userInfo
            })
            resolve()
        })
    }
}


// 更新用户信息方法
export const updateUserInfoFunc = (e) => {
    storageModule.setUserInfo(e)
    storageModule.set('user_token', JSON.stringify({
        access_token: e.access_token,
        expires_in: e.expires_in,
    }))
    return {
        type: types.user.UPDATE_USER_INFO,
        userInfo: e,
        refreshing: false,
    }
}


// 更新订单状态数量
export const getOrderStateNum = ()=>{
    return dispatch => {
        Fetch.fetch({
            api: OrderApi.stateNum
        })
        .then((e)=>{
            if(e.code===0){
                dispatch({
                    type: types.user.GET_ORDER_STATE_NUM,
                    orderNum: e.result
                })
            }else {
                Toast.warn(e.msg)
            }
        })
    }
}


// 更新订单状态数量
export const getCartTotalNum = ()=>{
    return dispatch => {
        Fetch.fetch({
            api: CartApi.totalNum
        })
        .then((e)=>{
            if(e.code===0){
                dispatch({
                    type: types.user.GET_CART_TOTAL_NUM,
                    cartNum: e.result.total_num
                })
            }else {
                // Toast.warn(e.msg)
            }
        })
    }
}



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
