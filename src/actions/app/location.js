import types from '../../constants/ActionTypes';
import {Fetch,fetchStatus,storageModule} from '../../utils';
import {Toast} from '../../utils/PublicFuncitonModule';
import{
    Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { Geolocation } from "react-native-amap-geolocation/lib/js"
import { AppPlatform } from "../../utils/APP_ROOT_CONFIG"


const webApiKey = 'fde9a76a4158f15731bd2e3faa1b0a49'
export const cityStorageKey = 'locationCity'



export const initLocation =  ()=>{
    return async dispatch => {
        await Geolocation.init({
            ios: "d63de4ac52eefef908d27502560ae561",
            android: "3162a7f5400e69a1f5019157456dcf60"
        })

        dispatch(getAlphabetLocationData())
        dispatch(getAllAreaData())
        dispatch(getAllLocationData())

        let storageCity = await storageModule.get(cityStorageKey)
        if(storageCity){
            try {
                storageCity = JSON.parse(storageCity)
                dispatch(setSelectedCity({
                    cityId: storageCity.cityId,
                    cityName: storageCity.cityName
                }))
                try {
                    const {
                        longitude,
                        latitude,
                        cityName,
                        cityId,
                    } = await getLocationPosition()

                    await Promise.all([
                        dispatch(setLocationCity({
                            cityName,
                            cityId,
                        })),
                        dispatch(setLocationPosition({
                            longitude,
                            latitude,
                        }))
                    ])
                    dispatch(reloadLocationViewData())

                    if(cityName!==storageCity.cityName){
                        Alert.alert(
                            '当前城市和定位城市不一致',
                            '是否切换到定位城市？',
                            [
                                {text: '取消', onPress: () => console.log('不切换到定位城市'), style: 'cancel'},
                                {text: '确定', onPress: async() => {
                                    storageModule.set(cityStorageKey,JSON.stringify({
                                        cityName,
                                        cityId,
                                    }))
                                    await dispatch(setSelectedCity({
                                        cityId,
                                        cityName
                                    }))
                                    dispatch(reloadLocationViewData())
                                }},
                            ]
                        )
                    }
                } catch (err) {
                    if(err.code===-1){
                        const {
                            longitude,
                            latitude,
                        } = err
                        dispatch(setLocationPosition({
                            longitude,
                            latitude,
                        }))
                    }
                    // Toast.warn(err.errmsg)
                }
            } catch (err) {
                await storageModule.remove(cityStorageKey)
                dispatch(initLocation())
            }
        }else{
            try {
                const {
                    longitude,
                    latitude,
                    cityName,
                    cityId,
                } = await getLocationPosition()
                storageModule.set(cityStorageKey, JSON.stringify({
                    cityName,
                    cityId,
                }))
                await dispatch(setLocationInfo({
                    longitude,
                    latitude,
                    cityName,
                    cityId,
                    locationCityName: cityName,
                    locationCityId: cityId,
                }))
                dispatch(reloadLocationViewData())
            } catch (err) {
                if(err.code===-1){
                    const {
                        longitude,
                        latitude,
                    } = err
                    dispatch(setLocationPosition({
                        longitude,
                        latitude,
                    }))
                }
                dispatch(changeShowLocationModal())
                // Toast.warn(err.errmsg)
            }
        }
    }
}



const geolocation = ()=>{
    if (AppPlatform === 'ios') {
        return new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition(
                (e)=>{
                    const {
                        longitude,
                        latitude
                    } = e.coords
                    resolve({
                        longitude,
                        latitude
                    })
                },
                (error) => reject({
                    code: -2,
                    errmsg: error.message,
                }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
            )
        })
    }else {
        return Geolocation.getLastLocation()
    }
}



/**
 * 返回地址信息
 *
 * 通过native定位再逆地理信息解析
 *
 * @return  {Object}
    {
        code: number    -1 返回中包含经纬度 || -2 返回定位错误信息
        longitude: number   经度
        latitude: number    未读
        errmsg: string  错误信息
        cityName: string    城市名称
        cityId: string    城市id
    }
 *
 */
export const getLocationPosition = ()=>{
    return new Promise((resolve, reject)=>{
        geolocation()
        .then(async(e) => {
            const {
                longitude,
                latitude
            } = e
            const res = await fetch(`http://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${webApiKey}`)
            const gdRes = await res.json()
            if(gdRes.status==='1'){
                const {
                    province,
                    city,
                } = gdRes.regeocode.addressComponent
                let cityName
                if(Array.isArray(city)&&city.length===0){
                    cityName = province
                }else {
                    cityName = city
                }
                const cityIdRes = await Fetch.fetch({
                    apiName: 'AREAGETCITYID',
                    params: {
                        city: cityName
                    }
                })
                const {
                    id: cityId
                } = cityIdRes.data
                resolve({
                    longitude,
                    latitude,
                    cityName,
                    cityId,
                })
            }else { //地址解析失败
                reject({
                    code: -1,
                    errmsg: '地址解析失败',
                    longitude,
                    latitude,
                })
            }
        })
        .catch((error) => {
            reject({
                code: -2,
                errmsg: '定位失败',
            })
        })
    })
}



