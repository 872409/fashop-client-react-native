import React,{Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    // Image
} from 'react-native';
import {
    Carousel,
} from 'antd-mobile-rn';
import {
    PublicStyles,
    PublicStylesString,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule';
import { Image } from '../../components/theme';
import { env } from "../../utils/APP_ROOT_CONFIG";

export default class HomeSwiper extends Component{
    render(){
        const { data, navigation } = this.props;
        return (
            <View style={styles.SwiperTopView}>
                <Carousel
                    autoplay
                    infinite={data.length>1}
                    dotActiveStyle = {{
                        backgroundColor: '#fff',
                    }}
                    dotStyle = {{
                        backgroundColor: 'rgba(0,0,0,0)',
                        marginHorizontal: 3,
                        height: 8,
                        width: 8,
                        borderWidth: 1,
                        borderColor: '#fff'
                    }}
                >
                    {
                        data.map((item,i) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress = {()=>{
                                    navigation.navigate('PublicWebView',{
                                        title: item.title,
                                        url : `${env.domain}/app/info/detail?id=${item.id}`
                                    })
                                }}
                                key = {i}
                                style={styles.imgView}
                            >
                                <Image
                                    source = {
                                        item.img&&item.img.length ?
                                        {
                                            uri: item.img
                                        } :
                                        require('../../images/netimg.jpg')
                                    }
                                    style = {styles.image}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </Carousel>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SwiperTopView:{
        // paddingHorizontal: 15,
        // paddingTop: 15,
        backgroundColor:"#ffffff"
    },
    imgView:{
        height: windowWidth*0.48,
        width: windowWidth,
        // borderRadius: 3,
        // overflow: 'hidden',
    },
    image:{
        height: windowWidth*0.48,
        width: windowWidth,
    }
})