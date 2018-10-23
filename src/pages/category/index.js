import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { PublicStyles, windowHeight, windowWidth, ThemeStyle } from '../../utils/PublicStyleModule'
import { ListEmptyView, ListView } from "../../utils/PublicViewModule";
import DogItem from "../../components/dog/item";
import Publish from "../../components/public/Publish";
import { Fetch } from '../../utils';
import {
    FilterAddress,
    FilterRadio,
    FilterCheckbox,
    FilterOther,
    FilterTitleBar,
    FilterModal,
} from '../../components/Filter'

@connect(
    ({ 
        app: { 
            location: {
                provinceData,
            } 
        } 
    }) => ({
        provinceData,
    }),
)
export default class BreedDog extends Component{
    // componentWillMount() {
    //     this.props.navigation.setParams({
    //         refresh: (keywords) => {
    //             console.log(keywords);
                
    //             this.ListView.setFetchParams({
    //                 keywords
    //             })
    //         }
    //     })
    // }
    state = {
        typeList: [],
        is_recommend: 0,
        filterTitleData: [
            {
                title: '地区',
                open: false,
            }, {
                title: '品种',
                open: false,
            }
        ],
        currentIndex: -1,
        showFilterModal: false,
        filterParams: {
            province: '',
            type: '',
        }
    }
    async componentDidMount(){
        const e = await Fetch.fetch({ apiName: 'BREEDDOGTYPESEARCH' })
        this.setState({
            typeList: e.list
        })
        this.props.navigation.setParams({
            refresh: (keywords) => {
                this.ListView.setFetchParams({
                    keywords
                })
            }
        })
    }
    titleBarOnPress = ({ index, open }) => {
        const {
            filterTitleData
        } = this.state
        if (open) {
            this.showFilterModal({ open, filterTitleData, index })
        } else {
            this.FilterModal.hideModal()
        }
    }
    showFilterModal = ({ open, filterTitleData, index }) => {
        const newData = filterTitleData.map((e, i) => i === index ? { ...e, open } : { ...e, open: false })
        this.setState({
            filterTitleData: newData,
            currentIndex: index,
            showFilterModal: open
        })
    }
    hideFilterModal = ({ open, filterTitleData }) => {
        const newData = filterTitleData.map((e, i) => ({ ...e, open: false }))
        this.setState({
            filterTitleData: newData,
            showFilterModal: open,
            currentIndex: -1
        })
    }
    refreshFunc = ({ params, filterParams }) => {
        // console.log('params',params);
        // console.log('filterParams',filterParams);
        this.FilterModal.hideModal()
        this.ListView.setFetchParams(params)
        this.setState({
            filterParams
        })
    }
    render() {
        const { typeList, filterTitleData, filterParams, showFilterModal, currentIndex, is_recommend } = this.state;
        const { navigation, provinceData } = this.props;
        const newData = provinceData.map(({id,name},index)=>{
            return{
                id,
                title: name
            }
        })
        return <View style={PublicStyles.ViewMax}>
            <FilterTitleBar
                current={[
                    {
                        title: filterParams.province.length ? filterParams.province : filterTitleData[0].title,
                        color: filterParams.province.length ? true : false
                    }, {
                        title: filterParams.type.length ? filterParams.type : filterTitleData[1].title,
                        color: filterParams.type.length ? true : false
                    }
                ]}
                data={filterTitleData}
                onPress={this.titleBarOnPress}
            />
            <ListView
                ref={e => this.ListView = e}
                keyExtractor={e => String(e.id)}
                renderItem={({ item, index }) => (
                    <View style={{backgroundColor: '#fff'}}>
                        <DogItem
                            index={index}
                            img={item.images[0]}
                            title={item.title}
                            price={item.price}
                            sex={item.sex}
                            type_title={item.type_title}
                            province_name={item.province_name}
                            name={item.user_nickname}
                            avatar={item.user_avatar}
                            create_time={item.create_time}
                            age={item.age}
                            onPress={() => {
                                navigation.navigate('BreedDogDetail', {
                                    ...item
                                })
                            }}
                        />
                    </View>
                )}
                apiName='BREEDDOGSEARCH'
                ListEmptyComponent={() => (
                    <ListEmptyView
                        height={windowHeight - 160}
                        desc='暂时没有相关信息'
                        uri={require('../../images/fetchStatus/nullData.png')}
                    />
                )}
            />
            <FilterModal
                visible={showFilterModal}
                hide={()=>{
                    this.hideFilterModal({open: false,filterTitleData})
                }}
                ref={e=>this.FilterModal=e}
            >
                {
                    currentIndex===0 ?
                    <FilterRadio
                        current={filterParams.province}
                        refreshFunc={({ id, title }) => {
                            const params = {
                                province_id: id
                            }
                            const filterParams = {
                                ...this.state.filterParams,
                                province: title === '不限' ? '' : title
                            }
                            this.refreshFunc({
                                params,
                                filterParams
                            })
                        }}
                        data={[{ title: '不限', id: null },...newData]}
                    /> :
                    currentIndex===1 ?
                    <FilterRadio
                        current={filterParams.type}
                        refreshFunc={({ id, title }) => {
                            const params =  {
                                type_id: id
                            }
                            const filterParams =  { 
                                ...this.state.filterParams, 
                                type: title === '不限' ? '' : title 
                            }
                            this.refreshFunc({
                                params,
                                filterParams
                            })
                        }}
                        data={[{title:'不限',id: null},...typeList]}
                    /> : null
                }
            </FilterModal>
            <Publish
                style={{ bottom: 15 }}
                onPress={() => {
                    navigation.navigate('BreedDogPublish')
                }}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    
})
