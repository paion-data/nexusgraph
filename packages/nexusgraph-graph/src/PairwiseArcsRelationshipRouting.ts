// Copyright 2023 Paion Data. All rights reserved.
import { GraphModel, NodePair } from "./models/Graph";
import { RelationshipModel } from "./models/Relationship";
import { ArcArrow } from "./ArcArrow";
import { LoopArrow } from "./LoopArrow";
import { StraightArrow } from "./StraightArrow";
import { measureText } from "./textMeasurement";
import { GraphStyleModel } from "./GraphStyle";

export class PairwiseArcsRelationshipRouting {
  style: GraphStyleModel;
  canvas: HTMLCanvasElement;
  constructor(style: GraphStyleModel) {
    this.style = style;
    this.canvas = document.createElement("canvas");
  }

  public measureRelationshipCaption(relationship: RelationshipModel, caption: string): number {
    const fontFamily = "sans-serif";
    const padding = parseFloat(this.style.forRelationship(relationship).get("padding"));
    const canvas2DContext = this.canvas.getContext("2d");
    return (
      measureText(caption, fontFamily, relationship.captionHeight, <CanvasRenderingContext2D>canvas2DContext) +
      padding * 2
    );
  }

  public captionFitsInsideArrowShaftWidth(relationship: RelationshipModel): boolean {
    return parseFloat(this.style.forRelationship(relationship).get("shaft-width")) > relationship.captionHeight;
  }

  public measureRelationshipCaptions(relationships: RelationshipModel[]): void {
    relationships.forEach((relationship) => {
      relationship.captionHeight = parseFloat(this.style.forRelationship(relationship).get("font-size"));
      relationship.captionLength = this.measureRelationshipCaption(relationship, relationship.caption);

      relationship.captionLayout =
        this.captionFitsInsideArrowShaftWidth(relationship) && !relationship.isLoop() ? "internal" : "external";
    });
  }

  public shortenCaption(relationship: RelationshipModel, caption: string, targetWidth: number): [string, number] {
    let shortCaption = caption || "caption";
    /* eslint-disable no-alert, no-constant-condition */
    while (true) {
      /* eslint-disable no-alert, no-constant-condition */
      if (shortCaption.length <= 2) {
        return ["", 0];
      }
      shortCaption = `${shortCaption.substring(0, shortCaption.length - 2)}\u2026`;
      const width = this.measureRelationshipCaption(relationship, shortCaption);
      if (width < targetWidth) {
        return [shortCaption, width];
      }
    }
  }

  public computeGeometryForNonLoopArrows(nodePairs: NodePair[]): void {
    const square = (distance: number) => distance * distance;

    nodePairs.forEach((nodePair) => {
      if (!nodePair.isLoop()) {
        const dx = nodePair.nodeA.x - nodePair.nodeB.x;
        const dy = nodePair.nodeA.y - nodePair.nodeB.y;
        //The Angle between the X-axis  and the (dx, dy) rays
        //"(x + 360) % 360" goal is to make the value of x always positive
        const angle = ((Math.atan2(dy, dx) / Math.PI) * 180 + 360) % 360;
        //Distance between two node centers
        const centreDistance = Math.sqrt(square(dx) + square(dy));

        nodePair.relationships.forEach((relationship) => {
          relationship.naturalAngle = relationship.target === nodePair.nodeA ? (angle + 180) % 360 : angle;
          relationship.centreDistance = centreDistance;
        });
      }
    });
  }

  public distributeAnglesForLoopArrows(nodePairs: NodePair[], relationships: RelationshipModel[]): void {
    for (const nodePair of nodePairs) {
      if (nodePair.isLoop()) {
        let angles = [];
        const node = nodePair.nodeA;
        for (const relationship of Array.from(relationships)) {
          if (!relationship.isLoop()) {
            if (relationship.source === node) {
              angles.push(relationship.naturalAngle);
            }
            if (relationship.target === node) {
              angles.push(relationship.naturalAngle + 180);
            }
          }
        }
        //Sort from smallest to largest
        angles = angles.map((a) => (a + 360) % 360).sort((a, b) => a - b);

        if (angles.length > 0) {
          let end, start;
          const biggestGap = {
            start: 0,
            end: 0,
          };

          //Compare the difference between two adjacent angles and update "biggestGap"
          for (let i = 0; i < angles.length; i++) {
            const angle = angles[i];
            start = angle;
            end = i === angles.length - 1 ? angles[0] + 360 : angles[i + 1];
            if (end - start > biggestGap.end - biggestGap.start) {
              biggestGap.start = start;
              biggestGap.end = end;
            }
          }
          //Bisect an Angle with the greatest difference according to the number of loops
          const separation = (biggestGap.end - biggestGap.start) / (nodePair.relationships.length + 1);

          for (let i = 0; i < nodePair.relationships.length; i++) {
            const relationship = nodePair.relationships[i];
            relationship.naturalAngle = (biggestGap.start + (i + 1) * separation - 90) % 360;
          }
        } else {
          const separation = 360 / nodePair.relationships.length;
          for (let i = 0; i < nodePair.relationships.length; i++) {
            const relationship = nodePair.relationships[i];
            relationship.naturalAngle = i * separation;
          }
        }
      }
    }
  }

  public layoutRelationships(graph: GraphModel): void {
    const nodePairs = graph.groupedRelationships();

    this.computeGeometryForNonLoopArrows(nodePairs);
    this.distributeAnglesForLoopArrows(nodePairs, graph.relationships);

    for (const nodePair of nodePairs) {
      for (const relationship of nodePair.relationships) {
        delete relationship.arrow;
      }

      const middleRelationshipIndex = (nodePair.relationships.length - 1) / 2;
      const defaultDeflectionStep = 30;
      const maximumTotalDeflection = 150;
      const numberOfSteps = nodePair.relationships.length - 1;
      const totalDeflection = defaultDeflectionStep * numberOfSteps;

      const deflectionStep =
        totalDeflection > maximumTotalDeflection ? maximumTotalDeflection / numberOfSteps : defaultDeflectionStep;

      for (let i = 0; i < nodePair.relationships.length; i++) {
        const relationship = nodePair.relationships[i];
        const shaftWidth = parseFloat(this.style.forRelationship(relationship).get("shaft-width")) || 2;
        const headWidth = shaftWidth + 6;
        const headHeight = headWidth;

        if (nodePair.isLoop()) {
          relationship.arrow = new LoopArrow(
            relationship.source.radius,
            40,
            defaultDeflectionStep,
            shaftWidth,
            headWidth,
            headHeight,
            relationship.captionHeight
          );
        } else {
          if (i === middleRelationshipIndex) {
            relationship.arrow = new StraightArrow(
              relationship.source.radius,
              relationship.target.radius,
              relationship.centreDistance,
              shaftWidth,
              headWidth,
              headHeight,
              relationship.captionLayout
            );
          } else {
            //The Angle of the lines on either side of the center line
            let deflection = deflectionStep * (i - middleRelationshipIndex);
            if (nodePair.nodeA !== relationship.source) {
              deflection *= -1;
            }

            relationship.arrow = new ArcArrow(
              relationship.source.radius,
              relationship.target.radius,
              relationship.centreDistance,
              deflection,
              shaftWidth,
              headWidth,
              headHeight,
              relationship.captionLayout
            );
          }
        }

        [relationship.shortCaption, relationship.shortCaptionLength] =
          relationship.arrow.shaftLength > relationship.captionLength
            ? [relationship.caption, relationship.captionLength]
            : this.shortenCaption(relationship, relationship.caption, relationship.arrow.shaftLength);
      }
    }
  }
}
