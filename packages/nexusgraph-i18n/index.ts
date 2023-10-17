// Copyright 2023 Paion Data. All rights reserved.
import { useTranslation } from "react-i18next";

export { default as i18n } from "./src/i18n";

export function t(key: string) {
  const { t } = useTranslation("graph");
  return t(key);
}
