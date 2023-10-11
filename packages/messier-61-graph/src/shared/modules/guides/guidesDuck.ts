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
import { Epic } from 'redux-observable'
import { Observable } from 'rxjs'

import { resolveGuide } from '../../services/guideResolverHelper'
import { OpenSidebarAction, open } from '../sidebar/sidebarDuck'
import { Guide, isBuiltInGuide } from 'browser/documentation'
import { tryGetRemoteInitialSlideFromUrl } from 'services/guideResolverHelper'
import { GlobalState } from 'shared/globalState'
import { isOfType } from 'shared/utils/typeSafeActions'

export const NAME = 'guides'
export const FETCH_GUIDE = 'guides/FETCH_GUIDE'
export const SET_GUIDE = 'sidebar/SET_GUIDE'
export const GOTO_SLIDE = 'sidebar/GOTO_SLIDE'
export const UPDATE_REMOTE_GUIDES = 'sidebar/UPDATE_REMOTE_GUIDES'
export const ADD_REMOTE_GUIDE = 'sidebar/ADD_REMOTE_GUIDE'

export const getCurrentGuide = (state: GlobalState): Guide | null =>
  state[NAME].currentGuide
export const getRemoteGuides = (state: GlobalState): RemoteGuide[] =>
  state[NAME].remoteGuides

export type RemoteGuide = Omit<Guide, 'slides'>
export interface GuideState {
  currentGuide: Guide | null
  remoteGuides: RemoteGuide[]
}

const initialState: GuideState = {
  currentGuide: null,
  remoteGuides: []
}

export type GuideAction =
  | FetchGuideAction
  | SetGuideAction
  | GotoSlideAction
  | UpdateGuideAction
  | AddRemoteGuideAction

export interface SetGuideAction {
  type: typeof SET_GUIDE
  guide: Guide | null
}

export interface GotoSlideAction {
  type: typeof GOTO_SLIDE
  slideIndex: number
}

export interface FetchGuideAction {
  type: typeof FETCH_GUIDE
  identifier: string
}

export interface UpdateGuideAction {
  type: typeof UPDATE_REMOTE_GUIDES
  updatedGuides: RemoteGuide[]
}
interface AddRemoteGuideAction {
  type: typeof ADD_REMOTE_GUIDE
  guide: RemoteGuide
}

export const fetchRemoteGuideEpic: Epic<
  FetchGuideAction | SetGuideAction | OpenSidebarAction | AddRemoteGuideAction,
  GlobalState
> = (action$, store$) =>
  action$.filter(isOfType(FETCH_GUIDE)).flatMap(action => {
    const initialSlide = tryGetRemoteInitialSlideFromUrl(action.identifier)
    return Observable.fromPromise(
      resolveGuide(action.identifier, store$.getState())
    ).mergeMap(({ title, identifier, slides, isError }) => {
      const guide: RemoteGuide = {
        currentSlide: initialSlide,
        title,
        identifier
      }

      const streamActions: Array<
        SetGuideAction | OpenSidebarAction | AddRemoteGuideAction
      > = [setCurrentGuide({ ...guide, slides }), open('guides')]
      // To keep Redux store as small as possible, we don't save slides into it
      if (!isError) streamActions.push(addRemoteGuide(guide))
      return streamActions
    })
  })

export default function reducer(
  state = initialState,
  action: GuideAction
): GuideState {
  switch (action.type) {
    case SET_GUIDE:
      return { ...state, currentGuide: action.guide }
    case GOTO_SLIDE:
      if (state.currentGuide === null) {
        return state
      } else {
        return {
          ...state,
          currentGuide: {
            ...state.currentGuide,
            currentSlide: action.slideIndex
          }
        }
      }
    case UPDATE_REMOTE_GUIDES:
      return { ...state, remoteGuides: action.updatedGuides }

    case ADD_REMOTE_GUIDE:
      if (
        !!state.remoteGuides.find(
          remoteGuide => remoteGuide.identifier === action.guide.identifier
        ) ||
        isBuiltInGuide(action.guide.identifier)
      ) {
        return state
      } else {
        return {
          ...state,
          remoteGuides: state.remoteGuides.concat(action.guide)
        }
      }

    default:
      return state
  }
}

export function updateRemoteGuides(
  updatedGuides: RemoteGuide[]
): UpdateGuideAction {
  return { type: UPDATE_REMOTE_GUIDES, updatedGuides }
}

export function clearRemoteGuides(): UpdateGuideAction {
  return updateRemoteGuides([])
}

function addRemoteGuide(guide: RemoteGuide): AddRemoteGuideAction {
  return { type: ADD_REMOTE_GUIDE, guide }
}

export function fetchRemoteGuide(identifier: string): FetchGuideAction {
  return { type: FETCH_GUIDE, identifier }
}

export function setCurrentGuide(guide: Guide): SetGuideAction {
  return { type: SET_GUIDE, guide }
}

export function resetGuide(): SetGuideAction {
  return { type: SET_GUIDE, guide: null }
}

export function gotoSlide(slideIndex: number): GotoSlideAction {
  return { type: GOTO_SLIDE, slideIndex }
}
