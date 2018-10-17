import { Toast } from './PublicFuncitonModule';
import Fetch from './fetch';
import { initLibraryConfigFunc } from "ws-react-native-utils";
import { API_URL } from "./APP_ROOT_NETWORK_CONFIG";
import {
    AppName,
    AppPlatform,
    errorCollectApi,
    env,
    developer,
} from "./APP_ROOT_CONFIG";
import { setIsShowFetchLoading } from "../actions/app";
import store from "../store";
import { NavigationActions } from "react-navigation";
import stateHoc from "./stateHoc";
import {userSignOut} from "../actions/user";

const getHeaders = () => {
    const {
        user,
        location,
    } = store.getState().app
    const {
        userInfo
    } = user
    const {
        cityId,
        longitude,
        latitude,
    } = location
    const header = {
        'User-Id': userInfo ? userInfo.user_id : null,
        'Access-Token': userInfo ? userInfo.access_token : null,
        'Source': 'app',
        'City-Id': cityId,
        'Longitude': longitude,
        'Latitude': latitude,
    }
    return header
}

initLibraryConfigFunc({
    ToastInfo : (content)=>{
        Toast.info(content)
    },
    ToastError : (content)=>{
        Toast.warn(content)
    },
    ToastWarn : (content)=>{
        Toast.error(content)
    },
    API_URL,
    getLoginFunc:()=>{
        const {
            user
        } = store.getState().app
        const {
            login
        } = user
        return login
    },
    pushLoginFunc:()=>{
        const resetAction = NavigationActions.navigate({ routeName: 'UserLogin'})
        store.dispatch(resetAction)
    },
    APP_ROOT_CONFIG:{
        AppName,
        AppPlatform,
        errorCollectApi,
        env,
        developer,
    },
    removeUserInfoFunc:()=>{
        store.dispatch(userSignOut({exception:true}))
    },
    showLoading: ()=>{
        store.dispatch(setIsShowFetchLoading(true))
    },
    hideLoading: ()=>{
        store.dispatch(setIsShowFetchLoading(false))
    },
    getHeadersFunc:()=>getHeaders(),
})


export {
    fetchStatus,
    storageModule,
    // publicFunction
} from "ws-react-native-utils";

export {
    Fetch,
    stateHoc,
    getHeaders
}
