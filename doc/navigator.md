## 定义路由
/containers/navigator.js里的createStackNavigator方法里
## 页面生命周期
```json
// 例如： 在页面显示时，初始化购物车列表
componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                await this.initCartList()
            }
        );
    }
```
