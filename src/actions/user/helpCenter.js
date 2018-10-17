import types from '../../constants/ActionTypes';
import { Toast } from "../../utils/PublicFuncitonModule";
import {storageModule,Fetch, fetchStatus} from '../../utils';
import { NavigationActions } from "react-navigation";
// import JPushModule from "../../utils/JPushModule";
import store from "../../store";
// import {getPushSetting} from '../push'
import { updateUserInfoFunc } from "./index";

export const getHelpList=()=>{
    return async dispatch=>{
        try {
            const e= await Fetch.fetch({
                apiName:"HELPCENTERLISHOME",
            })
            if(e.errcode===0){
                dispatch(getdataHelpList(e.list))
            }else{
                Toast.warn(e.errmag)
            }
        }catch(err){

        }
    }
}

const getdataHelpList = (rightReason)=>{
    return {
        type:types.bussiness.GET_HELP_CENTERLIST,
        rightReason,
    }
}

export const getHelpShow=()=>{
    return async dispatch=>{
        try {
            const e= await Fetch.fetch({
                apiName:"HELPCENTERECOMMENDHOME",
            })
            if(e.errcode===0){
                dispatch(getdataHelpShow(e.list))
            }else{
                Toast.warn(e.errmag)
            }
        }catch(err){

        }
    }
}

const getdataHelpShow = (rightdata)=>{
    return {
        type:types.bussiness.GET_HELP_SHOWCONTENT,
        rightdata
    }
}

export const getListHelpList=({type_id})=>{
    return async dispatch=>{
        try {
            const e= await Fetch.fetch({
                apiName:"USERHELPSEARCH",
                params:{
                    type_id
                }
            })
            console.log('type_id',type_id);
            console.log('e',e);
            if(e.errcode===0){
                dispatch({
                    type:types.bussiness.GET_HELP_LIST,
                    helpCenter:e.list
                })
            }else{
                Toast.warn(e.errmag)
            }
        }catch(err){

        }
    }
}

export const changePhone = ({ params, navigation }) => {
    return async dispatch=>{
        const e= await Fetch.fetch({
            apiName:"SENDCHANGEPHONE",
            params
        })
        if(e.errcode===0){
            dispatch(updateUserInfoFunc(e.data))
            Toast.info("更改成功")
            navigation.goBack()
        }else{
            Toast.warn(e.errmsg)
        }
    }
}


