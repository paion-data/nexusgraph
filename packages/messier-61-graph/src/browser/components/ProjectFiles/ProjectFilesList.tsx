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
import React from 'react'

import { SavedScriptsBody, SavedScriptsHeader } from '../SavedScripts/styled'
import ProjectFilesListItem from './ProjectFilesListItem'

export type ProjectFileScript = {
  content: Promise<string>
  filename: string
}

interface ProjectFileListProps {
  scripts: ProjectFileScript[]
  selectScript: (script: ProjectFileScript) => void
  removeScript: (script: ProjectFileScript) => void
  execScript: (cmd: string) => void
}

export default function ProjectFileList({
  scripts,
  selectScript,
  removeScript,
  execScript
}: ProjectFileListProps): JSX.Element {
  const sortedScripts = scripts.sort((f1, f2) =>
    f1.filename.localeCompare(f2.filename)
  )

  return (
    <SavedScriptsBody>
      <SavedScriptsHeader>Cypher files</SavedScriptsHeader>
      {sortedScripts.map(script => (
        <ProjectFilesListItem
          selectScript={selectScript}
          execScript={execScript}
          removeScript={removeScript}
          script={script}
          key={script.filename}
        />
      ))}
    </SavedScriptsBody>
  )
}
