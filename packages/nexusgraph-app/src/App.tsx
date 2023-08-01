// Copyright 2023 Paion Data. All rights reserved.
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { AppWrapper, EditorCaption, EditorWrapper, EditorGlassCover, GraphBrowserWrapper, IconWapper } from "./styled";
import { useEffect } from "react";
import { RemoteNaturalLanguageProcessor } from "../../nexusgraph-nlp/src/processor/RemoteNaturalLanguageProcessor";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_NLPDATA, GlobalState } from "../../nexusgraph-provider";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();
  const dispatch = useDispatch();
  const entityExtrationTexts: string[] = useSelector((state: GlobalState) => state.editorLine);

  useEffect(() => {
    if (entityExtrationTexts.length > 0) {
      naturalLanguageProcessor.entityExtraction(entityExtrationTexts).then((NlpState) => {
        dispatch({ type: UPDATE_NLPDATA, payload: NlpState });
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
