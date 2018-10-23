import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from "antd-mobile-rn";
import { connect } from "react-redux";
import { getHomeAdData } from "../../actions/home";

@connect(({
    view: {
        home: {
            homeAdData,
            homeAdFetchStatus,
        }
    }
}) => ({
    homeAdData,
    homeAdFetchStatus,
}))
export default class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getHomeAdData())
    }
    render() {
        console.log(this.props);
        return <Button style={styles.btn} type="primary">Start</Button>;
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 100
    },
});
