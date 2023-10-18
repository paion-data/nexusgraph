// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { t } from "../../../nexusgraph-i18n";
import { AlertCloseButton, AlertContent, AlertFooter, StyledAlert } from "../sidebar/styled";

export default function Alert({ setShowAlert }: any) {
  const [active, setActive] = useState(true);

  const alertContent = t("alertContent");
  const closeButtonContent = t("alertCloseButton");

  useEffect(() => {
    if (!active) return;
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
      setActive(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [active]);

  const props = useSpring({
    transform: active ? "scale(1)" : "scale(0)",
    opacity: active ? 1 : 0,
  });

  function handleClode() {
    setActive(false);
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
