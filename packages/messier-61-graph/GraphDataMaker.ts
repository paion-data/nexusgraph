import type { GraphData, Link, Node } from "./GraphConfig";

export function makeGraphFromSvoTripples(tripples: string[][]): GraphData {
  const nodes: Node[] = [];
  const links: Link[] = [];

  tripples.forEach((tripple) => {
    let sourceId = randomId();
    let targetId = randomId();

    const sourceNodeName = tripple[0];
    const targetNodeName = tripple[2];

    if (targetNameExistsIn(nodes, sourceNodeName)) {
      sourceId = find(nodes, sourceNodeName).id;
    } else {
      nodes.push({
        id: sourceId,
        name: sourceNodeName,
      });
    }

    if (targetNameExistsIn(nodes, targetNodeName)) {
      targetId = find(nodes, targetNodeName).id;
    } else {
      nodes.push({
        id: targetId,
        name: targetNodeName,
      });
    }

    links.push({
      id: randomId(),
      name: tripple[1],
      source: sourceId,
      target: targetId,
    });
  });

  return { nodes, links };
}

function randomId(): string {
  return Math.random()
    .toString(36)
    .substring(2, 6 + 2);
}

function targetNameExistsIn(nodes: Node[], target: string): boolean {
  return nodes.find((node) => node.name === target) !== undefined;
}

function find(nodes: Node[], targetName: string): Node {
  return nodes.find((node) => node.name === targetName) as Node;
}
