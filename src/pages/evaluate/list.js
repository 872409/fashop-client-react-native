import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import GoodsEvaluateModel from '../../models/goodsEvaluate'
import { Tabs } from 'antd-mobile-rn';
import { EvaluateCard } from '../../components'
import { ListEmptyView, ListView } from "../../utils/publicViewModule";
import { windowHeight } from "../../utils/publicStyleModule";
import { GoodsEvaluateApi } from "../../config/api/goodsEvaluate";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

const goodsEvaluateModel = new GoodsEvaluateModel()

export default class EvaluateList extends Component {
    state = {
        order_id: 0,
    }

    async componentWillMount() {
        const order_id = this.props.navigation.getItem('order_id')
        if (order_id > 0) {
            this.setState({
                order_id
            })
        }
    }

    onGoods(id) {
        this.props.navigation.navigate('GoodsDetail', { id })
    }

    onDetail(order_goods_id) {
        this.props.navigation.navigate('EvaluateDetail', { order_goods_id })

    }

    onAdd(order_goods_id) {
        this.props.navigation.navigate('EvaluateAdd', { order_goods_id })
    }

    onAdditional(order_goods_id) {
        this.props.navigation.navigate('EvaluateAdditional', { order_goods_id })
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
        const tabList = [
            {
                state: 'un_evaluate',
                tabLabel: '待评价',
            }, {
                state: 'is_evaluate',
                tabLabel: '已评价',
            }
        ]
        return (
            <View style={[PublicStyles.ViewMax]}>
                <ScrollableTabView
                    style={{ backgroundColor: '#fff', flex: 0 }}
                    initialPage={0}
                    renderTabBar={() =>
                        <DefaultTabBar
                            style={{
                                borderWidth: 0,
                                borderColor: 'rgba(0,0,0,0)'
                            }}
                            tabStyle={{ paddingBottom: 0 }}
                        />
                    }
                    tabBarActiveTextColor={ThemeStyle.ThemeColor}
                    tabBarInactiveTextColor='#666'
                    tabBarUnderlineStyle={{
                        width: windowWidth * 0.75 / 4,
                        left: windowWidth / 14,
                        backgroundColor: `${ThemeStyle.ThemeColor}`,
                        height: 3,
                        borderRadius: 4,
                    }}
                    tabBarTextStyle={{}}
                    onChangeTab={({ i }) => {
                        if (i === 0) {
                            this.ListView.setFetchParams({
                                state: 'un_evaluate',
                            })
                        } else if (i === 1) {
                            this.ListView.setFetchParams({
                                state: 'is_evaluate',
                            })
                        }
                    }}
                >
                    {
                        tabList.map((item, index) => (
                            <View
                                key={index}
                                tabLabel={item.tabLabel}
                            />
                        ))
                    }
                </ScrollableTabView>
                <List>
                    <ListView
                        ref={e => this.ListView = e}
                        keyExtractor={e => String(e.state)}
                        api={GoodsEvaluateApi.list}
                        renderItem={item => (
                            <EvaluateCard
                                goodsInfo={item}
                                onGoods={() => this.onGoods()}
                                onAdd={() => this.onAdd()}
                                onDetail={() => this.onDetail()}
                                onAdditional={() => this.onAdditional()}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <ListEmptyView
                                height={windowHeight - 80}
                                uri={require('../../images/order/list-empty.png')}
                                desc='暂无相关数据'
                            />
                        )}
                    />
                </List>
            </View>
        );
    }

}
