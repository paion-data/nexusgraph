/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { combineEpics } from 'redux-observable'

import {
  fetchGuideFromAllowlistEpic,
  handleCommandEpic,
  handleSingleCommandEpic,
  postConnectCmdEpic
} from './modules/commands/commandsDuck'
import {
  connectEpic,
  connectionLostEpic,
  detectActiveConnectionChangeEpic,
  disconnectEpic,
  disconnectSuccessEpic,
  initialSwitchConnectionFailEpic,
  retainCredentialsSettingsEpic,
  silentDisconnectEpic,
  startupConnectEpic,
  startupConnectionFailEpic,
  startupConnectionSuccessEpic,
  switchConnectionEpic,
  switchConnectionFailEpic,
  switchConnectionSuccessEpic,
  useDbEpic,
  verifyConnectionCredentialsEpic
} from './modules/connections/connectionsDuck'
import { credentialsTimeoutEpic } from './modules/credentialsPolicy/credentialsPolicyDuck'
import {
  clearCurrentUserOnDisconnectEpic,
  getCurrentUserEpic
} from './modules/currentUser/currentUserDuck'
import {
  adHocCypherRequestEpic,
  clusterCypherRequestEpic,
  cypherRequestEpic,
  handleForcePasswordChangeEpic,
  routedCypherRequestEpic
} from './modules/cypher/cypherDuck'
import {
  clearMetaOnDisconnectEpic,
  dbMetaEpic,
  dbCountEpic,
  serverConfigEpic
} from './modules/dbMeta/dbMetaEpics'
import {
  discoveryOnStartupEpic,
  injectDiscoveryEpic
} from './modules/discovery/discoveryDuck'
import {
  initializeCypherEditorEpic,
  populateEditorFromUrlEpic,
  updateEditorSupportSchemaEpic
} from './modules/editor/editorDuck'
import { clearOnDisconnectEpic } from './modules/features/featuresDuck'
import { ensureMaxFramesEpic } from './modules/frames/framesDuck'
import { fetchRemoteGuideEpic } from './modules/guides/guidesDuck'
import { clearLocalstorageEpic } from './modules/localstorage/localstorageDuck'
import { cancelRequestEpic } from './modules/requests/requestsDuck'
import {
  clearSyncEpic,
  loadFavoritesFromSyncEpic,
  loadFoldersFromSyncEpic,
  loadGrassFromSyncEpic,
  syncFavoritesEpic,
  syncFoldersEpic,
  syncGrassEpic,
  syncItemsEpic
} from './modules/sync/syncDuck'
import {
  trackCommandUsageEpic,
  trackErrorFramesEpic,
  trackReduxActionsEpic,
  udcStartupEpic
} from './modules/udc/udcDuck'

export default combineEpics(
  handleCommandEpic,
  handleSingleCommandEpic,
  postConnectCmdEpic,
  fetchGuideFromAllowlistEpic,
  connectionLostEpic,
  switchConnectionEpic,
  switchConnectionSuccessEpic,
  switchConnectionFailEpic,
  initialSwitchConnectionFailEpic,
  retainCredentialsSettingsEpic,
  connectEpic,
  disconnectEpic,
  silentDisconnectEpic,
  useDbEpic,
  startupConnectEpic,
  disconnectSuccessEpic,
  verifyConnectionCredentialsEpic,
  startupConnectionSuccessEpic,
  startupConnectionFailEpic,
  detectActiveConnectionChangeEpic,
  dbMetaEpic,
  dbCountEpic,
  serverConfigEpic,
  clearMetaOnDisconnectEpic,
  cancelRequestEpic,
  discoveryOnStartupEpic,
  injectDiscoveryEpic,
  populateEditorFromUrlEpic,
  adHocCypherRequestEpic,
  routedCypherRequestEpic,
  cypherRequestEpic,
  clusterCypherRequestEpic,
  clearLocalstorageEpic,
  handleForcePasswordChangeEpic,
  clearOnDisconnectEpic,
  syncFavoritesEpic,
  loadFavoritesFromSyncEpic,
  loadGrassFromSyncEpic,
  syncItemsEpic,
  clearSyncEpic,
  loadFoldersFromSyncEpic,
  syncFoldersEpic,
  syncGrassEpic,
  credentialsTimeoutEpic,
  udcStartupEpic,
  ensureMaxFramesEpic,
  getCurrentUserEpic,
  clearCurrentUserOnDisconnectEpic,
  trackCommandUsageEpic,
  trackErrorFramesEpic,
  trackReduxActionsEpic,
  initializeCypherEditorEpic,
  updateEditorSupportSchemaEpic,
  fetchRemoteGuideEpic
)
