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
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onGoods() {
        if (this.props.onGoods) {
            this.props.onGoods();
        }
    }

    render() {
        const {
            refundInfo,
        } = this.props
        return <View style={styles.refundGoodsInfo}>
            <View style={styles.header}>退款信息</View>
            <View style={styles.body}>
                <View style={styles.item} onPress={this.onGoods()}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <Image source={{ uri: refundInfo.goods_img }} resizeMode={'contain'} />
                        </View>
                        <View style={styles.body}>
                            <Text>{refundInfo.goods_title}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{refundInfo.goods_spec_string}</Text>
                                <Text style={styles.number}>x {refundInfo.goods_num}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}
