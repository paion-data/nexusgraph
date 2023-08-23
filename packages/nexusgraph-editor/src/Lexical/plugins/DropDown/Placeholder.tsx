// Copyright 2023 Paion Data. All rights reserved.
// import './Placeholder.css';
import { ReactNode } from "react";

export default function Placeholder({ children, className }: { children: ReactNode; className?: string }): JSX.Element {
  return <div className={className || "Placeholder__root"}>{children}</div>;
}
