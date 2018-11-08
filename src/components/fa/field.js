import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";
import { List, TextareaItem, InputItem } from 'antd-mobile-rn';
import { Area } from '../../components'

const Item = List.Item;
const Brief = Item.Brief;

export default class Field extends Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.node,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        checked: PropTypes.bool,
        inputType: PropTypes.string,
        pickerMode: PropTypes.string,
        placeholder: PropTypes.string,
        rows: PropTypes.number,
        focus: PropTypes.bool,
        mode: PropTypes.string,
        data: PropTypes.array,
        dataKey: PropTypes.string,
        right: PropTypes.bool,
        error: PropTypes.bool,
        maxlength: PropTypes.number,
        areaNames: PropTypes.string,
        areaList: PropTypes.array,
        uploaderCount: PropTypes.number,
        uploaderFiles: PropTypes.array,
        uploaderName: PropTypes.string,
        uploaderUrl: PropTypes.string,
        uploaderButtonText: PropTypes.string,
        uploaderHeader: PropTypes.object,
        uploaderFormData: PropTypes.object,
        uploaderAllowDel: PropTypes.bool
    };
    static defaultProps = {
        title: null,
        desc: null,
        type: 'input',
        disabled: false,
        loading: false,
        checked: false,
        inputType: 'text',
        pickerMode: 'selector',
        placeholder: null,
        focus: false,
        mode: 'normal',
        data: [],
        dataKey: null,
        right: false,
        error: false,
        maxlength: 140,
        rows: 1,
        areaNames: null,
        areaList: [],
        uploaderCount: 1,
        uploaderFiles: [],
        uploaderName: 'image',
        uploaderUrl: null,
        uploaderButtonText: null,
        uploaderHeader: {},
        uploaderFormData: {},
        uploaderAllowDel: false
    };

    handleFieldChange(value) {
        if (this.props.onChange) {
            this.props.onChange({ value });
        }
    }

    handleFieldFocus(value) {
        if (this.props.onFocus) {
            this.props.onFocus({ value });
        }
    }

    handleFieldBlur(value) {
        if (this.props.onBlur) {
            this.props.onBlur({ value });
        }
    }

    uploaderChooseImage(e) {
        let that = this;
        if (that.data.uploaderFiles.length >= that.data.uploaderCount) {
            return false
        } else {
            wx.chooseImage({
                count: that.data.uploaderCount,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success(res) {
                    // todo 优化先预览后返回覆盖
                    const tempFilePaths = res.tempFilePaths
                    for (let i = 0; i < tempFilePaths.length; i++) {
                        wx.uploadFile({
                            url: that.data.uploaderUrl,
                            filePath: tempFilePaths[i],
                            name: that.data.uploaderName,
                            header: that.data.uploaderHeader,
                            formData: that.data.uploaderFormData,
                            success(res) {
                                that.triggerEvent('success', JSON.parse(res.data));
                            }
                        })
                    }
                }
            })
        }
    }

    uploaderPreViewImage(e) {
        wx.preViewImage({
            current: e.currentTarget.id,
            urls: this.data.uploaderFiles
        })
    }

    uploaderDelImage(e) {
        this.triggerEvent('delete', {
            index: e.currentTarget.dataset.index,
            url: e.currentTarget.dataset.url,
        });
    }

    render() {
        const {
            title,
            desc,
            type,
            disabled,
            loading,
            checked,
            inputType,
            pickerMode,
            placeholder,
            value,
            focus,
            mode,
            data,
            dataKey,
            right,
            error,
            maxlength,
            rows,
            areaNames,
            areaList,
            uploaderCount,
            uploaderFiles,
            uploaderName,
            uploaderUrl,
            uploaderButtonText,
            uploaderHeader,
            uploaderFormData,
            uploaderAllowDel
        } = this.props
        return <View>
            {type === 'textarea' ?
                <Item
                    extra={
                        <TextareaItem
                            rows={rows}
                            disabled={disabled}
                            focus={focus}
                            value={value}
                            placeholder={placeholder}
                            count={maxlength}
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                            onFocus={(value) => {
                                this.handleFieldFocus(value)
                            }}
                            onBlur={(value) => {
                                this.handleFieldBlur(value)
                            }}
                        />
                    }
                >
                    {title}
                    <Brief>{desc}</Brief>
                </Item> : null}

            {type === 'input' ?
                <Item
                    extra={
                        <InputItem
                            type={inputType || 'text'}
                            disabled={disabled}
                            focus={focus}
                            value={value}
                            placeholder={placeholder}
                            maxLength={maxlength}
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                            onFocus={(value) => {
                                this.handleFieldFocus(value)
                            }}
                            onBlur={(value) => {
                                this.handleFieldBlur(value)
                            }}
                        />
                    }
                >
                    {title}
                    <Brief>{desc}</Brief>
                </Item> : null}

            {type === 'picker' ?
                <Item
                    extra={
                        <Picker
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                            value={value}
                            data={data}>
                            <Text style={styles.picker}>
                                {value || value === 0 ? data[value] : placeholder}
                            </Text>
                        </Picker>
                    }
                >
                    {title}
                    <Brief>{desc}</Brief>
                </Item> : null}

            {type === 'area' ?
                <Item
                    extra={
                        <Area
                            areaNames={areaNames}
                            placeholder={placeholder}
                            areaList={areaList}
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                            onFocus={(value) => {
                                this.handleFieldFocus(value)
                            }}
                            onBlur={(value) => {
                                this.handleFieldBlur(value)
                            }}
                        />
                    }
                >
                    {title}
                    <Brief>{desc}</Brief>
                </Item> : null}

            {type === 'switch' ?
                <Item
                    extra={
                        <Switch
                            checked={checked}
                            loading={loading}
                            disabled={disabled}
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                            onFocus={(value) => {
                                this.handleFieldFocus(value)
                            }}
                            onBlur={(value) => {
                                this.handleFieldBlur(value)
                            }}
                        />
                    }
                >
                    {title}
                    <Brief>{desc}</Brief>
                </Item> : null}
        </View>
    }
}
const styles = StyleSheet.create({

})
