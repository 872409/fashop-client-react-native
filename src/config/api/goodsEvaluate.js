import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const GoodsEvaluateApi = {
    mine: {
        url: `${ROOT_URL}goodsevaluate/list`,
        method: 'GET'
    },
}
