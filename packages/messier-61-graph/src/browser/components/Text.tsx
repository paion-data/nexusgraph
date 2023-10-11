// Copyright 2023 Paion Data. All rights reserved.
import styled from 'styled-components'

export const Lead = styled.p`
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  font-family: ${props => props.theme.primaryFontFamily};
  color: ${props => props.theme.headerText};
`
