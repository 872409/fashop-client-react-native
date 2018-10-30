import Code from './code'
import Toast from './toast';

export default class Fa {
    static code = new Code()
    static toast = new Toast()

    /**
     * 检测数组中是否存在某个字符串
     * @param search
     * @param array
     * @returns {boolean}
     */
    static inArray(search, array) {
        for (let i in array) {
            if (array[i] === search) {
                return true;
            }
        }
        return false;
    }

    static remove(arr, item) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== item) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}
