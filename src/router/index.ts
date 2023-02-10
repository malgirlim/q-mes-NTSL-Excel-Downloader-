import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Main from "../pages/Main.vue";

import MasterUser from "../pages/MasterUser.vue";
import MasterProduct from "../pages/MasterProduct.vue";
import MasterClient from "../pages/MasterClient.vue";
import MasterBad from "../pages/MasterBad.vue";
import MasterProcess from "../pages/MasterProcess.vue";
import MasterLocation from "../pages/MasterLocation.vue";
import MasterBom from "../pages/MasterBom.vue";
import StockReceive from "../pages/StockReceive.vue";
import StockUse from "../pages/StockUse.vue";
import StockBad from "../pages/StockBad.vue";
import MonitorStock from "../pages/MonitorStock.vue";
import MonitorBad from "../pages/MonitorBad.vue";
import MonitorSafe from "../pages/MonitorSafe.vue";
import MonitorKpiProd from "../pages/MonitorKpiProd.vue";
import MonitorKpiStock from "../pages/MonitorKpiStock.vue";

const routes = [
  {
    path: "/side-menu",
    component: SideMenu,
    children: [
      {
        path: "master/user",
        name: "side-menu-master-user",
        meta: {
          pagename: "사용자 등록",
          category: "기준 정보",
        },
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "side-menu-master-product",
        meta: {
          pagename: "품목 등록",
          category: "기준 정보",
        },
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "side-menu-master-client",
        meta: {
          pagename: "거래처 등록",
          category: "기준 정보",
        },
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "side-menu-master-bad",
        meta: {
          pagename: "불량 내용 등록",
          category: "기준 정보",
        },
        component: MasterBad,
      },
      {
        path: "master/process",
        name: "side-menu-master-process",
        meta: {
          pagename: "공정 등록",
          category: "기준 정보",
        },
        component: MasterProcess,
      },
      {
        path: "master/location",
        name: "side-menu-master-location",
        meta: {
          pagename: "원자재 위치 등록",
          category: "기준 정보",
        },
        component: MasterLocation,
      },
      {
        path: "master/bom",
        name: "side-menu-master-bom",
        meta: {
          pagename: "BOM 등록",
          category: "기준 정보",
        },
        component: MasterBom,
      },
      {
        path: "stock/receive",
        name: "side-menu-stock-receive",
        meta: {
          pagename: "원자재 입고 등록",
          category: "재고 관리",
        },
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "side-menu-stock-use",
        meta: {
          pagename: "원자재 사용 등록",
          category: "재고 관리",
        },
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "side-menu-stock-bad",
        meta: {
          pagename: "원자재 불량 등록",
          category: "재고 관리",
        },
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "side-menu-monitor-stock",
        meta: {
          pagename: "원자재 재고 조회",
          category: "모니터링",
        },
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "side-menu-monitor-bad",
        meta: {
          pagename: "원자재 불량 조회",
          category: "모니터링",
        },
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "side-menu-monitor-safe",
        meta: {
          pagename: "안전재고 미달 통보",
          category: "모니터링",
        },
        component: MonitorSafe,
      },
      {
        path: "monitor/kpi-prod",
        name: "side-menu-monitor-kpi-prod",
        meta: {
          pagename: "KPI 시간당 생산량",
          category: "모니터링",
        },
        component: MonitorKpiProd,
      },
      {
        path: "monitor/kpi-stock",
        name: "side-menu-monitor-kpi-stock",
        meta: {
          pagename: "KPI 재고비용 절감률",
          category: "모니터링",
        },
        component: MonitorKpiStock,
      },
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "/main",
        name: "simple-menu-main",
        component: Main,
      },
      {
        path: "master/user",
        name: "simple-menu-master-user",
        meta: {
          pagename: "사용자 등록",
          category: "기준 정보",
        },
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "simple-menu-master-product",
        meta: {
          pagename: "품목 등록",
          category: "기준 정보",
        },
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "simple-menu-master-client",
        meta: {
          pagename: "거래처 등록",
          category: "기준 정보",
        },
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "simple-menu-master-bad",
        meta: {
          pagename: "불량 내용 등록",
          category: "기준 정보",
        },
        component: MasterBad,
      },
      {
        path: "master/process",
        name: "simple-menu-master-process",
        meta: {
          pagename: "공정 등록",
          category: "기준 정보",
        },
        component: MasterProcess,
      },
      {
        path: "master/location",
        name: "simple-menu-master-location",
        meta: {
          pagename: "원자재 위치 등록",
          category: "기준 정보",
        },
        component: MasterLocation,
      },
      {
        path: "master/bom",
        name: "simple-menu-master-bom",
        meta: {
          pagename: "BOM 등록",
          category: "기준 정보",
        },
        component: MasterBom,
      },
      {
        path: "stock/receive",
        name: "simple-menu-stock-receive",
        meta: {
          pagename: "원자재 입고 등록",
          category: "재고 관리",
        },
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "simple-menu-stock-use",
        meta: {
          pagename: "원자재 사용 등록",
          category: "재고 관리",
        },
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "simple-menu-stock-bad",
        meta: {
          pagename: "원자재 불량 등록",
          category: "재고 관리",
        },
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "simple-menu-monitor-stock",
        meta: {
          pagename: "원자재 재고 조회",
          category: "모니터링",
        },
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "simple-menu-monitor-bad",
        meta: {
          pagename: "원자재 불량 조회",
          category: "모니터링",
        },
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "simple-menu-monitor-safe",
        meta: {
          pagename: "안전재고 미달 통보",
          category: "모니터링",
        },
        component: MonitorSafe,
      },
      {
        path: "monitor/kpi-prod",
        name: "simple-menu-monitor-kpi-prod",
        meta: {
          pagename: "KPI 시간당 생산량",
          category: "모니터링",
        },
        component: MonitorKpiProd,
      },
      {
        path: "monitor/kpi-stock",
        name: "simple-menu-monitor-kpi-stock",
        meta: {
          pagename: "KPI 재고비용 절감률",
          category: "모니터링",
        },
        component: MonitorKpiStock,
      },
    ],
  },
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-main",
        component: Main,
      },
      {
        path: "master/user",
        name: "top-menu-master-user",
        meta: {
          pagename: "사용자 등록",
          category: "기준 정보",
        },
        component: MasterUser,
      },
      {
        path: "master/product",
        name: "top-menu-master-product",
        meta: {
          pagename: "품목 등록",
          category: "기준 정보",
        },
        component: MasterProduct,
      },
      {
        path: "master/client",
        name: "top-menu-master-client",
        meta: {
          pagename: "거래처 등록",
          category: "기준 정보",
        },
        component: MasterClient,
      },
      {
        path: "master/bad",
        name: "top-menu-master-bad",
        meta: {
          pagename: "불량 내용 등록",
          category: "기준 정보",
        },
        component: MasterBad,
      },
      {
        path: "master/process",
        name: "top-menu-master-process",
        meta: {
          pagename: "공정 등록",
          category: "기준 정보",
        },
        component: MasterProcess,
      },
      {
        path: "master/location",
        name: "top-menu-master-location",
        meta: {
          pagename: "원자재 위치 등록",
          category: "기준 정보",
        },
        component: MasterLocation,
      },
      {
        path: "master/bom",
        name: "top-menu-master-bom",
        meta: {
          pagename: "BOM 등록",
          category: "기준 정보",
        },
        component: MasterBom,
      },
      {
        path: "stock/receive",
        name: "top-menu-stock-receive",
        meta: {
          pagename: "원자재 입고 등록",
          category: "재고 관리",
        },
        component: StockReceive,
      },
      {
        path: "stock/use",
        name: "top-menu-stock-use",
        meta: {
          pagename: "원자재 사용 등록",
          category: "재고 관리",
        },
        component: StockUse,
      },
      {
        path: "stock/bad",
        name: "top-menu-stock-bad",
        meta: {
          pagename: "원자재 불량 등록",
          category: "재고 관리",
        },
        component: StockBad,
      },
      {
        path: "monitor/stock",
        name: "top-menu-monitor-stock",
        meta: {
          pagename: "원자재 재고 조회",
          category: "모니터링",
        },
        component: MonitorStock,
      },
      {
        path: "monitor/bad",
        name: "top-menu-monitor-bad",
        meta: {
          pagename: "원자재 불량 조회",
          category: "모니터링",
        },
        component: MonitorBad,
      },
      {
        path: "monitor/safe",
        name: "top-menu-monitor-safe",
        meta: {
          pagename: "안전재고 미달 통보",
          category: "모니터링",
        },
        component: MonitorSafe,
      },
      {
        path: "monitor/kpi-prod",
        name: "top-menu-monitor-kpi-prod",
        meta: {
          pagename: "KPI 시간당 생산량",
          category: "모니터링",
        },
        component: MonitorKpiProd,
      },
      {
        path: "monitor/kpi-stock",
        name: "top-menu-monitor-kpi-stock",
        meta: {
          pagename: "KPI 재고비용 절감률",
          category: "모니터링",
        },
        component: MonitorKpiStock,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
