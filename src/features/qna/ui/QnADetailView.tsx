import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/shared/ui/global/Button";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { useMdiStore } from "@/shared/model/mdi.store";
import { useQnADetailQuery } from "@/features/qna/api/qna.queries";
import type { QnAComment } from "@/features/qna/model/types";
import { QnAEditPopup } from "@/features/qna/ui/QnAEditPopup";
import { FONT, detailStyles } from "@/shared/ui/styles";

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
      <ToastEditor
        value={content}
        onChange={setContent}
        placeholder="댓글을 입력해주세요."
        minHeight={150}
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

  const handleGoBack = () => {
    navigate("/notices/");
  };

  usePageHeader({
    breadcrumbItems: [{ label: "게시판" }, { label: "Q&A" }, { label: "상세" }],
    title: detail?.title ?? "Q&A",
    favoriteKey: detail?.title ?? "Q&A",
    onBack: handleGoBack,
  });

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
      <div style={detailStyles.outer}>
        <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
          Loading...
        </div>
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div style={detailStyles.outer}>
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
    <div style={detailStyles.outer}>
      <div style={detailStyles.main}>
        <div style={detailStyles.contentWrap}>
          <div style={detailStyles.metaRow}>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>구분</span>
              <span style={detailStyles.metaValue}>{detail.category}</span>
            </div>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>작성자</span>
              <span style={detailStyles.metaValue}>{detail.author}</span>
            </div>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>작성일시</span>
              <span style={detailStyles.metaValue}>{detail.createdAt}</span>
            </div>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>처리상태</span>
              <span style={detailStyles.metaValue}>{detail.views}</span>
            </div>
          </div>

          <div style={detailStyles.contentSection}>
            <div style={detailStyles.contentBody}>
              {detail.content}
            </div>
          </div>

          {detail.attachments.length > 0 && (
            <div style={detailStyles.attachSection}>
              <span style={detailStyles.attachLabel}>첨부</span>
              <div style={detailStyles.fileList}>
                {detail.attachments.map((file) => (
                  <div key={file.id} style={detailStyles.fileItem}>
                    <div style={detailStyles.fileNameWrap}>
                      <FileIcon />
                      <span style={detailStyles.fileName}>{file.name}</span>
                    </div>
                    <div style={detailStyles.fileMeta}>
                      <div style={detailStyles.fileMetaItem}>
                        <span style={detailStyles.fileMetaLabel}>Download</span>
                        <span style={detailStyles.fileMetaValue}>{file.downloads}</span>
                      </div>
                      <div style={detailStyles.fileMetaItem}>
                        <span style={detailStyles.fileMetaLabel}>Size</span>
                        <span style={detailStyles.fileMetaValue}>{file.size}</span>
                      </div>
                      <div style={detailStyles.fileMetaItem}>
                        <span style={detailStyles.fileMetaLabel}>등록일시</span>
                        <span style={detailStyles.fileMetaValue}>{file.uploadedAt}</span>
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
