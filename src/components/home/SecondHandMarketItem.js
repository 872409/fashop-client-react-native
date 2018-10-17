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
import Avatar from '../public/avatar';
import {
    PublicStyles,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule'
import moment from "moment";

export default class SecondHandMarketItem extends Component {
    render() {
        const { user_nickname, user_avatar, title, desc, images, create_time, onPress, navigation, showState, state, laizi, deleteFunc, category_title } = this.props;
        // const newImages = images ? images.map(item => {
        //     return {
        //         // caption: `${item.title} - ${index + 1}`,
        //         source: { uri: item }
        //     }
        // }) : []
        return (
            <TouchableOpacity
                style={styles.item}
                activeOpacity={0.8}
                onPress={onPress}
            >
                {
                    showState ? null : 
                    <View style={[PublicStyles.rowCenter,styles.top]}>
                        <Avatar
                            avatar={user_avatar}
                            size={22}
                        />
                        <Text style={[PublicStyles.desc1,{ color: '#333', marginLeft: 10 }]}>{user_nickname}</Text>
                    </View>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
                    <View style={{ width: (windowWidth - 30) * 0.75 }}>
                        <Text style={[PublicStyles.title1, { fontSize: 18, }]}>{title}</Text>
                    </View>
                    {
                        laizi === 'user' && deleteFunc ?
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
                            </TouchableOpacity> : null
                    }
                </View>
                <Text style={[PublicStyles.desc1,{ color: '#666', paddingHorizontal: 15 }]} numberOfLines={2}>{desc}</Text>
                <ScrollView
                    horizontal={true}   // 水平方向
                    showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
                    showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
                    style={{
                        marginLeft: 15,
                        marginTop: 10,
                        marginBottom: 15
                    }}
                >
                    {
                        images ? images.map((item, index) => (
                            <View
                                key={index}
                                // activeOpacity={0.8}
                                style={styles.itemImgWarp}
                                // onPress={() => {
                                //     navigation.navigate('PhotoGalleryView', {
                                //         images: newImages,
                                //         index
                                //     })
                                // }}
                            >
                                <NetworkImage
                                    style={styles.itemImg}
                                    source={{ uri: item }}
                                />
                            </View>
                        )) : null
                    }
                </ScrollView>
                <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
                    <View style={PublicStyles.rowBetweenCenter}>
                        <Text style={PublicStyles.desc2}>
                            发布于 {moment(create_time, 'X').format('YYYY-MM-DD HH:mm')}
                        </Text>
                        {
                            showState ? 
                            <Text style={[PublicStyles.desc2, state===0 ? {color: ThemeStyle.ThemeColor} : {}]}>
                                {
                                    state===0 ? '审核中' : 
                                    state===1 ? '审核通过' : 
                                    state===2 ? '审核失败' : ''
                                }
                            </Text> : null
                        }
                    </View>
                    {
                        laizi === 'user' && category_title ? 
                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            <View style={{backgroundColor: '#f8f8f8',paddingVertical: 2, paddingHorizontal: 7, marginTop: 10, borderRadius: 2}}>
                                <Text style={PublicStyles.desc2}>
                                    {category_title}
                                </Text>
                            </View>
                        </View> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    top: {
        paddingVertical: 14,
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
    },
    itemImgWarp: {
        width: 75,
        height: 75,
        marginRight: 5,
    },
    itemImg: {
        width: 75,
        height: 75,
    },
    
})
