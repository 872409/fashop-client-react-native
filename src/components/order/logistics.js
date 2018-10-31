import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        dataSource: PropTypes.object,
        justifyContent: PropTypes.object,
    };
    static defaultProps = {
        dataSource: null,
        justifyContent: {
            left: 'flex-start',
            right: 'flex-end',
            center: 'center'
        }
    };

    onMaskClick() {
        if (this.state.cancelWithMask) {
            this.cancelClick();
        }
    }

    cancelClick() {
        this.triggerEvent('cancel');
    }

    handleBtnClick({ currentTarget = {} }) {
        const dataset = currentTarget.dataset || {};
        const { index } = dataset;
        this.triggerEvent('actionclick', { index });
    }
    render(){
        return <View className="page-column-title">
            <details
                style="justify-content:{{justifyContent[dataSource.options.align]}};background-color: {{dataSource.options.background_color}}">
                <image src="{{dataSource.options.leading_image.url}}" mode="aspectFit" />
                <text style="color:{{dataSource.options.font_color}}">{{ dataSource.options.title}}</text>
            </details>
        </View>
    }
}
