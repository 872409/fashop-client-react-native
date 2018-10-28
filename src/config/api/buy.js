import { env } from '../root';

const ROOT_URL = `${env.domain}/server/`;
export const BuyApi = {
    calculate: {
        url: `${ROOT_URL}buy/calculate`,
        method: 'POST'
    },
    create:{
        url: `${ROOT_URL}buy/create`,
        method: 'POST'
    },
    pay:{
        url: `${ROOT_URL}buy/pay`,
        method: 'POST'
    },
}
