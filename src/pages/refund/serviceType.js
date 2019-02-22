import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { NetworkImage } from "../../components/theme"
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { PublicStyles } from '../../utils/style';

@connect(({ order })=>({
    goodsInfo: order.goodsInfo.result.info
}))
export default class ServiceType extends Component {

    componentWillMount() {
        const { navigation, dispatch } = this.props
        const { order_goods_id } = navigation.state.params
        dispatch({
            type: "order/goodsInfo",
            payload: {
                id: order_goods_id
            }
        })
    }

    onClick(refund_type) {
        const { navigation } = this.props
        const { order_goods_id } = navigation.state.params
        navigation.navigate('RefundServiceApply', {
            order_goods_id,
            refund_type,
            delta: 2
        })
    }

    render() {
        const { goodsInfo } = this.props
        const typeList = [
            {
                title: '仅退款',
                desc: '未收到货（包含未签收），或已与卖家协商同意',
            },{
                title: '退货退款',
                desc: '已收到货，需要退换已收到的货物',
            }
        ]
        return goodsInfo ? <View style={PublicStyles.ViewMax}>
                <View style={styles.item}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <NetworkImage 
                                source={{ uri: goodsInfo.goods_img }} 
                                style={{
                                    width: 75,
                                    height: 75,
                                }} 
                            />
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{goodsInfo.goods_title}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{goodsInfo.goods_spec_string}</Text>
                                <Text style={styles.number}>x {goodsInfo.goods_num}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.typeList}>
                    {
                        typeList.map((item,index)=>(
                            <TouchableOpacity
                                key={index}
                                style={[PublicStyles.rowBetweenCenter, styles.typeListItem, { borderTopWidth: index===0 ? 0 : 0.5,}]}
                                activeOpacity={.8}
                                onPress={()=>this.onClick(index)}
                            >
                                <View style={{flex: 1}}>
                                    <Text style={PublicStyles.title}>{item.title}</Text>
                                    <Text style={[PublicStyles.descFour9,{color: '#ccc', marginTop: 8}]}>{item.desc}</Text>
                                </View>
                                <Ionicon
                                    name="ios-arrow-forward"
                                    color="#ccc"
                                    size={16}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View> :
            null
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 11
    },
    content: {
        flexDirection: 'row',
    },
    image: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    body: {
        flex: 1
    },
    bodyText: {
        fontSize: 15,
        fontWeight: "800",
        color: "#333",
        marginBottom: 10
    },
    end: {
        flexDirection: 'column',
    },
    spec: {
        fontSize: 13,
        color: "#999999",
    },
    number: {
        marginTop: 5,
        fontSize: 13,
        color: "#999999",
    },
    typeList: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    typeListItem: {
        paddingVertical: 15,
        borderTopColor: '#eaeaea',
    },
})
