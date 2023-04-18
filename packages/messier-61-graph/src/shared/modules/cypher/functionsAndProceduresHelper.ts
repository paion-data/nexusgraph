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

import { gte, SemVer } from 'semver'
export const getListProcedureQuery = (version: SemVer | null): string => {
  const versionOrFallback = version ?? '5.0.0'
  return gte(versionOrFallback, '5.0.0')
    ? 'SHOW PROCEDURES yield name, description, signature'
    : 'CALL dbms.procedures()'
}

export const getListFunctionQuery = (version: SemVer | null): string => {
  const versionOrFallback = version ?? '5.0.0'
  return gte(versionOrFallback, '5.0.0')
    ? 'SHOW FUNCTIONS yield name, description, signature'
    : 'CALL dbms.functions()'
}
