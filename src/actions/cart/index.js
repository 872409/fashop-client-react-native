import { Toast } from "../../utils/publicFuncitonModule";
import { CartApi } from "../../config/api/cart";
import Fetch from '../../utils/fetch'

export const list = async ({ params } = {}) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.list,
            params
        })
        if (e.code === 0) {
            return e.result;
        } else {
            Toast.warn(e.msg)
        }
    } catch (err) {
        Toast.warn(err)
    }
}

export const add = async ({ params }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.add,
            params
        })
        if (e.code === 0) {
            return true
        } else {
            return false
        }
    } catch (err) {
        Toast.warn(err)
    }
}

export const edit = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.edit,
            params
        })
        return e.code === 0;
    } catch (err) {
        Toast.warn(err)
    }
}

export const del = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.del,
            params
        })
        return e.code === 0;
    } catch (err) {
        Toast.warn(err)
    }
}
export const exist = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.exist,
            params
        })
        return e.code === 0;
    }catch (err) {
        Toast.warn(err)
    }
}
export const info = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.info,
            params
        })
        if (e.code === 0) {
            return e.result
        } else {
            Toast.warn(e.msg)
        }
    } catch (err) {
        Toast.warn(err)
    }
}
export const check = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.check,
            params
        })
        return e.code === 0;
    } catch (err) {
        Toast.warn(err)
    }
}


export const destroy = async () => {
    try {
        await Fetch.fetch({
            api: CartApi.destroy,
        })
        return true
    } catch (err) {
        Toast.warn(err)
    }
}
export const totalNum = async () => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.totalNum,
        })
        if (e.code === 0) {
            return result.total_num
        } else {
            return 0
        }
    } catch (err) {
        Toast.warn(err)
    }
}


