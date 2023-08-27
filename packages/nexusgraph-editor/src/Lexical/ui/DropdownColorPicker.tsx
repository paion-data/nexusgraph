// Copyright 2023 Paion Data. All rights reserved.
import ColorPicker from "./ColorPicker";
import DropDown from "./DropDown";

type Props = {
  /**
   * The disabled property of [button](https://www.w3schools.com/tags/tag_button.asp)
   */
  disabled?: boolean;

  /**
   * [Provides an accessible name for the button element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
   */
  buttonAriaLabel?: string;

  /**
   * Provides an classname for the button element
   */
  buttonClassName: string;

  /**
   * Provides an classname for the icon element
   */
  buttonIconClassName?: string;

  /**
   * The value selected in the drop-down box
   */
  buttonLabel?: string;

  /**
   * Used to distinguish font color and font background color DropdownColorPicker components，not a tooltip
   */
  title?: string;

  /**
   * A state variable acts the [hook](https://www.w3schools.com/react/react_useeffect.asp) of dropdown component that enables continuous color selection
   */
  stopCloseOnClickSelf?: boolean;

  /**
   * A color [state](https://react.dev/reference/react/useState) variable declared in the ToolbarPlugin component. Used to update color values
   */
  color: string;

  /**
   * onChange The regular [onChange](https://www.w3schools.com/jsref/event_onchange.asp) callback function that acts on the color of selection
   */
  onChange?: (color: string) => void;
};

/**
 * 'DropdownColorPicker' is a wrapper for' ColorPicker 'and' DropDown ', used in the editor for color selection
 *
 * @param Props
 *
 * @returns DropdownColorPicker component
 */
export default function DropdownColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  onChange,
  ...rest
}: Props) {
  return (
    <DropDown {...rest} disabled={disabled} stopCloseOnClickSelf={stopCloseOnClickSelf}>
      <ColorPicker color={color} onChange={onChange} />
    </DropDown>
  );
}
