import user from "../services/user";

export default {
    namespace: "user",
    state: {
        login: {},
        register: {},
        logout: {},
        token: {},
        editPassword: {},
        verifyCode: {},
        self: {},
        editPasswordByFind: {},
        editProfile: {},
        bindPhone: {},
        bindWechat: {},
        unbindWechat: {},
        unbindPhone: {},
        evaluatedList: {},
    },

    effects: {
        * login({ payload, callback }, { call, put }) {
            const response = yield call(user.login, payload);
            yield put({
                type: "_login",
                payload: response
            });
            if (callback) callback(response);
        },
        * register({ payload, callback }, { call, put }) {
            const response = yield call(user.register, payload);
            yield put({
                type: "_register",
                payload: response
            });
            if (callback) callback(response);
        },
        * logout({ payload, callback }, { call, put }) {
            const response = yield call(user.logout, payload);
            yield put({
                type: "_logout",
                payload: response
            });
            if (callback) callback(response);
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
            yield put({
                type: "_self",
                payload: response
            });
            if (callback) callback(response);
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
            if (callback) callback(response);
        },
        * bindPhone({ payload, callback }, { call, put }) {
            const response = yield call(user.bindPhone, payload);
            yield put({
                type: "_bindPhone",
                payload: response
            });
            if (callback) callback(response);
        },
        * bindWechat({ payload, callback }, { call, put }) {
            const response = yield call(user.bindWechat, payload);
            yield put({
                type: "_bindWechat",
                payload: response
            });
            if (callback) callback(response);
        },
        * unbindWechat({ payload, callback }, { call, put }) {
            const response = yield call(user.unbindWechat, payload);
            yield put({
                type: "_unbindWechat",
                payload: response
            });
            if (callback) callback(response);
        },
        * unbindPhone({ payload, callback }, { call, put }) {
            const response = yield call(user.unbindPhone, payload);
            yield put({
                type: "_unbindPhone",
                payload: response
            });
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
