declare global {
    interface Window {
        AMap: any
    }
}

//
// copy from https://github.com/ElemeFE/react-amap, with some minor modification
const DEFAULT_CONFIG = {
    v: '1.4.0',
    hostAndPath: 'webapi.amap.com/maps',
    key: 'f97efc35164149d0c0f299e7a8adb3d2',
    plugin: [],
    callback: '__amap_init_callback'
}

let __script_loaded = false
const queuedLoader: any[] = []

/**
 * 高德地图异步加载器, amap async loader
 * usage:
 *  AMapAsyncLoader.load({key: ..., etc...}).then(()=> {
 *    window.AMap.Map
 *    // do something with window.AMap
 *  })
 */
export class AMapAsyncLoader {
    static getScriptSrc(cfg: any) {
        const protocol = window.location.protocol
        let scriptSrc = `${protocol}//${cfg.hostAndPath}?v=${cfg.v}&key=${cfg.key}&callback=${cfg.callback}`
        if (cfg.plugin.length) scriptSrc += `&plugin=${cfg.plugin.join(',')}`
        return scriptSrc
    }

    /**
     *
     * @param {*} cfg 高德地图的cfg,
     *    - v: string?,  version
     *    - hostAndPath: string?,  主要地址
     *    - key: string?,
     *    - plugin: string[]?, 插件列表
     *    - callback: string?, 回调函数名称
     */
    static load(cfg: any) {
        if (typeof window === 'undefined') {
            return null
        }
        const _config = { ...DEFAULT_CONFIG, cfg }
        /*
         * 初次加载同步加载插件；
         * 后面再加载的时候，要确保所依赖的插件也全部异步加载成功
         */
        if (window.AMap) {
            // 要确保所有的插件加载成功
            if (_config.plugin && _config.plugin.length) {
                const promiseArr: any[] = []
                _config.plugin.forEach(p => {
                    const pro = new Promise((resolve: any) => {
                        window.AMap.plugin(p, () => {
                            resolve()
                        })
                    })
                    promiseArr.push(pro)
                })
                return Promise.all(promiseArr)
            }
            return Promise.resolve()
        }

        if (__script_loaded) {
            // 多次请求同样的脚本，会在资源加载之后触发 resolve
            return new Promise((resolve: any) => {
                queuedLoader.push(() => {
                    resolve()
                })
            })
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.defer = true
        script.src = this.getScriptSrc(_config)

        const scriptLoadingPromise = new Promise((resolve: any, reject: any) => {
            window[_config.callback] = () => {
                queuedLoader.forEach(event => event())
                resolve()
            }
            script.onerror = error => reject(error)
        })
        document.head.appendChild(script)
        __script_loaded = true
        return scriptLoadingPromise
    }
}
