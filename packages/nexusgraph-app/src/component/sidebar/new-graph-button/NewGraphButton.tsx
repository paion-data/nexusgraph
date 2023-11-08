// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { StyledModal, StyledModalContent, StyledNewGraphButton } from "../styled";
import { FeatureMenu } from "./FeatureMenu";

interface NewGraphButtonProps {
  setShowAlert: (showAlert: boolean) => void;
}

export default function NewGraphButton(props: NewGraphButtonProps): JSX.Element {
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
            <FeatureMenu setShowAlert={props.setShowAlert} />
          </div>
        </StyledModalContent>
      </StyledModal>
    </>
  );
}
