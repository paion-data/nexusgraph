// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { AstraiosClient } from "./AstraiosClient";

@injectable()
export class GraphQlClient implements AstraiosClient {
  public getNoteList(userId: any): Promise<any> {
    return axios
      .post("http://localhost:3000/", {
        query: ` 
      {
        allNotes(filter: { userId: ${userId} }) {
          id,
          title
        }
      }
  `,
      })
      .then((response) => {
        return response["data"]["data"]["allNotes"];
      });
  }
}
