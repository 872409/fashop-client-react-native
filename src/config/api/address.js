import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;

export const AddressApi = {
    list: {
        url: `${ROOT_URL}address/list`,
        method: 'GET'
    },
}
