import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import {
    PublicStyles,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule'
import moment from 'moment'

@connect(
    ({app:{location:{
        longitude,
        latitude,
    }}}) => ({
        longitude,
        latitude,
    })
)
export default class SystemNotItem extends Component{
    render() {
        const { navigation, data } = this.props
        return (
            <TouchableOpacity
                style={styles.dataItem}
                activeOpacity={0.8}
                onPress={()=>{
                    // navigation.navigate('EstateDetail',{id: 1})
                }}
            >
                <View style={styles.timeView}>
                    <Text style={styles.timeText}>
                        {
                            moment(data.create_time, 'X').format('YYYY-MM-DD')
                        }
                    </Text>
                </View>
                <View style={styles.mainView}>
                    {/* <View style={styles.coverView}>
                        <Image
                            source={{ uri: data.cover }}
                            style={styles.cover}
                        />
                    </View> */}
                    <Text style={styles.title}>
                        {
                            data.title
                        }
                    </Text>
                    <Text style={styles.body}>
                        {
                            data.body
                        }
                    </Text>
                    {/* <View style={styles.linkView}>
                        <Text style={styles.linkText}>
                            查看详情
                        </Text>
                        <Icon
                            size={22}
                            color='#ccc'
                            name='chevron-right'
                        />
                    </View> */}
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    dataItem:{},
    timeView:{
        marginVertical: 15,
        alignSelf: 'center',
        backgroundColor: '#DFDFDF',
        width: 85,
        height: 25,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timeText:{
        fontFamily: 'PingFangSC-Medium',
        fontSize: 12,
        color: '#fff'
    },
    mainView:{
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 3,
        paddingHorizontal: 15,
    },
    coverView:{
        width: windowWidth - 60,
        height: 112,
        marginTop: 15,
        borderRadius: 3,
        overflow: 'hidden'
    },
    cover:{
        width: windowWidth - 60,
        height: 112,
    },
    title:{
        fontFamily: 'PingFangSC-Medium',
        fontSize: 18,
        color: '#333',
        paddingVertical: 15,
    },
    body:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 13,
        color: '#999',
        paddingBottom: 15,
    },
    linkView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderTopWidth: 0.5,
        borderTopColor: '#eaeaea',
    },
    linkText:{
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular',
        color: '#999',
    }
})
