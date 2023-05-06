// Copyright 2023 Paion Data. All rights reserved.
import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  font-family: ${props => props.theme.primaryFontFamily};
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
`

export const StyledApp = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

export const StyledBody = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  height: inherit;
`

export const StyledMainWrapper = styled.div`
  flex: auto;
  overflow: auto;
  padding: 0;
  height: auto;
  width: 0;
  background-color: ${props => props.theme.streamBackgroundColor};
  color: ${props => props.theme.primaryText};
`
