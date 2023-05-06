// Copyright 2023 Paion Data. All rights reserved.
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
