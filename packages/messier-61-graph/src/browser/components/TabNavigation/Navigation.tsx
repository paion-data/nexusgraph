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
import React, { Component, TransitionEvent } from 'react'

import {
  StyledBottomNav,
  StyledDrawer,
  StyledSidebar,
  StyledTabsWrapper,
  StyledTopNav
} from './styled'
import {
  NavigationButtonContainer,
  StyledCannyBadgeAnchor,
  StyledNavigationButton
} from 'browser-components/buttons'
import { GUIDE_DRAWER_ID } from 'shared/modules/sidebar/sidebarDuck'
import { Resizable } from 're-resizable'

export const LARGE_DRAWER_WIDTH = 500
export const STANDARD_DRAWER_WIDTH = 300

const Closing = 'CLOSING'
const Closed = 'CLOSED'
const Open = 'OPEN'
const Opening = 'OPENING'
type DrawerTransitionState =
  | typeof Closing
  | typeof Closed
  | typeof Open
  | typeof Opening

export interface NavItem {
  name: string
  title: string
  icon: (isOpen: boolean) => JSX.Element
  content: any
  enableCannyBadge?: boolean
}

interface NavigationProps {
  selectedDrawerName: string | null
  onNavClick: (name: string) => void
  topNavItems: NavItem[]
  bottomNavItems?: NavItem[]
}

interface NavigationState {
  transitionState: DrawerTransitionState
  closingDrawerName: string | null
  guideWidth: number
  isResizing: boolean
}

class Navigation extends Component<NavigationProps, NavigationState> {
  state: NavigationState = {
    transitionState: this.props.selectedDrawerName ? Open : Closed,
    closingDrawerName: null,
    guideWidth: LARGE_DRAWER_WIDTH,
    isResizing: false
  }

  componentDidUpdate(
    prevProps: NavigationProps,
    prevState: NavigationState
  ): void {
    let closingDrawerName: string | null = null
    let newTransitionState: DrawerTransitionState = prevState.transitionState
    if (prevProps.selectedDrawerName !== this.props.selectedDrawerName) {
      if (this.props.selectedDrawerName) {
        if (
          prevState.transitionState === Closed ||
          prevState.transitionState === Closing
        ) {
          newTransitionState = Opening
          closingDrawerName = null
        }
      } else {
        if (
          prevState.transitionState === Open ||
          prevState.transitionState === Opening
        ) {
          newTransitionState = Closing
          closingDrawerName = prevProps.selectedDrawerName
        }
      }
      this.setState({
        transitionState: newTransitionState,
        closingDrawerName: closingDrawerName
      })
    }
  }

  onTransitionEnd = (event: TransitionEvent<HTMLDivElement>): void => {
    if (event.propertyName !== 'width') {
      return
    }

    if (this.state.transitionState === Closing) {
      this.setState({
        transitionState: Closed
      })
    }
    if (this.state.transitionState === Opening) {
      this.setState({
        transitionState: Open
      })
    }
  }

  render(): JSX.Element {
    const { onNavClick, topNavItems, bottomNavItems = [] } = this.props

    const buildNavList = (
      list: NavItem[],
      selectedDrawerName?: null | string
    ) =>
      list.map(item => {
        const isOpen = item.name.toLowerCase() === selectedDrawerName
        return (
          <div key={item.name}>
            {item.enableCannyBadge ? (
              <StyledCannyBadgeAnchor
                data-testid={`navigationCanny${item.name}`}
                data-canny-changelog
              />
            ) : null}
            <NavigationButtonContainer
              title={item.title}
              data-testid={`navigation${item.name}`}
              onClick={() => onNavClick(item.name.toLowerCase())}
              isOpen={isOpen}
            >
              <StyledNavigationButton name={item.name}>
                {item.icon(isOpen)}
              </StyledNavigationButton>
            </NavigationButtonContainer>
          </div>
        )
      })

    const getContentToShow = (selectedDrawerName?: null | string) => {
      if (selectedDrawerName) {
        const filteredList = topNavItems
          .concat(bottomNavItems)
          .filter(item => item.name.toLowerCase() === selectedDrawerName)
        const TabContent = filteredList[0].content
        return <TabContent />
      }
      return null
    }
    const topNavItemsList = buildNavList(
      topNavItems,
      this.props.selectedDrawerName
    )
    const bottomNavItemsList = buildNavList(
      bottomNavItems,
      this.props.selectedDrawerName
    )

    const drawerIsVisible = this.state.transitionState !== Closed

    const guideDrawerSelected =
      this.props.selectedDrawerName === GUIDE_DRAWER_ID
    const drawerWidth = guideDrawerSelected
      ? this.state.guideWidth
      : STANDARD_DRAWER_WIDTH
    const isOpenOrOpening =
      this.state.transitionState === Open ||
      this.state.transitionState === Opening
    const width = isOpenOrOpening ? drawerWidth : 0

    return (
      <StyledSidebar>
        <StyledTabsWrapper>
          <StyledTopNav>{topNavItemsList}</StyledTopNav>
          <StyledBottomNav>{bottomNavItemsList}</StyledBottomNav>
        </StyledTabsWrapper>

        <StyledDrawer
          onTransitionEnd={this.onTransitionEnd}
          style={{
            width: this.state.isResizing ? 'unset' : width
          }}
        >
          <Resizable
            minWidth={guideDrawerSelected ? STANDARD_DRAWER_WIDTH : 0}
            maxWidth={'70vw'}
            size={{ width: width, height: '100%' }}
            onResizeStart={() => {
              this.setState({ isResizing: true })
            }}
            onResizeStop={(_e, _direction, _ref, d) => {
              this.setState({
                guideWidth: this.state.guideWidth + d.width,
                isResizing: false
              })
            }}
            enable={{
              top: false,
              right: guideDrawerSelected,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false
            }}
            style={{ zIndex: 100 }}
          >
            {drawerIsVisible &&
              getContentToShow(
                this.props.selectedDrawerName || this.state.closingDrawerName
              )}
          </Resizable>
        </StyledDrawer>
      </StyledSidebar>
    )
  }
}

export default Navigation
