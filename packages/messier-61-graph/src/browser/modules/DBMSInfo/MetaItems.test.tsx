// Copyright 2023 Paion Data. All rights reserved.
import { render, screen } from '@testing-library/react'
import React from 'react'

import { LabelItems, PropertyItems, RelationshipItems } from './MetaItems'

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

const renderPropertyItems = (
  items: string[] = [],
  moreStep = 5,
  totalNumItems: number = items.length
) => {
  return render(
    <PropertyItems
      properties={items}
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
test('PropertyItems renders empty', () => {
  const { container } = renderPropertyItems([])
  expect(container).toMatchSnapshot()
})
test('PropertyItems renders properties', () => {
  const items = ['prop1', 'prop2']
  const { container } = renderPropertyItems(items)
  expect(container).toMatchSnapshot()
})
test('PropertyItems with more than step size properties shows "Show all" link', () => {
  const items = Array.from({ length: 6 }).map(
    (_value: any, index: number) => `prop${index}`
  )
  renderPropertyItems(items, 5, 10)
  expect(screen.getByText('Show all')).toBeInTheDocument()
})
