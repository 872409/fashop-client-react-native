import cart from "../services/cart";
import { Toast } from "antd-mobile-rn";

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
        totalNum: { 
            result: { total_num: 0 } 
        },
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
        * change({ payload: { goods_sku_id, quantity }, callback }, { call, put }) {
            const cartInfo = yield call(cart.info, { goods_sku_id });
            const cartExist = yield call(cart.exist, { goods_sku_id });
            const params = {
                goods_sku_id,
                quantity: cartInfo ? cartInfo.result.info.goods_num + quantity : quantity
            }
            if (cartExist.result.state) {
                yield put({
                    type: 'edit',
                    payload: params
                })
            } else {
                yield put({
                    type: 'add',
                    payload: params
                })
            }
            if (callback) callback();
        },
        * save({ payload: { goods_sku_id, quantity }, callback }, { call, put }) {
            const cartExist = yield call(cart.exist, { goods_sku_id });
            const params = {
                goods_sku_id,
                quantity
            }
            if (cartExist.result.state) {
                yield put({
                    type: 'edit',
                    payload: params
                })
            } else {
                yield put({
                    type: 'add',
                    payload: params
                })
            }
            if (callback) callback();
        },
        * changeSku({ payload: { goods_sku_id, to_goods_sku_id, quantity }, callback }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    goods_sku_id: to_goods_sku_id,
                    quantity
                }
            })
            yield put({
                type: 'del',
                payload: {
                    goods_sku_ids: [goods_sku_id]
                }
            })
            if (callback) callback();
            // 不完善 if 更改的 sku 购物车存在
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(cart.add, payload);
            if(response){
                yield put({
                    type: "_add",
                    payload: response
                });
                yield put({
                    type: 'totalNum'
                })
            }else{
                Toast.info('商品库存不足',1)
            }
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(cart.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            yield put({
                type: 'totalNum'
            })
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(cart.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            yield put({
                type: 'totalNum'
            })
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
