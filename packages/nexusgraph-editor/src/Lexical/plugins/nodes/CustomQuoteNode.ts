// Copyright 2023 Paion Data. All rights reserved.

import { QuoteNode } from "@lexical/rich-text";
import { LexicalNode, NodeKey } from "lexical/LexicalNode";
import { $createLineBreakNode, $createParagraphNode, RangeSelection, SerializedElementNode } from "lexical";

export type SerializedCustomQuoteNode = SerializedElementNode;

export class CustomQuoteNode extends QuoteNode {
  static getType(): string {
    return "custom_quote";
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: CustomQuoteNode): CustomQuoteNode {
    return new CustomQuoteNode(node.__key);
  }

  static override importJSON(serializedNode: SerializedCustomQuoteNode): CustomQuoteNode {
    const node = $createCustomQuoteNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  override exportJSON(): SerializedCustomQuoteNode {
    return {
      ...super.exportJSON(),
      type: "custom_quote",
      version: 1,
    };
  }

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
export function $createCustomQuoteNode(): CustomQuoteNode {
  return new CustomQuoteNode();
}
export function $isCustomQuoteNode(node: LexicalNode | null | undefined): node is CustomQuoteNode {
  return node instanceof CustomQuoteNode;
}
