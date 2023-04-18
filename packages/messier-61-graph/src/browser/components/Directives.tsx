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
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { v4 } from 'uuid'

import {
  commandSources,
  executeCommand
} from 'shared/modules/commands/commandsDuck'
import * as editor from 'shared/modules/editor/editorDuck'
import { addClass, prependIcon } from 'shared/services/dom-helpers'

const directives = [
  {
    selector: '[data-exec]',
    valueExtractor: (elem: any) => {
      // we prepend the : to only autoexec browser commands and not cypher
      return `:${elem.getAttribute('data-exec')}`
    },
    autoExec: true
  },
  {
    selector: '[data-populate]',
    valueExtractor: (elem: any) => {
      return `${elem.getAttribute('data-populate')}`
    },
    autoExec: false
  },
  {
    selector: '[exec-topic]',
    valueExtractor: (elem: any) => {
      return `:${elem.getAttribute('exec-topic')}`
    },
    autoExec: true
  },
  {
    selector: '[play-topic]',
    valueExtractor: (elem: any) => {
      return `:play ${elem.getAttribute('play-topic')}`
    },
    autoExec: true
  },
  {
    selector: '[server-topic]',
    valueExtractor: (elem: any) => {
      return `:server ${elem.getAttribute('server-topic')}`
    },
    autoExec: true
  },
  {
    selector: '[help-topic]',
    valueExtractor: (elem: any) => {
      return `:help ${elem.getAttribute('help-topic')}`
    },
    autoExec: true
  },
  {
    selector: '.runnable pre',
    valueExtractor: (elem: any) => {
      return elem.textContent.trim()
    },
    autoExec: false
  },
  {
    selector: 'pre.runnable',
    valueExtractor: (elem: any) => {
      return elem.textContent.trim()
    },
    autoExec: false
  }
]

const prependPlayIcon = (element: any, onClick: () => void) => {
  prependIcon(element, 'fa fa-play-circle-o', onClick)
}

const bindDynamicInputToTheDom = (element: any) => {
  const valueForElems = element.querySelectorAll('[value-for]')
  const valueKeyElems = element.querySelectorAll('[value-key]')
  if (valueForElems.length > 0 && valueKeyElems.length > 0) {
    valueForElems.forEach((valueForElem: any) => {
      const newArray = [...valueKeyElems]
      const filteredValueKeyElems = newArray.filter(e => {
        return (
          e.getAttribute('value-key') === valueForElem.getAttribute('value-for')
        )
      })
      if (filteredValueKeyElems.length > 0) {
        valueForElem.onkeyup = (event: any) => {
          filteredValueKeyElems.forEach(elm => {
            elm.innerText = event.target.value
          })
        }
      }
    })
  }
}

export const Directives = (props: any) => {
  const callback = (elem: HTMLDivElement | null) => {
    if (elem) {
      directives.forEach(directive => {
        const elems = elem.querySelectorAll<HTMLElement>(directive.selector)
        Array.from(elems).forEach(e => {
          if (
            e.firstChild?.nodeName !== 'I' &&
            !e.classList.contains('remove-play-icon')
          ) {
            prependPlayIcon(e, () => {
              addClass(e, 'clicked')
              props.onItemClick(
                directive.valueExtractor(e),
                true,
                v4() /* new id, new frame */
              )
            })
          }

          e.onclick = () => {
            addClass(e, 'clicked')
            return props.onItemClick(
              directive.valueExtractor(e),
              directive.autoExec,
              props.originFrameId
            )
          }
        })
      })
      bindDynamicInputToTheDom(elem)
    }
  }
  return <div ref={callback}>{props.content}</div>
}

const mapDispatchToProps = (_dispatch: any, ownProps: any) => {
  return {
    onItemClick: (cmd: string, autoExec: boolean, id: string) => {
      if (!cmd.endsWith(' null') && !cmd.endsWith(':null')) {
        // prevent autorunning cypher by prefixing w :auto hack
        if (autoExec && !cmd.startsWith(':auto')) {
          const action = executeCommand(cmd, {
            id,
            source: commandSources.button
          })
          ownProps.bus.send(action.type, action)
        } else {
          ownProps.bus.send(editor.SET_CONTENT, editor.setContent(cmd))
        }
      }
    }
  }
}

export default withBus(connect(null, mapDispatchToProps)(Directives))
