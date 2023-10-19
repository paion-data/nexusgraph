// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useSpring } from "react-spring";
import { t } from "../../../nexusgraph-i18n";
import { AlertCloseButton, AlertContent, AlertFooter, StyledAlert } from "../sidebar/styled";

export default function Alert({ showAlert, setShowAlert }: any) {
  const alertContent = t("alertContent");
  const closeButtonContent = t("alertCloseButton");

  useEffect(() => {
    if (!showAlert) return;
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [showAlert]);

  const props = useSpring({
    transform: showAlert ? "scale(1)" : "scale(0)",
    opacity: showAlert ? 1 : 0,
  });

  function handleClode() {
    setShowAlert(false);
  }

  return (
    <StyledAlert style={props} id={"alert"}>
      <AlertContent>{alertContent}</AlertContent>
      <AlertFooter>
        <AlertCloseButton onClick={handleClode}>{closeButtonContent}</AlertCloseButton>
      </AlertFooter>
    </StyledAlert>
  );
}
