import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const OrderApi = {
    list: {
        url: `${ROOT_URL}order/list`,
        method: 'GET'
    },
}
