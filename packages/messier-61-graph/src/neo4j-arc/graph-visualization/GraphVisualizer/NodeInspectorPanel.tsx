// Copyright 2023 Paion Data. All rights reserved.
import React, { Component } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '../../common'

import {
  DefaultDetailsPane,
  DetailsPaneProps
} from './DefaultPanelContent/DefaultDetailsPane'
import { NodeInspectorDrawer } from './NodeInspectorDrawer'
import DefaultOverviewPane, {
  OverviewPaneProps
} from './DefaultPanelContent/DefaultOverviewPane'
import {
  PaneContainer,
  StyledNodeInspectorTopMenuChevron,
  panelMinWidth
} from './styled'
import { Resizable } from 're-resizable'
import { GraphStats } from '../utils/mapper'
import { GraphStyleModel } from '../models/GraphStyle'
import { VizItem } from '../types'

interface NodeInspectorPanelProps {
  expanded: boolean
  graphStyle: GraphStyleModel
  hasTruncatedFields: boolean
  hoveredItem: VizItem
  selectedItem: VizItem
  setWidth: (width: number) => void
  stats: GraphStats
  toggleExpanded: () => void
  width: number
  DetailsPaneOverride?: React.FC<DetailsPaneProps>
  OverviewPaneOverride?: React.FC<OverviewPaneProps>
}

export const defaultPanelWidth = (): number =>
  Math.max(window.innerWidth / 5, panelMinWidth)
export class NodeInspectorPanel extends Component<NodeInspectorPanelProps> {
  render(): JSX.Element {
    const {
      expanded,
      graphStyle,
      hasTruncatedFields,
      hoveredItem,
      selectedItem,
      setWidth,
      stats,
      toggleExpanded,
      width,
      DetailsPaneOverride,
      OverviewPaneOverride
    } = this.props
    const relevantItems = ['node', 'relationship']
    const hoveringNodeOrRelationship =
      hoveredItem && relevantItems.includes(hoveredItem.type)
    const shownEl = hoveringNodeOrRelationship ? hoveredItem : selectedItem
    const DetailsPane =
      DetailsPaneOverride !== undefined
        ? DetailsPaneOverride
        : DefaultDetailsPane
    const OverviewPane =
      OverviewPaneOverride !== undefined
        ? OverviewPaneOverride
        : DefaultOverviewPane

    return (
      <>
        <StyledNodeInspectorTopMenuChevron
          aria-label={
            expanded
              ? 'Collapse the node properties display'
              : 'Expand the node properties display'
          }
          expanded={expanded}
          onClick={toggleExpanded}
          title={
            expanded
              ? 'Collapse the node properties display'
              : 'Expand the node properties display'
          }
        >
          {expanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </StyledNodeInspectorTopMenuChevron>

        <NodeInspectorDrawer width={width} isOpen={expanded}>
          <Resizable
            size={{
              width: width,
              height: '100%'
            }}
            onResize={(_e, _direction, ref, _d) => {
              const width = Number.parseInt(ref.style.width.slice(0, -2))
              setWidth(width)
            }}
            data-testid="vizInspector"
          >
            <PaneContainer paneWidth={width}>
              {shownEl.type === 'node' || shownEl.type === 'relationship' ? (
                <DetailsPane
                  vizItem={shownEl}
                  graphStyle={graphStyle}
                  nodeInspectorWidth={width}
                />
              ) : (
                <OverviewPane
                  graphStyle={graphStyle}
                  hasTruncatedFields={hasTruncatedFields}
                  stats={stats}
                  nodeCount={
                    shownEl.type === 'canvas' ? shownEl.item.nodeCount : null
                  }
                  relationshipCount={
                    shownEl.type === 'canvas'
                      ? shownEl.item.relationshipCount
                      : null
                  }
                  infoMessage={
                    shownEl.type === 'status-item' ? shownEl.item : null
                  }
                />
              )}
            </PaneContainer>
          </Resizable>
        </NodeInspectorDrawer>
      </>
    )
  }
}
