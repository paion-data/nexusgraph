// Copyright 2023 Paion Data. All rights reserved.
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.css";
declare module "*.less";
declare module "ascii-data-table";
declare module "react-timeago";
declare module "@neo4j/browser-lambda-parser";

interface Window {
  Cypress?: unknown;
}

declare module "react-suber" {
  interface BusProps {
    bus: Bus;
  }
  const withBus: (comp: React.ComponentType<P>) => React.ComponentType<P & BusProps>;
  const BusProvider: React.ComponentType<BusProps>;
  export { withBus, BusProvider, BusProps };
}
