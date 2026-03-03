# track-b-react-notices

## Overview

A React frontend application built with Vite, TypeScript, React Router v7, TanStack Query, and Zustand. It follows a feature-based architecture with a NOVA AI DevOps themed layout (vertical sidebar + content area).

## Project Structure

```
src/
  app/          - App root, providers, router setup
  features/     - Feature modules (notices, qna)
  pages/        - Page-level components
  shared/       - Shared utilities and UI components (GNB, LNB, Layout)
  main.tsx      - Application entry point
index.html      - HTML shell
vite.config.ts  - Vite configuration
```

## Menu Structure & Routes

### 요구관리
- 요구사항 `/requirements`
- 요구사항 명세 작성 `/requirements/spec`
- 요구사항 검토자 배정 `/requirements/reviewer`
- 요구사항 검토 `/requirements/review`
- 요구상세 `/requirements/detail`
- 요구상세 승인 `/requirements/approval`
- 요구사항 반려 검토 `/requirements/reject-review`
- 업무 Flow 설계 `/requirements/flow-design`
- 애플리케이션 설계 `/requirements/app-design`

### UI 관리
- SB기획 `/ui/sb-planning`
- UI디자인 `/ui/design`
- 퍼블리싱 `/ui/publishing`

### 기능관리
- 기능설계 `/features/design`
- 상세기능 설계 `/features/detail-design`

### 게시판
- 공지사항 `/notices` (fully implemented with search/pagination)
- Q&A `/qna`

### SSF관리
- 도메인(L1)정보 관리 `/ssf/domain`
- 컴포넌트(L2)정보 관리 `/ssf/component`
- 업무(L3)정보 관리 `/ssf/business`
- 기능(L4)정보 관리 `/ssf/function`
- SSF탐색기 `/ssf/explorer`

### 워크스페이스
- 사용자 관리 `/workspace/users`
- 사이트 이용약관 관리 `/workspace/terms`
- 개인정보 처리방침 관리 `/workspace/privacy`

### 업무 기준 정보 관리
- 업무Flow 관리 `/business-info/flow`
- 화면 기준 정보 관리 `/business-info/screen`
- 개발 진척 관리 `/business-info/progress`
- 과제 관리 `/business-info/project`

Pages with full UI implementation:
- 공지사항 (`/notices`) — table list with search, pagination
- 요구사항 (`/requirements`) — card list with filter bar (date range, status, search scope + keyword), tabs (All/Personal), chip sort (Update 일시/완료 희망일), pagination, and requirement cards (status circle badge, req ID, title, due date, task, updated time, author with role icon)

All other pages are blank placeholder pages using the shared `BlankPage` component.

## Shared UI Components

