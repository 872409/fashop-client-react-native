import { combineReducers } from "redux";
import user from "./user";
import appInitial from "./app";
import location from "./app/location";

const rootReducer = combineReducers({
    app: combineReducers({
        user,
        initial: appInitial,
        location,
    }),
})


export default rootReducer;
