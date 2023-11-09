// Copyright 2023 Paion Data. All rights reserved.
import { StyledModal, SyledModalContent } from "./styled";

interface MethodModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
  modalContent: JSX.Element;
}

export function MethodModal(props: MethodModalProps): JSX.Element {
  return (
    <>
      <StyledModal
        out={!props.showModal}
        id={"newGraphMethodModal"}
        animation={true}
        show={props.showModal}
        onHide={() => props.setShowModal(false)}
        role="dialog"
      >
        <SyledModalContent>{props.modalContent}</SyledModalContent>
      </StyledModal>
    </>
  );
}
