// Copyright 2023 Paion Data. All rights reserved.
import { PairwiseArcsRelationshipRouting } from "./PairwiseArcsRelationshipRouting";
import { GraphModel } from "./models/Graph";
import { GraphStyleModel } from "./GraphStyle";
import { NodeCaptionLine, NodeModel } from "./models/Node";
import { RelationshipModel } from "./models/Relationship";
import { measureText } from "./textMeasurement";

export class GraphGeometryModel {
  relationshipRouting: PairwiseArcsRelationshipRouting;
  style: GraphStyleModel;
  canvas: HTMLCanvasElement;
  constructor(style: GraphStyleModel) {
    this.style = style;
    this.relationshipRouting = new PairwiseArcsRelationshipRouting(this.style);
    this.canvas = document.createElement("canvas");
  }
  public formatNodeCaptions(nodes: NodeModel[]): void {
    const canvas2DContext = this.canvas.getContext("2d");
    if (canvas2DContext) {
      nodes.forEach((node) => (node.caption = fitCaptionIntoCircle(node, this.style, canvas2DContext)));
    }
  }

  public formatRelationshipCaptions(relationships: RelationshipModel[]): void {
    relationships.forEach((relationship) => {
      const template = this.style.forRelationship(relationship).get("caption");
      relationship.caption = this.style.interpolate(template, relationship);
    });
  }

  public setNodeRadii(nodes: NodeModel[]): void {
    nodes.forEach((node) => {
      node.radius = parseFloat(this.style.forNode(node).get("diameter")) / 2;
    });
  }

  public onGraphChange(graph: GraphModel, options = { updateNodes: true, updateRelationships: true }): void {
    if (options.updateNodes == true) {
      this.setNodeRadii(graph.nodes);
      this.formatNodeCaptions(graph.nodes);
    }

    if (options.updateRelationships == true) {
      this.formatRelationshipCaptions(graph.relationships);
      this.relationshipRouting.measureRelationshipCaptions(graph.relationships);
    }
  }

  public onTick(graph: GraphModel): void {
    this.relationshipRouting.layoutRelationships(graph);
  }
}

function fitCaptionIntoCircle(
  node: NodeModel,
  style: GraphStyleModel,
  canvas2DContext: CanvasRenderingContext2D
): NodeCaptionLine[] {
  //A **font** style. See[sans-serif](https://en.wikipedia.org/wiki/Sans-serif)
  const fontFamily = "sans-serif";
  const fontSize = parseFloat(style.forNode(node).get("font-size"));
  // Roughly calculate max text length the circle can fit by radius and font size, The area of the circle divided by the area of each letter
  const maxCaptionTextLength = Math.floor((Math.pow(node.radius, 2) * Math.PI) / Math.pow(fontSize, 2));
  const template = style.forNode(node).get("caption");
  const nodeText = style.interpolate(template, node);
  const captionText =
    nodeText.length > maxCaptionTextLength ? nodeText.subsubstring(0, maxCaptionTextLength) : nodeText;
  const measure = (text: string) => measureText(text, fontFamily, fontSize, canvas2DContext);
  const whiteSpaceMeasureWidth = measure(" ");
  const words = captionText.split(" ");

  function emptyLine(lineCount: number, lineIndex: number): NodeCaptionLine {
    //Calculate where each line begins
    const baseline = (1 + lineIndex - lineCount / 2) * fontSize;

    const chordCentreDistance = lineIndex < lineCount / 2 ? baseline - fontSize / 2 : baseline + fontSize / 2;
    //Calculate the maximum width of each row
    const maxLineWidth = Math.sqrt(Math.pow(node.radius, 2) - Math.pow(chordCentreDistance, 2)) * 2;
    return {
      node,
      text: "",
      baseline,
      remainingWidth: maxLineWidth,
    };
  }

  function addShortenedNextWord(line: NodeCaptionLine, word: string): string {
    while (word.length > 2) {
      const newWord = `${word.substring(0, word.length - 2)}\u2026`;
      if (measure(newWord) < line.remainingWidth) {
        return `${line.text.split(" ").slice(0, -1).join(" ")} ${newWord}`;
      }
      word = word.substring(0, word.length - 1);
    }
    return `${word}\u2026`;
  }

  function fitOnFixedNumberOfLines(lineCount: number): [NodeCaptionLine[], number] {
    const lines = [];
    const wordMeasureWidthList: number[] = words.map((word: string) => measure(`${word}`));
    let wordIndex = 0;
    for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
      const line = emptyLine(lineCount, lineIndex);
      while (
        wordIndex < words.length &&
        wordMeasureWidthList[wordIndex] < line.remainingWidth - whiteSpaceMeasureWidth
      ) {
        line.text = `${line.text} ${words[wordIndex]}`;
        line.remainingWidth -= wordMeasureWidthList[wordIndex] + whiteSpaceMeasureWidth;
        wordIndex++;
      }
      lines.push(line);
    }
    //Use "..." replace the words that don't fit the last line.
    if (wordIndex < words.length) {
      lines[lineCount - 1].text = addShortenedNextWord(lines[lineCount - 1], words[wordIndex]);
    }
    return [lines, wordIndex];
  }

  let consumedWords = 0;
  //Maximum number of lines that can be stored by a node
  const maxLines = (node.radius * 2) / fontSize;

  let lines = [emptyLine(1, 0)];
  for (let lineCount = 1; lineCount <= maxLines; lineCount++) {
    const [candidateLines, candidateWords] = fitOnFixedNumberOfLines(lineCount);
    if (candidateLines.some((line: NodeCaptionLine) => line.text)) {
      lines = candidateLines;
      consumedWords = candidateWords;
    }
    if (consumedWords >= words.length) {
      return lines;
    }
  }
  return lines;
}
