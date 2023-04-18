/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
