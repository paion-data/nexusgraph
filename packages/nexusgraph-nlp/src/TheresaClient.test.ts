// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";

import { NLPClient } from "./NLPClient";
import { TheresaClient } from "./TheresaClient";

const theresaClient: NLPClient = new TheresaClient();

jest.mock("axios");

describe("NLP delegates processing to remote WS", () => {
  it("returns graph", async () => {
    const nlpData = {
      nodes: [
        {
          fields: {
            label: "China",
            type: "entity",
          },
          id: "China",
        },
        {
          fields: {
            label: "Mandarin",
            type: "entity",
          },
          id: "Mandarin",
        },
      ],
      links: [
        {
          fields: {
            label: "capital",
          },
          source: "Mandarin",
          target: "China",
        },
      ],
    };

    axios.create = jest.fn(() => axios);
    Object(axios.post).mockResolvedValueOnce(nlpData);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    theresaClient["fetchRemote"]("China").then((nlpState: any) => {
      expect(nlpState).toEqual(nlpData);

      expect(axios.create).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(
        "entityExtraction",
        {
          dataframe_split: {
            columns: ["text"],
            data: [["China"]],
          },
        },
        { headers: { "Content-Type": "application/json", accept: "*/*" } }
      );
    });
  });
});
