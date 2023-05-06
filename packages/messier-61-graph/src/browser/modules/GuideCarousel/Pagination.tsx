// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import { Dots, PaginationItem } from './styled'

type PaginationProps = {
  gotoIndex: (index: number) => void
  itemCount: number
  selectedIndex: number
}
const DOTS = '...'
type DotDotDot = typeof DOTS

const range = (from: number, to: number) =>
  Array.from({ length: from ? to - from + 1 : to }, (_, i) => i + from)

export function paginationHelper(
  itemCount: number,
  selectedIndex: number
): (number | DotDotDot)[] {
  /* We aim to always show 7 symbols
     Pagination example (C denotes current index and D denotes dots)
     C 2 3 4 5 D 9
     1 C 3 4 5 D 9
     1 2 C 4 5 D 9
     1 2 3 C 5 D 9
     1 D 4 C 6 D 9
     1 D 5 C 7 8 9
     1 D 5 6 C 8 9
     1 D 5 6 7 C 9
     1 D 5 6 7 8 C
*/
  const lastIndex = itemCount - 1
  const outOfBounds = selectedIndex < 0 || selectedIndex > lastIndex
  if (outOfBounds) {
    return []
  }

  const baseNumbers = range(0, itemCount)

  // no split
  if (itemCount <= 7) {
    return baseNumbers
  }

  // early splits
  if (selectedIndex < 4) {
    return [...range(0, 5), DOTS, lastIndex]
  }

  // late splits
  const isInlastFiveItems = itemCount - selectedIndex < 5
  if (isInlastFiveItems) {
    return [0, DOTS, ...range(itemCount - 5, lastIndex)]
  }

  // two splits
  return [
    0,
    DOTS,
    selectedIndex - 1,
    selectedIndex,
    selectedIndex + 1,
    DOTS,
    lastIndex
  ]
}

function Pagination({
  gotoIndex,
  itemCount,
  selectedIndex
}: PaginationProps): JSX.Element {
  return (
    <>
      {paginationHelper(itemCount, selectedIndex).map(
        (slideIndexOrDots, index) => {
          if (slideIndexOrDots === DOTS) {
            return <Dots key={index}>…</Dots>
          } else {
            const displayNumber = slideIndexOrDots + 1
            return (
              <PaginationItem
                active={selectedIndex === slideIndexOrDots}
                key={index}
                onClick={() => gotoIndex(slideIndexOrDots)}
                data-testid={`pagination-${displayNumber}`}
              >
                {displayNumber}
              </PaginationItem>
            )
          }
        }
      )}
    </>
  )
}
export default Pagination
