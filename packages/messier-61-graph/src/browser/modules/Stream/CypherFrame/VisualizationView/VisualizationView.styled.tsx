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

import { dim } from 'browser-styles/constants'

export const StyledVisContainer = styled.div<{ isFullscreen: boolean }>`
  width: 100%;
  height: ${props =>
    props.isFullscreen
      ? '100%'
      : dim.frameBodyHeight - dim.frameTitlebarHeight * 2 + 'px'};
  > svg {
    width: 100%;
  }
  > .neod3viz .node .ring {
    fill: none;
    opacity: 0;
    stroke: #6ac6ff;
  }
  > .neod3viz .node.selected .ring {
    stroke: #fdcc59;
  }
  > .neod3viz .node.selected:hover .ring {
    stroke: #6ac6ff;
  }
  > .neod3viz .node:hover .ring,
  > .neod3viz .node.selected .ring {
    opacity: 0.3;
  }
  > .neod3viz .relationship .overlay {
    opacity: 0;
    fill: #6ac6ff;
  }
  > .neod3viz .relationship.selected .overlay {
    fill: #fdcc59;
  }
  > .neod3viz .relationship.selected:hover .overlay {
    fill: #6ac6ff;
  }
  > .neod3viz .relationship:hover .overlay,
  > .neod3viz .relationship.selected .overlay {
    opacity: 0.3;
  }

  > .neod3viz .remove_node,
  .expand_node:hover {
    border: 2px #000 solid;
  }

  > .neod3viz .b-outline,
  .neod3viz .ring,
  .neod3viz .context-menu-item {
    cursor: pointer;
  }

  > .context-menu-item:hover {
    fill: #b9b9b9;
    font-size: 14px;
  }

  > path.context-menu-item {
    stroke-width: 2px;
    fill: #d2d5da;
  }

  > text.context-menu-item {
    fill: #fff;
    text-anchor: middle;
    pointer-events: none;
    font-size: 14px;
  }
`
