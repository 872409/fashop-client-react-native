import { env } from '../root';

const ROOT_URL = `${env.domain}/server/`;

export const AddressApi = {
    setDefault: {
        url: `${ROOT_URL}address/setDefault`,
        method: 'POST'
    },
    getDefault: {
        url: `${ROOT_URL}address/default`,
        method: 'GET',
        needLogin: true
    },
    list: {
        url: `${ROOT_URL}address/list`,
        method: 'GET'
    },
    info: {
        url: `${ROOT_URL}address/info`,
        method: 'GET'
    },
    add: {
        url: `${ROOT_URL}address/add`,
        method: 'POST'
    },
    edit: {
        url: `${ROOT_URL}address/edit`,
        method: 'POST'
    },
    del: {
        url: `${ROOT_URL}address/del`,
        method: 'POST'
    },
    types: {
        url: `${ROOT_URL}address/types`,
        method: 'GET'
    },
}
