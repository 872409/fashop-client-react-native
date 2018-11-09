import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class RefundGoodsInfo extends Component {
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
                            <Image source={{ uri: refundInfo.goods_img }} resizeMode={'contain'} style={{width: 60,
                                height: 60}} />
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
const styles = StyleSheet.create({
    refundGoodsInfo: {},
    header: {
        fontSize: 14,
        fontWeight: "800",
        padding: "15px 15px 0 15px"
    },
    item: {
        padding: 15,
        borderBottomWidth:1,
        borderStyle:"solid",
        borderBottomColor:"#F8F8F8",
    },
    content: {
        justifyContent: "flex-start"
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },

    body: {
        flex:1
    },
    text: {
        fontSize: 12,
        color: "#333",
        lineHeight: 18,
    },
    end: {
        justifyContent: "space-between",
        marginTop: 5,
        fontSize: 12,
        color: "#999999",
        lineHeight: 12,
        alignItems: "center"
    },
    spec: {
        color: "#999999",
    },
    number: {

    },
    footer: {
        justifyContent: "flex-end"
    }
})
