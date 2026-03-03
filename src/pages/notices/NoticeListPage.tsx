import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useNoticesQuery } from "@/features/notices/api/notices.queries";
import { NoticeListView } from "@/features/notices/ui/NoticeListView";

function parseNoticeSearchParams(sp: URLSearchParams) {
  return {
    title: sp.get("title") ?? "",
    fromDate: sp.get("fromDate") ?? "",
    toDate: sp.get("toDate") ?? "",
    page: Math.max(1, Number(sp.get("page") ?? 1)),
    pageSize: 10,
  };
}

export default function NoticeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => parseNoticeSearchParams(searchParams), [searchParams]);

  const [titleDraft, setTitleDraft] = useState(params.title);
  const [fromDateDraft, setFromDateDraft] = useState(params.fromDate);
  const [toDateDraft, setToDateDraft] = useState(params.toDate);

  useEffect(() => {
    setTitleDraft(params.title);
    setFromDateDraft(params.fromDate);
    setToDateDraft(params.toDate);
  }, [params.title, params.fromDate, params.toDate]);

  const { data, isLoading, isError } = useNoticesQuery(params);

  const handleSearch = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (titleDraft) next.set("title", titleDraft);
      else next.delete("title");
      if (fromDateDraft) next.set("fromDate", fromDateDraft);
      else next.delete("fromDate");
      if (toDateDraft) next.set("toDate", toDateDraft);
      else next.delete("toDate");
      next.set("page", "1");
      return next;
    });
  }, [titleDraft, fromDateDraft, toDateDraft, setSearchParams]);

  const handleReset = useCallback(() => {
    setTitleDraft("");
    setFromDateDraft("");
    setToDateDraft("");
    setSearchParams({});
  }, [setSearchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(page));
        return next;
      });
    },
    [setSearchParams]
  );

  return (
    <NoticeListView
      titleDraft={titleDraft}
      fromDateDraft={fromDateDraft}
      toDateDraft={toDateDraft}
      items={data?.items ?? []}
      total={data?.total ?? 0}
      page={data?.page ?? params.page}
      totalPages={data?.totalPages ?? 1}
      loading={isLoading}
      error={isError}
      onTitleDraftChange={setTitleDraft}
      onFromDateDraftChange={setFromDateDraft}
      onToDateDraftChange={setToDateDraft}
      onReset={handleReset}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
    />
  );
}
