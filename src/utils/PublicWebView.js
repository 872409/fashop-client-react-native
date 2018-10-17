import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    WebView,
    ActivityIndicator,
} from "react-native";
import {
    PublicStyles,
    windowWidth,
    windowHeight,
    ThemeStyle,
    PublicStylesString
} from "./PublicStyleModule";
import { Toast } from "./PublicFuncitonModule";
import { updateUserInfo } from "../actions/user";
import { connect } from "react-redux";



class PublicWebView extends Component {
    state = {
        url: this.props.navigation.state.params.url,
        isOnMessage: this.props.navigation.state.params.isOnMessage===false?false:true,
    };
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });
    render() {
        const {
            navigation,
            dispatch,
        } = this.props
        const {url} = navigation.state.params

        const patchPostMessageFunction = () => {
            const originalPostMessage = window.postMessage;
            const patchedPostMessage = (message, targetOrigin, transfer) => {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            window.postMessage = patchedPostMessage;
        };
        const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

        return (
            <View style={PublicStyles.ViewMax}>
                <WebView
                    style={{flex:1}}
                    source = {{uri:url}}
                    // injectedJavaScript={patchPostMessageJsCode}
                    renderLoading = {()=>{
                        return(
                            <ActivityIndicator
                                animating
                                style={{ flex: 1 }}
                                color="#00243F"
                                size={'large'}
                            />
                        )
                    }}
                    onNavigationStateChange={(navState)=>{
                        if(!navState.url.includes('react-js-navigation')){
                            this.state.url = navState.url
                            if(navState.url.includes('favorit.ca/api/manage/oauth')){
                                this.setState({
                                    isOnMessage: true
                                })
                            }
                        }
                    }}
                    startInLoadingState = {true}
                    onMessage = {
                        this.state.isOnMessage
                        ?   (event)=>{
                                if(this.state.url.includes('favorit.ca/api/manage/oauth')){
                                    const e = JSON.parse(event.nativeEvent.data)
                                    const {
                                        actionType,
                                        actionData,
                                    } = e
                                    switch (actionType) {
                                        case 'stripeBind':
                                            const {
                                                data
                                            } = actionData
                                            if(data.errcode===0){
                                                Toast.info('成功绑定')
                                                dispatch(updateUserInfo())
                                                navigation.goBack()
                                            }else {
                                                Toast.warn(data.errmsg)
                                            }
                                        break;
                                        default:
                                            return Toast.warn('未知类型数据')
                                    }
                                }
                            }
                        :   undefined
                    }
                    ref={(e)=>{this.webview=e}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});



const mapStateToProps = store => {
    return {

    }
};

export default connect(mapStateToProps)(PublicWebView);
