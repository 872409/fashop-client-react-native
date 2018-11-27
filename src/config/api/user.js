import { env } from '../index';

const ROOT_URL = `${env.domain}/`;
export const UserApi = {
    login: {
        url: `${ROOT_URL}server/user/login`,
        method: 'POST'
    },
    register: {
        url: `${ROOT_URL}server/user/register`,
        method: 'POST'
    },
    logout: {
        url: `${ROOT_URL}server/user/logout`,
        method: 'GET'
    },
    token: {
        url: `${ROOT_URL}server/user/token`,
        method: 'POST'
    },
    editPassword: {
        url: `${ROOT_URL}server/user/editPassword`,
        method: 'POST'
    },
    findPassword: {
        url: `${ROOT_URL}server/user/findPassword`,
        method: 'POST'
    },
    self: {
        url: `${ROOT_URL}server/user/self`,
        method: 'GET'
    },
    editPasswordByFind: {
        url: `${ROOT_URL}server/user/editPasswordByFind`,
        method: 'POST'
    },
    editProfile: {
        url: `${ROOT_URL}server/user/editProfile`,
        method: 'POST'
    },
    bindPhone: {
        url: `${ROOT_URL}server/user/bindPhone`,
        method: 'POST'
    },
    bindWechat: {
        url: `${ROOT_URL}server/user/bindWechat`,
        method: 'POST'
    },
    unbindWechat: {
        url: `${ROOT_URL}server/user/unbindWechat`,
        method: 'POST'
    },
    unbindPhone: {
        url: `${ROOT_URL}server/user/unbindWechat`,
        method: 'POST'
    },
    evaluatedList: {
        url: `${ROOT_URL}server/user/evaluatedList`,
        method: 'GET'
    }
}
