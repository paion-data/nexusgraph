// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import { FeatureMenu } from "./FeatureMenu";
import { StyledModal, StyledModalContent, StyledNewGraphButton } from "./styled";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
}

export default function NewGraphButton({ setShowAlert }: any): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;

  return (
    <>
      <StyledNewGraphButton id="newGraphButton" onClick={() => setShowModal(true)}>
        <PlusIcon />
      </StyledNewGraphButton>
      <StyledModal
        out={!showModal}
        id={"modal"}
        animation={true}
        show={showModal}
        onHide={() => setShowModal(false)}
        role="dialog"
      >
        <StyledModalContent>
          <div className="modalContent">
            <FeatureMenu setShowAlert={setShowAlert} />
          </div>
        </StyledModalContent>
      </StyledModal>
    </>
  );
}
