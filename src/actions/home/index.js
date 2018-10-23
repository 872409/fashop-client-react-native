import types from '../../constants/ActionTypes';
import { Toast } from "../../utils/PublicFuncitonModule";
import {
    Fetch,
    fetchStatus
} from '../../utils';

export const getHomeAdData = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                apiName: "INFOSEARCH",
                params:{
                    category_id: 1
                },
            })
            if (e.errcode === 0) {
                dispatch(updateHomeAdData(e.list, fetchStatus.s))
            } else {
                Toast.warn(e.errmsg)
                dispatch(updateHomeAdData(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateHomeAdData(null, fetchStatus.f))
        }
    }
}

const updateHomeAdData = (data, fetchStatus) => {
    return {
        type: types.home.GET_HOME_AD_DATA,
        data,
        fetchStatus,
    }
}
