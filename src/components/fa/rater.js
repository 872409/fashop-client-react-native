Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        size: {
            type: Number,
            value: 12
        },
        num: {
            type: Number,
            value: 5
        },
        value: {
            type: Number,
            value: 3
        }
    },
    ready: function () {
        let list = []
        for (let i = 1; i <= this.data.num; i++) {
            list = i
        }
        this.setData({
            list
        })
    },
    methods: {
        onChange(e) {
            console.log(e.currentTarget.dataset.value)
            this.triggerEvent('change', { value: e.currentTarget.dataset.value });
        }
    }
    render() {
        return <View style={styles.raterList}>
            <block wx:for="{{list}}" wx:key="key" wx:for-index="index" wx:for-item="item">
                <Image src="active.png" style="width:{{size}}px;height: {{size}}px" mode="aspectFill"
                       wx:if="{{index < value}}" data-value="{{index+1}}" onPress="onChange" />
                <Image src="default.png" style="width:{{size}}px;height: {{size}}px" mode="aspectFill"
                       wx:if="{{index >= value}}" data-value="{{index+1}}" onPress="onChange" />
            </block>
        </View>
    }
});
