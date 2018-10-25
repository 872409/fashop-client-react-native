import { env } from '../../root';

const ROOT_URL = `${env.domain}/server/`;
export const AddressApi = {
    setDefault: {
        url: `${ROOT_URL}address/setDefault`,
        method: 'POST'
    },
    getDefault: {
        url: `${host}address/default`,
        method: 'GET'
    },
    list: {
        url: `${host}address/list`,
        method: 'GET'
    },
    info: {
        url: `${host}address/info`,
        method: 'GET'
    },
    add: {
        url: `${host}address/add`,
        method: 'POST'
    },
    edit: {
        url: `${host}address/edit`,
        method: 'POST'
    },
    del: {
        url: `${host}address/del`,
        method: 'POST'
    },
    types: {
        url: `${host}address/types`,
        method: 'GET'
    },
}
