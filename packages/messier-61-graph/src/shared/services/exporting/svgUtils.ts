// Copyright 2023 Paion Data. All rights reserved.
import { select as d3Select } from 'd3-selection'

export const prepareForExport = (
  svgElement: SVGElement,
  graphElement: any,
  type: any
) => {
  const dimensions = getSvgDimensions(graphElement)
  let svg = d3Select(
    document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  )

  svg.append('title').text('Neo4j Graph Visualization')
  svg.append('desc').text('Created using Neo4j (http://www.neo4j.com/)')

  switch (type) {
    case 'plan': {
      svg = appendPlanLayers(svgElement, svg)
      break
    }
    case 'graph':
    default:
      svg = appendGraphLayers(svgElement, svg)
  }

  svg.selectAll('.overlay, .ring').remove()
  svg.selectAll('.context-menu-item').remove()
  svg
    .selectAll('text')
    .attr('font-family', 'Helvetica Neue, Helvetica, Arial, sans-serif')

  svg.attr('width', dimensions.width)
  svg.attr('height', dimensions.height)
  svg.attr('viewBox', dimensions.viewBox)

  return svg
}

const getSvgDimensions = (view: any) => {
  const boundingBox = view.boundingBox()
  const dimensions = {
    width: boundingBox.width,
    height: boundingBox.height,
    viewBox: [
      boundingBox.x,
      boundingBox.y,
      boundingBox.width,
      boundingBox.height
    ].join(' ')
  }
  return dimensions
}

const appendGraphLayers = (svgElement: SVGElement, svg: any) => {
  d3Select(svgElement)
    .selectAll('g.layer')
    .each(function () {
      svg.node().appendChild(
        d3Select<SVGGElement, unknown>(this as SVGGElement)
          .node()
          ?.cloneNode(true)
      )
    })
  return svg
}
const appendPlanLayers = (svgElement: SVGElement, svg: any) => {
  d3Select(svgElement)
    .selectAll('g.layer')
    .each(function () {
      svg.node().appendChild(
        d3Select<SVGGElement, unknown>(this as SVGGElement)
          .node()
          ?.cloneNode(true)
      )
    })
  return svg
}
