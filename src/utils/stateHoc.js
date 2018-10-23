import { stateHoc } from 'ws-react-native-utils';
import {
    LoadingView,
    FailureView,
    ErrorView,
    NullDataView,
    LoginView,
} from '../components/fetchView';

const ThisModule = (params = {})=>{
    return stateHoc(Object.assign({},{
        LoadingView,
        FailureView,
        ErrorView,
        NullDataView,
        LoginView,
    },params))
}


export default ThisModule
