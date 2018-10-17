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
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from "react-native-actionsheet";
import {
    PublicStyles,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule'
import {
    getDistance
} from '../../utils/PublicFuncitonModule'
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
export default class VideoItem extends Component{
    render() {
        const { navigation, data } = this.props
        return (
            <View style={styles.dataItemWarp}>
                <View style={styles.dataItem}>
                    <Text style={styles.title}>
                        {
                            data.title
                        }
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('VideoDetail', {
                                title: data.title,
                                video: data.url,
                            })
                        }}
                    >
                        <ImageBackground
                            source={{ uri: data.img }}
                            style={styles.bgcimg}
                        >
                            <View style={styles.zhezhao} />
                            <Image
                                source={require('../../images/video.png')}
                                style={styles.video}
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.botView}>
                        <Text style={styles.time}>
                            {
                                moment(data.create_time,'X').format('YYYY-MM-DD HH:mm')
                            }
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.share}
                            onPress={() => {
                                this.ActionSheet.show();
                            }}
                        >
                            <Image
                                source={require('../../images/share.png')}
                                style={styles.share}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ActionSheet
                    ref={e => this.ActionSheet = e}
                    title={'分享到'}
                    options={['好友', '朋友圈', '取消']}
                    cancelButtonIndex={2}
                    onPress={(index) => {

                    }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    dataItemWarp:{
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    dataItem:{
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#eaeaea',
    },
    title: {
        fontSize: 16,
        fontFamily: 'PingFangSC-Medium',
        color: '#333',
        paddingTop: 20,
        paddingBottom: 15,
    },
    bgcimg:{
        width: windowWidth-30,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zhezhao:{
        backgroundColor: 'rgba(0,0,0,.6)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    video:{
        width: 50,
        height: 50
    },
    botView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    time:{
        fontFamily: 'PingFangSC-Regular',
        color: '#999',
        fontSize: 12
    },
    share:{
        width: 22.5,
        height: 17.5
    },
})
