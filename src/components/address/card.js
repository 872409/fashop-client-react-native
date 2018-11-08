import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
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

    onEdit(id) {
        console.log(this.props.onEdit)
        if ( this.props.onEdit) {
            console.log('--------')
            this.props.onEdit(id);
        }
    }
    render() {
        const { id,name, phone, address } = this.props
        return <View style={styles.addressCard}>
            <View style={styles.info}>
                <View style={styles.user}>
                    <View style={styles.namePhone}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.phone}>{phone}</Text>
                    </View>
                    <View style={styles.address}><Text>{address}</Text></View>
                </View>
            </View>
            <TouchableOpacity style={styles.action} onPress={()=>{
                this.onEdit(id)
            }}>
                <Text style={styles.edit}>编辑</Text>
            </TouchableOpacity>
        </View>
    }
};
const styles = StyleSheet.create({
    addressCard: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'#fff'
    },
    checked: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    info: {
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
