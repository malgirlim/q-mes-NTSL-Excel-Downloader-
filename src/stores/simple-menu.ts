import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SimpleMenuState {
  menu: Array<Menu | "devider">;
}

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: (): SimpleMenuState => ({
    menu: [
      {
        icon: "Sheet",
        pageName: "simple-menu-main",
        title: "메인",
      },
    ],
  }),
});
