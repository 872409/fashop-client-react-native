import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { PublicStyles, windowHeight, windowWidth, ThemeStyle } from '../../../utils/PublicStyleModule'
import { ListEmptyView, ListView } from "../../../utils/PublicViewModule";
import SecondHandMarketItem from "../../home/SecondHandMarketItem";
import { Modal } from "antd-mobile-rn";
import { Fetch } from '../../../utils';
import { Toast } from '../../../utils/PublicFuncitonModule';

export default class ReviewReleaseList extends Component {
    render() {
        const { navigation } = this.props;
        return <View style={PublicStyles.ViewMax}>
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                renderItem={({ item, index }) => (
                    <SecondHandMarketItem
                        user_nickname={item.user_nickname}
                        user_avatar={item.user_avatar}
                        title={item.title}
                        desc={item.desc}
                        images={item.images}
                        create_time={item.create_time}
                        navigation={navigation}
                        state={item.state}
                        showState={true}
                        laizi='user'
                        onPress={() => {
                            // navigation.navigate('SecondHandMarketDetail', {
                            //     ...item
                            // })
                        }}
                        deleteFunc={() => Modal.alert('确认删除？', `当前删除--${item.title}`, [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '删除', onPress: () => this.deleteFunc(item.id), style: { color: 'red' } },
                        ])}
                    />
                )}
                apiName='MINERELEASECRITIQUE'
                ListEmptyComponent={() => (
                    <ListEmptyView
                        height={windowHeight - 160}
                        desc='暂时没有相关信息'
                        // uri={require('../../images/fetchStatus/nullData.png')}
                    />
                )}
            />
        </View>;
    }
    async deleteFunc(id) {
        const e = await Fetch.fetch({
            apiName: 'MINERELEASECRITIQUEDEL',
            params: {
                id
            }
        })
        if (e.errcode === 0) {
            Toast.info('删除成功！')
            this.ListView.manuallyRefresh()
        } else {
            Toast.warn(e.errmsg)
        }
    }
}

const styles = StyleSheet.create({

})
