import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image as NetworkImage } from '../theme';
import {
    PublicStyles,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule'
import { timeBefore } from "../../utils/PublicFuncitonModule";
import Avatar from "../../components/public/avatar";
import moment from 'moment'

export default class DogItem extends Component {
    render() {
        const { index, img, title, price, sex, type_title, province_name, onPress, name, age, avatar, create_time, laizi, deleteFunc } = this.props;
        return (
            <TouchableOpacity
                key={index}
                style={[styles.item, {
                    borderTopWidth: index === 0 ? 0 : 0.5
                }]}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <NetworkImage
                    source={{ uri: img }}
                    style={styles.img}
                />
                <View style={styles.itemRight}>
                    <View style={[PublicStyles.rowBetweenCenter, { marginBottom: 8 }]}>
                        <View style={{ width: windowWidth-140, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: (windowWidth - 140) * 0.75 }}>
                                <Text style={[PublicStyles.title1]} numberOfLines={1}>{title}</Text>
                            </View>
                            {
                                laizi==='user' && deleteFunc ? 
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={deleteFunc}
                                >
                                    <Image
                                        source={require('../../images/delete.png')}
                                        style={{
                                            width: 17,
                                            height: 17
                                        }}
                                    />
                                </TouchableOpacity>  : 
                                <Text style={[PublicStyles.desc2, { fontSize: 11 }]}>
                                    {
                                        timeBefore(create_time)
                                        // moment(create_time, 'X').format('YYYY-MM-DD HH:mm')
                                    }
                                </Text>
                            }
                        </View>
                    </View>
                    <View style={[PublicStyles.rowCenter,{marginBottom:8}]}>
                        <Text style={[PublicStyles.desc1,{marginRight: 10, fontSize: 12}]}>品种：{type_title}</Text>
                        {
                            (sex || age) ? 
                            <View style={[PublicStyles.rowCenter]}>
                                {
                                    sex ?
                                        <View style={[styles.sexWarp, { backgroundColor: sex === '公' ? '#FFF4DE' : '#FFEADD', marginRight: 10 }]}>
                                            <Text style={[styles.sex, { color: sex === '公' ? '#FE7C04' : '#FE4E5D' }]}>{sex}</Text>
                                        </View> : null
                                }
                                {
                                    age ? <View style={[styles.sexWarp, { backgroundColor: '#FFF4DE' }]}>
                                        <Text style={[styles.sex, { color: '#FE7C04' }]}>{age}</Text>
                                    </View> : null
                                }
                            </View> : null
                        }
                    </View>
                    <Text style={[PublicStyles.desc1, { fontSize: 12, marginBottom: 10 }]}>地区：{province_name}</Text>
                    <View style={PublicStyles.rowBetweenCenter}>
                        <View style={PublicStyles.rowCenter}>
                            <Avatar
                                avatar={avatar}
                                size={16}
                                otherStyle={{
                                    marginRight: 10
                                }}
                            />
                            <Text style={PublicStyles.desc2}>{name}</Text>
                        </View>
                        {
                            price ? <Text style={styles.price}>￥{price}</Text> : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
            // <TouchableOpacity
            //     key={index}
            //     style={[styles.item, {
            //         borderTopWidth: index === 0 ? 0 : 0.5
            //     }]}
            //     activeOpacity={0.8}
            //     onPress={onPress}
            // >
            //     <Image
            //         source={{ uri: img }}
            //         style={styles.img}
            //     />
            //     <View style={styles.itemRight}>
            //         <Text style={[PublicStyles.title1,{marginBottom: 8}]}>{title}</Text>
            //         <View style={[PublicStyles.rowCenter,{marginBottom: 4}]}>
            //             <Text style={PublicStyles.desc1}>品种：{type_title}</Text>
            //             {
            //                 sex ?
            //                     <View style={[styles.sexWarp, { backgroundColor: sex === '公' ? '#FFF4DE' : '#FFEADD' }]}>
            //                         <Text style={[styles.sex, { color: sex === '公' ? '#FE7C04' : '#FE4E5D' }]}>{sex}</Text>
            //                     </View> : null
            //             }
            //         </View>
            //         <View style={PublicStyles.rowBetweenCenter}>
            //             <Text style={PublicStyles.desc1}>地区：{province_name}</Text>
            //             {
            //                 price ? <Text style={styles.price}>￥{price}</Text> : null
            //             }
            //         </View>
            //     </View>
            // </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingRight: 15,
        marginLeft: 15,
        borderTopColor: '#eaeaea',
    },
    img: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    itemRight: {
        flex: 1
    },
    sexWarp: {
        // padding: 4,
        // width: 18,
        // height: 18,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 3,
    },
    sex: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 10
    },
    price: {
        fontFamily: 'PingFangSC-Semibold',
        fontSize: 16,
        color: ThemeStyle.ThemeColor
    },
})
