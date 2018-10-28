import { env } from '../root';

const ROOT_URL = `${env.domain}/server/`;

export const PageApi = {
    portal:{
        url: `${ROOT_URL}page/portal`,
        method: 'GET',
        showLoading: false,
        needLogin: false,
    },
    info: {
        url: `${ROOT_URL}page/info`,
        method: 'GET',
        showLoading: false,
        needLogin: false,
    },
}
