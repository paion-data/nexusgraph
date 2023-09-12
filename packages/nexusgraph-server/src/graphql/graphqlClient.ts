// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";

export function getNoteList(): Promise<any> {
  return axios
    .post("http://localhost:3000/", {
      query: ` 
    {
      allNotes(filter: { userId: "456" }) {
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
