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
                            <View style={styles.image}>
                                <Image source={{ uri: item.goods_img }} resizeMode={'contain'} />
                            </View>
                            <View style={styles.body}>
                                <Text>{item.goods_title}</Text>
                                <View style={styles.desc}>
                                    <Text>{item.goods_spec_string}</Text><i>x{item.goods_num}</i></View>
                                <Text>¥{item.goods_price}</Text>
                            </View>
                        </View>
                    })}

                </View>
            </View> : null}
        </View>
    }
}
