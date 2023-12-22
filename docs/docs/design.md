---
sidebar_position: 2
title: Design
---

Nexus Graph is storage agnostic.

Semantic layer: `GraphClient`.

- Our free version comes with an in-memory [json-graphql-server]
- You can host your own on-premise production version with [astraios.io], our official supported backend for storing graphs
- Or your can host your own on our NCP

### json-graphql-server

```bash
cd nexusgraph
yarn start:json-graphql-server-dev
```

The server will be running at `http://localhost:5000/`.

:::tip

There is a very useful debugging technique: if you click the axios request to the server from browser console, it will
take you directly to the `http://localhost:5000/` with the actual query printed on it, ready to be re-sent for debugging
purposes.

:::

[json-graphql-server]: https://github.com/marmelab/json-graphql-server
[astraios.io]: https://astraios.io
