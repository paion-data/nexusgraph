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
import appReducer, { NAME as app } from 'shared/modules/app/appDuck'
import commandsReducer, {
  NAME as commands
} from 'shared/modules/commands/commandsDuck'
import connectionsReducer, {
  NAME as connections
} from 'shared/modules/connections/connectionsDuck'
import userReducer, {
  NAME as currentUser
} from 'shared/modules/currentUser/currentUserDuck'
import dbMetaReducer, { NAME as dbMeta } from 'shared/modules/dbMeta/dbMetaDuck'
import experimentalFeaturesReducer, {
  NAME as experimentalFeatures
} from 'shared/modules/experimentalFeatures/experimentalFeaturesDuck'
import favoritesReducer, {
  NAME as documents
} from 'shared/modules/favorites/favoritesDuck'
import foldersReducer, {
  NAME as folders
} from 'shared/modules/favorites/foldersDuck'
import featuresReducer, {
  NAME as features
} from 'shared/modules/features/featuresDuck'
import streamReducer, { NAME as stream } from 'shared/modules/frames/framesDuck'
import grassReducer, { NAME as grass } from 'shared/modules/grass/grassDuck'
import guideReducer, { NAME as guides } from 'shared/modules/guides/guidesDuck'
import historyReducer, {
  NAME as history
} from 'shared/modules/history/historyDuck'
import paramsReducer, { NAME as params } from 'shared/modules/params/paramsDuck'
import requestsReducer, {
  NAME as requests
} from 'shared/modules/requests/requestsDuck'
import settingsReducer, {
  NAME as settings
} from 'shared/modules/settings/settingsDuck'
import sidebarReducer, {
  NAME as sidebar
} from 'shared/modules/sidebar/sidebarDuck'
import {
  NAME as sync,
  NAME_CONSENT as syncConsent,
  syncConsentReducer,
  syncMetaDataReducer,
  NAME_META as syncMetadata,
  syncReducer
} from 'shared/modules/sync/syncDuck'
import udcReducer, { NAME as udc } from 'shared/modules/udc/udcDuck'

export default {
  [connections]: connectionsReducer,
  [stream]: streamReducer,
  [settings]: settingsReducer,
  [features]: featuresReducer,
  [history]: historyReducer,
  [currentUser]: userReducer,
  [dbMeta]: dbMetaReducer,
  [documents]: favoritesReducer,
  [folders]: foldersReducer,
  [sidebar]: sidebarReducer,
  [params]: paramsReducer,
  [requests]: requestsReducer,
  [grass]: grassReducer,
  [sync]: syncReducer,
  [syncConsent]: syncConsentReducer,
  [syncMetadata]: syncMetaDataReducer,
  [commands]: commandsReducer,
  [udc]: udcReducer,
  [app]: appReducer,
  [guides]: guideReducer,
  [experimentalFeatures]: experimentalFeaturesReducer
}