- **LNB** (`src/shared/ui/LNB.tsx`): Main Sidebar - logo, collapsible GNB/LNB navigation sections, favorites, collapse toggle (240px ↔ 44px)
- **Layout** (`src/shared/ui/Layout.tsx`): Wrapper combining sidebar + content area
- **PageHeader** (`src/shared/ui/PageHeader.tsx`): Site header wrapper combining MDI Tab (36px) + page title wrap (120px). Contains MdiTab at top and renders children (Breadcrumb + PageTitle) in white content area with 24px/32px padding.
- **MdiTab** (`src/shared/ui/MdiTab.tsx`): MDI tab bar (36px, bg #fafafa). Each tab has label + close button, max-width 240px. Managed by Zustand store (`mdi.store.ts`). Pages register their own tab via `useMdiStore.addTab()`.
- **Breadcrumb** (`src/shared/ui/Breadcrumb.tsx`): Navigation breadcrumb with home icon, chevron dividers. 12px Pretendard font. Last item is active (#3f3f46, Medium weight) with hover underline.
- **PageTitle** (`src/shared/ui/PageTitle.tsx`): Page title (32px Bold, 40px line-height) with optional status badge (purple #7a5af8) and ID badge (blue #36bffa), favorite button (1px solid black border, 3px padding), optional back button, refresh button, and CTA action slot.
- **PageFooter** (`src/shared/ui/PageFooter.tsx`): Footer with copyright text (10px #a1a1aa) and links (서비스 이용약관 12px Regular, 개인정보처리방침 12px Bold in #52525b). Border-top #e4e4e7, padding 16px 32px.
- **Typography** (`src/shared/ui/styles.ts`): Figma-based typography system with `typography.title` (page 32/40, popup 24/32), `typography.paragraphTitle` (xl→xs: 20→12, Bold/Medium), `typography.paragraph` (xl→xs: 20→10, Regular), `typography.field` (labelM/S, valueL/M, indicator, placeholderL). All Pretendard. Import as `import { typography } from "@/shared/ui/styles"`.
- **Button** (`src/shared/ui/Button.tsx`): Figma-based button component. Props: `size` (l/m/s → 40/32/24px), `variant` (filled/outlined/text), `color` (positive #7a5af8, negative #f04438, warning #f79009, success #1ac057, info #71717a), `disabled` (opacity 0.4), `leadingIcon`, `trailingIcon`, `children`. Font: L=16px Bold, M=14px Medium, S=12px Regular. Border-radius 4px. Named export `Button`.
- **Input** (`src/shared/ui/Input.tsx`): Figma-based input field. Props: `label`, `required` (6px blue dot), `leftIcon`, `rightIcon`, `indicator` (char count), `error` (red border #f04438), `disabled`, `helperText`. Field base: 40px height, 8px padding, border 1px solid #e4e7ec, radius 4px. Focus border #7a5af8. Text: Pretendard Regular 16px/24px. Label: Medium 14px/18px #a1a1aa.
- **DatePicker** (`src/shared/ui/DatePicker.tsx`): Figma-based date picker field. Same Field pattern as Input. Props: `value` (string), `onChange` (string callback), `label`, `required`, `disabled`, `error`, `helperText`. Right calendar icon (SVG). Native browser picker icon hidden. Focus/error border same as Input.
- **SelectBox** (`src/shared/ui/SelectBox.tsx`): Figma-based select dropdown. Same Field pattern. Props: `value`, `onChange` (string callback), `options` ({label, value}[]), `placeholder`, `label`, `required`, `disabled`, `error`, `helperText`. Custom dropdown with chevron icon (rotates on open). Hover #f4f4f5, active #ede9fe. Outside click to close. Max dropdown height 240px.
- When composing screens, import and use the common components (such as Button, Input, Datepicker, SelectBox, etc.) that are defined in `shared/ui`.
- **All styles use inline CSSProperties** (no CSS files, no Tailwind). Pretendard font family.


## Tech Stack

- **React 19** with TypeScript
- **Vite 5** as the build tool and dev server
- **React Router 7** for client-side routing
- **TanStack React Query 5** for server state management
- **Zustand 4** for client state management

## Running the App

The dev server runs on port 5000 (0.0.0.0) via:

```
npm run dev
```

## Deployment

Configured as a **static** deployment:
- Build command: `npm run build`
- Public directory: `dist`


# Prompt Rules
Always maintain the folder structure as defined below.

When a new scre* Never modify common components in shared/ui unless requested.en is created, add the corresponding domain under features and pages at the appropriate location and proceed accordingly.
src/
 ├─ app/
 │   ├─ providers/
 │   ├─ router/
 │   └─ store/
 ├─ features/
 │   ├─ notices/
 │   │   ├─ components/
 │   │   ├─ hooks/
 │   │   ├─ api/
 │   │   ├─ model/
 │   │   ├─ ui/
 │   ├─ qna/
 │   │   ├─ api/
 │   │   ├─ model/
 │   │   ├─ ui/
 ├─ pages/
 │   ├─ notices/
 │   ├─ requirements/
 │   ├─ ui-management/
 │   ├─ feature-management/
 │   ├─ qna/
 ├─ shared/
 │   ├─ components/
 │   ├─ hooks/
 │   └─ lib/
 │   └─ ui/
 │   └─ utils/


## Component Rules

* All components must be function components.
* Props must be defined using an `interface`.
* `export default` is prohibited (use named exports only).

---

## Hook Rules

* Server state must use React Query only.
* Direct API calls are prohibited.

---

## State Ownership Rules

### R1. Server State must use React Query only

* Do not store remote data (GET/POST/PATCH/DELETE results) in Zustand.
* The Query Cache is the single source of truth for globally stored server data.

### R2. Client State must use Zustand only

* UI state (modal/toast/sidebar), temporary drafts, and wizard progress must use Zustand.
* Do not store UI state inside the React Query cache.

### R3. Shareable State must use URL (Search Params) only

* List filters/sorting/pagination/tabs must not use Zustand; manage them only via `useSearchParams`.
* URL state must be connected to Query key parameters.

---

## Query Key / Caching Rules

### R4. Enforce Query Key namespace

* Only the pattern below is allowed:

  ```ts
  featureKeys = { all, list(params), detail(id), ... }
  ```
* Hardcoded string queryKeys are prohibited.

### R5. Fix Query Key parameter shape

* `params` must always maintain the same shape (inject default values for missing fields).
* `page` must be a number.
* `q/sort` must be normalized as string/enum before composing the query key.

### R6. List pagination UX rule

* List queries must use `keepPreviousData` (or `placeholderData`) by default.
* Arbitrary use of `staleTime = 0` is prohibited (follow the default staleTime policy).

---

## Mutation / Synchronization Rules

### R7. Standardize synchronization after mutation success

After a successful mutation, 반드시 one of the following must be executed:

* `invalidateQueries({ queryKey: featureKeys.all })`
* Update cache directly using `setQueryData` (including optimistic updates)

### R8. Do not store server responses in Zustand during mutation

* If necessary, only store `id` or selection state in Zustand.

---

## Router Integration Rules

### R9. Route-level data prefetching (optional rule)

* Prefer using `queryClient.prefetchQuery` before route entry.
* Do not enforce for all routes; focus on core list/detail pages.

### R10. Centralize URL parameter parsing/validation

* Normalize via a utility function such as `parseBoardListSearchParams()`.
* Duplicate parsing logic inside components is prohibited.

---

## Zustand Store Design Rules

### R11. Store separation principle

* Separate by purpose: `uiStore`, `sessionStore`, `draftStore`, etc.
* Even if feature stores are created, storing server data is prohibited.

### R12. Enforce selector usage

* Full subscription via `useStore()` is prohibited.
* Only selector usage is allowed: `useStore(s => s.xxx)` (to prevent excessive re-renders).

### R13. Persist usage criteria (optional rule)

`persist` is allowed only for:

* Theme / language / UX preferences
* Authentication-related data (upon policy approval)

Filters and pagination must not use persist (= URL is the source of truth).

---

## API Layer Rules

### R14. Restrict direct API calls

* Direct `fetch/axios` calls inside components are prohibited.
* API calls are allowed only in:

  * `features/*/api/*`
  * `shared/api/*`

### R15. API types belong to feature/types

* Request/response types must be located within the feature.
* Usage of `any` is prohibited (enforced via ESLint).

---

## Code Generation / Vibe Coding AI Rules (Operational Rules)

### R18. Always decide state ownership first

The generation prompt must explicitly include:

* Whether it is Server State
* Whether it is URL State
* Whether Zustand is required

### R19. File-level responsibility for generated code

* `components` handle rendering only; data fetching must be separated into `queries/hooks`.
* Combining Router + Query + UI logic in a single file is prohibited (enforce max line/complexity limits).
