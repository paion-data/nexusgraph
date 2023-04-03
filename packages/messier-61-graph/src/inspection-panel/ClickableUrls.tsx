// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

const URL_REGEX =
  /(?:https?|s?ftp|bolt):\/\/(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/gi;

interface ClickableUrlsProps {
  text?: string | null;
  WrappingTag?: keyof JSX.IntrinsicElements | React.ElementType;
}

//When the value passed in is a url, you can enter the link
export function ClickableUrls({ text, WrappingTag = "span" }: ClickableUrlsProps): JSX.Element {
  const definedText = text || "";
  const urls = definedText.match(URL_REGEX) || [];
  return (
    <WrappingTag>
      {definedText.split(URL_REGEX).map((text, index) => {
        return (
          <React.Fragment key={index}>
            {text}
            {urls[index] && (
              <a href={urls[index]} target="_blank" rel="noreferrer">
                {urls[index]}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </WrappingTag>
  );
}
