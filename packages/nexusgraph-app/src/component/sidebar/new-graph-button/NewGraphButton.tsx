// Copyright 2023 Paion Data. All rights reserved.
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { StyledNewGraphButton } from "../styled";
import { MethodModal } from "./MethodModal";
import { NLPMethod, NLP_METHOD } from "./methods";
import { MethodsSelectionModal } from "./MethodsSelectionModal";

const PlusIcon = (): JSX.Element => <PlusIconSolid />;

interface NewGraphButtonProps {
  setShowAlert: (showAlert: boolean) => void;
}

/**
 * {@link NewGraphButton} controls 2 modals:
 *
 * 1. {@link | NewGraphMethodModal A new graph generation method modal}
 * 2.
 *
 * The rerendering of {@link NewGraphButton} will basically be triggered by the toggling of these two modals.
 *
 * @param props
 * @returns
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
