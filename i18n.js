// Copyright 2023 Paion Data. All rights reserved.
import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

import graphTranslation from "./packages/nexusgraph-graph/src/data/graph.json";

/**
 * Translated content
 *
 * Use [namespaces](https://www.i18next.com/principles/namespaces) to specify the translation file and content
 */
const resources = {
  en: {
    graph: graphTranslation.en,
  },
  zh: {
    graph: graphTranslation.zh,
  },
};

/**
 * Detect the user language and translate it
 */
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
