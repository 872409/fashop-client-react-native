import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { List } from 'antd-mobile-rn';
import { RefundCard } from '../../components'

import RefundModel from '../../models/refund'
import { ListEmptyView, ListView } from "../../utils/publicViewModule";
import { windowHeight } from "../../utils/publicStyleModule";
import { RefundApi } from "../../config/api/refund";

const Item = List.Item
const refundModel = new RefundModel()
export default class Index extends Component {
    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {

            }
        );
    }

    onDetail(id) {
        this.props.navigation.navigate('RefundDetail', { id })
    }

    // 更新某条
    async updateListRow(id) {
        // todo
        let { list } = this.state
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await refundModel.list(requestParam)
            if (result) {
                if (result.list.length === 0) {
                    list = list.splice(listIndex, 1)
                } else {
                    list[listIndex] = result.list[0]
                }
                this.setState({ list })
            }
        }
    }

    render() {
        return <List>
            <ListView
                api={RefundApi.list}
                renderItem={item => (
                    <Item><RefundCard refundInfo={item} onClick={() => this.onDetail(item.id)} /></Item>
                )}
                ListEmptyComponent={() => (
                    <ListEmptyView
                        height={windowHeight - 80}
                        uri={require('../../images/order/list-empty.png')}
                        desc='暂无相关数据'
                    />
                )}
            >
            </ListView>
        </List>
    }
}
