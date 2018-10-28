import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import MessageItem from '../../components/public/messageItem';
import { ListView, ListEmptyView } from '../../utils/PublicViewModule'
import { PublicStyles, windowWidth, windowHeight } from '../../utils/PublicStyleModule'

export default class messagDtail extends Component{
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
                        height={windowHeight-80}
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
