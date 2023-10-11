// Copyright 2023 Paion Data. All rights reserved.
import type { RelationshipCaptionLayout } from "./models/Relationship";

/**
 * Draws a straigth arrow on nodes
 */
export class StraightArrow {
  public midShaftPoint: { x: number; y: number };
  public outline: (shortCaptionLength: number) => string;
  public overlay: (minWidth: number) => string;
  public shaftLength: number;

  /**
   * Creates a new straight arrow DOM object with a specified arrow configuration.
   *
   * We use the path to create the graph.  It's plotted by giving us a set of coordinates of points.  It is used to
   * give a coordinate point, before the coordinate point to add an English letter, indicating how to move to this
   * coordinate point. See [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) for more details.
   *
   * The configuraion is the following:
   *
   * - The straight arrow generated when the captionLayout attribute is "external" is divided into two segments.Draw the
   *  first part of the arrow according to the coordinates of the first set of points "M, L, L, L, Z"，draw the second
   * part of the arrow according to the coordinates of the second set of points "M, L, L, L, L, L, L, Z".The entire
   * arrow is generated when the captionLayout property is "internal".Draw thearrow accordingto the coordinates of the
   * point "M, L, L, L, L, L, L, Z"
   * - Draw a rectangular overlay arrow based on the point's coordinate "M, L, L, L, Z"，when the mouse moves over the
   * relationship
   *
   * <img src="media://straight-arrow-document.png" width="60%" />
   *
   * @param startRadius The radius of the source node of the relationship
   * @param endRadius The radius of the targrt node of the relationship
   * @param centreDistance The line length of relationship
   * @param shaftWidth The line width of relationship. See
   * [Shaft](https://en.wikipedia.org/wiki/Shaft_(mechanical_engineering)) for more details
   * @param headWidth The width of the arrows
   * @param headHeight The height of the arrows
   * @param captionLayout The caption layout is "internal" or "external"
   */
  constructor(
    startRadius: number,
    endRadius: number,
    centreDistance: number,
    shaftWidth: number,
    headWidth: number,
    headHeight: number,
    captionLayout: RelationshipCaptionLayout
  ) {
    const length: number = centreDistance - (startRadius + endRadius);
    this.shaftLength = length - headHeight;
    const startArrow = startRadius;
    const endShaft = startArrow + this.shaftLength;
    const endArrow = startArrow + length;
    const shaftRadius = shaftWidth / 2;
    const headRadius = headWidth / 2;

    this.midShaftPoint = {
      x: startArrow + this.shaftLength / 2,
      y: 0,
    };

    this.outline = function (shortCaptionLength: number) {
      if (captionLayout === "external") {
        const startBreak = startArrow + (this.shaftLength - shortCaptionLength) / 2;
        const endBreak = endShaft - (this.shaftLength - shortCaptionLength) / 2;

        return [
          "M",
          startArrow,
          shaftRadius,
          "L",
          startBreak,
          shaftRadius,
          "L",
          startBreak,
          -shaftRadius,
          "L",
          startArrow,
          -shaftRadius,
          "Z",
          "M",
          endBreak,
          shaftRadius,
          "L",
          endShaft,
          shaftRadius,
          "L",
          endShaft,
          headRadius,
          "L",
          endArrow,
          0,
          "L",
          endShaft,
          -headRadius,
          "L",
          endShaft,
          -shaftRadius,
          "L",
          endBreak,
          -shaftRadius,
          "Z",
        ].join(" ");
      } else {
        return [
          "M",
          startArrow,
          shaftRadius,
          "L",
          endShaft,
          shaftRadius,
          "L",
          endShaft,
          headRadius,
          "L",
          endArrow,
          0,
          "L",
          endShaft,
          -headRadius,
          "L",
          endShaft,
          -shaftRadius,
          "L",
          startArrow,
          -shaftRadius,
          "Z",
        ].join(" ");
      }
    };

    this.overlay = function (minWidth: number) {
      const radius = Math.max(minWidth / 2, shaftRadius);
      return [
        "M",
        startArrow,
        radius,
        "L",
        endArrow,
        radius,
        "L",
        endArrow,
        -radius,
        "L",
        startArrow,
        -radius,
        "Z",
      ].join(" ");
    };
  }
}
