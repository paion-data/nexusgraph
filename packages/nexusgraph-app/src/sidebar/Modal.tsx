// Copyright 2023 Paion Data. All rights reserved.
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ModalOverlay, ModalWapper } from "./styled";

interface ModalProps {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
}

function Portal(props: ModalProps): JSX.Element {
  return (
    <ModalOverlay role="dialog">
      <ModalWapper>
        <button className="modalClose" onClick={props.onClose}>
          X
        </button>
        <div className="modalContent">{props.children}</div>
      </ModalWapper>
    </ModalOverlay>
  );
}

export default function Modal(props: ModalProps): JSX.Element {
  return createPortal(
    <Portal onClose={props.onClose} closeOnClickOutside={props.closeOnClickOutside}>
      {props.children}
    </Portal>,
    document.body
  );
}
