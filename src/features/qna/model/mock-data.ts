import type { QnAItem, QnADetail } from "./types";

const CATEGORIES = ["이용문의", "기술", "이용문의", "기술", "이용문의", "기술"];
const TITLES = [
  "AI DevOps 이용방법에 대해서 문의드립니다.",
  "CI/CD 파이프라인 설정 관련 질문입니다.",
  "SSF 구조 분석 기능에 대해 궁금합니다.",
  "테스트 자동화 관련하여 문의드립니다.",
  "요구사항 관리 기능 사용법 질문입니다.",
  "배포 환경 설정에 대한 문의드립니다.",
  "코드 리뷰 프로세스 관련 질문입니다.",
  "프로젝트 관리 대시보드 관련 문의드립니다.",
  "API 연동 관련하여 문의드립니다.",
  "보안 설정 관련 질문입니다.",
];
const AUTHORS = ["Admin", "홍길동", "김개발", "이테스트", "박관리", "최설계"];

function generateMockQnAItems(count: number): QnAItem[] {
  const items: QnAItem[] = [];
  for (let i = 0; i < count; i++) {
    const no = count - i;
    const catIdx = i % CATEGORIES.length;
    const titleIdx = i % TITLES.length;
    const authorIdx = i % AUTHORS.length;
    const day = String(1 + (i % 28)).padStart(2, "0");
    const month = String(1 + (i % 3)).padStart(2, "0");
    items.push({
      no,
      category: CATEGORIES[catIdx],
      title: TITLES[titleIdx],
      hasReply: i % 3 === 0,
      author: AUTHORS[authorIdx],
      createdAt: `2026-${month}-${day} 10:00`,
      status: i % 2 === 0 ? "답변완료" : "답변대기",
    });
  }
  return items;
}

const ALL_QNA_ITEMS = generateMockQnAItems(30);

export interface QnAQueryParams {
  category: string;
  searchScope: string;
  keyword: string;
  page: number;
  pageSize: number;
  sortKey: string | null;
  sortDir: "asc" | "desc" | null;
}

export function getQnAList(params: QnAQueryParams) {
  let filtered = [...ALL_QNA_ITEMS];

  if (params.category && params.category !== "전체") {
    filtered = filtered.filter((item) => item.category === params.category);
  }

  if (params.keyword) {
    const kw = params.keyword.toLowerCase();
    if (params.searchScope === "제목") {
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(kw));
    } else if (params.searchScope === "작성자") {
      filtered = filtered.filter((item) => item.author.toLowerCase().includes(kw));
    } else {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(kw) ||
          item.author.toLowerCase().includes(kw)
      );
    }
  }

  if (params.sortKey && params.sortDir) {
    const dir = params.sortDir === "asc" ? 1 : -1;
    filtered.sort((a, b) => {
      const aVal = a[params.sortKey as keyof QnAItem];
      const bVal = b[params.sortKey as keyof QnAItem];
      if (typeof aVal === "number" && typeof bVal === "number") return (aVal - bVal) * dir;
      if (typeof aVal === "string" && typeof bVal === "string") return aVal.localeCompare(bVal) * dir;
      return 0;
    });
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));
  const page = Math.min(params.page, totalPages);
  const start = (page - 1) * params.pageSize;
  const items = filtered.slice(start, start + params.pageSize);

  return { items, total, page, pageSize: params.pageSize, totalPages };
}

export function getQnADetail(id: number): QnADetail | null {
  const item = ALL_QNA_ITEMS.find((i) => i.no === id);
  if (!item) return null;

  const hasComments = item.hasReply;

  return {
    id: item.no,
    category: item.category,
    title: item.title,
    author: item.author,
    createdAt: item.createdAt,
    views: 100 + item.no * 7,
    content:
      "안녕하세요.\n\n" +
      item.title.replace(".", "") +
      "\n\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n감사합니다.",
    attachments:
      item.no % 4 === 0
        ? [
            {
              id: `att-${item.no}-1`,
              name: `Q&A_첨부파일_${item.no}.xlsx`,
              downloads: 5 + item.no,
              size: "1.2MB",
              uploadedAt: item.createdAt,
            },
          ]
        : [],
    comments: hasComments
      ? [
          {
            id: `cmt-${item.no}-1`,
            content:
              "내가 작성한 요구명세 내용 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            author: "Admin",
            createdAt: item.createdAt,
            updatedAt: item.createdAt,
          },
        ]
      : [],
  };
}
