// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useSpring } from "react-spring";
import { t } from "../../../nexusgraph-i18n";
import { AlertCloseButton, AlertContent, AlertFooter } from "../sidebar/styled";
import { StyledAlert } from "./styled";

export default function Alert({ showAlert, setShowAlert, alertContent, x, y }: any) {
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
    <StyledAlert style={props} id={"alert"} x={x} y={y}>
      <AlertContent>{alertContent}</AlertContent>
      <AlertFooter>
        <AlertCloseButton onClick={handleClode}>{closeButtonContent}</AlertCloseButton>
      </AlertFooter>
    </StyledAlert>
  );
}
