// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { CreateButtonStyled, FeatureButton, TextareaModalStyled, ModalStyled, ModalOverlay } from "./styled";
import {useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import nlpLogo from "./img/nlp.png"

export default function CreateButton(): JSX.Element {
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <CreateButtonStyled onClick={() => {
        setShowModal(true)
        }}>
        <PlusIcon />
      </CreateButtonStyled>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  )
}

export function ModalContent({ onClose }: any): JSX.Element { 
  const [showInputModal, setShowInputModal] = useState(false);
  const [element, setElement] = useState(document.getElementById("modalContent"));
  useEffect(() => {
      setElement(document.getElementById("modalContent"))
  }, [element])

  return (
      <ModalStyled className="modal" id={"modalContent"}>
        {/* <ModalOverlay> */}
        <button className="modalClose" onClick={onClose}>X</button>
        <FeatureButton onClick={() => {
          if(element){
            element?.remove()
            setElement(document.getElementById("modalContent"))
          }
            setShowInputModal(true)
        }}>
          <p>智能AI</p>
          <img src={nlpLogo} alt="Logo"></img>

          {showInputModal && createPortal(
            <TextareaModal 
            onClose={() => {}
            } 
            />,
            document.body
          )}
        </FeatureButton>
        {/* </ModalOverlay> */}
      </ModalStyled>
  );
}

export function TextareaModal({ onClose }: any): JSX.Element {
  return (
    <TextareaModalStyled id="textarea">
      <button className="modalClose" onClick={() => {
      document.getElementById("textarea")?.remove()
      }}>X</button>
      <textarea></textarea>
    </TextareaModalStyled>
  )
}
