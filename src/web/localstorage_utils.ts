export class LocalStorageUtils {
    private rootKey = 'lsu_'
    /**
     * @param {string} key
     * @returns parsed json obj, or string | null if corresponding value is not json type
     * @memberof LocalStorageUtils
     */
    public getItem(key: string) {
        key = this.key(key)

        const str = localStorage.getItem(key)
        if (!str) return str
        try {
            return JSON.parse(str)
        } catch (e) {
            return str
        }
    }

    /**
     * fetch & remove item
     * @param key
     */
    public popItem(key: string) {
        const data = this.getItem(key)
        if (data != null) {
            this.removeItem(key)
        }
        return data
    }

    /**
     *
     * @param {string} key
     * @param {string|obj} value
     * @memberof LocalStorageUtils
     */
    public setItem(key: string, value: object) {
        key = this.key(key)
        if (typeof value === 'string') {
            localStorage.setItem(key, value)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    public key(key: string) {
        return this.rootKey + key
    }

    public removeItem(key: string) {
        return localStorage.removeItem(this.key(key))
    }

    public clear() {
        for (const key in localStorage) {
            if (key.startsWith(this.rootKey)) {
                localStorage.removeItem(key)
            }
        }
    }
}
