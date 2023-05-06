// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

// The reason we have this file is to define classnames
// used in our templates and externally defined guides
import styles from './style.less'
import { StyledSidebarSlide, StyledSlide } from './styled'

type SlideBaseProps = {
  children?: React.ReactNode
  content?: JSX.Element
  html?: string
}

type SlideProps = SlideBaseProps & {
  isSidebarSlide?: boolean
}

const Slide = React.forwardRef(
  (
    { children, content, html, isSidebarSlide }: SlideProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const SlideComponent = isSidebarSlide ? StyledSidebarSlide : StyledSlide

    if (children) {
      return (
        <SlideComponent ref={ref} className={styles.slide}>
          {children}
        </SlideComponent>
      )
    }

    if (content) {
      return (
        <SlideComponent ref={ref} className={styles.slide}>
          {content}
        </SlideComponent>
      )
    }

    if (html) {
      return (
        <SlideComponent
          ref={ref}
          className={styles.slide}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }

    return null
  }
)

Slide.displayName = 'Slide'

export default Slide

const SidebarSlide = React.forwardRef(
  (props: SlideBaseProps, ref: React.Ref<HTMLDivElement>) => (
    <Slide ref={ref} isSidebarSlide {...props} />
  )
)

// We want to migrate our built in sidebar guides to be generated ASCII doc, but until
// then we'll need to add some extra padding this way instead
const BuiltInGuideSidebarSlide = (props: {
  children: React.ReactNode
}): JSX.Element => (
  <StyledSidebarSlide className={styles.slide} style={{ padding: '0 15px' }}>
    {props.children}
  </StyledSidebarSlide>
)

SidebarSlide.displayName = 'SidebarSlide'

export { SidebarSlide, BuiltInGuideSidebarSlide }
