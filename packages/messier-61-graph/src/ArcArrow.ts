// Copyright 2023 Paion Data. All rights reserved.
import { Point } from "./Point";
import type { RelationshipCaptionLayout } from "./models/Relationship";

const square = (l: number): number => l * l;

/**
 * Calculate the coordinates of the points where the arc intersects with other circles
 *
 * @param fixedPoint The point at which the starting node intersects the arc
 *
 * @param radius The sum of the target node and the arrow height is the radius of the circle
 *
 * @param xCenter The distance between the center of the source node and the center of the target node
 *
 * @param polarity
 *
 * @param homotheticCenter
 *
 * @returns
 */
const intersectWithOtherCircle = function (
  fixedPoint: Point,
  radius: number,
  xCenter: number,
  polarity: number,
  homotheticCenter: number
): Point {
  const gradient = fixedPoint.y / (fixedPoint.x - homotheticCenter);
  const hc = fixedPoint.y - gradient * fixedPoint.x;

  const A = 1 + square(gradient);
  const B = 2 * (gradient * hc - xCenter);
  const C = square(hc) + square(xCenter) - square(radius);

  const x = (-B + polarity * Math.sqrt(square(B) - 4 * A * C)) / (2 * A);
  const intersection = {
    x,
    y: (x - homotheticCenter) * gradient,
  };

  return intersection;
};
export class ArcArrow {
  public deflection: number;
  public midShaftPoint: Point;
  public outline: (shortCaptionLength: number) => string;
  public overlay: (minWidth: number) => string;
  public shaftLength: number;
  constructor(
    startRadius: number,
    endRadius: number,
    endCentre: number,
    deflection: number,
    arrowWidth: number,
    headWidth: number,
    headLength: number,
    captionLayout: RelationshipCaptionLayout
  ) {
    this.deflection = deflection;

    const deflectionRadians = (this.deflection * Math.PI) / 180;
    const startAttach = {
      x: Math.cos(deflectionRadians) * startRadius,
      y: Math.sin(deflectionRadians) * startRadius,
    };

    const radiusRatio = startRadius / (endRadius + headLength);
    const homotheticCenter = (-endCentre * radiusRatio) / (1 - radiusRatio);

    const endAttach = intersectWithOtherCircle(startAttach, endRadius + headLength, endCentre, -1, homotheticCenter);

    const g1 = -startAttach.x / startAttach.y;
    const c1 = startAttach.y + square(startAttach.x) / startAttach.y;
    const g2 = -(endAttach.x - endCentre) / endAttach.y;
    const c2 = endAttach.y + ((endAttach.x - endCentre) * endAttach.x) / endAttach.y;

    const cx = (c1 - c2) / (g2 - g1);
    const cy = g1 * cx + c1;

    const arcRadius = Math.sqrt(square(cx - startAttach.x) + square(cy - startAttach.y));
    const startAngle = Math.atan2(startAttach.x - cx, cy - startAttach.y);
    const endAngle = Math.atan2(endAttach.x - cx, cy - endAttach.y);
    let sweepAngle = endAngle - startAngle;
    if (this.deflection > 0) {
      sweepAngle = 2 * Math.PI - sweepAngle;
    }

    this.shaftLength = sweepAngle * arcRadius;
    if (startAngle > endAngle) {
      this.shaftLength = 0;
    }

    let midShaftAngle = (startAngle + endAngle) / 2;
    if (this.deflection > 0) {
      midShaftAngle += Math.PI;
    }
    this.midShaftPoint = {
      x: cx + arcRadius * Math.sin(midShaftAngle),
      y: cy - arcRadius * Math.cos(midShaftAngle),
    };

    const startTangent = function (dr: number): Point {
      const dx = (dr < 0 ? 1 : -1) * Math.sqrt(square(dr) / (1 + square(g1)));
      const dy = g1 * dx;
      return {
        x: startAttach.x + dx,
        y: startAttach.y + dy,
      };
    };

    const endTangent = function (dr: number): Point {
      const dx = (dr < 0 ? -1 : 1) * Math.sqrt(square(dr) / (1 + square(g2)));
      const dy = g2 * dx;
      return {
        x: endAttach.x + dx,
        y: endAttach.y + dy,
      };
    };

    const angleTangent = (angle: number, dr: number): Point => ({
      x: cx + (arcRadius + dr) * Math.sin(angle),
      y: cy - (arcRadius + dr) * Math.cos(angle),
    });

    const endNormal = function (dc: number): Point {
      const dx = (dc < 0 ? -1 : 1) * Math.sqrt(square(dc) / (1 + square(1 / g2)));
      const dy = dx / g2;
      return {
        x: endAttach.x + dx,
        y: endAttach.y - dy,
      };
    };

    const endOverlayCorner = function (dr: number, dc: number): Point {
      const shoulder = endTangent(dr);
      const arrowTip = endNormal(dc);
      return {
        x: shoulder.x + arrowTip.x - endAttach.x,
        y: shoulder.y + arrowTip.y - endAttach.y,
      };
    };

    const coord = (point: Point): string => `${point.x},${point.y}`;

    const shaftRadius = arrowWidth / 2;
    const headRadius = headWidth / 2;
    const positiveSweep = startAttach.y > 0 ? 0 : 1;
    const negativeSweep = startAttach.y < 0 ? 0 : 1;

    this.outline = function (shortCaptionLength: number) {
      if (startAngle > endAngle) {
        return [
          "M",
          coord(endTangent(-headRadius)),
          "L",
          coord(endNormal(headLength)),
          "L",
          coord(endTangent(headRadius)),
          "Z",
        ].join(" ");
      }

      if (captionLayout === "external") {
        let captionSweep = shortCaptionLength / arcRadius;
        if (this.deflection > 0) {
          captionSweep *= -1;
        }

        const startBreak = midShaftAngle - captionSweep / 2;
        const endBreak = midShaftAngle + captionSweep / 2;

        return [
          "M",
          coord(startTangent(shaftRadius)),
          "L",
          coord(startTangent(-shaftRadius)),
          "A",
          arcRadius - shaftRadius,
          arcRadius - shaftRadius,
          0,
          0,
          positiveSweep,
          coord(angleTangent(startBreak, -shaftRadius)),
          "L",
          coord(angleTangent(startBreak, shaftRadius)),
          "A",
          arcRadius + shaftRadius,
          arcRadius + shaftRadius,
          0,
          0,
          negativeSweep,
          coord(startTangent(shaftRadius)),
          "Z",
          "M",
          coord(angleTangent(endBreak, shaftRadius)),
          "L",
          coord(angleTangent(endBreak, -shaftRadius)),
          "A",
          arcRadius - shaftRadius,
          arcRadius - shaftRadius,
          0,
          0,
          positiveSweep,
          coord(endTangent(-shaftRadius)),
          "L",
          coord(endTangent(-headRadius)),
          "L",
          coord(endNormal(headLength)),
          "L",
          coord(endTangent(headRadius)),
          "L",
          coord(endTangent(shaftRadius)),
          "A",
          arcRadius + shaftRadius,
          arcRadius + shaftRadius,
          0,
          0,
          negativeSweep,
          coord(angleTangent(endBreak, shaftRadius)),
        ].join(" ");
      } else {
        return [
          "M",
          coord(startTangent(shaftRadius)),
          "L",
          coord(startTangent(-shaftRadius)),
          "A",
          arcRadius - shaftRadius,
          arcRadius - shaftRadius,
          0,
          0,
          positiveSweep,
          coord(endTangent(-shaftRadius)),
          "L",
          coord(endTangent(-headRadius)),
          "L",
          coord(endNormal(headLength)),
          "L",
          coord(endTangent(headRadius)),
          "L",
          coord(endTangent(shaftRadius)),
          "A",
          arcRadius + shaftRadius,
          arcRadius + shaftRadius,
          0,
          0,
          negativeSweep,
          coord(startTangent(shaftRadius)),
        ].join(" ");
      }
    };

    this.overlay = function (minWidth: number) {
      const radius = Math.max(minWidth / 2, shaftRadius);

      return [
        "M",
        coord(startTangent(radius)),
        "L",
        coord(startTangent(-radius)),
        "A",
        arcRadius - radius,
        arcRadius - radius,
        0,
        0,
        positiveSweep,
        coord(endTangent(-radius)),
        "L",
        coord(endOverlayCorner(-radius, headLength)),
        "L",
        coord(endOverlayCorner(radius, headLength)),
        "L",
        coord(endTangent(radius)),
        "A",
        arcRadius + radius,
        arcRadius + radius,
        0,
        0,
        negativeSweep,
        coord(startTangent(radius)),
      ].join(" ");
    };
  }
}
