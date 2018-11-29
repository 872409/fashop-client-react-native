import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    SafeAreaView, TouchableOpacity
} from 'react-native';
import { PublicStyles, ThemeStyle, windowWidth } from '../../utils/style';
import { GoodsCollectApi } from "../../config/api/goodsCollect";
import { ListView } from "../../utils/view";
import { NetworkImage } from "../../components/theme"

export default class GoodsCollect extends Component {
    small({ item, index }) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.goDetail(item.id)}
                style={
                    index % 2 === 0 ? {
                        marginRight: 10,
                        width: (windowWidth - 10 - 30) / 2,
                        marginBottom: 10,
                    } : {
                        width: (windowWidth - 10 - 30) / 2,
                        marginBottom: 10,
                    }
                }
            >
                <NetworkImage style={styles.smallImg} source={{ uri: item.img }} />
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{item.title}</Text>
                    <View>
                        <Text style={styles.smallPriceText}>{`￥${item.price}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    goDetail(id) {
        this.props.navigation.navigate('GoodsDetail', {
            id
        })
    }

    render() {
        return <View style={[PublicStyles.ViewMax,{padding:15}]}>
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                api={GoodsCollectApi.list}
                numColumns={2}
                renderItem={({ item ,index}) => {
                    const params = {
                        item,
                        index,
                    }
                    return this.small(params)
                }}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    // warp
    goodsListWarp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
    },
    // small
    smallImg: {
        width: (windowWidth - 40) / 2,
        height: (windowWidth - 40) / 2,
    },
    smallBot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    smallTitle: {
        marginVertical: 6,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        height: 40
    },
    smallMarketPriceText: {
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through'
    },
    smallPriceText: {
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },
})
