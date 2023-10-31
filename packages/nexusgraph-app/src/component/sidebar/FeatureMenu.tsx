// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "../../../../nexusgraph-i18n";
import { NaturalLanguageProcessor } from "../../../../nexusgraph-nlp";
import { updateNlpData } from "../../../../nexusgraph-redux";
import { container, TYPES } from "../../../inversify.config";
import { FeatureButton, IntelligentAITextarea } from "./styled";

const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
  TYPES.NaturalLanguageProcessor
);

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
    remoteNaturalLanguageProcessor.entityExtraction(inputValue as string).then((nlpState) => {
      dispatch(updateNlpData(nlpState));
      if (nlpState.nodes.length == 0) {
        setShowAlert(true);
      }

      saveGraph()
      updateGraphList()
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
