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
const Item = List.Item
const refundModel = new RefundModel()
export default class Index extends Component {
    state = {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    }
    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {
                this.setState({
                    page: 1
                })
                this.getList()
            }
        );
    }
    async getList() {
        // todo
        const page = this.state.page
        if (page > 1 && this.state.noMore === true) {
            return
        }
        const rows = this.state.rows
        const list = page === 1 ? [] : this.state.list
        let requestParam = { page, rows }

        const result = await refundModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setState(data)
        }
    }

    async onReachBottom() {
        // todo
        if (this.state.noMore === true) {
            return false
        } else {
            this.getList()
        }
    }
    onDetail(id) {
        // todo id
        this.props.navigation.navigate('RefundDetail',{id})
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
        const {list} = this.state
        return <View>
            {
                list.length > 0 ? <List>
                    {list.map((item) => {
                        return <Item><RefundCard refundInfo={item} onClick={() => this.onDetail(item)} /></Item>
                    })}
                </List> : <View style={styles.listEmpty}>
                    <Image source={require('../../images/order/list-empty.png')} resizeMode={'contain'} />
                    <Text>暂无相关数据</Text>
                </View>
            }
        </View>
    }
}
