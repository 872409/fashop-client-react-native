import {
    InteractionManager,
    DeviceEventEmitter,
    AppState,
} from 'react-native';

import {Toast} from './PublicFuncitonModule';
import JPush from 'jpush-react-native';
import {AppPlatform, env} from '../utils/APP_ROOT_CONFIG';
import store from '../store';
import { NavigationActions } from "react-navigation";
import RNBadgerAndroid from 'react-native-badger-android';



export default class JPushModule {

    static addListenerObject = {};

    /*
     *  初始化
    */
    static Init(){
        let AndroidBadgerNum = 0;
        if(AppPlatform==='android'){
            JPush.initPush()
            JPush.notifyJSDidLoad((e)=>{
                console.log(e);
            })
            JPush.addReceiveOpenNotificationListener((notification) => {
                JPushModule.JPushFunc(
                    JSON.parse(notification['extras']).event_action,
                    JSON.parse(notification['extras']).event_extend_data
                )
            });
            JPush.addReceiveNotificationListener((e)=>{
                if(AppState.currentState!=='active'){
                    ++AndroidBadgerNum;
                    RNBadgerAndroid.setBadge(AndroidBadgerNum)
                }
            })
        }else{
            JPush.addReceiveOpenNotificationListener((notification) => {
                JPushModule.JPushFunc(notification.event_action,notification.event_extend_data)
                JPush.setBadge(Number(--notification.aps.badge),()=>{})
            })
            JPush.setBadge(0, (success) => {});
        }
        AppState.addEventListener('change', (e)=>{
            if(e==='active'){
                if(AppPlatform==='ios'){
                    JPush.setBadge(0, (success) => {});
                }else {
                    RNBadgerAndroid.setBadge(0)
                    AndroidBadgerNum = 0
                }
            }
        })
    }


    /*
     *  注册Alias
    */
    static SetAlias({userInfo}={}){
        if(userInfo){
            const user_id = userInfo.user_id.toString()
            JPush.setAlias(user_id, () => {
                console.log('设置alias 成功');
    		},() => {
    			console.log('fail set alias');
    		});
        }else {
            Toast.warn('推送SetAlias UserInfo数据异常')
        }
    }


    /*
     *  推送执行方法
    */
    static JPushFunc(event_action,event_extend_data){
        const {
            login,
            userInfo
        } = store.getState().app.user
        switch (event_action) {
            case 'pet_heart':
                if(login&&userInfo.user_id===event_extend_data.to_user_id){
                    Toast.info('小主收到了新的宠物心得,快去查看吧')
                    store.dispatch(NavigationActions.navigate({ routeName: 'PublicWebView',params:{
                        title: event_extend_data.title,
                        url: `${env.domain}/App/Info/petheart?id=${event_extend_data.relation_model_id}`
                    }}))
                }
                break;
            default:
                console.warn(event_action);
        }
    }


    /*
     *  移除推送监听
    */
    static RemoveListener(){
        JPush.removeReceiveOpenNotificationListener((e)=>{
            console.log(e);
        })
        JPush.setAlias('null',()=>{},()=>{})
        if(AppPlatform==='ios'){
            JPush.setBadge(0,()=>{})
            AppState.removeEventListener('change', (e)=>{});
        }
    }


}

JPushModule.Init()
