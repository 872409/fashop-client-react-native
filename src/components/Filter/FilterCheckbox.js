import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ThemeStyle, PublicStyles } from '../../utils/PublicStyleModule'
// import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { List } from 'antd-mobile-rn'
import { Button } from "../theme";

const Item = List.Item;

export default class FilterCheckbox extends Component {
    state = {
        ids: this.props.current
    }
    render(){
        const { ids } = this.state
        const { refreshFunc, data, hideModal } = this.props;
        return(
            <View style={[PublicStyles.ViewMax,{ backgroundColor: '#fff' }]}>
                <ScrollView>
                    <List>
                        {
                            data.map((item,index)=>{
                                const ifIndex = ids.indexOf(item.id)
                                const extra = item.id||ids.length ? (ifIndex > -1 ? this.checkedTrue() : this.checkedFalse()) : this.checkedTrue()
                                const titleColor = item.id||ids.length ? (ifIndex > -1 ? ThemeStyle.ThemeColor : '#333') : ThemeStyle.ThemeColor
                                return (
                                    <Item
                                        onClick={() => {
                                            if(item.id){
                                                const newIds = ids.concat()
                                                if (ifIndex > -1) {
                                                    newIds.splice(ifIndex, 1)
                                                    this.setState({
                                                        ids: newIds
                                                    })
                                                } else {
                                                    this.setState({
                                                        ids: [...ids, item.id]
                                                    })
                                                }
                                            }else{
                                                this.setState({
                                                    ids: []
                                                })
                                            }
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
                <View style={styles.btnView}>
                    <Button
                        style={{ flex: 1, marginRight: 15, }}
                        onClick={() => {
                            hideModal()
                        }}
                    >
                        取 消
                    </Button>
                    <Button
                        type='primary'
                        style={{ flex: 1, borderWidth: 0 }}
                        onClick={() => {
                            refreshFunc({
                                ids
                            })
                        }}
                    >
                        确 定
                    </Button>
                </View>
            </View>
        )
    }
    checkedFalse(){
        return(
            <MaterialCommunityIcon
                size={20}
                name='checkbox-blank-outline'
                color='#EAEAEA'
            />
        )
    }
    checkedTrue(){
        return(
            <MaterialCommunityIcon
                size={20}
                name='checkbox-marked'
                color={ThemeStyle.ThemeColor}
            />
        )
    }
}

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingVertical: 25,
    },
})
