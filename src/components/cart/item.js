import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { windowWidth, ThemeStyle, PublicStyles } from "../../utils/style";
import CartCheckbox from "./checkbox"
import { NetworkImage } from "../theme";
import Stepper from "../goods/stepper";

export default class CartItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked || false,
            title: props.title || '',
            spec: props.spec || '',
            price: props.price || 0,
            number: props.number || 1,
            cover: props.cover || '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.state.checked) {
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
    onImageClick = () => {
        if (this.props.onImageClick) {
            this.props.onImageClick();
        }
    }
    onTitleClick = () => {
        if (this.props.onTitleClick) {
            this.props.onTitleClick();
        }
    }

    render() {
        const checked = this.state.checked;
        const { title, price, spec, number, cover, goodsStock, index } = this.props
        return <View style={[styles.cartCardItemWarp, PublicStyles.rowCenter]}>
            <CartCheckbox onClick={this.onCheckboxClick} checked={checked} style={styles.cartCardCheck} />
            <View style={[styles.cartCardItem,{borderTopWidth: index===0 ? 0 : .5}]}>
                <View style={styles.cartCard}>
                    <TouchableOpacity onPress={this.onImageClick} activeOpacity={0.5}>
                        <NetworkImage style={styles.cartCardImage} source={{ uri: cover }} />
                    </TouchableOpacity>
                    <View style={styles.cartCardTitleSpec}>
                        <TouchableOpacity onPress={this.onTitleClick} activeOpacity={0.5}>
                            <Text style={styles.cartCardTitle} numberOfLines={2}>{title}</Text>
                        </TouchableOpacity>
                        <Text style={styles.cartCardSpec}>{spec}</Text>
                        <View style={styles.cartCardFooter}>
                            <Text style={styles.cartCardPrice}>¥ {price}</Text>
                            <View style={styles.cartCardStepper}>
                                <Stepper
                                    stock={goodsStock ? Number(goodsStock) : 99}
                                    defaultValue={number}
                                    onChange={this.onStepperChange}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }

}

const styles = StyleSheet.create({
    cartCardItemWarp: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 15,
    },
    cartCardItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingRight: 15,
        borderTopColor: '#EAEAEA',
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
        fontSize: 15,
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
        color: ThemeStyle.ThemeColor,
        fontSize: 15,
        fontWeight: '800',
        fontFamily: 'PingFang SC',
    },
    cartCardStepper: {
        width: 100
    }
});
