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
import { GlobalState } from 'shared/globalState'

export const NAME = 'sidebar'

export const TOGGLE = 'sidebar/TOGGLE'
export const OPEN = 'sidebar/OPEN'
export const SET_DRAFT_SCRIPT = 'sidebar/SET_DRAFT_SCRIPT'
export const TRACK_CANNY_CHANGELOG = 'sidebar/CANNY_CHANGELOG_OPENED'
export const TRACK_CANNY_FEATURE_REQUEST =
  'sidebar/CANNY_FEATURE_REQUEST_OPENED'

export function getOpenDrawer(state: GlobalState): string | null {
  return state[NAME].drawer
}

export function getCurrentDraft(state: GlobalState): string | null {
  return state[NAME].draftScript
}

export function getScriptDraftId(state: GlobalState): string | null {
  return state[NAME].scriptId || null
}

export const GUIDE_DRAWER_ID = 'guides'

// SIDEBAR
type DrawerId =
  | 'dbms'
  | 'db'
  | 'documents'
  | 'sync'
  | 'favorites'
  | 'about'
  | 'project files'
  | 'settings'
  | typeof GUIDE_DRAWER_ID
  | null
export interface SidebarState {
  drawer: DrawerId | null
  draftScript: string | null
  scriptId: string | null
}
const initialState: SidebarState = {
  drawer: null,
  draftScript: null,
  scriptId: null
}

function toggleDrawer(state: SidebarState, drawer: DrawerId): SidebarState {
  // When toggling the drawer we clear the script draft
  if (drawer === state.drawer) {
    return { draftScript: null, drawer: null, scriptId: null }
  }
  return { draftScript: null, drawer, scriptId: null }
}

type SidebarAction = ToggleAction | SetDraftScriptAction | OpenSidebarAction

interface ToggleAction {
  type: typeof TOGGLE
  drawerId: DrawerId
}

export interface OpenSidebarAction {
  type: typeof OPEN
  drawerId: DrawerId
}

export interface SetDraftScriptAction {
  type: typeof SET_DRAFT_SCRIPT
  cmd: string | null
  scriptId: string | null
  drawerId: DrawerId
}

export default function reducer(
  state = initialState,
  action: SidebarAction
): SidebarState {
  switch (action.type) {
    case TOGGLE:
      return toggleDrawer(state, action.drawerId)
    case OPEN:
      return { ...state, drawer: action.drawerId }
    case SET_DRAFT_SCRIPT:
      return {
        drawer: action.drawerId,
        scriptId: action.scriptId,
        draftScript: action.cmd
      }
  }
  return state
}

export function toggle(drawerId: DrawerId): ToggleAction {
  return { type: TOGGLE, drawerId }
}

export function open(drawerId: DrawerId): OpenSidebarAction {
  return { type: OPEN, drawerId }
}

export function setDraftScript(
  cmd: string | null,
  drawerId: DrawerId,
  scriptId: string | null = null
): SetDraftScriptAction {
  return { type: SET_DRAFT_SCRIPT, cmd, drawerId, scriptId }
}
