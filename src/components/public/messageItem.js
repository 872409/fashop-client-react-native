import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {env,AppPlatform} from '../../utils/APP_ROOT_CONFIG';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import moment from 'moment'
import { windowWidth } from '../../utils/PublicStyleModule';
import { Image as NetworkImage } from '../../components/theme';

export default class MessageItem extends Component{
    render(){
        const { navigation, data, state } = this.props
        console.log(data);
        return(
            <View style={styles.viewList}>
                <View style={styles.viewListtop}>
                    <View style={styles.viewtopview}>
                        <Text style={styles.viewtoptext}>
                            {
                                moment(data.create_time, 'X').format('YYYY-MM-DD HH:mm:ss')
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.viewListbot}>
                    {
                        data.img ? 
                        <View style={styles.viewListbotimageView}>
                            <NetworkImage
                                source={{uri:data.img}}
                                style={styles.viewListbotimage}
                            />
                        </View> : null
                    }
                    <View
                        style={{
                            paddingVertical: 20,
                            paddingHorizontal: 15,
                            // borderTopColor: '#eaeaea',
                            // borderTopWidth: 0.5
                        }}
                    >
                        <Text style={styles.title}>
                            {
                                data.title
                            }
                        </Text>
                        <Text style={styles.body}>
                            {
                                data.desc || data.body
                            }
                        </Text>
                    </View>
                    {/* <View style={styles.viewListdetil}>
                            <Text style={{fontSize:14,color:'#999'}}>
                                查看详情
                            </Text>
                            <MaterialIcon
                                name={'chevron-right'}
                                size={20}
                                color={'#666'}
                            />
                        </View> */}
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    viewList:{
        margin: 15,
    },
    viewListtop:{
        justifyContent:'center',
        alignItems:'center',
    },
    viewtopview:{
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 15,
        backgroundColor:'#DFDFDF',
    },
    viewtoptext:{
        color:'#FFFFFF',
        fontSize:12,
    },
    viewListbot:{
        marginTop:15,
        backgroundColor:'#FFFFFF',
        // borderWidth: 0.5,
        // borderColor: '#eaeaea',
        borderRadius: 4,
    },
    viewListbotimageView:{
        width: windowWidth-30,
        height:150,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        // borderRadius: 4,
        overflow: 'hidden',
    },
    viewListbotimage:{
        width: windowWidth-30,
        height:150,
    },
    title:{
        color: '#333',
        fontSize:16,
        fontFamily: 'PingFangSC-Medium',
        marginBottom: 15,
    },
    body:{
        color: '#999',
        fontSize:13,
        fontFamily: 'PingFangSC-Regular'
    },
    viewListdetil:{
        paddingVertical: 15,
        borderTopWidth: 0.5,
        borderTopColor:'#eaeaea',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
})
