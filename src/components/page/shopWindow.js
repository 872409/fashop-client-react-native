import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import { windowWidth } from '../../utils/publicStyleModule';

export default class PageShopWindow extends Component {
    render() {
        const { data, options } = this.props.data
        const { layout_style } = options
        // 展现形式：2列，一大两小------1   3列三小图-------2
        // 设置图片：一大两小模式，左侧大图建议比例284 x 592px，小图300 x 300px
        return <View>
            {
                layout_style===1 ? this.oneBigTwoSmall(data) : this.small(data)
            }
        </View>
    }
    oneBigTwoSmall(data){
        return(
            <View style={styles.bigList}>
                <Image style={styles.bigImg} source={{ uri: data[0].img.url }}/>
                <View>
                    <Image style={styles.smallImg1} source={{ uri: data[1].img.url }}/>
                    <Image style={styles.smallImg1} source={{ uri: data[2].img.url }}/>
                </View>
            </View>
        )
    }
    small(data){
        return(
            <View style={styles.smallList}>
                {
                    data.map((item, index) => (
                        <Image style={styles.smallImg2} key={index} source={{uri: item.img.url}}/>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bigList :{
        flexDirection: 'row',
    },
    smallList :{
        flexDirection: 'row',
    },
    bigImg: {
        width: windowWidth/2,
        height: (windowWidth/2/3)*4,
    },
    smallImg1: {
        width: windowWidth/2,
        height: ((windowWidth/2/3)*4)/2,
    },
    smallImg2: {
        width: windowWidth/3,
        height: windowWidth/3,
    },
});
