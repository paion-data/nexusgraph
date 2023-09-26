// Copyright 2023 Paion Data. All rights reserved.
export const hasOperationName = (req: any, operationName: any): boolean => {
  const { body } = req;
  return body.operationName === operationName;
};

export const aliasQuery = (req: any, operationName: any): void => {
  let MOCK_RESPONSES;
  if (operationName == "getNoteList") {
    req.alias = `gql${operationName}Query`;
    MOCK_RESPONSES = {
      data: {
        note: {
          edges: [],
        },
      },
    };
  }
  if (operationName == "saveNote") {
    req.alias = `gql${operationName}Query`;
    MOCK_RESPONSES = {
      data: {
        note: {
          edges: [
            {
              node: {
                id: "1",
                title: "Untitled Note",
                userId: "devUserId",
                editorContent: `{
                  "root":
                    {"children":
                      [{"children":
                        [{"detail":0,"format":0,"mode":"normal","style":"","text":"China","type":"text","version":1}],
                          "direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr",
                          "format":"","indent":0,"type":"root","version":1
                        }
                  }`,
                graph: '{"nodes": [], "links": []}',
              },
            },
          ],
        },
      },
    };
  }

  if (operationName == "getNoteById") {
    req.alias = `gql${operationName}Query`;
    MOCK_RESPONSES = {
      data: {
        note: {
          edges: [
            {
              node: {
                id: "2",
                title: "Second Note",
                userId: "devUserId",
                editorContent: `{
                  "root":
                    {"children":
                      [{"children":
                        [{"detail":0,"format":0,"mode":"normal","style":"","text":"Select Note","type":"text",
                        "version":1}],
                          "direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr",
                          "format":"","indent":0,"type":"root","version":1
                        }
                  }`,
                graph: '{"nodes": [], "links": []}',
              },
            },
          ],
        },
      },
    };
  }

  req.reply({
    statusCode: 200,
    body: MOCK_RESPONSES,
  });
};
