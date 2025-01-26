import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { type BasicNode, type BasicRelationship, GraphVisualizer } from "neo4j-devtools-arc";

/**
 * Converts Redux-shaped graph nodes into format compatible with Neo4J graphing library.
 *
 * @param nodes  A list of nodes stored in Redux
 *
 * @returns a new array of newly constructed objects
 */
export const mapToBasicNodes = (nodes: []): BasicNode[] => {
  return nodes.map((node) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(node["fields"])) {
      propertyTypes[propertyName] = "string";
    }

    return {
      id: String(node["id"]),
      elementId: node["onCanvasId"],
      labels: ["*"],
      properties: node["fields"],
      propertyTypes: propertyTypes,
    } as BasicNode;
  });
};

/**
 * Converts Redux-shaped graph links into format compatible with Neo4J graphing library.
 *
 * @param links  A list of links stored in Redux
 *
 * @returns a new array of newly constructed objects
 */
export const mapToBasicRelationships = (links: []): BasicRelationship[] => {
  return links.map((link) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(link["fields"])) {
      propertyTypes[propertyName] = "string";
    }

    return {
      id: String(link["id"]),
      elementId: link["onCanvasId"],
      startNodeId: String(link["source"]),
      endNodeId: String(link["target"]),
      type: link["fields"]["type"],
      properties: link["fields"],
      propertyTypes: propertyTypes,
    } as BasicRelationship;
  });
};

function App() {
  const [graph, setGraph] = useState<{ nodes: BasicNode[]; links: BasicRelationship[] }>({ nodes: [], links: [] });
  const [inputValue, setInputValue] = useState("");

  const onClick = async () => {
    await fetch("https://qubitpi-lamassu.hf.space/gradio_api/call/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [inputValue] }),
    })
      .then((response) => response.json())
      .then((data) => {
        const eventId = data.event_id;

        fetch("https://qubitpi-lamassu.hf.space/gradio_api/call/predict/" + eventId)
          .then((response) => response.text())
          .then((text) => {
            const stupidGradioResponse = text.split("\n")[1];
            data = JSON.parse(stupidGradioResponse.substring(stupidGradioResponse.indexOf(": ") + 1));
            const nodes = data[0]["nodes"] as [];
            const links = data[0]["links"] as [];

            setGraph({ nodes: mapToBasicNodes(nodes), links: mapToBasicRelationships(links) });
          });
      });
  };

  const isFullscreen = true;

  return (
    <div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>

      <div className="wrapper">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="QubitPi Logo" />
          </div>
          <ul>
            <a href="#newgraph" className="button">
              New Graph
            </a>
          </ul>

          <div className="popup" id="newgraph">
            <div className="popup-inner">
              <h3>Text to Graph</h3>
              <p>
                Only Chinese are supported at this moment. English will be supported soon.
                <input type="text" onChange={(e) => setInputValue(e.target.value)} />
              </p>
              <a href="#/" className="button" onClick={onClick}>
                Generate Graph
              </a>
            </div>
          </div>
        </div>
        <div className="graphArea">
          <GraphVisualizer
            maxNeighbours={100}
            hasTruncatedFields={false}
            nodes={graph.nodes}
            autocompleteRelationships={false}
            relationships={graph.links}
            isFullscreen={isFullscreen}
            nodeLimitHit={false}
            getAutoCompleteCallback={undefined}
            wheelZoomRequiresModKey={!isFullscreen}
            wheelZoomInfoMessageEnabled={false}
            useGeneratedDefaultColors={false}
            initialZoomToFit={true}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
