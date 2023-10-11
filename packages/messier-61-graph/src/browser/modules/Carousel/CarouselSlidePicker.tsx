// Copyright 2023 Paion Data. All rights reserved.
import React from 'react'

import {
  CarouselIndicatorActive,
  CarouselIndicatorInactive,
  StyledUl
} from './styled'

const CarouselSlidePicker = ({ slides, visibleSlide, onClickEvent }: any) => {
  if (!slides || slides.length === 0) return null
  const Indicators = slides.map((_: any, i: any) =>
    i !== visibleSlide ? (
      <CarouselIndicatorInactive
        key={i}
        aria-label={i + 1}
        onClick={() => onClickEvent(i)}
      >
        <span />
      </CarouselIndicatorInactive>
    ) : (
      <CarouselIndicatorActive
        key={i}
        aria-label={i + 1}
        onClick={() => onClickEvent(i)}
      >
        <span />
      </CarouselIndicatorActive>
    )
  )
  return <StyledUl>{Indicators}</StyledUl>
}

export default CarouselSlidePicker
