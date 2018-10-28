import Fetch from './fetch';
import stateHoc from "./stateHoc";
import { Toast } from './PublicFuncitonModule';
import { initLibraryConfigFunc, fetchStatus, storageModule } from "ws-react-native-utils";
// import { API_URL } from "./APP_ROOT_NETWORK_CONFIG";
import {
    AppName,
    AppPlatform,
    errorCollectApi,
    env,
} from "../config/root";
import { setIsShowFetchLoading } from "../actions/app";
import store from "../store";
// import { NavigationActions } from "react-navigation";
import { userSignOut } from "../actions/user";


initLibraryConfigFunc({
    ToastInfo: (content) => {
        Toast.info(content)
    },
    ToastError: (content) => {
        Toast.warn(content)
    },
    ToastWarn: (content) => {
        Toast.error(content)
    },
    // API_URL,
    getLoginFunc: () => {
        const {
            user
        } = store.getState().app
        const {
            login
        } = user
        return login
    },
    pushLoginFunc: () => {
        // const resetAction = NavigationActions.navigate({ routeName: 'UserLogin' })
        // store.dispatch(resetAction)
    },
    APP_ROOT_CONFIG: {
        AppName,
        AppPlatform,
        errorCollectApi,
        env,
    },
    removeUserInfoFunc: () => {
        store.dispatch(userSignOut({ exception: true }))
    },
    showLoading: () => {
        store.dispatch(setIsShowFetchLoading(true))
    },
    hideLoading: () => {
        store.dispatch(setIsShowFetchLoading(false))
    },
    getHeadersFunc: () => {
        const {
            user,
            // location,
        } = store.getState().app
        const {
            userInfo
        } = user
        // const {
        //     cityId,
        //     longitude,
        //     latitude,
        // } = location
        const header = {
            'User-Id': userInfo ? userInfo.user_id : null,
            'Access-Token': userInfo ? userInfo.access_token : null,
            'Source': 'app',
            // 'City-Id': cityId,
            // 'Longitude': longitude,
            // 'Latitude': latitude,
        }
        return header
    },
})

export {
    Fetch,
    stateHoc,
    fetchStatus,
    storageModule,
}
