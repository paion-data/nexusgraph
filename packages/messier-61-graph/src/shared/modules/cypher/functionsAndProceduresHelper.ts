// Copyright 2023 Paion Data. All rights reserved.

import { gte, SemVer } from 'semver'
export const getListProcedureQuery = (version: SemVer | null): string => {
  const versionOrFallback = version ?? '5.0.0'
  return gte(versionOrFallback, '5.0.0')
    ? 'SHOW PROCEDURES yield name, description, signature'
    : 'CALL dbms.procedures()'
}

export const getListFunctionQuery = (version: SemVer | null): string => {
  const versionOrFallback = version ?? '5.0.0'
  return gte(versionOrFallback, '5.0.0')
    ? 'SHOW FUNCTIONS yield name, description, signature'
    : 'CALL dbms.functions()'
}
