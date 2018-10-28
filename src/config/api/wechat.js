import { env } from '../root';

const ROOT_URL = `${env.domain}/server/`;
export const WechatApi = {
    buildConfig: {
        url: `${ROOT_URL}wechat/buildConfig`,
        method: 'GET'
    },
    code: {
        url: `${ROOT_URL}wechat/code`,
        method: 'GET'
    },
    userinfo: {
        url: `${ROOT_URL}wechat/userinfo`,
        method: 'GET'
    },
}
