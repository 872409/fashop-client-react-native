import { env } from '../../root';

const ROOT_URL = `${env.domain}/server/`;
export const GoodsCategoryApi = {
    list: {
        url: `${ROOT_URL}goodscategory/list`,
        method: 'GET'
    },
}
