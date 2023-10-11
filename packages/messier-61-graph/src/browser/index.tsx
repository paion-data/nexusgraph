// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'
import ReactDOM from 'react-dom'

import AppInit, { setupSentry } from './AppInit'
import './init'

setupSentry()
ReactDOM.render(<AppInit />, document.getElementById('mount'))
