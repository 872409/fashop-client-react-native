import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
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
    data: {
        displayList: []
    }

    attached() {
        this.initDisplayList()
    }

    columnChange(e) {
        let selected = this.data.selected
        selected[e.detail.column] = e.detail.value
        for (let i = 0; i < selected.length; i++) {
            if (e.detail.column < i) {
                selected[i] = 0
            }
        }
        this.setState({
            selected: selected
        })
        this.initDisplayList()
    }

    change() {
        const displayList = this.data.displayList
        let selected = this.data.selected
        const areaList = this.data.areaList
        const areaNames = displayList[0][selected[0]] + ' ' + displayList[1][selected[1]] + ' ' + displayList[2][selected[2]]
        const provinceId = areaList[selected[0]]['id']
        const cityId = areaList[selected[0]]['childs'][selected[1]]['id']
        const areaId = areaList[selected[0]]['childs'][selected[1]]['childs'][selected[2]]['id']
        const ids = [provinceId, cityId, areaId]

        this.setState({
            areaNames
        })
        this.triggerEvent('change', {
            value: this.data.selected,
            areaNames,
            ids
        })
    }

    initDisplayList() {
        const displayList = []
        const areaList = this.data.areaList
        let selected = this.data.selected

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
        return <View style={styles.section}>
            <Picker
                mode="multiSelector"
                onChange={(e) => this.bindMultiPickerChange(e)}
                value={selected}
                data={displayList}
                onPickerChange={(e) => this.columnChange(e)}
            >
                <View style={styles.Picker}>
                    {areaNames ? <Text style={styles.text}>{areaNames}</Text> : null}
                    {placeholder ? <Text style={styles.placeholder}>{placeholder}</Text> : null}
                </View>
            </Picker>
        </View>
    }
}
