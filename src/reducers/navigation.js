import types from '../constants/ActionTypes';
import AppNavigator from "../containers/navigator";
import { NavigationActions } from 'react-navigation'
import store from '../store'
import {Toast} from '../utils/PublicFuncitonModule'


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
    'HelpCenter', // 帮助中心
    'UserSetting', // 设置
    'UserMessage', // 消息
    'ReleaseList', // 我的发布
    'UserCollect', // 我的收藏
    'BreedDogPublish', // 发布种犬信息
    'PuppyPublish', // 发布幼犬信息
]


export default (state , action) => {
    let nextState;
    switch (action.type) {
        case 'Navigation/NAVIGATE':
            // switch (action.routeName) {
            //     case 'Home':
            //         const {
            //             login
            //         } = store.getState().app.user
            //         const {
            //             homeRefreshListView
            //         } = store.getState().view.home
            //         if(login&&homeRefreshListView){
            //             homeRefreshListView()
            //         }
            //         break;
            // }
            if(needLoginRouters.includes(action.routeName)){
                const {
                    login
                } = store.getState().app.user
                
                if(login){
                    nextState = AppNavigator.router.getStateForAction(action, state);
                }else {
                    nextState = AppNavigator.router.getStateForAction(
                        NavigationActions.navigate({ routeName: 'UserLogin'}),
                        state
                    )
                }
            }else {
                nextState = AppNavigator.router.getStateForAction(action, state);
            }
            break;
        case 'Navigation/BACK':
            if(action.routeName==='Address'){
                const {
                    cityName
                } = store.getState().app.location
                if(cityName){
                    Toast.warn('请选择城市')
                }else{
                    nextState = AppNavigator.router.getStateForAction(action, state)
                }
            }else {
                nextState = AppNavigator.router.getStateForAction(action, state)
            }
                // const {
                //     navigation
                // } = store.getState()
                // const {
                //     routes
                // } = navigation
                // if(routes.length>1&&routes[routes.length-2].routeName==='IndexView'&&routes[routes.length-2].index===0){
                //     const {
                //         login
                //     } = store.getState().app.user
                //     const {
                //         homeRefreshListView
                //     } = store.getState().view.home
                //     if(login&&homeRefreshListView){
                //         homeRefreshListView()
                //     }
                // }
            break;
        // case "Login":
        //     nextState = AppNavigator.router.getStateForAction(
        //         //  getStateForAction: 根据给定的action来定义返回的navigation sate
        //         NavigationActions.back(), // action  返回上一屏幕并关闭当前屏幕
        //         state // state
        //     );
        //     break;
        // case "Logout":
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.navigate({ routeName: "Login" }), // 通过navigat action 改变当前state
        //         state
        //     );
        //     break;
        default:

            nextState = AppNavigator.router.getStateForAction(action, state);

            break;
    }

    return nextState || state;
};
