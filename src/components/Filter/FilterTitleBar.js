import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { ThemeStyle } from '../../utils/PublicStyleModule'
import EvilIcon from 'react-native-vector-icons/EvilIcons';

export default class FilterTitleBar extends Component {
    render(){
        const {
            data,
            current,
            onPress,
            style
        } = this.props
        return(
            <View style={[styles.view1, style]}>
                {
                    data.map((item,i)=>{
                        const {
                            open
                        } = item

                        let currentTitle = current[i].title
                        let currentColor = current[i].color

                        const textColor = (open||(currentColor)) ? ThemeStyle.ThemeColor : '#666666'
                        const iconColor = (open||(currentColor)) ? ThemeStyle.ThemeColor : '#CCCCCC'
                        const iconName = open ? 'chevron-up' : 'chevron-down'
                        return (
                            <TouchableOpacity
                                style={[styles.button1,i===0&&{borderLeftWidth:0}]}
                                activeOpacity={1}
                                key={i}
                                onPress={()=>{
                                    onPress({
                                        index: i,
                                        open: !open
                                    })
                                }}
                            >
                                <View style={styles.view2}>
                                    <Text style={[styles.text1,{color:textColor}]} numberOfLines={1}>
                                        {
                                            currentTitle
                                        }
                                    </Text>
                                    <EvilIcon
                                        name={iconName}
                                        size={20}
                                        color={iconColor}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view1:{
        height: 44,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#eaeaea',
        backgroundColor: '#fff'
    },
    button1:{
        flex:1,
        justifyContent:'center',
    },
    text1:{
        fontSize:13,
    },
    view2:{
        flexDirection:'row',
        height:15,
        justifyContent:'center',
        alignItems:'center',
    },
})
