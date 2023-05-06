// Copyright 2023 Paion Data. All rights reserved.
export default function setHasItems(set: Set<any>) {
  return set && set.constructor === Set && set.size > 0
}
