// Copyright 2023 Paion Data. All rights reserved.
import { select as d3Select } from "d3-selection";

/**
 * Preparations before exporting graph
 *
 * @param svgElement SvgElement of visElement
 * @param graphElement GraphElement of visElement
 * @param type Type of visElement
 *
 * @returns Svg object
 */
export const prepareForExport = (svgElement: SVGElement, graphElement: any, type: any) => {
  const dimensions = getSvgDimensions(graphElement);
  let svg = d3Select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
  svg.append("title").text("Nexus Graph Visualization");
  svg.append("desc").text("Created using Nexus Graph (https://paion-data.github.io/nexusgraph/)");

  if (type === "graph") {
    svg = appendGraphLayers(svgElement, svg);
  }

  svg.selectAll(".overlay, .ring").remove();
  svg.selectAll(".context-menu-item").remove();
  svg.selectAll("text").attr("font-family", "Helvetica Neue, Helvetica, Arial, sans-serif");

  svg.attr("width", dimensions.width);
  svg.attr("height", dimensions.height);
  svg.attr("viewBox", dimensions.viewBox);

  return svg;
};

/**
 * Append a new graph layer
 *
 * Equivalent to clone the original graph layers
 *
 * @param svgElement Original svg element
 * @param svg New svg elements for download
 *
 * @returns New svg selection object
 */
const appendGraphLayers = (svgElement: SVGElement, svg: any) => {
  d3Select(svgElement)
    .selectAll("g.layer")
    .each(function () {
      svg.node().appendChild(
        d3Select<SVGGElement, unknown>(this as SVGGElement)
          .node()
          ?.cloneNode(true)
      );
    });
  return svg;
};

/**
 * Gets the dimensions of the svg graph
 *
 * @param view Graph element
 *
 * @returns Dimensions object
 */
const getSvgDimensions = (view: any) => {
  const boundingBox = view.boundingBox();
  const dimensions = {
    width: boundingBox.width,
    height: boundingBox.height,
    viewBox: [boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height].join(" "),
  };

  return dimensions;
};
