import type { DomainItem, ComponentItem, BusinessItem } from "./types";

export const DOMAIN_MOCK_DATA: DomainItem[] = [
  { no: 13, abbr: "MKT", nameKo: "마케팅", nameEn: "Marketing", description: "마케팅 관련 업무 도메인으로, 캠페인 관리, 프로모션 기획 및 실행, 고객 분석 등을 포함합니다.", useYn: "사용" },
  { no: 12, abbr: "FIN", nameKo: "재무/회계", nameEn: "Finance", description: "재무 및 회계 관련 업무 도메인으로, 예산 관리, 결산, 원가 분석 등을 포함합니다.", useYn: "사용" },
  { no: 11, abbr: "HR", nameKo: "인사관리", nameEn: "Human Resource", description: "인사 관련 업무 도메인으로, 채용, 평가, 급여, 교육 등을 포함합니다.", useYn: "사용" },
  { no: 10, abbr: "SCM", nameKo: "공급망관리", nameEn: "Supply Chain Mgmt", description: "공급망 관리 도메인으로, 구매, 물류, 재고 관리 등을 포함합니다.", useYn: "사용" },
  { no: 9, abbr: "CRM", nameKo: "고객관계관리", nameEn: "Customer Relation", description: "고객 관계 관리 도메인으로, 고객 정보 관리, 상담 이력, 충성도 프로그램 등을 포함합니다.", useYn: "사용" },
  { no: 8, abbr: "PRD", nameKo: "상품관리", nameEn: "Product Mgmt", description: "상품 관련 업무 도메인으로, 상품 등록, 가격 정책, 상품 분류 체계 등을 포함합니다.", useYn: "사용" },
  { no: 7, abbr: "ORD", nameKo: "주문관리", nameEn: "Order Mgmt", description: "주문 처리 도메인으로, 주문 접수, 배송 관리, 반품/교환 등을 포함합니다.", useYn: "미사용" },
  { no: 6, abbr: "BIL", nameKo: "청구/정산", nameEn: "Billing", description: "청구 및 정산 관련 도메인으로, 요금 산출, 청구서 발행, 수납 관리 등을 포함합니다.", useYn: "사용" },
  { no: 5, abbr: "NET", nameKo: "네트워크", nameEn: "Network", description: "네트워크 관련 도메인으로, 망 구성, 장비 관리, 품질 모니터링 등을 포함합니다.", useYn: "사용" },
  { no: 4, abbr: "SVC", nameKo: "서비스운영", nameEn: "Service Operation", description: "서비스 운영 도메인으로, 서비스 개통, 변경, 해지 등의 운영 업무를 포함합니다.", useYn: "사용" },
  { no: 3, abbr: "SYS", nameKo: "시스템관리", nameEn: "System Admin", description: "시스템 관리 도메인으로, 권한 관리, 코드 관리, 시스템 설정 등을 포함합니다.", useYn: "미사용" },
  { no: 2, abbr: "RPT", nameKo: "리포팅", nameEn: "Reporting", description: "리포팅 도메인으로, 각종 통계 및 보고서 생성, 대시보드 관리 등을 포함합니다.", useYn: "사용" },
  { no: 1, abbr: "COM", nameKo: "공통", nameEn: "Common", description: "공통 업무 도메인으로, 범용적으로 사용되는 기능 및 기준 정보를 포함합니다.", useYn: "사용" },
];

