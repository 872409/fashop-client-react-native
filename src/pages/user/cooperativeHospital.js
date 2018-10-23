import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { PublicStyles, windowWidth, windowHeight, ThemeStyle } from '../../utils/PublicStyleModule'
import { ListView, ListEmptyView } from "../../utils/PublicViewModule";

export default class CooperativeHospital extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={PublicStyles.ViewMax}>
                <ListView
                    ref={e => this.ListView = e}
                    keyExtractor={e => String(e.id)}
                    renderItem={({ item }) => this.renderItem({...item})}
                    apiName='COOPERATIVEHOSPITALSEARCH'
                    ListEmptyComponent={() => (
                        <ListEmptyView
                            height={windowHeight - 60}
                            desc='暂时没有相关信息'
                            uri={require('../../images/fetchStatus/nullData.png')}
                        />
                    )}
                />
            </View>
        )
    }
    renderItem({title,address,tel,tel_spare}){
        return(
            <View style={styles.item}>
                <Text style={[styles.title,{marginBottom: 10}]}>{title}</Text>
                <Text style={[styles.desc,{marginBottom: 6}]}>地址：{address}</Text>
                <Text style={styles.desc}>电话：{tel}{tel_spare ? tel_spare : null}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'PingFangSC-Regular',
    },
    desc: {
        fontSize: 14,
        color: '#999',
        fontFamily: 'PingFangSC-Light',
    },
})
