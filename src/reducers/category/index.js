import types from '../../constants/ActionTypes';
import { fetchStatus } from "../../utils";

const initialState = {
    // categoryList: [],
    // categoryListFetchStatus: fetchStatus.l,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.category.GET_CATEGORY_LIST:
            return {
                ...{
                    categoryList: [],
                    categoryListFetchStatus: fetchStatus.l,
                },
                categoryList: action.data,
                categoryListFetchStatus: action.fetchStatus
            }
        case types.category.GET_GOODS_DETAIL_DATA:
            return {
                ...{
                    goodsDetailData: {},
                    goodsDetailFetchStatus: {},
                },
                goodsDetailData: {
                    ...{}, 
                    ...action.goodsDetailData
                },
                goodsDetailFetchStatus: {
                    ...{}, 
                    ...action.goodsDetailFetchStatus
                },
            }
        default:
            return state;
    }
}
