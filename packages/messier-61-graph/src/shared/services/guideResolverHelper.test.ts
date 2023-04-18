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
import * as guideResolverHelper from './guideResolverHelper'

describe('tryGetRemoteInitialSlideFromUrl', () => {
  it('extracts initial slide hashbangs from a string', () => {
    expect(
      guideResolverHelper.tryGetRemoteInitialSlideFromUrl('foo#slide-1')
    ).toEqual(1)
    expect(
      guideResolverHelper.tryGetRemoteInitialSlideFromUrl(
        'http://foo.com#slide-2'
      )
    ).toEqual(2)
    expect(
      guideResolverHelper.tryGetRemoteInitialSlideFromUrl(
        'http://www.google.com/yarr/#slide-21'
      )
    ).toEqual(21)
  })
  it('returns 0 when no valid hashbang found', () => {
    expect(guideResolverHelper.tryGetRemoteInitialSlideFromUrl('foo')).toEqual(
      0
    )
    expect(
      guideResolverHelper.tryGetRemoteInitialSlideFromUrl(
        'http://foo.com#sloide-2'
      )
    ).toEqual(0)
    expect(
      guideResolverHelper.tryGetRemoteInitialSlideFromUrl(
        'http://www.google.com/yarr/#slide-fooo'
      )
    ).toEqual(0)
  })
})
