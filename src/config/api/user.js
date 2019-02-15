import { env } from '../index';

const ROOT_URL = `${env.apiHost}/`;
export const UserApi = {
    verifyCode: {
        url: `${ROOT_URL}server/Verifycode/add`,
        method: 'POST'
    },
}
