import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
// import SafeAreaView from "react-native-safe-area-view";

export default class Ad extends Component {
    state = {
        wait: 5,
    }
    componentDidMount() {
        this.timer = window.setInterval(() => {
            if (this.state.wait == 1) {
                this.props.navigation.navigate("App");
            } else {
                this.setState({
                    wait: this.state.wait - 1
                })
            }
        }, 1000);
    }
    componentWillUnmount() {
        this.timer && window.clearInterval(this.timer)
    }
    render() {
        const { wait } = this.state
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.launchImage}
                    source={require('../../images/ad.png')}
                >
                    <TouchableWithoutFeedback 
                        onPress={() => {
                            navigation.navigate('App')
                        }}
                    >
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonTitle}>{wait}s跳过</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    launchImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    buttonContainer: {
        position: 'absolute',
        width: 60,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        right: 20,
        top: 50
        // top: getStatusBarHeight() + 10
    },
    buttonTitle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        lineHeight: 30
    },
})