// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from "react";
import styled from "styled-components";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

const SMALL_SIZE = 15;

interface WidthProps {
  width?: number;
}
const CopyIcon = ({ width = SMALL_SIZE }: WidthProps): JSX.Element => (
  <DocumentDuplicateIcon width={width} height={width} />
);

interface ClipboardCopierProps {
  textToCopy: string;
  iconSize?: number;
  titleText?: string;
  messageOnSuccess?: string;
  messageOnFailure?: string;
}

export function ClipboardCopier({
  textToCopy: text,
  iconSize = 16,
  titleText = "Copy to clipboard",
  messageOnSuccess = "✔️ Copied to clipboard",
  messageOnFailure = "Copying text failed",
}: ClipboardCopierProps): JSX.Element {
  const [messageToShow, setMessageToShow] = useState<string | null>(null);
  function showPopup(text: string) {
    setMessageToShow(text);
    setTimeout(() => setMessageToShow(null), 1500);
  }

  return (
    <CopyIconContainer
      onClick={() =>
        copyToClipboard(text)
          .then(() => showPopup(messageOnSuccess))
          .catch(() => showPopup(messageOnFailure))
      }
      title={titleText}
    >
      <CopyIcon width={iconSize} />
      {messageToShow && <InfoPopup text={messageToShow} />}
    </CopyIconContainer>
  );
}

const CopyIconContainer = styled.span`
  cursor: pointer;
  position: relative;
  color: ${(props) => props.theme.frameControlButtonTextColor};
  font-size: 12px;
`;

interface InfoPopupProps {
  text: string;
}
function InfoPopup({ text }: InfoPopupProps) {
  return <PopupTextContainer> {text} </PopupTextContainer>;
}

const PopupTextContainer = styled.span`
  position: absolute;
  white-space: nowrap;
  right: 20px;
  bottom: 0;
  border-radius: 2px;
  background-color: ${(props) => props.theme.frameSidebarBackground};
  box-shadow: ${(props) => props.theme.standardShadow};
  color: ${(props) => props.theme.primaryText}
  font-family: ${(props) => props.theme.drawerHeaderFontFamily};
  padding: 0 5px;
`;

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    /*See 
    ["Chained Promises"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#chained_promises)
    */
    return new Promise<void>((resolve, reject) => {
      document.execCommand("copy") ? resolve() : reject();
      textArea.remove();
    });
  }
}
