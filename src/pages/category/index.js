import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from "antd-mobile-rn";

export default class Category extends Component {
    render() {
        return <Button style={styles.btn} type="primary">Category</Button>;
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 100
    },
});
