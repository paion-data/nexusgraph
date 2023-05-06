// Copyright 2023 Paion Data. All rights reserved.
export const deepEquals = (x: any, y: any): boolean => {
  if (x && y && typeof x === 'object' && typeof y === 'object') {
    if (Object.keys(x).length !== Object.keys(y).length) return false
    return Object.keys(x).every(key => deepEquals(x[key], y[key]))
  }
  if (typeof x === 'function' && typeof y === 'function') {
    return x.toString() === y.toString()
  }
  return x === y
}
export function mapObjectValues<A, B>(
  object: Record<string, A>,
  mapper: (val: A) => B
): Record<string, B> {
  return Object.entries(object).reduce(
    (res: Record<string, B>, [currKey, currVal]) => {
      res[currKey] = mapper(currVal)
      return res
    },
    {}
  )
}

export function keys<T>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>
}
