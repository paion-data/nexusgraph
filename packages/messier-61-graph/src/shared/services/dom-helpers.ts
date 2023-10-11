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

const addClass = (node: any, className: any) => {
  if (!(node instanceof HTMLElement && typeof className === 'string')) {
    return
  }

  // normalize node class name
  const nodeClassName = ` ${node.className} `
  if (nodeClassName.indexOf(` ${className} `) === -1) {
    node.className += (node.className ? ' ' : '') + className
  }
}

const prependIcon = (element: any, classname: string, onClick: () => void) => {
  const icon = document.createElement('i')
  addClass(icon, classname)
  icon.setAttribute('style', 'padding-right:4px')
  element.insertBefore(icon, element.firstChild)

  if (onClick) {
    icon.onclick = e => {
      // prevent populating the editor as well
      e.stopPropagation()
      onClick()
    }
  }
}

export { addClass, prependIcon }
