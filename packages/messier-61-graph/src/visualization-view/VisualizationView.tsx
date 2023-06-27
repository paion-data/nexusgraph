// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { NodeModel } from "../models/Node";
import { RelationshipModel } from "../models/Relationship";
import { some } from "lodash";
import { GraphModel } from "../models/Graph";
import { GraphVisualizer } from "../GraphVisualizer";
import { StyledVisContainer } from "./VisualizationView.styled";
import neo4j from "neo4j-driver";
import { Bus } from "suber";

export interface NodesAndRels {
  nodes: NodeModel[];
  relationships: RelationshipModel[];
}

export interface VisualizationProps {
  result: any;
  graphStyleData: any;
  updated: number;
  autoComplete: boolean;
  maxNeighbours: number;
  bus: Bus;
  maxFieldItems: number;
  initialNodeDisplay: number;
  isFullscreen: boolean;
  updateStyle: (style: any) => void;
  assignVisElement: (v: any) => void;
  nodePropertiesExpandedByDefault: boolean;
  setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => void;
  wheelZoomInfoMessageEnabled: boolean;
  disableWheelZoomInfoMessage: () => void;
  editorNodes: NodeModel[];
  editorRelationships: RelationshipModel[];
}

export default function Visualization(props: VisualizationProps): JSX.Element | null {
  // const [autoCompleteCallback, setAutoCompleteCallback] = useState()
  const [nodes, setNodes] = useState<NodeModel[]>([]);
  const [relationships, setRelationships] = useState<RelationshipModel[]>([]);
  const [nodeLimitHit, setNodeLimitHit] = useState<boolean>(false);
  const [hasTruncatedFields, setHasTruncatedFields] = useState<boolean>(false);
  const [updated, setUpdated] = useState<Number>(0);

  let graphView: GraphModel | undefined;
  let autoCompleteCallback: (rels: RelationshipModel[], initialRun: boolean) => void;

  useEffect(() => {
    const { records = [] } = props.result;
    if (records && records.length > 0) {
      const hasTruncatedFields = resultHasTruncatedFields(props.result, props.maxFieldItems);
      const { nodes: uniqNodes, nodeLimitHit } = deduplicateNodes(
        nodes.concat(props.editorNodes),
        props.initialNodeDisplay
      );

      const uniqRels = nodeLimitHit
        ? relationships
            .filter(
              (rel) =>
                !!uniqNodes.find((node) => node.id === rel.source.id) &&
                !!uniqNodes.find((node) => node.id === rel.target.id)
            )
            .concat(props.editorRelationships)
        : relationships.concat(props.editorRelationships);

      setNodes(uniqNodes);
      setRelationships(uniqRels);
      setHasTruncatedFields(hasTruncatedFields);
      setUpdated(new Date().getTime());
      setNodeLimitHit(nodeLimitHit);
    }
  }, [nodes, relationships, nodeLimitHit, hasTruncatedFields, updated]);

  /**
   * Checks if a results has records which fields will be truncated when displayed
   * - O(N2) complexity
   * @param     {Object}    result
   * @param     {Number}    maxFieldItems
   * @return    {boolean}
   */
  function resultHasTruncatedFields(result: any, maxFieldItems: any): boolean {
    if (!maxFieldItems || !result) {
      return false;
    }

    return some(result.records, (record) =>
      some(record.keys, (key) => {
        const val = record.get(key);

        return Array.isArray(val) && val.length > maxFieldItems;
      })
    );
  }

  function autoCompleteRelationships(initialRun: boolean): void {
    if (props.autoComplete) {
      autoCompleteCallback && autoCompleteCallback(relationships, initialRun);
    } else {
      autoCompleteCallback && autoCompleteCallback([], initialRun);
    }
  }

  function setGraph(graph: GraphModel): void {
    graphView = graph;
    autoCompleteRelationships(true);
  }

  if (nodes.length) return null;

  return (
    <StyledVisContainer isFullscreen={props.isFullscreen}>
      <GraphVisualizer
        maxNeighbours={props.maxNeighbours}
        hasTruncatedFields={hasTruncatedFields}
        graphStyleData={props.graphStyleData}
        updateStyle={props.updateStyle}
        nodes={nodes}
        autocompleteRelationships={props.autoComplete ?? false}
        relationships={relationships}
        isFullscreen={props.isFullscreen}
        assignVisElement={props.assignVisElement}
        nodeLimitHit={nodeLimitHit}
        getAutoCompleteCallback={(callback: (rels: RelationshipModel[], initialRun: boolean) => void) => {
          autoCompleteCallback = callback;
        }}
        setGraph={setGraph}
        setNodePropertiesExpandedByDefault={props.setNodePropertiesExpandedByDefault}
        nodePropertiesExpandedByDefault={props.nodePropertiesExpandedByDefault}
        wheelZoomRequiresModKey={!props.isFullscreen}
        wheelZoomInfoMessageEnabled={props.wheelZoomInfoMessageEnabled && !props.isFullscreen}
        disableWheelZoomInfoMessage={props.disableWheelZoomInfoMessage}
        // DetailsPaneOverride={DetailsPane}
        // OverviewPaneOverride={OverviewPane}
        useGeneratedDefaultColors={false}
        initialZoomToFit
      />
    </StyledVisContainer>
  );
}

interface DeduplicateHelper {
  nodes: NodeModel[];
  taken: Record<string, boolean>;
  nodeLimitHit: boolean;
}

const deduplicateNodes = (nodes: NodeModel[], limit: number): { nodes: NodeModel[]; nodeLimitHit: boolean } =>
  nodes.reduce(
    (all: DeduplicateHelper, curr: NodeModel) => {
      if (all.nodes.length === limit) {
        all.nodeLimitHit = true;
      } else if (!all.taken[curr.id]) {
        all.nodes.push(curr);
        all.taken[curr.id] = true;
      }
      return all;
    },
    { nodes: [], taken: {}, nodeLimitHit: false }
  );
