import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const RefundApi = {
    list: {
        url: `${ROOT_URL}orderrefund/list`,
        method: 'GET'
    },
}
