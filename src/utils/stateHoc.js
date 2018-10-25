import { stateHoc } from 'ws-react-native-utils';
import {
    Loading,
    FailureView,
    Error,
    NullData,
    Login,
} from '../components/fetchView';

const ThisModule = (params = {})=>{
    return stateHoc(Object.assign({},{
        LoadingView: Loading,
        FailureView,
        ErrorView: Error,
        NullDataView: NullData,
        LoginView: Login,
    },params))
}


export default ThisModule
