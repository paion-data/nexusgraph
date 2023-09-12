// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { AstraiosClient } from "./AstraiosClient";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class GraphQlClient implements AstraiosClient {
  public getNoteList(userId: string): Promise<any> {
    return axios.post("http://localhost:3000/", {
      query: ` 
      {
        allNotes(filter: { userId: ${userId} }) {
          id,
          title
        }
      }
  `,
    }).then((response) => {
      return response["data"]["data"]["allNotes"]
    })
  }
}
