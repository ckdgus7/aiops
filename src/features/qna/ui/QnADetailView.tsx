import { useState, useEffect, type CSSProperties } from "react";
import { useParams, useNavigate } from "react-router";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { PageTitle } from "@/shared/ui/PageTitle";
import { Button } from "@/shared/ui/Button";
import { Textarea } from "@/shared/ui/Textarea";
import { AlertModal } from "@/shared/ui/AlertModal";
import { Snackbar } from "@/shared/ui/Snackbar";
import { useMdiStore } from "@/shared/model/mdi.store";
import { useQnADetailQuery } from "@/features/qna/api/qna.queries";
import type { QnAComment } from "@/features/qna/model/types";
import { QnAEditPopup } from "@/features/qna/ui/QnAEditPopup";

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

function getCategoryBadgeStyle(category: string): CSSProperties {
  if (category === "이용문의") {
    return { backgroundColor: "#fafaff", border: "1px solid #7a5af8", color: "#7a5af8" };
  }
  if (category === "기술") {
    return { backgroundColor: "#f0fdf4", border: "1px solid #16a34a", color: "#16a34a" };
  }
  return { backgroundColor: "#fafafa", border: "1px solid #a1a1aa", color: "#a1a1aa" };
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
  commentSection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    minHeight: 40,
  } satisfies CSSProperties,
  commentTitle: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "24px",
    color: "#18181b",
  } satisfies CSSProperties,
  commentBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 20,
    height: 20,
    padding: "0 6px",
    borderRadius: 10,
    backgroundColor: "#7a5af8",
    fontFamily: FONT,
    fontSize: 11,
    fontWeight: 600,
    lineHeight: "16px",
    color: "#ffffff",
  } satisfies CSSProperties,
  commentEditorWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  } satisfies CSSProperties,
  commentEditorBtnRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  commentListWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    border: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  commentItemWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
  } satisfies CSSProperties,
  commentContent: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "22px",
    color: "#3f3f46",
    whiteSpace: "pre-wrap",
  } satisfies CSSProperties,
  commentMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  } satisfies CSSProperties,
  commentMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  commentMetaLabel: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  commentMetaValue: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#71717a",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  commentBtnRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingTop: 4,
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

interface CommentEditorProps {
  onSubmit: (content: string) => void;
}

function CommentEditor({ onSubmit }: CommentEditorProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <div style={ds.commentEditorWrap}>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력해주세요."
        rows={6}
        maxLength={2000}
      />
      <div style={ds.commentEditorBtnRow}>
        <Button size="m" variant="filled" color="positive" onClick={handleSubmit}>
          댓글등록
        </Button>
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: QnAComment;
  onEdit: (comment: QnAComment) => void;
  onDelete: (comment: QnAComment) => void;
}

function CommentItem({ comment, onEdit, onDelete }: CommentItemProps) {
  return (
    <div style={ds.commentItemWrap}>
      <div style={ds.commentContent}>{comment.content}</div>
      <div style={ds.commentMetaRow}>
        <div style={ds.commentMetaItem}>
          <span style={ds.commentMetaLabel}>작성자</span>
          <span style={ds.commentMetaValue}>{comment.author}</span>
        </div>
        <div style={ds.commentMetaItem}>
          <span style={ds.commentMetaLabel}>등록일시</span>
          <span style={ds.commentMetaValue}>{comment.createdAt}</span>
        </div>
      </div>
      <div style={ds.commentBtnRow}>
        <Button size="s" variant="outlined" color="info" onClick={() => onEdit(comment)}>
          수정
        </Button>
        <Button size="s" variant="outlined" color="info" onClick={() => onDelete(comment)}>
          삭제
        </Button>
      </div>
    </div>
  );
}

