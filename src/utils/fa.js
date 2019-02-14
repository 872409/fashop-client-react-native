import { fetchData } from "moji-react-native-utils";
import exceptionUtil from "./exception";
import Code from './code'
import Toast from './toast';
import Cache from './cache';
import { env } from "../config/";
import store from "../store";

const ROOT_URL = `${env.apiHost}/server/`;

export default class Fa {
    static code = new Code()
    static toast = new Toast()
    static cache = new Cache()

    /**
     * 检测数组中是否存在某个字符串
     * @param search
     * @param array
     * @returns {boolean}
     */
    static inArray(search, array) {
        for (let i in array) {
            if (array[i] === search) {
                return true;
            }
        }
        return false;
    }

    static remove(arr, item) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== item) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    static getAntAreaList(list) {
        return Array.isArray(list) && list.length> 0 ? list.map((item) => {
            return {
                value: `${item.id}`,
                label: `${item.name}`,
                children: typeof item['_child'] !== 'undefined' && Array.isArray(item._child) && item._child.length > 0 ? item._child.map((sub) => {
                    return {
                        value: `${sub.id}`,
                        label: `${sub.name}`,
                        children: typeof sub['_child'] !== 'undefined' && Array.isArray(sub._child) && sub._child.length > 0 ? sub._child.map((area) => {
                            return {
                                value: `${area.id}`,
                                label: `${area.name}`
                            }
                        }) : []
                    }
                }) : []
            }
        }) : []
    }

    /**
     * 请求
     * 注意：当返回code就抛出错误是为了日后完善错误编码国际化
     * @param api
     * @param options
     * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
     */
    static request = async (api, options = { params: {} }) => {
        const { params } = options
        const e = await fetchData.fetch({
            api: {
                ...api,
                url: `${ROOT_URL}${api.url}`
            },
            params,
        })
        if (e.code === 0) {
            return e
        }else if (e.code === 10005) {
            store.dispatch({
                type: "user/logout"
            })
            return true
        }else {
            console.log(`接口：${api.url} 请求fail`)
            return null
            // throw new exceptionUtil(e.msg, e.code)
        }
    }
}
