import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import RefundModel from '../../models/refund'

const refundModel = new RefundModel()
export default class Index extends Component {
    state = {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    }
,

    async onShow() {
        this.setState({
            page: 1
        })
        this.getList()
    }

,

    async getList() {
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

,

    async onReachBottom() {
        if (this.state.noMore === true) {
            return false
        } else {
            this.getList()
        }
    }

,

    onDetail(e) {
        wx.navigateTo({
            url: '/pages/refund/detail/index?id=' + e.detail.refundInfo.id
        })
    }

,

    // 更新某条
    async updateListRow(id) {
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
        return <View style="background-color:#F8F8F8;display: block;overflow: hidden">
            <block wx:for="{{list}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                <List>
                    <RefundCard refundInfo={item} bind:click="onDetail" />
                </List>
            </block>
            <block wx:if="{{list.length===0}}">
                <View style={styles.list - empty}>
                    <Image source={require('../../images/order/list-empty.png')} resizeMode={'contain'} />
                    <Text>暂无相关数据</Text>
                </View>
            </block>
        </View>
    }
}
