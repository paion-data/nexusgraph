// Copyright 2023 Paion Data. All rights reserved.
import { render, screen } from '@testing-library/react'
import React from 'react'

import { LabelItems, RelationshipItems } from './MetaItems'

const renderLabelItems = (
  items: string[] = [],
  moreStep = 5,
  totalNumItems: number = items.length
) => {
  return render(
    <LabelItems
      labels={items}
      count={5}
      graphStyleData={''}
      moreStep={moreStep}
      onItemClick={jest.fn()}
      onMoreClick={jest.fn()}
      totalNumItems={totalNumItems}
    />
  )
}

const renderRelationshipItems = (
  items: string[] = [],
  moreStep = 5,
  totalNumItems: number = items.length
) => {
  return render(
    <RelationshipItems
      relationshipTypes={items}
      moreStep={moreStep}
      onItemClick={jest.fn()}
      onMoreClick={jest.fn()}
      totalNumItems={totalNumItems}
      count={5}
      graphStyleData={''}
    />
  )
}

test('LabelItems renders empty', () => {
  const { container } = renderLabelItems([])
  expect(container).toMatchSnapshot()
})
test('LabelItems renders labels', () => {
  const items = ['MyLabel', 'MyLabel2']
  const { container } = renderLabelItems(items)
  expect(container).toMatchSnapshot()
})
test('RelationshipItems renders empty', () => {
  const { container } = renderRelationshipItems([])
  expect(container).toMatchSnapshot()
})
test('RelationshipItems renders relationshipTypes', () => {
  const items = ['MY_TYPE', 'MY_TYPE2']
  const { container } = renderRelationshipItems(items)
  expect(container).toMatchSnapshot()
})
