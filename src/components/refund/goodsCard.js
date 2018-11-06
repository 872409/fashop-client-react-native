import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundGoodsCard extends Component {
    static propTypes = {
        goodsTitle: PropTypes.string,
        goodsImg: PropTypes.string,
        goodsNum: PropTypes.string,
        goodsSpec: PropTypes.string,
    };
    static defaultProps = {
        goodsTitle: null,
        goodsImg: null,
        goodsNum: null,
        goodsSpec: null,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            goodsTitle,
            goodsImg,
            goodsNum,
            goodsSpec,
        } = this.props
        return <View style={styles.refundGoodsCard}>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <Image source={{ uri: goodsImg }} resizeMode={'contain'} />
                        </View>
                        <View style={styles.body}>
                            <Text>{goodsTitle}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{goodsSpec}</Text>
                                <Text style={styles.number}>x {goodsNum}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    }
}
