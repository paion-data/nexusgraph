// Copyright 2023 Paion Data. All rights reserved.
import remote from 'services/remote'
import { hostIsAllowed } from 'services/utils'

export const fetchRemoteGrass = (url: any, allowlist?: string) => {
  return new Promise<void>((resolve, reject) => {
    if (!hostIsAllowed(url, allowlist)) {
      return reject(
        new Error('Hostname is not allowed according to server allowlist')
      )
    }
    resolve()
  }).then(() => {
    return remote.get(url).then(r => {
      return r
    })
  })
}
