import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableOpacity,
    ScrollView,
    CameraRoll,
} from 'react-native';

import Gallery from 'react-native-image-gallery';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {windowWidth} from './PublicStyleModule';


export default class PhotoGalleryView extends Component{
    state = {
        index: this.props.index
    }
    caption = () => {
        const { images } = this.props.navigation.state.params;
        const { index } = this.state;
        return (
            <View style={styles.caption}>
                <Text style={styles.captionText}>
                    {
                        (images[index] && images[index].caption) || ''
                    } 
                </Text>
            </View>
        );
    }

    galleryCount = () => {
        const { images } = this.props.navigation.state.params;
        const { index } = this.state;
        return (
            <View style={styles.galleryCount}>
                <Text style={styles.galleryCountText}>
                    {index + 1} / {images.length}
                </Text>
            </View>
        );
    }
    render() {
        const {
            navigation
        } = this.props
        const {
            images,
            index,
        } = navigation.state.params
        // images item example
        // {
        //     caption: 'Remote image with supplied dimensions',
        //     source: { uri: 'http://i.imgur.com/gSmWCJF.jpg' },
        //     dimensions: { width: 1200, height: 800 }
        // }
        return (
            <View style={styles.viewMax}>
                <Gallery
                    style={{flex: 1, backgroundColor: 'black'}}
                    initialPage = {index}
                    onPageSelected={(index)=>{
                        this.setState({ index });
                    }}
                    images={images}
                />
                <View style={styles.TopBar}>
                    <TouchableOpacity
                        style={styles.BackButton}
                        onPress={()=>{
                            navigation.goBack()
                        }}
                        activeOpacity={1}
                    >
                        <Icon
                            name={'chevron-left'}
                            color={'#fff'}
                            size = {30}
                        />
                        <Text style={styles.BackButtonText}>返回</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.galleryCount
                }
                {
                    this.caption
                }
            </View>
        );
    }
}



var styles = StyleSheet.create({
    viewMax:{
        flex:1,
        backgroundColor:'#000',
    },
    BackButton:{
        height:40,
        flexDirection :'row',
        alignItems :'center',
    },
    BackButtonImg:{
        width:17,
        height:35,
    },
    BackButtonText:{
        color:'#fff',
        fontSize:17,
    },
    TopBar:{
        backgroundColor:'rgba(0,0,0,0)',
        flexDirection :'row',
        paddingHorizontal :10,
        justifyContent:'space-between',
        alignItems:'center',
        position:'absolute',
        width:windowWidth,
        top:40,
        left:0,
    },
    MoreButton:{
        width:40,
        height:40,
        alignItems :'center',
        justifyContent : 'center',
    },
    MoreButtonImg:{
        width:25,
        height:25,
    },
    galleryCount: { 
        top: 30, 
        height: 65, 
        right: 15,
        position: 'absolute', 
        justifyContent: 'center',
    },
    galleryCountText: { 
        color: 'white', 
        fontSize: 15, 
        fontStyle: 'italic', 
    },
    caption: { 
        bottom: 30, 
        height: 65, 
        width: '100%', 
        position: 'absolute', 
        justifyContent: 'center' 
    },
    captionText: { 
        textAlign: 'center', 
        color: 'white', 
        fontSize: 15, 
        fontStyle: 'italic' 
    }
})
