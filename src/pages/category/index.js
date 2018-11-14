import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { PublicStyles, windowWidth, ThemeStyle, windowHeight } from "../../utils/publicStyleModule";
import { Image as NetworkImage } from "../../components/theme";
import { Fetch } from "../../utils";
import { Toast } from '../../utils/publicFuncitonModule';
import { GoodsCategoryApi } from "../../config/api/goodsCategory";

export default class Category extends Component {
    state = {
        current: 0,
        categoryList: []
    }
    async componentDidMount() {
        const e = await Fetch.fetch({
            api: GoodsCategoryApi.list,
        })
        if (e.code === 0) {
            this.setState({
                categoryList: e.result.list,
                current: e.result.list[0].id
            })
        } else {
            Toast.warn(e.msg)
        }
    }
    render() {
        const { current, categoryList } = this.state;
        const currentList = categoryList.filter(item => item.id === current)
        const _child = currentList.length ? currentList[0]._child : []
        return <View style={[PublicStyles.ViewMax, { flexDirection: 'row' }]}>
            <ScrollView style={styles.left}>
                {
                    categoryList.map((item, index) => {
                        const active = item.id === current
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={.6}
                                style={[styles.leftItem, {
                                    backgroundColor: active ? '#f8f8f8' : '#ffffff'
                                }]}
                                onPress={() => {
                                    this.setState({
                                        current: item.id,
                                    })
                                }}
                            >
                                <Text 
                                    style={[styles.leftName, {
                                        color: active ? ThemeStyle.ThemeColor : '#333',
                                        fontFamily: active ? 'PingFangSC-Medium' : 'PingFangSC-Regular',
                                        fontWeight: active ? '500' : '400',
                                    }]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <ScrollView style={styles.right}>
                {
                    !current ? this.empty({ content: '请选择' }) :
                        current && _child.length ? this.renderRight(_child) :
                            current && !_child.length ? this.empty({ content: '当前分类为空' }) : null
                }
            </ScrollView>
        </View>;
    }
    renderRight(_child) {
        const { navigation } = this.props
        return (
            <View style={styles.rightList}>
                {
                    _child.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.rightItem}
                            onPress={() => {
                                navigation.navigate("GoodsList", {
                                    category_id: item.id,
                                })
                            }}
                        >
                            <NetworkImage style={styles.rightImg} source={{ uri: item.icon }}></NetworkImage>
                            <Text style={[PublicStyles.title, { fontSize: 14 }]} numberOfLines={1}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    empty({ content }) {
        return (
            <View style={styles.emptyWarp}>
                <Image style={styles.emptyImg} source={require('../../images/fetchStatus/searchNullData.png')}></Image>
                <Text style={PublicStyles.descFour9}>{content}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    left: {
        width: windowWidth * 0.33,
        backgroundColor: '#fff',
    },
    leftItem: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftName: {
        fontSize: 16
    },
    right: {
        width: windowWidth * 0.67,
    },
    rightList: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    rightItem: {
        width: (windowWidth * 0.67) / 3.01,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    rightImg: {
        width: (windowWidth * 0.67) / 3 - 30,
        height: (windowWidth * 0.67) / 3 - 30,
        marginBottom: 10
    },
    emptyWarp: {
        height: windowHeight / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyImg: {
        marginBottom: 10
    },
});
