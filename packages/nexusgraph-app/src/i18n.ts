// Copyright 2023 Paion Data. All rights reserved.
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {},
  lng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