const DOMAIN_NAMES = ["마케팅 & 오퍼링", "재무/회계", "인사관리", "공급망관리", "고객관계관리", "상품관리", "주문관리", "청구/정산", "네트워크", "서비스운영", "시스템관리", "리포팅", "공통"];
const COMP_NAMES_KO = ["공통 플랫폼 관리", "캠페인 관리", "프로모션 기획", "예산 관리", "결산 처리", "채용 관리", "평가 관리", "구매 관리", "물류 관리", "고객 정보 관리", "상담 이력 관리", "상품 등록 관리", "가격 정책 관리", "주문 접수 관리", "배송 관리", "요금 산출", "청구서 발행", "망 구성 관리", "장비 관리", "서비스 개통", "서비스 변경", "권한 관리", "코드 관리", "통계 보고서", "대시보드 관리", "기준 정보 관리", "사용자 인증", "데이터 분석", "API 연동 관리", "모니터링 관리"];
const COMP_NAMES_EN = ["Common Platform Mgmt", "Campaign Mgmt", "Promotion Planning", "Budget Mgmt", "Settlement Processing", "Recruitment Mgmt", "Evaluation Mgmt", "Procurement Mgmt", "Logistics Mgmt", "Customer Info Mgmt", "Consultation History", "Product Registration", "Pricing Policy Mgmt", "Order Reception Mgmt", "Delivery Mgmt", "Fee Calculation", "Invoice Issuance", "Network Config Mgmt", "Equipment Mgmt", "Service Activation", "Service Modification", "Authority Mgmt", "Code Mgmt", "Statistics Report", "Dashboard Mgmt", "Reference Info Mgmt", "User Authentication", "Data Analysis", "API Integration Mgmt", "Monitoring Mgmt"];
const DESCRIPTIONS = [
  "서비스 제공을 위해 플랫폼 전반적으로 사용되는 공통 기능들의 관리 활동 전체를 말합니다.",
  "마케팅 캠페인의 기획, 실행, 성과 분석 등 전체 캠페인 라이프사이클을 관리합니다.",
  "다양한 프로모션의 기획부터 실행까지의 전체 프로세스를 관리합니다.",
  "조직의 예산 편성, 집행, 모니터링 등 예산 관련 전체 업무를 관리합니다.",
  "회계 결산 관련 업무 처리 및 재무제표 작성을 관리합니다.",
  "인재 채용 프로세스 전반을 관리하고 지원자 추적 및 평가를 수행합니다.",
  "직원 성과 평가 프로세스를 관리하고 평가 결과를 분석합니다.",
  "자재 및 서비스 구매 요청부터 발주까지의 전체 프로세스를 관리합니다.",
  "물류 운송, 창고 관리, 배송 추적 등 물류 전반을 관리합니다.",
  "고객 기본 정보 및 이력 정보를 통합 관리합니다.",
];
const LEADERS_PLAN = ["이택규", "김민수", "박지영", "최현우", "정수진", "한동석", "윤서연", "오승현", "장미라", "송태현"];
const LEADERS_DESIGN = ["조우찬", "이서준", "김하은", "박도현", "최지우", "정민기", "한예슬", "오지훈", "장서윤", "송민재"];

export const COMPONENT_MOCK_DATA: ComponentItem[] = Array.from({ length: 64 }, (_, i) => {
  const idx = i;
  return {
    no: 64 - i,
    componentId: `SKNC${String(idx + 1).padStart(3, "0")}`,
    nameKo: COMP_NAMES_KO[idx % COMP_NAMES_KO.length],
    nameEn: COMP_NAMES_EN[idx % COMP_NAMES_EN.length],
    description: DESCRIPTIONS[idx % DESCRIPTIONS.length],
    domainNameKo: DOMAIN_NAMES[idx % DOMAIN_NAMES.length],
    planLeader: LEADERS_PLAN[idx % LEADERS_PLAN.length],
    designLeader: LEADERS_DESIGN[idx % LEADERS_DESIGN.length],
    useYn: idx % 7 === 0 ? "미사용" : "사용",
  };
});

