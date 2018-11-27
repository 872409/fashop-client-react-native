import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import {  Button, List } from "antd-mobile-rn";
import { getDefaultAddress } from "../../actions/address";
import { PublicStyles, ThemeStyle, windowWidth } from '../../utils/style';

const Item = List.Item

@connect(({
    view: {
        address: {
            defaultAddress,
            defaultAddressFetchStatus,
        }
    }
}) => ({
    defaultAddress,
    fetchStatus: defaultAddressFetchStatus,
}))
export default class OrderAction extends Component {

    componentDidMount() {
        this.props.dispatch(getDefaultAddress())
    }
    render() {
        const { navigation, defaultAddress } = this.props;
        const { cart_buy_items } = navigation.state.params
        const goodsList = cart_buy_items.map((item, index) => {
            return item.goods_data
        })
        return <View style={PublicStyles.ViewMax}>
            <ScrollView style={{ flex: 1 }}>
                {/* <Address
                    addressInfo={orderActionAddress ? JSON.parse(orderActionAddress) : defaultAddress}
                    onClick={() => {
                        // history.push({
                        //     pathname: "/user/address",
                        //     search: '?select=1',
                        // });
                    }}
                /> */}
                <View style={styles.goodsView}>
                    {/* {
                        cart_buy_items.length > 1 ?
                            <View
                                onClick={() => {
                                    history.push({
                                        pathname: '/goods/list',
                                        state: {
                                            cart_buy_items
                                        }
                                    })
                                }}
                            >
                                <GoodsScroll
                                    data={goodsList}
                                />
                            </View> : <GoodsItem />
                    } */}
                    {/* <List>
                        <Item
                            arrow="horizontal"
                            extra="电子发票-个人／不索要"
                            onClick={() => {
                                // history.push("/classify/invoice");
                            }}
                            extra={(
                                <Text style={styles.themeExtra}>
                                    您所购买的商品暂不支持索要发票
                                </Text>
                            )}
                        >
                            发票
                        </Item>
                        <Item
                            arrow="horizontal"
                            // extra="暂无可用"
                            extra={(
                                <Text style={styles.themeExtra}>
                                    - ¥10.00
                                </Text>
                            )}
                        >
                            优惠券
                        </Item>
                        <View style={styles.msgView}>
                            <InputItem
                                style='msgInput'
                                placeholder='选填 有什么想对商家说的（45字以内）'
                            />
                        </View>
                    </List> */}
                </View>
                <List>
                    <Item
                        // extra="免运费"
                        extra={(
                            <View>
                                <Text style={styles.themeExtra}>
                                    + ¥0.00
                                </Text>
                                {/* <Text style={PublicStyles.descTwoc}>
                                    重量计费：0.5kg
                                </Text> */}
                            </View>
                        )}
                    >
                        运费
                    </Item>
                    <Item
                        extra={(
                            <Text style={styles.themeExtra}>
                                ¥108.00
                            </Text>
                        )}
                    >
                        小计
                    </Item>
                </List>
            </ScrollView>
            <SafeAreaView style={styles.bot}>
                <View style={styles.botLeft}>
                    <Text style={PublicStyles.descFour9}>实付：</Text>
                    <Text style={styles.botLeftText}>
                        ¥108.00
                    </Text>
                </View>
                <Button
                    type='primary'
                    style={{
                        borderRadius: 0,
                        flex: 1
                    }}
                    onClick={()=>{
                        navigation.replace('Pay')
                    }}
                >
                    提交订单
                </Button>
            </SafeAreaView>
        </View>;
    }
}

const styles = StyleSheet.create({
    goodsView: {
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    themeExtra: {
        color: ThemeStyle.ThemeColor,
    },
    msgView: {
        padding: 15,
    },
    bot: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    botLeft: {
        width: windowWidth*0.68,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 15
    },
    botLeftText: {
        fontSize: 18,
        color: ThemeStyle.ThemeColor,
    },
})
