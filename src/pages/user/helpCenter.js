import React,{Component} from 'react';
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    PublicStyles,
    PublicStylesString,
    windowWidth,
    windowHeight,
    ThemeStyle
} from '../../utils/PublicStyleModule';
import { getListHelpList } from '../../actions/user/helpCenter';
import { Button,List } from 'antd-mobile-rn';
import { env } from '../../config/root';
import { ListView, ListEmptyView } from '../../utils/PublicViewModule'

const Item = List.Item;

export default class HelpCenter extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });
    render(){
        const{ navigation }=this.props
        const { type_id } = navigation.state.params
        return(
            <ListView
                ref={e=>this.ListView=e}
                keyExtractor={e => String(e.id)}
                renderItem={ data => (
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            navigation.navigate('PublicWebView',{
                                title: data.item.title,
                                url : `${env.domain}/app/help/detail?id=${data.item.id}`
                            })
                        }}
                    >
                        {
                            data.item.title
                        }
                    </Item>
                )}
                api='USERHELPSEARCH'
                fetchParams={{
                    type_id
                }}
                ListEmptyComponent={()=>(
                    <ListEmptyView
                        height={windowHeight-80}
                        uri={require('../../images/fetchStatus/nullData.png')}
                        desc='暂时没有相关信息'
                    />
                )}
            />
        )
    }
}

const styles=StyleSheet.create({

})
