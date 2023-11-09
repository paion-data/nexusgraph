// Copyright 2023 Paion Data. All rights reserved.
import { AstraiosClient } from "../../../../../nexusgraph-astraios";
import { t } from "../../../../../nexusgraph-i18n";
import { NLPClient } from "../../../../../nexusgraph-nlp";
import { container, TYPES } from "../../../../inversify.config";
import { StyledModal, StyledNewGraphMethodButton, SyledModalContent } from "./styled";

const astraiosClient = new AstraiosClient();
const nlpClient: NLPClient = container.get<NLPClient>(TYPES.NLPClient);

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
    <>
      <StyledModal
        out={!props.showModal}
        id={"newGraphMethodsSelectionModal"}
        animation={true}
        show={props.showModal}
        onHide={() => props.setShowModal(false)}
        role="dialog"
      >
        <SyledModalContent>
          <div className="newGraphMethodsSelectionModalContent">
            {[...props.methodsToIcon.keys()].map((key) => {
              return (
                <StyledNewGraphMethodButton onClick={() => props.setNewGraphMethod(key)}>
                  {t(key)}
                </StyledNewGraphMethodButton>
              );
            })}
          </div>
        </SyledModalContent>
      </StyledModal>
    </>
  );
}
