// Copyright 2023 Paion Data. All rights reserved.
import { URL } from 'whatwg-url'
export const parseHttpVerbCommand = (input: any) => {
  const p = new Promise((resolve, reject) => {
    const re = /^[^\w]*(get|post|put|delete|head)\s+(\S+)?\s*([\S\s]+)?$/i
    const result: any = re.exec(input)
    let method, url, data
    try {
      ;[method, url, data] = [result[1], result[2] || null, result[3] || null]
    } catch (e) {
      reject(new Error('Unparseable http request'))
      return
    }
    if (!url) {
      reject(new Error('Missing path'))
      return
    }
    method = method.toLowerCase()
    if (['post', 'put'].indexOf(method) > -1 && data) {
      // Assume JSON
      try {
        JSON.parse(data.replace(/\n/g, ''))
      } catch (e) {
        reject(new Error('Payload does not seem to be valid (JSON) data'))
        return
      }
    }
    resolve({ method, url, data })
  })
  return p
}

// Check if valid url, from http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export function isValidUrl(url: string): boolean {
  let urlObject

  try {
    urlObject = new URL(url)
  } catch (_) {
    return false
  }

  return urlObject.protocol.startsWith('http')
}
