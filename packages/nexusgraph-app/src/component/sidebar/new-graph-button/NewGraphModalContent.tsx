// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../../../../nexusgraph-astraios";
import { t } from "../../../../../nexusgraph-i18n";
import { NLPClient } from "../../../../../nexusgraph-nlp";
import {
  appendToGraphList,
  GraphState,
  INITIAL_GRAPH_NAME,
  selectOAuth,
  updateGraphData,
} from "../../../../../nexusgraph-redux";
import { container, TYPES } from "../../../../inversify.config";
import { FeatureButton, IntelligentAITextarea } from "../styled";

const astraiosClient = new AstraiosClient();
const nlpClient: NLPClient = container.get<NLPClient>(TYPES.NLPClient);

interface NewGraphModalContentProps {
  setShowAlert: (showAlert: boolean) => void;
}

export function NewGraphModalContent(props: NewGraphModalContentProps): JSX.Element {
  const [mode, setMode] = useState<null | "intelligentAI">(null);
  const buttonLable = t("nlpButton");

  return (
    <>
      {!mode && (
        <FeatureButton onClick={() => setMode("intelligentAI")}>
          <p>{buttonLable}</p>
        </FeatureButton>
      )}
      {mode === "intelligentAI" && (
        <IntelligentAIDialogBody setShowAlert={props.setShowAlert}></IntelligentAIDialogBody>
      )}
    </>
  );
}

function IntelligentAIDialogBody({ setShowAlert }: { setShowAlert: any }): JSX.Element {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const userId = selectOAuth().userInfo.sub;
  const accessToken = selectOAuth().accessToken;

  const dispatch = useDispatch();

  useEffect(() => {
    if (inputValue) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [inputValue]);

  const onClick = () => {
    nlpClient.entityExtraction(inputValue as string).then((graph) => {
      if (graph.nodes.length == 0) {
        setShowAlert(true);
        return;
      }

      const graphState: GraphState = { id: undefined, ...graph, name: INITIAL_GRAPH_NAME };
      dispatch(updateGraphData(graphState));

      astraiosClient
        .saveOrUpdate(graphState, userId, accessToken)
        .then((response) => {
          const graphId = response.data.data.graph.edges[0]["node"]["id"];
          const graphName = response.data.data.graph.edges[0]["node"]["name"];

          dispatch(appendToGraphList({ id: graphId, name: graphName }));
        })
        .catch((error) => Sentry.captureException(error));
    });
  };

  return (
    <IntelligentAITextarea buttonDisable={buttonDisable}>
      <textarea
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>{t("generateGraphFromText")}</button>
      </div>
    </IntelligentAITextarea>
  );
}
