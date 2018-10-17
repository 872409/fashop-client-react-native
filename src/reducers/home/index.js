import types from '../../constants/ActionTypes';
import { fetchStatus } from "../../utils";

const initialState = {
    homeAdData: [],
    homeAdFetchStatus: fetchStatus.l,
    secondHandMarketDetailData : {},
    secondHandMarketDetailFetchStatus : {},
    recruitDetailData : {},
    recruitDetailFetchStatus : {},
    reviewDetailData : {},
    reviewDetailFetchStatus : {},
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.home.GET_HOME_AD_DATA:
            return {
                ...state,
                homeAdData: action.data,
                homeAdFetchStatus: action.fetchStatus
            }
        case types.home.GET_SECONDHAND_MARKET_DETAIL_DATA:
            return {
                ...state,
                secondHandMarketDetailData: {
                    ...state.secondHandMarketDetailData,
                    ...action.secondHandMarketDetailData
                },
                secondHandMarketDetailFetchStatus: {
                    ...state.secondHandMarketDetailFetchStatus,
                    ...action.secondHandMarketDetailFetchStatus
                },
            }
        case types.home.GET_RECRUIT_DETAIL_DATA:
            return {
                ...state,
                recruitDetailData: {
                    ...state.recruitDetailData,
                    ...action.recruitDetailData
                },
                recruitDetailFetchStatus: {
                    ...state.recruitDetailFetchStatus,
                    ...action.recruitDetailFetchStatus
                },
            }
        case types.home.GET_REVIEW_DETAIL_DATA:
            return {
                ...state,
                reviewDetailData: {
                    ...state.reviewDetailData,
                    ...action.reviewDetailData
                },
                reviewDetailFetchStatus: {
                    ...state.reviewDetailFetchStatus,
                    ...action.reviewDetailFetchStatus
                },
            }
        default:
            return state;
    }
}
