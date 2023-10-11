// Copyright 2023 Paion Data. All rights reserved.
import { ReactNode, useEffect, useRef, useState } from "react";
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

  const modalRef = useRef<HTMLDivElement>(null);
  const modalOpen: boolean = document.activeElement?.getAttribute("class") == "modal-open";

  useEffect(() => {
    window.addEventListener("click", () => {
      if (modalRef.current && modalOpen == false) {
        console.log("close");
        // setShow(false);
      } else {
        setShow(true);
      }
    });

    return () => {
      window.removeEventListener("click", () => {
        console.log("on click");
      });
    };
  }, []);

  return (
    <ModalOverlay id={"modal"} show={show} onHide={handleClose} role="dialog">
      <ModalWapper>
        <button className="modalClose" onClick={props.onClose}>
          X
        </button>
        <div className="modalContent" ref={modalRef}>
          {props.children}
        </div>
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
