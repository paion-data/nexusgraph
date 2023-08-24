// Copyright 2023 Paion Data. All rights reserved.
import ColorPicker from "./ColorPicker";
import DropDown from "./DropDown";

type Props = {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  title?: string;
  stopCloseOnClickSelf?: boolean;
  color: string;
  onChange?: (color: string) => void;
};

/**
 * Implement color selection drop-down box
 *
 * @param disabled false ，Do not disable button
 * @param stopCloseOnClickSelf ture ，The implementation can continue color selection until you click outside the color selection box
 * @param color The default color value passed in
 * @param onChange The event function for updating font color or background color
 * @param buttonAriaLabel Provides an accessible name for the button element
 * @param buttonClassName Provides an classname for the button element
 * @param buttonIconClassName Provides an classname for the icon element
 *
 * @returns fontcolor button and fontcolor dropdown menu
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
