// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import axios from "axios";

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
import { CREATE_NEW_NOTE } from "../../../nexusgraph-redux";
import { EditorMenuDrawer } from "./EditorMenuDrawer";
import { DirectoryDropdownContent, DirectoryDropdownList, DropdownItem, EditorMenuExpandButton } from "./styled";
import { AstraiosClient } from "../../../nexusgraph-astraios";
import { TYPES, container } from "../../inversify.config";

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
  const [noteList, setNoteList] = useState<Record<any, any>[]>([]);

  const ChevronRightIcon = (): JSX.Element => <ChevronRightIconSolid />;
  const ChevronLeftIcon = (): JSX.Element => <ChevronLeftIconSolid />;
  const PlusIcon = (): JSX.Element => <PlusIconSolid />;
  const TrashIcon = (): JSX.Element => <TrashIconSolid />;
  const Squares2X2Icon = (): JSX.Element => <Squares2X2IconSolid />;
  const WindowIcon = (): JSX.Element => <WindowIconSolid />;
  const ViewColumnsIcon = (): JSX.Element => <ViewColumnsIconSolid />;

  const dispatch = useDispatch();
  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.GraphQlClient);


  useEffect(() => {
    if(astraiosClient.getNoteList){
      astraiosClient.getNoteList(456).then((response) => {
        if (response) {
          dispatch({})
          return setNoteList(noteList.concat(response))
        }
      })
    }
  }, [])

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

// function getNoteList(): Promise<any> {
//   return axios.post("http://localhost:3000/ . ", {
//     query: ` 
//     {
//       allNotes(filter: { userId: 456 }) {
//         id,
//         title
//       }
//     }
// `,
//   }).then((response) => {
//     return response["data"]["data"]["allNotes"]
//   });
// }
