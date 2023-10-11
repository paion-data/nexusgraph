// Copyright 2023 Paion Data. All rights reserved.
import { AppState, NAME as app } from './modules/app/appDuck'
import { NAME as commands } from './modules/commands/commandsDuck'
import {
  ConnectionReduxState,
  NAME as connections
} from './modules/connections/connectionsDuck'
import {
  NAME as user,
  initialState as userInitialState
} from './modules/currentUser/currentUserDuck'
import {
  NAME as meta,
  initialState as metaInitialState
} from './modules/dbMeta/dbMetaDuck'
import {
  NAME as experimentalFeatures,
  initialState as experimentalFeaturesInitialState
} from './modules/experimentalFeatures/experimentalFeaturesDuck'
import { Favorite, NAME as documents } from './modules/favorites/favoritesDuck'
import { Folder, NAME as folders } from './modules/favorites/foldersDuck'
import {
  NAME as features,
  initialState as featuresInitialState
} from './modules/features/featuresDuck'
import { FramesState, NAME as frames } from './modules/frames/framesDuck'
import { NAME as grass } from './modules/grass/grassDuck'
import { GuideState, NAME as guides } from './modules/guides/guidesDuck'
import { NAME as history } from './modules/history/historyDuck'
import { NAME as params } from './modules/params/paramsDuck'
import { RequestState, NAME as requests } from './modules/requests/requestsDuck'
import {
  SettingsState,
  NAME as settings
} from './modules/settings/settingsDuck'
import { SidebarState, NAME as sidebar } from './modules/sidebar/sidebarDuck'
import {
  initialConsentState,
  initialMetadataState,
  NAME as sync,
  NAME_CONSENT as syncConsent,
  initialState as syncInitialState,
  NAME_META as syncMetadata
} from './modules/sync/syncDuck'
import { UdcState, NAME as udc } from './modules/udc/udcDuck'

export interface GlobalState {
  [settings]: SettingsState
  [connections]: ConnectionReduxState
  [history]: string[]
  [requests]: RequestState
  [sidebar]: SidebarState
  [frames]: FramesState
  [features]: typeof featuresInitialState
  [user]: typeof userInitialState
  [meta]: typeof metaInitialState
  [documents]: Favorite[]
  [params]: Record<string, unknown>
  [grass]: unknown
  [sync]: typeof syncInitialState
  [syncMetadata]: typeof initialMetadataState
  [syncConsent]: typeof initialConsentState
  [folders]: Folder[]
  [commands]: unknown
  [udc]: UdcState
  [app]: AppState
  [experimentalFeatures]: typeof experimentalFeaturesInitialState
  [guides]: GuideState
}
