import { combineReducers } from "redux";
import user from "./user";
import appInitial from "./app";
import navigation from "./navigation";
import home from "./home";
import location from "./app/location";
import wechat from './app/wechat';

const rootReducer = combineReducers({
    navigation,
    app: combineReducers({
        user,
        initial: appInitial,
        location,
        wechat,
    }),
    view: combineReducers({
        home,
    }),
})


export default rootReducer;
