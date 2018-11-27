import stateHoc from "./stateHoc";
import { Toast } from './function';
import { initLibraryConfig, config, fetchStatus, storageModule } from "moji-react-native-utils";
import { AppName, AppPlatform, errorCollectApi, env } from "../config";
import { setIsShowFetchLoading } from "../actions/app";
import store from "../store";
import { NavigationActions } from "react-navigation";
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
        // store.dispatch(userSignOut({ exception: true }))
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
        } = store.getState().app
        const {
            userInfo
        } = user
        console.log(userInfo)
        return {
            'User-Id': userInfo ? userInfo.user_id : null,
            'Access-Token': userInfo ? userInfo.access_token : null,
            'Source': 'app',
        }
    },
})


export {
    stateHoc,
    fetchStatus,
    storageModule,
    config
}
