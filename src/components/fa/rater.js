import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class FaRater extends Component {
    static propTypes = {
        size: PropTypes.number,
        num: PropTypes.number,
        value: PropTypes.number,
    };
    static defaultProps = {
        size: 12,
        num: 5,
        value: 3,
    };

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange({ value });
        }
    }

    render() {
        const { value, num, size } = this.props
        let list = []
        for (let i = 1; i <= num; i++) {
            list = i
        }

        return <View style={styles.raterList}>
            {
                list.map((item, index) => {
                    return <View>
                        {index < value ?
                            <Image
                                source={require('../../images/fa/rater/active.png')} style={{
                                width: size,
                                height: size,
                            }}
                                resizeMode="stretch"
                                onPress={() => {
                                    this.onChange(index + 1)
                                }}
                            /> : null}
                        {index >= value ?
                            <Image
                                source={require('../../images/fa/rater/default.png')}
                                style={{
                                    width: size,
                                    height: size,
                                }}
                                resizeMode="stretch"
                                onPress={() => {
                                    this.onChange(index + 1)
                                }} /> : null}
                    </View>
                })
            }
        </View>
    }
}
