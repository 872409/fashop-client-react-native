import ImagePicker from 'react-native-image-picker'
import { Toast } from './function';
import Fetch from './fetch';
import { UploadApi } from "../config/api/upload";

var options = {
    title: '选择照片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'从相册中选择',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth:700,
    maxHeight:700,
};

export const imagePicker = (callback)=>{
    ImagePicker.showImagePicker(options, (response) => {
        if(response.error) {
            alert('系统异常，请稍后再试')
        } else if (response.didCancel) {
            console.log('User cancelled image picker');
        }else{
            const params = {
                image: 'data:image/jpeg;base64,'+response.data,
                type: 'base64'
            }
            Toast.info('图片上传中，请耐心等待');
            Fetch.fetch({
                api: UploadApi.addImage,
                params,
            })
            .then((e)=>{
                callback(e)
            })
            .catch((err)=>{
                console.log('err',err);
            })
        }
    });
}
