import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Stepper } from "antd-mobile-rn";
import { windowWidth } from "../../utils/publicStyleModule";

export default class CartItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked || props.defaultChecked || false,
            title: props.checked || '',
            spec: props.spec || '',
            price: props.price || 0,
            number: props.number || 1,
            cover:props.cover || '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.checked === true) {
            this.setState({
                checked: !!nextProps.checked,
            });
        }
    }

    onCheckboxClick = () => {
        if (this.props.disabled) {
            return;
        }
        const checked = !this.state.checked;
        if (!(typeof this.props.checked === true)) {
            this.setState({
                checked,
            });
        }
        if (this.props.onCheckboxClick) {
            this.props.onCheckboxClick(checked);
        }
    }
    onStepperChange = (value) => {
        if (this.props.onStepperChange) {
            this.props.onStepperChange(value);
        }
    }

    render() {
        const checked = this.state.checked;
        const {title,price,spec,number,cover} = this.props
        let imgSrc;
        imgSrc = checked ? require('../../images/cart/checked.png') : require('../../images/cart/check.png');
        return <View style={styles.cartCardItem}>
            <TouchableWithoutFeedback onPress={this.onCheckboxClick}>
                <Image style={styles.cartCardCheck} source={imgSrc} />
            </TouchableWithoutFeedback>
            <View style={styles.cartCard}>
                <Image style={styles.cartCardImage}
                       source={{ uri: cover }} />
                <View style={styles.cartCardTitleSpec}>
                    <Text style={styles.cartCardTitle}
                          numberOfLines={2}>{title}</Text>
                    <Text style={styles.cartCardSpec}>{spec}</Text>
                    <View style={styles.cartCardFooter}>
                        <Text style={styles.cartCardPrice}>¥ {price}</Text>
                        <View style={styles.cartCardStepper}>
                            <Stepper
                                size="small"
                                key="1"
                                max={99}
                                min={1}
                                readOnly={false}
                                defaultValue={number}
                                onChange={this.onStepperChange}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }

}

const styles = StyleSheet.create({
    cartCardItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    cartCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    cartCardImage: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    cartCardCheck: {
        width: 16,
        height: 16,
        marginRight: 15,
        marginTop: 30
    },
    cartCardTitleSpec: {
        width: windowWidth - 30 - 16 - 15 - 75 - 10,
    },
    cartCardTitle: {
        color: '#333333',
        lineHeight: 20,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '800',
        fontFamily: 'PingFangSC-Regular',
    },
    cartCardSpec: {
        justifyContent: 'space-between',
        marginBottom: 6,
        color: '#999'
    },
    cartCardSpecCanSkuSelect: {
        alignItems: 'center',
        padding: 5,
    },
    cartCardSpecText: {
        color: '#999',
        lineHeight: 11,
        height: 11,
        fontSize: 11,
        marginRight: 5,
    },
    cartCardPriceSpecImage: {
        width: 6,
        height: 6,
    },
    cartCardFooter: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 28

    },
    cartCardPrice: {
        color: '#FF635C',
        fontSize: 14,
        fontWeight: '800',
        fontFamily: 'PingFang SC',
    },
    cartCardStepper: {
        width: 100
    }
});
