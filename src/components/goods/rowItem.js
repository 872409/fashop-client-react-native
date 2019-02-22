import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ThemeStyle, windowWidth } from '../../utils/style';
import { NetworkImage } from "../theme";

export default class GoodsItem extends Component {
    render() {
        const { data, index, onPress } = this.props;
        return <TouchableOpacity
            onPress={onPress}
            style={styles.itemWarp}
        >
            <View style={[styles.item,{borderTopWidth: index===0 ? 0 : .5}]}>
                <NetworkImage style={styles.img} source={{ uri: data.img }} />
                <View style={styles.right}>
                    <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.price}>￥{data.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    itemWarp: {
        width: windowWidth,
        backgroundColor: '#fff',
        paddingLeft: 15,
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#eaeaea',
    },
    img: {
        width: 75,
        height: 75,
        marginRight: 10,
    },
    right: {
        flex: 1
    },
    title: {
        marginVertical: 5,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        height: 40
    },
    price: {
        color: ThemeStyle.ThemeColor,
        fontWeight: '500',
        fontFamily: 'PingFangSC-Medium',
    },
});
