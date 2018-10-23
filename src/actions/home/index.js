import types from '../../constants/ActionTypes';
import { Toast } from "../../utils/PublicFuncitonModule";
import {
    Fetch,
    fetchStatus
} from '../../utils';

export const getHomeView = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                apiName: "PAGEPORTAL",
            })
            if (e.code === 0) {
                dispatch(updateHomeView(e.result.info, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updateHomeView(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateHomeView(null, fetchStatus.f))
        }
    }
}

const updateHomeView = (data, fetchStatus) => {
    return {
        type: types.home.GET_HOME_VIEW,
        data,
        fetchStatus,
    }
}
