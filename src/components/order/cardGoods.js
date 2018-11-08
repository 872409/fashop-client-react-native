import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class OrderCardGoods extends Component {
    static propTypes = {
        goodsList: PropTypes.array,
    };
    static defaultProps = {
        goodsList: [],
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            goodsList,
        } = this.props
        return <View>
            {goodsList.length > 1 ? <View onPress={this.onClick()}>
                <ScrollView contentContainerStyle={styles.orderCardGoods}>
                    <View>
                        {
                            goodsList.length > 0 ? goodsList.map((item) => {
                                return <View style={styles.item}>
                                    <Image source={{ uri: item.goods_img }} resizeMode={'contain'} />
                                </View>
                            }) : null}
                    </View>
                </ScrollView>
            </View> : null}
            {goodsList.length === 1 ? <View onPress={this.onClick()}>
                <View style={styles.orderCardGoodsOne}>
                    {goodsList.map((item) => {
                        return <View style={styles.oneItem}>
                            <Image style={styles.oneImage} source={{ uri: item.goods_img }} resizeMode={'contain'} />
                            <View style={styles.oneBody}>
                                <Text style={styles.oneText}>{item.goods_title}</Text>
                                <View style={styles.oneDesc}>
                                    <Text style={styles.oneDescLabel}>{item.goods_spec_string}</Text><Text
                                    style={styles.oneDescText}>x{item.goods_num}</Text></View>
                                <Text>¥{item.goods_price}</Text>
                            </View>
                        </View>
                    })}

                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderCardGoods: {
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
    },
    item: {
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#F8F8F8",
    },
    image: {
        width: 75,
        height: 75
    },
    orderCardGoodsOne: {
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
    },
    oneItem: {
        justifyContent: "flex-start",
        height: 75
    },
    oneImage: {
        width: 75,
        height: 75,

        marginRight: 10
    },
    oneBody: {
        flex: 1,
        color: "#333",
        position: "relative"
    },
    oneText: {
        fontSize: 14,
        fontWeight: 800,
        lineHeight: 18,
    },
    oneLabel: {
        fontSize: 12,
        position: "absolute",
        bottom: "0",
        left: 0,
        color: "#666"
    },
    oneDesc: {
        fontSize: 12,
        color: "#999",
        lineHeight: 12,
        marginBottom: 10,
        height: 12,
        marginTop: 5,
        justifyContent: "space-between"
    },
    oneDescLabel: {},
    oneDescText: {}
})
