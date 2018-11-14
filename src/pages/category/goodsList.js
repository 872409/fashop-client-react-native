import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import ShopItem from '../../components/public/ShopItem';
import { PublicStyles, windowHeight } from '../../utils/publicStyleModule';
import { ListView } from "../../utils/publicViewModule";

export default class GoodsList extends Component {
    render() {
        const { navigation } = this.props;
        const { category_id, keywords } = navigation.state.params
        return <View style={PublicStyles.ViewMax}>
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                renderItem={({ item }) => (
                    <Text>123</Text>
                    // <ShopItem
                    //     img={item.img}
                    //     star={item.star}
                    //     title={item.title}
                    //     address={item.address}
                    //     onPress={() => {
                    //         navigation.navigate("GoodsDetail", {
                    //             id: item.id
                    //         });
                    //     }}
                    // />
                )}
                fetchParams={{
                    category_id,
                    keywords
                }}
                apiName='STORESEARCHSEARCH'
            />
        </View>;
    }
}

const styles = StyleSheet.create({

});
