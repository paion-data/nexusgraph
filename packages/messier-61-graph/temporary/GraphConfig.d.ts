/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
/**
 * A graph config instructs {@link D3Graph} how the D3 network graph is going to be rendered and with what data to be
 * rendered.
 */
export interface GraphConfig {
  /**
   * The data.
   */
  graphData: Graph;

  /**
   * See {@link CanvasConfig}
   */
  canvasConfig: CanvasConfig;
}

/**
 * A Graph is an abstract data type that is meant to implement the Knowledge Graph (both directed and undirected)
 * concept from the field of graph theory within mathematics.
 *
 * A knowledge graph is a directed labeled graph in which the labels have well-defined meanings. A directed labeled
 * graph consists of nodes, edges, and labels. Anything can act as a node, for example, people, company, computer, etc.
 * An edge connects a pair of nodes and captures the relationship of interest between them, for example, friendship
 * relationship between two people, customer relationship between a company and person, or a network connection between
 * two computers. The labels capture the meaning of the relationship, for example, the friendship relationship between
 * two people.
 */
export interface GraphData {
  nodes: Node[];
  links: Link[];
}

/**
 * A node has a unique identifier
 */
export interface Node {
  /**
   * Surrogate key
   */
  id: string;
  name: string;
}

export interface Link {
  /**
   * Surrogate key
   */
  id: string;
  name: string;
  source: string;
  target: string;
}

/**
 * A CanvasConfig describes the whole layout of a rendered D3 graph.
 *
 * The canvas config contains the following attributes:
 *
 * - {@link Margin}
 * - Canvas width
 * - Canvas height
 *
 * Note that it is not guaranteed that the graph will occupy the entire canvas width or height. It does, however,
 * guarantees the entire graph will fit inside the canvas
 */
export interface CanvasConfig {
  /**
   * The {@link Margin margin} of the canvas.
   */
  margin: Margin;

  /**
   * The canvas width.
   */
  width: number;

  /**
   * The canvas height.
   */
  height: number;
}

/**
 * Encapsulate the margin value of the D3 graph
 *
 * @type {Margin} top, bottom, left and right margins of the svg
 */
export interface Margin {
  top: number;
  bottom: number;
  right: number;
  left: number;
}
