# ActionDeck Vanilla Conversion Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert ActionDeck from Next.js/React to a unified single-file vanilla HTML/CSS/JS application matching the briizOS architecture pattern.

**Architecture:** Single `actiondeck.html` file containing inline CSS, inline JavaScript module, Firebase authentication + Firestore sync, tab-based navigation between views (Dashboard, Tasks, Prioritize, Today, Settings). State managed via global `state` object with `markDirty()` pattern for persistence.

**Tech Stack:** Vanilla JavaScript (ES modules), Tailwind CSS (CDN), Firebase SDK (ES modules via CDN), Google Gemini API (direct fetch for AI features)

---

## Phase 0: Project Setup

### Task 0.1: Create the Shell File

**Files:**
- Create: `public/actiondeck.html`

**Steps:**
1. Create the base HTML5 document with meta tags, CSP headers
2. Add Tailwind CDN, Firebase CDN imports, Google Fonts
3. Create empty `<style>` block for custom CSS
4. Create empty `<script type="module">` block for app logic
5. Add basic body structure with view containers

**Acceptance:** File opens in browser showing "ActionDeck Loading..."

---

### Task 0.2: Port CSS Variables and Base Styles

**Files:**
- Modify: `public/actiondeck.html` (style block)
- Reference: `src/app/globals.css`, `src/styles/dashboard.css`

**Steps:**
1. Convert Tailwind CSS variables from globals.css to inline CSS custom properties
2. Port the `.browzr-skin`, `.neon-surface`, `.glass-green` utility classes
3. Port header, card, and form styling
4. Add dark theme as default (no toggle needed initially)

**Acceptance:** Base styling matches current ActionDeck aesthetic

---

## Phase 1: State Management & Firebase

### Task 1.1: Firebase Initialization

**Files:**
- Modify: `public/actiondeck.html` (script block)
- Reference: `src/lib/firebase.ts`, briizOS `index.html` lines 3704-3725

**Steps:**
1. Import Firebase modules from CDN (app, auth, firestore)
2. Initialize Firebase with ActionDeck config
3. Set up `browserLocalPersistence`
4. Create `db` and `auth` references

**Acceptance:** Console shows "Firebase initialized" without errors

---

### Task 1.2: State Object Architecture

**Files:**
- Modify: `public/actiondeck.html` (script block)
- Reference: `src/context/project-context.tsx`, briizOS state pattern (lines 3786-3836)

**Steps:**
1. Create `createEmptyState()` function returning:
   ```javascript
   { __ver: 1, projects: [], casualTasks: [], dailySchedules: {}, settings: { enableSync: true }, clientTs: 0 }
   ```
2. Create `normalizeStateShape(input)` for migration safety
3. Initialize `const state = createEmptyState()`
4. Create `markDirty()` and `scheduleCheckpoint()` functions
5. Create `saveLocal()` for localStorage backup

**Acceptance:** `window.appState` accessible in console with correct shape

---

### Task 1.3: Authentication UI

**Files:**
- Modify: `public/actiondeck.html` (body + script)
- Reference: briizOS login overlay (lines 3399-3413)

**Steps:**
1. Add login overlay HTML with email/password inputs
2. Wire form submission to `signInWithEmailAndPassword`
3. Add `onAuthStateChanged` listener to show/hide overlay
4. Store `uid` in module scope for persistence functions

**Acceptance:** Can log in, overlay hides, `uid` available

---

### Task 1.4: Firestore Sync - Projects

**Files:**
- Modify: `public/actiondeck.html` (script block)
- Reference: `src/lib/persistence.ts`

**Steps:**
1. Create `userPath(uid)` helper returning collection references
2. Create `subscribeProjects(cb)` with `onSnapshot`
3. Create `upsertProject(project)` with `setDoc` merge
4. Create `removeProject(id)` with `deleteDoc`
5. Wire subscription to update `state.projects` and call render

**Acceptance:** Projects load from Firestore, changes sync bidirectionally

---

### Task 1.5: Firestore Sync - Casual Tasks

**Files:**
- Modify: `public/actiondeck.html` (script block)
- Reference: `src/lib/persistence.ts`

**Steps:**
1. Create `subscribeCasualTasks(cb)` with `onSnapshot`
2. Create `upsertCasualItem(item)` with `setDoc` merge
3. Create `removeCasualItem(id)` with `deleteDoc`
4. Wire subscription to update `state.casualTasks` and call render

**Acceptance:** Casual tasks load and sync with Firestore

---

## Phase 2: Navigation & Layout

