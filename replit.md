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

## Features

- **Q&A** (`/qna`, `/`): Q&A list page with search, filtering, pagination (10 rows/page, 100 mock items)
- **Notices** (`/notices`, `/notices/:id`): Notice list and detail pages

## Shared UI Components

- **LNB** (`src/shared/ui/LNB.tsx`): Main Sidebar - logo, collapsible GNB/LNB navigation sections, favorites, collapse toggle (240px ↔ 44px)
- **Layout** (`src/shared/ui/Layout.tsx`): Wrapper combining sidebar + content area
- **PageHeader** (`src/shared/ui/PageHeader.tsx`): Site header wrapper combining MDI Tab (36px) + page title wrap (120px). Contains MdiTab at top and renders children (Breadcrumb + PageTitle) in white content area with 24px/32px padding.
- **MdiTab** (`src/shared/ui/MdiTab.tsx`): MDI tab bar (36px, bg #fafafa). Each tab has label + close button, max-width 240px. Managed by Zustand store (`mdi.store.ts`). Pages register their own tab via `useMdiStore.addTab()`.
- **Breadcrumb** (`src/shared/ui/Breadcrumb.tsx`): Navigation breadcrumb with home icon, chevron dividers. 12px Pretendard font. Last item is active (#3f3f46, Medium weight) with hover underline.
- **PageTitle** (`src/shared/ui/PageTitle.tsx`): Page title (20px Bold) with optional badge (purple border pill), favorite star button, and action buttons slot.
- When composing screens, import and use the common components (such as Button, Input, Datepicker, etc.) that are defined in `shared/ui`.
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
