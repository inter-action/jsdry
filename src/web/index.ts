import * as react from './react'

export function throttle(func: Function, milisec = 300) {
    let timer: any = null

    return function() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func(...arguments)
        }, milisec)
    }
}

export * from './localstorage_utils'
export * from './amap_async_loader'
export { react }
