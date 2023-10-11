// Copyright 2023 Paion Data. All rights reserved.
import neo4j, { AuthToken, Config, Driver } from 'neo4j-driver'

import { version } from 'project-root/package.json'

export const createDriverOrFailFn = (
  url: string,
  auth: AuthToken,
  opts: Config,
  failFn: (error: Error) => void = () => {}
): Driver | null => {
  // This is needed, I haven't figured out why. I don't find any mutations to
  // the object, so not sure what's going on.
  const spreadOpts = { ...opts, userAgent: `neo4j-browser/v${version}` }
  try {
    const res = neo4j.driver(url, auth, spreadOpts)
    return res
  } catch (e) {
    failFn(e)
    return null
  }
}
