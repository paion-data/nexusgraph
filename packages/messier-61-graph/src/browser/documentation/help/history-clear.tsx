// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const title = 'History clear'
const subtitle = 'Clears commands from history'
const category = 'browserUiCommands'
const content = (
  <>
    <p>
      The <code>:history clear</code> command will remove all previously
      executed commands from Neo4j Browser history
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Related:</th>
          <td>
            <a help-topic="history">:help history</a>
            <a help-topic="help">:help help</a>
            <a help-topic="commands">:help commands</a>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content }
