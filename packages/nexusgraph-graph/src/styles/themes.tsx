// Copyright 2023 Paion Data. All rights reserved.
import { ThemeProvider } from "styled-components";
import React from "react";

export const baseArcTheme = {
  name: "base",
  // Text colors
  primaryText: "#333",
  link: "#428BCA",

  // Backgrounds
  primaryBackground: "#D2D5DA",
  editorBackground: "#fff",
  alteringTableRowBackground: "#f5f5f5",

  // Fonts
  primaryFontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  drawerHeaderFontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif",

  // Shadows
  standardShadow:
    "0px 0px 2px rgba(52, 58, 67, 0.1), 0px 1px 2px rgba(52, 58, 67, 0.08), 0px 1px 4px rgba(52, 58, 67, 0.08);",

  // Borders
  inFrameBorder: "1px solid #DAE4F0;",

  // Frame
  frameSidebarBackground: "#FFF",
  frameControlButtonTextColor: "#485662",
  frameButtonTextColor: "#717780",
  frameButtonHoverBackground: "rgba(113,119,128,0.1)",
  frameButtonActiveBackground: "rgba(113,119,128,0.2)",
  frameNodePropertiesPanelIconTextColor: "#717172",
  frameBackground: "#F9FCFF",

  // Info message
  infoBackground: "#e6f8ff",
  infoBorder: "1px solid #7ad1ff",
  infoIconColor: "#006FD6",
};

export const light = {
  ...baseArcTheme,
  name: "LIGHT",
};

/**
 * Get Theme provider for Arc components, default is LIGHT theme
 * @param children
 * @param theme if provided used as theme instead of default LIGHT
 * @constructor
 */
export const ArcThemeProvider = ({ children, theme }: { children: JSX.Element; theme?: typeof baseArcTheme }) => (
  <ThemeProvider theme={theme ?? light}>{children}</ThemeProvider>
);
