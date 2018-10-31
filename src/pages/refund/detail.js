import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import fa from '../../utils/fa'
import RefundModel from '../../models/refund'

const Dialog = require('../../../ui/dialog/dialog');

const refundModel = new RefundModel()

export default class Index extends Component {
    state = {
        id: null,
        refundInfo: null,
    }

    async componentWillMount({ id }) {
        this.setState({
            id
        })
    }

    async onShow() {
        this.init()
    }

    async init() {
        const refundInfo = await refundModel.info({ id: this.state.id })
        if (refundInfo) {
            console.log(refundInfo)
            this.setState({
                refundInfo,
            })
        }
    }

    onGoods() {
        wx.navigateTo({
            url: `/pages/goods/detail/index?id=${this.state.refundInfo.goods_id}`
        })
    }

    onTrack() {
        wx.navigateTo({
            url: `/pages/refund/logisticsFill/index?id=${this.state.id}&order_goods_id=${this.state.refundInfo.order_goods_id}`
        })
    }

    async onUndo() {
        Dialog({
            title: '撤销申请',
            message: '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？',
            selector: '#fa-dialog-receive',
            buttons: [{
                text: '取消',
                type: 'cancel'
            }, {
                text: '确认',
                color: 'red',
                type: 'ok'
            }]
        }).then(async ({ type }) => {
            if (type === 'ok') {
                const result = await refundModel.revoke({ id: this.state.id })
                if (result) {
                    this.init()
                } else {
                    fa.cache.toast({
                        title: fa.code.parse(refundModel.getException().getCode())
                    })
                }
            }
        })
    }

    updateListRow() {
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        return <View>
            <View>
                <List>
                    <RefundStateCard refundInfo={refundInfo} />
                    <RefundStateReason refundInfo={refundInfo} onUndo={() => this.onUndo()}
                                       onTrack={() => this.onTrack()} />
                </List>
                <List>
                    <RefundGoodsInfo refundInfo={refundInfo} onGoods={() => this.onGoods()} />
                </List>
                <List>
                    <RefundBaseInfo refundInfo={refundInfo} />
                    <OrderContact />
                </List>
            </View>
            <fa-dialog id="fa-dialog-receive" />
        </View>
    }
}
