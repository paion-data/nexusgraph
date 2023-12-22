// Copyright 2023 Paion Data. All rights reserved.
import { TrashIcon } from "@heroicons/react/24/outline";
import { StyledDeleteButton } from "./styled";

interface DeleteButtonProps {
  graphId: string;
  onClick: (graphId: string) => void;
}

/**
 * {@link DeleteButton} is a self-managing component that is responsible for a delete button styling (excluding button
 * label) only.
 *
 * Thus {@link DeleteButton} should be logic-context agnostic and its
 * [single-responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle) should be **styling**
 *
 * @returns a DOM object
 */
export default function DeleteButton(props: DeleteButtonProps): JSX.Element {
  return (
    <StyledDeleteButton onClick={() => props.onClick(props.graphId)}>
      <TrashIcon data-testid="deleteButton" />
    </StyledDeleteButton>
  );
}
