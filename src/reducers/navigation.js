import AppNavigator from "../containers/navigator";
import { NavigationActions } from 'react-navigation'
import store from '../store'

// const initialState = AppNavigator.router.getStateForAction(
//     AppNavigator.router.getActionForPathAndParams("IndexView")
// );

// const prevGetStateForActionHomeStack = AppNavigator.router.getStateForAction;
// AppNavigator.router.getStateForAction = (action, state) => {
//     if (state && action.type === "ReplaceCurrentScreen") {
//         const screenNum = action.screenNum || 1
//         const routes = state.routes.slice(0, state.routes.length - screenNum);
//         routes.push(action);
//         return {
//             ...state,
//             routes,
//             index: routes.length - 1
//         };
//     }
//     return prevGetStateForActionHomeStack(action, state);
// };


const needLoginRouters = [

]


export default (state, action) => {
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
            //         } = store.getState().View.home
            //         if(login&&homeRefreshListView){
            //             homeRefreshListView()
            //         }
            //         break;
            // }
            if (needLoginRouters.includes(action.routeName)) {
                const {
                    login
                } = store.getState().app.user

                if (login) {
                    nextState = AppNavigator.router.getStateForAction(action, state);
                } else {
                    nextState = AppNavigator.router.getStateForAction(
                        NavigationActions.navigate({ routeName: 'UserLogin' }),
                        state
                    )
                }
            } else {
                nextState = AppNavigator.router.getStateForAction(action, state);
            }
            break;
        default:

            nextState = AppNavigator.router.getStateForAction(action, state);

            break;
    }

    return nextState || state;
};
