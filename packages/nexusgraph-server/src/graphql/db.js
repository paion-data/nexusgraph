// Copyright 2023 Paion Data. All rights reserved.

/**
 * This data is used to simulate the notes data returned by the requested Astraios service
 *
 * Filter data:
 *
 * ```json
 * {
 *   allNotes(filter: { userId: 456 }) {
 *    id,
 *    title
 *  }
 * }
 * ```
 * 
 * Restart Graphql server and UI if you change the data
 */
module.exports = {
  notes: [
    { id: 1, title: "Lorem Ipsum", createdDate: new Date("2017-07-03"), userId: 123 },
    { id: 2, title: "Sic Dolor amet", createdDate: new Date("2017-07-03"), userId: 456 },
    { id: 3, title: "TypeScript", createdDate: new Date("2017-07-03"), userId: 789 },
    { id: 4, title: "React", createdDate: new Date("2017-07-03"), userId: 456 },
    { id: 5, title: "Lexical", createdDate: new Date("2017-07-03"), userId: 456 },
  ],
};
