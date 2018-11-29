import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import { ThemeStyle, windowWidth } from '../../utils/style';
import { NetworkImage } from "../theme";

export default class GoodsItem extends Component {
    render() {
        const { data, index, onPress } = this.props;
        return <TouchableOpacity
            onPress={onPress}
            style={[styles.item,{
                marginRight: index % 2 === 0 ? 10 : 0
            }]}
        >
            <NetworkImage style={styles.img} source={{ uri: data.img }} />
            <View style={styles.bot}>
                <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                <Text style={styles.price}>￥{data.price}</Text>
            </View>
        </TouchableOpacity>
    }
}

const itemWidth = (windowWidth - 10) / 2;

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginBottom: 10,
    },
    img: {
        width: itemWidth,
        height: itemWidth,
    },
    bot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    title: {
        marginVertical: 6,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        height: 40
    },
    price: {
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },
});
