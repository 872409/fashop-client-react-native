import stateHoc from "./stateHoc";
import { Toast } from './publicFuncitonModule';
import { initLibraryConfig, config, fetchStatus, storageModule } from "moji-react-native-utils";
import { AppName, AppPlatform, errorCollectApi, env } from "../config/root";
import { setIsShowFetchLoading } from "../actions/app";
import store from "../store";
import NavigationService from "../containers/navigationService";

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
        NavigationService.navigate("UserLogin");
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
        // const {
        //     user,
        // } = store.getState().app
        // const {
        //     userInfo
        // } = user
        let token = null
        storageModule.get("user_token")
        .then((e)=>{
            token = JSON.parse(e)
        })
        return {
            'Access-Token': token ? token.access_token : null,
            // 'Access-Token': userInfo ? userInfo.access_token : null,
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
