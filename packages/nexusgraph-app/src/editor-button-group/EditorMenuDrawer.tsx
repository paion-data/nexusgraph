/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { TransitionEvent, useEffect, useState } from "react";
import { EditorMenuContainer } from "./styled";

const Closing = "CLOSING";
const Closed = "CLOSED";
const Open = "OPEN";
const Opening = "OPENING";

type DrawerTransitionState = typeof Closing | typeof Closed | typeof Open | typeof Opening;

interface EditorMenuDrawerProps {
  isOpen: boolean;
  width: string;
  children: JSX.Element;
}

/**
 * Create editor button menu drawer
 *
 * @param param0 EditorMenuDrawerProps
 *
 * @returns JSX.Element
 */
export function EditorMenuDrawer({ width, isOpen, children }: EditorMenuDrawerProps): JSX.Element {
  const [transitionState, setTransitionState] = useState<DrawerTransitionState>(isOpen ? Open : Closed);

  useEffect(() => {
    if (isOpen) {
      if (transitionState === Closed || transitionState === Closing) {
        setTransitionState(Opening);
      }
    } else {
      if (transitionState === Open || transitionState === Opening) {
        setTransitionState(Closing);
      }
    }
  }, [isOpen, transitionState]);

  /**
   * Drawer status transition ends update
   *
   * @param event Transition event
   *
   * @returns null
   */
  function onTransitionEnd(event: TransitionEvent<HTMLDivElement>): void {
    if (event.propertyName !== "width") {
      return;
    }
    if (transitionState === Closing) {
      setTransitionState(Closed);
    }
    if (transitionState === Opening) {
      setTransitionState(Open);
    }
  }

  const drawerIsVisible = transitionState === Opening || transitionState === Open || transitionState === Closing;

  return (
    <EditorMenuContainer
      paneWidth={isOpen ? width : "0%"}
      onTransitionEnd={onTransitionEnd}
      // Gets/sets whether tiles will animate to their new position and size.See
      // shouldAnimate (https://www.infragistics.com/help/wpf/infragisticswpf.controls.layouts.xamtilemanager~infragistics.controls.layouts.modesettingsbase~shouldanimate)
      shouldAnimate={transitionState !== Open}
    >
      {drawerIsVisible && children}
    </EditorMenuContainer>
  );
}
