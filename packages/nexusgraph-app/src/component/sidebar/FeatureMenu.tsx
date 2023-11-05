// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { t } from "../../../../nexusgraph-i18n";
import { NLPClient } from "../../../../nexusgraph-nlp";
import { GraphState, INITIAL_GRAPH_NAME, updateGraphData } from "../../../../nexusgraph-redux";
import { container, TYPES } from "../../../inversify.config";
import { FeatureButton, IntelligentAITextarea } from "./styled";

const nlpClient: NLPClient = container.get<NLPClient>(TYPES.NLPClient);

export function FeatureMenu({ onClose, setShowAlert }: { onClose: () => void; setShowAlert: any }): JSX.Element {
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
        <IntelligentAIDialogBody onClose={onClose} setShowAlert={setShowAlert}></IntelligentAIDialogBody>
      )}
    </>
  );
}

function IntelligentAIDialogBody({ onClose, setShowAlert }: { onClose: () => void; setShowAlert: any }): JSX.Element {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

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
    });

    onClose();
  };

  return (
    <IntelligentAITextarea buttonDisable={buttonDisable}>
      <textarea
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>生成知识图谱</button>
      </div>
    </IntelligentAITextarea>
  );
}