### Task 2.1: Tab-Based Navigation Structure

**Files:**
- Modify: `public/actiondeck.html` (body + script)
- Reference: briizOS panel architecture

**Steps:**
1. Add navigation bar HTML with tabs: Dashboard, Tasks, Prioritize, Today, Settings
2. Add view container divs (one per tab, initially hidden)
3. Create `setActiveView(viewId)` function to show/hide views
4. Wire tab click handlers
5. Add active tab styling (underline or highlight)

**Acceptance:** Clicking tabs switches visible content area

---

### Task 2.2: Header Component

**Files:**
- Modify: `public/actiondeck.html` (body + style)
- Reference: `src/components/layout/header.tsx`

**Steps:**
1. Add fixed header HTML with logo, title, user info
2. Add logout button wired to `signOut(auth)`
3. Style header with gradient background and blur
4. Position navigation tabs within or below header

**Acceptance:** Header displays correctly with functional logout

---

## Phase 3: Dashboard View

### Task 3.1: Dashboard Summary Stats

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/dashboard/dashboard-summary.tsx`

**Steps:**
1. Create `renderDashboardSummary()` function
2. Calculate: total projects, active count, completion percentage
3. Render stat cards with icons
4. Wire to re-render when `state.projects` changes

**Acceptance:** Summary shows accurate project statistics

---

### Task 3.2: Project List Rendering

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/dashboard/project-list.tsx`

**Steps:**
1. Create `renderProjectList()` function
2. Add search input with filter logic
3. Add status filter tabs (All, Active, Paused, Done, Archived)
4. Render project grid using template literals
5. Wire search/filter to re-render

**Acceptance:** Projects display in filterable grid

---

### Task 3.3: Project Card Component

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/dashboard/project-card.tsx`

**Steps:**
1. Create `renderProjectCard(project)` template function
2. Display: name, description truncated, deadline, progress bar
3. Add domain badge with color
4. Add status indicator dot
5. Wire click to open project modal

**Acceptance:** Cards show project info with visual indicators

---

### Task 3.4: Project Modal (View/Edit)

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/dashboard/project-modal.tsx`

**Steps:**
1. Add modal overlay HTML (hidden by default)
2. Create `openProjectModal(projectId)` and `closeProjectModal()` functions
3. Display full project details: tasks, milestones, notes
4. Add edit button that switches to form mode
5. Add delete button with confirmation

**Acceptance:** Modal opens with full project details, can edit/delete

---

### Task 3.5: Project Form (Create/Edit)

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/dashboard/project-form.tsx`

**Steps:**
1. Create form HTML with all project fields
2. Create `openProjectForm(projectId?)` - null for new, id for edit
3. Populate form from existing project or empty defaults
4. Wire submit to `upsertProject()` and close
5. Add domain selector and status selector

**Acceptance:** Can create new projects and edit existing ones

---

### Task 3.6: Domain Filter Bar

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/dashboard/domain-filter-bar.tsx`, `src/lib/domains.ts`

**Steps:**
1. Add fixed bottom bar with domain icons
2. Create domain config object with colors and icons
3. Wire click to filter `state.projects` by domain
4. Highlight active domain filter

**Acceptance:** Clicking domain filters project list

---

## Phase 4: Tasks View

### Task 4.1: Casual Task List

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/tasks/task-list.tsx`

**Steps:**
1. Create `renderTasksView()` function
2. Add input field for new task
3. Render pending tasks and completed tasks (separated)
4. Wire checkbox toggle to `upsertCasualItem()`
5. Wire delete button to `removeCasualItem()`

**Acceptance:** Can add, complete, and delete tasks

---

### Task 4.2: Task Deck (Collapsible Groups)

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/tasks/task-deck.tsx`

**Steps:**
1. Detect `isDeck` property in task items
2. Render deck with collapsible header showing title + progress
3. Render nested tasks within deck
4. Wire expand/collapse toggle
5. Handle deck deletion (deletes all subtasks)

**Acceptance:** Task decks display and collapse correctly

---

## Phase 5: AI Features

### Task 5.1: Direct Gemini API Integration

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/ai/flows/intelligent-project-prioritization.ts`

**Steps:**
1. Create `callGemini(prompt, systemPrompt?)` async function
2. Use fetch to `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
3. Handle API key (prompt user or use stored setting)
4. Parse response and extract text content

**Acceptance:** Can call Gemini API and get response

---

