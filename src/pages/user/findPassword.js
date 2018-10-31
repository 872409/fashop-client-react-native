import React, {Component} from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
} from 'react-native';
import {Toast} from '../../utils/publicFuncitonModule';
import {Fetch} from '../../utils';
import { PublicStyles, windowWidth, windowHeight, ThemeStyle } from '../../utils/publicStyleModule';
import { connect } from "react-redux";
import {CountdownButton} from '../../utils/PublicViewModule';
import {
	Button,
} from 'antd-mobile-rn';
import { UserApi } from '../../config/api/user';


class UserFindPassword extends Component{
	state = {
		phone:null,
		smscode:null,
		password:null,
	}
	render(){
		const {
			navigation,
		} = this.props;
		return(
			<KeyboardAvoidingView style={[PublicStyles.ViewMax,{backgroundColor:'#fff'}]} behavior={'padding'}>
				<View style={styles.View1}>
					<Image
						source = {require('../../images/user7.png')}
						style = {styles.image1}
					/>
					<TextInput
						style={styles.textInput1}
						placeholder={'请输入手机号'}
						onChangeText={(e)=>{this.state.phone=e}}
						underlineColorAndroid={'transparent'}
					/>
				</View>
				<View style={styles.View1}>
					<Image
						source = {require('../../images/user8.png')}
						style = {styles.image1}
					/>
					<TextInput
						style={styles.textInput1}
						placeholder={'请输入验证码'}
						onChangeText={(e)=>{this.state.smscode=e}}
						underlineColorAndroid={'transparent'}
					/>
					<CountdownButton
						api = {'USERVERIFYFINDPASSWORDPHONE'}
						getParamsFunc = {()=>{
							return {
								phone: this.state.phone
							}
						}}
						getData = {(e)=>{
							if(e.errcode==0){
								Toast.info('验证码已发送')
							}else {
								Toast.warn(e.errmsg)
							}
						}}
					/>
				</View>
				<View style={styles.View1}>
					<Image
						source = {require('../../images/user5.png')}
						style = {styles.image1}
					/>
					<TextInput
						style={styles.textInput1}
						placeholder={'请输入新密码'}
						onChangeText={(e)=>{this.state.password=e}}
						underlineColorAndroid={'transparent'}
					/>
				</View>
				<Button
					onClick={async()=>{
						const {
							phone,
							smscode,
							password,
							repassword,
						} = this.state
						if(!phone){
							return Toast.warn('请输入手机号')
						}
						if(!smscode){
							return Toast.warn('请输入验证码')
						}
						if(!password){
							return Toast.warn('请输入新密码')
						}
						const e = await Fetch.fetch({
							api: UserApi.findPassword,
							params: {
								phone : this.state.phone,
								smscode : this.state.smscode,
								password : this.state.password,
							}
						})
						if(e.errcode===0){
							Toast.info('找回密码成功，请重新登录')
							navigation.goBack()
						}else {
							Toast.error(e.errmsg)
						}
					}}
					type='primary'
					style={styles.buttoncss}
				>
					<Text style={styles.undertextcss}>找回密码</Text>
				</Button>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	topViewcss:{
		marginTop:40,
		marginLeft:15,
		marginRight:15,
		marginBottom: 60,
	},
	topViewtext:{
		fontSize:20,
		fontWeight: 'bold',
	},
	textInput1:{
		flex:1,
		padding:0,
		fontSize:15,
		color : '#333',
		height:45,
	},
	View1:{
		marginHorizontal:15,
		paddingLeft:15,
		borderBottomWidth:1,
		borderColor:'#F2F2F2',
		flexDirection:'row',
		alignItems:'center',
	},
	image1:{
		height:15,
		width:15,
		marginRight:15,
	},
	View2:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
	},
	text1:{
		fontSize:14,
		color:'#A1A1A1',
		marginLeft:5,
	},
	buttoncss:{
		marginHorizontal:15,
		marginVertical:30,
	},
	undertextcss:{
		color:'#ffffff',
	}
});


const mapStateToProps = store => {
	const {
        user,
    } = store.app
    return {
		login: user.login,
    };
};


export default connect(mapStateToProps)(UserFindPassword)
