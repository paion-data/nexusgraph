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
import { formatDocVersion } from './docsUtils'

test('formatDocVersion', () => {
  const tests = [
    { test: undefined, expect: 'current' },
    { test: '', expect: 'current' },
    { test: '1.1.0', expect: '1.1' },
    { test: '1.1.0-beta01', expect: '1.1-preview' },
    { test: '1.1.2', expect: '1.1' },
    { test: '2.1.10', expect: '2.1' }
  ]

  tests.forEach(t => expect(formatDocVersion(t.test)).toEqual(t.expect))
})
