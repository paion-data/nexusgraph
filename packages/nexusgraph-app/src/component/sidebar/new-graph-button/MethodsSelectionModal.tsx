// Copyright 2023 Paion Data. All rights reserved.
import { StyledModal, StyledNewGraphMethodButton, StyledModalContent } from "./styled";

interface MethodsSelectionModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
  setNewGraphMethod: (newGraphMethod: string) => void;
  methodsToIcon: Map<string, string>;
}

/**
 * Symmetrical with {@link MethodModal} who accepts modal contents as arg, {@link MethodsSelectionModal} takes available
 * options as arg
 * @param props
 * @returns
 */
export function MethodsSelectionModal(props: MethodsSelectionModalProps): JSX.Element {
  return (
    <StyledModal
      out={!props.showModal}
      id={"newGraphMethodsSelectionModal"}
      animation={true}
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
      role="dialog"
    >
      <StyledModalContent className="newGraphMethodsSelectionModalContent">
        {[...props.methodsToIcon.keys()].map((key) => {
          return (
            <StyledNewGraphMethodButton id={"newGraphMethodButton-" + key} onClick={() => props.setNewGraphMethod(key)}>
              <svg width="50%" height="50%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path
                  fill="#000000"
                  fill-rule="evenodd"
                  d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h9v-5a3 3 0 0 1 3-3h5V5a3 3 0 0 0-3-3H5zm12.293 19.121a3 3 0 0 1-1.293.762V17a1 1 0 0 1 1-1h4.883a3 3 0 0 1-.762 1.293l-3.828 3.828zM7 6a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </StyledNewGraphMethodButton>
          );
        })}
      </StyledModalContent>
    </StyledModal>
  );
}
