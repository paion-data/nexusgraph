// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { StyledGraphListItem } from "../styled";
import { MethodModal } from "./MethodModal";
import { Method } from "./methods";
import { MethodsSelectionModal } from "./MethodsSelectionModal";

/**
 * {@link NewGraphButton} controls 2 modals:
 *
 * 1. {@link | NewGraphMethodModal the model that displays available options to generate a new graph}
 * 2. {@link | MethodModal the modal corresponding to one of the options}
 *
 * Only one of the two modals pops up at a specific time and {@link NewGraphButton} controls which one to display using
 * `showMethodsSelectionModal` and `showMethodModal` React states
 *
 * @param props  The regular React props for {@link NewGraphButton}
 *
 * @returns a DOM object
 */
export default function NewGraphButton(): JSX.Element {
  const [showMethodsSelectionModal, setShowMethodsSelectionModal] = useState<boolean>(false);
  const [showMethodModal, setShowMethodModal] = useState<boolean>(false);
  const [newGraphMethod, setNewGraphMethod] = useState<Method | null>(null);

  useEffect(() => {
    if (newGraphMethod) {
      setShowMethodModal(true);
    }
  }, [newGraphMethod]);

  useEffect(() => {
    if (!showMethodModal && !showMethodsSelectionModal) {
      setNewGraphMethod(null);
    }
  }, [showMethodModal]);

  return (
    <>
      <StyledGraphListItem id="newGraphButton" onClick={() => setShowMethodsSelectionModal(true)}>
        <PlusIcon />
      </StyledGraphListItem>

      <MethodsSelectionModal
        showModal={showMethodsSelectionModal}
        setShowModal={setShowMethodsSelectionModal}
        setNewGraphMethod={setNewGraphMethod}
      />

      {newGraphMethod && (
        <MethodModal showModal={showMethodModal} setShowModal={setShowMethodModal} newGraphMethod={newGraphMethod} />
      )}
    </>
  );
}
