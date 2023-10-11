// Copyright 2023 Paion Data. All rights reserved.
import '@testing-library/jest-dom/extend-expect'
import nock from 'nock'

// Add extra expect functions to be used in tests

// polyfill for jsdom (for tests only)
// tests with cypher editor support break without it
global.document.createRange = () => {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {},
    getClientRects: () => []
  }
}
// needed for testing monaco
document.queryCommandSupported = () => false
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
window.ResizeObserver = class {
  observe() {}
}
window.SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0
})

nock.disableNetConnect()

// Workaround to get whatwg-url to not fail in tests.
// https://github.com/jsdom/whatwg-url/issues/209
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
