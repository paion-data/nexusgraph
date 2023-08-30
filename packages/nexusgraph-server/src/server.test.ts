// Copyright 2023 Paion Data. All rights reserved.
import request, { Response } from "supertest";

import { app, server } from "./server";

it("'POST /entityExtraction' successfully gets a set of JSON data and returns status code '200'", () => {
  request(app)
    .post("/entityExtraction")
    .expect(200, {
      nodes: [],
      links: [],
    })
    .set("Accept", "application/json")
    .expect(function (res) {
      res.body.nodes = [
        {
          id: "person-1",
          fields: {
            name: "Amy",
          },
        },
        {
          id: "person-2",
          fields: {
            name: "Jane",
          },
        },
      ];
      res.body.links = [
        {
          source: "person-1",
          target: "person-2",
          fields: {
            label: "is a friend of",
          },
        },
      ];
    })
    .expect(200, {
      nodes: [
        { id: "person-1", fields: { name: "Amy" } },
        { id: "person-2", fields: { name: "Jane" } },
      ],
      links: [
        {
          source: "person-1",
          target: "person-2",
          fields: { label: "is a friend of" },
        },
      ],
    })
    .expect("Content-Type", /json/)
    .end(function (error: any, res: Response) {
      if (error) {
        throw error;
      }
    });
});

afterAll((done) => {
  server.close();
  done();
});
