import { useState, useEffect, type CSSProperties } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/shared/ui/global/Button";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { useMdiStore } from "@/shared/model/mdi.store";
import { useNoticeDetailQuery } from "@/features/notices/api/notices.queries";
import { NoticeEditPopup } from "@/features/notices/ui/NoticeEditPopup";
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

function getCategoryBadgeStyle(category: string): CSSProperties {
  if (category === "공통") {
    return {
      backgroundColor: "#fafaff",
      border: "1px solid #7a5af8",
      color: "#7a5af8",
    };
  }
  if (category === "업무") {
    return {
      backgroundColor: "#eff8ff",
      border: "1px solid #2e90fa",
      color: "#2e90fa",
    };
  }
  return {
    backgroundColor: "#f0fdf4",
    border: "1px solid #16a34a",
    color: "#16a34a",
  };
}

export function NoticeDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addTab = useMdiStore((st) => st.addTab);
  const noticeId = Number(id) || 0;

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const { data: notice, isLoading, isError } = useNoticeDetailQuery(noticeId);

  usePageHeader({
    breadcrumbItems: [{ label: "게시판" }, { label: "공지사항" }, { label: "상세" }],
    title: "공지사항",
    favoriteKey: "공지사항",
  });

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
      <div style={detailStyles.outer}>
        <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
          Loading...
        </div>
      </div>
    );
  }

  if (isError || !notice) {
    return (
      <div style={detailStyles.outer}>
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
    <div style={detailStyles.outer}>
      <div style={detailStyles.main}>
        <div style={detailStyles.contentWrap}>
          <div style={detailStyles.metaRow}>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>구분</span>
              <span style={detailStyles.metaValue}>{notice.category}</span>
            </div>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>작성자</span>
              <span style={detailStyles.metaValue}>{notice.author}</span>
            </div>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>게시일</span>
              <span style={detailStyles.metaValue}>{notice.createdAt}</span>
            </div>
            <div style={detailStyles.metaItem}>
              <span style={detailStyles.metaLabel}>조회수</span>
              <span style={detailStyles.metaValue}>{notice.views}</span>
            </div>
          </div>

          <div style={detailStyles.contentSection}>
            <div style={detailStyles.contentBody}>
              {notice.content}
            </div>
          </div>

          {notice.attachments.length > 0 && (
            <div style={detailStyles.attachSection}>
              <span style={detailStyles.attachLabel}>첨부</span>
              <div style={detailStyles.fileList}>
                {notice.attachments.map((file) => (
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
        </div>

        <div style={detailStyles.btnRow}>
          <div style={detailStyles.btnLeft}>
            <Button size="l" variant="outlined" color="info" leadingIcon={<BackIcon />} onClick={handleGoList}>
              목록
            </Button>
          </div>
          <div style={detailStyles.btnRight}>
            <Button size="l" variant="outlined" color="info" onClick={() => setEditPopupOpen(true)}>
              수정
            </Button>
            <Button size="l" variant="outlined" color="info" onClick={() => setDeleteAlertOpen(true)}>
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
        onConfirm={() => setDeleteSnackbarOpen(true)}
      />

      <Snackbar
        open={deleteSnackbarOpen}
        onClose={() => setDeleteSnackbarOpen(false)}
        message="삭제 되었습니다."
        type="success"
      />
    </div>
  );
}
