import React, {Component} from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
	Keyboard,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { Toast } from '../../utils/PublicFuncitonModule';
import {
	PublicStyles,
	PublicStylesString,
	windowWidth,
	windowHeight,
	ThemeStyle
} from '../../utils/PublicStyleModule';
import { connect } from "react-redux";
import { userLogin } from '../../actions/user';
import { Fetch, storageModule } from '../../utils';
import { CountdownButton } from "../../utils/PublicViewModule";
import { sendWechatAuthRequest, wechatLogin } from '../../actions/app/wechat';
import { ThemeButton } from '../../components/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import SafeAreaView from "react-native-safe-area-view";

@connect(({app:{wechat:{
	isWXAppInstalled,
}}})=>({
	isWXAppInstalled,
}))
export default class UserLogin extends Component{
	static navigationOptions = ({navigation}) => {
		return {
			headerLeft: null,
			headerStyle: {
				backgroundColor: "#fff",
				elevation: 0,//去掉安卓阴影
				borderBottomWidth: 0,
			},
			headerRight: <TouchableOpacity
				onPress={() => navigation.goBack()}
				activeOpacity={0.8}
				style={{ alignSelf: 'flex-end', marginRight: 10 }}
			>
				<MaterialIcons
					name='close'
					size={30}
					color='#999'
				/>
			</TouchableOpacity>
		}
	}
	state = {
		tabIndex: 0,
	}
	render(){
		const { tabIndex } = this.state
		const {
			isWXAppInstalled,
			dispatch,
			navigation,
		} = this.props
		const tabList = [
			{
				tabLabel: '登录',
				render: () => <Login
					isWXAppInstalled={isWXAppInstalled}
					dispatch={dispatch}
					navigation={navigation}
				/>
			}, {
				tabLabel: '注册',
				render: () => <Register
					isWXAppInstalled={isWXAppInstalled}
					dispatch={dispatch}
					navigation={navigation}
				/>
			}
		]
		return(
			<View style={[PublicStyles.ViewMax, { backgroundColor: '#fff' }]}>
				<View style={{width: windowWidth/2}}>
					<ScrollableTabView
						style={{ backgroundColor: '#fff', flex: 0 }}
						initialPage={0}
						renderTabBar={() =>
							<DefaultTabBar
								style={{
									borderWidth: 0,
								}}
								tabStyle={{ paddingBottom: 0 }}
							/>
						}
						tabBarActiveTextColor={ThemeStyle.ThemeColor}
						tabBarInactiveTextColor='#666'
						tabBarUnderlineStyle={{
							width: windowWidth * 0.12,
							left: windowWidth / 15,
							backgroundColor: `${ThemeStyle.ThemeColor}`,
							height: 3,
						}}
						tabBarTextStyle={{}}
						onChangeTab={({ i }) => {
							this.setState({
								tabIndex: i,
								password: null
							})
						}}
					>
						{
							tabList.map((item, index) => (
								<View
									key={index}
									tabLabel={item.tabLabel}
								/>
							))
						}
					</ScrollableTabView>
				</View>
				{
					tabList[tabIndex].render()
				}
			</View>
		)
	}
}

class Login extends Component{
	state = {
		username: null,
		password: null,
	}
	render(){
		const {
			isWXAppInstalled,
			dispatch,
			navigation
		} = this.props
		return (
			<KeyboardAwareScrollView>
				<View
					style={{
						paddingHorizontal: 30,
					}}
				>
					<Text style={[PublicStyles.title1, { fontSize: 24, marginTop: 45 }]}>欢迎来到德了</Text>
					<Text style={[PublicStyles.desc1, { marginBottom: 15 }]}>寻宠之旅从此刻开始</Text>
					<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							placeholder='请输入手机号'
							onChangeText={(e) => {
								this.state.username = e
							}}
							underlineColorAndroid={'transparent'}
							placeholderTextColor={'#CCCCCC'}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							placeholder='请输入密码'
							secureTextEntry={true}
							onChangeText={(e) => {
								this.state.password = e
							}}
							underlineColorAndroid={'transparent'}
							placeholderTextColor={'#CCCCCC'}
						/>
					</View>
					<Text
						style={[PublicStyles.desc1, { color: '#ccc', marginTop: 15 }]}
						onPress={() => navigation.navigate('UserFindPassword')}
					>
						忘记密码？
					</Text>
					<ThemeButton
						onClick={() => {
							Keyboard.dismiss()
							this.login()
						}}
						type='primary'
						style={{
							marginTop: 50
						}}
					>
						登 录
					</ThemeButton>
				</View>
				{
					isWXAppInstalled && (
						<View style={{ alignItems: 'center', justifyContent: 'center', }}>
							<Text style={[PublicStyles.desc1,{ color: '#ccc', marginTop: 40, marginBottom: 20 }]}>
								快捷登录
							</Text>
							<TouchableOpacity
								style={styles.weiViewcss}
								activeOpacity={1}
								onPress={async () => {
									try {
										const {
											tokenData,
											userData,
										} = await sendWechatAuthRequest()
										dispatch(wechatLogin({
											tokenData,
											userData,
										}))
									} catch (e) {
										console.log(e);
									}
								}}
							>
								<Image 
									resizeMode='contain' 
									source={require('../../images/weixin.png')} 
									style={{ width: 40, height: 40 }} 
								/>
							</TouchableOpacity>
						</View>
					)
				}
			</KeyboardAwareScrollView>
		)
	}
	login = async () => {
		const { username, password } = this.state
		if (!username) {
			return Toast.warn('请输入用户名')
		}
		if (!password) {
			return Toast.warn('请输入密码')
		}
		const params = {
			username,
			password,
		}
		const e = await Fetch.fetch({
			apiName: 'USERLOGIN',
			params
		})
		if (e.errcode === 0) {
			const {
				navigation,
				dispatch
			} = this.props;
			dispatch(userLogin({
				userInfoData: e.data
			}))
		} else {
			Toast.warn(e.errmsg)
		}
	}
}

