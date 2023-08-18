// Copyright 2023 Paion Data. All rights reserved.
import ColorPicker from "./ColorPicker";
import DropDown from "./DropDown/DropDown";

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
 * Combine fontcolor button and fontcolor dropdown menu
 *
 * @param param0
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
