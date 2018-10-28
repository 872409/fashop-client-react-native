import { env } from '../root';

const ROOT_URL = `${env.domain}/server/`;
export const ShopApi = {
    info: {
        url: `${ROOT_URL}shop/info`,
        method: 'GET'
    },
}
