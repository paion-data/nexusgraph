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
import React, { useEffect } from 'react'

import {
  GuideNavButton,
  GuideNavContainer,
  GuideProgressContainer,
  GuideUl,
  StyledCarousel
} from '../Sidebar/styled'
import Pagination from './Pagination'
import Directives from 'browser-components/Directives'

type GuideCarouselProps = {
  slides: JSX.Element[]
  currentSlideIndex: number
  scrollToTop?: () => void
  gotoSlide: (slideIndex: number) => void
}

function GuideCarousel({
  slides,
  currentSlideIndex,
  gotoSlide,
  scrollToTop = () => undefined
}: GuideCarouselProps): JSX.Element {
  const currentSlide = slides[currentSlideIndex]
  const onFirstSlide = currentSlideIndex === 0
  const onLastSlide = currentSlideIndex === slides.length - 1
  function nextSlide() {
    if (!onLastSlide) {
      gotoSlide(currentSlideIndex + 1)
    }
  }

  function prevSlide() {
    if (!onFirstSlide) {
      gotoSlide(currentSlideIndex - 1)
    }
  }

  useEffect(() => {
    // As we progress in the slides, scroll to top
    scrollToTop()
  }, [scrollToTop, currentSlideIndex])

  const moreThanOneSlide = slides.length > 1

  return (
    <StyledCarousel className="disable-font-ligatures">
      <Directives content={currentSlide} />
      {moreThanOneSlide && (
        <GuideNavContainer>
          <GuideNavButton
            onClick={prevSlide}
            disabled={onFirstSlide}
            data-testid="guidePreviousSlide"
          >
            Previous
          </GuideNavButton>
          <GuideUl>
            <GuideProgressContainer>
              <Pagination
                gotoIndex={gotoSlide}
                itemCount={slides.length}
                selectedIndex={currentSlideIndex}
              />
            </GuideProgressContainer>
          </GuideUl>
          <GuideNavButton
            onClick={nextSlide}
            disabled={onLastSlide}
            data-testid="guideNextSlide"
          >
            Next
          </GuideNavButton>
        </GuideNavContainer>
      )}
    </StyledCarousel>
  )
}

export default GuideCarousel
