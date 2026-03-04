import { useState, useEffect, type CSSProperties } from "react";
import { useParams, useNavigate } from "react-router";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { PageTitle } from "@/shared/ui/PageTitle";
import { Button } from "@/shared/ui/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { useNoticeDetailQuery } from "@/features/notices/api/notices.queries";
import { NoticeEditPopup } from "@/features/notices/ui/NoticeEditPopup";

const FONT = "'Pretendard', sans-serif";

function FileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8L13 2Z" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 2V8H19" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 6L9 12L15 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ds = {
  outer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100%",
    fontFamily: FONT,
  } satisfies CSSProperties,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 32,
    flex: 1,
  } satisfies CSSProperties,
  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  } satisfies CSSProperties,
  metaRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 32,
    flexWrap: "wrap",
  } satisfies CSSProperties,
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  metaLabel: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  metaValue: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  categoryBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    borderRadius: 4,
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  contentSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  contentLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  contentBody: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "22px",
    color: "#3f3f46",
    whiteSpace: "pre-wrap",
    minHeight: 100,
    padding: "12px 0",
  } satisfies CSSProperties,
  attachSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  attachLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    padding: "8px 12px 8px 8px",
    backgroundColor: "#ffffff",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    boxSizing: "border-box",
    cursor: "pointer",
  } satisfies CSSProperties,
  fileNameWrap: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: 4,
    minWidth: 0,
  } satisfies CSSProperties,
  fileName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
  } satisfies CSSProperties,
  fileMeta: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  } satisfies CSSProperties,
  fileMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  fileMetaLabel: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  fileMetaValue: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  btnRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  } satisfies CSSProperties,
  btnLeft: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  } satisfies CSSProperties,
  btnRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
  } satisfies CSSProperties,
};

function getCategoryBadgeStyle(category: string): CSSProperties {
  if (category === "공지") {
    return {
      backgroundColor: "#fafaff",
      border: "1px solid #7a5af8",
      color: "#7a5af8",
    };
  }
  return {
    backgroundColor: "#fafafa",
    border: "1px solid #a1a1aa",
    color: "#a1a1aa",
  };
}

export function NoticeDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addTab = useMdiStore((st) => st.addTab);
  const noticeId = Number(id) || 0;

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const { data: notice, isLoading, isError } = useNoticeDetailQuery(noticeId);

  useEffect(() => {
    if (notice) {
      addTab({
        id: `/notices/${noticeId}`,
        label: notice.title.length > 12 ? notice.title.slice(0, 12) + "..." : notice.title,
        path: `/notices/${noticeId}`,
      });
    }
  }, [notice, noticeId, addTab]);

  const handleGoList = () => {
    navigate("/notices");
  };

  if (isLoading) {
    return (
      <div style={ds.outer}>
        <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
          Loading...
        </div>
      </div>
    );
  }

  if (isError || !notice) {
    return (
      <div style={ds.outer}>
        <PageHeader>
          <Breadcrumb items={[{ label: "게시판" }, { label: "공지사항" }, { label: "상세" }]} />
          <PageTitle title="공지사항" favoriteKey="공지사항" />
        </PageHeader>
        <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
          공지사항을 찾을 수 없습니다.
        </div>
        <div style={{ padding: "0 32px 32px" }}>
          <Button size="l" variant="outlined" color="info" leadingIcon={<BackIcon />} onClick={handleGoList}>
            목록
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={ds.outer}>
      <PageHeader>
        <Breadcrumb items={[{ label: "게시판" }, { label: "공지사항" }, { label: "상세" }]} />
        <PageTitle title="공지사항" favoriteKey="공지사항" />
      </PageHeader>

      <div style={ds.main}>
        <div style={ds.contentWrap}>
          <div style={ds.metaRow}>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>분류</span>
              <span style={{ ...ds.categoryBadge, ...getCategoryBadgeStyle(notice.category) }}>
                {notice.category}
              </span>
            </div>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>작성자</span>
              <span style={ds.metaValue}>{notice.author}</span>
            </div>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>등록일</span>
              <span style={ds.metaValue}>{notice.createdAt}</span>
            </div>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>조회수</span>
              <span style={ds.metaValue}>{notice.views}</span>
            </div>
          </div>

          <div style={ds.contentSection}>
            <span style={ds.contentLabel}>제목</span>
            <div style={{
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "24px",
              color: "#18181b",
              padding: "4px 0",
            }}>
              {notice.isPinned && (
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2px 8px",
                  borderRadius: 4,
                  backgroundColor: "#fef3f2",
                  border: "1px solid #f04438",
                  color: "#f04438",
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: "16px",
                  marginRight: 8,
                  verticalAlign: "middle",
                }}>필독</span>
              )}
              {notice.title}
            </div>
            <div style={ds.contentBody}>
              {notice.content}
            </div>
          </div>

          {notice.attachments.length > 0 && (
            <div style={ds.attachSection}>
              <span style={ds.attachLabel}>첨부</span>
              <div style={ds.fileList}>
                {notice.attachments.map((file) => (
                  <div key={file.id} style={ds.fileItem}>
                    <div style={ds.fileNameWrap}>
                      <FileIcon />
                      <span style={ds.fileName}>{file.name}</span>
                    </div>
                    <div style={ds.fileMeta}>
                      <div style={ds.fileMetaItem}>
                        <span style={ds.fileMetaLabel}>Download</span>
                        <span style={ds.fileMetaValue}>{file.downloads}</span>
                      </div>
                      <div style={ds.fileMetaItem}>
                        <span style={ds.fileMetaLabel}>Size</span>
                        <span style={ds.fileMetaValue}>{file.size}</span>
                      </div>
                      <div style={ds.fileMetaItem}>
                        <span style={ds.fileMetaLabel}>등록일시</span>
                        <span style={ds.fileMetaValue}>{file.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={ds.btnRow}>
          <div style={ds.btnLeft}>
            <Button size="l" variant="outlined" color="info" leadingIcon={<BackIcon />} onClick={handleGoList}>
              목록
            </Button>
          </div>
          <div style={ds.btnRight}>
            <Button size="l" variant="outlined" color="info" onClick={() => setEditPopupOpen(true)}>
              수정
            </Button>
            <Button size="l" variant="outlined" color="info">
              삭제
            </Button>
          </div>
        </div>
      </div>

      <NoticeEditPopup
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        notice={notice}
      />
    </div>
  );
}
