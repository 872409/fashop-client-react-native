import types from '../../constants/ActionTypes';
import { Toast } from "../../utils/PublicFuncitonModule";
import {
    Fetch,
    fetchStatus
} from '../../utils';

export const getCategoryList = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                apiName: "GOODSCATEGORYLIST",
            })
            if (e.code === 0) {
                dispatch(updateCategoryList(e.result.list, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updateCategoryList(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateCategoryList(null, fetchStatus.f))
        }
    }
}

const updateCategoryList = (data, fetchStatus) => {
    return {
        type: types.category.GET_CATEGORY_LIST,
        data,
        fetchStatus,
    }
}
