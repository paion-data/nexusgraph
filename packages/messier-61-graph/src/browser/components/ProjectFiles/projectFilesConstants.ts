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
import { gql } from '@apollo/client'

export const REMOVE_PROJECT_FILE = 'REMOVE_PROJECT_FILE'

export interface AddProjectFile {
  addProjectFile: ProjectFile
}

export interface RemoveProjectFile {
  removeProjectFile: Omit<ProjectFile, 'downloadToken'>
}

export interface ProjectFile {
  downloadToken: string
  name: string
  directory: string
  extension: string
}

export interface ProjectFileMapping {
  downloadToken: string
  name: string
  directory: string
  apiToken: string
  clientId: string
  relateUrl: string
}

export interface ProjectFilesResult {
  getProject: {
    id: string
    files: ProjectFile[]
  }
}

export interface ProjectFilesVariables {
  projectId: string
}

export const GET_PROJECT_FILES = gql`
  query GetProject($projectId: String!, $filterValue: String!) {
    getProject(name: $projectId) {
      id
      files(
        filters: [{ field: "extension", type: EQUALS, value: $filterValue }]
      ) {
        name
        directory
        extension
        downloadToken
      }
    }
  }
`
export const DELETE_PROJECT_FILE = gql`
  mutation RemoveFile($projectId: String!, $filePath: String!) {
    removeProjectFile(name: $projectId, filePath: $filePath) {
      name
      directory
    }
  }
`
export const ADD_PROJECT_FILE = gql`
  mutation AddFile(
    $projectId: String!
    $fileUpload: Upload!
    $destination: String
    $overwrite: Boolean
  ) {
    addProjectFile(
      name: $projectId
      fileUpload: $fileUpload
      destination: $destination
      overwrite: $overwrite
    ) {
      name
      directory
      extension
      downloadToken
    }
  }
`
