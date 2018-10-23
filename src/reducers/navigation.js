import AppNavigator from "../containers/navigator";
import { NavigationActions } from 'react-navigation'
import store from '../store'
import { Toast } from '../utils/PublicFuncitonModule'

// const initialState = AppNavigator.router.getStateForAction(
//     AppNavigator.router.getActionForPathAndParams("IndexView")
// );

const prevGetStateForActionHomeStack = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === "ReplaceCurrentScreen") {
        const screenNum = action.screenNum || 1
        const routes = state.routes.slice(0, state.routes.length - screenNum);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1
        };
    }
    return prevGetStateForActionHomeStack(action, state);
};

const needLoginRouters = [
    // 'HelpCenter', // 帮助中心
    // 'UserSetting', // 设置
    // 'UserMessage', // 消息
    // 'ReleaseList', // 我的发布
    // 'UserCollect', // 我的收藏
    // 'BreedDogPublish', // 发布种犬信息
    // 'PuppyPublish', // 发布幼犬信息
]

export default (state , action) => {
    let nextState;
    switch (action.type) {
        default:

            nextState = AppNavigator.router.getStateForAction(action, state);

            break;
    }

    return nextState || state;
};
