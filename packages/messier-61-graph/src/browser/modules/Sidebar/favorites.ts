// Copyright 2023 Paion Data. All rights reserved.
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import uuid from 'uuid'

import MyScripts from 'browser/components/SavedScripts'
import { ExportFormat, exporters } from 'services/exporting/favoriteUtils'
import {
  commandSources,
  executeCommand
} from 'shared/modules/commands/commandsDuck'
import * as editor from 'shared/modules/editor/editorDuck'
import * as favoritesDuck from 'shared/modules/favorites/favoritesDuck'
import * as foldersDuck from 'shared/modules/favorites/foldersDuck'

const mapFavoritesStateToProps = (state: any) => {
  const folders = foldersDuck
    .getFolders(state)
    .filter(folder => !folder.isStatic)
  const scripts = favoritesDuck
    .getFavorites(state)
    .filter(script => !script.isStatic)

  return {
    folders,
    scripts,
    title: 'Local scripts'
  }
}

const mapFavoritesDispatchToProps = (dispatch: any, ownProps: any) => ({
  selectScript: (favorite: favoritesDuck.Favorite) =>
    ownProps.bus.send(
      editor.EDIT_CONTENT,
      editor.editContent(favorite.id, favorite.content)
    ),
  execScript: (favorite: favoritesDuck.Favorite) =>
    dispatch(
      executeCommand(favorite.content, { source: commandSources.favorite })
    ),
  removeScripts: (ids: string[]) =>
    dispatch(favoritesDuck.removeFavorites(ids)),
  renameScript: (favorite: favoritesDuck.Favorite, name: string) => {
    if (favorite.id) {
      dispatch(favoritesDuck.renameFavorite(favorite.id, name))
    }
  },
  updateFolders(folders: foldersDuck.Folder[]) {
    dispatch(foldersDuck.updateFolders(folders))
  },
  createNewFolder(id?: string) {
    dispatch(foldersDuck.addFolder(id || uuid.v4(), 'New Folder'))
  },
  dispatchRemoveFolderAndItsScripts(folderId: string, favoriteIds: string[]) {
    dispatch(foldersDuck.removeFolder(folderId))
    dispatch(favoritesDuck.removeFavorites(favoriteIds))
  },
  moveScript(favoriteId: string, folderId?: string) {
    dispatch(favoritesDuck.moveFavorite(favoriteId, folderId))
  },
  createNewScript() {
    const id = uuid.v4()
    const content = `// Untitled favorite
`
    dispatch(favoritesDuck.addFavorite(content, id))
    ownProps.bus.send(editor.EDIT_CONTENT, editor.editContent(id, content))
  },
  exportScripts(
    favorites: favoritesDuck.Favorite[],
    folders: foldersDuck.Folder[],
    format: ExportFormat
  ) {
    exporters[format](favorites, folders)
  },
  addScript(content: string) {
    dispatch(favoritesDuck.addFavorite(content))
  }
})

const mergeProps = (stateProps: any, dispatchProps: any) => {
  return {
    ...stateProps,
    ...dispatchProps,
    renameFolder: (folderId: string, name: string) => {
      dispatchProps.updateFolders(
        stateProps.folders.map((folder: foldersDuck.Folder) =>
          folderId === folder.id ? { ...folder, name } : folder
        )
      )
    },
    removeFolder(folderId: string) {
      const scriptsToRemove = stateProps.scripts
        .filter((script: favoritesDuck.Favorite) => script.folder === folderId)
        .map((script: favoritesDuck.Favorite) => script.id)
      dispatchProps.dispatchRemoveFolderAndItsScripts(folderId, scriptsToRemove)
    }
  }
}

export default withBus(
  connect(
    mapFavoritesStateToProps,
    mapFavoritesDispatchToProps,
    mergeProps
  )(MyScripts)
)
