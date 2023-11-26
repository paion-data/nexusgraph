// Copyright 2023 Paion Data. All rights reserved.
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {},
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
