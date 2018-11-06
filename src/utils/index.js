import Fetch from './fetch';
import stateHoc from "./stateHoc";
import { Toast } from './publicFuncitonModule';
import { initLibraryConfig, fetchStatus, storageModule } from "moji-react-native-utils";
import {
    AppName,
    AppPlatform,
    errorCollectApi,
    env,
} from "../config/root";
import { setIsShowFetchLoading } from "../actions/app";
import store from "../store";
import { NavigationActions } from "react-navigation";
import { userSignOut } from "../actions/user";

initLibraryConfig({
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
    getLogin: () => {
        const {
            user
        } = store.getState().app
        const {
            login
        } = user
        return login
    },
    pushLogin: () => {
        const resetAction = NavigationActions.navigate({ routeName: 'UserLogin' })
        store.dispatch(resetAction)
    },
    APP_ROOT_CONFIG: {
        AppName,
        AppPlatform,
        errorCollectApi,
        env,
    },
    removeUserInfo: () => {
        store.dispatch(userSignOut({ exception: true }))
    },
    showLoading: () => {
        store.dispatch(setIsShowFetchLoading(true))
    },
    hideLoading: () => {
        store.dispatch(setIsShowFetchLoading(false))
    },
    getHeaders: () => {
        const {
            user,
            // location,
        } = store.getState().app
        const {
            userInfo
        } = user
        // todo
        // const {
        //     cityId,
        //     longitude,
        //     latitude,
        // } = location
        const header = {
            'User-Id': "563",
            // 'User-Id': userInfo ? userInfo.user_id : null,
            'Access-Token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTMwIiwiaXNzIjoiYXBpLmZhc2hvcC5jbiIsInN1YiI6NTYzLCJpYXQiOjE1NDA3NDE5MTIsImV4cCI6MTU0MTM0NjcxMn0.3VyGsPU3U-TZDsC7xBQzVbyK6n5I1tsE9BqKaEmpCJM",
            // 'Access-Token': userInfo ? userInfo.access_token : null,
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
    storageModule
}
