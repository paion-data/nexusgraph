// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";
import { FeatureButton, IntelligentAITextarea } from "./styled";
import nlpLogo from "./img/nlp.png"

export function FeatureMenu({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element {
  const [mode, setMode] = useState<null | 'intelligentAI'>(null);

  return (
    <>
      {!mode && (
      <FeatureButton
      onClick={() => setMode('intelligentAI')}
      >
        <p>智能AI</p>
        <img src={nlpLogo} alt="Logo"></img>
      </FeatureButton>
      )}
       {mode === 'intelligentAI' && <IntelligentAIDialogBody onClose={onClose}></IntelligentAIDialogBody>}
    </>
  )
}

function IntelligentAIDialogBody({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const onClick = () => {
    
    onClose();
  };

  return(
    <IntelligentAITextarea>
      <textarea
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      ></textarea>
      <button onClick={onClick}>生成知识图谱</button>
    </IntelligentAITextarea>
    )
}
