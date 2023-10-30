// Copyright 2023 Paion Data. All rights reserved.
import { ArrowTopRightOnSquareIcon as ArrowTopRightOnSquareIconSolid } from "@heroicons/react/24/solid";
import { DropdownContent, DropdownItem, DropdownList, StyledGraphExport } from "../styles/ExportButtn.styled";

export function ExportButton(): JSX.Element {
  const downloadGraphics = [
    {
      name: "PNG",
      download: () => {
        // do nothing.
      },
    },
    {
      name: "SVG",
      download: () => {
        // do nothing.
      },
    },
  ];

  const ArrowTopRightOnSquareIcon = (): JSX.Element => <ArrowTopRightOnSquareIconSolid />;

  return (
    <StyledGraphExport title="Exports" data-testid="export-dropdown">
      <ArrowTopRightOnSquareIcon />
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
