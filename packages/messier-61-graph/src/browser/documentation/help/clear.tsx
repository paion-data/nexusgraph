// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const title = 'Clear'
const subtitle = 'Reset the stream'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <a exec-topic="clear">:clear</a> command will remove all frames from
      the stream.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="help">:help help</a>
            <a help-topic="commands">:help commands</a>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content }
