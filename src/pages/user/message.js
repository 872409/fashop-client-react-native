import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { List } from 'antd-mobile-rn';
import { ListView, ListEmptyView } from '../../utils/PublicViewModule'
import { PublicStyles, windowWidth, windowHeight, ThemeStyle } from '../../utils/PublicStyleModule'
import { Fetch } from '../../utils'
import { Toast } from "../../utils/PublicFuncitonModule";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import MessageItem from "../../components/public/messageItem";

const Item = List.Item;

export default class MessageData extends Component{
    render(){
        const { navigation } = this.props
        return(
            <View style={PublicStyles.ViewMax}>
                <ListView
                    ref={e => this.ListView = e}
                    keyExtractor={e => String(e.id)}
                    renderItem={data => (
                        <MessageItem
                            navigation={navigation}
                            data={data.item}
                        />
                    )}
                    api='MESSAGESEARCH'
                    fetchParams={{
                        type_id: 1
                    }}
                    ListEmptyComponent={() => (
                        <ListEmptyView
                            height={windowHeight - 160}
                            uri={require('../../images/fetchStatus/messageEmpty.png')}
                            desc='暂时没有相关消息'
                        />
                    )}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({

})
