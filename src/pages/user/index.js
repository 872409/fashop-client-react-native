import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from "antd-mobile-rn";

export default class User extends Component {
    render() {
        return <Button style={styles.btn} type="primary">User</Button>;
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 100
    },
});
