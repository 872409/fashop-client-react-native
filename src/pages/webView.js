import React, { Component } from "react";
import {
    View,
    WebView,
    ActivityIndicator,
} from "react-native";
import { PublicStyles } from "../utils/style";

export default class PublicWebView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });
    state = {
        url: this.props.navigation.state.params.url,
        isOnMessage: this.props.navigation.state.params.isOnMessage === false ? false : true,
    };
    render() {
        const {
            navigation,
        } = this.props
        const { url } = navigation.state.params
        return (
            <View style={PublicStyles.ViewMax}>
                <WebView
                    style={{ flex: 1 }}
                    source={{ uri: url }}
                    renderLoading={() => {
                        return (
                            <ActivityIndicator
                                animating
                                style={{ flex: 1 }}
                                color="#00243F"
                                size={'large'}
                            />
                        )
                    }}
                    onNavigationStateChange={(navState) => {
                        if (!navState.url.includes('react-js-navigation')) {
                            this.state.url = navState.url
                            if (navState.url.includes('favorit.ca/api/manage/oauth')) {
                                this.setState({
                                    isOnMessage: true
                                })
                            }
                        }
                    }}
                    startInLoadingState={true}
                    ref={e => this.webview = e }
                />
            </View>
        );
    }
}
