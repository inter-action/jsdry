
export function deepClone(data: any) {
    if (typeof data !== 'object') return data;
    const newData: any = Array.isArray(data) ? [] : {};
    Object.keys(data).forEach(key => {
        let value = data[key]
        if (typeof value === 'object') {
            newData[key] = deepClone(value)
        } else {
            newData[key] = value
        }
    })
    return newData;
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


