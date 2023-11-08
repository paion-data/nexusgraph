// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { FeatureMenu } from "./FeatureMenu";
import { StyledNewGraphButton } from "./styled";
import useModal from "./useModal";

export default function NewGraphButton({ setShowAlert }: any): JSX.Element {
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const [modal, showModal] = useModal(false);

  return (
    <>
      <StyledNewGraphButton
        id="createButton"
        onClick={() => {
          showModal((onClose) => <FeatureMenu onClose={onClose} setShowAlert={setShowAlert} />);
        }}
      >
        <PlusIcon />
      </StyledNewGraphButton>
      {modal}
    </>
  );
}
