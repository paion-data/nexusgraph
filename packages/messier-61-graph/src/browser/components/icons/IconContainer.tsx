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
import React, { CSSProperties, ReactNode } from 'react'
import SVGInline from 'react-svg-inline'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

const StyledI = styled.i<{
  isOpen?: boolean
  activeStyle?: string | FlattenSimpleInterpolation
  inactiveStyle?: string
}>`
  ${props => (props.isOpen ? props.activeStyle : props.inactiveStyle)};
  &:hover {
    ${props => props.activeStyle};
  }
`

const StyledIconWrapper = ({
  activeStyle,
  inactiveStyle,
  isOpen,
  children,
  ...rest
}: Exclude<
  IconContainerProps,
  'text' | 'fontSize' | 'icon' | 'width' | 'title'
>) => {
  return (
    <StyledI
      isOpen={isOpen}
      activeStyle={activeStyle}
      inactiveStyle={inactiveStyle}
      {...rest}
    >
      {children}
    </StyledI>
  )
}

const StyledText = styled.div`
  font-size: 9px;
  line-height: 10px;
  margin-top: 4px;
  padding: 0;
`

type IconContainerProps = {
  activeStyle?: string | FlattenSimpleInterpolation
  icon?: string
  inactiveStyle?: string
  isOpen?: boolean
  text?: string
  title?: string
  width?: number
  /** controlling size of icons that are fonts */
  fontSize?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const IconContainer = (props: IconContainerProps): JSX.Element => {
  const { text, icon, width, title, fontSize, ...rest } = props

  const currentIcon = icon ? (
    <StyledIconWrapper {...rest}>
      <SVGInline
        className={'centeredSvgIcon'}
        cleanup={['title']}
        svg={icon}
        accessibilityLabel={title}
        width={width ? width + 'px' : undefined}
      />
    </StyledIconWrapper>
  ) : (
    <StyledIconWrapper
      {...rest}
      title={title}
      style={{ fontSize: fontSize, lineHeight: 'inherit' }}
    />
  )

  return text ? (
    <span>
      {currentIcon}
      <StyledText>{text}</StyledText>
    </span>
  ) : (
    currentIcon
  )
}
