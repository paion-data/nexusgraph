// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { FeatureMenu } from "./FeatureMenu";
import { CreateButtonStyled } from "./styled";
import useModal from "./useModal";

export default function CreateButton(): JSX.Element {
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const [modal, showModal] = useModal(false);

  return (
    <>
      <CreateButtonStyled
        id="createButton"
        onClick={() => {
          showModal((onClose) => <FeatureMenu onClose={onClose} />);
        }}
      >
        <PlusIcon />
      </CreateButtonStyled>
      {modal}
    </>
  );
}
