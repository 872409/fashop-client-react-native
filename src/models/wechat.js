import wechat from "../services/wechat";
import * as WeChat from "react-native-wechat";
import { AppID } from "../config/wechat";

export default {
    namespace: "wechat",
    state: {
        buildConfig: {},
        code: {},
        userinfo: {},
        isWXAppInstalled: false
    },

    effects: {
        * isWXAppInstalled({ payload, callback }, { call, put }) {
            const registered = yield call(WeChat.registerApp, AppID)
            const response = yield call(WeChat.isWXAppInstalled)
            yield put({
                type: "_isWXAppInstalled",
                payload: response
            });
            if (callback) callback(response);
        },
        * buildConfig({ payload, callback }, { call, put }) {
            const response = yield call(wechat.infobuildConfigpayload);
            yield put({
                type: "_buildConfig",
                payload: response
            });
            if (callback) callback(response);
        },
        * code({ payload, callback }, { call, put }) {
            const response = yield call(wechat.code, payload);
            yield put({
                type: "_code",
                payload: response
            });
            if (callback) callback(response);
        },
        * userinfo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userinfo, payload);
            yield put({
                type: "_userinfo",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _isWXAppInstalled(state, action) {
            return {
                ...state,
                isWXAppInstalled: action.payload
            };
        },
        _buildConfig(state, action) {
            return {
                ...state,
                buildConfig: action.payload
            };
        },
        _code(state, action) {
            return {
                ...state,
                code: action.payload
            };
        },
        _userinfo(state, action) {
            return {
                ...state,
                userinfo: action.payload
            };
        },
    }
};
