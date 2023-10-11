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
import styled from 'styled-components'
import { primaryLightColor } from 'browser-styles/themes'

export const Drawer = styled.div`
  width: 290px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const DrawerHeader = styled.h4`
  color: ${props => props.theme.primaryHeaderText};
  background-color: ${props => props.theme.drawerBackground};
  font-size: 18px;
  height: 73px;
  padding: 25px 0 0 18px;
  position: relative;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 0px;
  font-family: ${props => props.theme.drawerHeaderFontFamily};
`

export const DrawerToppedHeader = styled(DrawerHeader)`
  padding-top: 8px;
`

export const DrawerSubHeader = styled.h5`
  color: ${props => props.theme.primaryHeaderText};
  border-bottom: 1px solid #424650;
  font-size: 14px;
  margin-bottom: 0;
  line-height: 39px;
  position: relative;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 0px;
  font-family: ${props => props.theme.drawerHeaderFontFamily};
`

export const DrawerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const DrawerSectionBody = styled.div`
  font-family: ${props => props.theme.primaryFontFamily};
  font-weight: normal;
  color: #bcc0c9;
`

export const DrawerBody = styled.div`
  padding: 0 24px 12px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const DrawerFooter = styled.div`
  margin-bottom: 20px;
  text-align: center;
`

export const DrawerExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer'
})`
  cursor: pointer;
  text-decoration: none;
  color: ${primaryLightColor};

  &:active {
    text-decoration: none;
  }
`

export const DrawerBrowserCommand = styled.span.attrs({
  className: 'remove-play-icon'
})`
  background-color: #2a2c33;
  border-radius: 2px;
  padding: 3px;

  color: #e36962;
  font-family: Fira Code;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`
