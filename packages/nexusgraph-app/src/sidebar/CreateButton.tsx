// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FeatureMenu } from "./FeatureMenu";
import { CreateButtonStyled } from "./styled";
import useModal from "./useModal";

export default function CreateButton(): JSX.Element {
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [modal, showModal] = useModal(show, setShow);

  return (
    <>
      <CreateButtonStyled
        id="createButton"
        onClick={() => {
          handleShow();
          showModal((onClose) => <FeatureMenu onClose={onClose} />);
        }}
      >
        <PlusIcon />
      </CreateButtonStyled>
      {modal}
    </>
  );
}
