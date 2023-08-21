// Copyright 2023 Paion Data. All rights reserved.
import express from "express";
import cors from "cors";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import asyncHandler from "express-async-handler";
import process from "process";
const app = express();
app.use(express.json());
app.use(cors());

type Node = {
  id: string;
  fields: { name: string };
};

type Link = {
  source: string;
  target: string;
  fields: { label: string };
};

type Data = {
  nodes: Node[];
  links: Link[];
};

type Documents = {
  documents: string[];
};

const adapter = new JSONFileSync<Data>(process.argv[2] ? process.argv[2] : "../../.github/db.json");
const db = new LowSync<Data>(adapter, { nodes: [], links: [] });
db.read();

app.post(
  "/entityExtraction",
  asyncHandler(async (req, res) => {
    const documents = req.body as Documents;
    res.send(db.data);
  })
);

app.post(
  "/expand",
  asyncHandler(async (req, res) => {
    const documents = req.body as Documents;
    res.send(db.data);
  })
);

app.get("/healthcheck", (req, res) => {
  res.send("SUCCESS");
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000"); // eslint-disable-line no-console
});

export { app, server };
