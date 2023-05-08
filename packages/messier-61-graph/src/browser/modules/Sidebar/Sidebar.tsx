// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import { connect } from 'react-redux'

import {
  DatabaseIcon,
  EditorIcon,
} from 'browser-components/icons/LegacyIcons'

import DatabaseDrawer from '../DBMSInfo/DBMSInfo'
import TabNavigation, {
  NavItem,
} from 'browser-components/TabNavigation/Navigation'
import { GlobalState } from 'shared/globalState'
import { isRelateAvailable } from 'shared/modules/app/appDuck'
import {
  CONNECTED_STATE,
  DISCONNECTED_STATE,
  PENDING_STATE
} from 'shared/modules/connections/connectionsDuck'
import { utilizeBrowserSync } from 'shared/modules/features/featuresDuck'
import { getCurrentDraft } from 'shared/modules/sidebar/sidebarDuck'
import { isUserSignedIn } from 'shared/modules/sync/syncDuck'
import { EditorContainer } from './EditorContainer'

interface SidebarProps {
  selectedDrawerName: string
  onNavClick: () => void
  neo4jConnectionState: string
  showStaticScripts: boolean
  syncConnected: boolean
  loadSync: boolean
  isRelateAvailable: boolean
  scriptDraft: string | null
}

const Sidebar = ({
  selectedDrawerName,
  onNavClick,
  loadSync,
}: SidebarProps) => {
  const topNavItems: NavItem[] = [
    {
      name: 'Editor',
      title: 'Editor',
      icon: function GuideDrawerIconComp(isOpen: boolean): JSX.Element {
        return <EditorIcon isOpen={isOpen} />
      },
      content: EditorContainer
    }
  ]

  // we don't need any bottom navigation items for now
  const bottomNavItems: NavItem[] = [].filter(({ name }) => loadSync || name !== 'Sync')

  return (
    <TabNavigation
      selectedDrawerName={selectedDrawerName}
      onNavClick={onNavClick}
      topNavItems={topNavItems}
      bottomNavItems={bottomNavItems}
    />
  )
}

const mapStateToProps = (state: GlobalState) => {
  let connectionState = 'disconnected'
  if (state.connections) {
    switch (state.connections.connectionState) {
      case PENDING_STATE:
        connectionState = 'pending'
        break
      case CONNECTED_STATE:
        connectionState = 'connected'
        break
      case DISCONNECTED_STATE:
        connectionState = 'disconnected'
        break
    }
  }
  return {
    syncConnected: isUserSignedIn(state) || false,
    neo4jConnectionState: connectionState,
    loadSync: utilizeBrowserSync(state),
    showStaticScripts: state.settings.showSampleScripts,
    isRelateAvailable: isRelateAvailable(state),
    scriptDraft: getCurrentDraft(state)
  }
}

export default connect(mapStateToProps)(Sidebar)
