// Copyright 2023 Paion Data. All rights reserved.
import { HTMLInputTypeAttribute } from "react";

type Props = Readonly<{
  "data-test-id"?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
}>;

/**
 * Implement text input
 *
 * @param label The prompt text of the input box
 * @param value Content of input box
 * @param onChange A event function that changes the contents of the input box in real time
 * @param placeholder The default value of the input box is empty
 * @param dataTestId An attribute used to identify DOM nodes for testing
 * @param type The type of input
 *
 * @returns The JSX for text input
 */
export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  "data-test-id": dataTestId,
  type = "text",
}: Props): JSX.Element {
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <input
        type={type}
        className="Input__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        data-test-id={dataTestId}
      />
    </div>
  );
}
