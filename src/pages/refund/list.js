import React, { Component } from 'react';
import { View } from 'react-native';
import { RefundCard } from '../../components'
import FlatList from "../../components/flatList";
import { PublicStyles } from "../../utils/style";
import { RefundApi } from "../../config/api/refund";

export default class RefundList extends Component {

    onDetail(id) {
        this.props.navigation.navigate('RefundDetail', { id })
    }

    render() {
        return <View style={PublicStyles.ViewMax}>
            <FlatList
                ref={e => this.FlatList = e}
                keyExtractor={e => String(e.id)}
                api={RefundApi.list}
                renderItem={({ item }) => (
                    <View style={{marginBottom: 8}}>
                        <RefundCard
                            refundInfo={item}
                            onClick={() => {
                                this.onDetail(item.id)
                            }}
                        />
                    </View>
                )}
            />
        </View>
    }
}
