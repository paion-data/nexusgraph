// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import { TrialStatus } from 'shared/modules/dbMeta/dbMetaDuck'

import Main from './Main'

const mockStore = configureMockStore()
const store = mockStore({})

jest.mock(
  '../Editor/MainEditor',
  () =>
    function EmptyDiv() {
      return <div />
    }
)
jest.mock(
  '../Stream/Stream',
  () =>
    function EmptyDiv() {
      return <div />
    }
)
jest.mock(
  '../Stream/auto-exec-button',
  () =>
    function EmptyDiv() {
      return <div />
    }
)
const useDb = 'some database'
const noOp = () => undefined
const mainBaseProps = {
  useDb,
  store,
  connectionState: 2,
  lastConnectionUpdate: 0,
  showUdcConsentBanner: false,
  dismissConsentBanner: noOp,
  incrementConsentBannerShownCount: noOp,
  openSettingsDrawer: noOp
}

describe('<Main />', () => {
  it('should display an ErrorBanner when useDb is unavailable', () => {
    const { queryByText } = render(
      <Main
        {...mainBaseProps}
        isDatabaseUnavailable={true}
        trialStatus={{ status: 'unknown' }}
      />
    )

    expect(
      queryByText(`Database '${useDb}' is unavailable.`, { exact: false })
    ).toBeTruthy()
  })

  it('should not show Errorbanner before we have a useDb', () => {
    const { queryByText } = render(
      <Main
        {...mainBaseProps}
        useDb={null}
        isDatabaseUnavailable={true}
        trialStatus={{ status: 'unknown' }}
      />
    )

    expect(
      queryByText(`Database '${useDb}' is unavailable.`, { exact: false })
    ).toBeFalsy()
  })

  it('should show Errorbanner if trial expired', () => {
    const { queryByText } = render(
      <Main
        {...mainBaseProps}
        useDb={null}
        isDatabaseUnavailable={true}
        trialStatus={{ status: 'expired', totalDays: 120 }}
      />
    )

    expect(
      queryByText(
        `Thank you for installing Neo4j. This is a time limited trial, and the 120 days have expired. Please contact us at `,
        { exact: false }
      )
    ).toBeTruthy()
  })

  it('should not show Errorbanner if trial accepted', () => {
    const { queryByText } = render(
      <Main
        {...mainBaseProps}
        useDb={null}
        isDatabaseUnavailable={true}
        trialStatus={{ status: 'accepted' }}
      />
    )

    expect(
      queryByText(
        `Thank you for installing Neo4j. This is a time limited trial, and the 120 days have expired. Please contact us at`,
        { exact: false }
      )
    ).toBeFalsy()
  })

  it('should show WarningBanner if trial active', () => {
    const { queryByText } = render(
      <Main
        {...mainBaseProps}
        useDb={null}
        isDatabaseUnavailable={true}
        trialStatus={{ status: 'eval', daysRemaining: 19, totalDays: 30 }}
      />
    )

    expect(
      queryByText(
        `Thank you for installing Neo4j. This is a time limited trial. You have 19 days remaining out of 30 days. Please contact us at`,
        { exact: false }
      )
    ).toBeTruthy()
  })
})
