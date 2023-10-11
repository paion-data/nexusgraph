// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from 'react'

import { ExportItem } from '../Frame/ExportButton'
import FrameEditor from '../Frame/FrameEditor'
import FrameTitlebar from '../Frame/FrameTitlebar'
import { ContentContainer, StyledFrame } from '../Frame/styled'
import UserAdd from '../User/UserAdd'
import UserList from '../User/UserList'
import ChangePasswordFrame from './Auth/ChangePasswordFrame'
import ConnectionFrame from './Auth/ConnectionFrame'
import DbsFrame from './Auth/DbsFrame'
import DisconnectFrame from './Auth/DisconnectFrame'
import ServerStatusFrame from './Auth/ServerStatusFrame'
import ServerSwitchFrame from './Auth/ServerSwitchFrame'
import UseDbFrame from './Auth/UseDbFrame'
import CypherFrame from './CypherFrame/CypherFrame'
import CypherScriptFrame from './CypherScriptFrame/CypherScriptFrame'
import ErrorFrame from './ErrorFrame'
import HelpFrame from './HelpFrame'
import HistoryFrame from './HistoryFrame'
import ParamsFrame from './ParamsFrame'
import PlayFrame from './PlayFrame'
import PreFrame from './PreFrame'
import QueriesFrame from './Queries/QueriesFrame'
import SchemaFrame from './SchemaFrame'
import { BaseFrameProps } from './Stream'
import StyleFrame from './StyleFrame'
import SysInfoFrame from './SysInfoFrame/SysInfoFrame'
import { Connection } from 'shared/modules/connections/connectionsDuck'
import { FrameStack } from 'shared/modules/frames/framesDuck'
import extras from './Extras/index'
import DebugConnectivityFrame from './DebugConnectivityFrame'

const nameToFrame: Record<string, React.ComponentType<any>> = {
  error: ErrorFrame,
  cypher: CypherFrame,
  'debug-connectivity': DebugConnectivityFrame,
  'cypher-script': CypherScriptFrame,
  'user-list': UserList,
  'user-add': UserAdd,
  'change-password': ChangePasswordFrame,
  pre: PreFrame,
  play: PlayFrame,
  'play-remote': PlayFrame,
  history: HistoryFrame,
  param: ParamsFrame,
  params: ParamsFrame,
  connection: ConnectionFrame,
  disconnect: DisconnectFrame,
  schema: SchemaFrame,
  help: HelpFrame,
  queries: QueriesFrame,
  sysinfo: SysInfoFrame,
  status: ServerStatusFrame,
  'switch-success': ServerSwitchFrame,
  'switch-fail': ServerSwitchFrame,
  'use-db': UseDbFrame,
  'reset-db': UseDbFrame,
  dbs: DbsFrame,
  style: StyleFrame
}

const getFrameComponent = (frameData: FrameStack): React.ComponentType<any> => {
  const { cmd, type } = frameData.stack[0]
  let MyFrame = nameToFrame[type] ?? ErrorFrame

  if (type === 'error') {
    const command = cmd.replace(/^:/, '')
    const frameName = command[0].toUpperCase() + command.slice(1) + 'Frame'
    const isExtraFrame = (
      frameName: string
    ): frameName is keyof typeof extras =>
      Object.keys(extras).includes(frameName)

    if (isExtraFrame(frameName)) {
      MyFrame = extras[frameName]
    }
  }
  return MyFrame
}

type FrameContainerProps = {
  frameData: FrameStack
  activeConnectionData: Connection | null
}

export function FrameContainer(props: FrameContainerProps): JSX.Element {
  const { isFullscreen, toggleFullscreen, isCollapsed, toggleCollapse } =
    useSizeToggles()
  const frame = props.frameData.stack[0]
  const [exportItems, setExportItems] = useState<ExportItem[]>([])
  const frameProps: BaseFrameProps = {
    frame,
    activeConnectionData: props.activeConnectionData,
    stack: props.frameData.stack,
    isFullscreen,
    isCollapsed,
    setExportItems
  }
  const FrameComponent = getFrameComponent(props.frameData)

  return (
    <StyledFrame
      className={isFullscreen ? 'is-fullscreen' : ''}
      data-testid="frame"
      isFullscreen={isFullscreen}
    >
      <FrameTitlebar
        frame={frame}
        pinned={props.frameData.isPinned}
        isFullscreen={isFullscreen}
        fullscreenToggle={toggleFullscreen}
        isCollapsed={isCollapsed}
        collapseToggle={toggleCollapse}
        togglePin={() => undefined}
      />
      <ContentContainer>
        <FrameEditor
          frame={frame}
          fullscreenToggle={toggleFullscreen}
          exportItems={exportItems}
        />
        <FrameComponent {...frameProps} />
      </ContentContainer>
    </StyledFrame>
  )
}

function useSizeToggles() {
  const [isCollapsed, setCollapsed] = useState(false)
  const [isFullscreen, setFullscreen] = useState(false)

  function toggleCollapse() {
    setCollapsed(coll => !coll)
    setFullscreen(false)
  }

  function toggleFullscreen() {
    setFullscreen(full => !full)
    setCollapsed(false)
  }

  return {
    isCollapsed,
    isFullscreen,
    toggleCollapse,
    toggleFullscreen
  }
}
