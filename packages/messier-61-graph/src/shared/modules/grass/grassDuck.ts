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
import { getBrowserName } from 'services/utils'
import { APP_START } from 'shared/modules/app/appDuck'

export const NAME = 'grass'
export const UPDATE_GRAPH_STYLE_DATA = 'grass/UPDATE_GRAPH_STYLE_DATA'
export const SYNC_GRASS = 'grass/SYNC_GRASS'

export const getGraphStyleData = (state: any) => state[NAME]

const versionSize = 20
const initialState: any = null

export const composeGrassToSync = (store: any, syncValue: any) => {
  const grassFromSync = syncValue.syncObj.grass || []
  const grassFromState = getGraphStyleData(store.getState())
  const stringifyedGrassFromState = JSON.stringify(grassFromState)

  if (
    grassFromSync.length < 1 ||
    (grassFromSync[0].data &&
      grassFromSync[0].data !== stringifyedGrassFromState &&
      grassFromSync[0].data !== grassFromState)
  ) {
    return [
      {
        client: getBrowserName(),
        data: stringifyedGrassFromState,
        syncedAt: Date.now()
      }
    ].concat(grassFromSync.slice(0, versionSize))
  }

  return grassFromSync
}

function updateStyleData(_state: any, styleData: any) {
  return styleData
}

export default function visualization(state = initialState, action: any) {
  switch (action.type) {
    case APP_START:
      return !state ? state : { ...initialState, ...state }
    case UPDATE_GRAPH_STYLE_DATA:
      return updateStyleData(state, action.styleData)
    default:
      return state
  }
}

export const updateGraphStyleData = (graphStyleData: any) => {
  return {
    type: UPDATE_GRAPH_STYLE_DATA,
    styleData: graphStyleData
  }
}
export function syncGrass(grass: any) {
  return {
    type: SYNC_GRASS,
    grass
  }
}

export const grassToLoad = (action: any, store: any) => {
  const grassFromSync =
    action.obj.syncObj &&
    action.obj.syncObj.grass &&
    action.obj.syncObj.grass.length > 0
      ? action.obj.syncObj.grass[0].data || {}
      : null

  const existingGrass = getGraphStyleData(store.getState())
  const grassHasChanged = grassFromSync !== JSON.stringify(existingGrass)

  if (grassFromSync) {
    if (grassHasChanged) {
      return {
        grass: grassFromSync,
        syncGrass: false,
        loadGrass: true
      }
    } else {
      return {
        grass: existingGrass,
        syncGrass: false,
        loadGrass: false
      }
    }
  } else {
    return {
      grass: existingGrass,
      syncGrass: true,
      loadGrass: false
    }
  }
}
