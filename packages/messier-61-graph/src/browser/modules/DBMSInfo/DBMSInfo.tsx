// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'

import { LabelItems, RelationshipItems } from './MetaItems'
import {
  Drawer,
  DrawerBody,
  DrawerHeader
} from 'browser-components/drawer/drawer-styled'
import {
  commandSources,
  executeCommand,
  useDbCommand
} from 'shared/modules/commands/commandsDuck'
import { getUseDb } from 'shared/modules/connections/connectionsDuck'
import { getCurrentUser } from 'shared/modules/currentUser/currentUserDuck'
import {
  forceCount,
  getCountAutomaticRefreshLoading,
  getCountAutomaticRefreshEnabled,
  getDatabases
} from 'shared/modules/dbMeta/dbMetaDuck'
import { getGraphStyleData } from 'shared/modules/grass/grassDuck'

export function DBMSInfo(props: any): JSX.Element {
  const moreStep = 50
  const [maxLabelsCount, setMaxLabelsCount] = useState(moreStep)
  const [maxRelationshipsCount, setMaxRelationshipsCount] = useState(moreStep)

  const onMoreLabelsClick = (numMore: number) => {
    setMaxLabelsCount(maxLabelsCount + numMore)
  }

  const onMoreRelationshipsClick = (numMore: number) => {
    setMaxRelationshipsCount(maxRelationshipsCount + numMore)
  }

  const {
    labels = [],
    relationshipTypes = [],
    nodes,
    relationships
  } = props.meta
  const { onItemClick = [] } = props

  return (
    <Drawer id="db-drawer">
      <DrawerHeader>Graph Information &#10142;</DrawerHeader>
      <DrawerBody>
        <LabelItems
          count={nodes}
          labels={labels.slice(0, maxLabelsCount)}
          totalNumItems={labels.length}
          onItemClick={onItemClick}
          onMoreClick={onMoreLabelsClick}
          moreStep={moreStep}
          graphStyleData={props.graphStyleData}
        />
        <RelationshipItems
          count={relationships}
          relationshipTypes={relationshipTypes.slice(0, maxRelationshipsCount)}
          onItemClick={onItemClick}
          totalNumItems={relationshipTypes.length}
          onMoreClick={onMoreRelationshipsClick}
          moreStep={moreStep}
          graphStyleData={props.graphStyleData}
        />
      </DrawerBody>
    </Drawer>
  )
}

const mapStateToProps = (state: any) => {
  const useDb = getUseDb(state)
  const databases = getDatabases(state)
  const countAutoRefreshing = getCountAutomaticRefreshEnabled(state)
  const countLoading = getCountAutomaticRefreshLoading(state)
  return {
    graphStyleData: getGraphStyleData(state),
    meta: state.meta,
    user: getCurrentUser(state),
    useDb,
    databases,
    countAutoRefreshing,
    countLoading
  }
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onItemClick: (cmd: any) => {
      const action = executeCommand(cmd, { source: commandSources.button })
      ownProps.bus.send(action.type, action)
    },
    forceCount: () => {
      dispatch(forceCount())
    },
    onDbSelect: (dbName: any) =>
      dispatch(executeCommand(`:${useDbCommand} ${dbName || ''}`), {
        source: commandSources.button
      })
  }
}

export default withBus(connect(mapStateToProps, mapDispatchToProps)(DBMSInfo))
