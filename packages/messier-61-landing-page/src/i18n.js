import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Tag Line": "A completely new way for personal knowledge management for young ages",

      About: "About Us",
      Highlights: "Highlights",
      Team: "Team",
      Contact: "Contact",

      "About (Why)":
        "Everything we do, we believe data through technology reveals the hidden truth of the world. We believe in challenging the status quo. We believe in thinking differently.",
      "About (How)": "The way we challenge the status qu is by making our products",
      "About (How 1)": "beautifully designed",
      "About (How 2)": "user friendly",
      "About (How 3)": "simple to use",

      "Highlights Tag Line": "Paion Data's External Brain is a hightlyl automated Knowledge Management Tool",
      "Hightlights 1 Title": "Free & Open Source",
      "Hightlights 1 Description": "Most External Brain features are free and will always be free in the future.",
      "Hightlights 2 Title": "Machine Learning",
      "Hightlights 2 Description":
        "We revolutionize the personal management by baking Machine Learning as our knowledge management assistant.",
      "Hightlights 3 Title": "Cloud Native",
      "Hightlights 3 Description":
        "You can host your own External Brain instance on your own infrastructure or simply use our service online. Register today to start a new knowledge journey!",

      "Team Tag Line": "May you, the beauty of this world, always shine",
      "Team Member 1 Name": "Jack",
      "Team Member 1 Title": "CEO / Backend Developer / Machine Learning",
      "Team Member 2 Name": "Shenggao",
      "Team Member 2 Title": "Angel Investor",
      "Team Member 3 Name": "Minghui",
      "Team Member 3 Title": "Frontend Developer",

      Address:
        "Nanshan District, 5001th Huanggang Rd, WeWork Shenyeshangcheng LOFT Building B, 6th floor, Shenzhen, China, 518000",
      Phone: "13923433392",
      Email: "jack20191124@paion-data.dev",
      github: "https://github.com/paion-data",
    },
  },
  zh: {
    translation: {
      "Tag Line": "面向年轻群体的个人知识管理新模式",

      About: "关于我们",
      Highlights: "亮点",
      Team: "团队",
      Contact: "联系我们",

      "About (Why)":
        "我们的愿景，打造出人们能够通过身边巨量的日常数据，在强大的机器学习算法的帮助下，透析周围人心与事件真相的产品，帮助人们更加准确地分析问题，更加自信地看清这个复杂的世界",
      "About (How)": "我们用全新的视角重新定义知识管理",
      "About (How 1)": "美观",
      "About (How 2)": "好用",
      "About (How 3)": "简洁",

      "Highlights Tag Line": "External Brain 是一个通过知识图谱技术，变革个人知识管理的笔记类应用",
      "Hightlights 1 Title": "免费 & 开源",
      "Hightlights 1 Description":
        "我们的笔记管理功能完全开源免费，让您在拥有了类似有道云笔记的功能之外，用全新的知识图谱方法去管理您的个人知识库",
      "Hightlights 2 Title": "机器学习助力个人知识管理",
      "Hightlights 2 Description":
        "和国外已有的 Roam Research 和 Obsidian 应用不同的是，我们的付费功能（以及后续的应用商店）帮助您节省数小时以上的知识获取，在这个要求高效率获取知识的时代，让您的知识管理变得无比智能和高效",
      "Hightlights 3 Title": "Cloud Native",
      "Hightlights 3 Description": "您也可以选择部署您自己的 External Brain 服务器，进行任意的定制化开发",

      "Team Tag Line": "为世间所有的美好而努力",
      "Team Member 1 Name": "Jack",
      "Team Member 1 Title": "CEO / 后端开发 / 机器学习",
      "Team Member 2 Name": "生高",
      "Team Member 2 Title": "天使投资",
      "Team Member 3 Name": "鸣辉",
      "Team Member 3 Title": "前端开发",

      Address: "广东省深圳市福田区华富街道莲花一村社区皇岗路5001号深业上城（南区）商业综合楼1栋LB604",
      Phone: "13923433392",
      Email: "jack20191124@paion-data.dev",
      github: "https://github.com/paion-data",
    },
  },
};

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
