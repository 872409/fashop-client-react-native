import Code from './code'
import Toast from './toast';
import Cache from './cache';

export default class Fa {
    static code = new Code()
    static toast = new Toast()
    static cache = new Cache()

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

    static getAntAreaList(list) {
        return Array.isArray(list) && list.length> 0 ? list.map((item) => {
            return {
                value: `${item.id}`,
                label: `${item.name}`,
                children: typeof item['childs'] !== 'undefined' && Array.isArray(item.childs) && item.childs.length > 0 ? item.childs.map((sub) => {
                    return {
                        value: `${sub.id}`,
                        label: `${sub.name}`,
                        children: typeof sub['childs'] !== 'undefined' && Array.isArray(sub.childs) && sub.childs.length > 0 ? sub.childs.map((area) => {
                            return {
                                value: `${area.id}`,
                                label: `${area.name}`
                            }
                        }) : []
                    }
                }) : []
            }
        }) : []
    }
}
