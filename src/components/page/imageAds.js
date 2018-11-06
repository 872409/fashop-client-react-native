import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Carousel } from "antd-mobile-rn";
import { windowWidth, ThemeStyle } from '../../utils/publicStyleModule';

export default class PageImageAds extends Component {
    render() {
        const { data, options } = this.props.data
        const { layout_style } = options
        // 显示形式：折叠轮播1、上下平铺2
        if(layout_style === 1){
            return this.carousel(data)
        }
        return this.card(data);
    }
    carousel(data){
        return(
            <Carousel
                autoplay={data.length>1}
                infinite={data.length>1}
                dotActiveStyle={styles.dotActive}
                dotStyle={styles.dot}
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                // afterChange={index => console.log('slide to', index)}
            >
                {
                    data.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.img}
                            onPress={() => {
                                // navigation.navigate('PublicWebView', {
                                //     title: item.title,
                                //     url: `${env.domain}/app/info/detail?id=${item.id}`
                                // })
                            }}
                            key={i}
                        >
                            <Image
                                source={{
                                    uri: item.img.url
                                }}
                                style={styles.img}
                            />
                        </TouchableOpacity>
                    ))
                }
            </Carousel>
        )
    }
    card(data){
        return(
            <View>
                {
                    data.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.img}
                            onPress={() => {
                                // navigation.navigate('PublicWebView', {
                                //     title: item.title,
                                //     url: `${env.domain}/app/info/detail?id=${item.id}`
                                // })
                            }}
                            key={i}
                        >
                            <Image
                                source={{
                                    uri: item.img.url
                                }}
                                style={styles.img}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: windowWidth,
        height: windowWidth/2
    },
    dotActive:{
        backgroundColor: ThemeStyle.ThemeColor
    },
    dot:{
        marginHorizontal: 10,
        backgroundColor: '#fff',
        height: 7,
        width: 7
    },
});
