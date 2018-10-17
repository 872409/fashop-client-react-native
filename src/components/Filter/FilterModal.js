import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';
import { windowHeight } from '../../utils/PublicStyleModule'
import { AppPlatform } from "../../utils/APP_ROOT_CONFIG";

export default class FilterModal extends Component {
    state = {
        modalOpacity: new Animated.Value(0),
        modalHeight: new Animated.Value(0),
    }
    componentWillReceiveProps(nextProps) {
        const { visible, height } = this.props
        if(nextProps.visible!==visible){
            Animated.parallel([
                Animated.timing(
                    this.state.modalOpacity,
                    {
                        toValue: nextProps.visible?1:0,
                        duration: 400,
                    }
                ),
                Animated.timing(
                    this.state.modalHeight,
                    {
                        toValue: nextProps.visible ? (height ? height : windowHeight-300) : 0,
                        duration: 300,
                        delay: 200
                    }
                )
            ]).start()
        }
    }
    render(){
        const {
            visible,
            style
        } = this.props
        if(!visible){
            return null
        }
        return(
            <Animated.View
                style={[
                    styles.view3,
                    {
                        opacity: this.state.modalOpacity
                    },
                    style
                ]}
            >
                <Animated.View
                    style={[styles.view4,{
                        height: this.state.modalHeight
                    }]}
                >
                    {
                        this.props.children
                    }
                </Animated.View>
                <Text
                    style={{flex:1}}
                    onPress={()=>{
                        this.hideModal()
                    }}
                />
            </Animated.View>
        )
    }
    hideModal=()=>{
        const {
            hide
        } = this.props
        Animated.parallel([
            Animated.timing(
                this.state.modalHeight,
                {
                    toValue: 0,
                    duration: 300,
                }
            ),
            Animated.timing(
                this.state.modalOpacity,
                {
                    toValue: 0,
                    duration: 500,
                }
            )
        ]).start(()=>{
            hide()
        })
    }
}

const styles = StyleSheet.create({
    view3:{
        backgroundColor:'rgba(0,0,0,0.2)',
        position:'absolute',
        top: 44,
        bottom:0,
        left:0,
        right:0,
    },
    view4:{
        backgroundColor:'#fff',
        height: 0,
    },
})
