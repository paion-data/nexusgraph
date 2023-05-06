// Copyright 2023 Paion Data. All rights reserved.
import 'isomorphic-fetch'

function request(method: any, url: any, data = null, extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Ajax-Browser-Auth': 'true',
    'X-stream': 'true',
    ...extraHeaders
  }
  return fetch(url, {
    method,
    headers,
    body: data
  }).then(checkStatus)
}

function get(url: string, headers: HeadersInit = {}): Promise<string> {
  return fetch(url, {
    method: 'get',
    headers
  })
    .then(checkStatus)
    .then(response => response.text())
}

export function getJSON(url: any) {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(e => {
      throw new Error(e)
    })
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw {
      ...new Error(`${response.status} ${response.statusText}`),
      response
    }
  }
}

export default {
  get,
  getJSON,
  request
}
