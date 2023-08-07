// Copyright 2023 Paion Data. All rights reserved.

import { QuoteNode } from "@lexical/rich-text";
import { LexicalNode, NodeKey } from "lexical/LexicalNode";
import {
  $createParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from "lexical";

export type SerializedCustomQuoteNode = SerializedElementNode;

export class CustomQuoteNode extends QuoteNode {
  /**
   * Call the constructor of a parent class.
   *
   * @param key node type
   */
  constructor(key?: NodeKey) {
    super(key);
  }

  /**
   * Rebuilds a string type of node with its associated class prototype
   *
   * Every node must implement this and it MUST BE UNIQUE amongst nodes registered on the editor.
   *
   * @returns the string type of CustomQuoteNode
   */
  static getType(): string {
    return "custom_quote";
  }

  /**
   * uses cloning to ensure consistency between creation of new EditorState snapshots
   *
   * @param QuoteNode node QuoteNode
   *
   * @returns instanceof subclass CustomQuoteNode
   */
  static clone(node: QuoteNode): CustomQuoteNode {
    return new CustomQuoteNode(node.__key);
  }

  /**
   * the JSON of CustomQuoteNode state serialized back to CustomQuoteNode
   *
   * @param serializedNode the JSON of CustomQuoteNode state
   *
   * @returns CustomQuoteNode
   */
  static override importJSON(serializedNode: SerializedCustomQuoteNode): CustomQuoteNode {
    const node = $createCustomQuoteNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  /**
   * Convert editor CustomQuoteNode state to JSON
   *
   * @returns the JSON of CustomQuoteNode state
   */
  override exportJSON(): SerializedCustomQuoteNode {
    return {
      ...super.exportJSON(),
      type: "custom_quote",
      // version: 1,
    };
  }

  /**
   * Realize the line break function of quote, and exit quote with two consecutive blank lines
   *
   * @param _ selection
   *
   * @param restoreSelection
   *
   * @returns null | ParagraphNode
   */
  insertNewAfter(_: RangeSelection, restoreSelection?: boolean): any {
    const children = this.getChildren();
    const childrenLength = children.length;

    if (
      childrenLength >= 2 &&
      children[childrenLength - 1].getTextContent() === "\n" &&
      children[childrenLength - 2].getTextContent() === "\n" &&
      _.isCollapsed() &&
      _.anchor.key === this.__key &&
      _.anchor.offset === childrenLength
    ) {
      children[childrenLength - 1].remove();
      children[childrenLength - 2].remove();
      const newBlock = $createParagraphNode();
      this.insertAfter(newBlock, restoreSelection);
      return newBlock;
    }

    return null;
  }
}

/**
 * create CustomQuoteNode node
 *
 * @returns an instance of the subclass CustomQuoteNode
 */
export function $createCustomQuoteNode(): CustomQuoteNode {
  return new CustomQuoteNode();
}

/**
 * Determine whether it is an instance of the subclass CustomQuoteNode
 *
 * @param node
 *
 * @returns node instanceof CustomQuoteNode
 */
export function $isCustomQuoteNode(node: LexicalNode | null | undefined): node is CustomQuoteNode {
  return node instanceof CustomQuoteNode;
}
