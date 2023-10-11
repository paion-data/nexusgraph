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
import styled from 'styled-components'

export const StyledFileDrop = styled.div``

export const StyledFileDropInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;

  .has-file-hovering & {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    z-index: 100;
  }

  .has-user-select & {
    pointer-events: all;
  }
`

export const StyledFileDropContent = styled.div`
  position: relative;
`

export const StyledFileDropActions = styled.div`
  display: block;
  visibility: hidden;
  position: absolute;
  left: 50%;
  top: calc(100% + 1rem);
  transform: translateX(-50%);
  width: 100vw;
  text-align: center;
  pointer-events: none;

  .has-user-select & {
    visibility: visible;
    pointer-events: all;
  }
`

export const StyledFileDropActionButton = styled.button`
  border: 0;
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  padding: 5px 10px;
  font-weight: 600;
  margin: 0 5px;
`
