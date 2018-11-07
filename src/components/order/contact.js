import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class Index extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return <View style={styles.orderContact}>
            <Image source={require('../../images/order/customer-service.png')} resizeMode="stretch" />
            <Text>联系客服</Text>
        </View>
    }

}
const styles = StyleSheet.create({
    "order_contact": {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "padding": "15px 0"
    },
    "order_contact_image": {
        "width": "20px",
        "height": "20px",
        "marginRight": "10px"
    },
    "order_contact_text": {
        "fontSize": "14px",
        "color": "#666"
    },
    "kf_button": {
        "position": "relative",
        "marginLeft": "initial",
        "marginRight": "initial",
        "paddingLeft": "initial",
        "paddingRight": "initial",
        "boxSizing": "initial",
        "fontSize": "initial",
        "textAlign": "initial",
        "textDecoration": "initial",
        "lineHeight": "initial",
        "WebkitTapHighlightColor": "initial",
        "overflow": "initial",
        "color": "initial",
        "backgroundColor": "initial",
        "borderRadius": "0",
        "border": "none"
    },
    "kf_button_after": {
        "border": "none"
    },
    "kf_button_prev": {
        "backgroundColor": "initial",
        "color": "initial"
    }
})
