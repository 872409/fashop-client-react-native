import user from "../services/user";
import storage from "../services/storage";
import NavigationService from "../containers/navigationService";
import { Toast } from "antd-mobile-rn";

export default {
    namespace: "user",
    state: {
        login: false,
        userToken: null,
        register: {},
        logout: {},
        token: {},
        editPassword: {},
        verifyCode: {},
        self: { profile: {} },
        editPasswordByFind: {},
        editProfile: {},
        bindPhone: {},
        bindWechat: {},
        unbindWechat: {},
        unbindPhone: {},
        evaluatedList: {},
    },

    effects: {
        * initUserinfoStorage({ payload, callback }, { call, put }) {
            let userInfoCache = yield call(storage.getUserInfo)
            let userTokenCache = yield call(storage.get, { key: 'user_token' })
            // console.log('userInfoCache',userInfoCache);
            // console.log('userTokenCache',userTokenCache);
            
            if (userInfoCache || userTokenCache) {
                const userInfo = JSON.parse(userInfoCache)
                const userToken = JSON.parse(userTokenCache)

                yield put({
                    type: "_login",
                    payload: true
                });
                yield put({
                    type: "_userToken",
                    payload: userToken
                });
                yield put({
                    type: "_self",
                    payload: userInfo
                });
                yield put({ type: 'order/stateNum' })
                yield put({ type: 'cart/totalNum' })

            } else {
                //没有用户信息缓存
                //未来邀请注册什么的放在这里写逻辑
            }
        },
        * login({ payload, callback }, { call, put }) {
            try{
                const response = yield call(user.login, payload);
                yield put({
                    type: 'userLoginSuccessAfter',
                    user_token: response.result
                })
                if (callback) callback(response);
            }catch(err){
                Toast.fail('登录失败')
            }
        },
        * wechatLogin({ tokenData, userData }, { call, put }) {
            try {
                const payload = {
                    login_type: 'wechat_app',
                    wechat_openid: userData.openid
                }
                const response = yield call(user.login, payload)
                
                if (response.code === 10014) {
                    yield put({
                        type: 'wechatRegister',
                        payload: { tokenData, userData }
                    })
                } else {
                    if (response.code === 0) {
                        yield put({
                            type: 'userLoginSuccessAfter',
                            user_token: response.result
                        })
                    } else {
                        Toast.warn(response.msg)
                    }
                }
            } catch (err) {
                Toast.fail('登录失败')
            }
        },
        * wechatRegister({ tokenData, userData }, { call, put }) {
            try {
                const payload = {
                    register_type: 'wechat_app',
                    wechat_openid: userData.openid,
                    wechat: userData
                }
                const response = yield call(user.register, payload)
                if (response.code === 0) {
                    yield put({
                        type: 'wechatLogin',
                        payload: { tokenData, userData }
                    })
                } else {
                    Toast.warn(response.msg)
                }
            } catch (err) {
                Toast.fail('登录失败')
            }
        },
        * userLoginSuccessAfter({ user_token }, { call, put }) {
            try{
                yield put({
                    type: "_login",
                    payload: true
                });
                yield put({
                    type: "_userToken",
                    payload: user_token
                });
                yield call(storage.set, { key: 'user_token', value: user_token })
                yield put({ type: 'self' })
                yield put({ type: 'order/stateNum' })
                yield put({ type: 'cart/totalNum' })
                NavigationService.goBack()
            }catch(err){
                Toast.fail('登录失败')
            }
        },
        * register({ payload: { username, password }, callback }, { call, put }) {
            try {
                const response = yield call(user.register, payload)
                if (response.code === 0) {
                    const params = {
                        username,
                        password,
                        login_type: "password"
                    }
                    yield put({
                        type: 'login',
                        payload: params
                    })
                } else {
                    Toast.warn(response.msg)
                }
            } catch (err) {
                Toast.fail('操作失败')
            }
        },
        * logout({ payload, callback }, { call, put }) {
            const response = yield call(user.logout, payload);
            yield put ({
                type: 'userLogoutSuccessAfter',
                response
            })
            if (callback) callback(response);
        },
        * userLogoutSuccessAfter({ response }, { call, put }) {
            yield call(storage.removeUserInfo)
            yield call(storage.remove, { key: 'user_token' })
            yield put({
                type: "_login",
                payload: false
            });
            yield put({
                type: "_userToken",
                payload: {}
            });
            yield put({
                type: "_logout",
                payload: response
            });
            yield put({
                type: 'order/_stateNum',
                payload: {
                    result: {
                        state_new: 0,
                        state_send: 0,
                        state_success: 0,
                        state_close: 0,
                        state_unevaluate: 0,
                        state_refund: 0,
                    }
                }
            })
            yield put({
                type: 'cart/_totalNum',
                payload: {
                    result: { total_num: 0 }
                }
            })
            NavigationService.goBack()
        },
        * token({ payload, callback }, { call, put }) {
            const response = yield call(user.token, payload);
            yield put({
                type: "_token",
                payload: response
            });
            if (callback) callback(response);
        },
        * editPassword({ payload, callback }, { call, put }) {
            const response = yield call(user.editPassword, payload);
            yield put({
                type: "_editPassword",
                payload: response
            });
            if (callback) callback(response);
        },
        * verifyCode({ payload, callback }, { call, put }) {
            const response = yield call(user.verifyCode, payload);
            yield put({
                type: "_verifyCode",
                payload: response
            });
            if (callback) callback(response);
        },
        * self({ payload, callback }, { call, put }) {
            const response = yield call(user.self, payload);
            yield call(storage.setUserInfo,{ value: response.result.info })
            yield put({
                type: "_self",
                payload: response.result.info
            });
            if (callback) callback(response.result.info);
        },
        * editPasswordByFind({ payload, callback }, { call, put }) {
            const response = yield call(user.editPasswordByFind, payload);
            yield put({
                type: "_editPasswordByFind",
                payload: response
            });
            if (callback) callback(response);
        },
        * editProfile({ payload, callback }, { call, put }) {
            const response = yield call(user.editProfile, payload);
            yield put({
                type: "_editProfile",
                payload: response
            });
            yield put({
                type: 'self',
                callback: ()=>{
                    NavigationService.goBack()
                    Toast.success('修改成功')
                }
            })
            if (callback) callback(response);
        },
        * bindPhone({ payload, callback }, { call, put }) {
            const response = yield call(user.bindPhone, payload);
            yield put({
                type: "_bindPhone",
                payload: response
            });
            yield put({
                type: 'self'
            })
            NavigationService.goBack()
            if (callback) callback(response);
        },
        * bindWechat({ userData }, { call, put }) {
            const response = yield call(user.bindWechat, {
                wechat_openid: userData.openid,
                wechat: userData
            });
            yield put({
                type: "_bindWechat",
                payload: response
            });
            Toast.info('绑定成功')
            yield put({
                type: 'self'
            })
            if (callback) callback(response);
        },
        * unbindWechat({ payload, callback }, { call, put }) {
            const response = yield call(user.unbindWechat, payload);
            yield put({
                type: "_unbindWechat",
                payload: response
            });
            Toast.info('解除关联成功')
            yield put({ type: 'self' })
            if (callback) callback(response);
        },
        * unbindPhone({ payload, callback }, { call, put }) {
            const response = yield call(user.unbindPhone, payload);
            yield put({
                type: "_unbindPhone",
                payload: response
            });
            Toast.info('解除关联成功')
            yield put({ type: 'self' })
            if (callback) callback(response);
        },
        * evaluatedList({ payload, callback }, { call, put }) {
            const response = yield call(user.evaluatedList, payload);
            yield put({
                type: "_evaluatedList",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _login(state, action) {
            return {
                ...state,
                login: action.payload
            };
        },
        _userToken(state, action) {
            return {
                ...state,
                userToken: action.payload
            };
        },
        _register(state, action) {
            return {
                ...state,
                register: action.payload
            };
        },
        _logout(state, action) {
            return {
                ...state,
                logout: action.payload
            };
        },
        _token(state, action) {
            return {
                ...state,
                token: action.payload
            };
        },
        _editPassword(state, action) {
            return {
                ...state,
                editPassword: action.payload
            };
        },
        _verifyCode(state, action) {
            return {
                ...state,
                verifyCode: action.payload
            };
        },
        _self(state, action) {
            return {
                ...state,
                self: action.payload
            };
        },
        _editPasswordByFind(state, action) {
            return {
                ...state,
                editPasswordByFind: action.payload
            };
        },
        _editProfile(state, action) {
            return {
                ...state,
                editProfile: action.payload
            };
        },
        _bindPhone(state, action) {
            return {
                ...state,
                bindPhone: action.payload
            };
        },
        _bindWechat(state, action) {
            return {
                ...state,
                bindWechat: action.payload
            };
        },
        _unbindWechat(state, action) {
            return {
                ...state,
                unbindWechat: action.payload
            };
        },
        _unbindPhone(state, action) {
            return {
                ...state,
                unbindPhone: action.payload
            };
        },
        _evaluatedList(state, action) {
            return {
                ...state,
                evaluatedList: action.payload
            };
        },
    }
};
