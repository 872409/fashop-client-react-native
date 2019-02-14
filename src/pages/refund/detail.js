import React, { Component } from 'react';
import { View } from 'react-native';
import { Modal } from 'antd-mobile-rn';
import { RefundStateCard, RefundStateReason, RefundGoodsInfo, RefundBaseInfo } from '../../components'
import { PublicStyles } from "../../utils/style";
import { StackActions } from "react-navigation";
import { connect } from 'react-redux';

@connect(({ refund })=>({
    refundInfo: refund.info.result
}))
export default class RefundDetail extends Component {
    componentWillMount() {
        this.props.navigation.addListener(
            'didFocus', this.init
        );
    }

    init = () => {
        this.props.dispatch({
            type: 'refund/info'
        })
    }

    onGoods() {
        const { refundInfo, navigation } = this.props
        navigation.navigate('GoodsDetail', { 
            id: refundInfo.goods_id 
        })
    }

    onTrack() {
        const { refundInfo, navigation } = this.props
        const { id } = navigation.state.params
        navigation.navigate('RefundLogisticsFill', {
            id,
            order_goods_id: refundInfo.order_goods_id
        })

    }

    onUndo() {
        Modal.alert('撤销申请', '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: () => {
                    const { dispatch, navigation } = this.props
                    const { id } = navigation.state.params
                    dispatch({
                        type: 'refund/revoke',
                        payload: {
                            id
                        },
                        callback: this.init
                    })
                }
            }
        ])
    }

    updateListRow = () => {
        const { navigation } = this.props
        const { id, updateListRow } = navigation.state.params
        if (id > 0) {
            navigation.dispatch(StackActions.pop({ n: 1 }));
            if (typeof updateListRow === 'function') {
                updateListRow(id)
            }
        }
    }

    render() {
        const { refundInfo } = this.props
        return refundInfo ? <View style={[PublicStyles.ViewMax]}>
            <View>
                <View style={{ marginBottom: 8 }}>
                    <RefundStateCard
                        refundInfo={refundInfo}
                    />
                    <RefundStateReason
                        refundInfo={refundInfo}
                        onUndo={() => {
                            this.onUndo()
                        }}
                        onTrack={() => {
                            this.onTrack()
                        }}
                    />
                </View>
                <View style={{ marginBottom: 8 }}>
                    <RefundGoodsInfo
                        refundInfo={refundInfo}
                        onGoods={() => {
                            this.onGoods()
                        }} />
                </View>
                <View>
                    <RefundBaseInfo
                        reason={refundInfo.user_reason}
                        amount={refundInfo.refund_amount}
                        num={refundInfo.goods_num}
                        createTime={refundInfo.create_time}
                        refundNumber={refundInfo.refund_sn}
                    />
                </View>
            </View>
        </View> : null
    }
}
