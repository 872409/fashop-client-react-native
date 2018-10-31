import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static propTypes = {
        orderState: PropTypes.number,
        expireSeconds: PropTypes.number,
        cost: PropTypes.number,
    };
    static defaultProps = {
        orderState: null,
        expireSeconds: null,
        cost: null,
    };

    componentDidMount() {
        const { expireSeconds } = this.props
        this.setState({
            timeText: this.toHourMinute(expireSeconds)
        })
    }

    // 将分钟数量转换为小时和分钟字符串
    toHourMinute(seconds) {
        return (Math.floor(seconds / 3600) + "小时" + Math.floor(seconds % 3600 / 60) + "分");
    }

    render() {
        const {
            orderState,
            cost,
        } = this.props
        return <View>
            {orderState === 40 ? <View>
                <View style={styles.noticebar}>
                    <Image source={require('../../images/order/horn.png')} resizeMode="widthFix" />
                    <Text>为了您的财产安全，不要点击陌生链接、不要向任何人透露银行卡或验证码信息、谨防诈骗！</Text>
                </View>
            </View> : null}
            <View style={styles.orderStateCard}>
                {orderState === 10 ? <View>
                    <View style={styles.left}>
                        <Image source={require('../../images/order/order-state-wait.png')} resizeMode="stretch" />
                        <Text style={styles.state}>待付款</Text>
                    </View>
                    <View style={styles.right}>
                        <Text>需付款：¥{{ cost }}</Text>
                    </View>
                </View> : null}
                {orderState === 20 ? <View>
                    <View style={styles.left}>
                        <Image source={require('../../images/order/order-state-wait.png')} resizeMode="stretch" />
                        <Text style={styles.state}>待发货</Text>
                    </View>
                    <View style={styles.right}>
                    </View>
                </View> : null}
                {orderState === 30 ? <View>
                    <View style={styles.left}>
                        <Image source={require('../../images/order/order-state-wait.png')} resizeMode="stretch" />
                        <Text style={styles.state}>待收货</Text>
                    </View>
                </View> : null}
                {orderState === 40 ? <View>
                    <View style={styles.left}>
                        <Image source={require('../../images/order/order-state-success.png')} resizeMode="stretch" />
                        <Text style={styles.state}>完成</Text>
                    </View>
                    <View style={styles.right}>
                    </View>
                </View> : null}
            </View>
        </View>
    }
}
