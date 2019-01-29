import { storageModule } from "moji-react-native-utils";

export default {
    async get(params = {}) {
        return await storageModule.get(params.key)
    },
    async set(params = {}) {
        return await storageModule.set(
            params.key, 
            JSON.stringify(params.value)
        )
    },
    async remove(params = {}) {
        return await storageModule.remove(params.key)
    },
    async getUserInfo(params = {}) {
        return await storageModule.getUserInfo();
    },
    async setUserInfo(params = {}) {
        return await storageModule.setUserInfo(params.value);
    },
    async removeUserInfo(params = {}) {
        return await storageModule.removeUserInfo();
    },
}
