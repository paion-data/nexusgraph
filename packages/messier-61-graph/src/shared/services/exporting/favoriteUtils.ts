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
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

// Polyfill for FF
import { getScriptDisplayName } from 'browser/components/SavedScripts'
import { Favorite } from 'shared/modules/favorites/favoritesDuck'
import { Folder } from 'shared/modules/favorites/foldersDuck'

export const CYPHER_FILE_EXTENSION = '.cypher'
export type ExportFormat = 'CYPHERFILE' | 'ZIPFILE'
export const exporters: Record<
  ExportFormat,
  (favorites: Favorite[], folders: Folder[]) => void
> = {
  ZIPFILE: exportFavoritesAsZip,
  CYPHERFILE: exportFavoritesAsBigCypherFile
}

export function exportFavoritesAsBigCypherFile(favorites: Favorite[]): void {
  const fileContent = favorites
    .map(favorite => favorite.content)
    .join('\n\n')
    .trim()

  saveAs(
    new Blob([fileContent], { type: 'text/csv' }),
    `saved-scripts-${new Date().toISOString().split('T')[0]}.cypher`
  )
}

type WriteableFavorite = {
  content: string
  fullFilename: string
}
export function exportFavoritesAsZip(
  favorites: Favorite[],
  folders: Folder[]
): void {
  const zip = new JSZip()
  transformFavoriteAndFolders(favorites, folders).forEach(
    ({ content, fullFilename }) => {
      zip.file(fullFilename, content)
    }
  )

  zip
    .generateAsync({ type: 'blob' })
    .then(blob =>
      saveAs(
        blob,
        `saved-scripts-${new Date().toISOString().split('T')[0]}.zip`
      )
    )
}

function toSafefilename(name: string): string {
  return name
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/_$/, '')
}

function transformFavoriteAndFolders(
  favorites: Favorite[],
  folders: Folder[] = []
): WriteableFavorite[] {
  return favorites.map(fav => {
    const { content, folder: folderId } = fav
    const name = toSafefilename(getScriptDisplayName(fav))
    const nameWithExtension = `${name}${CYPHER_FILE_EXTENSION}`

    const folderName = folders.find(folder => folder.id === folderId)?.name

    return {
      content,
      fullFilename: folderName
        ? [toSafefilename(folderName), nameWithExtension].join('/')
        : nameWithExtension
    }
  })
}
