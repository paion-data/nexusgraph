// Copyright 2023 Paion Data. All rights reserved.

export function isNullish(x: unknown): x is null | undefined {
  return x === null || x === undefined
}

export function min<T>(list: Array<T>, accessor?: (item: T) => number): number {
  const values = list
    .map(accessor ?? Number)
    .filter(n => !(isNullish(n) || isNaN(n)))

  return Math.min(...values)
}

export function max<T>(list: Array<T>, accessor?: (item: T) => number): number {
  const values = list
    .map(accessor ?? Number)
    .filter(n => !(isNullish(n) || isNaN(n)))

  return Math.max(...values)
}

export function sum<T>(list: Array<T>, accessor?: (item: T) => number): number {
  return list.map(accessor ?? Number).reduce((sum, curr) => {
    if (isNullish(curr) || isNaN(curr)) {
      return sum
    }

    return sum + curr
  }, 0)
}

export function groupBy<T>(
  list: Array<T>,
  group: (item: T) => number | string
): Record<string, Array<T>> {
  return list.reduce((groups, item) => {
    const key = group(item)

    if (groups[key]) {
      groups[key].push(item)
    } else {
      groups[key] = [item]
    }

    return groups
  }, {} as Record<string, Array<T>>)
}
