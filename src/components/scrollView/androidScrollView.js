import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';
import {
    LottieAndroidRefreshControl,
} from "../refreshControl";

export default class AndroidScrollView extends Component {
    render() {
        return (
            <ScrollView
                refreshControl={(<LottieAndroidRefreshControl />)}
            >
                {
                    this.props.children
                }
            </ScrollView>
        )
    }
}