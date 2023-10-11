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
import styled, { keyframes } from 'styled-components'

import { StyledCodeBlock } from '../ClickToCode/styled'

const grow = (height: any) => {
  return keyframes`
    0% {
      max-height: 0px;
    }
    100% {
      max-height: ${height};
    }
  `
}

export const StyledMain = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
  height: 100vh;
`

const Banner = styled.div`
  line-height: 49px;
  min-height: 49px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
  padding: 0 24px;
  overflow: hidden;
  animation: ${grow('49px')} 0.3s ease-in;
  flex: 0 0 49px;
  box-shadow: ${props => props.theme.standardShadow};
`

export const ErrorBanner = styled(Banner)`
  background-color: ${props => props.theme.error};
`
export const WarningBanner = styled(Banner)`
  background-color: ${props => props.theme.warning};
`
export const NotAuthedBanner = styled(Banner)`
  background-color: ${props => props.theme.auth};
`

export const UdcConsentBanner = styled(Banner)`
  background-color: ${props => props.theme.auth};
  display: flex;
  justify-content: space-between;
`
export const DismissBanner = styled.span`
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: '\\00d7';
    font-size: 1.4rem;
  }
`
export const UnderlineClickable = styled.span`
  &:hover {
    cursor: pointer;
  }
  text-decoration: underline;
`

export const StyledCodeBlockFrame = styled(StyledCodeBlock)`
  white-space: nowrap;
  overflow: hidden;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
  cursor: pointer;
`
