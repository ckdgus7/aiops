import type { Notice, NoticeDetail } from "./types";

export const NOTICE_MOCK_DATA: Notice[] = [
  { no: 30, category: "공통", title: "AI DevOps 시스템 안내입니다.", isNew: true, author: "Admin", createdAt: "2026-03-01 10:00", updatedAt: "2026-03-01 10:00", attachments: 2, views: 312 },
  { no: 29, category: "공통", title: "2026년 상반기 시스템 점검 일정 안내", isNew: false, author: "Admin", createdAt: "2026-02-28 09:30", updatedAt: "2026-02-28 14:20", attachments: 1, views: 254 },
  { no: 28, category: "업무", title: "신규 기능 업데이트 안내 (v2.5.0)", isNew: false, author: "김개발", createdAt: "2026-02-27 15:00", updatedAt: "2026-02-27 15:00", attachments: 0, views: 189 },
  { no: 27, category: "공통", title: "보안 정책 변경 사항 공지", isNew: true, author: "Admin", createdAt: "2026-02-26 11:00", updatedAt: "2026-02-27 09:10", attachments: 3, views: 421 },
  { no: 26, category: "업무", title: "개발 환경 설정 가이드 업데이트", isNew: false, author: "이운영", createdAt: "2026-02-25 14:30", updatedAt: "2026-02-25 14:30", attachments: 1, views: 167 },
  { no: 25, category: "서비스", title: "2월 정기 배포 완료 안내", isNew: false, author: "박배포", createdAt: "2026-02-24 18:00", updatedAt: "2026-02-24 18:00", attachments: 0, views: 134 },
  { no: 24, category: "공통", title: "서비스 이용약관 개정 안내", isNew: false, author: "Admin", createdAt: "2026-02-23 10:00", updatedAt: "2026-02-24 11:30", attachments: 2, views: 298 },
  { no: 23, category: "서비스", title: "CI/CD 파이프라인 개선 사항", isNew: false, author: "최자동", createdAt: "2026-02-22 16:45", updatedAt: "2026-02-22 16:45", attachments: 0, views: 112 },
  { no: 22, category: "공통", title: "개인정보 처리방침 변경 안내", isNew: false, author: "Admin", createdAt: "2026-02-21 09:00", updatedAt: "2026-02-22 10:00", attachments: 1, views: 356 },
  { no: 21, category: "업무", title: "코드 리뷰 프로세스 가이드라인", isNew: false, author: "김개발", createdAt: "2026-02-20 13:30", updatedAt: "2026-02-20 13:30", attachments: 1, views: 145 },
  { no: 20, category: "서비스", title: "테스트 자동화 도구 도입 안내", isNew: false, author: "이테스트", createdAt: "2026-02-19 11:00", updatedAt: "2026-02-19 15:20", attachments: 2, views: 198 },
  { no: 19, category: "공통", title: "시스템 긴급 점검 안내 (2/18)", isNew: false, author: "Admin", createdAt: "2026-02-18 08:00", updatedAt: "2026-02-18 08:00", attachments: 0, views: 467 },
  { no: 18, category: "업무", title: "API 문서 업데이트 안내", isNew: false, author: "박문서", createdAt: "2026-02-17 14:00", updatedAt: "2026-02-17 14:00", attachments: 1, views: 123 },
  { no: 17, category: "서비스", title: "모니터링 대시보드 사용법 안내", isNew: false, author: "이운영", createdAt: "2026-02-16 10:30", updatedAt: "2026-02-17 09:00", attachments: 3, views: 178 },
  { no: 16, category: "공통", title: "2026년 연간 프로젝트 로드맵 공유", isNew: false, author: "Admin", createdAt: "2026-02-15 09:00", updatedAt: "2026-02-15 09:00", attachments: 1, views: 534 },
  { no: 15, category: "업무", title: "Git 브랜치 전략 변경 안내", isNew: false, author: "김개발", createdAt: "2026-02-14 15:30", updatedAt: "2026-02-14 15:30", attachments: 0, views: 156 },
  { no: 14, category: "업무", title: "신규 입사자 온보딩 자료", isNew: false, author: "최인사", createdAt: "2026-02-13 11:00", updatedAt: "2026-02-14 10:00", attachments: 5, views: 89 },
  { no: 13, category: "공통", title: "클라우드 인프라 마이그레이션 일정", isNew: false, author: "Admin", createdAt: "2026-02-12 09:30", updatedAt: "2026-02-13 16:00", attachments: 2, views: 378 },
  { no: 12, category: "서비스", title: "개발 서버 IP 변경 안내", isNew: false, author: "이운영", createdAt: "2026-02-11 14:00", updatedAt: "2026-02-11 14:00", attachments: 0, views: 234 },
  { no: 11, category: "업무", title: "코딩 컨벤션 가이드 v2.0", isNew: false, author: "김개발", createdAt: "2026-02-10 10:00", updatedAt: "2026-02-10 10:00", attachments: 1, views: 167 },
  { no: 10, category: "공통", title: "1월 시스템 운영 리포트", isNew: false, author: "Admin", createdAt: "2026-02-07 09:00", updatedAt: "2026-02-07 09:00", attachments: 1, views: 289 },
  { no: 9, category: "서비스", title: "성능 최적화 가이드라인 공유", isNew: false, author: "박성능", createdAt: "2026-02-06 16:00", updatedAt: "2026-02-06 16:00", attachments: 2, views: 145 },
  { no: 8, category: "서비스", title: "접근성 개선 프로젝트 킥오프", isNew: false, author: "이디자인", createdAt: "2026-02-05 13:00", updatedAt: "2026-02-06 10:30", attachments: 1, views: 112 },
  { no: 7, category: "공통", title: "정보보안 교육 이수 안내", isNew: true, author: "Admin", createdAt: "2026-02-04 09:00", updatedAt: "2026-02-04 09:00", attachments: 0, views: 456 },
  { no: 6, category: "업무", title: "장애 대응 매뉴얼 업데이트", isNew: false, author: "이운영", createdAt: "2026-02-03 15:00", updatedAt: "2026-02-04 11:00", attachments: 2, views: 198 },
  { no: 5, category: "서비스", title: "디자인 시스템 컴포넌트 현황", isNew: false, author: "이디자인", createdAt: "2026-02-02 10:30", updatedAt: "2026-02-02 10:30", attachments: 1, views: 134 },
  { no: 4, category: "공통", title: "연말 보안 점검 결과 안내", isNew: false, author: "Admin", createdAt: "2026-01-31 09:00", updatedAt: "2026-02-01 14:00", attachments: 3, views: 367 },
  { no: 3, category: "업무", title: "외부 라이브러리 업데이트 현황", isNew: false, author: "김개발", createdAt: "2026-01-30 14:00", updatedAt: "2026-01-30 14:00", attachments: 0, views: 98 },
  { no: 2, category: "업무", title: "프로젝트 관리 도구 사용 안내", isNew: false, author: "최관리", createdAt: "2026-01-29 11:00", updatedAt: "2026-01-30 10:00", attachments: 1, views: 145 },
  { no: 1, category: "공통", title: "AI DevOps 플랫폼 오픈 안내", isNew: true, author: "Admin", createdAt: "2026-01-28 09:00", updatedAt: "2026-01-28 09:00", attachments: 0, views: 678 },
];

