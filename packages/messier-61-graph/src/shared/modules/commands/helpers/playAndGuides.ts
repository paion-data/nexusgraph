// Copyright 2023 Paion Data. All rights reserved.
import remote from 'services/remote'
import { cleanHtml } from 'services/remoteUtils'
import { hostIsAllowed } from 'services/utils'

export const fetchRemoteGuideAsync = async (
  url: string,
  allowlistStr?: string
): Promise<string> => {
  return new Promise<void>((resolve, reject) => {
    if (!hostIsAllowed(url, allowlistStr)) {
      return reject(
        new Error('Hostname is not allowed according to server allowlist')
      )
    }
    resolve()
  }).then(() =>
    remote
      .get(url, { pragma: 'no-cache', 'cache-control': 'no-cache' })
      .then(r => {
        return cleanHtml(r)
      })
  )
}
