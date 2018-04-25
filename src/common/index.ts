import * as url from './url'
export * from './pubsub'
export * from './uuid'

export { url }

export function deepClone(src: any) {
    const isPrimitive = (val: any) => {
        return val == null || /^[sbn]/.test(typeof val) // s: symbol, b: boolean, n: number1
    }

    function clone(obj: any): any {
        if (isPrimitive(obj)) {
            return obj
        } else if (Array.isArray(obj)) {
            return obj.map(e => clone(e))
        } else {
            return ((Reflect as any).keys || Object.keys)(obj).reduce((p: any, k: any) => {
                p[k] = clone(obj[k])
            }, {})
        }
    }

    return clone(src)
}

export function sleep(duration: number) {
    if (typeof duration !== 'number') throw new Error('invalid argument')
    return new Promise(resolve => {
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
