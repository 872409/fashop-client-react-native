import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { ThemeStyle } from '../../utils/PublicStyleModule'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { List } from 'antd-mobile-rn'

const Item = List.Item;

export default class FilterRadio extends Component {
    render(){
        const { refreshFunc, current, data } = this.props
        return(
            <View style={styles.view5}>
                <ScrollView>
                    <List>
                        {
                            data.map((item,index)=>{
                                let extra = !current.length&&index===0 ? this.checkView() :
                                current===item.title ? this.checkView() : ''
                                let titleColor = !current.length&&index===0 ? ThemeStyle.ThemeColor :
                                current===item.title ? ThemeStyle.ThemeColor : '#333'
                                return(
                                    <Item
                                        onClick={() => {
                                            refreshFunc({
                                                id: item.id,
                                                title: item.title
                                            })
                                        }}
                                        key={index}
                                        extra={extra}
                                    >
                                        <Text
                                            style={{color: titleColor}}
                                        >
                                            {item.title}
                                        </Text>
                                    </Item>
                                )
                            })
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
    checkView(){
        return(
            <FeatherIcon
                size={20}
                name='check'
                color={ThemeStyle.ThemeColor}
            />
        )
    }
}

const styles = StyleSheet.create({
    view5:{
        flexDirection:'row',
    }
})
