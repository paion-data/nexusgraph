// Copyright 2023 Paion Data. All rights reserved.
module.exports = {
  graphs: [
    {
      id: 1,
      user: 10000,
      name: "My First Graph",
      nodes: [
        { id: 1000, fields: { name: "Nexus Graph" } },
        { id: 1001, fields: { name: "People's lives" } },
      ],
      links: [{ id: 2000, source: 1000, target: 1001, fields: { type: "changes" } }],
      created_on: new Date("2023-12-21"),
      last_updated_on: new Date("2023-12-22"),
    },
  ],
};
