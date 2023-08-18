// Copyright 2023 Paion Data. All rights reserved.
export default function joinClasses(...args: Array<string | boolean | null | undefined>) {
  return args.filter(Boolean).join(" ");
}
