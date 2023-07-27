// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { AppWrapper, EditorCaption, EditorWrapper, EditorGlassCover, GraphBrowserWrapper, IconWapper } from "./styled";
import { UPDATE_GRAPH } from "../../nexusgraph-provider/src/types";
import { getEditorLine } from "../../nexusgraph-provider/src/shared/editorLine/editorLineDuck";
import { GlobalState } from "../../nexusgraph-provider/index";
import { useEffect } from "react";
import { RemoteNaturalLanguageProcessor } from "../../nexusgraph-nlp/src/processor/RemoteNaturalLanguageProcessor";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();
  const dispatch = useDispatch();
  const entityExtrationTexts: string[] = useSelector((state: GlobalState) => getEditorLine(state));

  useEffect(() => {
    if (entityExtrationTexts.length > 0) {
      naturalLanguageProcessor.entityExtraction(entityExtrationTexts).then((graphEditorState) => {
        dispatch({ type: UPDATE_GRAPH, payload: graphEditorState });
      });
    }
  }, [entityExtrationTexts, dispatch]);

  return (
    <AppWrapper>
      <EditorWrapper>
        <EditorGlassCover>
          <IconWapper>
            <img className="img" src={require("../public/app-logo.png")} alt="error" width={150} height={150} />
          </IconWapper>
          <EditorCaption className="h1">Nexus Graph</EditorCaption>
          <Editor />
        </EditorGlassCover>
      </EditorWrapper>
      <GraphBrowserWrapper>
        <GraphBrowser />
      </GraphBrowserWrapper>
    </AppWrapper>
  );
}
