import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";
import { RefundStateSteps } from '../../components'

export default class Index extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onUndo() {
        if (this.props.onUndo) {
            this.props.onUndo();
        }
    }

    onTrack() {
        if (this.props.onTrack) {
            this.props.onTrack();
        }
    }

    render() {
        const {
            refundInfo
        } = this.props
        return <View style={styles.orderStateReason}>
            {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View>
                <View style={styles.header}>
                    <Text style={styles.state}>您已经成功发起退款申请，请耐心等待商家处理。</Text>
                </View>
                <View style={styles.body}>
                    <Text>- 商家同意后，请按照给出的退货地址退货，并请记录退货运单号。</Text>
                    <Text>- 如商家拒绝，您可以修改申请后再次发起，商家会重新处理。</Text>
                    <Text>- 如商家超时未处理，退货申请将达成，请按系统给出的退货地址退货</Text>
                </View>
                <View style={styles.footer}>
                    <OrderButton text="撤销申请" onClick={() => {
                        this.onUndo()
                    }} />
                </View>
            </View> : null}
            {refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 ?
                <View>
                    {refundInfo.tracking_time > 0 ? <View style={styles.body}>
                        <View style={styles.orderAddress}>
                            <View style={styles.info}>
                                <View style={styles.user}>
                                    <Text style={styles.name}>物流公司：{ refundInfo.tracking_company}</Text>
                                </View>
                                <View style={styles.address}>
                                    <Text style={styles.phone}>联系电话：{ refundInfo.tracking_phone}</Text>
                                </View>
                            </View>
                        </View>
                    </View> : null}
                    {!refundInfo.tracking_time ? <View style={styles.footer}>
                        <OrderButton text="我已寄出，点击填写物流单号" onClick={() => {
                            this.onTrack()
                        }} />
                    </View> : null}
                </View> : null}
            {refundInfo.handle_state === 30 ? <View>
                <View style={styles.refundSuccess}>
                    <View style={styles.refundInfo}>
                        <View style={styles.item}>
                            <Text>退款总金额</Text>
                            <Text>¥{ refundInfo.refund_amount}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text>返回支付方</Text>
                            <Text>¥{refundInfo.refund_amount}</Text>
                        </View>
                    </View>
                    <View style={styles.stateSteps}>
                        <RefundStateSteps refundInfo={refundInfo} />
                    </View>
                </View>
            </View> : null}
            {refundInfo.handle_state === 51 ? <View>
                <View style={styles.header}>
                    <Text style={styles.state}>确认收货，自动关闭退款申请</Text>
                </View>
            </View> : null}
        </View>
    }
}
