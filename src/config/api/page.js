import { env } from '../../root';

const ROOT_URL = `${env.domain}/server/`;
export const PageApi = {
    portal:{
        url: `${ROOT_URL}page/portal`,
        method: 'GET'
    },
    info: {
        url: `${ROOT_URL}page/info`,
        method: 'GET'
    },
}
