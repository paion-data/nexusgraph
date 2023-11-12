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
import { StyledNLPTextArea } from "./styled";

const nlpClient: NLPClient = container.get<NLPClient>(TYPES.NLPClient);

export const NLP_METHOD = "NLP";

export type METHOD = typeof NLP_METHOD;

interface MethodProps {
  setShowAlert: (showAlert: boolean) => void;
  postAction: () => void;
}

export function NLPMethod(props: MethodProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const userId = selectOAuth().userInfo.sub;
  const accessToken = selectOAuth().accessToken;
  const astraiosClient = new AstraiosClient(userId, accessToken);

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
        props.setShowAlert(true);
        return;
      }

      astraiosClient
        .saveOrUpdate({ id: undefined, ...graph, name: INITIAL_GRAPH_NAME })
        .then((response) => {
          const graphId = response.data.data.graph.edges[0]["node"]["id"];
          const graphName = response.data.data.graph.edges[0]["node"]["name"];

          dispatch(updateGraphData({ id: graphId, ...graph, name: graphName }));
          dispatch(appendToGraphList({ id: graphId, name: graphName }));
        })
        .catch((error) => Sentry.captureException(error));
    });

    props.postAction();
  };

  return (
    <StyledNLPTextArea buttonDisable={buttonDisable}>
      <textarea
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>{t("generateGraphFromText")}</button>
      </div>
    </StyledNLPTextArea>
  );
}