const BIZ_NAMES_KO = ["대리점정보관리", "파트너사정보관리", "제휴서비스관리", "마케팅분석관리", "고객세분화관리", "예산편성관리", "결산업무처리", "원가분석관리", "채용프로세스관리", "성과평가관리", "급여관리", "교육훈련관리", "구매요청관리", "발주관리", "재고관리", "고객상담관리", "충성도프로그램", "상품등록관리", "가격정책관리", "상품분류관리", "주문접수처리", "배송추적관리", "반품교환관리", "요금산출관리", "청구서발행", "수납관리", "망구성관리", "장비관리", "품질모니터링", "서비스개통관리"];
const BIZ_NAMES_EN = ["Dealer Info Mgmt", "Partner Info Mgmt", "Alliance Service Mgmt", "Marketing Analysis", "Customer Segmentation", "Budget Planning", "Settlement Processing", "Cost Analysis", "Recruitment Process", "Performance Evaluation", "Payroll Mgmt", "Training Mgmt", "Purchase Request Mgmt", "Order Placement Mgmt", "Inventory Mgmt", "Customer Counseling", "Loyalty Program", "Product Registration", "Pricing Policy Mgmt", "Product Category Mgmt", "Order Receipt Processing", "Delivery Tracking", "Return Exchange Mgmt", "Fee Calculation Mgmt", "Invoice Issuance", "Collection Mgmt", "Network Config Mgmt", "Equipment Mgmt", "Quality Monitoring", "Service Activation Mgmt"];
const BIZ_DESCRIPTIONS = [
  "대리점 기본 정보 및 계약 정보를 관리하는 업무입니다.",
  "파트너사 정보 등록, 변경, 해지 등 전체 라이프사이클을 관리합니다.",
  "제휴 서비스 기획, 운영, 정산 등의 업무를 관리합니다.",
  "마케팅 데이터 분석 및 인사이트 도출 업무를 관리합니다.",
  "고객 세분화 기준 설정 및 세그먼트 관리 업무입니다.",
  "연간 예산 편성 및 배분, 조정 업무를 관리합니다.",
  "월별/분기별 결산 업무 처리 및 보고 업무입니다.",
  "원가 구성요소 분석 및 원가 절감 관련 업무를 관리합니다.",
  "채용 공고 등록부터 최종 합격까지 전체 프로세스를 관리합니다.",
  "직원 성과 목표 설정, 중간 점검, 최종 평가를 관리합니다.",
];

export const BUSINESS_MOCK_DATA: BusinessItem[] = Array.from({ length: 120 }, (_, i) => {
  const idx = i;
  const domainIdx = idx % DOMAIN_NAMES.length;
  const compIdx = idx % COMP_NAMES_KO.length;
  return {
    no: 120 - i,
    businessId: `BZ-PTYTMFC${String(idx + 1).padStart(3, "0")}`,
    nameKo: BIZ_NAMES_KO[idx % BIZ_NAMES_KO.length],
    nameEn: BIZ_NAMES_EN[idx % BIZ_NAMES_EN.length],
    description: BIZ_DESCRIPTIONS[idx % BIZ_DESCRIPTIONS.length],
    domainNameKo: DOMAIN_NAMES[domainIdx],
    componentNameKo: COMP_NAMES_KO[compIdx],
    planLeader: LEADERS_PLAN[idx % LEADERS_PLAN.length],
    designLeader: LEADERS_DESIGN[idx % LEADERS_DESIGN.length],
    useYn: idx % 9 === 0 ? "미사용" : "사용",
  };
});

export function getDomainList(): DomainItem[] {
  return DOMAIN_MOCK_DATA;
}

export function getDomainDetail(nameKo: string): DomainItem | undefined {
  return DOMAIN_MOCK_DATA.find((d) => d.nameKo === nameKo);
}

export function getComponentList(): ComponentItem[] {
  return COMPONENT_MOCK_DATA;
}

export function getComponentDetail(id: string): ComponentItem | undefined {
  return COMPONENT_MOCK_DATA.find((c) => c.componentId === id);
}

export function getComponentByName(nameKo: string): ComponentItem | undefined {
  return COMPONENT_MOCK_DATA.find((c) => c.nameKo === nameKo);
}

export function getBusinessList(): BusinessItem[] {
  return BUSINESS_MOCK_DATA;
}

export function getBusinessDetail(businessId: string): BusinessItem | undefined {
  return BUSINESS_MOCK_DATA.find((b) => b.businessId === businessId);
}
