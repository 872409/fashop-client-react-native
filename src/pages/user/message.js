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
import { PublicStyles } from '../../utils/publicStyleModule'
import { Fetch } from '../../utils'

const Item = List.Item;

export default class UserMessage extends Component{
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
