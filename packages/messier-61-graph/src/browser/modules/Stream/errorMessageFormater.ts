// Copyright 2023 Paion Data. All rights reserved.

const error = (title: any) => ({
  title,
  message: title
})

export const errorMessageFormater = (code: any, message?: any) => {
  const title = `${code || code === 0 ? code : ''}${
    code && message ? ': ' : ''
  }${message || ''}`
  return error(title)
}
