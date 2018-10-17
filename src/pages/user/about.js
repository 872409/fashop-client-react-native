import React,{Component} from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { env } from '../../utils/APP_ROOT_CONFIG';
import { List } from 'antd-mobile-rn';
import {
    AppName,
    AppIcon,
    AppVersion,
 } from "../../utils/APP_ROOT_CONFIG";
 import {
     PublicStyles,
     windowWidth,
     windowHeight,
     ThemeStyle
 } from '../../utils/PublicStyleModule';

const Item = List.Item;

class AboutUs extends Component{
    render(){
        const { data, navigation } = this.props
        const aboutList = [
            {
                id:'1',
                title:'关于我们',
            }
            // , {
            //     id:'2',
            //     title:'服务协议',
            // }, {
            //     id:'3',
            //     title:'租客须知',
            // }
        ]
        return(
            <View style={PublicStyles.ViewMax}>
                <View
                    style={styles.topView}
                >
                    <View style={styles.logoView}>
                        <Image
                            style={styles.logo}
                            source={AppIcon}
                        />
                    </View>
                    <Text style={styles.nameText}>
                        {
                            AppName
                        }
                    </Text>
                    <Text style={styles.versionText}>
                        {
                            AppVersion
                        }
                    </Text>
                </View>
                <List>
                    {
                        aboutList.map((item,index)=>(
                            <Item
                                key={index}
                                arrow="horizontal"
                                onClick={()=>{
                                    navigation.navigate('PublicWebView',{
                                        title:item.title,
                                        url:`${env.domain}/app/info/detail?id=${item.id}`
                                    })
                                }}
                            >
                                {
                                    item.title
                                }
                            </Item>
                        ))
                    }
                </List>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    topView: {
        alignItems:'center',
        paddingVertical:33,
    },
    logoView:{
        width: 70,
        height: 70,
        marginBottom: 10
    },
    logo:{
        width: 70,
        height: 70,
    },
    nameText:{
        fontSize: 16,
        color: '#333',
        fontFamily: 'PingFangSC-Regular',
        lineHeight: 28,
    },
    versionText:{
        fontSize: 14,
        color: '#999',
        fontFamily: 'PingFangSC-Regular',
        lineHeight: 28,
    },
})

export default AboutUs;
