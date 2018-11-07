import React, { Component } from 'react';
import {
    StyleSheet,
    View,
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


    render() {
        const { justifyContent, dataSource } = this.props
        return <View style={styles.pageColumnTitle}>
            <View
                style={{
                    justifyContent: justifyContent[dataSource.options.align],
                    backgroundColor: dataSource.options.background_color
                }}
            >
                <Image source={{ uri: dataSource.options.leading_image.url }} resizeMode="aspectFit" />
                <Text style={
                    { color: dataSource.options.font_color }
                }>{dataSource.options.title}</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    "page_column_title": {
        "display": "block",
        "overflow": "hidden"
    },
    "page_column_title_details": {
        "display": "flex",
        "height": "50px",
        "padding": "0 20px",
        "alignItems": "center"
    },
    "page_column_title_details_text": {
        "fontSize": "14px",
        "fontWeight": "bold"
    },
    "page_column_title_details_image": {
        "width": "25px",
        "height": "25px",
        "marginRight": "10px"
    }
})
