
import {URL} from 'url'

/**
 * consturct a valid url with path and query object. query value is automatically encoded
 * 
 */
export function toQueryParams(path: string, queryObject: {[key: string]: string}){
  let str = path + '?' +  Object.keys(queryObject).map(k=>`${k}=${encodeURIComponent(queryObject[k])}`).join('&')
  return str
}

/**
 * return url query params as object.
 */
export function getQueryParams(url: string){
  let u = getUrlObject(url), r: {[key: string]: string} = {}
  for (let [name, value] of u.searchParams.entries()){ // in order for this to work, compile target has to be es6
    r[name] = value
  }
  return r
}

function getUrlObject(url: string){
  return new URL(url)
}
