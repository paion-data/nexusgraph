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
