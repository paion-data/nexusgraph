// Copyright 2023 Paion Data. All rights reserved.
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.css";
declare module "*.less";

interface Window {
  Cypress?: unknown;
}
