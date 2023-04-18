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
import React from 'react'

import {
  BasicNode,
  BasicRelationship,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomToFitIcon
} from '../../../common'

import { GraphModel } from '../../models/Graph'
import {
  GraphEventHandlerModel,
  GraphInteractionCallBack
} from './GraphEventHandlerModel'
import { GraphStyleModel } from '../../models/GraphStyle'
import {
  GetNodeNeighboursFn,
  VizItem,
  ZoomLimitsReached,
  ZoomType
} from '../../types'
import {
  GraphStats,
  createGraph,
  getGraphStats,
  mapRelationships
} from '../../utils/mapper'
import { Visualization } from './visualization/Visualization'
import { WheelZoomInfoOverlay } from './WheelZoomInfoOverlay'
import { StyledSvgWrapper, StyledZoomButton, StyledZoomHolder } from './styled'
import { ResizeObserver } from '@juggle/resize-observer'

export type GraphProps = {
  isFullscreen: boolean
  relationships: BasicRelationship[]
  nodes: BasicNode[]
  getNodeNeighbours: GetNodeNeighboursFn
  onItemMouseOver: (item: VizItem) => void
  onItemSelect: (item: VizItem) => void
  graphStyle: GraphStyleModel
  styleVersion: number
  onGraphModelChange: (stats: GraphStats) => void
  assignVisElement: (svgElement: any, graphElement: any) => void
  autocompleteRelationships: boolean
  getAutoCompleteCallback: (
    callback: (
      internalRelationships: BasicRelationship[],
      initialRun: boolean
    ) => void
  ) => void
  setGraph: (graph: GraphModel) => void
  offset: number
  wheelZoomRequiresModKey?: boolean
  wheelZoomInfoMessageEnabled?: boolean
  disableWheelZoomInfoMessage: () => void
  initialZoomToFit?: boolean
  onGraphInteraction?: GraphInteractionCallBack
}

type GraphState = {
  zoomInLimitReached: boolean
  zoomOutLimitReached: boolean
  displayingWheelZoomInfoMessage: boolean
}

export class Graph extends React.Component<GraphProps, GraphState> {
  svgElement: React.RefObject<SVGSVGElement>
  wrapperElement: React.RefObject<HTMLDivElement>
  wrapperResizeObserver: ResizeObserver
  visualization: Visualization | null = null

  constructor(props: GraphProps) {
    super(props)
    this.state = {
      zoomInLimitReached: false,
      zoomOutLimitReached: false,
      displayingWheelZoomInfoMessage: false
    }
    this.svgElement = React.createRef()
    this.wrapperElement = React.createRef()

    this.wrapperResizeObserver = new ResizeObserver(() => {
      this.visualization?.resize(
        this.props.isFullscreen,
        !!this.props.wheelZoomRequiresModKey
      )
    })
  }

  componentDidMount(): void {
    const {
      assignVisElement,
      autocompleteRelationships,
      getAutoCompleteCallback,
      getNodeNeighbours,
      graphStyle,
      initialZoomToFit,
      isFullscreen,
      nodes,
      onGraphInteraction,
      onGraphModelChange,
      onItemMouseOver,
      onItemSelect,
      relationships,
      setGraph,
      wheelZoomRequiresModKey
    } = this.props

    if (!this.svgElement.current) return

    const measureSize = () => ({
      width: this.svgElement.current?.parentElement?.clientWidth ?? 200,
      height: this.svgElement.current?.parentElement?.clientHeight ?? 200
    })

    const graph = createGraph(nodes, relationships)
    this.visualization = new Visualization(
      this.svgElement.current,
      measureSize,
      this.handleZoomEvent,
      this.handleDisplayZoomWheelInfoMessage,
      graph,
      graphStyle,
      isFullscreen,
      wheelZoomRequiresModKey,
      initialZoomToFit
    )

    const graphEventHandler = new GraphEventHandlerModel(
      graph,
      this.visualization,
      getNodeNeighbours,
      onItemMouseOver,
      onItemSelect,
      onGraphModelChange,
      onGraphInteraction
    )
    graphEventHandler.bindEventHandlers()

    onGraphModelChange(getGraphStats(graph))
    this.visualization.resize(isFullscreen, !!wheelZoomRequiresModKey)

    if (setGraph) {
      setGraph(graph)
    }
    if (autocompleteRelationships) {
      getAutoCompleteCallback(
        (internalRelationships: BasicRelationship[], initialRun: boolean) => {
          if (initialRun) {
            this.visualization?.init()
            graph.addInternalRelationships(
              mapRelationships(internalRelationships, graph)
            )
            onGraphModelChange(getGraphStats(graph))
            this.visualization?.update({
              updateNodes: false,
              updateRelationships: true,
              restartSimulation: false
            })
            this.visualization?.precomputeAndStart()
            graphEventHandler.onItemMouseOut()
          } else {
            graph.addInternalRelationships(
              mapRelationships(internalRelationships, graph)
            )
            onGraphModelChange(getGraphStats(graph))
            this.visualization?.update({
              updateNodes: false,
              updateRelationships: true,
              restartSimulation: false
            })
          }
        }
      )
    } else {
      this.visualization?.init()
      this.visualization?.precomputeAndStart()
    }
    if (assignVisElement) {
      assignVisElement(this.svgElement.current, this.visualization)
    }

    this.wrapperResizeObserver.observe(this.svgElement.current)
  }

