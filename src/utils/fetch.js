import {
    fetchData,
} from "ws-react-native-utils";
import {
    userSignOut,
} from "../actions/user";

export default class Fetch {
    static fetch ({apiName, params={}}) {
        return fetchData.fetch({
            apiName,
            params,
        })
        .then((e)=>{
            switch (e.errcode) {
                case -999:
                    store.dispatch(userSignOut())
                    break;
                default:
                    break;
            }
            return e
        })
    }
    static async externalLinkFetch (...e){
        const res = await fetch(...e)
        return res.json()
    }

}
