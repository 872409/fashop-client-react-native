import { combineReducers } from "redux";
import user from "./user";
import appInitial from "./app";
import category from "./category";
import address from "./address";
import location from "./app/location";
import wechat from './app/wechat';

const rootReducer = combineReducers({
    app: combineReducers({
        user,
        initial: appInitial,
        location,
        wechat,
    }),
    view: combineReducers({
        category,
        address,
    }),
})


export default rootReducer;
