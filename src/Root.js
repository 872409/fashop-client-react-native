import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from "antd-mobile-rn";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return <Button style={styles.btn} type="primary">Start</Button>;
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 100
    },
});

