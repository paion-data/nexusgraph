// Copyright 2023 Paion Data. All rights reserved.
import { FontDropDown } from "../plugins/ToolbarPlugin/styled";
import * as React from "react";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DropDownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const DropDownContext = React.createContext<DropDownContextType | null>(null);

const dropDownPadding = 4;

/**
 * DropDownItem is a reuse wrapper for `button`
 *
 * @param children Children lets you manipulate and transform the JSX you received as the [children prop](https://react.dev/reference/react/Children).
 * @param className Set the [class attribute](https://www.w3schools.com/jsref/prop_html_classname.asp) for an button element:
 * @param onClick The [onclick](https://www.w3schools.com/jsref/event_onclick.asp) event occurs when the user clicks on an HTML element.
 * @param title The [title attribute](https://www.w3schools.com/tags/att_global_title.asp) specifies extra information about an bubtton element.
 *
 * @returns single button
 */
export function DropDownItem({
  children,
  className,
  onClick,
  title,
}: {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const dropDownContext = React.useContext(DropDownContext);

  if (dropDownContext === null) {
    throw new Error("DropDownItem must be used within a DropDown");
  }

  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <button className={className} onClick={onClick} ref={ref} title={title} type="button">
      {children}
    </button>
  );
}

/**
 * DropDownItems is a reuse wrapper for `DropDownItem`
 *
 * @param children Children lets you manipulate and transform the JSX you received as the [children prop](https://react.dev/reference/react/Children).
 * @param dropDownRef A hook to pass your [ref](https://react.dev/learn/manipulating-the-dom-with-refs) as the ref attribute to the JSX tag for which you want to get the DOM node:
 * @param onClose The regular [onClose](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event) callback function that acts on the drop-down menu
 *
 * @returns dropdown menu
 */
function DropDownItems({
  children,
  dropDownRef,
  onClose,
}: {
  children: React.ReactNode;
  dropDownRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}) {
  const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
  const [highlightedItem, setHighlightedItem] = useState<React.RefObject<HTMLButtonElement>>();

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) return;

    const key = event.key;

    if (["Escape", "ArrowUp", "ArrowDown", "Tab"].includes(key)) {
      event.preventDefault();
    }

    if (key === "Escape" || key === "Tab") {
      onClose();
    } else if (key === "ArrowUp") {
      setHighlightedItem((prev) => {
        if (!prev) return items[0];
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === "ArrowDown") {
      setHighlightedItem((prev) => {
        if (!prev) return items[0];
        return items[items.indexOf(prev) + 1];
      });
    }
  };

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem]
  );

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);

  return (
    <FontDropDown>
      <DropDownContext.Provider value={contextValue}>
        <div className="dropdown" ref={dropDownRef} onKeyDown={handleKeyDown}>
          {children}
        </div>
      </DropDownContext.Provider>
    </FontDropDown>
  );
}

/**
 * DropDown is a reuse wrapper for drop-down button and drop-down menu,
 *
 * @param disabled The disabled property of [button](https://www.w3schools.com/tags/tag_button.asp)
 * @param buttonLabel the value of span
 * @param buttonAriaLabel [Provides an accessible name for the button element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
 * @param buttonClassName Provides an [classname](https://www.w3schools.com/jsref/prop_html_classname.asp) for the button element
 * @param buttonIconClassName Provides an [classname](https://www.w3schools.com/jsref/prop_html_classname.asp) for the icon element
 * @param children Children lets you manipulate and transform the JSX you received as the [children prop](https://react.dev/reference/react/Children).
 * @param stopCloseOnClickSelf A state variable acts the [hook](https://www.w3schools.com/react/react_useeffect.asp) of dropdown component that enables continuous color selection
 *
 * @returns dropdown button and dropdown menu components
 */
export default function DropDown({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf,
}: {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  children: ReactNode;
  stopCloseOnClickSelf?: boolean;
}): JSX.Element {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClose = () => {
    setShowDropDown(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;

    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect();
      dropDown.style.top = `${top + button.offsetHeight + dropDownPadding}px`;
      dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`;
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (stopCloseOnClickSelf) {
          if (dropDownRef.current && dropDownRef.current.contains(target as Node)) return;
        }
        if (!button.contains(target as Node)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonRef}
      >
        {buttonIconClassName && <span data-testid={"iconid"} className={buttonIconClassName} />}
        {buttonLabel && <span className="text dropdown-button-text">{buttonLabel}</span>}
        <i className="chevron-down" />
      </button>

      {showDropDown &&
        createPortal(
          <DropDownItems dropDownRef={dropDownRef} onClose={handleClose}>
            {children}
          </DropDownItems>,
          document.body
        )}
    </>
  );
}