function generateDetailContent(notice: Notice): string {
  const contents: Record<number, string> = {
    30: "안녕하세요.\n\nNOVA AI DevOps 시스템 사용에 대한 안내사항을 공유드립니다.\n\n본 시스템은 AI 기반의 DevOps 자동화 플랫폼으로, 요구사항 관리부터 배포까지의 전체 개발 라이프사이클을 지원합니다.\n\n주요 기능:\n1. 요구사항 관리 및 추적\n2. UI/UX 디자인 관리\n3. 기능 설계 및 상세 설계\n4. SSF(Service Structure Framework) 관리\n5. CI/CD 파이프라인 자동화\n\n시스템 사용 중 문의사항이 있으시면 관리자에게 연락해 주시기 바랍니다.\n\n감사합니다.",
    27: "안녕하세요.\n\n보안 정책이 아래와 같이 변경되었음을 알려드립니다.\n\n변경 사항:\n1. 비밀번호 정책 강화 (최소 12자, 특수문자 2개 이상 포함)\n2. 2단계 인증(2FA) 의무화\n3. 세션 타임아웃 시간 단축 (60분 → 30분)\n4. API 키 로테이션 주기 변경 (90일 → 60일)\n\n변경된 정책은 2026년 3월 1일부터 적용됩니다.\n모든 사용자는 해당 일자까지 비밀번호를 변경해 주시기 바랍니다.\n\n감사합니다.",
    7: "안녕하세요.\n\n2026년 정보보안 교육 이수에 대한 안내입니다.\n\n교육 대상: 전 직원\n교육 기간: 2026년 2월 4일 ~ 2026년 2월 28일\n교육 방법: 온라인 교육 (LMS 시스템)\n\n미이수 시 시스템 접근이 제한될 수 있으니 반드시 기간 내 이수해 주시기 바랍니다.\n\n감사합니다.",
    1: "안녕하세요.\n\nNOVA AI DevOps 플랫폼이 정식 오픈되었음을 안내드립니다.\n\n본 플랫폼은 SKT의 AI 기술을 활용하여 소프트웨어 개발 프로세스를 혁신적으로 개선하는 것을 목표로 합니다.\n\n모든 팀원들의 적극적인 참여와 피드백을 부탁드립니다.\n\n감사합니다.",
  };
  return contents[notice.no] ?? `안녕하세요.\n\n${notice.title}에 대한 상세 내용입니다.\n\n해당 공지사항의 내용을 확인해 주시기 바랍니다.\n자세한 문의사항은 관리자에게 연락해 주세요.\n\n감사합니다.`;
}

