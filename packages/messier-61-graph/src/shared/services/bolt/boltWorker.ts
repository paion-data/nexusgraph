// Copyright 2023 Paion Data. All rights reserved.

/* eslint-env serviceworker */
import 'core-js/stable'

import { handleBoltWorkerMessage } from './handleBoltWorkerMessage'

declare const self: ServiceWorker
self.addEventListener(
  'message',
  handleBoltWorkerMessage(self.postMessage) as any
)
