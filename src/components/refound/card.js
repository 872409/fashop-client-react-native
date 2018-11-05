import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";
import { RefoundGoodsCard } from '../../components'

export default class Index extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const { refundInfo } = this.props
        return <View style={styles.refundCard}>
            <View style={styles.header} onClick={() => {
                this.onClick()
            }}>
                <RefoundGoodsCard
                    goodsTitle={refundInfo.goods_title}
                    goodsImg={refundInfo.goods_img}
                    goodsSpec={refundInfo.goods_spec_string}
                    goodsNum={refundInfo.goods_num}
                />
            </View>
            <View style={styles.body} onClick={() => {
                this.onClick()
            }}>
                <!--平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)-->
                <!--申请类型:1为仅退款,2为退货退款,默认为1-->
                <View style={styles.icon}>
                    {
                        refundInfo.handle_state === 30 || refundInfo.handle_state === 51 ?
                            <Image source={require('../../images/refund/refund-success.png')} resizeMode={'contain'}
                            />
                            : <Image source={require('../../images/refund/refund-ing.png')} resizeMode={'contain'} />
                    }
                </View>
                <Text>{refundInfo.refund_type === 1 ? '仅退款' : '退货退款'}</Text>
                {refundInfo.handle_state === 30 ? <Text>退款完成</Text> : null}
                {refundInfo.handle_state === 50 ? <Text>已撤销退款申请</Text> : null}
                {refundInfo.handle_state === 51 ? <Text>确认收货，自动关闭退款申请</Text> : null}
                {refundInfo.is_close === 1 ? <Text>退款关闭</Text> : null}

                {refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 ?
                    <View>
                        <Text>待买家发货 还剩</Text>
                        <StaticCountdown countdown={refundInfo.send_expiry_seconds} format="dd天hh时mm分" />
                    </View> : null}

                {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View>
                    <Text>退款待处理 还剩</Text>
                    <StaticCountdown countdown={refundInfo.handle_expiry_seconds} format="dd天hh时mm分" />
                </View> : null}
            </View>
            <View style={styles.footer}>
                <OrderButton text="查看详情" onClick={() => {
                    this.onClick()
                }} />
            </View>
        </View>

    }
}