function generateAttachments(notice: Notice): NoticeDetail["attachments"] {
  if (notice.attachments === 0) return [];
  const fileExts = ["ppt", "xlsx", "pdf", "docx", "zip"];
  const result: NoticeDetail["attachments"] = [];
  for (let i = 0; i < notice.attachments; i++) {
    const ext = fileExts[i % fileExts.length];
    result.push({
      id: `${notice.no}-file-${i + 1}`,
      name: `Nova AI DevOps_${String(i + 1).padStart(2, "0")}.${ext}`,
      size: `${(Math.random() * 30 + 1).toFixed(2)} MB`,
      downloads: Math.floor(Math.random() * 300 + 10),
      uploadedAt: notice.createdAt,
    });
  }
  return result;
}

export function getAdjacentNoticeIds(no: number): { prevId: number | null; nextId: number | null } {
  const sorted = [...NOTICE_MOCK_DATA].sort((a, b) => b.no - a.no);
  const idx = sorted.findIndex((n) => n.no === no);
  if (idx === -1) return { prevId: null, nextId: null };
  const prevId = idx > 0 ? sorted[idx - 1].no : null;
  const nextId = idx < sorted.length - 1 ? sorted[idx + 1].no : null;
  return { prevId, nextId };
}

export function getNoticeDetail(no: number): NoticeDetail | null {
  const notice = NOTICE_MOCK_DATA.find((n) => n.no === no);
  if (!notice) return null;
  return {
    no: notice.no,
    category: notice.category,
    isNew: notice.isNew,
    title: notice.title,
    content: generateDetailContent(notice),
    author: notice.author,
    createdAt: notice.createdAt,
    updatedAt: notice.updatedAt,
    views: notice.views,
    attachments: generateAttachments(notice),
  };
}
