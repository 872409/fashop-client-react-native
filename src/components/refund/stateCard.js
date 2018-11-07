import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundStateCard extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    render() {
        const {
            refundInfo,
        } = this.props
        // <!--平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)-->
        return <View>
            <View class="order-state-card">
                {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View>
                    <View class="left">
                        <Text class="state">请等待商家处理</Text>
                    </View>
                    <View class="right">
                        <Text>还剩</Text>
                        <StaticCountdown countdown={refundInfo.handle_expiry_seconds} format="dd天hh时mm分" />
                    </View>
                </View> : null}
                {refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 ?
                    <View>
                        {!refundInfo.tracking_time ? <View>
                            <View class="left">
                                <Text class="state">请退货并填写物流信息</Text>
                            </View>
                            <View class="right">
                                <Text>还剩</Text>
                                <StaticCountdown countdown={refundInfo.send_expiry_seconds} format="dd天hh时mm分" />
                            </View>
                        </View> : null}
                        {refundInfo.tracking_time > 0 ? <View>
                            <View class="left">
                                <Text class="state">等待商家确认收货中</Text>
                            </View>
                            <View class="right">
                            </View>
                        </View> : null}
                    </View> : null}

                {refundInfo.handle_state === 30 ? <View>
                    <View class="left">
                        <Text class="state">退款成功</Text>
                    </View>
                    <View class="right">
                        <Text>
                            <TimeFormat value={refundInfo.handle_time} />
                        </Text>
                    </View>
                </View> : null}
                {refundInfo.is_close === 1 ? <View>
                    <View class="left">
                        <Text class="state">退款关闭</Text>
                    </View>
                    <View class="right">
                        <Text>
                            <TimeFormat value={refundInfo.handle_time} />
                        </Text>
                    </View>
                </View> : null}
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    "order_state_card": {
        "padding": "15px",
        "height": "50px",
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
        "backgroundColor": "#FF635C",
        "color": "#FFFFFF"
    },
    "common_static_countdown": {
        "fontSize": "14px"
    },
    "order_state_card__left": {
        "display": "flex",
        "justifyContent": "flex-start",
        "alignItems": "center"
    },
    "order_state_card__left_image": {
        "width": "30px",
        "height": "30px",
        "marginRight": "10px"
    },
    "order_state_card__left_text": {
        "fontSize": "18px",
        "fontWeight": "bold",
        "color": "#FFFFFF"
    },
    "order_state_card__right": {
        "display": "flex",
        "textAlign": "right",
        "flexDirection": "column"
    },
    "order_state_card__right_text": {
        "color": "#FFFFFF",
        "fontSize": "14px",
        "lineHeight": "14px",
        "display": "block"
    },
    "order_state_card__right_label": {
        "color": "#FFFFFF",
        "fontSize": "12px",
        "lineHeight": "12px",
        "display": "block",
        "marginTop": "6px"
    },
    "noticebar": {
        "display": "flex",
        "justifyContent": "flex-start",
        "alignItems": "center",
        "backgroundColor": "#FFFFCC",
        "padding": "10px"
    },
    "noticebar_image": {
        "width": "20px",
        "height": "20px",
        "marginRight": "10px"
    },
    "noticebar_text": {
        "fontSize": "12px",
        "lineHeight": "16px",
        "display": "block",
        "color": "#F07B3F"
    }
})
