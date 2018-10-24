import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image
} from 'react-native';
import { SearchBar } from "antd-mobile-rn";

export default class Index extends Component {
    componentDidMount() {
        // this.autoFocusInst.focus();
    }
    render() {
        const { options } = this.props.data
        const { background_color } = options
        return <View style={[styles.warp,{backgroundColor: background_color}]}>
            <View style={[styles.inputView,{borderWidth: (background_color==='#fff'||background_color==='#ffffff') ? 0.5 : 0}]}>
                <Image style={styles.img} source={require('../../images/search.png')}></Image>
                <TextInput 
                    placeholder="搜索商品" 
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    warp: {
        padding: 8,
    },
    inputView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#eaeaea'
    },
    img: {
        marginRight: 10
    },
    input: {
        height: 32,
        textAlign: 'center'
    }
});