Component({
    behaviors: ['wx://form-field'],

    properties: {
        title: String,
        desc: String,
        type: {
            type: String,
            value: 'input'
        },
        disabled: Boolean,
        loading: Boolean,
        checked: Boolean,
        inputType: {
            type: String,
            value: 'text'
        },
        pickerMode: {
            type: String,
            value: 'selector'
        },
        placeholder: String,
        focus: Boolean,
        mode: {
            type: String,
            value: 'normal'
        },
        range: {
            type: Array,
            value: []
        },
        rangeKey: {
            type: String,
            value: null
        },
        right: Boolean,
        error: Boolean,
        maxlength: {
            type: Number,
            value: 140
        },
        areaNames:{
            type: String,
            value: null
        },
        areaList: {
            type: Array,
            value: []
        },
        uploaderCount: {
            type: Number,
            value: 1
        },
        uploaderFiles: {
            type: Array,
            value: []
        },
        uploaderName: {
            type: String,
            value: 'image'
        },
        uploaderUrl: {
            type: String,
            value: null
        },
        uploaderButtonText: String,
        uploaderHeader: {
            type: Object,
            value: {}
        },
        uploaderFormData: {
            type: Object,
            value: {}
        },
        uploaderAllowDel: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        handleFieldChange(event) {
            const { detail = {} } = event;
            const { value = '' } = detail;
            this.setData({ value });
            this.triggerEvent('change', event);
        },

        handleFieldFocus(event) {
            this.triggerEvent('focus', event);
        },
        handleFieldBlur(event) {
            this.triggerEvent('blur', event);
        },
        uploaderChooseImage: function (e) {
            let that = this;
            if (that.data.uploaderFiles.length >= that.data.uploaderCount) {
                return false
            } else {
                wx.chooseImage({
                    count: that.data.uploaderCount,
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // todo 优化先预览后返回覆盖
                        const tempFilePaths = res.tempFilePaths
                        for(let i=0;i<tempFilePaths.length;i++){
                            wx.uploadFile({
                                url: that.data.uploaderUrl,
                                filePath: tempFilePaths[i],
                                name: that.data.uploaderName,
                                header: that.data.uploaderHeader,
                                formData: that.data.uploaderFormData,
                                success: function (res) {
                                    that.triggerEvent('success', JSON.parse(res.data));
                                }
                            })
                        }
                    }
                })
            }
        },
        uploaderPreViewImage: function (e) {
            wx.preViewImage({
                current: e.currentTarget.id,
                urls: this.data.uploaderFiles
            })
        },
        uploaderDelImage(e){
            console.log(e)
            this.triggerEvent('delete', {
                index : e.currentTarget.dataset.index,
                url: e.currentTarget.dataset.url,
            });
        }
    }
    render(){
        return <View>
            <View
                style={styles.fa-cell fa-field {{ error ? 'fa-field--error' : '' }} {{ mode === 'wrapped' ? 'fa-field--wrapped' : '' }}}
                wx:if="{{ type === 'textarea' }}">
                <View style={styles.fa-cell__hd}>
                    <text style={styles.fa-field__title} wx:if="{{ title }}">{{ title }}</text>
                    <View style={styles.fa-cell__desc} wx:if="{{ desc }}">{{ desc }}</View>
                </View>
                <textarea
                    auto-height
                    disabled="{{ disabled }}"
                    focus="{{ focus }}"
                    value="{{ value }}"
                    placeholder="{{ placeholder }}"
                    maxLength="{{ maxlength }}"
                    style={styles.fa-field__textarea fa-cell__bd {{ right ? 'fa-field__input--right' : '' }}}
                    placeholder-class="fa-field__placeholder"
                    bindinput="handleFieldChange"
                    bindfocus="handleFieldFocus"
                    bindblur="handleFieldBlur"
                ></textarea>
            </View>
            <View
                style={styles.fa-cell fa-field {{ error ? 'fa-field--error' : '' }} {{ mode === 'wrapped' ? 'fa-field--wrapped' : '' }}}
                wx:if="{{type!=='textarea'}}">
                <block wx:if="{{type!=='uploader'}}">
                    <View style={styles.fa-cell__hd}>
                        <text style={styles.fa-field__title} wx:if="{{ title }}">{{ title }}</text>
                        <View style={styles.fa-cell__desc} wx:if="{{ desc }}">{{ desc }}</View>
                    </View>
                    <!--多层if elif有bug 临时改为if-->
                    <input
                        wx:if="{{type==='input'}}"
                        type="{{ inputType || 'text' }}"
                        disabled="{{ disabled }}"
                        focus="{{ focus }}"
                        value="{{ value }}"
                        placeholder="{{ placeholder }}"
                        maxLength="{{ maxlength }}"
                        style={styles.fa-field__input fa-cell__bd {{ right ? 'fa-field__input--right' : '' }}}
                        placeholder-class="fa-field__placeholder"
                        bindinput="handleFieldChange"
                        bindfocus="handleFieldFocus"
                        bindblur="handleFieldBlur"
                    />
                    <picker
                        wx:if="{{type==='picker'}}"
                        mode="{{ pickerMode || 'selector' }}"
                        style={styles.fa-field__input fa-cell__bd {{ right ? 'fa-field__input--right' : '' }}}
                        placeholder-class="fa-field__placeholder"
                        onChange="handleFieldChange"
                        value="{{index}}"
                        range="{{range}}">
                        <View style={styles.picker}>
                            {{ value || value === 0 ? range[value] : placeholder}}
                        </View>
                    </picker>
                    <fa-area
                        wx:if="{{type==='area'}}"
                        areaNames="{{ areaNames }}"
                        placeholder="{{ placeholder }}"
                        style={styles.fa-field__input fa-cell__bd {{ right ? 'fa-field__input--right' : '' }}}
                        placeholder-class="fa-field__placeholder"
                        areaList="{{areaList}}"
                        bind:change="handleFieldChange"
                        bindfocus="handleFieldFocus"
                        bindblur="handleFieldBlur"
                    />
                    <fa-switch
                        wx:if="{{type==='switch'}}"
                        checked="{{ checked }}"
                        loading="{{ loading }}"
                        disabled="{{ disabled }}"
                        style={styles.fa-field__input fa-cell__bd {{ right ? 'fa-field__input--right' : '' }}}
                        bind:change="handleFieldChange"
                        bindfocus="handleFieldFocus"
                        bindblur="handleFieldBlur"
                    />
                </block>
                <block wx:else>
                    <View style={styles.fa-cell__bd}>
                        <View style={styles.fa-uploader}>
                            <View style={styles.fa-uploader__hd} wx:if="{{title}}">
                                <View style={styles.fa-uploader__title}>{{ title }}</View>
                            </View>
                            <View style={styles.fa-uploader__bd}>
                                <View style={styles.fa-uploader__files} id="uploaderFiles">
                                    <block wx:for="{{uploaderFiles}}" wx:key="*this"
                                           wx:for-index="uploader_image_index">
                                        <View style={styles.fa-uploader__file}>
                                            <image style={styles.fa-uploader__img} src="{{item}}" mode="aspectFill"
                                                   onPress="uploaderPreViewImage" id="{{item}}" />
                                            <View style={styles.fa-icon-delete} wx:if="{{uploaderAllowDel === true}}"
                                                  onPress="uploaderDelImage" data-index="{{uploader_image_index}}"
                                                  data-url="{{item}}">x
                                            </View>
                                        </View>
                                    </block>
                                </View>
                                <block wx:if="{{uploaderButtonText}}">
                                    <View style={styles.fa-uploader__input-box-type-text} onPress="uploaderChooseImage">
                                        <text>{{ uploaderButtonText }}</text>
                                    </View>
                                </block>
                                <block wx:else>
                                    <View style={styles.fa-uploader__input-box}>
                                        <View style={styles.fa-uploader__input} onPress="uploaderChooseImage"></View>
                                    </View>
                                </block>

                            </View>
                        </View>
                    </View>
                </block>
            </View>
        </View>
    }
});
