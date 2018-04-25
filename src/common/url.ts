import { URL } from 'url'

/**
 * consturct a valid url with path and query object. query value is automatically encoded
 *
 */
export function toQueryParams(path: string, queryObject: { [key: string]: string }) {
    const str =
        path +
        '?' +
        Object.keys(queryObject)
            .map(k => `${k}=${encodeURIComponent(queryObject[k])}`)
            .join('&')
    return str
}

/**
 * return url query params as object.
 */
export function getQueryParams(url: string) {
    const u = getUrlObject(url)
    const r: { [key: string]: string } = {}
    for (const [name, value] of u.searchParams.entries()) {
        // in order for this to work, compile target has to be es6
        r[name] = value
    }
    return r
}

function getUrlObject(url: string) {
    return new URL(url)
}
