import express from "express";
import { readFileSync } from "fs";

/* eslint-disable */
// @ts-ignore
import jsonGraphqlExpress from "json-graphql-server";
/* eslint-enable */

const PORT = 3000;
const app = express();
const data = JSON.parse(readFileSync(process.argv[2]).toString());

app.use("/graphql", jsonGraphqlExpress(data));

app.listen(PORT);
