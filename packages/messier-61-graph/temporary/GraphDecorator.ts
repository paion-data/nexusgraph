/* Copyright 2023 Paion Data. All rights reserved. */
export function formatNodeLabel(label: string): any {
  if (label.length < 5) {
    return label;
  }

  if (label.length >= 5 && label.length < 10) {
    label = label.substring(0, 4) + "\n" + label.substring(4, 10);
  } else {
    label = label.substring(0, 4) + "...";
  }
  return label;
}
