// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { MethodModal } from "./MethodModal";
import { NLPMethod, NLP_METHOD } from "./methods";
import { MethodsSelectionModal } from "./MethodsSelectionModal";
import { StyledNewGraphButton } from "./styled";

const PlusIcon = (): JSX.Element => <PlusIconSolid />;

interface NewGraphButtonProps {
  setShowAlert: (showAlert: boolean) => void;
}

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
export default function NewGraphButton(props: NewGraphButtonProps): JSX.Element {
  const [showMethodsSelectionModal, setShowMethodsSelectionModal] = useState<boolean>(false);
  const [showMethodModal, setShowMethodModal] = useState<boolean>(false);
  const [method, setMethod] = useState<string | null>(null);

  const methodsToIcon = new Map();
  methodsToIcon.set(NLP_METHOD, "to be replaced by some svg icon component");

  useEffect(() => {
    if (method) {
      setShowMethodsSelectionModal(false);
      setShowMethodModal(true);
    }

    if (!showMethodModal) {
      // this condition guarantees the previous value of showMethodModal must be "true"
      // hence it signifies a model close
      setMethod(null);
    }
  }, [method, showMethodModal]);

  return (
    <>
      <StyledNewGraphButton id="newGraphButton" onClick={() => setShowMethodsSelectionModal(true)}>
        <PlusIcon />
      </StyledNewGraphButton>

      <MethodsSelectionModal
        showModal={showMethodsSelectionModal}
        setShowModal={setShowMethodsSelectionModal}
        setNewGraphMethod={setMethod}
        setShowAlert={props.setShowAlert}
        methodsToIcon={methodsToIcon}
      />

      <MethodModal
        showModal={showMethodModal}
        setShowModal={setShowMethodModal}
        setShowAlert={props.setShowAlert}
        modalContent={
          <NLPMethod
            setShowAlert={props.setShowAlert}
            postAction={() => {
              setShowMethodsSelectionModal(false);
              setShowMethodModal(false);
            }}
          />
        }
      />
    </>
  );
}
