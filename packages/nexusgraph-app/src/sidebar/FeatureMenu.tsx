// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";
import { useDispatch } from "react-redux";
import { t } from "../../../nexusgraph-i18n";
import { getIntelligentAIContent, selectNlpData } from "../../../nexusgraph-redux";
import { FeatureButton, IntelligentAITextarea } from "./styled";

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

  const dispatch = useDispatch();
  const nlpData = selectNlpData().nodes;

  const onClick = () => {
    dispatch(getIntelligentAIContent(inputValue));
    onClose();
    if (inputValue == null || nlpData.length == 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  return (
    <IntelligentAITextarea>
      <textarea
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      ></textarea>
      <button onClick={onClick}>生成知识图谱</button>
    </IntelligentAITextarea>
  );
}
