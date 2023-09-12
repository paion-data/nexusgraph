// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { useState } from "react";

import {
  ChevronLeftIcon as ChevronLeftIconSolid,
  ChevronRightIcon as ChevronRightIconSolid,
  PlusIcon as PlusIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  TrashIcon as TrashIconSolid,
  ViewColumnsIcon as ViewColumnsIconSolid,
  WindowIcon as WindowIconSolid,
} from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { CREATE_NEW_NOTE, GlobalState } from "../../../nexusgraph-redux";
import { EditorMenuDrawer } from "./EditorMenuDrawer";
import { DirectoryDropdownContent, DirectoryDropdownList, DropdownItem, EditorMenuExpandButton } from "./styled";

const NOTE_STORAGE_API_URL_PARAMETER = "note/";

/**
 * Editor button group
 *
 * Includes groups of buttons related to storage functions and screen adjustments, also includes the document
 * directories panel
 *
 * @returns Editor button group JSX.Element
 */
export function EditorButtonGroup(): JSX.Element {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

  const ChevronRightIcon = (): JSX.Element => <ChevronRightIconSolid />;
  const ChevronLeftIcon = (): JSX.Element => <ChevronLeftIconSolid />;
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const TrashIcon = (): JSX.Element => <TrashIconSolid />;
  const Squares2X2Icon = (): JSX.Element => <Squares2X2IconSolid />;
  const WindowIcon = (): JSX.Element => <WindowIconSolid />;
  const ViewColumnsIcon = (): JSX.Element => <ViewColumnsIconSolid />;

  const dispatch = useDispatch();
  const noteList = useSelector((state: GlobalState) => state.noteList);
  console.log("noteList[0]", noteList[0]);

  if (noteList[0]) {
    getFirstNote(noteList[0].id).then((response) => {
      //dispatch first note
    });
  }

  return (
    <>
      <EditorMenuExpandButton
        data-testid={"editorMenuExpand"}
        aria-label={menuExpanded ? "Collapse button group" : "Expand button group"}
        menuExpanded={menuExpanded}
        onClick={() => {
          setMenuExpanded(!menuExpanded);
        }}
        title={menuExpanded ? "Collapse button group" : "Expand  button group"}
      >
        {menuExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </EditorMenuExpandButton>

      <EditorMenuDrawer data-testid={`editorMenuDrawer`} isOpen={menuExpanded} width={"5%"}>
        <>
          <div className="topButton">
            <button className="plus" onClick={() => dispatch({ type: CREATE_NEW_NOTE })}>
              <PlusIcon />
            </button>
            <button className="squares">
              <Squares2X2Icon />
              <DirectoryDropdownList data-testid={"directoryList"}>
                <DirectoryDropdownContent>
                  {noteList.map(({ title }) => (
                    <DropdownItem data-testid={`${title}`} key={title}>
                      {title}
                    </DropdownItem>
                  ))}
                </DirectoryDropdownContent>
              </DirectoryDropdownList>
            </button>
            <button className="trash">
              <TrashIcon />
            </button>
          </div>

          <div className="bottomButton">
            <button className="window">
              <WindowIcon />
            </button>
            <button className="viewColumns">
              <ViewColumnsIcon />
            </button>
          </div>
        </>
      </EditorMenuDrawer>
    </>
  );
}

function getFirstNote(noteId: string) {
  return axios
    .get((process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER + noteId)
    .then((response) => {
      return response.data;
    });
}
