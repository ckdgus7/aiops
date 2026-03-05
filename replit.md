# track-b-react-notices

## Overview

A React frontend application built with Vite, TypeScript, React Router v7, TanStack Query, and Zustand. It follows a feature-based architecture with a NOVA AI DevOps themed layout (vertical sidebar + content area).

## Project Structure

```
src/
  app/          - App root, providers, router setup
  features/     - Feature modules (notices, qna, ssf)
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
- 공지사항 `/notices` (fully implemented: Figma-based design with category filter SelectBox, search scope SelectBox + keyword search, data table with 8 columns (번호/분류/제목/작성자/등록일/수정일/첨부/조회수), column sorting, category badges (공지/일반), pinned badge (필독), pagination with items-per-page, 30 mock rows, "등록" button opens create popup. Create popup: 880px modal with header (title + close + required indicator), form body (분류 RadioGroup 공지/필독공지/일반, 제목 Input + 작성자 Input row, 게시 RadioGroup 즉시, 내용 Textarea, 첨부 file upload with drag/click), footer (취소/임시저장/등록 buttons))
- Q&A `/qna`, Q&A 상세 `/qna/:id`

### SSF관리
- 도메인(L1)정보 관리 `/ssf/domain` (fully implemented: filter bar with ChooseButton + search, data table with sorting/pagination, 13 mock rows, detail/create/edit/delete popups; row click → detail popup → edit or delete)
- 컴포넌트(L2)정보 관리 `/ssf/component` (fully implemented: filter bar with ChooseButton (전체/사용/미사용) + 도메인(L1) SelectBox + 검색범위 SelectBox (컴포넌트(L2)명/컴포넌트ID/담당자명) + search input, data table with 9 columns (No/컴포넌트 ID/컴포넌트(한글)/컴포넌트(영문)/컴포넌트 설명/도메인(한글)/L2기획리더/L2설계리더/사용여부), column sorting, 사용여부 badges, pagination with items-per-page, 64 mock rows, 등록 button opens ComponentCreatePopup, row click opens ComponentDetailPopup. Detail popup: 880px modal with component info (ID/Korean/English names), History button + timeline (3 entries), leaders, description, usage status, domain info box (abbreviation/Korean/English names + description), 업무(L3) list with L3 badges and BPD/link/delete icons, footer with 닫기/수정 buttons. Edit popup (ComponentEditPopup): opened from detail popup's 수정 button, 880px modal with pre-populated fields (도메인 SelectBox, 컴포넌트 한글/영문 Input, L2기획/설계리더 Input+추가+leader list with L2 role icon/org/delete, TiptapEditor description, RadioGroup 사용여부), footer 닫기/저장. Delete popup (ComponentDeletePopup): opened from detail popup's 삭제 button, 880px modal with textarea (삭제 사유, required, 0/300 chars), footer 닫기/삭제(red, disabled when empty), AlertModal confirmation on delete)
- 업무(L3)정보 관리 `/ssf/business` (fully implemented: filter bar with 도메인(L1) SelectBox + 컴포넌트(L2) SelectBox + 검색범위 SelectBox (업무(L3)명/업무ID/담당자명) + search input, data table with 11 columns (checkbox/No/업무 ID/업무(한글)/업무(영문)/업무 설명/도메인(한글)/컴포넌트(한글)/L3기획리더/L3설계리더/사용여부), column sorting, 사용여부 badges, checkbox selection with 전체 선택, pagination with items-per-page, 120 mock rows, 등록 button)
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
- 공지사항 목록 (`/notices`) — Figma-based table list with category/search filters, 8-column sortable table with badges, pagination. Row click navigates to detail page.
- 공지사항 상세 (`/notices/:id`) — Figma-based detail view with metadata row (분류 badge, 작성자, 등록일, 조회수), title with pinned badge, content body, file attachments list (with download count, size, date), footer buttons (목록/수정/삭제). 수정 button opens edit popup (NoticeEditPopup) pre-populated with notice data (category, title, author, post type, content, existing attachments). Edit popup: 880px modal, same layout as create popup with title "공지사항 수정", footer (취소/임시저장/저장).
- Q&A 목록 (`/qna`) — Figma-based table list with category filter (전체/이용문의/기술), search scope + keyword, 6-column sortable table (번호/분류/제목/작성자/등록일/상태), status badges (답변완료/답변대기), reply icon on title, pagination, 등록 button. 30 mock rows. Row click navigates to detail page.
- Q&A 상세 (`/qna/:id`) — Figma-based detail view with metadata row (분류 badge, 작성자, 등록일, 조회수), title + content body, file attachments list, comment section. No comments → shows Textarea editor + 댓글등록 button. Has comments → shows comment list with content, author/date meta, 수정/삭제 buttons per comment. Footer: 목록 + 삭제 buttons. AlertModal for delete confirmation, Snackbar for success feedback.
- 요구사항 (`/requirements`) — card list with filter bar (date range, status, search scope + keyword), tabs (All/Personal), chip sort (Update 일시/완료 희망일), pagination, and requirement cards (status circle badge, req ID, title, due date, task, updated time, author with role icon)

All other pages are blank placeholder pages using the shared `BlankPage` component.

## Shared UI Components

- **LNB** (`src/shared/ui/LNB.tsx`): Main Sidebar - logo, collapsible GNB/LNB navigation sections, favorites, collapse toggle (240px ↔ 44px)
- **LayoutRoute** (`src/shared/ui/LayoutRoute.tsx`): Main layout wrapper combining LNB sidebar + right column (PageHeader fixed top + scrollable content area + PageFooter fixed bottom). PageHeader and PageFooter are managed at layout level — pages do NOT render them directly.
- **PageHeader** (`src/shared/ui/PageHeader.tsx`): Site header wrapper combining MDI Tab (36px) + page title wrap (120px). Rendered by LayoutRoute (not by individual pages). Reads breadcrumb/title from `pageHeader.store.ts` Zustand store. Pages set their header config via `usePageHeader()` hook from `src/shared/hooks/usePageHeader.ts`.
- **MdiTab** (`src/shared/ui/MdiTab.tsx`): MDI tab bar (36px, bg #fafafa). Each tab has label + close button, max-width 240px. Managed by Zustand store (`mdi.store.ts`). Pages register their own tab via `useMdiStore.addTab()`.
- **Breadcrumb** (`src/shared/ui/Breadcrumb.tsx`): Navigation breadcrumb with home icon, chevron dividers. 12px Pretendard font. Last item is active (#3f3f46, Medium weight) with hover underline.
- **PageTitle** (`src/shared/ui/PageTitle.tsx`): Page title (32px Bold, 40px line-height) with optional status badge (purple #7a5af8) and ID badge (blue #36bffa), favorite button (1px solid black border, 3px padding), optional back button, refresh button, and CTA action slot.
- **PageFooter** (`src/shared/ui/PageFooter.tsx`): Footer with copyright text (10px #a1a1aa) and links (서비스 이용약관 12px Regular, 개인정보처리방침 12px Bold in #52525b). Border-top #e4e4e7, padding 16px 32px. Rendered by LayoutRoute (not by individual pages).
- **Typography** (`src/shared/ui/styles.ts`): Figma-based typography system with `typography.title` (page 32/40, popup 24/32), `typography.paragraphTitle` (xl→xs: 20→12, Bold/Medium), `typography.paragraph` (xl→xs: 20→10, Regular), `typography.field` (labelM/S, valueL/M, indicator, placeholderL). All Pretendard. Import as `import { typography } from "@/shared/ui/styles"`.
- **Button** (`src/shared/ui/Button.tsx`): Figma-based button component. Props: `size` (l/m/s → 40/32/24px), `variant` (filled/outlined/text), `color` (positive #7a5af8, negative #f04438, warning #f79009, success #1ac057, info #71717a), `disabled` (opacity 0.4), `leadingIcon`, `trailingIcon`, `children`. Font: L=16px Bold, M=14px Medium, S=12px Regular. Border-radius 4px. Named export `Button`.
- **Input** (`src/shared/ui/Input.tsx`): Figma-based input field. Props: `label`, `required` (6px blue dot), `prefix` ("search" → built-in magnifier icon), `leftIcon`, `rightIcon`, `indicator` (char count), `error` (red border #f04438), `disabled`, `helperText`. Field base: 40px height, 8px padding, border 1px solid #e4e7ec, radius 4px. Focus border #7a5af8. Text: Pretendard Regular 16px/24px. Label: Medium 14px/18px #a1a1aa. `prefix` takes priority over nothing but `leftIcon` overrides `prefix`.
- **DatePicker** (`src/shared/ui/DatePicker.tsx`): Figma-based date picker field. Same Field pattern as Input. Props: `value` (string), `onChange` (string callback), `label`, `required`, `disabled`, `error`, `helperText`. Right calendar icon (SVG). Native browser picker icon hidden. Focus/error border same as Input.
- **SelectBox** (`src/shared/ui/SelectBox.tsx`): Figma-based select dropdown. Supports single and multi-select modes. **Single mode** (default): `value: string`, `onChange: (value: string) => void`. **Multi mode** (`multiple={true}`): `value: string[]`, `onChange: (value: string[]) => void`, displays selected items as chips (bg #fafaff, text #52525b 12px Medium, max-w 130px, border-radius 6px, X close icon 12px). Each chip has close button to remove. Clear all button (ClearIcon) when items selected. **Searchable** (`searchable={true}`): shows search input at top of dropdown with search icon, filters options by label. **Dropdown options**: multi-mode shows checkbox (20x20, checked #7a5af8 + white checkmark), single-mode shows text only. Option row: 40px height, padding 8px 16px. Hover #f4f4f5, selected #ede9fe. Max dropdown height 296px. Common props: `options` ({label, value}[]), `placeholder`, `label`, `required`, `disabled`, `error`, `helperText`, `searchPlaceholder`.
- **RadioGroup** (`src/shared/ui/RadioGroup.tsx`): Figma-based radio button group. Props: `value`, `onChange` (string callback), `options` ({label, value, disabled?}[]), `size` (l/m/s → 24/20/18px circle), `disabled`, `direction` (horizontal/vertical), `gap`. Checked: bg #7a5af8, white inner dot. Unchecked: white bg, border #e4e7ec, gray inner dot opacity 0.3. Disabled: bg #71717a opacity 0.6. Label: Pretendard Regular, color #3f3f46. Sizes: L=16px, M=14px, S=12px text.
- **ChooseButton** (`src/shared/ui/ChooseButton.tsx`): Figma-based radio button group (RadioBtnControl). Props: `value`, `onChange` (string callback — parent에서 실행할 함수 지정), `options` ({label, value}[]). Active: bg #7a5af8, Default: bg #bdb4fe. Text: Pretendard Regular 16px/24px #fafaff. Padding 12px/8px. Container border-radius 6px, overflow hidden. 3개 또는 4개 이상 버튼 지원.
- **Toggle** (`src/shared/ui/Toggle.tsx`): Figma-based toggle switch. Props: `checked`, `onChange` (boolean callback), `label`, `labelPosition` ("left"/"right" — 좌측/우측 레이블 위치), `size` (l/m/s → track 40/36/32px), `disabled`. Checked: track bg #7a5af8, white knob right. Unchecked: track white + border #e4e7ec, gray knob left opacity 0.3. Disabled checked: track #71717a opacity 0.6. Disabled unchecked: track #fcfcfd, knob #e4e7ec opacity 0.5. Knob sizes: L=16px, M=14px, S=12px.
- **Snackbar** (`src/shared/ui/Snackbar.tsx`): Figma-based snackbar/toast notification. Props: `open`, `onClose`, `message` (ReactNode), `type` (info #71717a, positive #7a5af8, negative #f04438, error #ee46bc, warning #f79009, success #1ac057), `duration` (auto-dismiss ms, default 3000). Container: 480px width, padding 24/12/16px, border-radius 8px, fixed bottom-center. Text: Pretendard Regular 16px/24px white. Close X 24x24 white.
- **AlertModal** (`src/shared/ui/AlertModal.tsx`): Figma-based alert modal dialog. Props: `open`, `onClose`, `type` (info/success/warning/error — 각각 다른 아이콘), `message` (ReactNode), `confirmLabel`, `cancelLabel`, `onConfirm`, `onCancel`, `showCancel` (true → 취소+삭제 2버튼, false → 확인 1버튼). Container: 440px width, padding 24px, border-radius 16px, shadow. Close X 버튼 top-right 10px. Icon 52x52px. Message: Pretendard Regular 16px/24px #71717a center. Backdrop overlay. ESC 키 닫기 지원. 기존 Button 컴포넌트 활용.
- **Textarea** (`src/shared/ui/Textarea.tsx`): Figma-based textarea field. Props: `label`, `required` (6px blue dot), `indicator` (charCount/maxLength, default true), `maxLength` (default 300), `error` (border #ee46bc), `helperText`, `readOnly` (bg #fafafa), `disabled` (bg #f4f4f5). Container: min-height 120px, padding 8px, border 1px solid, radius 4px, flex-col justify-between. Focus border #7a5af8. Text: Pretendard Regular 16px/24px #3f3f46. Indicator: 12px/18px #a1a1aa bottom-right.
- **Checkbox** (`src/shared/ui/Checkbox.tsx`): Figma-based checkbox. Props: `checked`, `onChange` (boolean callback), `label`, `size` (l/m/s → 24/20/18px box), `disabled`. Checked: bg #7a5af8, white checkmark SVG. Unchecked: white bg, border #e4e7ec. Disabled: bg #71717a opacity 0.6 (checked) or border opacity 0.6 (unchecked). Border-radius 4px (L/M) or 3px (S). Label: Pretendard Regular, color #3f3f46. Sizes: L=16px, M=14px, S=12px text.
- **TiptapEditor** (`src/shared/ui/TiptapEditor.tsx`): Rich text editor using Tiptap. Props: `value` (HTML string), `onChange` (html callback), `placeholder`, `minHeight` (default 300). Toolbar: H1-H3, bold/italic/underline/strikethrough, bullet/ordered list, blockquote/code block/horizontal rule, text align left/center/right, undo/redo. Extensions: StarterKit, Underline, TextAlign, Placeholder. Inline styles + injected CSS for ProseMirror.
- When composing screens, import and use the common components (such as Button, Input, Datepicker, SelectBox, RadioGroup, Checkbox, TiptapEditor, etc.) that are defined in `shared/ui`.
- **All styles use inline CSSProperties** (no CSS files, no Tailwind). Pretendard font family.


## Tech Stack

- **React 19** with TypeScript
- **Vite 7** as the build tool and dev server
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
* Use components and utilities, library, ui from the `shared` directory when constructing pages.
* When modifying a screen, do not make any changes to other domains unless explicitly requested.
* Please conduct a code review and verify that the build completes successfully, and check for any errors.
* When creating a page, always follow the folder structure rules and organize it under `features/ssf` with the appropriate `api`, `model`, and `ui` folders.

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
