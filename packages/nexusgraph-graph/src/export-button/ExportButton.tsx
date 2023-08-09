// Copyright 2023 Paion Data. All rights reserved.
import download from "../../public/save.svg";
import { DropdownContent, DropdownItem, DropdownList, StyledGraphExport } from "../styles/ExportButtn.styled";
import { exportPNG, exportSVG } from "./imageUtils";

export function ExportButton(props: { visElement: any }): JSX.Element {
  const downloadGraphics = [
    { name: "PNG", download: () => exportPNG(props.visElement) },
    { name: "SVG", download: () => exportSVG(props.visElement) },
  ];

  return (
    <StyledGraphExport title="Exports" data-testid="export-dropdown">
      <img src={download} width={20} />
      <DropdownList>
        <DropdownContent>
          {downloadGraphics.map(({ name, download }) => (
            <DropdownItem data-testid={`export${name}Button`} onClick={download} key={name}>
              Export {name}
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownList>
    </StyledGraphExport>
  );
}
