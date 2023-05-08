import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'

import InputEnterStepping from './InputEnterStepping'

test('focuses correctly and submits on enter in last input', async () => {
  // Given
  const myFn = jest.fn()

  // When
  const { container, getByDisplayValue } = render(
    <InputEnterStepping
      submitAction={myFn}
      render={({ getInputPropsForIndex, setRefForIndex }: any) => {
        return (
          <>
            <input
              {...getInputPropsForIndex(0, {
                initialFocus: true,
                defaultValue: 'first',
                ref: (ref: any) => setRefForIndex(0, ref)
              })}
            />
            <input
              {...getInputPropsForIndex(1, {
                defaultValue: 'second',
                ref: (ref: any) => setRefForIndex(1, ref)
              })}
            />
          </>
        )
      }}
    />
  )

  // Need to wait for the focus to get there, since it's set by setTimeout
  await waitFor(() =>
    expect(document.activeElement).toEqual(getByDisplayValue('first'))
  )

  // When
  // Enter in first should focus second
  fireEvent.keyDown(getByDisplayValue('first'), {
    key: 'Enter',
    keyCode: 13,
    which: 13
  })

  // Then
  expect(document.activeElement).toEqual(getByDisplayValue('second'))
  expect(myFn).toHaveBeenCalledTimes(0)

  // When
  // Enter in last should submit
  fireEvent.keyDown(getByDisplayValue('second'), {
    key: 'Enter',
    keyCode: 13,
    which: 13
  })

  // Then
  expect(document.activeElement).toEqual(getByDisplayValue('second'))
  expect(myFn).toHaveBeenCalledTimes(1)
})

test('submits on button click', async () => {
  // Given
  const myFn = jest.fn()

  // When
  const { container, getByText } = render(
    <InputEnterStepping
      submitAction={myFn}
      render={({
        getInputPropsForIndex,
        getSubmitProps,
        setRefForIndex
      }: any) => {
        return (
          <>
            <input
              {...getInputPropsForIndex(0, {
                defaultValue: 'first',
                ref: (ref: any) => setRefForIndex(0, ref)
              })}
            />
            <input
              {...getInputPropsForIndex(1, {
                defaultValue: 'second',
                ref: (ref: any) => setRefForIndex(1, ref)
              })}
            />
            <button {...getSubmitProps()}>Send</button>
          </>
        )
      }}
    />
  )

  expect(myFn).toHaveBeenCalledTimes(0)

  // When
  // Click button!
  fireEvent.click(getByText('Send'))

  // Then
  expect(myFn).toHaveBeenCalledTimes(1)
})
