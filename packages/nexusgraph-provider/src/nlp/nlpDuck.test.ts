// Copyright 2023 Paion Data. All rights reserved.
import { NlpState, NlpAction, UPDATE_NLPDATA } from "./nlpTypes";
import nlpReducer from "./nlpDuck";

it("The nlp reducer updates the state of the nodes and links", () => {
  const initialState: NlpState = {
    nodes: [],
    links: [],
  };

  const action: NlpAction = {
    type: UPDATE_NLPDATA,
    payload: {
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
            label: "Asia",
            type: "entity",
          },
          id: "Asia",
        },
      ],
      links: [
        {
          fields: {
            label: "country",
          },
          source: "China",
          target: "Asia",
        },
      ],
    },
  };

  expect(nlpReducer(initialState, action)).toEqual({
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
          label: "Asia",
          type: "entity",
        },
        id: "Asia",
      },
    ],
    links: [
      {
        fields: {
          label: "country",
        },
        source: "China",
        target: "Asia",
      },
    ],
  });
});

it("The new action of nlp overwrites the previous state", () => {
  const initialState: NlpState = {
    nodes: [
      {
        fields: {
          label: "Mandarin",
          type: "entity",
        },
        id: "Mandarin",
      },
      {
        fields: {
          label: "Beijing",
          type: "entity",
        },
        id: "Beijing",
      },
    ],
    links: [
      {
        fields: {
          label: "capital",
        },
        source: "Mandarin",
        target: "Beijing",
      },
    ],
  };

  const action: NlpAction = {
    type: UPDATE_NLPDATA,
    payload: {
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
            label: "Asia",
            type: "entity",
          },
          id: "Asia",
        },
      ],
      links: [
        {
          fields: {
            label: "country",
          },
          source: "China",
          target: "Asia",
        },
      ],
    },
  };

  expect(nlpReducer(initialState, action)).toEqual(action.payload);
});
