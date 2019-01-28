import cart from "../services/cart";

export default {
    namespace: "cart",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        add: {},
        edit: {},
        del: {},
        exist: {},
        info: { result: { info: {} } },
        check: {},
        destroy: {},
        totalNum: {},
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(cart.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(cart.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(cart.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(cart.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * exist({ payload, callback }, { call, put }) {
            const response = yield call(cart.exist, payload);
            yield put({
                type: "_exist",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(cart.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * check({ payload, callback }, { call, put }) {
            const response = yield call(cart.check, payload);
            yield put({
                type: "_check",
                payload: response
            });
            if (callback) callback(response);
        },
        * destroy({ payload, callback }, { call, put }) {
            const response = yield call(cart.destroy, payload);
            yield put({
                type: "_destroy",
                payload: response
            });
            if (callback) callback(response);
        },
        * totalNum({ payload, callback }, { call, put }) {
            const response = yield call(cart.totalNum, payload);
            yield put({
                type: "_totalNum",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _exist(state, action) {
            return {
                ...state,
                exist: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _check(state, action) {
            return {
                ...state,
                check: action.payload
            };
        },
        _destroy(state, action) {
            return {
                ...state,
                destroy: action.payload
            };
        },
        _totalNum(state, action) {
            return {
                ...state,
                totalNum: action.payload
            };
        },
    }
};