export function QnADetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addTab = useMdiStore((st) => st.addTab);
  const qnaId = Number(id) || 0;

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [commentDeleteAlertOpen, setCommentDeleteAlertOpen] = useState(false);
  const [commentDeleteSnackbarOpen, setCommentDeleteSnackbarOpen] = useState(false);
  const [commentSnackbarOpen, setCommentSnackbarOpen] = useState(false);
  const [_pendingDeleteComment, setPendingDeleteComment] = useState<QnAComment | null>(null);
  const { data: detail, isLoading, isError } = useQnADetailQuery(qnaId);

  useEffect(() => {
    if (detail) {
      addTab({
        id: `/qna/${qnaId}`,
        label: detail.title.length > 12 ? detail.title.slice(0, 12) + "..." : detail.title,
        path: `/qna/${qnaId}`,
      });
    }
  }, [detail, qnaId, addTab]);

  const handleGoList = () => {
    navigate("/qna");
  };

  const handleCommentSubmit = (_content: string) => {
    setCommentSnackbarOpen(true);
  };

  const handleCommentEdit = (_comment: QnAComment) => {
    // edit logic placeholder
  };

  const handleCommentDelete = (comment: QnAComment) => {
    setPendingDeleteComment(comment);
    setCommentDeleteAlertOpen(true);
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

  if (isError || !detail) {
    return (
      <div style={ds.outer}>
        <PageHeader>
          <Breadcrumb items={[{ label: "게시판" }, { label: "Q&A" }, { label: "상세" }]} />
          <PageTitle title="Q&A" favoriteKey="Q&A" />
        </PageHeader>
        <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
          Q&A를 찾을 수 없습니다.
        </div>
        <div style={{ padding: "0 32px 32px" }}>
          <Button size="l" variant="outlined" color="info" leadingIcon={<BackIcon />} onClick={handleGoList}>
            목록
          </Button>
        </div>
      </div>
    );
  }

  const commentCount = detail.comments.length;

  return (
    <div style={ds.outer}>
      <PageHeader>
        <Breadcrumb items={[{ label: "게시판" }, { label: "Q&A" }, { label: "상세" }]} />
        <PageTitle title="Q&A" favoriteKey="Q&A" />
      </PageHeader>

      <div style={ds.main}>
        <div style={ds.contentWrap}>
          <div style={ds.metaRow}>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>분류</span>
              <span style={{ ...ds.categoryBadge, ...getCategoryBadgeStyle(detail.category) }}>
                {detail.category}
              </span>
            </div>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>작성자</span>
              <span style={ds.metaValue}>{detail.author}</span>
            </div>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>등록일</span>
              <span style={ds.metaValue}>{detail.createdAt}</span>
            </div>
            <div style={ds.metaItem}>
              <span style={ds.metaLabel}>조회수</span>
              <span style={ds.metaValue}>{detail.views}</span>
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
              {detail.title}
            </div>
            <div style={ds.contentBody}>
              {detail.content}
            </div>
          </div>

          {detail.attachments.length > 0 && (
            <div style={ds.attachSection}>
              <span style={ds.attachLabel}>첨부</span>
              <div style={ds.fileList}>
                {detail.attachments.map((file) => (
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

          <div style={ds.commentSection}>
            <div style={ds.commentHeader}>
              <span style={ds.commentTitle}>댓글</span>
              <span style={ds.commentBadge}>{commentCount}</span>
            </div>

            {commentCount === 0 ? (
              <CommentEditor onSubmit={handleCommentSubmit} />
            ) : (
              <div style={ds.commentListWrap}>
                {detail.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onEdit={handleCommentEdit}
                    onDelete={handleCommentDelete}
                  />
                ))}
              </div>
            )}
          </div>
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
            <Button size="l" variant="outlined" color="info" onClick={() => setDeleteAlertOpen(true)}>
              삭제
            </Button>
          </div>
        </div>
      </div>

      <QnAEditPopup
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        detail={detail}
      />

      <AlertModal
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        type="warning"
        message={
          <>
            등록된 정보를 삭제하시겠습니까?
            <br />
            이 작업은 복구할 수 없습니다.
          </>
        }
        showCancel
        cancelLabel="취소"
        confirmLabel="삭제"
        onCancel={() => setDeleteAlertOpen(false)}
        onConfirm={() => {
          setDeleteAlertOpen(false);
          setDeleteSnackbarOpen(true);
        }}
      />

      <Snackbar
        open={deleteSnackbarOpen}
        onClose={() => setDeleteSnackbarOpen(false)}
        message="삭제 되었습니다."
        type="success"
      />

      <AlertModal
        open={commentDeleteAlertOpen}
        onClose={() => setCommentDeleteAlertOpen(false)}
        type="warning"
        message="댓글을 삭제하시겠습니까?"
        showCancel
        cancelLabel="취소"
        confirmLabel="삭제"
        onCancel={() => {
          setCommentDeleteAlertOpen(false);
          setPendingDeleteComment(null);
        }}
        onConfirm={() => {
          setCommentDeleteAlertOpen(false);
          setPendingDeleteComment(null);
          setCommentDeleteSnackbarOpen(true);
        }}
      />

      <Snackbar
        open={commentDeleteSnackbarOpen}
        onClose={() => setCommentDeleteSnackbarOpen(false)}
        message="댓글이 삭제되었습니다."
        type="success"
      />

      <Snackbar
        open={commentSnackbarOpen}
        onClose={() => setCommentSnackbarOpen(false)}
        message="댓글이 등록되었습니다."
        type="success"
      />
    </div>
  );
}