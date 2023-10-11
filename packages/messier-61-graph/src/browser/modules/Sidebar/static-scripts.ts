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
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import semver from 'semver'

import * as favorites from '../../../shared/modules/favorites/favoritesDuck'
import { getFolders } from '../../../shared/modules/favorites/foldersDuck'
import MyScripts from 'browser/components/SavedScripts'
import {
  commandSources,
  executeCommand
} from 'shared/modules/commands/commandsDuck'
import { getRawVersion } from 'shared/modules/dbMeta/dbMetaDuck'
import * as editor from 'shared/modules/editor/editorDuck'

const mapFavoritesStateToProps = (state: any) => {
  const version = semver.coerce(getRawVersion(state) || '0') ?? '0'
  const folders = getFolders(state).filter(folder => folder.isStatic)
  const scripts = favorites
    .getFavorites(state)
    .filter(
      fav =>
        fav.isStatic &&
        fav.versionRange &&
        semver.satisfies(version, fav.versionRange)
    )

  return {
    title: 'Sample Scripts',
    folders,
    scripts
  }
}
const mapFavoritesDispatchToProps = (dispatch: any, ownProps: any) => ({
  selectScript: (favorite: favorites.Favorite) =>
    ownProps.bus.send(
      editor.EDIT_CONTENT,
      editor.editContent(favorite.id, favorite.content, { isStatic: true })
    ),
  execScript: (favorite: any) =>
    dispatch(executeCommand(favorite.content), {
      source: commandSources.sidebar
    })
})

const Favorites = withBus(
  connect(mapFavoritesStateToProps, mapFavoritesDispatchToProps)(MyScripts)
)

export default Favorites
