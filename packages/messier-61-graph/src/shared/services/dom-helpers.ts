// Copyright 2023 Paion Data. All rights reserved.

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
