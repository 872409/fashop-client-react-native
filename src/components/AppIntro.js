import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Modal,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { windowWidth, windowHeight, ThemeStyle } from '../utils/PublicStyleModule';
import { connect } from "react-redux";
import AlertModal from 'antd-mobile-rn/lib/modal/Modal.native.js';
import { Button } from 'antd-mobile-rn';
import { NavigationActions } from "react-navigation";
import AppIntroSlider from 'react-native-app-intro-slider';
import { changeShowAppIntro } from '../actions/app';
import { storageModule } from '../utils';
import { AppPlatform } from '../utils/APP_ROOT_CONFIG';

const isIphoneX = (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowHeight === 812 || windowWidth === 812)
);

const styles = StyleSheet.create({
    view1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    image: {
        width: windowWidth,
        height: windowHeight,
    },
    text1: {
        fontSize: 16,
        color: '#000',
    },
})


const slides = [
    {
        key: "appIntro1",
        image: isIphoneX ? require("../images/intro1-iphonex.png") : require("../images/intro1.png"),
        imageStyle: styles.image,
        backgroundColor: '#FDFCF8',
    }, {
        key: "appIntro2",
        image: isIphoneX ? require("../images/intro2-iphonex.png") : require("../images/intro2.png"),
        imageStyle: styles.image,
        backgroundColor: '#FDFCF8',
    }, {
        key: "appIntro3",
        image: isIphoneX ? require("../images/intro3-iphonex.png") : require("../images/intro3.png"),
        imageStyle: styles.image,
        backgroundColor: '#FDFCF8',
    }
]


@connect(store => ({
    showAppIntro: store.app.initial.showAppIntro,
}))
export default class AppIntro extends Component {
    render() {
        const {
            showAppIntro,
            dispatch,
        } = this.props
        if (!showAppIntro) {
            return null
        }
        return (
            <View style={styles.view1}>
                <AppIntroSlider
                    slides={slides}
                    onDone={() => {
                        storageModule.set('appIntroV1', 'true')
                        dispatch(changeShowAppIntro(false))
                    }}
                    buttonStyle={{
                        position: 'absolute',
                        right: 34,
                        top: -20,
                    }}
                    // renderNextButton={() => (
                    //     <View
                    //         style={{
                    //             backgroundColor: '#fff',
                    //             paddingHorizontal: 15,
                    //             paddingVertical: 10,
                    //             backgroundColor: '#fff',
                    //             borderRadius: 15,
                    //         }}
                    //     >
                    //         <Text style={styles.text1}>
                    //             下一步
                    //         </Text>
                    //     </View>
                    // )}
                    renderDoneButton={() => (
                        <Button
                            type='primary'
                            style={{
                                width: windowWidth-94,
                            }}
                            onClick={()=>{
                                storageModule.set('appIntroV1', 'true')
                                dispatch(changeShowAppIntro(false))
                            }}
                        >
                            立即体验
                        </Button>
                    )}
                    dotStyle={{
                        backgroundColor: '#FFE0DE',
                        width: 8,
                        height: 8,
                        borderRadius: 4
                    }}
                    activeDotStyle={{
                        backgroundColor: ThemeStyle.ThemeColor,
                        width: 8,
                        height: 8,
                        borderRadius: 4
                    }}
                />
            </View>
        )
    }
}
