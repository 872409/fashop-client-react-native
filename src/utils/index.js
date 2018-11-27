import stateHoc from "./stateHoc";
import { Toast } from './function';
import { initLibraryConfig, config, fetchStatus, storageModule } from "moji-react-native-utils";
import { AppName, AppPlatform, errorCollectApi, env } from "../config";
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
        const {
            user,
        } = store.getState().app
        const {
            userToken
        } = user
        console.log('userToken', userToken);
        return {
            // 'Access-Token': userToken ? userToken.access_token : null,
            'Access-Token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI2IiwiaXNzIjoiYXBpLmZhc2hvcC5jbiIsInN1YiI6NTYzLCJpYXQiOjE1NDMzMDYwMzUsImV4cCI6MTU0MzkxMDgzNX0.Kk2G2-cqF6LQF5SVyQxMDpvxe0yC-BX8iUxHCranfq0",
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
