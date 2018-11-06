import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class AddressCard extends Component {
    static propTypes = {
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        checked: PropTypes.bool
    };
    static defaultProps = {
        name: null,
        phone: null,
        address: null,
        checked: false,
    };

    onEdit() {
        if (this.props.onEdit) {
            this.props.onEdit();
        }
    }

    onChecked() {
        if (this.props.onChecked) {
            this.props.onChecked();
        }
    }

    render() {
        const { name, phone, address, checked } = this.props
        return <View style={styles.addressCard}>
            <View style={styles.info}>
                {checked === true ? <View style={styles.checked} onPress={() => {
                    this.onChecked()
                }}>
                    <Icon style={styles.weuiIconRadio} type={'success'} size={16} color={'red'} />
                </View> : null}
                <View style={styles.user} onPress={() => {
                    this.onChecked()
                }}>
                    <View style={styles.namePhone}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.phone}>{phone}</Text>
                    </View>
                    <View style={styles.address}>{address}</View>
                </View>
            </View>
            <View style={styles.action}>
                <Text style={styles.edit} onPress={() => {
                    this.onEdit()
                }}>编辑</Text>
            </View>
        </View>
    }
};
