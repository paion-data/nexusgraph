/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
export function getSVOof(text: string): string[] {
  if (text === null || text === undefined || text === "") {
    return [];
  }
  return text.split(" ").filter((part) => part !== "");
}
