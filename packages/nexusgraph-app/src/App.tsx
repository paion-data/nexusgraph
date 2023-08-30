// Copyright 2023 Paion Data. All rights reserved.
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { AppWrapper, EditorCaption, EditorWrapper, EditorGlassCover, GraphBrowserWrapper, IconWapper } from "./styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_NLPDATA, GlobalState } from "../../nexusgraph-provider";
import { useLogto } from "@logto/react";
import logo from "../public/app-logo.svg";
import { EditorButtonGroup } from "./editor-button-group/EditorButtonGroup";
import { container, TYPES } from "../inversify.config";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import { AstraiosClient } from "../../nexusgraph-astraios";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const { signIn, isAuthenticated } = useLogto();

  if (isAuthenticated) {
    const dispatch = useDispatch();

    const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
      TYPES.NaturalLanguageProcessor
    );
    const entityExtrationState: object = useSelector((state: GlobalState) => state.editor);

    const storageProcessor: AstraiosClient = container.get<AstraiosClient>(
      TYPES.AstraiosStorageProcessor
    );
    storageProcessor.saveOrUpdate(useSelector((state: GlobalState) => state.astraios));

    useEffect(() => {
      if (JSON.stringify(entityExtrationState) !== "{}") {
        remoteNaturalLanguageProcessor.entityExtraction(entityExtrationState).then((NlpState) => {
          dispatch({ type: UPDATE_NLPDATA, payload: NlpState });
        });
      }
    }, [entityExtrationState]);

    return (
      <AppWrapper>
        <EditorWrapper>
          <EditorGlassCover>
            <IconWapper>
              <img src={logo} alt="Logo" />
            </IconWapper>
            <EditorCaption className="h1">Nexus Graph</EditorCaption>
            <EditorButtonGroup />
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
