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
import { List, Modal } from 'antd-mobile-rn';
import { RefundStateCard, RefundStateReason, RefundGoodsInfo, RefundBaseInfo, OrderContact } from '../../components'

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

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {
                this.init()
            }
        );
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
        // todo
        this.props.navigation.navigate('GoodsDetail', { id: this.state.refundInfo.goods_id })
    }

    onTrack() {

        this.props.navigation.navigate('RefundLogisticsFill', {
            id: this.state.id,
            order_goods_id: this.state.refundInfo.order_goods_id
        })

    }

    async onUndo() {
        Modal.alert('撤销申请', '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => async () => {
                    const result = await refundModel.revoke({ id: this.state.id })
                    if (result) {
                        this.init()
                    } else {
                        fa.cache.toast({
                            title: fa.code.parse(refundModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }

    updateListRow() {
        // todo
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        const { refundInfo } = this.state
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
        </View>
    }
}
