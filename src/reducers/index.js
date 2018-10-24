import { combineReducers } from "redux";
import user from "./user";
import appInitial from "./app";
// import navigation from "./navigation";
import home from "./home";
import category from "./category";
// import collect from "./collect";
import location from "./app/location";
// import aboutus from './aboutus';
import wechat from './app/wechat';
// import message from './message';
// import evaluate from './evaluate'
// import homeFun from './homeFun'
// import house from './house'
// import newHouse from "./house/newHouse";
// import resoldHouse from "./house/resoldHouse";
// import renting from "./house/renting";
// import hezuoHouse from "./house/hezuoHouse";
// import banking from './banking'


const rootReducer = combineReducers({
    app: combineReducers({
        user,
        initial: appInitial,
        location,
        wechat,
    }),
    // navigation,
    view: combineReducers({
        home,
        category,
        // collect,
        // aboutus,
        // message,
        // evaluate,
        // house,
        // homeFun,
        // newHouse,
        // resoldHouse,
        // renting,
        // hezuoHouse,
        // banking,
    }),
    // usercenter :combineReducers({

    // }),
})


export default rootReducer;
