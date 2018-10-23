import React, {Component} from 'react';
import { connect } from "react-redux";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Toast } from '../../utils/PublicFuncitonModule';
import {
	PublicStyles,
	windowWidth,
	windowHeight,
	ThemeStyle
} from '../../utils/PublicStyleModule';
import { ThemeButton } from '../../components/theme';
import { CountdownButton } from '../../utils/PublicViewModule';
import { userLogin } from "../../actions/user";
import { Fetch } from "../../utils";

@connect(
	({ app: { user: {
		login,
		userInfo,
	} } }) => ({
		login,
		userInfo,
	}),
)
export default class UserRegister extends Component{
	state = {
		phone:null,
		smscode:null,
		password:null,
	};
	onNextStep = () => {
		const { phone, smscode, password } = this.state;
		if (!phone) {
			return Toast.warn('请输入手机号')
		}
		if (!smscode) {
			return Toast.warn('请输入验证码')
		}
		if (!password) {
			return Toast.warn('请输入密码')
		}
		if (phone.length && smscode.length && password.length) {
			this.props.navigation.navigate('RecommendCode', {
				submitText: '下一步',
				submit: ({salesmans_id, invite_code}) => this.register({salesmans_id, invite_code}),
			})
		}
	}
	register = async ({ salesmans_id, invite_code}) => {
		const { dispatch } = this.props;
		const { phone, smscode, password } = this.state;
		const params = {
			phone,
			smscode,
			password,
			invite_code,
			salesmans_id,
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
	render(){
		const {
			navigation,
		} = this.props;
		return(
			<View style={[PublicStyles.ViewMax, { backgroundColor: '#fff' }]}>
				<KeyboardAwareScrollView>
					<View
						style={{
							paddingHorizontal: 30,
						}}
					>
						<Text style={styles.title}>新用户注册</Text>
						<View style={[styles.view1, { justifyContent: 'space-between' }]}>
							<TextInput
								style={styles.textInput1}
								placeholder={'输入手机号'}
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
								style={{
									borderWidth: 0,
								}}
							/>
						</View>
						<View style={styles.view1}>
							<TextInput
								style={styles.textInput1}
								placeholder={'输入验证码'}
								onChangeText={(e) => {
									this.state.smscode = e
								}}
								underlineColorAndroid={'transparent'}
								placeholderTextColor={'#CCCCCC'}
							/>
						</View>
						<View style={styles.view1}>
							<TextInput
								style={styles.textInput1}
								placeholder={'输入密码 (最少8位，数字+字母)'}
								secureTextEntry={true}
								onChangeText={(e) => {
									this.state.password = e
								}}
								underlineColorAndroid={'transparent'}
								placeholderTextColor={'#CCCCCC'}
							/>
						</View>
						<ThemeButton
							onClick={this.onNextStep}
							type='primary'
							style={{
								marginVertical: 15,
							}}
						>
							下一步
						</ThemeButton>
					</View>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	view1: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		borderBottomColor: '#eaeaea',
		borderBottomWidth: 0.5,
	},
	text1: {
		fontSize: 20,
		color: '#000000',
		fontWeight: 'bold',
	},
	textInput1: {
		flex: 1,
		padding: 0,
		fontSize: 16,
		color: '#333',
		height: 45,
	},
	title: {
		color: '#333',
		fontSize: 20,
		fontFamily: 'PingFangSC-Medium',
		marginTop: 40,
		marginBottom: 20
	},
});

