import types from '../../constants/ActionTypes';
import { fetchStatus } from "../../utils";

const initialState = {
    // homeAdData: [],
    // homeAdFetchStatus: fetchStatus.l,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.home.GET_HOME_AD_DATA:
            return {
                ...{
                    homeAdData: [],
                    homeAdFetchStatus: fetchStatus.l,
                },
                homeAdData: action.data,
                homeAdFetchStatus: action.fetchStatus
            }
        default:
            return state;
    }
}
