// Copyright 2023 Paion Data. All rights reserved.

const asTitleString = (connectionData: any) => {
  const buildTitleFromConnectionData = () => {
    if (!connectionData) return null
    const dbPath = connectionData.db ? `/${connectionData.db}` : ''
    if (connectionData.username && connectionData.host) {
      return `${connectionData.username}@${connectionData.host}${dbPath}`
    }
    if (connectionData.username) {
      return connectionData.username
    }
    if (connectionData.host) {
      return `${connectionData.host}${dbPath}`
    }
    return null
  }
  const builtTitle = buildTitleFromConnectionData()
  return `${builtTitle ? `${builtTitle} - ` : ''}Neo4j Browser`
}

export default asTitleString
