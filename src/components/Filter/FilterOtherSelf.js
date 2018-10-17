import React, { Component } from 'react';
import { connect } from "react-redux";
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/PublicStyleModule'
import { ThemeButton as Button } from "../theme";
import MultiSlider from "react-native-multi-slider";

export default class FilterOtherSelf extends Component {
    state = {
        result: this.props.current,
        scrollEnabled: true
    }
    render(){
        const { refreshFunc } = this.props;
        const { result, scrollEnabled } = this.state;
        const sexList = ['公', '母']
        return(
            <View style={styles.view5}>
                <ScrollView scrollEnabled={scrollEnabled}>
                    <Text style={styles.filterTitle}>性别</Text>
                    <View style={styles.tagView}>
                        {
                            sexList.map((item, j) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[
                                            styles.touchTag,
                                            {
                                                marginRight: (j + 1) % 4 === 0 ? 0 : 15,
                                            },
                                            result['0']===item ? {
                                                // borderColor: ThemeStyle.ThemeColor,
                                                backgroundColor: ThemeStyle.ThemeColor3,
                                            } : {
                                                // borderColor: '#F8F8F8',
                                                backgroundColor: '#F8F8F8',
                                            }
                                        ]}
                                        onPress={() => {
                                            if(result['0']===item){
                                                this.setState({
                                                    result: { ...this.state.result, '0': null }
                                                })
                                            }else{
                                                this.setState({
                                                    result: { ...this.state.result, '0': item }
                                                })
                                            }
                                        }}
                                        key={j}
                                    >
                                        <Text
                                            style={[
                                                result['0']===item ? {
                                                    color: ThemeStyle.ThemeColor,
                                                } : {
                                                    color: '#333',
                                                }
                                            ]}
                                        >
                                            {
                                                item
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <Text style={styles.filterTitle}>价格区间</Text>
                    <MultiSliderView
                        onValuesChangeStart={()=>{}}
                        onValuesChangeFinish={()=>{}}
                        max={1000}
                        unit={'元'}
                        onValuesChangeStart={() => {
                            if (scrollEnabled === true) {
                                this.setState({
                                    scrollEnabled: false
                                })
                            }
                        }}
                        onValuesChangeFinish={() => {
                            if (scrollEnabled === false) {
                                this.setState({
                                    scrollEnabled: true
                                })
                            }
                        }}
                        ref={e => this.priceSlider = e}
                        initialData={
                            result['1']&&result['2'] ? [result['1'],result['2']] : 
                            result['1']&&!result['2'] ? [result['1'],1000] : 
                            !result['1']&&result['2'] ? [0,result['2']] : null
                        }
                />
                    <View style={styles.btnView}>
                        <Button
                            type='primary'
                            style={{flex: 1 , borderWidth: 0}}
                            onClick={()=>{
                                const price = this.priceSlider.getParams()
                                refreshFunc({result: {
                                    ...result,
                                    '1': price.length&&price[0]!==0 ? price[0] : null,
                                    '2': price.length&&price[1]!==1000 ? price[1] : null,
                                }})
                            }}
                        >
                            确 定
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view5:{
        flexDirection:'row',
    },
    btnView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        paddingVertical: 25,
    },
    filterTitle:{
        fontSize: 14,
        color: '#999',
        fontFamily: 'PingFangSC-Regular',
        marginVertical: 20,
        marginLeft: 15
    },
    tagView:{
        marginHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchTag:{
        justifyContent: 'center',
        alignItems: 'center',
        width: (windowWidth-15*5)/4,
        height: 30,
        // paddingVertical: 8,
        // paddingHorizontal: 24,
        marginBottom: 15,
        // borderWidth: 0.5,
        borderRadius: 3,
    }
})


class MultiSliderView extends Component {
    constructor(props) {
        super(props);
        const { initialData } = this.props
        this.state = {
            min: 0,
            max: this.props.max,
            initialData: initialData && initialData.length ? initialData : [0, this.props.max],
            newData: initialData && initialData.length ? initialData : [0, this.props.max],
        };
    }
    render() {
        const { max, unit } = this.props
        const { initialData, newData } = this.state
        return (
            <View style={{paddingHorizontal: 15}}>
                <View style={multiSliderStyles.MultiSliderTitleView}>
                    <Text style={multiSliderStyles.MultiSliderTitleText}>{newData[0]}{unit}</Text>
                    <Text style={multiSliderStyles.MultiSliderTitleText}>
                        {
                            newData[1] === max ? '不限' : `${newData[1]}${unit}`
                        }
                    </Text>
                </View>
                <MultiSlider
                    values={initialData}
                    min={0}
                    max={max}
                    onValuesChange={(e) => {
                        this.setState({
                            newData: e
                        })
                    }}
                    step={10}
                    onValuesChangeStart={this.props.onValuesChangeStart}
                    onValuesChangeFinish={this.props.onValuesChangeFinish}
                    sliderLength={windowWidth - 60}
                    markerStyle={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#FFFFFF', borderWidth: 0.5, borderColor: '#DCDCDC', marginBottom: 10, }}
                    selectedStyle={{ backgroundColor: '#EAEAEA', height: 2 }}
                    unselectedStyle={{ backgroundColor: '#EAEAEA', height: 2 }}
                    containerStyle={{ marginLeft: 15, marginTop: 10 }}
                    touchDimensions={{
                        height: 40,
                        width: 30,
                        borderRadius: 15,
                        slipDisplacement: 30,
                        top: -15
                    }}
                />
            </View>
        )
    }
    getParams() {
        const { newData, min, max } = this.state
        if (newData[0] !== min || newData[1] !== max) {
            return newData
        } else {
            return []
        }
    }
}


const multiSliderStyles = StyleSheet.create({
    MultiSliderView: {
    },
    MultiSliderTitleView: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    MultiSliderTitleText: {
        color: ThemeStyle.ThemeColor,
        fontSize: 16,
    },
})
