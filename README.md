# Track B - React + React Router + TanStack Query + Zustand (Runnable)

## 실행
```bash
npm install
npm run dev
```

- URL: http://localhost:5173/notices
- 이 프로젝트는 백엔드 없이도 바로 실행되도록 `src/shared/lib/http.ts`에서 `/api/*` 요청을 **인메모리 mock**으로 처리합니다.
- 실제 백엔드가 준비되면 `http.ts`의 mock 분기( `mockApi()` )를 제거하고, `fetch()`만 사용하도록 바꾸면 됩니다.

## 구조(요약)
- `features/notices/api`: TanStack Query hooks (server state)
- `features/notices/model`: Zustand UI state (draft/applied query)
- `pages`: route entry (thin)
- `shared/lib/http.ts`: fetch wrapper + mock API