// 获取地址选择器数据
export const getAlphabetLocationData = ()=>{
    return async dispatch => {
        const e = await Fetch.fetch({
            apiName:'AREACITYLIST'
        })
        if(e.errcode==0){
            dispatch({
                type : types.location.SET_ALPHABET_ADDRESS_DATA,
                data : e.list
            })
            storageModule.set('alphabetAddressData',JSON.stringify(e.list))
        }else{
            Toast.error('获取选择器地址数据异常')
        }
    }
}


// 获取全部城市数据
export const getAllAreaData = ()=>{
    return async dispatch => {
        const e = await Fetch.fetch({apiName:'AREAPROVINCECITYBLOCK'})
        if(e.errcode==0){
            const cityArray = []
            e.list.map((item)=>{
                item.child.map((itemT)=>{
                    cityArray.push({
                        id: itemT.id,
                        name: itemT.name,
                        child: itemT.child
                    })
                })
            })
            dispatch({
                type : types.location.SET_ALL_CITY_ARRAY,
                data : cityArray
            })
        }else{
            Toast.error('获取全部地址数据异常')
        }
    }
}



// 获取全部地址数据
export const getAllLocationData = ()=>{
    return async dispatch => {
        const e = await Fetch.fetch({apiName:'AREAPROVINCECITYBLOCK'})
        if(e.errcode===0){
            const data = e.list.map((one,i)=>{
                return {
                    value : `${one.id}`,
                    label : one.name,
                    children : one.child.map((two,j)=>{
                        return {
                            value : `${two.id}`,
                            label : two.name,
                            children : two.child.map((three,z)=>{
                                return {
                                    value : `${three.id}`,
                                    label : three.name,
                                }
                            })
                        }
                    })
                }
            })
            // storageModule.set('allAddressData',JSON.stringify(e.list))
            // storageModule.set('pickerAllAddressData',JSON.stringify(data))
            dispatch({
                type : types.location.SET_ALL_ADDRESS_DATA,
                allAddressData : e.list,
                pickerAllAddressData : data,
            })
        }else{
            Toast.warn('获取全部地址数据异常')
        }
    }
}


// 获取省份数据
export const getProvinceData = ()=>{
    return async dispatch => {
        const e = await Fetch.fetch({ apiName:'AREAPROVINCESEARCH' })
        if(e.errcode===0){
            dispatch({
                type : types.location.SET_PROVINCE_DATA,
                provinceData : e.list,
            })
        }else{
            Toast.warn('获取省份数据异常')
        }
    }
}


export const changeShowLocationModal = ()=>{
    return NavigationActions.navigate({
        routeName: 'Address'
    })
}


export const setLocationPosition = ({longitude,latitude})=>{
    return dispatch => {
        return new Promise((resolve, reject)=>{
            dispatch({
                type: types.location.SET_LOCATION_POSITION,
                longitude,
                latitude,
            })
            resolve()
        })
    }
}

export const setLocationInfo = ({longitude,latitude,cityName,cityId,locationCityName,locationCityId})=>{
    return dispatch => {
        return new Promise((resolve, reject)=>{
            dispatch({
                type: types.location.SET_LOCATION_INFO,
                longitude,
                latitude,
                cityName,
                cityId,
                locationCityName,
                locationCityId
            })
            resolve()
        })
    }
}

export const setSelectedCity = ({cityId,cityName})=>{
    return dispatch => {
        return new Promise((resolve, reject)=>{
            dispatch({
                type: types.location.SET_SELECTED_CITY,
                cityId,
                cityName
            })
            resolve()
        })
    }
}


export const setLocationCity = ({cityName,cityId})=>{
    return dispatch => {
        return new Promise((resolve, reject)=>{
            dispatch({
                type: types.location.SET_LOCATION_CITY,
                cityName,
                cityId
            })
            resolve()
        })
    }
}


export const addressSetLocationCity = ({cityName,cityId,navigation})=>{
    return dispatch => {
        new Promise((resolve, reject)=>{
            dispatch(setSelectedCity({
                cityName,
                cityId
            }))
            resolve()
        })
        .then(()=>{
            storageModule.set(cityStorageKey,JSON.stringify({
                cityName,
                cityId,
            }))
            navigation.goBack()
        })
    }
}



export const reloadLocationViewData = ()=>{
    return dispatch => {
        const loactionViewAction = []
        loactionViewAction.map((item)=>{
            dispatch(item())
        })
    }
}
