import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/PublicStyleModule'
import { ThemeButton as Button } from "../theme";

export default class FilterOther extends Component {
    state = {
        result: this.props.current
    }
    render(){
        const { data, refreshFunc } = this.props;
        const { result } = this.state;
        return(
            <View style={styles.view5}>
                <ScrollView>
                    {
                        data.map((item,i)=>(
                            <View key={i}>
                                <Text style={styles.filterTitle}>{item.title}</Text>
                                <View style={styles.tagView}>
                                    {
                                        item.child.map((childitem,j)=>{
                                            let listCurrent = result[i] ? result[i] : []
                                            return(
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={[
                                                        styles.touchTag,
                                                        {
                                                            marginRight: (j+1)%4===0 ? 0 : 15,
                                                        },
                                                        listCurrent.indexOf(childitem.id)>-1 ? {
                                                            // borderColor: ThemeStyle.ThemeColor,
                                                            backgroundColor: ThemeStyle.ThemeColor3,
                                                        } : {
                                                            // borderColor: '#F8F8F8',
                                                            backgroundColor: '#F8F8F8',
                                                        }
                                                    ]}
                                                    onPress={() => {
                                                        let newdata = listCurrent.concat()
                                                        if(listCurrent.indexOf(childitem.id)>-1){
                                                            newdata.splice(listCurrent.indexOf(childitem.id),1)
                                                        }else {
                                                            newdata=[...listCurrent,childitem.id]
                                                        }
                                                        let obj = {}
                                                        obj[i] = newdata
                                                        this.setState({
                                                            result: {...this.state.result,...obj}
                                                        })
                                                    }}
                                                    key={j}
                                                >
                                                    <Text
                                                        style={[
                                                            listCurrent.indexOf(childitem.id) > -1 ? {
                                                                color: ThemeStyle.ThemeColor,
                                                            } : {
                                                                color: '#333',
                                                            }
                                                        ]}
                                                    >
                                                        {
                                                            childitem.title
                                                        }
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        ))
                    }
                    <View style={styles.btnView}>
                        <Button
                            type='primary'
                            style={{flex: 1 , borderWidth: 0}}
                            onClick={()=>{
                                console.log(result);
                                refreshFunc({result})
                            }}
                        >
                            确 定
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view5:{
        flexDirection:'row',
    },
    btnView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        paddingVertical: 25,
    },
    filterTitle:{
        fontSize: 14,
        color: '#999',
        fontFamily: 'PingFangSC-Regular',
        marginVertical: 20,
        marginLeft: 15
    },
    tagView:{
        marginHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchTag:{
        justifyContent: 'center',
        alignItems: 'center',
        width: (windowWidth-15*5)/4,
        height: 30,
        // paddingVertical: 8,
        // paddingHorizontal: 24,
        marginBottom: 15,
        // borderWidth: 0.5,
        borderRadius: 3,
    }
})
