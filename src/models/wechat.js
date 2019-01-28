import wechat from "../services/wechat";

export default {
    namespace: "wechat",
    state: {
        buildConfig: {},
        code: {},
        userinfo: {},
    },

    effects: {
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
