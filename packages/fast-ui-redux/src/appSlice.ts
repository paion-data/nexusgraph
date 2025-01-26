/**
 * Copyright 2025 Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "./store";

interface AppState {
  myState1: string;
  myState2: boolean;
}

const initialState: AppState = {
  myState1: "my initial value 1",
  myState2: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMyState1: (state, action: PayloadAction<string>) => {
      state.myState1 = action.payload;
    },
    setMyState2: (state, action: PayloadAction<boolean>) => {
      state.myState2 = action.payload;
    },
  },
});

export const { setMyState1, setMyState2 } = appSlice.actions;

export const selectMyState1 = (state: RootState): string => state.app.myState1;
export const selectMyState2 = (state: RootState): boolean => state.app.myState2;

export default appSlice.reducer;
