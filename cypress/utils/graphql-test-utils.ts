// Copyright 2023 Paion Data. All rights reserved.
export const hasOperationName = (req: any, operationName: any): boolean => {
  const { body } = req;
  return body.operationName === operationName;
};

export const aliasQuery = (req: any, operationName: any): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
    const MOCK_RESPONSES = {
      data: {
        query: {
          edges: [
            {
              node: {
                id: "1",
                title: "Test Note",
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

    req.reply({
      statusCode: 200,
      body: MOCK_RESPONSES,
    });
  }
};

export const aliasMutation = (req: any, operationName: any): void => {
  const MOCK_RESPONSES = {
    data: {
      note: {
        edges: [
          {
            node: {
              id: "1",
              title: "Test Note",
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
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;

    req.reply({
      statusCode: 200,
      body: MOCK_RESPONSES,
    });
  }
};
