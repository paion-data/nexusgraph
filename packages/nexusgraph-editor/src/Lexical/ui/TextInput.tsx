// Copyright 2023 Paion Data. All rights reserved.
import { HTMLInputTypeAttribute } from "react";

type Props = Readonly<{
  /**
   * An attribute used to identify DOM nodes for [testing](https://testing-library.com/docs/queries/bytestid/)
   */
  "data-testid"?: string;

  /**
   * The [label](https://www.w3schools.com/tags/tag_label.asp) for the wrapped <input> element
   */
  label: string;

  /**
   * The regular [onChange](https://www.w3schools.com/jsref/event_onchange.asp) callback function that acts on the contents of the input box
   */
  onChange: (val: string) => void;

  /**
   * The [placeholder](https://www.w3schools.com/tags/att_input_placeholder.asp) attribute specifies a short hint that describes the expected value of an input field
   */
  placeholder?: string;

  /**
   * The [value](https://www.w3schools.com/tags/att_input_value.asp) attribute specifies the value of an <input> element.
   */
  value: string;

  /**
   * The <input> element can be displayed in a variety of ways by [type](https://www.w3schools.com/tags/tag_input.asp),such as checkbox, file, etc.
   */
  type?: HTMLInputTypeAttribute;
}>;

/**
 * `TextInput` is a wrapper of [HTML input](https://www.w3schools.com/tags/tag_input.asp) and is used in Editor for various form inputs
 *
 * @param Props
 *
 * @returns The JSX for text input
 */
export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  "data-testid": dataTestId,
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
        data-testid={dataTestId}
      />
    </div>
  );
}
