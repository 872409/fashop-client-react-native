import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import PropTypes from "prop-types";
import { PublicStyles } from '../../utils/style';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export default class AddressCard extends Component {
    static propTypes = {
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        checked: PropTypes.bool,
        is_default: PropTypes.number,
    };
    static defaultProps = {
        name: null,
        phone: null,
        address: null,
        checked: false,
        is_default: 0,
    };

    render() {
        const { id, name, phone, address, is_default, onEdit, onDel, onAddressChecked, onChangeDefault } = this.props
        return <View style={styles.addressCard}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.info}
                onPress={() => onAddressChecked(id)}
            >
                <View style={styles.user}>
                    <View style={styles.namePhone}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.phone}>{phone}</Text>
                    </View>
                    <View style={styles.address}><Text>{address}</Text></View>
                </View>
            </TouchableOpacity>
            <View style={PublicStyles.rowBetweenCenter}>
                <TouchableOpacity 
                    onPress={() => onChangeDefault(id)}
                    style={[PublicStyles.rowCenter, {padding: 10}]}
                >
                    <AntDesignIcon name="checkcircle" size={16} color={is_default ? 'red' : '#ccc'} />
                    <Text style={styles.actionText}>{is_default ? '默认地址' : '设为默认'}</Text>
                </TouchableOpacity>
                <View style={[PublicStyles.rowCenter,{paddingRight: 10}]}>
                    <TouchableOpacity
                        onPress={() => onEdit(id)}
                        style={[PublicStyles.rowCenter,{marginRight: 10,paddingVertical: 10}]}
                    >
                        <Image style={styles.actionImg} source={require('../../images/edit.png')}></Image>
                        <Text style={styles.actionText}>编辑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onDel(id)}
                        style={[PublicStyles.rowCenter,{paddingVertical: 10}]}
                    >
                        <Image style={styles.actionImg} source={require('../../images/del.png')}></Image>
                        <Text style={styles.actionText}>删除</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
};
const styles = StyleSheet.create({
    addressCard: {
        backgroundColor: '#fff',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    checked: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    info: {
        flexDirection: 'row',
        padding: 15,
    },
    namePhone: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        marginRight: 15,
        fontFamily: 'PingFangSC-Medium',
    },
    phone: {
        fontSize: 15,
        fontWeight: '500',
        marginRight: 15,
        fontFamily: 'PingFangSC-Medium',
    },
    address: {
        fontSize: 15,
        color: '#999999'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionImg: {
        width: 20,
        height: 20,
    },
    actionText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#999'
    }
})