  componentDidUpdate(prevProps: GraphProps): void {
    if (this.props.isFullscreen !== prevProps.isFullscreen) {
      this.visualization?.resize(
        this.props.isFullscreen,
        !!this.props.wheelZoomRequiresModKey
      )
    }

    if (this.props.styleVersion !== prevProps.styleVersion) {
      this.visualization?.update({
        updateNodes: true,
        updateRelationships: true,
        restartSimulation: false
      })
    }
  }

  componentWillUnmount(): void {
    this.wrapperResizeObserver.disconnect()
  }

  handleZoomEvent = (limitsReached: ZoomLimitsReached): void => {
    if (
      limitsReached.zoomInLimitReached !== this.state.zoomInLimitReached ||
      limitsReached.zoomOutLimitReached !== this.state.zoomOutLimitReached
    ) {
      this.setState({
        zoomInLimitReached: limitsReached.zoomInLimitReached,
        zoomOutLimitReached: limitsReached.zoomOutLimitReached
      })
    }
  }

  handleDisplayZoomWheelInfoMessage = (): void => {
    if (
      !this.state.displayingWheelZoomInfoMessage &&
      this.props.wheelZoomRequiresModKey &&
      this.props.wheelZoomInfoMessageEnabled
    ) {
      this.displayZoomWheelInfoMessage(true)
    }
  }

  displayZoomWheelInfoMessage = (display: boolean): void => {
    this.setState({ displayingWheelZoomInfoMessage: display })
  }

  zoomInClicked = (): void => {
    this.visualization?.zoomByType(ZoomType.IN)
  }

  zoomOutClicked = (): void => {
    this.visualization?.zoomByType(ZoomType.OUT)
  }

  zoomToFitClicked = (): void => {
    this.visualization?.zoomByType(ZoomType.FIT)
  }

  render(): JSX.Element {
    const {
      offset,
      isFullscreen,
      wheelZoomInfoMessageEnabled,
      disableWheelZoomInfoMessage
    } = this.props
    const {
      zoomInLimitReached,
      zoomOutLimitReached,
      displayingWheelZoomInfoMessage
    } = this.state
    return (
      <StyledSvgWrapper ref={this.wrapperElement}>
        <svg className="neod3viz" ref={this.svgElement} />
        <StyledZoomHolder offset={offset} isFullscreen={isFullscreen}>
          <StyledZoomButton
            aria-label={'zoom-in'}
            className={'zoom-in'}
            disabled={zoomInLimitReached}
            onClick={this.zoomInClicked}
          >
            <ZoomInIcon large={isFullscreen} />
          </StyledZoomButton>
          <StyledZoomButton
            aria-label={'zoom-out'}
            className={'zoom-out'}
            disabled={zoomOutLimitReached}
            onClick={this.zoomOutClicked}
          >
            <ZoomOutIcon large={isFullscreen} />
          </StyledZoomButton>
          <StyledZoomButton
            aria-label={'zoom-to-fit'}
            onClick={this.zoomToFitClicked}
          >
            <ZoomToFitIcon large={isFullscreen} />
          </StyledZoomButton>
        </StyledZoomHolder>
        {wheelZoomInfoMessageEnabled && displayingWheelZoomInfoMessage && (
          <WheelZoomInfoOverlay
            onDisableWheelZoomInfoMessage={disableWheelZoomInfoMessage}
          />
        )}
      </StyledSvgWrapper>
    )
  }
}
