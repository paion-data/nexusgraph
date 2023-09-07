// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { useEffect, useState } from "react";

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
import { selectNote } from "../../../nexusgraph-redux/src/note/noteDuck";
import { EditorMenuDrawer } from "./EditorMenuDrawer";
import { DirectoryDropdownContent, DirectoryDropdownList, DropdownItem, EditorMenuExpandButton } from "./styled";

const NOTE_STORAGE_API_URL_PARAMETER = "note";

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
  const [directories, setDirectories] = useState<Record<any, any>[]>([]);

  const ChevronRightIcon = (): JSX.Element => <ChevronRightIconSolid />;
  const ChevronLeftIcon = (): JSX.Element => <ChevronLeftIconSolid />;
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const TrashIcon = (): JSX.Element => <TrashIconSolid />;
  const Squares2X2Icon = (): JSX.Element => <Squares2X2IconSolid />;
  const WindowIcon = (): JSX.Element => <WindowIconSolid />;
  const ViewColumnsIcon = (): JSX.Element => <ViewColumnsIconSolid />;

  const note = selectNote();
  const dispatch = useDispatch();

  const userId = useSelector((state: GlobalState) => state.oAuth.userInfo["sub"]);
  const token = useSelector((state: GlobalState) => state.oAuth.accessToken);

  useEffect(() => {
    getNotes(userId, token).then((data) => setDirectories(data));
  }, [note]);

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
                  {directories.map(({ id }) => (
                    <DropdownItem data-testid={`${id}`} key={id}>
                      {id}
                    </DropdownItem>
                  ))}
                </DirectoryDropdownContent>
              </DirectoryDropdownList>
            </button>
            <button
              className="trash"
              onClick={() => {
                deleteNote(note, directories);
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

const deleteNote = (note: any, directories: Record<any, any>[]) => {
  axios.delete((process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER + "/" + note.id).then(() => {
    const index = directories.indexOf(directories.filter((selectedNote) => selectedNote.id == note.id)[0]);
    if (index != -1) {
      const note = directories[index + 1];
      // axios.patch(
      //   (process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER + note.id,
      //   { directories[index+1] },
      //   config
      // );
    }
  });
};

const getNotes = async (userId: string, token: string) => {
  let directories: Record<any, any>[] = [];

  const config = {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: "Bearer " + token,
    },
  };
  return await axios
    .get(
      (process.env.ASTRAIOS_API_URL as string) +
        NOTE_STORAGE_API_URL_PARAMETER +
        `?filter[${NOTE_STORAGE_API_URL_PARAMETER}]=userId==${userId}`,
      config
    )
    .then((response) => {
      console.log("response", response.data["data"]);
      directories = [...response.data["data"], ...directories];
      return directories;
    });
};
