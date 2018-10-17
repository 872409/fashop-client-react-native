import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { imagePicker } from '../../utils/ImagePickerModule';
import { ThemeStyle } from '../../utils/PublicStyleModule';
import { Toast } from '../../utils/PublicFuncitonModule';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ImagePickers extends Component {
    static defaultProps = {
        type: 'user_avatar', 
        onChange: ()=>{}, 
        max_num: 3,
        defaultValue: []
    }
    state = {
        images: this.props.defaultValue ? this.props.defaultValue : []
    }
    render() {
        const { images } = this.state
        const { type, onChange, max_num } = this.props
        return (
            <View style={styles.imagePickerOut}>
                {
                    images.map((item, index) => (
                        <View style={styles.subImage} key={index}>
                            <TouchableOpacity 
                                style={styles.closeView} 
                                activeOpacity={0.8}
                                onPress={()=>{
                                    Alert.alert(
                                        '要删除当前图片吗？',
                                        '',
                                        [
                                            { text: '取 消', onPress: () => console.log('Cancel Pressed') },
                                            {
                                                text: '确 认',
                                                onPress: () => {
                                                    let newimages = images.concat()
                                                    newimages.splice(index, 1)
                                                    onChange({ images: newimages })
                                                    this.setState({
                                                        images: newimages
                                                    })
                                                }
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                <Image 
                                    style={{ height: 16, width: 16 }} 
                                    source={require('../../images/delicon.png')} 
                                />
                            </TouchableOpacity>
                            <Image source={{ uri:item }} style={{ width: 75, height: 75 }}/>
                        </View>
                    ))
                }
                {
                    images.length >= max_num ? null : 
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.pickerView}
                        onPress={() => {
                            imagePicker((e) => {
                                if (e.errcode == 0) {
                                    onChange({ images: [...images, e.data.url] })
                                    this.setState({
                                        images: [...images,e.data.url]
                                    })
                                } else {
                                    Toast.warn('上传图片异常')
                                }
                            }, {
                                type
                            })
                        }}
                    >
                        <Ionicons
                            name='ios-add'
                            color={ThemeStyle.ThemeColor}
                            size={40}
                        />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imagePickerOut: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
    },
    pickerView: {
        width: 75,
        height: 75,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderRadius: 3,
        borderStyle: 'dashed',
    },
    subImage: {
        height: 75,
        width: 75,
        marginRight: 10,
        marginBottom: 10,
    },
    closeView: {
        position: 'absolute',
        top: -6,
        right: -6,
        zIndex: 1,
    },
})
