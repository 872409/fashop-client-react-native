import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    BackHandler,
    Alert,
} from "react-native";
import Navigator from './navigator';
import NavigationService from "./navigationService";
import { NavigationActions } from 'react-navigation';
import SplashScreen from "react-native-splash-screen";
import { fetchStatus } from "../utils";
// import { initUserInfoStorage } from "../actions/user";
// import { initWechat } from '../actions/app/wechat';
// import { getAreaList } from '../actions/address';

@connect(({ page }) => ({
    pageData: page.portal.result.info
}))
class App extends Component {
    async componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        const { dispatch } = this.props
        dispatch({
            type: "page/portal"
        })
        // dispatch(initUserInfoStorage())
        // dispatch(initWechat())
        // dispatch(getAreaList({
        //     params: { level: 2, tree: 1 }
        // }))
        SplashScreen.hide();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, navigation } = this.props;
        if (navigation.index > 0) {
            dispatch(NavigationActions.back());
            return true;
        } else {
            Alert.alert(
                '退出应用',
                '确认退出应用吗?',
                [
                    { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: '确认', onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false }
            )
            return true;
        }
    }
    render() {
        const { cartNum, pageData } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Navigator 
                    screenProps={{
                        cartNum,
                        homeTitle: pageData.name
                    }}
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </View>
        )

    }

}

export default App;
// const mapStateToProps = store => {
//     const {
//         user: { login, cartNum },
//         initial: { showBootPage },
//     } = store.app
//     const {
//         home: { homeView, homeViewFetchStatus }, 
//         address: { areaList }
//     } = store.view
//     return {
//         login,
//         cartNum,
//         showBootPage,
//         areaList,
//         homeView,
//         homeViewFetchStatus,
//     };
// };

// export default connect(mapStateToProps)(App);
