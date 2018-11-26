import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { ListView, ListEmptyView } from '../../utils/PublicViewModule'

export default class UserMessageDetail extends Component{
    render(){
        const { navigation } = this.props;
        const { type_id } = navigation.state.params
        return(
            <ListView
                ref={e=>this.ListView=e}
                keyExtractor={e => String(e.id)}
                renderItem={ data => (
                    <MessageItem
                        navigation={navigation}
                        data={data.item}
                    />
                )}
                api='MESSAGESEARCH'
                fetchParams={{type_id}}
                ListEmptyComponent={()=>(
                    <ListEmptyView
                        uri={require('../../images/fetchStatus/messageEmpty.png')}
                        desc='暂时没有相关消息'
                    />
                )}
            />
        )
    }
}

const styles=StyleSheet.create({

})
