// Copyright 2023 Paion Data. All rights reserved.

import { Button, Modal } from "react-bootstrap";
import { Method, NLP_METHOD } from "./methods";

interface MethodsSelectionModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setNewGraphMethod: (newGraphMethod: Method) => void;
}

/**
 * {@link MethodsSelectionModal} is an abstraction layer for showing graph generation stratities in a modal.
 *
 * The implementation uses [react-bootstrap modal](https://react-bootstrap.netlify.app/docs/components/modal). Parent
 * components, however, must be agnostic of this implementation detail. For example, they should not need to pass
 * [react-component Modal API props](https://react-bootstrap.netlify.app/docs/components/modal#modal)
 *
 * @param props  A implementation detail independent React props object
 *
 * @returns a [standard Modal DOM](https://developer.mozilla.org/en-US/docs/Web/CSS/:modal)
 */
export function MethodsSelectionModal(props: MethodsSelectionModalProps) {
  const onHide = () => props.setShowModal(false);

  return (
    <Modal show={props.showModal} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Please select a method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          data-testid="newGraphMethodButton-NLP"
          variant="primary"
          onClick={() => {
            props.setNewGraphMethod(NLP_METHOD);
            props.setShowModal(false);
          }}
        >
          NLP
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
