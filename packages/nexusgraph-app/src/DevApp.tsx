// Copyright 2023 Paion Data. All rights reserved.
import { OAuthState } from "../../nexusgraph-redux";
import ReduxStoreProvider from "../../nexusgraph-redux/src/ReduxStoreProvider";
import App from "./App";

export default function DevApp(): JSX.Element {
  const devOAuthState: OAuthState = {
    accessToken: "dev token",
    userInfo: {},
  };

  const initialNotesMeta = [
    {
      id: "69D1duHfSWY11gKc",
      title: "China",
    },
    {
      id: "2Lx1kN5szeSQl1Nl",
      title: "US",
    },
  ];

  const initialNote = {
    id: "69D1duHfSWY11gKc",
    editorContent: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "China",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    graph: {
      nodes: [],
      links: [],
    },
  };

  return (
    <ReduxStoreProvider
      initialNoteList={
        new Promise(function (resolve) {
          resolve(initialNotesMeta);
        })
      }
      initialNoteState={
        new Promise(function (resolve) {
          resolve(initialNote);
        })
      }
      initialOAuthState={devOAuthState}
    >
      <App />
    </ReduxStoreProvider>
  );
}
