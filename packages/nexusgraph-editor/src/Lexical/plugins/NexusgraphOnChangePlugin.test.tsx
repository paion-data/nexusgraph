/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import editorReducer, { getEditorAction } from "../../../../nexusgraph-provider/src/shared/editor/editorDuck";
import { GraphEditorState } from "../../../../nexusgraph-provider/src/types";

test("should return the initial state", () => {
  const initialState = undefined;
  const state: GraphEditorState = {
    nodes: [],
    relationships: [],
  };
  expect(editorReducer(initialState, getEditorAction(state))).toEqual({ nodes: [], relationships: [] });
});

test("should handle a getEditorAction being added to an empty list", () => {
  const initialState: GraphEditorState = {
    nodes: [],
    relationships: [],
  };
  const state: GraphEditorState = {
    nodes: [{ id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } }],
    relationships: [],
  };
  expect(editorReducer(initialState, getEditorAction(state))).toEqual({
    nodes: [{ id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } }],
    relationships: [],
  });
});

test("should handle a getEditorAction being added to an existing list", () => {
  const previousState: GraphEditorState = {
    nodes: [{ id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } }],
    relationships: [],
  };
  const state: GraphEditorState = {
    nodes: [
      { id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } },
      { id: "法国", labels: ["Location"], properties: { name: "法国" }, propertyTypes: { name: "string" } },
    ],
    relationships: [],
  };
  expect(editorReducer(previousState, getEditorAction(state))).toEqual({
    nodes: [
      { id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } },
      { id: "法国", labels: ["Location"], properties: { name: "法国" }, propertyTypes: { name: "string" } },
    ],
    relationships: [],
  });
});
