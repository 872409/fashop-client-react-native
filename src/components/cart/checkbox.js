import React, { Component } from 'react';
import { StyleSheet,  Image, TouchableWithoutFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { ThemeStyle } from '../../utils/style';

export default class CartCheckbox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked || false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.state.checked) {
            this.setState({
                checked: !!nextProps.checked,
            });
        }
    }

    onClick = () => {
        if (this.props.disabled) {
            return;
        }
        const checked = !this.state.checked;
        if (!(typeof this.props.checked === true)) {
            this.setState({
                checked,
            });
        }
        if (this.props.onClick) {
            this.props.onClick(checked);
        }
    }


    render() {
        const checked = this.state.checked;
        return <TouchableWithoutFeedback onPress={this.onClick}>
            <MaterialIcon
                name={checked ? 'check-box' : 'check-box-outline-blank'}
                color={checked ? ThemeStyle.ThemeColor : '#EAEAEA'}
                size={18}
                style={this.props.style}
            />
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({
    cartCardCheck: {
        width: 16,
        height: 16,
    },
});
