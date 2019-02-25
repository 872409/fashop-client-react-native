import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import Gallery from 'react-native-image-gallery';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { windowWidth } from '../utils/style';

/**
 *  images item example
 {
    caption: 'Remote image with supplied dimensions',
    source: { uri: 'http://i.imgur.com/gSmWCJF.jpg' },
    dimensions: { width: 1200, height: 800 }
 }
 */
export default class PhotoGallery extends Component {
    state = {
        index: this.props.index
    }

    caption() {
        const { index } = this.state;
        const { images } = this.props.navigation.state.params;
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

    galleryCount() {
        const { index } = this.state;
        const { images } = this.props.navigation.state.params;
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
        return (
            <View style={styles.viewMax}>
                <StatusBar
                    barStyle="light-content"
                />
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    initialPage={index}
                    images={images}
                    onPageSelected={(index) => {
                        this.setState({ index });
                    }}
                    onSingleTapConfirmed={()=>{
                        // console.log('onSingleTapConfirmed---单击后即可触发');
                        navigation.goBack()
                    }}
                    onLongPress={()=>{
                        // console.log('onLongPress---长时间按下后触发');
                    }}
                />
                {
                    this.galleryCount()
                }
                {
                    this.caption()
                }
            </View>
        );
    }
}


var styles = StyleSheet.create({
    viewMax: {
        flex: 1,
        backgroundColor: '#000',
    },
    BackButton: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    BackButtonText: {
        color: '#fff',
        fontSize: 17,
    },
    TopBar: {
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: windowWidth,
        top: 40,
        left: 0,
    },
    galleryCount: {
        position: 'absolute',
        width: 60,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        right: 15,
        top: 50
    },
    galleryCountText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        lineHeight: 30
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