class Register extends Component{
	state = {
		phone: null,
		smscode: null,
		password: null,
	}
	render(){
		const {
			isWXAppInstalled,
			dispatch,
			navigation
		} = this.props
		return (
			<KeyboardAwareScrollView>
				<View
					style={{
						paddingHorizontal: 30,
					}}
				>
					<Text style={[PublicStyles.title1, { fontSize: 24, marginTop: 45 }]}>欢迎来到德了</Text>
					<Text style={[PublicStyles.desc1, { marginBottom: 15 }]}>寻宠之旅从此刻开始</Text>
					<View style={[styles.inputView, { justifyContent: 'space-between' }]}>
						<TextInput
							style={styles.textInput}
							placeholder='请输入手机号'
							onChangeText={(e) => {
								this.state.phone = e
							}}
							underlineColorAndroid={'transparent'}
							placeholderTextColor={'#CCCCCC'}
						/>
						<CountdownButton
							apiName={'USERSENDREGSMS'}
							getParamsFunc={() => {
								return {
									phone: this.state.phone
								}
							}}
							getData={(e) => {
								if (e.errcode == 0) {
									Toast.info('验证码已发送')
								} else {
									Toast.warn(e.errmsg)
								}
							}}
							text='发送验证码'
							textStyle={[PublicStyles.desc1,{ color: '#333' }]}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							placeholder='请输入验证码'
							onChangeText={(e) => {
								this.state.smscode = e
							}}
							underlineColorAndroid={'transparent'}
							placeholderTextColor={'#CCCCCC'}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							placeholder='设置密码 (最少8位，数字+字母)'
							secureTextEntry={true}
							onChangeText={(e) => {
								this.state.password = e
							}}
							underlineColorAndroid={'transparent'}
							placeholderTextColor={'#CCCCCC'}
						/>
					</View>
					<TouchableOpacity
						style={PublicStyles.rowCenter}
						onPress={()=>{
							navigation.navigate('PublicWebView', {
								title: '用户协议',
								url: `http://tjcdpet.com/agreement.html`
							})
						}}
					>
						<Text style={[PublicStyles.desc1, { color: '#ccc', marginTop: 15 }]}>
							注册代表您同意
						</Text>
						<Text style={[PublicStyles.desc1, { color: ThemeStyle.ThemeColor, marginTop: 15 }]}>
							《用户协议》
						</Text>
					</TouchableOpacity>
					<ThemeButton
						onClick={() => {
							Keyboard.dismiss()
							this.register()
						}}
						type='primary'
						style={{
							marginTop: 50
						}}
					>
						注 册
					</ThemeButton>
				</View>
			</KeyboardAwareScrollView>
		)
	}
	register = async () => {
		const { dispatch } = this.props;
		const { phone, smscode, password } = this.state;
		const params = {
			phone,
			smscode,
			password,
		}
		const e = await Fetch.fetch({
			apiName: 'USERREGISTER',
			params
		})
		// console.log(e);
		if (e.errcode === 0) {
			dispatch(
				userLogin({
					userInfoData: e.data,
				})
			)
		} else {
			Toast.warn(e.errmsg)
		}
	}
}

const styles = StyleSheet.create({
	inputView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		borderBottomColor: '#F8AF50',
		borderBottomWidth: 0.5,
	},
	textInput: {
		flex: 1,
		padding: 0,
		fontSize: 16,
		color: '#333',
		height: 45,
	},
});
