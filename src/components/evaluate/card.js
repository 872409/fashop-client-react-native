import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";
import { OrderButton } from '../../components'

export default class EvaluateCard extends Component {
    static propTypes = {
        goodsInfo: PropTypes.object,
    };
    static defaultProps = {
        goodsInfo: null,
    };

    onGoods() {
        if (this.props.onGoods) {
            this.props.onGoods();
        }
    }

    onDetail() {
        if (this.props.onDetail) {
            this.props.onDetail();
        }
    }

    onAdd() {
        if (this.props.onAdd) {
            this.props.onAdd();
        }
    }

    onAdditional() {
        if (this.props.onAdditional) {
            this.props.onAdditional();
        }
    }

    render() {
        const { goodsInfo } = this.props

        return <View style={styles.evaluateGoodsard}>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.content}>
                        <View style={styles.image} onPress={this.onGoods()}>
                            <Image source={{
                                uri: goodsInfo.goods_img
                            }} resizeMode={'contain'} />
                        </View>
                        <View style={styles.body}>
                            <Text onPress={this.onGoods()}>{goodsInfo.goods_title}</Text>
                            <View style={styles.buttonArea}>
                                {goodsInfo.evaluate_state > 0 ? <OrderButton
                                    text="查看评价"
                                    size="small"
                                    onClick={() => {
                                        this.onDetail()
                                    }} /> : null}
                                {goodsInfo.evaluate_state === 0 ?
                                    <OrderButton
                                        text="去评价"
                                        size="small"
                                        type={'danger'}
                                        onClick={() => {
                                            this.onAdd()
                                        }}
                                    /> : null}
                                {goodsInfo.evaluate_state === 1 ? <OrderButton
                                    text="追加评价"
                                    size="small"
                                    type={'danger'}
                                    onClick={() => {
                                        this.onAdditional()
                                    }}
                                /> : null}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    "evaluate_goods_card": {
        "position": "relative",
        "borderBottom": "1px solid #F8F8F8",
        "backgroundColor": "#FFFFFF"
    },
    "evaluate_goods_card__item": {
        "padding": "15px"
    },
    "evaluate_goods_card__content": {
        "display": "flex",
        "justifyContent": "flex-start"
    },
    "evaluate_goods_card__item_image": {
        "width": "80px",
        "height": "80px",
        "display": "block",
        "marginRight": "10px"
    },
    "evaluate_goods_card__item__body": {},
    "evaluate_goods_card__item__body_text": {
        "fontSize": "14px",
        "color": "#333",
        "lineHeight": "18px",
        "display": "block",
        "overflow": "hidden"
    },
    "evaluate_goods_card__item__end": {
        "textAlign": "right",
        "marginLeft": "20px"
    },
    "evaluate_goods_card__item__footer": {
        "display": "flex",
        "justifyContent": "flex-end"
    },
    "evaluate_goods_card__button_area": {
        "position": "absolute",
        "bottom": "15px",
        "right": "15px"
    }
})
