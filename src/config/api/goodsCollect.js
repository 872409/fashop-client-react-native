import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const GoodsCollectApi = {
    list: {
        url: `${ROOT_URL}goodscollect/mine`,
        method: 'GET'
    },
}
