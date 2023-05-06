// Copyright 2023 Paion Data. All rights reserved.
import { render } from '@testing-library/react'
import React from 'react'

import { SysInfoDisplay } from './SysInfoDisplay'

describe('sysinfo component', () => {
  test('should render cluster table', () => {
    // Given
    const props = { isOnCluster: true, isConnected: true }

    // When
    const { getByText, container } = render(<SysInfoDisplay {...props} />)

    // Then
    expect(getByText('Cluster Members')).not.toBeNull()
    expect(
      container.querySelector('[data-testid="sysinfo-cluster-members-title"]')
    ).not.toBeNull()
  })
  test('should not render cluster table', () => {
    // Given
    const props = { isOnCluster: false, isConnected: true }

    // When
    const { queryByTestId } = render(<SysInfoDisplay {...props} />)

    // Then
    expect(queryByTestId('sysinfo-cluster-members-title')).toBeNull()
  })
})
