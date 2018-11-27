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
        userLoginSuccessAfter({ dispatch, user_token });
    }
}


/**
 * 退出登陆方法
 **/
export const userLogout = ({ func } = {}) => {
    return async dispatch => {
        //设置退出登陆状态
        dispatch(setUserStatus(false, null))
        //退出登陆后需要处理的方法
        userLogoutAfter({ dispatch })
        func && func()
    }
}


/**
 * 初始化检查用户登陆
 **/
export const initUserInfoStorage = () => {
    return async dispatch => {
        //获取本地缓存用户信息数据
        const userInfoCache = await storageModule.getUserInfo()
        const userTokenCache = await storageModule.get("user_token");
        if (userInfoCache || userTokenCache) {
            const userInfo = JSON.parse(userInfoCache)
            const userToken = JSON.parse(userTokenCache)

            await dispatch(setUserStatus(true, userInfo))
            await dispatch(setUserToken(userToken))

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
export const modifyUserInfo = ({
                                   params, func = () => {
    }
                               }) => {
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
const userLoginSuccessAfter = ({ dispatch, user_token }) => {
    storageModule.set("user_token", JSON.stringify(user_token))
        .then(() => {
            dispatch(updateUserInfo())
            dispatch(getOrderStateNum())
            dispatch(getCartTotalNum())
            NavigationService.goBack()
        })
}


//退出登陆后需要处理的方法
const userLogoutAfter = () => {
    storageModule.removeUserInfo()
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

// 设置用户状态
const setUserToken = (userToken) => {
    return dispatch => {
        return new Promise(resolve => {
            dispatch({
                type: types.user.USER_TOKEN_CHANGE,
                userToken
            })
            resolve()
        })
    }
}


// 更新用户信息方法
export const updateUserInfoFunc = (e) => {
    storageModule.setUserInfo(e)
    return {
        type: types.user.UPDATE_USER_INFO,
        userInfo: e,
        refreshing: false,
    }
}


// 更新订单状态数量
export const getOrderStateNum = () => {
    return dispatch => {
        Fetch.fetch({
            api: OrderApi.stateNum
        })
            .then((e) => {
                if (e.code === 0) {
                    dispatch({
                        type: types.user.GET_ORDER_STATE_NUM,
                        orderNum: e.result
                    })
                } else {
                    Toast.warn(e.msg)
                }
            })
    }
}


// 更新订单状态数量
export const getCartTotalNum = () => {
    return dispatch => {
        Fetch.fetch({
            api: CartApi.totalNum
        })
            .then((e) => {
                if (e.code === 0) {
                    dispatch({
                        type: types.user.GET_CART_TOTAL_NUM,
                        cartNum: e.result.total_num
                    })
                }
            })
    }
}
