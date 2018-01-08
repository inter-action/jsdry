
export function deepClone(src: any) {
    let isPrimitive = function (val: any) {
        return val == null || /^[sbn]/.test(typeof val); // s: symbol, b: boolean, n: number1
    }

    function clone(src: any): any {
        if (isPrimitive(src)) {
            return src
        } else if (Array.isArray(src)) {
            return src.map(e => clone(e))
        } else {
            return ((Reflect as any).keys || Object.keys)(src).reduce((p, k) => {
                p[k] = clone(src[k])
            }, {})
        }
    }

    return clone(src)
}



export function sleep(duration: number) {
    if (typeof duration !== 'number') throw 'invalid argument'
    return new Promise((resolve) => {
        setTimeout(() => resolve(), duration)
    })
}

/**
 * calc page offset by page no 
 * @param pageno 
 * @param itemsPerPage 
 */
export function calcPaginationOffset(pageno: number, itemsPerPage: number) {
    return (pageno - 1) * itemsPerPage
}


