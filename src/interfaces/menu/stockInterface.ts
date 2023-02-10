import { DateTime } from "litepicker/dist/types/datetime";

// 재고 관리 - 원자재 입고 등록
export interface StockReceive {
  NO?: number;
  입고일시?: string;
  품목코드?: string;
  거래처명?: string;
  품명?: string;
  규격?: string;
  단위?: string;
  입고수?: number;
  비고?: string;
}

// 재고 관리 - 원자재 사용 등록
export interface StockUse {
  NO?: number;
  출고일시?: string;
  품목코드?: string;
  거래처명?: string;
  품명?: string;
  규격?: string;
  단위?: string;
  출고수?: number;
  비고?: string;
}

// 재고 관리 - 원자재 불량 등록
export interface StockBad {
  NO?: number;
  불량일시?: string;
  품목코드?: string;
  거래처명?: string;
  품명?: string;
  규격?: string;
  단위?: string;
  불량수?: number;
  불량명?: string;
  불량내용?: string;
  비고?: string;
}
