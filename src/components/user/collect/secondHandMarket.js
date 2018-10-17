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

export default class SecondHandMarketCollectList extends Component {
    render() {
        const { navigation } = this.props;
        return <View style={PublicStyles.ViewMax}>
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                renderItem={({ item, index }) => (
                    <SecondHandMarketItem
                        user_nickname={item.name}
                        // user_avatar={item.phone}
                        title={item.title}
                        desc={item.desc}
                        images={item.images}
                        create_time={item.create_time}
                        navigation={navigation}
                        onPress={() => {
                            // navigation.navigate('SecondHandMarketDetail', {
                            //     ...item
                            // })
                        }}
                    />
                )}
                apiName='MINECOLLECTIONSECONDHANDMARKET'
                ListEmptyComponent={() => (
                    <ListEmptyView
                        height={windowHeight - 160}
                        desc='暂时没有相关信息'
                        // uri={require('../../images/fetchStatus/nullData.png')}
                    />
                )}
                // getNativeData={(e)=>console.log(e)}
            />
        </View>;
    }
}

const styles = StyleSheet.create({

})
