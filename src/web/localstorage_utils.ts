

class LocalStorageUtils {
    rootKey = 'lsu_'
    /**
     * @param {string} key 
     * @returns parsed json obj, or string | null if corresponding value is not json type
     * @memberof LocalStorageUtils
     */
    getItem(key: string) {
        key = this.key(key)

        let str = localStorage.getItem(key)
        if (!str) return str
        try {
            let json = JSON.parse(str)
            return json
        } catch (e) {
            return str
        }
    }

    /**
     * fetch & remove item
     * @param key 
     */
    popItem(key: string) {
        let data = this.getItem(key)
        if (data != null) {
            localStorage.removeItem(key)
        }
        return data
    }

    /**
     * 
     * @param {string} key 
     * @param {string|obj} value 
     * @memberof LocalStorageUtils
     */
    setItem(key: string, value: object) {
        key = this.key(key)
        if (typeof value === 'string') {
            localStorage.setItem(key, value)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    key(key: string) {
        return this.rootKey + key
    }


    clear() {
        for (let key in localStorage) {
            if (key.startsWith(this.rootKey)) {
                localStorage.removeItem(key)
            }
        }
    }
}
export const localStorageUtils = new LocalStorageUtils()
