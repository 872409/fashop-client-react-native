import React, { Component } from 'react';
import { View } from 'react-native';
import GoodsItem from "../../components/goods/item";
import { PublicStyles } from '../../utils/style';
import { ListView } from "../../utils/view";
import { GoodsApi } from '../../config/api/goods'
import { SearchBar } from 'antd-mobile-rn'

export default class GoodsList extends Component {
    render() {
        const { navigation } = this.props;
        const { category_id, keywords, autoFocus } = navigation.state.params;
        return <View style={PublicStyles.ViewMax}>
            <SearchBar
                placeholder='搜索'
                returnKeyType='search'
                autoFocus={autoFocus}
                showCancelButton={false}
                defaultValue={keywords}
                onSubmit={value => {
                    this.ListView.setFetchParams({
                        keywords: value
                    })
                }}
            />
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <GoodsItem
                        data={item}
                        index={index}
                        onPress={() => {
                            navigation.navigate("GoodsDetail", {
                                id: item.id
                            });
                        }}
                    />
                )}
                api={GoodsApi.list}
                fetchParams={{
                    category_ids: [parseInt(category_id)],
                    keywords
                }}
            />
        </View>;
    }
}
