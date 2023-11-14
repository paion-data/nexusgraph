// Copyright 2023 Paion Data. All rights reserved.
import { TrashIcon } from "@heroicons/react/24/outline";
import { AstraiosClient } from "../../../nexusgraph-astraios";
import { StyledDeleteButton } from "./styled";

interface DeleteButtonProps {
  graphId: string | undefined;
  onClick: (graphId: string | undefined) => void;
}

/**
 * {@link DeleteButton} is a self-managing component that is responsible for a delete button styling (excluding button
 * label) and delete logics, such as interacting with Redux and {@link AstraiosClient}.
 *
 * Thus {@link DeleteButton} should be logic-context agnostic and its
 * [single-responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle) should be **styling**
 *
 * @returns a DOM object
 */
export default function DeleteButton(props: DeleteButtonProps): JSX.Element {
  return (
    <>
      ( props.graphId && (
      <StyledDeleteButton onClick={() => props.onClick(props.graphId)}>
        <TrashIcon data-testid="deleteButton" />
      </StyledDeleteButton>
      ) )
    </>
  );
}
