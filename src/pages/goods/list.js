import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
// import React, { Component } from 'react';
// import { StyleSheet, View, Text, ListView, FlatList } from 'react-native';
// import PropTypes from 'prop-types';
// import { LottieIosRefreshControl } from '../../components/refreshControl';
// import { ScrollView } from 'react-native-mjrefresh'

// export default class FlatListExample extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8'],
//         };
//     }
//     _onRefresh = () => {
//         setTimeout(() => {
//             this._hw && this._hw.finishRefresh()
//         }, 1000)
//     }
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <FlatList
//                     //legacyImplementation 如果需要使用此属性，应从mjrefresh插件中引入Flatlist
//                     keyExtractor={(item) => item}
//                     data={this.state.data}
//                     renderItem={({ item, index }) => <Text key={index} onPress={() => alert(111)} style={{ height: 100 }}>{item}</Text>}
//                     renderScrollComponent={props => <ScrollView
//                         style={{ flex: 1 }}
//                         refreshControl={
//                             <LottieIosRefreshControl
//                                 ref={ref => this._hw = ref}
//                                 onRefresh={this._onRefresh}
//                             />
//                         }
//                         {...props}
//                     />}
//                 />
//             </View>
//         )
//     }
// }