// Copyright 2023 Paion Data. All rights reserved.

import { QuoteNode } from "@lexical/rich-text";
import { LexicalNode, NodeKey } from "lexical/LexicalNode";
import { $createLineBreakNode, $createParagraphNode, RangeSelection, SerializedElementNode } from "lexical";

export type SerializedCustomQuoteNode = SerializedElementNode;

export class CustomQuoteNode extends QuoteNode {
  /**
   * Constructs a function forwarded to the superclass
   *
   * This is how your rebuild node has the key so the framework knows what to do with it
   * (the super function passes the key to the super class new node）
   *
   * @param key
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
   * Rebuilds a node with its associated class prototype
   *
   * @param QuoteNode
   *
   * @returns the new CustomQuoteNode
   */
  static clone(node: QuoteNode): QuoteNode {
    return new CustomQuoteNode(node.__key);
  }

  /**
   * the JSON of CustomQuoteNode state serialized back to CustomQuoteNode
   *
   * @param serializedNode
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
      version: 1,
    };
  }

  /**
   * Realize the line break function of quote, and exit quote when there are more than two blank lines
   *
   * @param _
   *
   * @param restoreSelection
   *
   * @returns null
   */
  insertNewAfter(_: RangeSelection, restoreSelection?: boolean) {
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
      const newElement = $createParagraphNode();
      this.insertAfter(newElement, restoreSelection);
      return newElement;
    }
    const insertNodes: string | any[] = [];
    if (insertNodes.length > 0) {
      _.insertNodes([$createLineBreakNode(), ...insertNodes]);
      return insertNodes[insertNodes.length - 1];
    }
    return null;
  }
}

/**
 * create CustomQuoteNode
 *
 * @returns the function of createCustomQuoteNode
 */
export function $createCustomQuoteNode(): CustomQuoteNode {
  return new CustomQuoteNode();
}

/**
 * Determine whether it is CustomQuoteNode
 *
 * @param node
 *
 * @returns node instanceof CustomQuoteNode
 */
export function $isCustomQuoteNode(node: LexicalNode | null | undefined): node is CustomQuoteNode {
  return node instanceof CustomQuoteNode;
}
