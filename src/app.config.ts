// src/app.config.js
import { useGlobalIconFont } from "@/components/iconfont/helper";

export default defineAppConfig({
  usingComponents: Object.assign(useGlobalIconFont()),
  pages: ["pages/index/index", "pages/login/index"],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
