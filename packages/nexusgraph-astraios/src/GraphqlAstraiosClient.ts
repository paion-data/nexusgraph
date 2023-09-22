// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { NoteState } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosClient";

@injectable()
export class GraphQlClient implements AstraiosClient {
  public saveOrUpdate(astraiosState: NoteState, token: string, userId: string) {
    return this.sendNoteRequest(astraiosState, token, userId);
  }

  public getNoteList(userId: string) {
    return axios
      .post(process.env.ASTRAIOS_GRAPHQL_API_ENDPOINT as string, {
        query: ` 
        {
          query:
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
      })
      .then((response) => {
        const noteList = response.data.data["query"]["edges"].map((object: { node: { id: string; title: string } }) => {
          return object["node"];
        });
        return noteList;
      });
  }

  public getFirstNote(noteId: string): Promise<Record<any, string>> {
    return axios
      .post(process.env.ASTRAIOS_GRAPHQL_API_ENDPOINT as string, {
        query: ` 
        {
          query:
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
      })
      .then((response) => {
        return response.data.data["query"]["edges"][0]["node"];
      });
  }

  private async sendNoteRequest(note: NoteState, token: string, userId: string): Promise<NoteState> {
    const graph = JSON.stringify(note.graph).replace(/"/g, '\\"');
    const editorContent = JSON.stringify(note.editorContent).replace(/"/g, '\\"');

    if (this.isInitialSave(note)) {
      return axios
        .post(process.env.ASTRAIOS_GRAPHQL_API_ENDPOINT as string, {
          query: ` 
          mutation {
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
        })
        .then((response) => {
          let noteState;
          return (noteState = response.data.data.note.edges[0]["node"]);
        });
    }

    return axios
      .post(process.env.ASTRAIOS_GRAPHQL_API_ENDPOINT as string, {
        query: ` 
          mutation {
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