### Task 5.2: Task Breakdown Feature

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/ai/flows/breakdown-task-flow.ts`

**Steps:**
1. Add "AI Breakdown" button next to task input
2. Create prompt template for task decomposition
3. Parse Gemini response into task array
4. Create TaskDeck from response
5. Handle clarifying questions flow

**Acceptance:** Typing goal + clicking AI creates task deck

---

### Task 5.3: Prioritization Tool

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/prioritize/prioritization-form.tsx`

**Steps:**
1. Create prioritize view with project multi-select
2. Add goals textarea input
3. Create prioritization prompt template
4. Display AI-generated priority ranking with reasoning
5. Style reasoning output as markdown

**Acceptance:** Can select projects, get AI-prioritized list

---

## Phase 6: Settings & Polish

### Task 6.1: Settings View

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/app/(app)/settings/page.tsx`

**Steps:**
1. Create settings view with toggle switches
2. Add "Enable Sync" toggle (stored in `state.settings`)
3. Add "Import from briizOS" toggle
4. Add Gemini API key input (stored in localStorage separately)
5. Add Export/Import JSON buttons

**Acceptance:** Settings persist and affect app behavior

---

### Task 6.2: Export/Import JSON

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/layout/settings-modal.tsx`

**Steps:**
1. Create `exportData()` - downloads JSON of projects + tasks
2. Create `importData(json)` - merges into state and Firestore
3. Add file input for import
4. Show success/error toasts

**Acceptance:** Can export and re-import data

---

### Task 6.3: Toast Notifications

**Files:**
- Modify: `public/actiondeck.html`

**Steps:**
1. Add toast container element (fixed position)
2. Create `showToast(message, type)` function
3. Auto-dismiss after 3 seconds
4. Style success/error/info variants

**Acceptance:** Toasts appear for user feedback

---

### Task 6.4: Loading States & Empty States

**Files:**
- Modify: `public/actiondeck.html`

**Steps:**
1. Add loading spinner component
2. Show spinner during Firebase operations
3. Add empty state messages for each view
4. Add skeleton placeholders during initial load

**Acceptance:** App shows appropriate feedback during loading

---

## Phase 7: Today View (Optional Enhancement)

### Task 7.1: Today Timeline View

**Files:**
- Modify: `public/actiondeck.html`
- Reference: `src/components/today/today-page.tsx`

**Steps:**
1. Create today view with date navigator
2. Render timeline with hour blocks
3. Allow dragging tasks onto timeline
4. Persist daily schedule to Firestore
5. Add quick entry panel

**Acceptance:** Can plan daily schedule with time blocks

---

## Phase 8: Final Integration

### Task 8.1: Cross-View Navigation

**Steps:**
1. Wire "View Project" from tasks to open project modal
2. Wire project links in prioritization results
3. Ensure all views use consistent rendering pattern

---

### Task 8.2: Performance Optimization

**Steps:**
1. Debounce search/filter inputs
2. Use `requestAnimationFrame` for render batching
3. Lazy-render off-screen items if needed

---

### Task 8.3: Final Testing Checklist

**Steps:**
1. Test login/logout flow
2. Test CRUD for projects and tasks
3. Test offline mode (disable network, verify localStorage)
4. Test AI features with valid API key
5. Test export/import round-trip
6. Test on mobile viewport

---

## File Summary

| Current (Next.js) | Converted (Vanilla) |
|-------------------|---------------------|
| 70+ component files | 1 HTML file |
| 6,800+ LOC TypeScript | ~4,000-5,000 LOC JavaScript |
| React Context | Global state object |
| Server-side Genkit | Client-side Gemini API |
| Next.js routing | Tab-based navigation |

## Reference Files

**briizOS Pattern:**
- `/Users/alex/Documents/Cufolio/briizos-dev/public/index.html` (architecture reference)

**ActionDeck Source (for feature parity):**
- `src/context/project-context.tsx` - state management pattern
- `src/lib/persistence.ts` - Firestore operations
- `src/lib/types.ts` - data models
- `src/components/dashboard/*` - dashboard components
- `src/components/tasks/*` - task components
- `src/ai/flows/*` - AI prompts

---

## Estimated Scope

- **Phase 0-1:** Foundation (state, auth, sync)
- **Phase 2-3:** Dashboard (main functionality)
- **Phase 4:** Tasks (casual task management)
- **Phase 5:** AI (prioritization, breakdown)
- **Phase 6:** Settings & polish
- **Phase 7:** Today view (optional)
- **Phase 8:** Integration & testing

Each phase is independently deployable - you could ship after Phase 4 with core functionality working.
