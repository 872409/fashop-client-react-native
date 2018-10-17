import types from '../../constants/ActionTypes';
import { Toast } from "../../utils/PublicFuncitonModule";
import {
    Fetch,
    fetchStatus
} from '../../utils';
import moment from 'moment'

export const getHomeAdData = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                apiName: "INFOSEARCH",
                params:{
                    category_id: 1
                }
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

export const getSecondHandMarketDetail = ({ params, fetchStatus: f }) => {
    return async dispatch => {
        if (f === null) {
            dispatch(updateSecondHandMarketDetail(null, fetchStatus.l, params.id))
        }
        try {
            const e = await Fetch.fetch({
                apiName: "SECONDHANDMARKETDETAIL",
                params
            })
            if (e.errcode === 0) {
                dispatch(updateSecondHandMarketDetail(e.data, fetchStatus.s, params.id))
            } else {
                Toast.warn(e.errmsg)
                dispatch(updateSecondHandMarketDetail(null, fetchStatus.e, params.id))
            }
        } catch (err) {
            dispatch(updateSecondHandMarketDetail(null, fetchStatus.f, params.id))
        }
    }
}

const updateSecondHandMarketDetail = (data, fetchStatus, id) => {
    let newData = {}
    newData[id] = data
    let FetchStatus = {}
    FetchStatus[id] = fetchStatus

    return {
        type: types.home.GET_SECONDHAND_MARKET_DETAIL_DATA,
        secondHandMarketDetailData: newData,
        secondHandMarketDetailFetchStatus: FetchStatus,
    }
}


export const getRecruitDetail = ({ params, fetchStatus: f }) => {
    return async dispatch => {
        if (f === null) {
            dispatch(updateRecruitDetail(null, fetchStatus.l, params.id))
        }
        try {
            const e = await Fetch.fetch({
                apiName: "RECRUITDETAIL",
                params
            })
            if (e.errcode === 0) {
                dispatch(updateRecruitDetail(e.data, fetchStatus.s, params.id))
            } else {
                Toast.warn(e.errmsg)
                dispatch(updateRecruitDetail(null, fetchStatus.e, params.id))
            }
        } catch (err) {
            dispatch(updateRecruitDetail(null, fetchStatus.f, params.id))
        }
    }
}

const updateRecruitDetail = (data, fetchStatus, id) => {
    let newData = {}
    newData[id] = data
    let FetchStatus = {}
    FetchStatus[id] = fetchStatus

    return {
        type: types.home.GET_RECRUIT_DETAIL_DATA,
        recruitDetailData: newData,
        recruitDetailFetchStatus: FetchStatus,
    }
}


export const getReviewDetail = ({ params, fetchStatus: f }) => {
    return async dispatch => {
        if (f === null) {
            dispatch(updateReviewDetail(null, fetchStatus.l, params.id))
        }
        try {
            const e = await Fetch.fetch({
                apiName: "CRITIQUEDETAIL",
                params
            })
            if (e.errcode === 0) {
                dispatch(updateReviewDetail(e.data, fetchStatus.s, params.id))
            } else {
                Toast.warn(e.errmsg)
                dispatch(updateReviewDetail(null, fetchStatus.e, params.id))
            }
        } catch (err) {
            dispatch(updateReviewDetail(null, fetchStatus.f, params.id))
        }
    }
}

const updateReviewDetail = (data, fetchStatus, id) => {
    let newData = {}
    newData[id] = data
    let FetchStatus = {}
    FetchStatus[id] = fetchStatus

    return {
        type: types.home.GET_REVIEW_DETAIL_DATA,
        reviewDetailData: newData,
        reviewDetailFetchStatus: FetchStatus,
    }
}