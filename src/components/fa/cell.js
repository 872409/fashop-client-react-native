const warn = (msg, getValue) => {
    console.warn(msg);

};

Component({
    options: {
        multipleSlots: true
    },
    relations: {
        '../cell-group/index': {
            type: 'parent'
        }
    },
    properties: {
        type: {
            type: String,
            value: null
        },
        title: {
            type: String,
            description: '左侧标题'
        },
        label: {
            type: String,
            description: '标题下方的描述信息'
        },
        value: {
            type: String,
            description: '右侧内容'
        },
        onlyTapFooter: {
            type: Boolean,
            description: '只有点击 footer 区域才触发 tab 事件'
        },
        isLink: {
            type: null,
            value: '',
            description: '是否展示右侧箭头并开启尝试以 url 跳转'
        },
        linkType: {
            type: String,
            value: 'navigateTo',
            description: '链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch'
        },
        icon: {
            type: String,
            value: ''
        },
        url: {
            type: String,
            value: ''
        }
    },
    data: {
        isLastCell: true
    },
    methods: {
        footerTap() {
            // 如果并没有设置只点击 footer 生效，那就不需要额外处理。cell 上有事件会自动处理
            if (!this.data.onlyTapFooter) {
                return;
            }

            this.triggerEvent('tap', {});
            doNavigate.call(this);
        },

        cellTap() {
            // 如果只点击 footer 生效，那就不需要在 cell 根节点上处理
            if (this.data.onlyTapFooter) {
                return;
            }

            this.triggerEvent('tap', {});
            doNavigate.call(this);
        },

        // 用于被 cell-group 更新，标志是否是最后一个 cell
        updateIsLastCell(isLastCell) {
            this.setData({ isLastCell });
        }
    }
    render(){
        return <View>
            <View
                catchtap="cellTap"
                style={styles.fa-cell {{ isLastCell ? 'last-cell' : '' }} {{ isLink ? 'fa-cell--access' : '' }}}>

                <View style={styles.fa-cell__icon}>
                    <View style={styles.fa-cell_hd} wx:if="{{ icon }}">
                        <Image src="{{icon}}" style="width:20px;height:20px;margin-right:5px;display:block" />
                    </View>
                    <slot name="icon"></slot>
                </View>

                <View style={styles.fa-cell__bd}>
                    <block wx:if="{{type!=='uploader'}}">

                        <View wx:if="{{ title }}" style={styles.fa-cell__text}>{{ title }}</View>
                        <View wx:if="{{ label }}" style={styles.fa-cell__desc}>{{ label }}</View>
                        <slot></slot>
                    </block>
                    <block wx:else>
                        <View style={styles.fa-uploader}>
                            <View style={styles.fa-uploader__hd}>
                                <View style={styles.fa-uploader__title}>图片上传</View>
                                <View style={styles.fa-uploader__info}>{{ files.length}}/2</View>
                            </View>
                            <View style={styles.fa-uploader__bd}>
                                <View style={styles.fa-uploader__files} id="uploaderFiles">
                                    <block wx:for="{{files}}" wx:key="*this">
                                        <View style={styles.fa-uploader__file} onPress="preViewImage" id="{{item}}">
                                            <image style={styles.fa-uploader__img} src="{{item}}" mode="aspectFill" />
                                        </View>
                                    </block>
                                    <View style={styles.fa-uploader__file}>
                                        <image style={styles.fa-uploader__img} src="../images/pic_160.png"
                                               mode="aspectFill" />
                                    </View>
                                    <View style={styles.fa-uploader__file}>
                                        <image style={styles.fa-uploader__img} src="../images/pic_160.png"
                                               mode="aspectFill" />
                                    </View>
                                    <View style={styles.fa-uploader__file}>
                                        <image style={styles.fa-uploader__img} src="../images/pic_160.png"
                                               mode="aspectFill" />
                                    </View>
                                    <View style={styles.fa-uploader__file fa-uploader__file_status}>
                                        <image style={styles.fa-uploader__img} src="../images/pic_160.png"
                                               mode="aspectFill" />
                                        <View style={styles.fa-uploader__file-content}>
                                            <icon type="warn" size="23" color="#F43530"></icon>
                                        </View>
                                    </View>
                                    <View style={styles.fa-uploader__file fa-uploader__file_status}>
                                        <image style={styles.fa-uploader__img} src="../images/pic_160.png"
                                               mode="aspectFill" />
                                        <View style={styles.fa-uploader__file-content}>50%</View>
                                    </View>
                                </View>
                                <View style={styles.fa-uploader__input-box}>
                                    <View style={styles.fa-uploader__input} onPress="chooseImage"></View>
                                </View>
                            </View>
                        </View>
                    </block>
                </View>

                <View onPress="footerTap" style={styles.fa-cell__ft}>
                    <block wx:if="{{value}}">{{ value }}</block>
                    <block wx:else>
                        <slot name="footer"></slot>
                    </block>
                </View>
            </View>
        </View>
    }
});

// 处理跳转
function doNavigate() {
    const { url = '' } = this.data;
    const type = typeof this.data.isLink;

    if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

    if (type !== 'boolean' && type !== 'string') {
        warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink);
        return;
    }

    if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
        warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType);
        return;
    }
    wx[this.data.linkType].call(wx, { url });
}
