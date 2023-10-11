// Copyright 2023 Paion Data. All rights reserved.
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
