import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { PublicStyles } from '../../utils/style';
import { GoodsCollectApi } from "../../config/api/goodsCollect";
import FlatList from "../../components/flatList";
import GoodsRowItem from "../../components/goods/rowItem";
import { SwipeAction } from 'antd-mobile-rn';
import { connect } from 'react-redux'

@connect()
export default class GoodsCollect extends Component {
    render() {
        return <View style={PublicStyles.ViewMax}>
            <FlatList
                ref={e => this.FlatList = e}
                keyExtractor={e => String(e.id)}
                api={GoodsCollectApi.list}
                renderItem={this.renderItem}
            />
        </View>
    }
    renderItem = ({ item, index }) => (
        <SwipeAction
            autoClose
            right={[
                {
                    text: '移出收藏',
                    onPress: () => this.props.dispatch({
                        type: 'goodsCollect/del',
                        payload: {
                            goods_id: item.id
                        },
                        callback: ()=>this.FlatList.manuallyRefresh()
                    }),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                }
            ]}
        >
            <GoodsRowItem
                data={item}
                index={index}
                onPress={() => {
                    this.props.navigation.navigate("GoodsDetail", {
                        id: item.id
                    });
                }}
            />
        </SwipeAction>
    )
}
const styles = StyleSheet.create({
    
})
