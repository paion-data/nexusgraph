// Copyright 2023 Paion Data. All rights reserved.
import { Point } from "./Point";

/**
 * Draws a loop arrow on loop nodes
 */
export class LoopArrow {
  public midShaftPoint: Point;
  public outline: () => string;
  public overlay: (minWidth: number) => string;
  public shaftLength: number;

  /**
   * All-args constructor.
   *
   * Define the relationship curve of loop nodes
   *
   * We use the path to create the graph.  It's plotted by giving us a set of coordinates of points.  It is used to
   * give a coordinate point, before the coordinate point to add an English letter, indicating how to move to this
   * coordinate point. See [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) for more details.
   *
   * The configuraion is the following:
   *
   * - Obtain the x and y coordinates of the tangent point of the relationship.  In mathematics the word ‘normal’ has a
   * very specific meaning.   Itmeans ‘perpendicular’ or ‘atright angles’.  If we have a curve , we can choose a point
   * and draw in the tangentto the curve at that point. The normal is then at right angles to the curve so it is also
   * at rightangles (perpendicular) to the tangent.Use the "normalPoint" function, whose arguments include "sweep" (The
   * Angle at which the arc intersects the tangent line), "radius" (The radius of the arc where the tangent point is),
   * "displacement" (The offset of the tangent point of the relationship, that is, half of the "shaftWidth")
   *
   * - Draw the relationship curve of loop nodes. We use path to create curves.
   *
   * - Draw the graph of the overlay relationship, when the mouse moves over the relationship
   *
   * @param nodeRadius The radius of the source node of the relationship
   *
   * @param straightLength The minimum distance from the vertex of a node to the center of an arc
   *
   * @param spreadDegrees The Angle at which the arc unfolds
   *
   * @param shaftWidth  The line width of relationship. See
   * [Shaft](https://en.wikipedia.org/wiki/Shaft_(mechanical_engineering)) for more details
   *
   * @param headWidth  The width of the arrows
   *
   * @param headLength  The height of the arrows
   *
   * @param captionHeight The height of the caption on the relationship
   */
  constructor(
    nodeRadius: number,
    straightLength: number,
    spreadDegrees: number,
    shaftWidth: number,
    headWidth: number,
    headLength: number,
    captionHeight: number
  ) {
    const spread = (spreadDegrees * Math.PI) / 180;
    const r1 = nodeRadius;
    const r2 = nodeRadius + headLength;
    const r3 = nodeRadius + straightLength;
    const loopRadius = r3 * Math.tan(spread / 2);
    const shaftRadius = shaftWidth / 2;
    this.shaftLength = loopRadius * 3 + shaftWidth;

    const normalPoint = function (sweep: number, radius: number, displacement: number): Point {
      const localLoopRadius = radius * Math.tan(spread / 2);
      const cy = radius / Math.cos(spread / 2);
      return new Point(
        (localLoopRadius + displacement) * Math.sin(sweep),
        cy + (localLoopRadius + displacement) * Math.cos(sweep)
      );
    };
    this.midShaftPoint = normalPoint(0, r3, shaftRadius + captionHeight / 2 + 2);
    const startPoint = (radius: number, displacement: number): Point =>
      normalPoint((Math.PI + spread) / 2, radius, displacement);
    const endPoint = (radius: number, displacement: number): Point =>
      normalPoint(-(Math.PI + spread) / 2, radius, displacement);

    this.outline = function (): string {
      const inner = loopRadius - shaftRadius;
      const outer = loopRadius + shaftRadius;
      return [
        "M",
        startPoint(r1, shaftRadius),
        "L",
        startPoint(r3, shaftRadius),
        "A",
        outer,
        outer,
        0,
        1,
        1,
        endPoint(r3, shaftRadius),
        "L",
        endPoint(r2, shaftRadius),
        "L",
        endPoint(r2, -headWidth / 2),
        "L",
        endPoint(r1, 0),
        "L",
        endPoint(r2, headWidth / 2),
        "L",
        endPoint(r2, -shaftRadius),
        "L",
        endPoint(r3, -shaftRadius),
        "A",
        inner,
        inner,
        0,
        1,
        0,
        startPoint(r3, -shaftRadius),
        "L",
        startPoint(r1, -shaftRadius),
        "Z",
      ].join(" ");
    };

    this.overlay = function (minWidth: number) {
      const displacement = Math.max(minWidth / 2, shaftRadius);
      const inner = loopRadius - displacement;
      const outer = loopRadius + displacement;
      return [
        "M",
        startPoint(r1, displacement),
        "L",
        startPoint(r3, displacement),
        "A",
        outer,
        outer,
        0,
        1,
        1,
        endPoint(r3, displacement),
        "L",
        endPoint(r2, displacement),
        "L",
        endPoint(r2, -displacement),
        "L",
        endPoint(r3, -displacement),
        "A",
        inner,
        inner,
        0,
        1,
        0,
        startPoint(r3, -displacement),
        "L",
        startPoint(r1, -displacement),
        "Z",
      ].join(" ");
    };
  }
}
