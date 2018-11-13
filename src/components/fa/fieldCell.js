import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from "prop-types";

export default class FieldCell extends Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
        right: PropTypes.element,
    };
    static defaultProps = {
        title: null,
        desc: null,
        right: null,
    };

    render() {
        const { title, desc, right, children } = this.props
        return <View style={styles.cell}>
            {title || desc || right ?
                <View>
                    {
                        title || desc ?
                            <View>
                                <Text>
                                    {title}
                                </Text>
                                <Text>{desc}</Text>
                            </View>
                            : null
                    }
                    {right ?
                        <View>
                            {right}
                        </View>
                        : null}
                </View>
                : null}
            {
                children ?
                    <View>
                        {children}
                    </View>
                    : null
            }

        </View>
    }
}
const styles = StyleSheet.create({
    cell: {},
    item: {
        alignItems: "center"
    },
    itemNum: {},
    itemSymbol: {}
})
