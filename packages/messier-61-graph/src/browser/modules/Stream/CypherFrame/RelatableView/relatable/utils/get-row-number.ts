// Copyright 2023 Paion Data. All rights reserved.
export default function getRowNumber(
  rowIndex: number,
  pageIndex: number,
  pageSize: number
) {
  return rowIndex + (pageIndex * pageSize + 1)
}
