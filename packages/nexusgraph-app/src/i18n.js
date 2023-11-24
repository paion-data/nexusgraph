import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Unamed Graph": "Unamed Graph",
      "Generate Graph": "Generate Graph",
    },
  },
  zh: {
    translation: {
      "Unamed Graph": "未命名图谱",
      "Generate Graph": "生成图谱",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
