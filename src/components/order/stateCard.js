import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class OrderStateCard extends Component {
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
                    <Image style={styles.noticebarImage} source={require('../../images/order/horn.png')} resizeMode="widthFix" />
                    <Text style={styles.noticebarText}>为了您的财产安全，不要点击陌生链接、不要向任何人透露银行卡或验证码信息、谨防诈骗！</Text>
                </View>
            </View> : null}
            <View style={styles.orderStateCard}>
                {orderState === 10 ? <View>
                    <View style={styles.left}>
                        <Image style={styles.leftImage} source={require('../../images/order/order-state-wait.png')} resizeMode="stretch" />
                        <Text style={styles.leftText}>待付款</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.rightText}>需付款：¥{{ cost }}</Text>
                    </View>
                </View> : null}
                {orderState === 20 ? <View>
                    <View style={styles.left}>
                        <Image style={styles.leftImage} source={require('../../images/order/order-state-wait.png')} resizeMode="stretch" />
                        <Text style={styles.leftText}>待发货</Text>
                    </View>
                    <View style={styles.right}>
                    </View>
                </View> : null}
                {orderState === 30 ? <View>
                    <View style={styles.left}>
                        <Image style={styles.leftImage} source={require('../../images/order/order-state-wait.png')} resizeMode="stretch" />
                        <Text style={styles.leftText}>待收货</Text>
                    </View>
                </View> : null}
                {orderState === 40 ? <View>
                    <View style={styles.left}>
                        <Image style={styles.leftImage} source={require('../../images/order/order-state-success.png')} resizeMode="stretch" />
                        <Text style={styles.leftText}>完成</Text>
                    </View>
                    <View style={styles.right}>
                    </View>
                </View> : null}
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    orderStateCard: {
        padding: 15,
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FF635C",
        color: "#FFFFFF"
    },
    left: {
        justifyContent: "flex-start",
        alignItems: "center"
    },
    leftImage: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    laftText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF"
    },
    right: {
        textAlign: "right",
        flexDirection: "column"
    },
    rightText: {
        color: "#FFFFFF",
        fontSize: 14,
        lineHeight: 14,
    },
    rightLabel: {
        color: "#FFFFFF",
        fontSize: 12,
        lineHeight: 12,
        marginTop: 6
    },
    noticebar: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFFFCC",
        padding: 10
    },
    noticebarImage: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    noticebarText: {
        fontSize: 12,
        lineHeight: 16,
        color: "#F07B3F"
    }
})
