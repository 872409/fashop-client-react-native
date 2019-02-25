import stateHoc from "./stateHoc";
import fa from './fa';
import { initLibraryConfig, config, fetchStatus, storageModule } from "moji-react-native-utils";
import { AppName, AppPlatform, errorCollectApi, env } from "../config";
import NavigationService from "../containers/navigationService";
import { store } from '../index'

initLibraryConfig({
    ToastInfo: (content) => {
        fa.toast.show({ title: content, type: 'info' })
    },
    ToastError: (content) => {
        fa.toast.show({ title: content })
    },
    ToastWarn: (content) => {
        fa.toast.show({ title: content })
    },
    // API_URL,
    getLogin: () => {
        const {
            user
        } = store.getState()
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
        store.dispatch({
            type: "user/logout"
        })
    },
    showLoading: () => {
        // store.dispatch(setIsShowFetchLoading(true))
    },
    hideLoading: () => {
        // store.dispatch(setIsShowFetchLoading(false))
    },
    getHeaders: () => {
        const {
            user,
        } = store.getState()
        const {
            userToken
        } = user
        // console.log('userToken', userToken);
        return {
            'Access-Token': userToken ? userToken.access_token : null,
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
