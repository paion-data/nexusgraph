// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

const title = 'Play'
const subtitle = 'Display a mini-deck'
const category = 'browserUiCommands'
const filter = ['play']
const description = (
  <>
    <p>
      The <code>:play</code> command loads a mini-deck with either guide
      material or sample data.
    </p>
    <table className="table-condensed table-help">
      <tbody>
        <tr>
          <th>Usage:</th>
          <td>
            <code>{':play <guide | url>'}</code>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export default { title, subtitle, category, content: null, description, filter }
