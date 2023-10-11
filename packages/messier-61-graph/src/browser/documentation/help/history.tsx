// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const title = 'History'
const subtitle = 'Show command history'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <a exec-topic="history">:history</a> command will display your most
      recent executed commands.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="history clear">:help history clear</a>
            <a help-topic="help">:help help</a>
            <a help-topic="commands">:help commands</a>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content }
