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
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
    };
    static defaultProps = {
        name: null,
        phone: null,
        address: null,
    };

    render() {
        const { name ,phone,address} = this.props

        return <View style={styles.orderAddress}>
            <View style={styles.info}>
                <View style={styles.user}>
                    <Image source={require('../../images/order/buyer-address.png')} resizeMode="stretch" />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
                <View style={styles.address}>
                    <Text>地址：{address}</Text>
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    "order_address": {
        "padding": "15px",
        "display": "flex"
    },
    "order_address_image": {
        "width": "20px",
        "height": "20px",
        "marginRight": "10px"
    },
    "order_address__info": {},
    "order_address__info__user": {
        "display": "flex",
        "alignItems": "center",
        "marginBottom": "10px"
    },
    "order_address__info__user__name": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "marginRight": "15px",
        "lineHeight": "14px",
        "display": "block"
    },
    "order_address__info__user__phone": {
        "fontSize": "14px",
        "fontWeight": "bold",
        "marginRight": "15px",
        "lineHeight": "14px",
        "display": "block"
    },
    "order_address__info__address": {
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block",
        "color": "#999999",
        "marginLeft": "30px"
    }
})
