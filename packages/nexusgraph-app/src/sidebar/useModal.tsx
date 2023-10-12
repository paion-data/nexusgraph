// Copyright 2023 Paion Data. All rights reserved.
import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";

export default function useModal(
  show: boolean
): [JSX.Element | null, (showModal: (onClose: () => void) => JSX.Element) => void] {
  const [modalContent, setModalContent] = useState<null | JSX.Element>(null);
  const [modalShown, setModalShown] = useState(false);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }

    return (
      <Modal show={modalShown} onClose={onClose}>
        {modalContent}
      </Modal>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (getContent: (onClose: () => void) => JSX.Element) => {
      setModalShown(true);
      setModalContent(getContent(onClose));
    },
    [onClose]
  );

  return [modal, showModal];
}
