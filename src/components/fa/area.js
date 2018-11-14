import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { Picker } from 'antd-mobile-rn';

export default class Area extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        areaNames: PropTypes.string,
        selected: PropTypes.array,
        areaList: PropTypes.array,
        columnsNum: PropTypes.number
    };
    static defaultProps = {
        placeholder: '请选择地区',
        areaNames: null,
        selected: [0, 0, 0],
        areaList: null,
        // 省市县显示列数，3-省市县，2-省市，1-省
        columnsNum: 3
    };
    state = {
        displayList: [],
    }

    componentWillMount() {
        this.initDisplayList()
    }

    onColumnChange(e) {
        const { selected } = this.props
        selected[e.detail.column] = e.detail.value
        for (let i = 0; i < selected.length; i++) {
            if (e.detail.column < i) {
                selected[i] = 0
            }
        }

        if (this.props.onColumnChange) {
            this.props.onColumnChange({ value: selected });
        }
        this.initDisplayList()
    }

    onChange() {
        const displayList = this.state.displayList
        let selected = this.props.selected
        const areaList = this.props.areaList
        const areaNames = displayList[0][selected[0]] + ' ' + displayList[1][selected[1]] + ' ' + displayList[2][selected[2]]
        const provinceId = areaList[selected[0]]['id']
        const cityId = areaList[selected[0]]['childs'][selected[1]]['id']
        const areaId = areaList[selected[0]]['childs'][selected[1]]['childs'][selected[2]]['id']
        const ids = [provinceId, cityId, areaId]


        if (this.props.onChange) {
            this.props.onChange({ value: selected, areaNames, ids });
        }
    }

    initDisplayList() {
        const { areaList, selected } = this.props
        let displayList = []
        displayList[0] = areaList.map(function (item) {
            return item.name;
        })
        displayList[1] = areaList[selected[0]].childs.map(function (item) {
            return item.name;
        })
        displayList[2] = areaList[selected[0]].childs[selected[1]].childs.map(function (item) {
            return item.name;
        })

        this.setState({
            displayList: displayList
        })
    }

    render() {
        const { displayList } = this.state
        const { selected, areaNames, placeholder } = this.props
        return <View style={styles.section}>
            <Picker
                title="选择地区"
                cols={3}
                onChange={(e) => {
                    this.onChange(e)
                }}
                value={selected}
                data={displayList}
                onPickerChange={(e) => {
                    this.onColumnChange(e)
                }}
            >
                <TouchableOpacity style={styles.picker} onPress={()=>{

                }}>
                    {areaNames ? <Text style={styles.text}>{areaNames}</Text> : null}
                    {placeholder ? <Text style={styles.placeholder}>{placeholder}</Text> : null}
                </TouchableOpacity>
            </Picker>
        </View>
    }
}
const styles = StyleSheet.create({
    section: {},
    picker: {},
    text: {},
    placeholder: {}
})
