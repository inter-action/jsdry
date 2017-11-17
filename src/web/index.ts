
export function throttle(func: Function, milisec = 300) {
    let timer: any = null

    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func(...arguments)
        }, milisec)
    }
}