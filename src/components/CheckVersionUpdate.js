import React,{ Component,PropTypes } from 'react';
import{
    StyleSheet,
    View,
    Image,
    Modal,
    Text,
    ActivityIndicator,
    Animated,
    TouchableOpacity,
    Linking,
} from 'react-native';

import {windowWidth,ThemeStyle} from '../utils/PublicStyleModule';
import {setShowVersionUpdate} from '../actions/app';
import {Toast} from '../utils/PublicFuncitonModule';
import { connect } from "react-redux";


class CheckVersionUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render() {
        const {
            showVersionUpdate
        } = this.props
        return (
            <Modal
                animationType = {'fade'}
                transparent={true}
                visible={showVersionUpdate}
                onRequestClose={() => {this.hide()}}
            >
                <AnimatedVersionView
                    confirm = {()=>{
                        this.confirm()
                    }}
                    cancel = {()=>{
                        this.cancel()
                    }}
                />
            </Modal>
        )
    }
    confirm(){
        const {
            updateData
        } = this.props
        Linking.openURL(updateData.download_url).catch((err)=>{console.warn(err);})
    }
    cancel(){
        const {
            updateState,
            dispatch
        } = this.props
        switch(updateState){
            case 'required' :
                return Toast.warn('必须要升级,不能关闭')
            case 'optional' :
                dispatch(setShowVersionUpdate(false))
                return true
        }
    }
}


class AnimatedVersionView extends Component{
    state = {
        bounceValue : new Animated.Value(0),
    };
    componentDidMount(){
        this.state.bounceValue.setValue(0);
        Animated.spring(
          this.state.bounceValue,
          {
            toValue: 1,
            friction: 4,
            tension : 20,
          }
        ).start();
    }
    render(){
        const {
            confirm,
            cancel,
        } = this.props
        return(
            <View style={{flex:1,backgroundColor:'#rgba(0,0,0,0.6)',alignItems:'center',justifyContent:'center'}}>
                <Animated.View  style={{
                    borderRadius:10,
                    width:windowWidth*0.8,
                    backgroundColor:'#fff',
                    overflow:'hidden',
                    transform: [
                        {scale: this.state.bounceValue},
                      ]
                }}>
                    <View style={{height:60,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:14,color:'#333'}}>版本更新</Text>
                        <Text style={{fontSize:12,color:'#333',marginTop:10}}>检测到有新版本，是否更新</Text>
                    </View>
                    <View style={{height:40,flexDirection:'row',borderTopWidth:1,borderColor:'#e2e2e2'}}>
                        <TouchableOpacity
                            style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}
                            activeOpacity={1}
                            onPress={()=>{
                                cancel()
                            }}
                        >
                            <Text style={{fontSize:12,color:'#333'}}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex:1,backgroundColor:ThemeStyle.ThemeColor,alignItems:'center',justifyContent:'center'}}
                            activeOpacity={1}
                            onPress={()=>{
                                confirm()
                            }}
                        >
                            <Text style={{fontSize:12,color:'#fff'}}>更新</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    WaitingViewMax:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignItems:'center',
        justifyContent:'center',
    },
    WaitingViewMain:{
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding:40,
        borderRadius:5,
    },
    WaitingViewText:{
        color:'#fff',
        marginTop:5,
    },
})


const mapStateToProps = store => {
    return {
        updateState: store.app.initial.versionUpdateState,
        updateData: store.app.initial.versionUpdateData,
        showVersionUpdate: store.app.initial.showVersionUpdate,
    };
};

export default connect(mapStateToProps)(CheckVersionUpdate);
