import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import { PublicStyles, windowWidth, windowHeight, ThemeStyle } from '../../utils/PublicStyleModule'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { List } from 'antd-mobile-rn'

const Item = List.Item;

@connect(
    ({app:{location:{ cityName, cityArray }}}) => ({
        cityName,
        cityArray,
    }),
)
export default class FilterAddress extends Component {
    render(){
        // console.log('FilterAddress',this.props);
        const { cityName, cityArray, filterParams, refreshFunc } = this.props
        const { areaName, distance } = filterParams
        let currentArr = cityArray.filter((item,index)=>{
            return cityName===item.name
        })
        let current = []
        if(currentArr.length){
            current = [{id:0,name:'不限'},...currentArr[0].child]
        }
        return(
            <ScrollView>
                {
                    current.length ?
                    <List>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                {
                                    current.map((item,index)=>{
                                        let extra = !filterParams.areaName.length&&index===0 ? this.checkView() :
                                        filterParams.areaName===item.name ? this.checkView() : ''
                                        let titleColor = !filterParams.areaName.length&&index===0 ? ThemeStyle.ThemeColor :
                                        filterParams.areaName===item.name ? ThemeStyle.ThemeColor : '#333'
                                        let itemBgcColor = !filterParams.areaName.length&&index===0 ? '#fff' :
                                        filterParams.areaName===item.name ? '#fff' : '#f8f8f8'
                                        return(
                                            <Item
                                                // style={{
                                                //     backgroundColor: itemBgcColor
                                                // }}
                                                onClick={() => {
                                                    refreshFunc({
                                                        params:{
                                                            area_id:item.id ? item.id : null,
                                                            // distance:null
                                                        },
                                                        filterParams:{
                                                            ...filterParams,
                                                            areaName: item.name==='不限' ? '' : item.name,
                                                            // distance:''
                                                        }
                                                    })
                                                }}
                                                key={index}
                                                extra={extra}
                                            >
                                                <Text
                                                    style={{color: titleColor}}
                                                >
                                                    {item.name}
                                                </Text>
                                            </Item>
                                        )
                                    })
                                }
                            </View>
                            {/* <View style={{flex:1}}>
                                {
                                    !filterParams.areaName.length ? distanceList.map((item,index)=>{
                                        let extra = !filterParams.distance.length&&index===0 ? this.checkView() :
                                        filterParams.distance===item.title ? this.checkView() : ''
                                        let titleColor = !filterParams.distance.length&&index===0 ? ThemeStyle.ThemeColor :
                                        filterParams.distance===item.title ? ThemeStyle.ThemeColor : '#333'
                                        let paramsDistance = index===0 ? null : item.params.distance
                                        let paramsFilter = index===0 ? '' : item.title
                                        return(
                                            <Item
                                                onClick={() => {
                                                    refreshFunc({
                                                        params:{
                                                            area_id:null,
                                                            distance:paramsDistance
                                                        },
                                                        filterParams:{
                                                            areaName:'',
                                                            distance:paramsFilter
                                                        }
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
                                    }) : (
                                        <Item
                                            extra={this.checkView()}
                                        >
                                            <Text
                                                style={{color: ThemeStyle.ThemeColor}}
                                            >
                                                全{filterParams.areaName}
                                            </Text>
                                        </Item>
                                    )
                                }
                            </View> */}
                        </View>
                    </List> : <View style={styles.locationFailView}>
                        <Image
                            source={require('../../images/fetchStatus/locationFail.png')}
                            style={styles.locationFailImage}
                        />
                        <Text style={styles.locationFailText}>
                            无法获取您的定位信息
                        </Text>
                    </View>
                }
            </ScrollView>
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
    locationFailView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight/5
    },
    locationFailImage:{
        width: 92,
        height: 75
    },
    locationFailText:{
        marginTop: 15,
        color: '#999',
    },
})
