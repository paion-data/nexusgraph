// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { CreateButtonStyled } from "./styled";
import useModal from "./useModal";
import { FeatureMenu } from "./FeatureMenu";

export default function CreateButton(): JSX.Element {
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const [modal, showModal] = useModal();

  return (
    <>
      <CreateButtonStyled onClick={() => {
        showModal((onClose) => (
          <FeatureMenu onClose={onClose} />
        ));
      }}>
        <PlusIcon />
      </CreateButtonStyled>
      {modal}
    </>
  )
}
