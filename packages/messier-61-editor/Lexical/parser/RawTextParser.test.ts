/*
 * Copyright Jiaqi Liu
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
import parse from "./RawTextParser";

import happyPathJson from "./json/raw-text-parser-happy-path.json";

test("Happy path JSON-encoded editor content gets parsed to list, each element of which is a line in editor", () => {
  expect(parse(happyPathJson)).toStrictEqual(["I love apple", "I drink coffee", "He likes google"]);
});
