// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { NoteState } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosClient";

@injectable()
export class GraphQlClient implements AstraiosClient {
  public saveOrUpdate(astraiosState: NoteState, token: string) {
    return this.sendNoteRequest(astraiosState, token);
  }

  public getNoteList() {
    return axios
      .post(process.env.ASTRAIOS_API_ENDPOINT as string, {
        query: ` 
        {
          query:
          note {
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
        return response.data.data["query"]["edges"];
      });
  }

  private async sendNoteRequest(note: NoteState, token: string): Promise<any> {
    if (this.isInitialSave(note)) {
      return axios
        .post(process.env.ASTRAIOS_API_ENDPOINT as string, {
          query: ` 
          mutation {
            note(op: UPSERT, data: {
              graph: "${JSON.stringify(note.graph).replace(/"/g, "'")}",
              editorContent: "${JSON.stringify(note.editorContent).replace(/"/g, "'")}"
            }) {
              edges {
                node {
                  id
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
      .post(process.env.ASTRAIOS_API_ENDPOINT as string, {
        query: ` 
          mutation {
            note(op: UPSERT, data: {
              id: ${note.id},
              graph: "${JSON.stringify(note.graph).replace(/"/g, "'")}",
              editorContent: "${JSON.stringify(note.editorContent).replace(/"/g, "'")}"
            }) {
              edges {
                node {
                  id
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
