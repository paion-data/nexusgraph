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
import { objToCss, parseGrass } from 'services/grassUtils'

describe('parseGrass', () => {
  it('should create an object from a valid CSS string', () => {
    const css = 'body{ color: "red"; border: "1 px solid white";}'

    // When
    const obj = parseGrass(css)

    // Then
    expect(obj.body).toBeDefined()
    expect(obj.body.color).toEqual('red')
    expect(obj.body.border).toEqual('1 px solid white')
  })
  it('should create an object from a valid GraSS string', () => {
    const css =
      'node {caption: "<id>"; stroke: #ffffff;} relationship {caption: "{name}";} node.Person {caption: "{city} {zip}";}'

    // When
    const obj = parseGrass(css)

    // Then
    expect(obj.node).toBeDefined()
    expect(obj.node.caption).toEqual('<id>')
    expect(obj.node.stroke).toEqual('#ffffff')
    expect(obj.relationship).toBeDefined()
    expect(obj.relationship.caption).toEqual('{name}')
    expect(obj['node.Person'].caption).toEqual('{city} {zip}')
  })
})

describe('objToCss', () => {
  const origConsoleError = console.error
  beforeEach(() => {
    console.error = () => {}
  })
  afterEach(() => {
    console.error = origConsoleError
  })
  it('should create CSS from obj', () => {
    const obj = {
      body: {
        color: 'red',
        border: '1px solid green'
      },
      h1: {
        color: '#ffffff'
      }
    }
    const expected = `body {
  color: red;
  border: 1px solid green;
}
h1 {
  color: #ffffff;
}
`

    const css = objToCss(obj)

    expect(css).toEqual(expected)
    console.error = origConsoleError
  })
  it('should create GraSS from obj', () => {
    const origConsoleError = console.error
    console.error = () => {}
    const obj = {
      node: {
        color: 'red',
        border: '1px solid green'
      },
      'node.Person': {
        color: 'green',
        border: '1px solid white',
        caption: '{name}'
      },
      relationship: {
        color: '#ffffff',
        caption: '<id>'
      }
    }
    const expected = `node {
  color: red;
  border: 1px solid green;
}
node.Person {
  color: green;
  border: 1px solid white;
  caption: "{name}";
}
relationship {
  color: #ffffff;
  caption: "<id>";
}
`

    const grass = objToCss(obj)

    expect(grass).toEqual(expected)
    console.error = origConsoleError
  })
  it('does not break on null', () => {
    const obj = null

    const css = objToCss(obj)
    expect(css).toEqual('')
  })
  it('does not break on string', () => {
    const obj = 'no object'

    const css = objToCss(obj)
    expect(css).toEqual(false)
  })
  it('does not break on undefined', () => {
    const css = objToCss()
    expect(css).toEqual(false)
  })
})
