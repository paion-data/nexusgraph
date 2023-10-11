// Copyright 2023 Paion Data. All rights reserved.
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";

export const INTELLIGENT_AI_STATE = "intelligentAI";
const GET_INTELLIGENT_AI_CONTENT = INTELLIGENT_AI_STATE + "/GET_INTELLIGENT_AI_CONTENT";

interface intelligentAIAction {
  type: typeof INTELLIGENT_AI_STATE;
  payload: string;
}

const initialState: string | null = null;

export function selectIntelligentAI() {
  return useSelector((state: GlobalState) => state.intelligentAI);
}

export default function intelligentAIReducer(state = initialState, action: intelligentAIAction): string | null {
  switch (action.type) {
    case GET_INTELLIGENT_AI_CONTENT:
      return action.payload;
    default:
      return state;
  }
}

export function getIntelligentAIContent(intelligentAIState: string | null) {
  return { type: GET_INTELLIGENT_AI_CONTENT, payload: intelligentAIState };
}
