// Copyright 2023 Paion Data. All rights reserved.
import { version } from 'project-root/package.json'

// Application info
export const NEO4J_BROWSER_BACKGROUND_QUERY = 'system'
export const NEO4J_BROWSER_USER_QUERY = 'user-direct'
export const NEO4J_BROWSER_USER_ACTION_QUERY = 'user-action'
export const DEFAULT_QUERY_METADATA_TYPE = NEO4J_BROWSER_USER_ACTION_QUERY
export const NEO4J_BROWSER_APP_ID = `neo4j-browser_v${version}`

export const backgroundTxMetadata = {
  txMetadata: {
    type: NEO4J_BROWSER_BACKGROUND_QUERY,
    app: NEO4J_BROWSER_APP_ID
  }
}

export const userDirectTxMetadata = {
  txMetadata: {
    type: NEO4J_BROWSER_USER_QUERY,
    app: NEO4J_BROWSER_APP_ID
  }
}
export const userActionTxMetadata = {
  txMetadata: {
    type: NEO4J_BROWSER_USER_ACTION_QUERY,
    app: NEO4J_BROWSER_APP_ID
  }
}
export const defaultTxMetadata = userActionTxMetadata

export const getUserTxMetadata = (
  type: string = DEFAULT_QUERY_METADATA_TYPE
) => ({
  txMetadata: {
    type,
    app: NEO4J_BROWSER_APP_ID
  }
})
