import Model from '../utils/model'
import { CartListInfoInterface, CartListInterface } from '../interface/cart'
import { CartApi } from '../config/api/cart'
import Fetch from "../utils/fetch";

export default class Cart extends Model {
    async list(params = {}) {
        try {
            const { result } = await Fetch.request(CartApi.list, { params })
            return new CartListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async totalNum() {
        try {
            const { result } = await Fetch.request(CartApi.totalNum)
            return result.total_num
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async add(params) {
        try {
            await Fetch.request(CartApi.add, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async edit(params) {
        try {
            await Fetch.request(CartApi.edit, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async exist(params) {
        try {
            const { result } = await Fetch.request(CartApi.exist, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async check(params) {
        try {
            const { result } = await Fetch.request(CartApi.check, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async info(params) {
        try {
            const { result } = await Fetch.request(CartApi.info, { params })
            return new CartListInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async del(params) {
        try {
            await Fetch.request(CartApi.del, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async destroy() {
        try {
            await Fetch.request(CartApi.destroy)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
