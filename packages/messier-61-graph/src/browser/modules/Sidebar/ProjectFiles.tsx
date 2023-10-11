// Copyright 2023 Paion Data. All rights reserved.
import { useMutation } from '@apollo/client'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import ProjectFilesScripts, {
  ProjectFilesError
} from '../../components/ProjectFiles/ProjectsFilesScripts'
import { ADD_PROJECT_FILE } from '../../components/ProjectFiles/projectFilesConstants'
import {
  getProjectFileDefaultFileName,
  updateCacheAddProjectFile
} from '../../components/ProjectFiles/projectFilesUtils'
import NewSavedScript from './NewSavedScript'
import { Drawer, DrawerHeader } from 'browser-components/drawer/drawer-styled'
import { CYPHER_FILE_EXTENSION } from 'services/exporting/favoriteUtils'
import { getProjectId } from 'shared/modules/app/appDuck'
import {
  SetDraftScriptAction,
  setDraftScript
} from 'shared/modules/sidebar/sidebarDuck'
import { GlobalState } from 'shared/globalState'

interface ProjectFilesProps {
  projectId: string | undefined
  scriptDraft: string
  resetDraft: () => void
}

const ProjectFiles = ({
  projectId,
  scriptDraft,
  resetDraft
}: ProjectFilesProps) => {
  const [addFile, { error: apolloError }] = useMutation(ADD_PROJECT_FILE)

  function save(inputedFileName: string) {
    if (projectId) {
      const cypherFileExt = new RegExp(`${CYPHER_FILE_EXTENSION}$`)
      const fileName = inputedFileName.replace(cypherFileExt, '')

      addFile({
        variables: {
          projectId,
          fileUpload: new File(
            [scriptDraft],
            `${fileName}${CYPHER_FILE_EXTENSION}`
          ) // no destination; only saving to Project root at this point
        },
        update: (cache, result) =>
          updateCacheAddProjectFile(cache, result, projectId)
      })
        .then(resetDraft)
        .catch(e => e)
    }
  }

  return (
    <Drawer id="db-project-files">
      <DrawerHeader>Project Files</DrawerHeader>
      {scriptDraft && (
        <NewSavedScript
          defaultName={getProjectFileDefaultFileName(scriptDraft)}
          headerText="Save as"
          onSubmit={save}
          onCancel={resetDraft}
          pattern="^[\w\-.$+]+$"
          patternMessage="Include only letters, numbers or . - _ $ +"
        />
      )}
      <ProjectFilesError apolloErrors={[apolloError]} />
      <ProjectFilesScripts />
    </Drawer>
  )
}

const mapStateToProps = (state: GlobalState) => ({
  projectId: getProjectId(state)
})

const mapDispatchToProps = (dispatch: Dispatch<SetDraftScriptAction>) => ({
  resetDraft: () => {
    dispatch(setDraftScript(null, 'project files'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFiles)
