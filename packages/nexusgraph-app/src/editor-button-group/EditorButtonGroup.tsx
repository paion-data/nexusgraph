// Copyright 2023 Paion Data. All rights reserved.
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

import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../../nexusgraph-astraios";
import { createNewNote, initialNoteState, selectNote, updateNote } from "../../../nexusgraph-redux";
import { NoteInfo, selectNoteList } from "../../../nexusgraph-redux/src/note-list/noteListDuck";
import { container, TYPES } from "../../inversify.config";
import { EditorMenuDrawer } from "./EditorMenuDrawer";
import { DirectoryDropdownContent, DirectoryDropdownList, DropdownItem, EditorMenuExpandButton } from "./styled";

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
  const noteList = selectNoteList();
  const noteId = selectNote().id;

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
            <button
              className="plus"
              onClick={() => {
                dispatch(createNewNote());
              }}
            >
              <PlusIcon />
            </button>
            <button className="squares">
              <Squares2X2Icon />
              <DirectoryDropdownList data-testid={"directoryList"}>
                <DirectoryDropdownContent>
                  {noteList.map((note) => (
                    <DropdownItem
                      className="noteTitleitem"
                      data-testid={`${note.title}`}
                      key={note.id}
                      onClick={() => {
                        selectedNote(note.id).then((selectedNote) => {
                          dispatch(updateNote(JSON.parse(JSON.stringify(selectedNote))));
                        });
                      }}
                    >
                      {note.title}
                    </DropdownItem>
                  ))}
                </DirectoryDropdownContent>
              </DirectoryDropdownList>
            </button>
            <button
              className="trash"
              onClick={() => {
                if (noteId) {
                  deleteNote(noteId, noteList).then((note) => {
                    dispatch(updateNote(note));
                  });
                }
              }}
            >
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

function deleteNote(noteId: string, noteList: NoteInfo[]) {
  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);
  return astraiosClient.deleteNote(noteId).then(() => {
    const index = noteList.indexOf(noteList.filter((selectedNote) => selectedNote.id == noteId)[0]);
    if (index != -1 && noteList[index + 1]) {
      const note = noteList[index + 1];
      return selectedNote(note.id);
    } else if (index != -1 && noteList.length > 1) {
      const note = noteList[0];
      return selectedNote(note.id);
    }
    return initialNoteState as Record<any, any>;
  });
}

function selectedNote(noteId: string) {
  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);
  return astraiosClient.getNoteById(noteId).then((note) => {
    note = {
      id: note.id,
      title: note.title,
      editorContent: JSON.parse(note.editorContent),
      graph: JSON.parse(note.graph),
    };
    return note;
  });
}
