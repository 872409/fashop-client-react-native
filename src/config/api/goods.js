import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const GoodsApi = {
    list: {
        url: `${ROOT_URL}goods/list`,
        method: 'GET'
    },
}
