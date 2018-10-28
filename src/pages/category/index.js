import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { PublicStyles, windowWidth, ThemeStyle, windowHeight } from "../../utils/publicStyleModule";
import { connect } from "react-redux";
import { getCategoryList } from "../../actions/category";
import { stateHoc } from "../../utils";

@connect(({
    view: {
        category: {
            categoryList,
            categoryListFetchStatus,
        }
    }
}) => ({
    categoryList,
    fetchStatus: categoryListFetchStatus,
}))
@stateHoc()
export default class Category extends Component {
    state = {
        current: 0,
    }
    hocComponentDidMount() {
        this.props.dispatch(getCategoryList());
    }
    render() {
        const { current } = this.state
        const { categoryList } = this.props
        const currentList = categoryList.filter(item=>item.id===current)
        const child = currentList.length ? currentList[0]._child : []
        return <View style={[PublicStyles.ViewMax, { flexDirection: 'row' }]}>
            <ScrollView style={styles.left}>
                {
                    categoryList.map((item,index)=>{
                        const active = item.id===current
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={.6}
                                style={styles.leftItem}
                                onPress={() => {
                                    this.setState({
                                        current: item.id,
                                        child: item._child
                                    })
                                }}
                            >
                                <Text style={[styles.leftName, { color: active ? ThemeStyle.ThemeColor : '#333' }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <ScrollView style={styles.right}>
                {
                    !current ? this.empty({content: '请选择'}) :
                    current&&child.length ? this.renderRight(child) :
                    current&&!child.length ? this.empty({content: '当前分类为空'}) : null
                }
            </ScrollView>
        </View>;
    }
    renderRight(child){
        return(
            <View style={styles.rightList}>
                {
                    child.map((item,index)=>(
                        <View key={index} style={styles.rightItem}>
                            <Image style={styles.rightImg} source={{uri: item.icon}}></Image>
                            <Text style={PublicStyles.descTwo6}>{item.name}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }
    empty({content}){
        return(
            <View style={styles.emptyWarp}>
                <Image style={styles.emptyImg} source={require('../../images/fetchStatus/searchNullData.png')}></Image>
                <Text style={PublicStyles.descFour9}>{content}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    left: {
        width: windowWidth*0.28,
        backgroundColor: '#fff',
        borderRightWidth: 0.5,
        borderRightColor: '#eaeaea',
    },
    leftItem: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftName: {
        fontSize: 14
    },
    right: {
        width: windowWidth*0.72,
        padding: 10
    },
    rightList: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    rightItem: {
        width: (windowWidth*0.72-20)/3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightImg: {
        width: 52,
        height: 52,
        marginBottom: 10
    },
    emptyWarp: {
        height: windowHeight/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyImg: {
        marginBottom: 10
    },
});
