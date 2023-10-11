// Copyright 2023 Paion Data. All rights reserved.
import styled from 'styled-components'

export const StyledSidebar = styled.div`
  flex: 0 0 auto;
  background-color: #4d4a57;
  display: flex;
  flex-direction: row;
  color: #fff;
`
export const StyledDrawer = styled.div`
  height: 100%;
  flex: 0 0 auto;
  background-color: #31333b;
  overflow-x: hidden;
  overflow-y: auto;
  transition: 0.2s ease-out;
  z-index: 1;
`

export const StyledTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTabList = styled.ul`
  margin: 0;
  padding: 0;
`

export const StyledTopNav = styled(StyledTabList)`
  align-self: flex-start;
  & > li {
    border-bottom: transparent;
  }
`
export const StyledBottomNav = styled(StyledTabList)`
  align-self: flex-end;
  margin-top: auto;
  & > li {
    border-top: transparent;
  }
`
