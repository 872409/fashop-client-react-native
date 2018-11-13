import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { RefundCard } from '../../components'

import RefundModel from '../../models/refund'
import { ListEmptyView, ListView } from "../../utils/publicViewModule";
import { PublicStyles, windowHeight } from "../../utils/publicStyleModule";
import { RefundApi } from "../../config/api/refund";

const refundModel = new RefundModel()
export default class RefundList extends Component {
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
        return <View style={[PublicStyles.ViewMax]}>
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                api={RefundApi.list}
                renderItem={({ item }) => (
                    <View style={{marginBottom: 8}}>
                        <RefundCard
                            refundInfo={item}
                            onClick={
                                () => {
                                    this.onDetail(item.id)
                                }}
                        />
                    </View>
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
        </View>
    }
}
const styles = StyleSheet.create({})
