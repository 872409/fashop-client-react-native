import React, { Component } from 'react';
import { ScrollView } from 'react-native-mjrefresh'
import {
    LottieIosRefreshControl,
} from "../refreshControl";

export default class IosScrollView extends Component {
    render() {
        return (
            <ScrollView
                refreshControl={(<LottieIosRefreshControl />)}
            >
                {
                    this.props.children
                }
            </ScrollView>
        )
    }
}