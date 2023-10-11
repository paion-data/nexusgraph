// Copyright 2023 Paion Data. All rights reserved.

export const getClusterAddresses = 'CALL dbms.cluster.overview YIELD addresses'

export function listQueriesProcedure() {
  return 'CALL dbms.listQueries'
}

export function killQueriesProcedure(queryIdList: any) {
  return `CALL dbms.killQueries([${queryIdList
    .map((q: any) => `"${q}"`)
    .join()}])`
}
