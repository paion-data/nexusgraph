// Copyright 2023 Paion Data. All rights reserved.

export const splitMdSlides = (md = '') => md.split(/\r?\n---\r?\n/)
export const splitMdRows = (md = '') => md.split('-| - |-')
export const splitMdColumns = (md = '') => md.split('-| | |-')
