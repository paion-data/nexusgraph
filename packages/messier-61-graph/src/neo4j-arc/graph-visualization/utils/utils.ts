// Copyright 2023 Paion Data. All rights reserved.

export function isNullish(x: unknown): x is null | undefined {
  return x === null || x === undefined
}

export function optionalToString(value: any) {
  return !isNullish(value) && typeof value?.toString === 'function'
    ? value.toString()
    : value
}

export const selectorStringToArray = (selector: string) => {
  // Negative lookbehind simulation since js support is very limited.
  // We want to match all . that are not preceded by \\
  // Instead we reverse and look
  // for . that are not followed by \\ (negative lookahead)
  const reverseSelector = selector.split('').reverse().join('')
  const re = /(.+?)(?!\.\\)(?:\.|$)/g
  const out = []
  let m
  while ((m = re.exec(reverseSelector)) !== null) {
    const res = m[1].split('').reverse().join('')
    out.push(res)
  }

  return out
    .filter(r => r)
    .reverse()
    .map(r => r.replace(/\\./g, '.'))
}

export const selectorArrayToString = (selectors: any) => {
  const escaped = selectors.map((r: any) => r.replace(/\./g, '\\.'))
  return escaped.join('.')
}
