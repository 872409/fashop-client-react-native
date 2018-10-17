import types from '../../constants/ActionTypes';
import { fetchStatus } from "../../utils";

const initialState = {
    login : false,
    userInfo : null,
    couponNum : 0,
    refreshing : false,
    orderNum : {
        order_nopay : 0,
        order_nosend : 0,
        order_noreceiving : 0,
        order_noeval : 0,
        order_refund : 0,
    },
    cardList : [],
    unreadMessageNumber: 0,
    levelData: null,
    levelDataFetchStatus: fetchStatus.l,
}

export default (state = initialState, action)=> {
    switch (action.type) {
        case types.user.USER_STATUS_CHANGE:
            return Object.assign({}, state, {
                login: action.login,
                userInfo: action.userInfo,
            })
        case types.user.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                refreshing: action.refreshing,
            })
        case types.user.GET_USER_MIXEDSTATENUM_DATA:
            return Object.assign({}, state, {
                couponNum: action.couponNum,
                orderNum : action.orderNum,
            })
        case types.user.UPDATE_USER_INFO_LOADING:
            return Object.assign({}, state, {
                refreshing: action.refreshing,
            })
        case types.user.GET_USER_CARD_LIST:
            return Object.assign({}, state, {
                cardList: action.cardList,
            })
        case types.user.SET_UNREAD_MESSAGE_NUMBER:
            return Object.assign({}, state, {
                unreadMessageNumber: action.number,
            })
        case types.user.GET_USER_LEVEL_DETAIL:
            return {
                ...state,
                levelData: action.levelData,
                levelDataFetchStatus: action.levelDataFetchStatus,
            }
        default:
            return state;
    }
}
