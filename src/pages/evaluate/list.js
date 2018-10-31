import GoodsEvaluateModel from '../../../models/goodsEvaluate'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const goodsEvaluateModel = new GoodsEvaluateModel()

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';

export default class Index extends Component{
    state = {
        page: 1,
        rows: 10,
        noMore: false,
        order_id: 0,
        evaluate_state: 'un_evaluate',
        stateTabs: [
            {
                id: 'un_evaluate',
                title: '待评价'
            },
            {
                id: 'is_evaluate',
                title: '已评价'
            }
        ],
        list: [],
    }
    async componentWillMount({ order_id = 0, evaluate_state = 'un_evaluate' }) {
        if (order_id > 0) {
            this.setState({
                order_id,
                evaluate_state
            })
        }
        this.getList()
    }
    async getList() {
        const page = this.state.page
        if (page > 1 && this.state.noMore === true) {
            return
        }
        const rows = this.state.rows
        const list = page === 1 ? [] : this.state.list
        let requestParam = { page, rows }
        if (this.state.order_id > 0) {
            requestParam['order_id'] = this.state.order_id
        }
        requestParam['evaluate_state'] = this.state.evaluate_state

        const result = await goodsEvaluateModel.mine(requestParam)
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
        if (this.state.noMore === true) {
            return false
        } else {
            this.getList()
        }
    }
    onGoods(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.detail.goodsId
        })
    }
    onDetail(e) {
        wx.navigateTo({
            url: '/pages/evaluate/detail/index?order_goods_id=' + e.detail.orderGoodsId
        })
    }
    onAdd(e) {
        wx.navigateTo({
            url: '/pages/evaluate/add/index?order_goods_id=' + e.detail.orderGoodsId
        })
    }
    onAdditional(e) {
        wx.navigateTo({
            url: '/pages/evaluate/additional/index?order_goods_id=' + e.detail.orderGoodsId
        })
    }
    onTabChange(e) {
        this.setState({
            evaluate_state: e.detail,
            page: 1,
            list: []
        })
        this.getList()
    }
    // 更新某条
    async updateListRow(id) {
        let { list } = this.state
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await goodsEvaluateModel.mine(requestParam)
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
        return (
            <View style="background-color:#F8F8F8;display: block;overflow: hidden">
                <Tabs
                    list="{{ stateTabs }}"
                    selected-id="{{evaluate_state}}"
                    height="40"
                    fixed={true}
                    bindtabchange="onTabChange"
                />
                <View>
                    <block wx:for="{{list}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                        <evaluate-card
                            goodsInfo="{{item}}"
                            bind:goods="onGoods"
                            bind:add="onAdd"
                            bind:detail="onDetail"
                            bind:additional="onAdditional"
                        ></evaluate-card>
                    </block>
                </View>
                <block wx:if="{{list.length===0}}">
                    <View style={styles.list-empty} >
                        <Image source={require('../../images/order/list-empty.png')} resizeMode={'contain'}></image>
                        <Text>暂无相关数据</Text>
                    </View>
                </block>
            </View>
        );
    }

}
