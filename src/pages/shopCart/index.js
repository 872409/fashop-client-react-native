import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { PublicStyles } from '../../utils/PublicStyleModule'

@connect(
    ({
        app: {
            location: {
                provinceData,
            }
        }
    }) => ({
        provinceData,
    }),
)
export default class ShopCart extends Component {
    render() {
        return <View style={PublicStyles.ViewMax}>
            <Text>购物车</Text>
        </View>;
    }
}

const styles = StyleSheet.create({

})
