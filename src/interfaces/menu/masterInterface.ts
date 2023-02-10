// 기준정보 - 사용자 등록
export interface MasterUser {
  NO?: number;
  이름?: string;
  아이디?: string;
  부서?: string;
  연락처?: string;
  이메일?: string;
}

// 기준정보 - 품목 등록
export interface MasterProduct {
  NO?: number;
  품목코드?: string;
  품명?: string;
  거래처명?: string;
  규격?: string;
  단위?: string;
  안전재고?: number;
  원가?: number;
  금액?: number;
  비고?: string;
  등록자?: string;
  등록일시?: string;
}

// 기준정보 - 거래처 등록
export interface MasterClient {
  NO?: number;
  거래처명?: string;
  대표자?: string;
  사업자번호?: string;
  연락처?: string;
  이메일?: string;
  주소?: string;
  비고?: string;
}

// 기준정보 - 불량 내용 등록
export interface MasterBad {
  NO?: number;
  불량명?: string;
  불량내용?: string;
  비고?: string;
}

// 기준정보 - 공정 등록
export interface MasterProcess {
  NO?: number;
  공정명?: string;
  공정내용?: string;
  비고?: string;
}

// 기준정보 - 원자재 위치 등록
export interface MasterLocation {
  NO?: number;
  품목코드?: string;
  위치?: string;
  비고?: string;
}

// 기준정보 - BOM 구성 화면 (우측화면)
export interface MasterBom {
  NO?: number;
  품목NO?: number; // MasterProduct 기본키
  품목코드?: string;
  원자재코드?: string;
  원자재명?: string;
  수량?: number;
  비고?: string;
}
