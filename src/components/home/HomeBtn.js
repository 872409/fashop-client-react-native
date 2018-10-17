import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import {
    PublicStyles,
    PublicStylesString,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule';

const list = [
    {
        // title: '二手市场',
        title: '交易市场',
        img: require('../../images/home04.png'),
        path: 'SecondHandMarket',
    },
    {
        title: '养宠心得',
        img: require('../../images/home05.png'),
        path: 'PetShare',
    },
    {
        title: '招聘',
        img: require('../../images/home06.png'),
        path: 'Recruit'
    },
    {
        title: '点评',
        img: require('../../images/home07.png'),
        path: 'Review'
    }
]

export default class HomeBtn extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.warp}>
                {
                    list.map((item,index) => (
                        <TouchableOpacity 
                            key={index}
                            style={styles.item} 
                            activeOpacity={0.8}
                            onPress={() => {
                                if(item.path){
                                    navigation.navigate(item.path);
                                }
                            }}
                        >
                            <Image 
                                source={item.img} 
                                style={styles.itemImg} 
                            />
                            <Text style={styles.itemText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    warp: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
        height: 100
        // borderBottomWidth: 0.5,
        // borderBottomColor: "#EAEAEA",
    },
    item:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemImg: {
        width: windowWidth* 0.08,
        height: windowWidth* 0.08,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 12,
        color: "#643414",
        fontFamily: 'PingFangSC-Regular',
    }
})