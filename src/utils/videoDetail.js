import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-af-video-player'
import { PublicStyles } from './PublicStyleModule'


export default class VideoDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        const header = navigation.getParam('fullscreen') === false ? null : undefined
        
        const tabBarVisible = navigation.getParam('fullscreen') === false ? false : true
        return {
            header,
            tabBarVisible,
            title: navigation.getParam('title'),
        }
    };
    onFullScreen(status) {
        this.props.navigation.setParams({
            fullscreen: !status
        })
    }
    render() {
        const {
            video
        } = this.props.navigation.state.params
        return (
            <View style={[PublicStyles.ViewMax,styles.view1]}>
                <Video
                    url={video}
                    onFullScreen={status => this.onFullScreen(status)}
                    rotateToFullScreen={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view1:{
        justifyContent: 'center',
        backgroundColor: '#000',
    },
})