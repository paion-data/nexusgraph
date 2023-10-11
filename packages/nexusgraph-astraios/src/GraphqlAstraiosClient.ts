// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { NoteState } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosClient";

const ASTRAIOS_GRAPHQL_API_ENDPOINT = process.env.ASTRAIOS_API_RESOURCE as string;

@injectable()
export class GraphQlClient implements AstraiosClient {
  public saveOrUpdate(astraiosState: NoteState, token: string, userId: string) {
    return this.sendNoteRequest(astraiosState, token, userId);
  }

  public getNoteList(userId: string) {
    return axios
      .post(ASTRAIOS_GRAPHQL_API_ENDPOINT, {
        query: ` 
        query getNoteList{
          note (filter: \"userId==${userId}\"){
          edges 
          {
            node {
              id 
              title
            }
          }
        }
        }
      `,
        operationName: "getNoteList",
      })
      .then((response) => {
        const noteList = response.data.data.note["edges"].map((object: { node: { id: string; title: string } }) => {
          return object["node"];
        });
        return noteList;
      });
  }

  public getNoteById(noteId: string): Promise<Record<any, string>> {
    return axios
      .post(ASTRAIOS_GRAPHQL_API_ENDPOINT, {
        query: ` 
        query getNoteById{
          note(ids: [\"${noteId}\"]) {
          edges 
          {
            node {
              id
              title
              graph
              editorContent
            }
          }
        } 
        }
`,
        operationName: "getNoteById",
      })
      .then((response) => {
        return response.data.data.note["edges"][0]["node"];
      });
  }

  public deleteNote(noteId: string): Promise<any> {
    return axios.post(ASTRAIOS_GRAPHQL_API_ENDPOINT, {
      query: ` 
          mutation deleteNote{
            note(op: DELETE, ids: [\"${noteId}\"]) {
              edges {
                node {
                  id
                  title
                  graph
                  editorContent
                }
              }
            }
          }
  `,
      operationName: "deleteNote",
    });
  }

  private async sendNoteRequest(note: NoteState, token: string, userId: string): Promise<NoteState> {
    const graph = JSON.stringify(note.graph).replace(/"/g, '\\"');
    const editorContent = JSON.stringify(note.editorContent).replace(/"/g, '\\"');

    if (this.isInitialSave(note)) {
      return axios
        .post(ASTRAIOS_GRAPHQL_API_ENDPOINT, {
          query: ` 
          mutation saveNote{
            note(op: UPSERT, data: {
              title: "${note.title}",
              userId: "${userId}",
              graph: "${graph}",
              editorContent: "${editorContent}",
            }) {
              edges {
                node {
                  id
                  title
                  graph
                  editorContent
                }
              }
            }
          }
  `,
          operationName: "saveNote",
        })
        .then((response) => {
          let noteState;
          return (noteState = response.data.data.note.edges[0]["node"]);
        });
    }

    return axios
      .post(ASTRAIOS_GRAPHQL_API_ENDPOINT, {
        query: ` 
          mutation updateNote{
            note(op: UPSERT, data: {
              id: "${note.id}",
              userId: "${userId}",
              title: "${note.title}",
              graph: "${graph}",
              editorContent: "${editorContent}",
            }) {
              edges {
                node {
                  id
                  title
                  graph
                  editorContent
                }
              }
            }
          }
  `,
        operationName: "updateNote",
      })
      .then((response) => {
        const noteState = {
          ...note,
          ...{ id: response.data.data.note.edges[0]["node"]["id"] },
        };
        return noteState;
      });
  }

  private isInitialSave(note: NoteState) {
    return note.id === undefined;
  }
}
