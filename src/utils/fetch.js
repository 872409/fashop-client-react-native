import {
    fetchData,
} from "moji-react-native-utils";
import {
    userSignOut,
} from "../actions/user";
import exceptionUtil from '../utils/exception'

export default class Fetch {
    static fetch({ api, params = {} }) {
        return fetchData.fetch({
            api,
            params,
        })
            .then((e) => {
                switch (e.code) {
                    case -999:
                        store.dispatch(userSignOut())
                        break;
                    default:
                        break;
                }
                console.log(api, params, e)
                return e
            })
    }

    static async externalLinkFetch(...e) {
        const res = await fetch(...e)
        return res.json()
    }

    /**
     * 请求
     * 注意：当返回code就抛出错误是为了日后完善错误编码国际化
     * @param api
     * @param params
     * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
     */
    static request(api, { params = {} }) {
        return fetchData.fetch({
            api,
            params,
        })
            .then((e) => {
                if (e.code === 0) {
                    return e
                } else {
                    console.log(`接口：${api.url} 请求fail`)
                    throw new exceptionUtil(e.msg, e.code)
                }

            })
    }

}
