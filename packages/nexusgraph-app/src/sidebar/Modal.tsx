// Copyright 2023 Paion Data. All rights reserved.
import { ReactNode, useEffect, useState } from "react";
import { ModalOverlay, ModalWapper } from "./styled";

interface ModalProps {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
  show: boolean;
}

function Portal(props: ModalProps): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const clickFeatureMenu: boolean = document.activeElement?.getAttribute("class") == "modal-open";
  const clickCreateButton: boolean = document.activeElement?.getAttribute("id") == "createButton";

  useEffect(() => {
    if (clickFeatureMenu || clickCreateButton) {
      setShow(true);
    }
  }, [document.activeElement]);

  return (
    <ModalOverlay id={"modal"} animation={true} show={show} onHide={handleClose} role="dialog">
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
  return (
    <Portal show={props.show} onClose={props.onClose} closeOnClickOutside={props.closeOnClickOutside}>
      {props.children}
    </Portal>
  );
}
