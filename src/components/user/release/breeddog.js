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
import DogItem from "../../dog/item";
import moment from "moment";
import { Modal } from "antd-mobile-rn";
import { Fetch } from '../../../utils';
import { Toast } from '../../../utils/PublicFuncitonModule';

export default class BreedDogReleaseList extends Component {
    render() {
        const { navigation } = this.props;
        return <View style={PublicStyles.ViewMax}>
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
                        <DogItem
                            index={0}
                            img={item.images[0]}
                            title={item.title}
                            price={item.price}
                            sex={item.sex}
                            type_title={item.type_title}
                            province_name={item.province_name}
                            name={item.user_nickname}
                            avatar={item.user_avatar}
                            create_time={item.create_time}
                            age={item.age}
                            laizi='user'
                            onPress={() => {
                                // navigation.navigate('BreedDogDetail', {
                                //     ...item
                                // })
                            }}
                            deleteFunc={() => Modal.alert('确认删除？', `当前删除--${item.title}`, [
                                { text: '取消', onPress: () => console.log('cancel') },
                                { text: '删除', onPress: () => this.deleteFunc(item.id), style: {color: 'red'} },
                            ])}
                        />
                        <View style={[PublicStyles.rowBetweenCenter, { paddingHorizontal: 15, paddingBottom: 20 }]}>
                            <Text style={PublicStyles.desc2}>
                                发布于 {moment(item.create_time, 'X').format('YYYY-MM-DD HH:mm')}
                            </Text>
                            <Text style={[PublicStyles.desc2, item.state === 0 ? { color: ThemeStyle.ThemeColor } : {}]}>
                                {
                                    item.state===0 ? '审核中' : 
                                    item.state===1 ? '审核通过' : 
                                    item.state===2 ? '审核失败' : ''
                                }
                            </Text>
                        </View>
                    </View>
                )}
                apiName='MINERELEASEBREEDDOG'
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
    async deleteFunc(id){
        const e = await Fetch.fetch({
            apiName: 'MINERELEASEBREEDDOGDEL',
            params: {
                id
            }
        })
        if(e.errcode===0){
            Toast.info('删除成功！')
            this.ListView.manuallyRefresh()
        }else {
            Toast.warn(e.errmsg)
        }
    }
}

const styles = StyleSheet.create({

})
