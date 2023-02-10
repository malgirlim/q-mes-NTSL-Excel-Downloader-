// 재고 조회 - 원자재 재고 조회
export interface MonitorStock {
  NO?: number;
  품목코드?: string;
  거래처명?: string;
  품명?: string;
  규격?: string;
  단위?: string;
  재고수?: number;
  안전재고수?: number;
  부족재고수?: number;
  입고수?: number;
  출고수?: number;
  불량수?: number;
  원가?: number;
  재고금액?: number;
}

// 재고 조회 - 원자재 불량 조회
export interface MonitorBad {
  NO?: number;
  품목코드?: string;
  거래처명?: string;
  품명?: string;
  규격?: string;
  단위?: string;
  불량수?: number;
  불량명?: string;
  불량내용?: string;
  원가?: number;
  불량금액?: number;
}

// 재고 조회 - 안전재고 미달 조회
export interface MonitorSafe {
  NO?: number;
  품목코드?: string;
  거래처명?: string;
  품명?: string;
  규격?: string;
  단위?: string;
  재고수?: number;
  안전재고수?: number;
  부족재고수?: number;
  입고수?: number;
  출고수?: number;
  불량수?: number;
  원가?: number;
  재고금액?: number;
}

// 재고 조회 - KPI 시간당 생산량
export interface MonitorKpiProd {
  NO?: number;
  연월?: string;
  목표치?: string;
  측정치?: string;
}

// 재고 조회 - KPI 재고 비용 절감
export interface MonitorKpiStock {
  NO?: number;
  연월?: string;
  목표치?: string;
  측정치?: string;
}
