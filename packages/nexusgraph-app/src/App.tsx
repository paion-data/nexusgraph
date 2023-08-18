// Copyright 2023 Paion Data. All rights reserved.
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { AppWrapper, EditorCaption, EditorWrapper, EditorGlassCover, GraphBrowserWrapper, IconWapper } from "./styled";
import { useEffect } from "react";
import { RemoteNaturalLanguageProcessor } from "../../nexusgraph-nlp/src/processor/RemoteNaturalLanguageProcessor";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_NLPDATA, GlobalState } from "../../nexusgraph-provider";
import { useLogto } from "@logto/react";
import logo from "../public/app-logo.svg";
import { NaturalLanguageProcessorProvider } from "../../nexusgraph-nlp";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const remoteNaturalLanguageProcessor =
    NaturalLanguageProcessorProvider.get<RemoteNaturalLanguageProcessor>(RemoteNaturalLanguageProcessor);
  const dispatch = useDispatch();
  const entityExtrationTexts: string[] = useSelector((state: GlobalState) => state.editorLine);
  const { signIn, isAuthenticated } = useLogto();

  useEffect(() => {
    if (entityExtrationTexts.length > 0) {
      remoteNaturalLanguageProcessor.entityExtraction(entityExtrationTexts).then((NlpState) => {
        dispatch({ type: UPDATE_NLPDATA, payload: NlpState });
      });
    }
  }, [entityExtrationTexts, dispatch]);

  if (isAuthenticated) {
  return (
    <AppWrapper>
      <EditorWrapper>
        <EditorGlassCover>
          <IconWapper>
            <img src={logo} alt="Logo" />
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

  if (process.env.NODE_ENV == "production") {
    signIn("https://app.nexusgraph.com/login");
  }

  if (process.env.NODE_ENV == "development") {
    signIn("http://localhost:8080/login");
  }

  return <></>;
}
