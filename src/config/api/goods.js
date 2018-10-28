import { env } from '../../root';

const ROOT_URL = `${env.domain}/server/`;
export const GoodsApi = {
    list: {
        url: `${ROOT_URL}goods/list`,
        method: 'POST'
    },
    info: {
        url: `${ROOT_URL}goods/info`,
        method: 'GET'
    },
}
