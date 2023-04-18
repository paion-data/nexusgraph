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

import {
  FOCUS_SHORTCUT,
  FULLSCREEN_SHORTCUT,
  printShortcut
} from 'browser/modules/App/keyboardShortcuts'

const title = 'Keys'
const subtitle = 'Keyboard shortcuts'
const category = 'browserUiCommands'
const content = (
  <>
    <table className="table-condensed table-help table-help--keys">
      <tbody>
        <tr>
          <th>Global actions</th>
          <th />
          <th />
        </tr>
        <tr>
          <td>Change focus to editor</td>
          <td>
            <div className="key code">{printShortcut(FOCUS_SHORTCUT)}</div>
          </td>
        </tr>
        <tr>
          <td>Toggle fullscreen editor</td>
          <td>
            <div className="key code">{printShortcut(FULLSCREEN_SHORTCUT)}</div>
          </td>
        </tr>
        <tr>
          <td />
        </tr>
      </tbody>
    </table>

    <p className="padding30">
      You can access the list of all available editor keybindings by pressing{' '}
      <b>F1 </b>in the editor.
    </p>
    <p> Some of them are listed here:</p>

    <table className="table-condensed table-help table-help--keys">
      <thead>
        <tr>
          <th title="Field #1" className="padding30">
            Editor action
          </th>
          <th title="Field #2" className="padding30">
            Windows / Linux
          </th>
          <th title="Field #3" className="padding30">
            Mac
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Execute current command</td>
          <td>Ctrl + Enter</td>
          <td>Cmd + Return</td>
        </tr>

        <tr>
          <td>Previous command in history</td>
          <td>Ctrl + Up Arrow</td>
          <td>Cmd + Up Arrow</td>
        </tr>

        <tr>
          <td>Next command in history</td>
          <td>Ctrl + Up Down</td>
          <td>Cmd + Up Down</td>
        </tr>

        <tr>
          <td>Search</td>
          <td>Ctrl + F</td>
          <td>Cmd + F</td>
        </tr>
        <tr>
          <td>Increase Indent</td>
          <td>Tab</td>
          <td>Tab</td>
        </tr>
        <tr>
          <td>Decrease Indent</td>
          <td>Shift + Tab</td>
          <td>Shift + Tab</td>
        </tr>
        <tr>
          <td>Comment Out</td>
          <td>Ctrl + /</td>
          <td>Cmd + /</td>
        </tr>
        <tr>
          <td>Comment In</td>
          <td>Ctrl + /</td>
          <td>Cmd + /</td>
        </tr>
        <tr>
          <td>Undo</td>
          <td>Ctrl + Z</td>
          <td>Cmd + Z</td>
        </tr>
        <tr>
          <td>Redo</td>
          <td>Ctrl + Y</td>
          <td>Shift + Cmd + Z or Cmd + Y</td>
        </tr>
        <tr>
          <td>Decrease Indent</td>
          <td>Ctrl + [</td>
          <td>Cmd + [</td>
        </tr>
        <tr>
          <td>Increase Indent</td>
          <td>Ctrl + ]</td>
          <td>Cmd + ]</td>
        </tr>
        <tr>
          <td>Move the line down</td>
          <td>Alt + Down</td>
          <td>Option + Down</td>
        </tr>
        <tr>
          <td>Move the line up</td>
          <td>Alt + Up</td>
          <td>Option + Up</td>
        </tr>
        <tr>
          <td>Replace</td>
          <td>Ctrl + F</td>
          <td>Cmd + Alt + F</td>
        </tr>
        <tr>
          <td>Select all</td>
          <td>Ctrl + A</td>
          <td>Cmd + A</td>
        </tr>
        <tr>
          <td>Select downward</td>
          <td>Shift + Down</td>
          <td>Shift + Down</td>
        </tr>
        <tr>
          <td>Select right</td>
          <td>Shift + Right</td>
          <td>Shift + Right</td>
        </tr>
        <tr>
          <td>Select left</td>
          <td>Shift + Left</td>
          <td>Shift + Left</td>
        </tr>
        <tr>
          <td>Select upward</td>
          <td>Shift + Up</td>
          <td>Shift + Up</td>
        </tr>
        <tr>
          <td>Select to the end</td>
          <td>Alt + Shift + Right</td>
          <td>Cmd + Shift + Right</td>
        </tr>
        <tr>
          <td>Select to the start</td>
          <td>Alt + Shift + Left</td>
          <td>Cmd + Shift + Left</td>
        </tr>
        <tr>
          <td>Align text right</td>
          <td>Ctrl + Shift + Right</td>
          <td>Option + Right</td>
        </tr>
        <tr>
          <td>Align text left</td>
          <td>Ctrl + Shift + Left</td>
          <td>Option + Left</td>
        </tr>
        <tr>
          <td>Add multi-cursor above</td>
          <td>Ctrl + Alt + Up</td>
          <td>Cmd + Alt + Up</td>
        </tr>
        <tr>
          <td>Add multi-cursor below</td>
          <td>Ctrl + Alt + Down</td>
          <td>Cmd + Alt + Down</td>
        </tr>
        <tr>
          <td>Add multi-cursor above</td>
          <td>Ctrl + Alt + Shift + Up</td>
          <td>Cmd + Alt + Shift + Up</td>
        </tr>
        <tr>
          <td>Move multi-cursor from current line to the line below</td>
          <td>Ctrl + Alt + Shift + Down</td>
          <td>Cmd + Alt + Shift + Down</td>
        </tr>
      </tbody>
    </table>
    <div className="padding30">
      <h3>Next steps </h3>
      <ul>
        <li>
          <a help-topic="commands">Help commands</a> - Useful Neo4j Browser
          commands
        </li>
        <li>
          <a play-topic="cypher">Play Cypher</a> - Learn Cypher basics
        </li>
      </ul>
    </div>
  </>
)

export default { title, subtitle, category, content }
