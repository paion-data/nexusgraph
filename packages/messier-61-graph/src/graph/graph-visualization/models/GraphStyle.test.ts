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
import { GraphStyleModel, Selector } from './GraphStyle'

describe('grass', () => {
  it('can generate a default style', () => {
    // Given
    const grass = new GraphStyleModel()

    // When
    const styleStr = grass.toString()

    // Then
    expect(styleStr).toEqual(
      `node {
  diameter: 50px;
  color: #A5ABB6;
  border-color: #9AA1AC;
  border-width: 2px;
  text-color-internal: #FFFFFF;
  font-size: 10px;
}

relationship {
  color: #A5ABB6;
  shaft-width: 1px;
  font-size: 8px;
  padding: 3px;
  text-color-external: #000000;
  text-color-internal: #FFFFFF;
  caption: '<type>';
}

`
    )
  })
  it('can generate a style for a node with a simple label', () => {
    // Given
    const grass = new GraphStyleModel()
    const node = {
      labels: ['foo']
    }

    // When
    grass.forNode(node)
    const styleStr = grass.toString()

    // Then
    expect(styleStr).toEqual(`node {
  diameter: 50px;
  color: #A5ABB6;
  border-color: #9AA1AC;
  border-width: 2px;
  text-color-internal: #FFFFFF;
  font-size: 10px;
}

relationship {
  color: #A5ABB6;
  shaft-width: 1px;
  font-size: 8px;
  padding: 3px;
  text-color-external: #000000;
  text-color-internal: #FFFFFF;
  caption: '<type>';
}

node.foo {
  color: #C990C0;
  border-color: #b261a5;
  text-color-internal: #FFFFFF;
  defaultCaption: <id>;
}

`)
  })
  it('can generate a style for a node with a label with a dot', () => {
    // Given
    const grass = new GraphStyleModel()
    const node = {
      labels: ['foo.bar']
    }

    // When
    grass.forNode(node)
    const styleStr = grass.toString()

    // Then
    expect(styleStr).toEqual(`node {
  diameter: 50px;
  color: #A5ABB6;
  border-color: #9AA1AC;
  border-width: 2px;
  text-color-internal: #FFFFFF;
  font-size: 10px;
}

relationship {
  color: #A5ABB6;
  shaft-width: 1px;
  font-size: 8px;
  padding: 3px;
  text-color-external: #000000;
  text-color-internal: #FFFFFF;
  caption: '<type>';
}

node.foo\\.bar {
  color: #C990C0;
  border-color: #b261a5;
  text-color-internal: #FFFFFF;
  defaultCaption: <id>;
}

`)
  })
  it('can generate a style for a relationship with a type with a dot', () => {
    // Given
    const grass = new GraphStyleModel()

    // When
    grass.loadRules()
    const selector = new Selector('relationship', ['REL.TYPE'])
    grass.changeForSelector(selector, {
      caption: 'yo'
    })
    // grass.forRelationship(rel)
    const styleStr = grass.toString()

    // Then
    expect(styleStr).toEqual(`node {
  diameter: 50px;
  color: #A5ABB6;
  border-color: #9AA1AC;
  border-width: 2px;
  text-color-internal: #FFFFFF;
  font-size: 10px;
}

relationship {
  color: #A5ABB6;
  shaft-width: 1px;
  font-size: 8px;
  padding: 3px;
  text-color-external: #000000;
  text-color-internal: #FFFFFF;
  caption: '<type>';
}

relationship.REL\\.TYPE {
  caption: 'yo';
}

`)
  })
})
