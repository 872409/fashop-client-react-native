import { combineReducers } from "redux";
import appInitial from "./app";
import location from "./app/location";

const rootReducer = combineReducers({
    app: combineReducers({
        initial: appInitial,
        location,
    }),
})


export default rootReducer;
