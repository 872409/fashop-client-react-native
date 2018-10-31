import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
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
        return <View>
            <!--平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)-->
            <View class="order-state-card">
                {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View>
                    <View class="left">
                        <Text class="state">请等待商家处理</Text>
                    </View>
                    <View class="right">
                        <Text>还剩</Text>
                        <common-static-countdown countdown={refundInfo.handle_expiry_seconds} format="dd天hh时mm分" />
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
                                <common-static-countdown countdown={refundInfo.send_expiry_seconds} format="dd天hh时mm分" />
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
                            <time-format value={refundInfo.handle_time} />
                        </Text>
                    </View>
                </View> : null}
                {refundInfo.is_close === 1 ? <View>
                    <View class="left">
                        <Text class="state">退款关闭</Text>
                    </View>
                    <View class="right">
                        <Text>
                            <time-format value={refundInfo.handle_time} />
                        </Text>
                    </View>
                </View> : null}
            </View>
        </View>
    }
}
