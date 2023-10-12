// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getIntelligentAIContent } from "../../../nexusgraph-redux";
import { FeatureButton, IntelligentAITextarea } from "./styled";

export function FeatureMenu({ onClose }: { onClose: () => void }): JSX.Element {
  const [mode, setMode] = useState<null | "intelligentAI">(null);

  return (
    <>
      {!mode && (
        <FeatureButton onClick={() => setMode("intelligentAI")}>
          <p>智能AI</p>
        </FeatureButton>
      )}
      {mode === "intelligentAI" && <IntelligentAIDialogBody onClose={onClose}></IntelligentAIDialogBody>}
    </>
  );
}

function IntelligentAIDialogBody({ onClose }: { onClose: () => void }): JSX.Element {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(getIntelligentAIContent(inputValue));
    onClose();
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
