import goodsCollect from "../services/goodsCollect";
import { Toast } from "antd-mobile-rn";

export default {
    namespace: "goodsCollect",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        add: {},
        del: {},
        state: {
            result: { is_collect: false }
        }
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            Toast.info('收藏成功', 1)
            yield put({
                type: 'state',
                payload: { id: payload.goods_id }
            })
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            Toast.info('取消收藏成功', 1)
            yield put({
                type: 'state',
                payload: { id: payload.goods_id }
            })
            if (callback) callback(response);
        },
        * changeState({ payload: { is_collect, goods_id }, callback }, { call, put }) {
            if(is_collect){
                yield put({
                    type: 'del',
                    payload: {
                        goods_id
                    },
                })
            }else {
                yield put({
                    type: 'add',
                    payload: {
                        goods_id
                    },
                })
            }
        },
        * state({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.state, payload);
            yield put({
                type: "_state",
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
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _state(state, action) {
            return {
                ...state,
                state: action.payload
            };
        },
    }
};
