import React,{ Component } from 'react';
import {windowWidth} from '../../utils/PublicStyleModule';
import PropTypes from 'prop-types';
import{
    StyleSheet,
    View,
    Image,
    AppState,
} from 'react-native';
// import LottieView from 'lottie-react-native';
import { Button } from 'antd-mobile-rn';

export default class Login extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : windowWidth*0.4,
        autoLayout : false,
    };
    // componentDidMount() {
    //     this.animation&&this.animation.play();
    //     AppState.addEventListener('change', (e)=>{
    //         if(e==='active'){
    //             this.animation&&this.animation.play();
    //         }
    //     })
    // }
    // componentWillUnmount() {
    //     AppState.removeEventListener('change', (e)=>{});
    // }
    render() {
        const {autoLayout,height,pushLoginFunc} = this.props
        return (
            <View
                style={
                    Object.assign({},styles.loaddingView,
                        autoLayout
                        ?   {
                                flex:1
                            }
                        :   {
                                height,
                            }
                    )
                }
            >
                {
                    <Image
                        source={require('../../images/fetchStatus/loading.gif')}
                        style={
                            Object.assign({},styles.loaddingImage,
                                autoLayout
                                ?   {
                                        width: windowWidth*0.5,
                                    }
                                :   {
                                        height:height*0.5,
                                        width:height*0.5,
                                    }
                            )
                        }
                        resizeMode = {'contain'}
                    />
                }
                {/* <View
                    style={
                        autoLayout
                        ?   {
                                height:windowWidth*1.4,
                                width: windowWidth*0.9,
                            }
                        :   {
                                height:height*0.7,
                                width:height*0.8,
                                marginTop:height*0.4
                            }
                    }
                >
                    <LottieView
                        ref={animation => {
                          this.animation = animation;
                        }}
                        source={require('../../images/fetchStatus/login.json')}
                        style={
                            Object.assign({},styles.loaddingImage,
                                autoLayout
                                ?   {
                                        height:windowWidth*1.4,
                                        width: windowWidth*0.9,
                                    }
                                :   {
                                        height:height*0.7,
                                        width:height*0.8,
                                    }
                            )
                        }
                        loop={true}
                    />
                    <Button
                        type={'primary'}
                        onClick={()=>{
                            pushLoginFunc()
                        }}
                    >
                        登陆后查看
                    </Button>
                </View> */}
            </View>
        )
    }
}


const styles = {
    loaddingView:{
        justifyContent:'center',
        alignItems:'center',
    },
    loaddingImage:{

    },
}
