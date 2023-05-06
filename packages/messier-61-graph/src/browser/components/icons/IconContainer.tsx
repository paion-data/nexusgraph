// Copyright 2023 Paion Data. All rights reserved.
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
