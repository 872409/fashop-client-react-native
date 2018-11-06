import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { Icon } from 'antd-mobile-rn';

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
                {checked === true ? <TouchableOpacity style={styles.checked} onPress={() => {
                    this.onChecked()
                }}>
                    <Icon style={styles.weuiIconRadio} type={'success'} size={16} color={'red'} />
                </TouchableOpacity> : null}
                <TouchableOpacity style={styles.user} onPress={() => {
                    this.onChecked()
                }}>
                    <View style={styles.namePhone}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.phone}>{phone}</Text>
                    </View>
                    <View style={styles.address}><Text>{address}</Text></View>
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <Text style={styles.edit} onPress={() => {
                    this.onEdit()
                }}>编辑</Text>
            </View>
        </View>
    }
};
const styles = StyleSheet.create({
    addressCard: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checked: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    }, info: {
        flexDirection: 'row',
    },
    namePhone: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: '800',
        marginRight: 15,
        lineHeight: 14,

    },
    phone: {
        fontSize: 14,
        fontWeight: '800',
        marginRight: 15,
        lineHeight: 14,

    },
    address: {
        fontSize: 14,
        lineHeight: 14,

        color: '#999999'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    edit: {
        fontSize: 14,
        lineHeight: 14,

        color: '#ff4400'
    }
})
