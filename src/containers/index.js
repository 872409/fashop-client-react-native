import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    BackHandler,
    Alert,
    StatusBar,
} from "react-native";
import Navigator from './navigator';
import { initUserInfoStorage } from "../actions/user";
import { initWechat } from '../actions/app/wechat';
import { NavigationActions } from 'react-navigation';
import SplashScreen from "react-native-splash-screen";
// import { createNavigationPropConstructor } from 'react-navigation-redux-helpers';
// import FetchLoading from '../components/FetchLoading';

// const navigationPropConstructor = createNavigationPropConstructor("root");

class App extends Component {
    componentDidMount() {
        // const bugsnag = new Client();
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        const {
            dispatch
        } = this.props
        dispatch(initUserInfoStorage())
        dispatch(initWechat())
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
        const {
            cityName,
            // navigation: {
            //     index,
            //     routes
            // }
        } = this.props

        // const navigation = navigationPropConstructor(
        //     this.props.dispatch,
        //     this.props.navigation,
        // );

        // const bool = routes[index].routeName === 'BreedDogDetail' || routes[index].routeName === 'PuppyDetail'
        // if (bool) {
        //     StatusBar.setBarStyle('light-content', true)
        // } else {
        //     StatusBar.setBarStyle('default', true)
        // }

        return (
            <View style={{ flex: 1 }}>
                <Navigator
                    // navigation={navigation}
                    screenProps={{
                        cityName
                    }}
                />
                {/* <FetchLoading /> */}
            </View>
        )

    }

}

const mapStateToProps = store => {
    const {
        user,
        initial,
        location: { cityName },
    } = store.app
    return {
        login: user.login,
        showBootPage: initial.showBootPage,
        // navigation: store.navigation,
        cityName,
    };
};

export default connect(mapStateToProps)(App);
