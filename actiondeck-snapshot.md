This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.claude/
  CLAUDE.md
  settings.local.json
docs/
  blueprint.md
public/
  id-finder.html
scripts/
  firestore-cli.js
  inject-ids.js
  query-firestore.js
src/
  ai/
    flows/
      analyze-files-flow.ts
      breakdown-task-flow.ts
      intelligent-project-prioritization.ts
      recommend-today-flow.ts
      today-chat-flow.ts
    dev.ts
    genkit.ts
  app/
    (app)/
      dashboard/
        page.tsx
      domain/
        [domain]/
          page.tsx
      import/
        page.tsx
      prioritize/
        page.tsx
      settings/
        page.tsx
      tasks/
        page.tsx
      today/
        page.tsx
      layout.tsx
    login/
      page.tsx
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  components/
    dashboard/
      dashboard-summary.tsx
      domain-filter-bar.tsx
      inbox-archive-modal.tsx
      inbox-date-navigator.tsx
      inbox-task-list.tsx
      milestone-list.tsx
      progress-chart.tsx
      progress-ring.tsx
      project-card.tsx
      project-form.tsx
      project-list.tsx
      project-modal.tsx
      search-bar.tsx
      status-select.tsx
      tags-input.tsx
    icons/
      logo.tsx
    layout/
      app-sidebar.tsx
      filter-initializer.tsx
      filters-modal.tsx
      header.tsx
      settings-modal.tsx
    prioritize/
      prioritization-form.tsx
      prioritization-result.tsx
    tasks/
      task-deck-item.tsx
      task-deck.tsx
      task-item.tsx
      task-list.tsx
    today/
      ai-chat-panel.tsx
      ai-recommend-button.tsx
      date-navigator.tsx
      item-source-picker.tsx
      quick-entry-panel.tsx
      timeline-item.tsx
      timeline-view.tsx
      today-page.tsx
    ui/
      accordion.tsx
      alert-dialog.tsx
      alert.tsx
      avatar.tsx
      badge.tsx
      breadcrumb.tsx
      button.tsx
      calendar.tsx
      card.tsx
      carousel.tsx
      chart.tsx
      checkbox.tsx
      collapsible.tsx
      dialog.tsx
      dropdown-menu.tsx
      form.tsx
      input.tsx
      label.tsx
      menubar.tsx
      popover.tsx
      progress.tsx
      radio-group.tsx
      scroll-area.tsx
      select.tsx
      separator.tsx
      sheet.tsx
      sidebar.tsx
      skeleton.tsx
      slider.tsx
      switch.tsx
      table.tsx
      tabs.tsx
      textarea.tsx
      toast.tsx
      toaster.tsx
      tooltip.tsx
    auto-id-injector.tsx
    theme-provider.tsx
    theme-toggle.tsx
  context/
    project-context.tsx
    settings-context.tsx
    today-context.tsx
  hooks/
    use-inbox-daily.ts
    use-mobile.tsx
    use-toast.ts
  lib/
    actions.ts
    auto-id.tsx
    briizos.ts
    data.ts
    domains.ts
    firebase.ts
    inbox-parser.ts
    persistence.ts
    placeholder-images.json
    placeholder-images.ts
    types.ts
    utils.ts
  styles/
    dashboard.css
    globals.css
.firebaserc
.gitignore
apphosting.yaml
COMPONENT-IDS.md
components.json
firebase.json
id-mappings.json
next.config.ts
package.json
postcss.config.mjs
project-import-prompt.txt
style-mappings.json
tailwind.config.ts
tsconfig.json
```

# Files

## File: .claude/settings.local.json
````json
{
  "permissions": {
    "allow": [
      "Bash(cat:*)",
      "Bash(npm run dev:*)",
      "Bash(timeout 15 npm run dev:*)",
      "Bash(timeout 20 npm run dev:*)",
      "Bash(npm run typecheck:*)",
      "Bash(timeout 30 npm run dev:*)"
    ],
    "deny": [],
    "ask": []
  }
}
````

## File: scripts/firestore-cli.js
````javascript
#!/usr/bin/env node
const admin = require('firebase-admin');
const readline = require('readline');
const path = require('path');

// Initialize Firebase
const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// ANSI colors
const c = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(q) {
  return new Promise(resolve => rl.question(q, resolve));
}

function printBox(title) {
  const line = '─'.repeat(50);
  console.log(`\n${c.cyan}┌${line}┐${c.reset}`);
  console.log(`${c.cyan}│${c.reset} ${c.bright}${title.padEnd(48)}${c.reset} ${c.cyan}│${c.reset}`);
  console.log(`${c.cyan}└${line}┘${c.reset}`);
}

function printHelp() {
  console.log(`
${c.bright}Commands:${c.reset}
  ${c.green}query <collection>${c.reset}    Query a collectionGroup (e.g., query inboxDaily)
  ${c.green}path <full/path>${c.reset}      Query a specific collection path
  ${c.green}doc <full/doc/path>${c.reset}   Get a specific document
  ${c.green}list <doc/path>${c.reset}       List subcollections under a document
  ${c.green}limit <n>${c.reset}             Set result limit (default: 10)
  ${c.green}json${c.reset}                  Toggle JSON output mode
  ${c.green}help${c.reset}                  Show this help
  ${c.green}exit${c.reset}                  Quit
`);
}

let resultLimit = 120;
let jsonMode = true;

async function queryCollectionGroup(name) {
  console.log(`${c.dim}Querying collectionGroup: ${name} (limit: ${resultLimit})${c.reset}\n`);

  try {
    const snapshot = await db.collectionGroup(name).limit(resultLimit).get();

    if (snapshot.empty) {
      console.log(`${c.yellow}No documents found.${c.reset}`);
      return;
    }

    console.log(`${c.green}Found ${snapshot.size} document(s):${c.reset}\n`);

    snapshot.forEach((doc, i) => {
      console.log(`${c.magenta}[${doc.ref.path}]${c.reset}`);
      if (jsonMode) {
        console.log(JSON.stringify(doc.data(), null, 2));
      } else {
        printData(doc.data());
      }
      console.log('');
    });
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

async function queryPath(collPath) {
  console.log(`${c.dim}Querying path: ${collPath} (limit: ${resultLimit})${c.reset}\n`);

  try {
    const snapshot = await db.collection(collPath).limit(resultLimit).get();

    if (snapshot.empty) {
      console.log(`${c.yellow}No documents found.${c.reset}`);
      return;
    }

    console.log(`${c.green}Found ${snapshot.size} document(s):${c.reset}\n`);

    snapshot.forEach(doc => {
      console.log(`${c.magenta}[${doc.id}]${c.reset}`);
      if (jsonMode) {
        console.log(JSON.stringify(doc.data(), null, 2));
      } else {
        printData(doc.data());
      }
      console.log('');
    });
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

async function getDoc(docPath) {
  console.log(`${c.dim}Getting document: ${docPath}${c.reset}\n`);

  try {
    const doc = await db.doc(docPath).get();

    if (!doc.exists) {
      console.log(`${c.yellow}Document does not exist (may have subcollections only).${c.reset}`);
      // Try listing subcollections
      const subs = await db.doc(docPath).listCollections();
      if (subs.length > 0) {
        console.log(`${c.green}Subcollections:${c.reset}`);
        subs.forEach(s => console.log(`  ${c.cyan}${s.id}${c.reset}`));
      }
      return;
    }

    console.log(`${c.magenta}[${doc.id}]${c.reset}`);
    if (jsonMode) {
      console.log(JSON.stringify(doc.data(), null, 2));
    } else {
      printData(doc.data());
    }
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

async function listSubcollections(docPath) {
  console.log(`${c.dim}Listing subcollections under: ${docPath}${c.reset}\n`);

  try {
    const subs = await db.doc(docPath).listCollections();

    if (subs.length === 0) {
      console.log(`${c.yellow}No subcollections found.${c.reset}`);
      return;
    }

    console.log(`${c.green}Found ${subs.length} subcollection(s):${c.reset}\n`);

    for (const coll of subs) {
      const snapshot = await coll.limit(1).get();
      const count = snapshot.size > 0 ? '1+' : '0';
      console.log(`  ${c.cyan}${coll.id}${c.reset} ${c.dim}(${count} docs)${c.reset}`);
    }
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

function printData(data, indent = '') {
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      console.log(`${indent}${c.cyan}${key}:${c.reset} ${c.dim}null${c.reset}`);
    } else if (value._seconds !== undefined) {
      // Firestore timestamp
      const date = new Date(value._seconds * 1000);
      console.log(`${indent}${c.cyan}${key}:${c.reset} ${c.yellow}${date.toISOString()}${c.reset}`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        console.log(`${indent}${c.cyan}${key}:${c.reset} []`);
      } else if (typeof value[0] === 'object') {
        console.log(`${indent}${c.cyan}${key}:${c.reset} [${value.length} items]`);
      } else {
        const preview = value.slice(0, 3).join(', ');
        const more = value.length > 3 ? `, +${value.length - 3} more` : '';
        console.log(`${indent}${c.cyan}${key}:${c.reset} [${preview}${more}]`);
      }
    } else if (typeof value === 'object') {
      console.log(`${indent}${c.cyan}${key}:${c.reset} {${Object.keys(value).length} keys}`);
    } else if (typeof value === 'string' && value.length > 80) {
      console.log(`${indent}${c.cyan}${key}:${c.reset} "${value.substring(0, 77)}..."`);
    } else {
      console.log(`${indent}${c.cyan}${key}:${c.reset} ${JSON.stringify(value)}`);
    }
  }
}

async function main() {
  printBox('Firestore CLI - briizos');
  console.log(`${c.dim}Type 'help' for commands${c.reset}`);

  while (true) {
    const input = await prompt(`\n${c.green}firestore>${c.reset} `);
    const [cmd, ...args] = input.trim().split(/\s+/);

    switch (cmd?.toLowerCase()) {
      case 'query':
      case 'q':
        if (args[0]) await queryCollectionGroup(args[0]);
        else console.log(`${c.yellow}Usage: query <collectionName>${c.reset}`);
        break;

      case 'path':
      case 'p':
        if (args[0]) await queryPath(args.join(' '));
        else console.log(`${c.yellow}Usage: path <collection/path>${c.reset}`);
        break;

      case 'doc':
      case 'd':
        if (args[0]) await getDoc(args.join(' '));
        else console.log(`${c.yellow}Usage: doc <document/path>${c.reset}`);
        break;

      case 'list':
      case 'ls':
        if (args[0]) await listSubcollections(args.join(' '));
        else console.log(`${c.yellow}Usage: list <document/path>${c.reset}`);
        break;

      case 'limit':
      case 'l':
        if (args[0] && !isNaN(args[0])) {
          resultLimit = parseInt(args[0]);
          console.log(`${c.green}Limit set to ${resultLimit}${c.reset}`);
        } else {
          console.log(`${c.dim}Current limit: ${resultLimit}${c.reset}`);
        }
        break;

      case 'json':
      case 'j':
        jsonMode = !jsonMode;
        console.log(`${c.green}JSON mode: ${jsonMode ? 'ON' : 'OFF'}${c.reset}`);
        break;

      case 'help':
      case 'h':
      case '?':
        printHelp();
        break;

      case 'exit':
      case 'quit':
      case 'q!':
        console.log(`${c.dim}Goodbye!${c.reset}`);
        rl.close();
        process.exit(0);

      case '':
      case undefined:
        break;

      default:
        console.log(`${c.yellow}Unknown command: ${cmd}. Type 'help' for commands.${c.reset}`);
    }
  }
}

main().catch(console.error);
````

## File: scripts/query-firestore.js
````javascript
const admin = require('firebase-admin');
const path = require('path');

// Initialize with service account
const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function findInboxDaily() {
  try {
    // Try collectionGroup query - finds inboxDaily anywhere in the DB
    console.log('=== Searching for inboxDaily via collectionGroup ===\n');

    const snapshot = await db.collectionGroup('inboxDaily').limit(10).get();

    if (snapshot.empty) {
      console.log('No docs found in any inboxDaily collection.');

      // Try lowercase version
      console.log('\n=== Trying inboxdaily (lowercase) ===\n');
      const snapshot2 = await db.collectionGroup('inboxdaily').limit(10).get();

      if (snapshot2.empty) {
        console.log('No docs found in inboxdaily either.');
      } else {
        console.log(`Found ${snapshot2.size} docs:`);
        snapshot2.forEach(doc => {
          console.log(`Path: ${doc.ref.path}`);
          console.log(JSON.stringify(doc.data(), null, 2));
        });
      }
    } else {
      console.log(`Found ${snapshot.size} docs:`);
      snapshot.forEach(doc => {
        console.log(`Path: ${doc.ref.path}`);
        console.log(JSON.stringify(doc.data(), null, 2));
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nNote: collectionGroup queries require a Firestore index.');
  }

  process.exit(0);
}

findInboxDaily();
````

## File: src/components/dashboard/inbox-archive-modal.tsx
````typescript
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from
'@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Archive, ChevronRight } from 'lucide-react';
import { format, parse } from 'date-fns';
import type { ParsedDailyInbox } from '@/lib/types';

interface InboxArchiveModalProps {
  inboxByDate: Map<string, ParsedDailyInbox>;
  availableDates: string[];
  onSelectDate: (date: string) => void;
}

export function InboxArchiveModal({
  inboxByDate,
  availableDates,
  onSelectDate
}: InboxArchiveModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDate = (date: string) => {
    onSelectDate(date);
    setIsOpen(false);
  };

  return (
    <Dialog data-style-id="stylo-1224" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger data-style-id="stylo-1225" asChild>
        <Button data-style-id="stylo-1226"
        variant="ghost"
        size="sm"
        className="text-cyan-300/80 hover:text-cyan-200 hover:bg-teal-900/30">

          <Archive data-style-id="stylo-1227" className="h-4 w-4 mr-2" />
          Archive
        </Button>
      </DialogTrigger>
      <DialogContent data-style-id="stylo-1228" className="sm:max-w-[500px] border-[hsla(165,70%,35%,0.4)] bg-gradient-to-b from-[hsl(210,35%,12%)] to-[hsl(210,30%,8%)]">
        <DialogHeader data-style-id="stylo-1229" className="pb-4">
          <DialogTitle data-style-id="stylo-1230" className="text-xl text-teal-100">CC Daily Archive</DialogTitle>
        </DialogHeader>
        <ScrollArea data-style-id="stylo-1231" className="max-h-[60vh]">
          <div data-style-id="stylo-1232" className="space-y-2 pr-4">
            {availableDates.length === 0 ?
            <p data-style-id="stylo-1233" className="text-center py-8 text-muted-foreground">
                No archived emails found.
              </p> :

            availableDates.map((dateKey) => {
              const inbox = inboxByDate.get(dateKey);
              if (!inbox) return null;

              const parsedDate = parse(dateKey, 'MM/dd/yyyy', new Date());
              const displayDate = format(parsedDate, 'EEEE, MMMM d, yyyy');
              const taskCount = inbox.tasks.length;

              return (
                <button data-style-id="stylo-1234"
                key={dateKey}
                onClick={() => handleSelectDate(dateKey)}
                className="w-full p-3 rounded-lg text-left
                               border border-[hsla(165,70%,40%,0.25)]
                               bg-gradient-to-b from-[rgba(0,128,128,0.08)] to-[rgba(0,0,0,0.4)]
                               hover:border-[hsla(165,70%,40%,0.5)] hover:from-[rgba(0,128,128,0.15)]
                               transition-all group">





                    <div data-style-id="stylo-1235" className="flex items-center justify-between">
                      <div data-style-id="stylo-1236">
                        <p data-style-id="stylo-1237" className="text-sm font-medium text-teal-100">{displayDate}</p>
                        <p data-style-id="stylo-1238" className="text-xs text-cyan-300/60 mt-0.5">
                          {taskCount} task{taskCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <ChevronRight data-style-id="stylo-1239" className="h-4 w-4 text-cyan-300/40 group-hover:text-cyan-300/80 transition-colors" />
                    </div>
                  </button>);

            })
            }
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>);

}
````

## File: src/components/dashboard/inbox-date-navigator.tsx
````typescript
'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, parse } from 'date-fns';

interface InboxDateNavigatorProps {
  currentDate: string; // MM/DD/YYYY
  availableDates: string[]; // All available dates
  onDateChange: (date: string) => void;
  isToday: boolean;
  onGoToToday: () => void;
}

export function InboxDateNavigator({
  currentDate,
  availableDates,
  onDateChange,
  isToday,
  onGoToToday
}: InboxDateNavigatorProps) {
  // Parse current date for display
  const parsedDate = parse(currentDate, 'MM/dd/yyyy', new Date());
  const displayDate = format(parsedDate, 'EEEE, MMMM d, yyyy');

  // Find current index in available dates
  const currentIndex = availableDates.indexOf(currentDate);

  const canGoNewer = currentIndex > 0;
  const canGoOlder = currentIndex < availableDates.length - 1 && currentIndex !== -1;

  const navigateNewer = () => {
    if (canGoNewer) {
      onDateChange(availableDates[currentIndex - 1]);
    }
  };

  const navigateOlder = () => {
    if (canGoOlder) {
      onDateChange(availableDates[currentIndex + 1]);
    }
  };

  return (
    <div data-style-id="stylo-1240" className="flex items-center gap-2">
      <Button data-style-id="stylo-1241"
      variant="ghost"
      size="icon"
      onClick={navigateOlder}
      disabled={!canGoOlder}
      title="Older"
      className="text-teal-200 hover:text-teal-100 hover:bg-teal-900/30 disabled:opacity-30">

        <ChevronLeft data-style-id="stylo-1242" className="h-4 w-4" />
      </Button>

      <div data-style-id="stylo-1243" className="flex items-center gap-2 min-w-[200px] justify-center">
        <Calendar data-style-id="stylo-1244" className="h-4 w-4 text-cyan-300/80" />
        <span data-style-id="stylo-1245" className="text-sm font-medium text-teal-100">{displayDate}</span>
      </div>

      <Button data-style-id="stylo-1246"
      variant="ghost"
      size="icon"
      onClick={navigateNewer}
      disabled={!canGoNewer}
      title="Newer"
      className="text-teal-200 hover:text-teal-100 hover:bg-teal-900/30 disabled:opacity-30">

        <ChevronRight data-style-id="stylo-1247" className="h-4 w-4" />
      </Button>

      {!isToday &&
      <Button data-style-id="stylo-1248"
      variant="outline"
      size="sm"
      onClick={onGoToToday}
      className="ml-2 text-xs border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/30 hover:text-cyan-200">

          Today
        </Button>
      }
    </div>);

}
````

## File: src/components/dashboard/inbox-task-list.tsx
````typescript
'use client';

import type { InboxTask } from '@/lib/types';
import { Clock, Calendar } from 'lucide-react';

interface InboxTaskListProps {
  tasks: InboxTask[];
}

export function InboxTaskList({ tasks }: InboxTaskListProps) {
  if (tasks.length === 0) {
    return (
      <div data-style-id="stylo-1249" className="text-center py-8 text-muted-foreground">
        <p data-style-id="stylo-1250">No tasks found in this daily email.</p>
      </div>);

  }

  return (
    <div data-style-id="stylo-1251" className="space-y-3">
      {tasks.map((task) =>
      <div data-style-id="stylo-1252"
      key={task.id}
      className="inbox-task-item p-3 rounded-lg border border-[hsla(165,70%,40%,0.35)]
                     bg-gradient-to-b from-[rgba(0,128,128,0.1)] to-[rgba(0,0,0,0.6)]
                     hover:border-[hsla(165,70%,40%,0.5)] transition-colors">



          <div data-style-id="stylo-1253" className="flex items-start gap-3">
            <Clock data-style-id="stylo-1254" className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
            <div data-style-id="stylo-1255" className="flex-1 min-w-0">
              <p data-style-id="stylo-1256" className="text-teal-100 text-sm leading-relaxed">{task.item}</p>
              {task.hasDueDate && task.dueDate &&
            <div data-style-id="stylo-1257" className="flex items-center gap-1.5 mt-2 text-xs text-cyan-300/80">
                  <Calendar data-style-id="stylo-1258" className="h-3 w-3" />
                  <span data-style-id="stylo-1259">Due: {task.dueDate}</span>
                </div>
            }
            </div>
          </div>
        </div>
      )}
    </div>);

}
````

## File: src/hooks/use-inbox-daily.ts
````typescript
'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { subscribeInboxDaily, FIRESTORE_SYNC_ENABLED } from '@/lib/persistence';
import { parseCCInboxEmails, getTodayMMDDYYYY } from '@/lib/inbox-parser';
import type { RawInboxEmail, ParsedDailyInbox } from '@/lib/types';

interface UseInboxDailyResult {
  // All parsed inbox data by date (MM/DD/YYYY keys)
  inboxByDate: Map<string, ParsedDailyInbox>;

  // Sorted list of available dates (newest first)
  availableDates: string[];

  // Today's parsed inbox (or null if not available)
  todayInbox: ParsedDailyInbox | null;

  // Loading state
  isLoading: boolean;

  // Whether user is authenticated with sync enabled
  isConnected: boolean;
}

export function useInboxDaily(): UseInboxDailyResult {
  const [rawEmails, setRawEmails] = useState<RawInboxEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authedUid, setAuthedUid] = useState<string | null>(null);

  // Track auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setAuthedUid(u?.uid || null);
    });
    return () => unsubAuth();
  }, []);

  const isConnected = Boolean(authedUid && FIRESTORE_SYNC_ENABLED);

  // Subscribe to inbox emails
  useEffect(() => {
    if (!isConnected) {
      setRawEmails([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = subscribeInboxDaily((emails) => {
      setRawEmails(emails);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isConnected]);

  // Parse and memoize inbox data
  const inboxByDate = useMemo(() => {
    return parseCCInboxEmails(rawEmails);
  }, [rawEmails]);

  // Debug helper: type outputCC() in browser console
  useEffect(() => {
    (window as unknown as Record<string, unknown>).outputCC = () => {
      console.log('=== RAW EMAILS ===', rawEmails.length, 'total');
      rawEmails.forEach((e, i) => {
        const has🧠 = e.body?.includes('🧠') ? '✓' : '✗';
        console.log(`  ${i + 1}. [${has🧠}] ${e.subject?.slice(0, 50)}`);
      });
      console.log('\n=== PARSED (filtered) ===', inboxByDate.size, 'dates');
      inboxByDate.forEach((inbox, date) => {
        console.log(`  ${date}: ${inbox.tasks.length} tasks`);
        inbox.tasks.forEach((t) => console.log(`    - ${t.item.slice(0, 60)}`));
      });
      return { raw: rawEmails, parsed: Object.fromEntries(inboxByDate) };
    };
  }, [rawEmails, inboxByDate]);

  // Get sorted available dates (newest first by ISO date)
  const availableDates = useMemo(() => {
    const dates = Array.from(inboxByDate.values())
      .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
      .map((inbox) => inbox.date);
    return dates;
  }, [inboxByDate]);

  // Get today's inbox
  const todayInbox = useMemo(() => {
    const todayKey = getTodayMMDDYYYY();
    return inboxByDate.get(todayKey) || null;
  }, [inboxByDate]);

  return {
    inboxByDate,
    availableDates,
    todayInbox,
    isLoading,
    isConnected,
  };
}
````

## File: .claude/CLAUDE.md
````markdown
# ActionDeck

### web app for project tracking, deployed and hosted live on private password-protected website

## Build, Test & Lint Commands

       From package.json:
       - dev: next dev --turbopack -p 9002 - Start development server with
       Turbopack on port 9002
       - build: next build - Build for production
       - start: next start - Start production server
       - lint: next lint - Run ESLint
       - typecheck: tsc --noEmit - TypeScript type checking without emitting
        files
       - genkit:dev: genkit start -- tsx src/ai/dev.ts - Start Genkit AI
       development server
       - genkit:watch: genkit start -- tsx --watch src/ai/dev.ts - Watch
       mode for Genkit flows

## High-Level Architecture

       ActionDeck is a Next.js 15 + React 18 full-stack task management
       application with AI-powered features, Firebase integration, and a
       component-based architecture.

       Project Name: Action Deck
       Subtitle: Casual todos and personal project management

       Core Technology Stack:
       - Framework: Next.js 15.3.3 with App Router
       - Language: TypeScript 5
       - UI Framework: React 18.3.1
       - Component Library: shadcn/ui (Radix UI primitives)
       - Styling: Tailwind CSS 3.4.1 with custom CSS variables
       - Backend/Database: Firebase (Auth, Firestore)
       - AI/LLM: Google Genkit 1.14.1 with Gemini 2.5 Flash model
       - Forms: React Hook Form + Zod validation
       - Charts: Recharts 2.15.1
       - Icons: Lucide React 0.475.0
       - Date Handling: date-fns 3.6.0
       - Theming: next-themes with dark/light mode support

## Key Files & Directory Structure

       src/
       ├── app/                          # Next.js App Router pages
       │   ├── layout.tsx                # Root layout with ThemeProvider
       │   ├── page.tsx                  # Redirects to /dashboard
       │   ├── login/page.tsx            # Authentication page
       │   └── (app)/                    # Protected routes group
       │       ├── layout.tsx            # App shell with sidebar & header
       │       ├── dashboard/page.tsx    # Main dashboard view
       │       ├── tasks/page.tsx        # Casual tasks view
       │       ├── prioritize/page.tsx   # AI prioritization tool
       │       └── settings/page.tsx     # User settings
       ├── ai/                           # Genkit AI flows
       │   ├── genkit.ts                 # Genkit config with Google AI
       plugin
       │   ├── dev.ts                    # AI development entry point
       │   └── flows/
       │       ├── breakdown-task-flow.ts       # Task decomposition with
       LLM
       │       └── intelligent-project-prioritization.ts # Priority ranking
       flow
       ├── components/
       │   ├── ui/                       # shadcn/ui primitive components
       (38+ files)
       │   ├── layout/
       │   │   ├── app-sidebar.tsx       # Side navigation
       │   │   └── header.tsx            # Top header bar
       │   ├── dashboard/
       │   │   ├── project-list.tsx      # Project grid display
       │   │   ├── project-card.tsx      # Individual project card
       │   │   ├── project-form.tsx      # Create/edit project modal
       │   │   ├── project-modal.tsx     # Project detail modal
       │   │   ├── dashboard-summary.tsx # Overview stats
       │   │   └── progress-chart.tsx    # Visual progress indicators
       │   ├── tasks/                    # Casual task components
       │   ├── prioritize/               # Prioritization tool UI
       │   ├── icons/                    # Custom SVG icons
       │   ├── theme-provider.tsx        # Next-themes wrapper
       │   └── theme-toggle.tsx          # Dark/light mode switcher
       ├── context/
       │   ├── project-context.tsx       # Project state management (CRUD +
       Firebase sync)
       │   └── settings-context.tsx      # User settings state (Firebase
       persistence)
       ├── hooks/
       │   ├── use-toast.ts              # Toast notifications
       │   └── use-mobile.tsx            # Responsive mobile detection
       ├── lib/
       │   ├── types.ts                  # TypeScript type definitions
       (Project, Task, TaskDeck)
       │   ├── firebase.ts               # Firebase app initialization
       │   ├── persistence.ts            # Firestore CRUD operations
       │   ├── briizos.ts                # Integration with briizOS
       │   ├── utils.ts                  # Utility functions
       │   ├── actions.ts                # Server actions
       │   ├── data.ts                   # Default/sample data
       │   └── placeholder-images.json   # Asset references
       ├── styles/
       │   └── dashboard.css             # Dashboard-specific styling
       └── globals.css                   # Global CSS with Tailwind
       directives + theme variables

       Configuration Files:
       ├── package.json                  # Dependencies & scripts
       ├── tsconfig.json                 # TypeScript configuration with @/*
        path alias
       ├── next.config.ts                # Next.js config (image patterns,
       error handling)
       ├── tailwind.config.ts            # Tailwind theme customization
       ├── components.json               # shadcn/ui CLI config
       ├── postcss.config.mjs            # PostCSS setup for Tailwind
       ├── .env                          # Firebase & Gemini API keys
       ├── apphosting.yaml               # Firebase App Hosting config
       └── .firebaserc                   # Firebase project config

## State Management & Data Flow

       Context-Based Architecture:
       1. ProjectProvider (src/context/project-context.tsx)
         - Manages projects and tasks
         - Handles offline/online modes
         - Firebase Firestore sync when authenticated
         - Falls back to localStorage in offline mode
         - Read-only mode when sync is disabled
       2. SettingsProvider (src/context/settings-context.tsx)
         - User preferences (enableSync, importBriizOS)
         - Firebase persistence per user
         - Watches auth state changes

       Data Persistence Flow:
       - Authenticated users: Cloud source of truth (Firestore)
       - Offline users: localStorage (read-only)
       - Path: users/{uid}/apps/actionDeck/*

## Core Features

       From docs/blueprint.md:

       1. Casual Task List - Simple to-do management
       2. Project Dashboard - Multi-project management with progress
       tracking
       3. Dynamic Modals - Detailed project/task information
       4. Progress Charts - Visual project progress using Recharts
       5. Intelligent Prioritization Tool - AI-powered project ranking using
        Genkit + Gemini
       6. Import/Export - JSON import and export of projects and tasks
       7. Theme Options - Light/dark mode toggle

## Import/Export

       Location: Settings Modal (src/components/layout/settings-modal.tsx)

       Export Schema:
       {
         "projects": Project[],
         "casualTasks": TaskListItem[]
       }

       Project Schema:
       {
         "id": string,           // Unique identifier
         "name": string,         // Project name
         "description": string,  // Brief description
         "deadline": string,     // YYYY-MM-DD format
         "importance": number,   // 1-10 priority level
         "size": number,         // Estimated hours
         "relevance": string,    // Context/why it matters
         "coverImage": string,   // Optional URL
         "tasks": Task[]         // Array of tasks
       }

       Task Schema:
       {
         "id": string,
         "title": string,
         "completed": boolean
       }

       Import Behavior:
       - Uses Firestore setDoc with { merge: true }
       - Projects/tasks with matching IDs are MERGED (fields updated)
       - New IDs are ADDED as new entries
       - Existing data with different IDs is PRESERVED (not deleted)
       - Requires authentication and cloud sync enabled

       AI-Assisted Import:
       - See project-import-prompt.txt for a prompt template
       - Use with any LLM to generate valid import JSON from natural language

## Design System

### Color Scheme (CSS variables in globals.css):

       - Background: Near-black (210 30% 15%)
       - Foreground: Light grey (180 15% 92%)
       - Primary: Teal gradient (neon cyber theme inspired by briizOS)
       - Secondary: Configurable via CSS variables
       - Accent: Sky Blue for interactive elements
       - Charts: 5 distinct colors for data visualization

### Typography:

       - Body: Jost (sans-serif) - clean, readable
       - Headlines: Nokie (display font) - large titles
       - Monospace: Playwrite NL - code snippets
       - Custom font imports in layout.tsx

### GUI/UI

      - 38+ pre-built components (buttons, dialogs, forms, etc.)
       - CSS variables for theming

## AI Integration (Genkit)

       Setup (src/ai/genkit.ts):
       - Uses Google Genkit framework
       - Model: googleai/gemini-2.5-flash
       - Plugin: Google AI

### Flows

       #### 1. breakdown-task-flow.ts - Task decomposition
         - Input: High-level goal + optional context
         - Output: Array of actionable tasks OR clarifying question
         - Uses schema validation with Zod
       #### 2. intelligent-project-prioritization.ts - Project ranking
         - Analyzes deadline, importance, size, relevance
         - Outputs reasoning in markdown format

## Key Conventions & Patterns Found

       1. Naming:
         - Components: PascalCase (e.g., ProjectList, DashboardSummary)
         - Files: kebab-case for files (e.g., project-context.tsx)
         - Hooks: use prefix for custom hooks
       2. Component Structure:
         - 'use client' directive for client components
         - Server-side components by default in App Router
         - Context providers wrap route groups
       3. Error Handling:
         - TypeScript strict mode enabled
         - Type-safe database operations with Firestore
         - Zod schema validation for forms and AI inputs
       4. Environment Variables:
         - NEXT_PUBLIC_* prefix for public Firebase/API keys
         - GEMINI_API_KEY for server-side AI
         - NEXT_PUBLIC_ENABLE_FIRESTORE_SYNC for feature flagging
       5. Styling:
         - Tailwind utility classes
         - CSS modules not used (utility-first approach)
         - Custom CSS variables for theming
         - No PostCSS plugins beyond Tailwind
       6. Build Configuration:
         - typescript.ignoreBuildErrors: true in next.config.ts
         - eslint.ignoreDuringBuilds: true in next.config.ts
         - Remote image patterns whitelisted (unsplash, placehold.co,
       picsum.photos)
       7. Testing/Linting:
         - No Jest/testing framework configured
         - ESLint via Next.js built-in linter
         - TypeScript strict checking available

       ---
       Authentication & Authorization
       - Securely served noncached website via Firebase Securestack (beta)
       - Provider: Firebase Authentication
       - State: Tracked via onAuthStateChanged in contexts
       - Protected Routes: All routes in (app) group require auth
       - Login Page: /login public route

## Performance Optimizations

       - Next.js 15 with Turbopack for faster builds
       - Incremental TypeScript compilation
       - Image optimization with remote pattern configuration
       - dynamic = 'force-dynamic' for app routes (Firebase real-time sync)

## Project-Specific Notes

       3. Firebase Integration: Tightly integrated with Cloud Firestore and
       Authentication
       4. Read-only Offline Mode: Data modifications disabled when sync is
       off
       5. BriizOS Integration: References to importing from parent briizOS
       project
       6. Development AI Server: Genkit flows run separately via genkit:dev
       command

## Code Statistics

       - Total LOC: ~6,806 lines of TypeScript/TSX
       - Main modules:
         - Context/Hooks: 209 lines
         - Components: ~4,000 lines
         - Library utilities: ~400 lines
         - UI components (shadcn): ~2,200 lines

       This is a modern, well-structured Next.js application with
       enterprise-grade patterns, Firebase backend, and AI-powered features
       using Google Genkit.
````

## File: docs/blueprint.md
````markdown
# **App Name**: Action Deck

## Core Features:

- Casual Task List: Simple to-do list with basic task creation, editing, and completion features.
- Project Dashboard: Dashboard to manage personal projects with multiple task lists and progress tracking.
- Dynamic Modals: Interactive modals for detailed project and task information.
- Progress Charts: Visual representation of project progress using charts and graphs.
- Intelligent Prioritization Tool: Use LLM to evaluate projects' parameters, user defined goals, and timing to choose appropriate project priorities; factors may include deadline, importance, size and relevance. Outputs reasoning process as markdown, as a tool for the user.
- Export Functionality: Capability to export the dashboard information to a sharable JSON format.
- Theme Options: Light/dark mode theme switch

## Style Guidelines:

- Primary color: Sunset Red for a contemporary feel. It moves away from traditional blues and greens associated with productivity apps.
- Background color: Charcoal, creating a clean, distraction-free workspace.
- Accent color: Sky Blue to highlight interactive elements.
- Body and headline font: 'Jost', a sans-serif font, for both body text and headlines, lends a clean, objective, and readable style. 'Inter' is suitable for a software application intended to also run on devices.
- Monospace font: 'Playwrite Netherland' for displaying code snippets.
- Title font: 'Nokie', a display font, for large titles and headings.
- Use a set of simple, minimalist icons. All icons should use the accent color (Sky Blue).
- Clean, spacious layout with clear divisions between the casual task list and project dashboard. Prioritize a user-friendly, intuitive design for both views.
- Subtle transitions for task completion and dynamic chart updates.
````

## File: public/id-finder.html
````html
<!DOCTYPE html>
<html>
<head>
  <title>ActionDeck ID Finder</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #1a1a2e;
      color: #0ff;
      padding: 20px;
    }
    h1 {
      color: #0ff;
      text-shadow: 0 0 10px #0ff;
    }
    .instructions {
      background: #16213e;
      padding: 15px;
      border: 1px solid #0ff;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    button {
      background: #0ff;
      color: #1a1a2e;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin: 5px;
    }
    button:hover {
      background: #00cccc;
    }
    #output {
      background: #0d1117;
      padding: 15px;
      border: 1px solid #0ff;
      border-radius: 8px;
      max-height: 500px;
      overflow-y: auto;
      white-space: pre-wrap;
      font-size: 12px;
    }
    .highlight {
      background: yellow;
      color: black;
    }
  </style>
</head>
<body>
  <h1>🎯 ActionDeck Auto-ID Finder</h1>

  <div class="instructions">
    <h3>Instructions:</h3>
    <ol>
      <li>Open your ActionDeck app in another tab</li>
      <li>Right-click on ANY element you want to style</li>
      <li>Click "Inspect Element" in Chrome DevTools</li>
      <li>Look for <code>id="auto-XXX"</code> in the HTML</li>
      <li>Copy that ID and use it in your globals.css!</li>
    </ol>
    <p><strong>Or use the tools below:</strong></p>
  </div>

  <button onclick="enableClickToId()">🖱️ Click to Find ID Mode</button>
  <button onclick="listAllIds()">📋 List All Auto-IDs</button>
  <button onclick="exportIdMap()">💾 Export ID Map</button>
  <button onclick="clearOutput()">🗑️ Clear</button>

  <div id="output"></div>

  <script>
    let clickMode = false;

    function enableClickToId() {
      if (clickMode) {
        clickMode = false;
        document.body.style.cursor = 'default';
        log('❌ Click-to-ID mode disabled');
        return;
      }

      clickMode = true;
      document.body.style.cursor = 'crosshair';
      log('✅ Click-to-ID mode enabled! Click any element on the page...');

      document.addEventListener('click', handleClick, true);
    }

    function handleClick(e) {
      if (!clickMode) return;

      e.preventDefault();
      e.stopPropagation();

      const el = e.target;
      const id = el.id || 'NO ID';
      const tag = el.tagName.toLowerCase();
      const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';

      log(`
🎯 Clicked Element:
   Tag: <${tag}>
   ID: ${id}
   Classes: ${classes}
   Text: ${el.textContent.substring(0, 50)}...

📝 CSS Selector:
   #${id} { }
      `);

      clickMode = false;
      document.body.style.cursor = 'default';
    }

    function listAllIds() {
      const allElements = document.querySelectorAll('[id^="auto-"]');
      log(`\n📋 Found ${allElements.length} auto-generated IDs:\n`);

      allElements.forEach((el, index) => {
        const tag = el.tagName.toLowerCase();
        const text = el.textContent.substring(0, 30).trim();
        log(`${index + 1}. #${el.id} <${tag}> "${text}..."`);
      });
    }

    function exportIdMap() {
      const allElements = document.querySelectorAll('[id^="auto-"]');
      const map = {};

      allElements.forEach((el) => {
        map[el.id] = {
          tag: el.tagName.toLowerCase(),
          classes: el.className,
          text: el.textContent.substring(0, 50).trim()
        };
      });

      const json = JSON.stringify(map, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'actiondeck-id-map.json';
      a.click();

      log('✅ ID map exported to actiondeck-id-map.json');
    }

    function log(message) {
      const output = document.getElementById('output');
      output.textContent += message + '\n';
      output.scrollTop = output.scrollHeight;
    }

    function clearOutput() {
      document.getElementById('output').textContent = '';
    }
  </script>
</body>
</html>
````

## File: src/ai/flows/analyze-files-flow.ts
````typescript
'use server';

/**
 * @fileOverview Genkit flow for analyzing files and generating ActionDeck projects.
 *
 * This flow takes file content and metadata, uses AI to understand the content,
 * and generates Project objects that match the ActionDeck import schema.
 *
 * - analyzeFiles - Main function to analyze files and generate projects
 * - AnalyzeFilesInput - Input type with file array and context
 * - AnalyzeFilesOutput - Output type with generated projects and skipped files
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema for file metadata
const FileInfoSchema = z.object({
  path: z.string().describe('Absolute file path'),
  name: z.string().describe('File name with extension'),
  extension: z.string().describe('File extension (e.g., .md, .ts, .ly)'),
  content: z.string().describe('File content (truncated to ~10k chars)'),
  modifiedAt: z.string().describe('Last modified timestamp (ISO format)'),
  sizeBytes: z.number().describe('File size in bytes'),
});

const AnalyzeFilesInputSchema = z.object({
  files: z.array(FileInfoSchema).describe('Array of files to analyze'),
  existingProjectNames: z.array(z.string()).describe('Names of existing projects to avoid duplicates'),
  userContext: z.string().optional().describe('Optional context about user goals or preferences'),
});
export type AnalyzeFilesInput = z.infer<typeof AnalyzeFilesInputSchema>;

// Task schema for generated tasks
const GeneratedTaskSchema = z.object({
  id: z.string().describe('Unique task ID (format: task-{timestamp}-{index})'),
  title: z.string().describe('Task title'),
  completed: z.boolean().describe('Whether task is completed (usually false for new)'),
});

// Domain enum matching ActionDeck's 8 domains
const DomainSchema = z.enum([
  'music',
  'poetry',
  'theatre',
  'theory',
  'coding',
  'visual-art',
  'health',
  'home',
]).describe('Project domain category');

// Generated project schema
const GeneratedProjectSchema = z.object({
  name: z.string().describe('Project name - concise but descriptive'),
  description: z.string().describe('Brief description (1-2 sentences)'),
  domain: DomainSchema.optional().describe('Inferred domain based on file type and content'),
  tags: z.array(z.string()).describe('Relevant tags/keywords (3-5 recommended)'),
  tasks: z.array(GeneratedTaskSchema).describe('Actionable tasks extracted from content'),
  relevance: z.string().describe('Why this project matters / what it aims to achieve'),
  importance: z.number().min(1).max(10).describe('Inferred importance (1-10)'),
  size: z.number().describe('Estimated hours to complete'),
  sourcePaths: z.array(z.string()).describe('Source file path(s) this project was generated from'),
});

const SkippedFileSchema = z.object({
  path: z.string().describe('File path that was skipped'),
  reason: z.string().describe('Why the file was not converted to a project'),
});

const AnalyzeFilesOutputSchema = z.object({
  projects: z.array(GeneratedProjectSchema).describe('Generated project objects'),
  skipped: z.array(SkippedFileSchema).describe('Files that were skipped with reasons'),
});
export type AnalyzeFilesOutput = z.infer<typeof AnalyzeFilesOutputSchema>;

export async function analyzeFiles(input: AnalyzeFilesInput): Promise<AnalyzeFilesOutput> {
  return analyzeFilesFlow(input);
}

const analyzeFilesPrompt = ai.definePrompt({
  name: 'analyzeFilesPrompt',
  input: { schema: AnalyzeFilesInputSchema },
  output: { schema: AnalyzeFilesOutputSchema },
  prompt: `You are an AI assistant that analyzes files and converts them into ActionDeck projects.

## Your Task
Analyze each file and determine if it should become a project in ActionDeck. For files that warrant a project, generate a complete project object. Skip files that are trivial, temporary, or don't represent meaningful work.

## Domain Mapping Guide
Use these heuristics to assign domains:
- **music**: .ly (LilyPond), .midi, .wav, .mp3, .aiff, music notation, chord progressions, lyrics
- **poetry**: .verse, poems, verses, literary writing, prose drafts
- **theatre**: .script, screenplays, stage directions, dialogue, performance notes
- **theory**: Academic writing, research, philosophy, analysis, essays (often .md or .tex)
- **coding**: .ts, .js, .py, .rs, .go, .java, programming projects, technical docs
- **visual-art**: .psd, .ai, .sketch, .fig, art concepts, design briefs
- **health**: Fitness plans, medical notes, wellness tracking, diet plans
- **home**: Household tasks, home improvement, organization, family planning

## Project Generation Rules
1. **Name**: Create a clear, actionable project name (not just the filename)
2. **Description**: Summarize what this project is about in 1-2 sentences
3. **Tasks**: Extract TODOs, action items, or create logical next steps (3-7 tasks)
4. **Tags**: Add relevant keywords for filtering (3-5 tags)
5. **Importance**: Rate 1-10 based on apparent priority/urgency in content
6. **Size**: Estimate hours needed based on complexity
7. **sourcePaths**: Always include the file path that generated this project

## Skip Criteria
Skip files that are:
- Configuration files (.json, .yaml for build tools)
- Lock files (package-lock.json, yarn.lock)
- Minified/compiled output
- Empty or near-empty
- Binary files without meaningful project context
- Temporary or backup files

## Existing Projects
Avoid creating projects with names too similar to: {{#each existingProjectNames}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}

{{#if userContext}}
## User Context
{{userContext}}
{{/if}}

## Files to Analyze

{{#each files}}
### File {{@index}}: {{name}}
- **Path**: {{path}}
- **Extension**: {{extension}}
- **Modified**: {{modifiedAt}}
- **Size**: {{sizeBytes}} bytes

**Content:**
\`\`\`
{{{content}}}
\`\`\`

---
{{/each}}

Now analyze these files and generate appropriate projects:`,
});

const analyzeFilesFlow = ai.defineFlow(
  {
    name: 'analyzeFilesFlow',
    inputSchema: AnalyzeFilesInputSchema,
    outputSchema: AnalyzeFilesOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeFilesPrompt(input);
    return output!;
  }
);
````

## File: src/ai/flows/breakdown-task-flow.ts
````typescript
'use server';

/**
 * @fileOverview This file defines a Genkit flow for breaking down a high-level goal into smaller, actionable tasks.
 * It will ask a clarifying question if the initial goal is too ambiguous.
 *
 * - breakdownTask - A function that handles the task breakdown process.
 * - BreakdownTaskInput - The input type for the breakdownTask function.
 * - BreakdownTaskOutput - The return type for the breakdownTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BreakdownTaskInputSchema = z.object({
  goal: z.string().describe('The high-level goal to be broken down into tasks.'),
  // The context can be used to provide more information from previous turns.
  context: z.string().optional().describe('Additional context or answers to clarifying questions.'),
});
export type BreakdownTaskInput = z.infer<typeof BreakdownTaskInputSchema>;

const BreakdownTaskOutputSchema = z.object({
  tasks: z.array(z.string()).optional().describe('An array of small, actionable task titles. This is returned when the AI has enough information.'),
  clarifyingQuestion: z.string().optional().describe('A question to ask the user to get more details before breaking down the task. This is returned when the AI needs more information.'),
  isDone: z.boolean().describe('Set to true if tasks were generated, false if a clarifying question is being asked.'),
});
export type BreakdownTaskOutput = z.infer<typeof BreakdownTaskOutputSchema>;

export async function breakdownTask(input: BreakdownTaskInput): Promise<BreakdownTaskOutput> {
  return breakdownTaskFlow(input);
}

const breakdownTaskPrompt = ai.definePrompt({
  name: 'breakdownTaskPrompt',
  input: {schema: BreakdownTaskInputSchema},
  output: {schema: BreakdownTaskOutputSchema},
  prompt: `You are an expert project manager. A user will provide a high-level goal. Your job is to break that goal down into a list of small, actionable tasks.

Evaluate the user's goal.
- If the goal is straightforward and you have enough information (e.g., "organize my garage", "plan a birthday party"), break it down into a list of tasks and set isDone to true.
- If the goal is ambiguous, emotionally complex, or requires more specific details (e.g., "reconcile with mom", "get a new job"), you MUST ask one single clarifying question to get the necessary information. Do not generate tasks yet. Set isDone to false and populate the clarifyingQuestion field.

{{#if context}}
The user has provided the following context to your previous question:
{{{context}}}
Use this information to generate the tasks.
{{/if}}

User Goal: {{{goal}}}
`,
});

const breakdownTaskFlow = ai.defineFlow(
  {
    name: 'breakdownTaskFlow',
    inputSchema: BreakdownTaskInputSchema,
    outputSchema: BreakdownTaskOutputSchema,
  },
  async input => {
    const {output} = await breakdownTaskPrompt(input);
    return output!;
  }
);
````

## File: src/ai/flows/intelligent-project-prioritization.ts
````typescript
// src/ai/flows/intelligent-project-prioritization.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligent project prioritization.
 *
 * The flow analyzes projects based on deadline, importance, size, and relevance, and provides a
 * prioritized list with a clear explanation of the reasoning in markdown format.
 *
 * - prioritizeProjects - A function that handles the project prioritization process.
 * - PrioritizeProjectsInput - The input type for the prioritizeProjects function.
 * - PrioritizeProjectsOutput - The return type for the prioritizeProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectSchema = z.object({
  name: z.string().describe('The name of the project.'),
  deadline: z.string().describe('The deadline of the project (YYYY-MM-DD).'),
  importance: z.number().describe('The importance of the project (1-10).'),
  size: z.number().describe('The size of the project (estimated hours).'),
  relevance: z.string().describe('The relevance of the project to user goals.'),
});

const PrioritizeProjectsInputSchema = z.object({
  projects: z.array(ProjectSchema).describe('An array of projects to prioritize.'),
  userGoals: z.string().describe('The user’s overall goals.'),
  timing: z.string().describe('Information about the timing or context of the prioritization.'),
});
export type PrioritizeProjectsInput = z.infer<typeof PrioritizeProjectsInputSchema>;

const PrioritizeProjectsOutputSchema = z.object({
  prioritizedList: z.array(z.string()).describe('A prioritized list of project names.'),
  reasoning: z.string().describe('The reasoning behind the prioritization in markdown format.'),
});
export type PrioritizeProjectsOutput = z.infer<typeof PrioritizeProjectsOutputSchema>;

export async function prioritizeProjects(input: PrioritizeProjectsInput): Promise<PrioritizeProjectsOutput> {
  return prioritizeProjectsFlow(input);
}

const prioritizeProjectsPrompt = ai.definePrompt({
  name: 'prioritizeProjectsPrompt',
  input: {schema: PrioritizeProjectsInputSchema},
  output: {schema: PrioritizeProjectsOutputSchema},
  prompt: `You are an AI assistant designed to help users prioritize their personal projects.

You will receive a list of projects, along with information about their deadlines, importance, size, and relevance to the user's goals. You will also receive information about the user's goals and the timing/context of the prioritization.

Based on this information, you will generate a prioritized list of projects and explain your reasoning in markdown format.

Here is the project information:

User Goals: {{{userGoals}}}
Timing/Context: {{{timing}}}

{{#each projects}}
Project Name: {{{name}}}
Deadline: {{{deadline}}}
Importance: {{{importance}}}
Size: {{{size}}}
Relevance: {{{relevance}}}
{{/each}}

Prioritized List:`,
});

const prioritizeProjectsFlow = ai.defineFlow(
  {
    name: 'prioritizeProjectsFlow',
    inputSchema: PrioritizeProjectsInputSchema,
    outputSchema: PrioritizeProjectsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeProjectsPrompt(input);
    return output!;
  }
);
````

## File: src/ai/dev.ts
````typescript
import { config } from 'dotenv';
config();

import '@/ai/flows/intelligent-project-prioritization.ts';
import '@/ai/flows/breakdown-task-flow.ts';
import '@/ai/flows/analyze-files-flow.ts';
````

## File: src/ai/genkit.ts
````typescript
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
````

## File: src/app/page.tsx
````typescript
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  return null;
}
````

## File: src/components/layout/filter-initializer.tsx
````typescript
'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/settings-context';
import { applyFiltersToDocument, defaultFilters, FilterSettings } from './filters-modal';

export function FilterInitializer() {
  const { settings, isReady } = useSettings();

  useEffect(() => {
    if (isReady) {
      const filters = settings.filters || defaultFilters;
      applyFiltersToDocument(filters as FilterSettings);
    }
  }, [settings.filters, isReady]);

  return null;
}
````

## File: src/components/ui/accordion.tsx
````typescript
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
````

## File: src/components/ui/alert-dialog.tsx
````typescript
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
````

## File: src/components/ui/alert.tsx
````typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
````

## File: src/components/ui/avatar.tsx
````typescript
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
````

## File: src/components/ui/badge.tsx
````typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
````

## File: src/components/ui/breadcrumb.tsx
````typescript
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
````

## File: src/components/ui/button.tsx
````typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
````

## File: src/components/ui/calendar.tsx
````typescript
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
````

## File: src/components/ui/card.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm neon-surface",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
````

## File: src/components/ui/carousel.tsx
````typescript
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
````

## File: src/components/ui/chart.tsx
````typescript
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
````

## File: src/components/ui/checkbox.tsx
````typescript
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
````

## File: src/components/ui/collapsible.tsx
````typescript
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
````

## File: src/components/ui/dialog.tsx
````typescript
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
````

## File: src/components/ui/dropdown-menu.tsx
````typescript
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
````

## File: src/components/ui/form.tsx
````typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
````

## File: src/components/ui/input.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm neon-input",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
````

## File: src/components/ui/label.tsx
````typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
````

## File: src/components/ui/menubar.tsx
````typescript
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
````

## File: src/components/ui/popover.tsx
````typescript
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
````

## File: src/components/ui/progress.tsx
````typescript
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
````

## File: src/components/ui/radio-group.tsx
````typescript
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
````

## File: src/components/ui/scroll-area.tsx
````typescript
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
````

## File: src/components/ui/select.tsx
````typescript
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
````

## File: src/components/ui/separator.tsx
````typescript
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
````

## File: src/components/ui/sheet.tsx
````typescript
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
````

## File: src/components/ui/sidebar.tsx
````typescript
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
````

## File: src/components/ui/skeleton.tsx
````typescript
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
````

## File: src/components/ui/slider.tsx
````typescript
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
````

## File: src/components/ui/switch.tsx
````typescript
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
````

## File: src/components/ui/table.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
````

## File: src/components/ui/tabs.tsx
````typescript
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
````

## File: src/components/ui/textarea.tsx
````typescript
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
````

## File: src/components/ui/toast.tsx
````typescript
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
````

## File: src/components/ui/toaster.tsx
````typescript
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
````

## File: src/components/ui/tooltip.tsx
````typescript
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
````

## File: src/components/auto-id-injector.tsx
````typescript
'use client';

import { useEffect } from 'react';

/**
 * Generates a stable, human-readable data-id attribute based on:
 * 1. Element's class names (if meaningful)
 * 2. Element's text content (first few words)
 * 3. Element's tag name
 * 4. Element's role/aria attributes
 *
 * This creates stable selectors that survive DOM restructuring.
 *
 * Examples:
 * - [data-id="button-view-details"]
 * - [data-id="card-project-card"]
 * - [data-id="input-search-projects"]
 */
function generateStableDataId(element: Element): string {
  const parts: string[] = [];

  // 1. Add tag name
  const tag = element.tagName.toLowerCase();
  parts.push(tag);

  // 2. Add meaningful class names (filter out utility classes)
  const classes = element.className.toString().split(/\s+/);
  const meaningfulClasses = classes.filter(c =>
    c &&
    !c.startsWith('css-') &&
    !c.match(/^(w-|h-|p-|m-|text-|bg-|flex|grid|absolute|relative|rounded|border|shadow)/) &&
    c.length > 2
  );

  if (meaningfulClasses.length > 0) {
    // Take first meaningful class
    parts.push(meaningfulClasses[0].replace(/[^a-z0-9-]/gi, '-').toLowerCase());
  }

  // 3. Add text content hint (first 2-3 words, max 30 chars)
  const textContent = element.textContent?.trim();
  if (textContent && textContent.length > 0 && textContent.length < 100) {
    const words = textContent
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .split(/\s+/)
      .slice(0, 3)
      .join('-')
      .substring(0, 30);

    if (words.length > 2) {
      parts.push(words);
    }
  }

  // 4. Add role/aria label if present
  const role = element.getAttribute('role');
  const ariaLabel = element.getAttribute('aria-label');

  if (role) {
    parts.push(role);
  } else if (ariaLabel) {
    const label = ariaLabel.toLowerCase().replace(/[^a-z0-9]/gi, '-').substring(0, 20);
    parts.push(label);
  }

  return parts.filter(p => p).join('-').replace(/-+/g, '-').substring(0, 80);
}

/**
 * Automatically adds data-id attributes to ALL DOM elements.
 *
 * These are more stable than position-based IDs because they're based on:
 * - Class names
 * - Text content
 * - Semantic attributes
 *
 * You can target them in CSS like:
 * [data-id="button-view-details"] { }
 * [data-id*="project-card"] { }
 * [data-id^="input-search"] { }
 */
export function AutoIdInjector() {
  useEffect(() => {
    const assignDataIds = () => {
      const allElements = document.body.querySelectorAll('*');
      const seenIds = new Map<string, number>();

      allElements.forEach((element) => {
        // Skip script, style, and meta elements
        if (['SCRIPT', 'STYLE', 'META', 'LINK', 'TITLE', 'HEAD'].includes(element.tagName)) {
          return;
        }

        // Generate stable data-id
        let dataId = generateStableDataId(element);

        // Handle duplicates by adding a counter
        if (seenIds.has(dataId)) {
          const count = seenIds.get(dataId)! + 1;
          seenIds.set(dataId, count);
          dataId = `${dataId}-${count}`;
        } else {
          seenIds.set(dataId, 0);
        }

        // Set the data-id attribute
        element.setAttribute('data-id', dataId);
      });
    };

    // Run on initial mount
    assignDataIds();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      assignDataIds();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
````

## File: src/context/project-context.tsx
````typescript
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import { Project, ProjectFormData, Task } from '@/lib/types';
import { subscribeProjects, upsertProject, removeProject } from '@/lib/persistence';
import { initialProjects } from '@/lib/data';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSettings } from '@/context/settings-context';

const STORAGE_KEY = 'action-deck-projects';
const PENDING_KEY = 'action-deck-pending';
const DELETED_KEY = 'action-deck-deleted';

interface ProjectContextType {
    projects: Project[];
    addProject: (projectData: ProjectFormData) => void;
    updateProject: (updatedProject: Project) => void;
    deleteProject: (projectId: string) => void;
    toggleTask: (projectId: string, taskId: string) => void;
    isOffline: boolean;
    hasPendingChanges: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Convert Firestore Timestamp or other date formats to milliseconds
function toMillis(value: unknown): number | undefined {
    if (typeof value === 'number') return value;
    if (value && typeof value === 'object' && 'toMillis' in value && typeof (value as { toMillis: () => number }).toMillis === 'function') {
        return (value as { toMillis: () => number }).toMillis();
    }
    if (value && typeof value === 'object' && 'seconds' in value) {
        return (value as { seconds: number }).seconds * 1000;
    }
    return undefined;
}

// Migrate old projects to include new required fields
function migrateProject(project: Partial<Project>): Project {
    const now = Date.now();
    return {
        id: project.id || `proj-${now}`,
        name: project.name || '',
        description: project.description || '',
        deadline: project.deadline || new Date().toISOString().split('T')[0],
        importance: project.importance ?? 5,
        size: project.size ?? 10,
        relevance: project.relevance || '',
        coverImage: project.coverImage,
        tasks: project.tasks || [],
        // New fields with defaults
        domain: project.domain,
        status: project.status || 'active',
        tags: project.tags || [],
        milestones: project.milestones || [],
        notes: project.notes,
        manualProgress: project.manualProgress,
        // AI import source tracking
        sourcePaths: project.sourcePaths,
        updatedAt: toMillis(project.updatedAt) || now,
        createdAt: toMillis(project.createdAt) || now,
    };
}

// Smart merge: prefer the version with the more recent updatedAt
function smartMerge(local: Project, remote: Project): Project {
    if (local.updatedAt > remote.updatedAt) {
        return local;
    }
    if (remote.updatedAt > local.updatedAt) {
        return remote;
    }
    // If timestamps are equal, merge with local taking precedence for ties
    return { ...remote, ...local };
}

// Merge two project arrays using smart merge
function mergeProjectArrays(local: Project[], remote: Project[]): Project[] {
    const merged = new Map<string, Project>();

    // Add all remote projects first
    for (const p of remote) {
        merged.set(p.id, migrateProject(p));
    }

    // Merge local projects (local wins if newer)
    for (const p of local) {
        const migrated = migrateProject(p);
        const existing = merged.get(p.id);
        if (existing) {
            merged.set(p.id, smartMerge(migrated, existing));
        } else {
            merged.set(p.id, migrated);
        }
    }

    return Array.from(merged.values());
}

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pendingChanges, setPendingChanges] = useState<Map<string, Project>>(new Map());
    const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
    const [isLoaded, setIsLoaded] = useState(false);
    const [authedUid, setAuthedUid] = useState<string | null>(null);
    const { settings } = useSettings();
    const canPersist = Boolean(authedUid && settings.enableSync);
    const syncingRef = useRef(false);

    // Load pending changes and deleted IDs from localStorage on mount
    useEffect(() => {
        try {
            const pendingData = localStorage.getItem(PENDING_KEY);
            if (pendingData) {
                const parsed = JSON.parse(pendingData) as Record<string, Project>;
                setPendingChanges(new Map(Object.entries(parsed)));
            }
            const deletedData = localStorage.getItem(DELETED_KEY);
            if (deletedData) {
                setDeletedIds(new Set(JSON.parse(deletedData)));
            }
        } catch (e) {
            console.error('[projects] Failed to load pending changes:', e);
        }
    }, []);

    // Save pending changes to localStorage whenever they change
    useEffect(() => {
        if (pendingChanges.size > 0) {
            localStorage.setItem(PENDING_KEY, JSON.stringify(Object.fromEntries(pendingChanges)));
        } else {
            localStorage.removeItem(PENDING_KEY);
        }
    }, [pendingChanges]);

    // Save deleted IDs to localStorage
    useEffect(() => {
        if (deletedIds.size > 0) {
            localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deletedIds)));
        } else {
            localStorage.removeItem(DELETED_KEY);
        }
    }, [deletedIds]);

    useEffect(() => {
        const auth = getAuth();
        const stopAuth = onAuthStateChanged(auth, (u) => {
            setAuthedUid(u?.uid || null);
        });
        return () => stopAuth();
    }, []);

    // Sync pending changes when coming online
    const syncPendingChanges = useCallback(async () => {
        if (syncingRef.current || pendingChanges.size === 0 && deletedIds.size === 0) return;
        syncingRef.current = true;

        try {
            // Sync pending updates/creates
            for (const [id, project] of pendingChanges) {
                await upsertProject(project);
            }
            setPendingChanges(new Map());

            // Sync pending deletes
            for (const id of deletedIds) {
                await removeProject(id);
            }
            setDeletedIds(new Set());

            console.log('[projects] Successfully synced pending changes');
        } catch (e) {
            console.error('[projects] Failed to sync pending changes:', e);
        } finally {
            syncingRef.current = false;
        }
    }, [pendingChanges, deletedIds]);

    useEffect(() => {
        let stopSub: undefined | (() => void);

        if (canPersist) {
            // Cloud source of truth - subscribe to real-time updates
            stopSub = subscribeProjects((remote) => {
                const migratedRemote = remote.map(migrateProject);

                // If we have pending changes, merge them with remote
                if (pendingChanges.size > 0) {
                    const pendingArray = Array.from(pendingChanges.values());
                    const merged = mergeProjectArrays(pendingArray, migratedRemote);
                    // Filter out deleted items
                    const filtered = merged.filter(p => !deletedIds.has(p.id));
                    setProjects(filtered);
                } else {
                    // No pending changes, just use remote (filtered)
                    const filtered = migratedRemote.filter(p => !deletedIds.has(p.id));
                    setProjects(filtered);
                }

                setIsLoaded(true);

                // Sync pending changes after initial load
                syncPendingChanges();
            });
        } else {
            // Offline mode: load from localStorage with full read/write
            try {
                const storedProjects = localStorage.getItem(STORAGE_KEY);
                if (storedProjects) {
                    const parsed = JSON.parse(storedProjects) as Project[];
                    setProjects(parsed.map(migrateProject));
                } else {
                    setProjects(initialProjects.map(migrateProject));
                }
            } catch (error) {
                console.error('Failed to parse projects from localStorage', error);
                setProjects(initialProjects.map(migrateProject));
            }
            setIsLoaded(true);
        }

        return () => {
            if (typeof stopSub === 'function') stopSub();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canPersist]);

    // Save to localStorage whenever projects change (for offline access)
    useEffect(() => {
        if (isLoaded && projects.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        }
    }, [projects, isLoaded]);

    const addProject = (projectData: ProjectFormData) => {
        const now = Date.now();
        const newProject: Project = migrateProject({
            id: `proj-${now}`,
            tasks: [],
            milestones: [],
            ...projectData,
            createdAt: now,
            updatedAt: now,
        });

        setProjects(prevProjects => [newProject, ...prevProjects]);

        if (canPersist) {
            upsertProject(newProject).catch((e) => {
                console.error('[projects] Failed to persist new project:', e);
                // Add to pending changes for later sync
                setPendingChanges(prev => new Map(prev).set(newProject.id, newProject));
            });
        } else {
            // Offline: track as pending change for later sync
            setPendingChanges(prev => new Map(prev).set(newProject.id, newProject));
        }
    };

    const updateProject = (updatedProject: Project) => {
        const now = Date.now();
        const projectWithTimestamp = { ...updatedProject, updatedAt: now };

        setProjects(prevProjects =>
            prevProjects.map(p => (p.id === projectWithTimestamp.id ? projectWithTimestamp : p))
        );

        if (canPersist) {
            upsertProject(projectWithTimestamp).catch((e) => {
                console.error('[projects] Failed to persist updated project:', e);
                setPendingChanges(prev => new Map(prev).set(projectWithTimestamp.id, projectWithTimestamp));
            });
        } else {
            // Offline: track as pending change
            setPendingChanges(prev => new Map(prev).set(projectWithTimestamp.id, projectWithTimestamp));
        }
    };

    const deleteProject = (projectId: string) => {
        setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
        // Remove from pending changes if it was there
        setPendingChanges(prev => {
            const next = new Map(prev);
            next.delete(projectId);
            return next;
        });

        if (canPersist) {
            removeProject(projectId).catch((e) => {
                console.error('[projects] Failed to delete project:', e);
                setDeletedIds(prev => new Set(prev).add(projectId));
            });
        } else {
            // Offline: track deletion for later sync
            setDeletedIds(prev => new Set(prev).add(projectId));
        }
    };

    const toggleTask = (projectId: string, taskId: string) => {
        const now = Date.now();
        setProjects(prevProjects =>
            prevProjects.map(p => {
                if (p.id === projectId) {
                    const updated = {
                        ...p,
                        tasks: p.tasks.map(t =>
                            t.id === taskId ? { ...t, completed: !t.completed } : t
                        ),
                        updatedAt: now,
                    };
                    // Also update persistence
                    if (canPersist) {
                        upsertProject(updated).catch(() => {
                            setPendingChanges(prev => new Map(prev).set(updated.id, updated));
                        });
                    } else {
                        setPendingChanges(prev => new Map(prev).set(updated.id, updated));
                    }
                    return updated;
                }
                return p;
            })
        );
    };

    const isOffline = !canPersist;
    const hasPendingChanges = pendingChanges.size > 0 || deletedIds.size > 0;

    return (
        <ProjectContext.Provider value={{
            projects,
            addProject,
            updateProject,
            deleteProject,
            toggleTask,
            isOffline,
            hasPendingChanges,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
};
````

## File: src/context/settings-context.tsx
````typescript
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';

type FilterSettings = {
  brightness: number;
  contrast: number;
  saturate: number;
  hueRotate: number;
  sepia: number;
  invert: boolean;
  backgroundPanel: string;
};

type Settings = {
  enableSync: boolean;
  importBriizOS: boolean;
  filters?: FilterSettings;
  updatedAt?: unknown;
};

type SettingsContextType = {
  settings: Settings;
  isReady: boolean;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
  uid: string | null;
};

const defaultSettings: Settings = { enableSync: true, importBriizOS: true };

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const stop = onAuthStateChanged(auth, (u) => {
      setUid(u?.uid || null);
    });
    return () => stop();
  }, []);

  useEffect(() => {
    if (!uid) { setIsReady(true); return; }
    const db = getFirestore(app);
    const ref = doc(db, 'users', uid, 'apps', 'actionDeck', 'settings', 'main');
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Settings;
        setSettings({ ...defaultSettings, ...data });
      } else {
        setSettings(defaultSettings);
      }
      setIsReady(true);
    }, () => setIsReady(true));
    return () => unsub();
  }, [uid]);

  const updateSettings = async (patch: Partial<Settings>) => {
    if (!uid) return; // silently no-op until logged in
    const db = getFirestore(app);
    const ref = doc(db, 'users', uid, 'apps', 'actionDeck', 'settings', 'main');
    await setDoc(ref, { ...patch, updatedAt: serverTimestamp() }, { merge: true });
  };

  const value = useMemo<SettingsContextType>(() => ({ settings, isReady, updateSettings, uid }), [settings, isReady, uid]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
````

## File: src/hooks/use-mobile.tsx
````typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
````

## File: src/hooks/use-toast.ts
````typescript
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
````

## File: src/lib/actions.ts
````typescript
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { prioritizeProjects, PrioritizeProjectsInput, PrioritizeProjectsOutput } from '@/ai/flows/intelligent-project-prioritization';
import { breakdownTask, BreakdownTaskInput, BreakdownTaskOutput } from '@/ai/flows/breakdown-task-flow';
import { analyzeFiles, AnalyzeFilesInput, AnalyzeFilesOutput } from '@/ai/flows/analyze-files-flow';
import { recommendToday, RecommendTodayInput, RecommendTodayOutput } from '@/ai/flows/recommend-today-flow';
import { chatAboutToday, TodayChatInput, TodayChatOutput } from '@/ai/flows/today-chat-flow';
import type { Project, Task } from '@/lib/types';

type ActionResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};

// Maximum file size to read (50KB)
const MAX_FILE_SIZE = 50 * 1024;
// Maximum content length to send to AI (10k chars)
const MAX_CONTENT_LENGTH = 10000;

export type ScanFilesInput = {
    filePaths: string[];
    existingProjectNames?: string[];
    userContext?: string;
};

export type GeneratedProject = {
    name: string;
    description: string;
    domain?: Project['domain'];
    tags: string[];
    tasks: Task[];
    relevance: string;
    importance: number;
    size: number;
    sourcePaths: string[];
};

export type ScanFilesOutput = {
    projects: GeneratedProject[];
    skipped: { path: string; reason: string }[];
};

/**
 * Read a file and prepare it for AI analysis
 */
async function readFileForAnalysis(filePath: string) {
    try {
        const stats = await fs.stat(filePath);

        if (!stats.isFile()) {
            return { error: 'Not a file' };
        }

        if (stats.size > MAX_FILE_SIZE) {
            return { error: `File too large (${Math.round(stats.size / 1024)}KB > ${MAX_FILE_SIZE / 1024}KB limit)` };
        }

        const content = await fs.readFile(filePath, 'utf-8');
        const truncatedContent = content.length > MAX_CONTENT_LENGTH
            ? content.slice(0, MAX_CONTENT_LENGTH) + '\n\n... (truncated)'
            : content;

        return {
            path: filePath,
            name: path.basename(filePath),
            extension: path.extname(filePath),
            content: truncatedContent,
            modifiedAt: stats.mtime.toISOString(),
            sizeBytes: stats.size,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { error: `Failed to read: ${message}` };
    }
}

/**
 * Scan files and generate project suggestions using AI
 */
export async function scanAndAnalyzeFiles(input: ScanFilesInput): Promise<ActionResult<ScanFilesOutput>> {
    try {
        const { filePaths, existingProjectNames = [], userContext } = input;

        if (!filePaths || filePaths.length === 0) {
            return { success: false, error: 'No file paths provided' };
        }

        // Read all files
        const fileResults = await Promise.all(filePaths.map(readFileForAnalysis));

        const validFiles: AnalyzeFilesInput['files'] = [];
        const skipped: ScanFilesOutput['skipped'] = [];

        for (let i = 0; i < fileResults.length; i++) {
            const result = fileResults[i];
            const filePath = filePaths[i] ?? `file-${i}`;
            if ('error' in result) {
                skipped.push({ path: filePath, reason: result.error ?? 'Unknown error' });
            } else {
                validFiles.push(result);
            }
        }

        if (validFiles.length === 0) {
            return {
                success: true,
                data: { projects: [], skipped },
            };
        }

        // Call AI to analyze files
        const aiResult = await analyzeFiles({
            files: validFiles,
            existingProjectNames,
            userContext,
        });

        // Merge AI skipped files with read errors
        const allSkipped = [
            ...skipped,
            ...aiResult.skipped,
        ];

        // Convert AI output to our format (add task IDs if missing)
        const projects: GeneratedProject[] = aiResult.projects.map((p) => ({
            ...p,
            tasks: p.tasks.map((t, idx) => ({
                ...t,
                id: t.id || `task-${Date.now()}-${idx}`,
            })),
        }));

        return {
            success: true,
            data: { projects, skipped: allSkipped },
        };
    } catch (error) {
        console.error('Error in file analysis:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: `Failed to analyze files: ${message}` };
    }
}

export async function handlePrioritization(input: PrioritizeProjectsInput): Promise<ActionResult<PrioritizeProjectsOutput>> {
    try {
        const result = await prioritizeProjects(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in prioritization flow:', error);
        return { success: false, error: 'Failed to get prioritization from AI.' };
    }
}

export async function handleTaskBreakdown(input: BreakdownTaskInput): Promise<ActionResult<BreakdownTaskOutput>> {
    try {
        const result = await breakdownTask(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in task breakdown flow:', error);
        return { success: false, error: 'Failed to get task breakdown from AI.' };
    }
}

export async function handleTodayRecommend(input: RecommendTodayInput): Promise<ActionResult<RecommendTodayOutput>> {
    try {
        const result = await recommendToday(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in today recommend flow:', error);
        return { success: false, error: 'Failed to get recommendations from AI.' };
    }
}

export async function handleTodayChat(input: TodayChatInput): Promise<ActionResult<TodayChatOutput>> {
    try {
        const result = await chatAboutToday(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in today chat flow:', error);
        return { success: false, error: 'Failed to get response from AI.' };
    }
}
````

## File: src/lib/auto-id.tsx
````typescript
'use client';

import React, { useEffect, useRef } from 'react';

let globalIdCounter = 0;

/**
 * Automatically assigns unique IDs to all DOM elements in the tree
 * This runs after React renders, traversing the actual DOM
 */
export function useAutoId(ref: React.RefObject<HTMLElement>, prefix = 'el') {
  useEffect(() => {
    if (!ref.current) return;

    const assignIds = (element: Element, parentPrefix: string) => {
      // Skip if already has an ID
      if (!element.id) {
        element.id = `${parentPrefix}-${globalIdCounter++}`;
      }

      // Recursively assign IDs to all children
      Array.from(element.children).forEach((child, index) => {
        assignIds(child, `${parentPrefix}-${index}`);
      });
    };

    assignIds(ref.current, prefix);
  }, [ref, prefix]);
}

/**
 * Higher-order component that automatically assigns IDs to all elements
 */
export function withAutoId<P extends object>(
  Component: React.ComponentType<P>,
  prefix?: string
) {
  return function AutoIdComponent(props: P) {
    const ref = useRef<HTMLDivElement>(null);
    useAutoId(ref, prefix || Component.displayName || Component.name || 'component');

    return (
      <div ref={ref} data-auto-id-wrapper>
        <Component {...props} />
      </div>
    );
  };
}
````

## File: src/lib/briizos.ts
````typescript
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import type { Task, TaskListItem } from './types';

// Opt-in flag: only read when explicitly enabled
export const READ_BRIIzOS = process.env.NEXT_PUBLIC_READ_BRIIzOS === 'true';

type BriizOSSnapshot = {
  panels?: Record<string, unknown>;
  organizer?: Record<string, any>;
  thoughtstream?: unknown[];
  calendar?: Record<string, unknown>;
  chatThreads?: Record<string, { lastTs?: number; count?: number }>;
  stats?: Record<string, unknown>;
  clientTs?: number;
};

export async function fetchBriizOSSnapshot(): Promise<BriizOSSnapshot | null> {
  if (!READ_BRIIzOS) return null;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) {
    console.log('[briizOS] No currentUser; skip fetch');
    return null;
  }
  const db = getFirestore(app);
  const ref = doc(db, `users/${uid}/snapshots/app`);
  console.log('[briizOS] Fetching snapshots/app for uid:', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    console.log('[briizOS] snapshots/app does not exist for uid:', uid);
    return null;
  }
  const data = snap.data() as BriizOSSnapshot;
  const orgLen = Array.isArray((data as any).organizer) ? (data as any).organizer.length : 0;
  console.log('[briizOS] Fetched snapshots/app organizer length:', orgLen);
  return data;
}

export function mapBriizOSToTasks(snapshot: BriizOSSnapshot): Task[] {
  const out: Task[] = [];
  const items = snapshot.organizer || {};
  for (const [, item] of Object.entries(items)) {
    const id: string = item.id || `org-${Math.random().toString(36).slice(2)}`;
    const name: string = item.name || item.title || '';
    if (!name) continue;
    // Completed inference: if present, use; otherwise default false
    const completed: boolean = Boolean(item.completed);
    out.push({ id, title: name, completed });
  }
  return out;
}
````

## File: src/lib/data.ts
````typescript
import type { Project, Task, TaskListItem } from './types';

export const initialProjects: Project[] = [];


export const initialCasualTasks: TaskListItem[] = [
    { id: 'ctask-1', title: 'Buy groceries', completed: false },
    { id: 'ctask-2', title: 'Call mom', completed: true },
    { id: 'ctask-3', title: 'Schedule dentist appointment', completed: false },
];
````

## File: src/lib/domains.ts
````typescript
import {
  Music,
  Feather,
  Drama,
  BookOpen,
  Code2,
  Palette,
  Heart,
  Home,
  type LucideIcon,
} from 'lucide-react';
import type { Domain } from './types';

export type DomainConfig = {
  label: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
  bgGradient: string;
};

export const DOMAINS: Record<Domain, DomainConfig> = {
  music: {
    label: 'Music',
    icon: Music,
    gradient: 'from-purple-500 to-pink-500',
    color: 'hsl(280, 70%, 50%)',
    bgGradient: 'linear-gradient(135deg, hsl(280, 70%, 50%), hsl(330, 80%, 55%))',
  },
  poetry: {
    label: 'Poetry',
    icon: Feather,
    gradient: 'from-amber-400 to-orange-500',
    color: 'hsl(35, 90%, 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(45, 90%, 55%), hsl(25, 90%, 55%))',
  },
  theatre: {
    label: 'Theatre',
    icon: Drama,
    gradient: 'from-red-500 to-rose-500',
    color: 'hsl(350, 70%, 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(0, 70%, 55%), hsl(340, 80%, 55%))',
  },
  theory: {
    label: 'Theory',
    icon: BookOpen,
    gradient: 'from-blue-400 to-indigo-500',
    color: 'hsl(220, 70%, 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(210, 80%, 55%), hsl(240, 70%, 55%))',
  },
  coding: {
    label: 'Coding',
    icon: Code2,
    gradient: 'from-green-400 to-emerald-500',
    color: 'hsl(150, 70%, 45%)',
    bgGradient: 'linear-gradient(135deg, hsl(140, 70%, 45%), hsl(160, 70%, 40%))',
  },
  'visual-art': {
    label: 'Visual Art',
    icon: Palette,
    gradient: 'from-pink-400 to-violet-500',
    color: 'hsl(300, 70%, 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(330, 70%, 60%), hsl(270, 70%, 55%))',
  },
  health: {
    label: 'Health',
    icon: Heart,
    gradient: 'from-teal-400 to-cyan-500',
    color: 'hsl(180, 70%, 45%)',
    bgGradient: 'linear-gradient(135deg, hsl(170, 70%, 45%), hsl(190, 70%, 50%))',
  },
  home: {
    label: 'Home',
    icon: Home,
    gradient: 'from-slate-400 to-gray-500',
    color: 'hsl(210, 20%, 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(210, 15%, 50%), hsl(200, 10%, 45%))',
  },
};

export const DOMAIN_LIST = Object.entries(DOMAINS).map(([key, config]) => ({
  value: key as Domain,
  ...config,
}));

// Status configurations
export const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  active: {
    label: 'Active',
    color: 'hsl(165, 100%, 45%)',
    bgColor: 'hsla(165, 100%, 45%, 0.15)',
  },
  paused: {
    label: 'Paused',
    color: 'hsl(45, 90%, 55%)',
    bgColor: 'hsla(45, 90%, 55%, 0.15)',
  },
  done: {
    label: 'Done',
    color: 'hsl(210, 70%, 55%)',
    bgColor: 'hsla(210, 70%, 55%, 0.15)',
  },
  archived: {
    label: 'Archived',
    color: 'hsl(210, 10%, 50%)',
    bgColor: 'hsla(210, 10%, 50%, 0.15)',
  },
};
````

## File: src/lib/firebase.ts
````typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// This will work on both client and server, but should only be used in client components
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
````

## File: src/lib/inbox-parser.ts
````typescript
import type { Domain, Task, RawInboxEmail, InboxTask, ParsedDailyInbox } from '@/lib/types';

export type ParsedInboxItem = {
  title: string;
  domain?: Domain;
  tags: string[];
  isTask: boolean; // true if it's a simple task, false if it should be a project
};

const DOMAIN_MAP: Record<string, Domain> = {
  music: 'music',
  poetry: 'poetry',
  theatre: 'theatre',
  theater: 'theatre',
  theory: 'theory',
  coding: 'coding',
  code: 'coding',
  dev: 'coding',
  'visual-art': 'visual-art',
  art: 'visual-art',
  design: 'visual-art',
  health: 'health',
  fitness: 'health',
  home: 'home',
  house: 'home',
};

/**
 * Parse inbox-style text into structured items.
 *
 * Format:
 * - [ ] Task with checkbox @domain #tag1 #tag2
 * - Task without checkbox @music
 * Simple line without prefix becomes a project idea
 *
 * @domain - Assigns a domain (music, coding, etc.)
 * @#tag - Adds a tag
 * Lines starting with # are treated as section headers and ignored
 */
export function parseInboxText(text: string): ParsedInboxItem[] {
  const lines = text.split('\n');
  const items: ParsedInboxItem[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip empty lines and headers
    if (!line || line.startsWith('# ') || line.startsWith('## ')) {
      continue;
    }

    // Extract the core text, removing list prefixes
    let content = line;
    let isTask = false;

    // Check for checkbox format: - [ ] or - [x]
    const checkboxMatch = content.match(/^-\s*\[[ x]?\]\s*/i);
    if (checkboxMatch) {
      content = content.slice(checkboxMatch[0].length);
      isTask = true;
    } else if (content.startsWith('- ')) {
      // Simple list item
      content = content.slice(2);
      isTask = true;
    } else if (content.startsWith('* ')) {
      content = content.slice(2);
      isTask = true;
    }

    // Extract @domain
    let domain: Domain | undefined;
    const domainMatch = content.match(/@(\S+)/);
    if (domainMatch) {
      const domainKey = domainMatch[1].toLowerCase();
      domain = DOMAIN_MAP[domainKey];
      content = content.replace(domainMatch[0], '').trim();
    }

    // Extract #tags
    const tags: string[] = [];
    const tagMatches = content.matchAll(/#(\S+)/g);
    for (const match of tagMatches) {
      tags.push(match[1]);
    }
    content = content.replace(/#\S+/g, '').trim();

    // Clean up multiple spaces
    content = content.replace(/\s+/g, ' ').trim();

    if (content) {
      items.push({
        title: content,
        domain,
        tags,
        isTask,
      });
    }
  }

  return items;
}

/**
 * Convert parsed inbox items to projects.
 * Simple tasks are grouped, while longer items become individual projects.
 */
export function inboxItemsToProjects(items: ParsedInboxItem[]): {
  projects: Array<{
    name: string;
    description: string;
    domain?: Domain;
    tags: string[];
    tasks: Task[];
  }>;
} {
  // Group tasks by domain
  const tasksByDomain = new Map<Domain | 'none', ParsedInboxItem[]>();

  const projects: Array<{
    name: string;
    description: string;
    domain?: Domain;
    tags: string[];
    tasks: Task[];
  }> = [];

  for (const item of items) {
    if (item.isTask && item.title.length < 100) {
      // Short tasks get grouped
      const key = item.domain || 'none';
      if (!tasksByDomain.has(key)) {
        tasksByDomain.set(key, []);
      }
      tasksByDomain.get(key)!.push(item);
    } else {
      // Longer items or non-tasks become individual projects
      projects.push({
        name: item.title.slice(0, 50) + (item.title.length > 50 ? '...' : ''),
        description: item.title,
        domain: item.domain,
        tags: item.tags,
        tasks: [],
      });
    }
  }

  // Create grouped projects from tasks
  for (const [domainKey, tasks] of tasksByDomain) {
    const domain = domainKey === 'none' ? undefined : domainKey;
    const allTags = [...new Set(tasks.flatMap((t) => t.tags))];

    projects.push({
      name: domain ? `${domain.charAt(0).toUpperCase() + domain.slice(1)} Tasks` : 'Inbox Tasks',
      description: `Quick tasks imported from inbox (${tasks.length} items)`,
      domain,
      tags: allTags,
      tasks: tasks.map((t, i) => ({
        id: `task-${Date.now()}-${i}`,
        title: t.title,
        completed: false,
      })),
    });
  }

  return { projects };
}

// ============================================
// CC Daily Email Parsing
// ============================================

// Convert MM/DD/YYYY to YYYY-MM-DD
function toISODate(mmddyyyy: string): string {
  const [mm, dd, yyyy] = mmddyyyy.split('/');
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

// Get timestamp in milliseconds from Firestore receivedAt
function getTimestamp(receivedAt: { _seconds: number } | number): number {
  if (typeof receivedAt === 'number') return receivedAt;
  return receivedAt._seconds * 1000;
}

// Parse due date from task block
function parseDueDate(block: string): string | null {
  const patterns = [
    /[Dd]ue\s+([A-Za-z]+,?\s+[A-Za-z]+\s+\d+(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/,
    /[Bb]y\s+([A-Za-z]+,?\s+[A-Za-z]+\s+\d+(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/,
    /[Bb]y\s+([A-Za-z]+\s+\d+(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/,
    /[Bb]efore\s+([A-Za-z]+,?\s+[A-Za-z]+\s+\d+(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/,
    /[Bb]efore\s+([A-Za-z]+\s+\d+(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/,
    /[Dd]eadline[:\s]+([A-Za-z]+,?\s*[A-Za-z]*\s*\d+(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/,
    /(\d{1,2}\/\d{1,2}\/\d{4})/,
  ];

  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match) {
      return match[1].trim().replace(/\s+/g, ' ');
    }
  }
  return null;
}

// Parse a single CC email into tasks
function parseCCEmail(email: RawInboxEmail): ParsedDailyInbox | null {
  const { subject, body, messageId, receivedAt } = email;

  // Must be a Day Ahead email with actual content
  if (!subject.includes('Your Day Ahead') || !body.includes('🧠')) {
    return null;
  }

  // Extract date from subject (MM/DD/YYYY)
  const dateMatch = subject.match(/(\d{2}\/\d{2}\/\d{4})/);
  if (!dateMatch) return null;

  const dateKey = dateMatch[1];

  // Find Top of Mind section
  const topMatch = body.match(/🧠 Top of mind([\s\S]*?)(?=🔔 FYI|$)/i);
  if (!topMatch) return null;

  const taskSection = topMatch[1];
  const tasks: InboxTask[] = [];

  // Split by task marker
  const taskBlocks = taskSection.split(/(?=⏱️)/);

  taskBlocks.forEach((block, index) => {
    if (!block.includes('⏱️')) return;

    // Get task description ([\s\S] used instead of /s flag for ES5 compat)
    const descMatch = block.match(
      /⏱️\s*\d+m?\s*[•·]?\s*([\s\S]+?)(?=\s*🔗|\s*✉️|\s*📅|\n\s*-|\n\s*⏱️|$)/
    );
    if (!descMatch) return;

    // Clean up the item text
    let item = descMatch[1].trim();
    item = item.replace(/\s+/g, ' '); // normalize whitespace
    item = item.replace(/\s*>\s*/g, ' '); // remove email quote markers

    // Look for due date
    const dueDate = parseDueDate(block);

    tasks.push({
      id: `inbox-${dateKey.replace(/\//g, '-')}-${index}`,
      item: item.trim(),
      hasDueDate: dueDate !== null,
      dueDate,
    });
  });

  return {
    date: dateKey,
    dateISO: toISODate(dateKey),
    tasks,
    rawEmailId: messageId,
    receivedAt: getTimestamp(receivedAt),
  };
}

// Parse all CC emails and deduplicate by date (keep earliest received)
export function parseCCInboxEmails(emails: RawInboxEmail[]): Map<string, ParsedDailyInbox> {
  const result = new Map<string, ParsedDailyInbox>();
  const seenDates = new Map<string, number>();

  for (const email of emails) {
    const parsed = parseCCEmail(email);
    if (!parsed) continue;

    const existing = seenDates.get(parsed.date);
    // Keep earliest received email for each date
    if (!existing || parsed.receivedAt < existing) {
      seenDates.set(parsed.date, parsed.receivedAt);
      result.set(parsed.date, parsed);
    }
  }

  return result;
}

// Get today's date in MM/DD/YYYY format
export function getTodayMMDDYYYY(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// Convert YYYY-MM-DD to MM/DD/YYYY
export function isoToMMDDYYYY(isoDate: string): string {
  const [yyyy, mm, dd] = isoDate.split('-');
  return `${mm}/${dd}/${yyyy}`;
}
````

## File: src/lib/persistence.ts
````typescript
import { db } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit as firestoreLimit,
  getDoc,
} from 'firebase/firestore';
import type { Project, TaskListItem, DailySchedule, RawInboxEmail } from './types';

// Opt-in guard via env to avoid interfering with briizOS
export const FIRESTORE_SYNC_ENABLED = process.env.NEXT_PUBLIC_ENABLE_FIRESTORE_SYNC === 'true';

// Remove undefined values from objects before persisting to Firestore
// Firestore doesn't accept undefined - fields must be omitted or set to null
function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

function userPath(uid: string) {
  // Namespaced under users/{uid}/apps/actionDeck/* to avoid collisions
  return {
    projectsCol: collection(db, 'users', uid, 'apps', 'actionDeck', 'projects'),
    casualCol: collection(db, 'users', uid, 'apps', 'actionDeck', 'casualTasks'),
    schedulesCol: collection(db, 'users', uid, 'apps', 'actionDeck', 'dailySchedules'),
    inboxDailyCol: collection(db, 'users', uid, 'apps', 'actionDeck', 'inboxDaily'),
  } as const;
}

export function subscribeProjects(cb: (projects: Project[]) => void) {
  if (!FIRESTORE_SYNC_ENABLED) return () => {};
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) { console.log('[persist] subscribeProjects: no uid'); return () => {} }

  const { projectsCol } = userPath(uid);
  console.log('[persist] subscribeProjects path:', projectsCol.path);
  return onSnapshot(projectsCol, (snap) => {
    const list: Project[] = [];
    snap.forEach((doc) => list.push(doc.data() as Project));
    console.log('[persist] subscribeProjects snapshot size:', snap.size);
    cb(list);
  });
}

export async function upsertProject(project: Project) {
  if (!FIRESTORE_SYNC_ENABLED) return;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const { projectsCol } = userPath(uid);
  console.log('[persist] upsertProject path:', projectsCol.path, 'id:', project.id);
  const cleanedProject = removeUndefined({ ...project, updatedAt: serverTimestamp() });
  await setDoc(doc(projectsCol, project.id), cleanedProject, { merge: true });
}

export async function removeProject(projectId: string) {
  if (!FIRESTORE_SYNC_ENABLED) return;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const { projectsCol } = userPath(uid);
  console.log('[persist] removeProject path:', projectsCol.path, 'id:', projectId);
  await deleteDoc(doc(projectsCol, projectId));
}

export function subscribeCasualTasks(cb: (items: TaskListItem[]) => void) {
  if (!FIRESTORE_SYNC_ENABLED) return () => {};
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) { console.log('[persist] subscribeCasualTasks: no uid'); return () => {} }
  const { casualCol } = userPath(uid);
  console.log('[persist] subscribeCasualTasks path:', casualCol.path);
  return onSnapshot(casualCol, (snap) => {
    const list: TaskListItem[] = [];
    snap.forEach((doc) => list.push(doc.data() as TaskListItem));
    console.log('[persist] subscribeCasualTasks snapshot size:', snap.size);
    cb(list);
  });
}

export async function upsertCasualItem(item: TaskListItem) {
  if (!FIRESTORE_SYNC_ENABLED) return;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const { casualCol } = userPath(uid);
  console.log('[persist] upsertCasualItem path:', casualCol.path, 'id:', item.id);
  const cleanedItem = removeUndefined({ ...item, updatedAt: serverTimestamp() });
  await setDoc(doc(casualCol, item.id), cleanedItem, { merge: true });
}

export async function removeCasualItem(id: string) {
  if (!FIRESTORE_SYNC_ENABLED) return;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const { casualCol } = userPath(uid);
  console.log('[persist] removeCasualItem path:', casualCol.path, 'id:', id);
  await deleteDoc(doc(casualCol, id));
}

// ============================================
// Daily Schedule Persistence
// ============================================

export function subscribeDailySchedule(date: string, cb: (schedule: DailySchedule | null) => void) {
  if (!FIRESTORE_SYNC_ENABLED) return () => {};
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) { console.log('[persist] subscribeDailySchedule: no uid'); return () => {}; }

  const { schedulesCol } = userPath(uid);
  const scheduleRef = doc(schedulesCol, date);
  console.log('[persist] subscribeDailySchedule path:', scheduleRef.path);

  return onSnapshot(scheduleRef, (snap) => {
    if (snap.exists()) {
      cb(snap.data() as DailySchedule);
    } else {
      cb(null);
    }
  });
}

export async function getDailySchedule(date: string): Promise<DailySchedule | null> {
  if (!FIRESTORE_SYNC_ENABLED) return null;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const { schedulesCol } = userPath(uid);
  const scheduleRef = doc(schedulesCol, date);
  const snap = await getDoc(scheduleRef);

  if (snap.exists()) {
    return snap.data() as DailySchedule;
  }
  return null;
}

export async function upsertDailySchedule(schedule: DailySchedule) {
  if (!FIRESTORE_SYNC_ENABLED) return;
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const { schedulesCol } = userPath(uid);
  console.log('[persist] upsertDailySchedule path:', schedulesCol.path, 'id:', schedule.id);
  const cleanedSchedule = removeUndefined({ ...schedule, updatedAt: serverTimestamp() });
  await setDoc(doc(schedulesCol, schedule.id), cleanedSchedule, { merge: true });
}

export function subscribeScheduleHistory(historyLimit: number, cb: (schedules: DailySchedule[]) => void) {
  if (!FIRESTORE_SYNC_ENABLED) return () => {};
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) { console.log('[persist] subscribeScheduleHistory: no uid'); return () => {}; }

  const { schedulesCol } = userPath(uid);
  const historyQuery = query(
    schedulesCol,
    orderBy('date', 'desc'),
    firestoreLimit(historyLimit)
  );

  console.log('[persist] subscribeScheduleHistory path:', schedulesCol.path);
  return onSnapshot(historyQuery, (snap) => {
    const list: DailySchedule[] = [];
    snap.forEach((doc) => list.push(doc.data() as DailySchedule));
    console.log('[persist] subscribeScheduleHistory snapshot size:', snap.size);
    cb(list);
  });
}

// ============================================
// CC Daily Inbox Persistence
// ============================================

export function subscribeInboxDaily(cb: (emails: RawInboxEmail[]) => void) {
  if (!FIRESTORE_SYNC_ENABLED) return () => {};
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) {
    console.log('[persist] subscribeInboxDaily: no uid');
    return () => {};
  }

  const { inboxDailyCol } = userPath(uid);
  console.log('[persist] subscribeInboxDaily path:', inboxDailyCol.path);

  // Order by receivedAt descending to get most recent first
  const q = query(inboxDailyCol, orderBy('receivedAt', 'desc'));

  return onSnapshot(q, (snap) => {
    const list: RawInboxEmail[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        messageId: d.id,
        subject: data.subject || '',
        body: data.body || '',
        receivedAt: data.receivedAt,
      });
    });
    console.log('[persist] subscribeInboxDaily snapshot size:', snap.size);
    cb(list);
  });
}
````

## File: src/lib/placeholder-images.json
````json
{
  "placeholderImages": []
}
````

## File: src/lib/placeholder-images.ts
````typescript
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
````

## File: src/lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## File: .firebaserc
````
{
  "projects": {
    "default": "briizos"
  }
}
````

## File: .gitignore
````
# Dependencies
node_modules/

# IDE/Editor history
.history/

# Genkit runtime files
.genkit/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
.vercel
.firebase/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Service account keys (sensitive)
serviceAccountKey.json
*-serviceAccountKey.json

# Typescript
*.tsbuildinfo
next-env.d.ts

# Keep the ID mappings file for consistent IDs across deploys
!id-mappings.json
````

## File: COMPONENT-IDS.md
````markdown
# ActionDeck Component ID Mapping

This document defines the semantic ID naming convention for all UI components in ActionDeck, enabling global CSS customization via `globals.css`.

## ID Naming Convention

**Format:** `{section}-{component}-{element}`

- **section:** Layout area (layout, dashboard, tasks, prioritize)
- **component:** Component name (kebab-case)
- **element:** Specific sub-element (optional)

## Component ID Registry

### Layout Components

#### App Sidebar (`src/components/layout/app-sidebar.tsx`)
- `#layout-sidebar` - Main sidebar container
- `#layout-sidebar-nav` - Navigation container
- `#layout-sidebar-logo` - Logo/home link
- `#layout-sidebar-nav-dashboard` - Dashboard nav link
- `#layout-sidebar-nav-tasks` - Tasks nav link
- `#layout-sidebar-nav-prioritize` - Prioritize nav link
- `#layout-sidebar-nav-import` - Import nav link
- `#layout-sidebar-domains` - Domain collapsible section
- `#layout-sidebar-domains-trigger` - Domain expand/collapse button
- `#layout-sidebar-settings` - Settings button

#### Header (`src/components/layout/header.tsx`)
- `#layout-header` - Main header container
- `#layout-header-mobile-trigger` - Mobile menu button
- `#layout-header-breadcrumb` - Breadcrumb navigation
- `#layout-header-theme-toggle` - Dark/light mode toggle
- `#layout-header-settings-trigger` - Settings button

#### Settings Modal (`src/components/layout/settings-modal.tsx`)
- `#layout-settings-modal` - Settings modal container
- `#layout-settings-sync-toggle` - Cloud sync toggle
- `#layout-settings-briizos-toggle` - BriizOS import toggle
- `#layout-settings-export-btn` - Export data button
- `#layout-settings-import-btn` - Import data button

---

### Dashboard Components

#### Project List (`src/components/dashboard/project-list.tsx`)
- `#dashboard-project-list` - Main project list container
- `#dashboard-toolbar` - Top toolbar
- `#dashboard-search` - Search bar
- `#dashboard-export-btn` - Export button
- `#dashboard-new-project-btn` - New project button
- `#dashboard-status-tabs` - Status filter tabs
- `#dashboard-project-grid` - Project card grid

#### Project Card (`src/components/dashboard/project-card.tsx`)
- `.dashboard-project-card` - Individual project card (class, multiple instances)
- `.dashboard-project-card-header` - Card header
- `.dashboard-project-card-title` - Project title
- `.dashboard-project-card-description` - Project description
- `.dashboard-project-card-content` - Card content area
- `.dashboard-project-card-footer` - Card footer with actions
- `.dashboard-project-card-domain-badge` - Domain badge
- `.dashboard-project-card-status-badge` - Status badge
- `.dashboard-project-card-progress-ring` - Progress indicator
- `.dashboard-project-card-view-btn` - View details button

#### Project Modal (`src/components/dashboard/project-modal.tsx`)
- `#dashboard-project-modal` - Project detail modal
- `#dashboard-project-modal-header` - Modal header
- `#dashboard-project-modal-content` - Modal content
- `#dashboard-project-modal-tasks` - Task list section
- `#dashboard-project-modal-milestones` - Milestones section
- `#dashboard-project-modal-edit-btn` - Edit button
- `#dashboard-project-modal-delete-btn` - Delete button

#### Project Form (`src/components/dashboard/project-form.tsx`)
- `#dashboard-project-form` - Project create/edit form
- `#dashboard-project-form-name` - Name input
- `#dashboard-project-form-description` - Description textarea
- `#dashboard-project-form-domain` - Domain select
- `#dashboard-project-form-status` - Status select
- `#dashboard-project-form-deadline` - Deadline picker
- `#dashboard-project-form-importance` - Importance slider
- `#dashboard-project-form-size` - Size input
- `#dashboard-project-form-tags` - Tags input
- `#dashboard-project-form-submit` - Submit button

#### Search Bar (`src/components/dashboard/search-bar.tsx`)
- `.dashboard-search-bar` - Search input component

#### Domain Filter Bar (`src/components/dashboard/domain-filter-bar.tsx`)
- `#dashboard-domain-filter` - Domain filter bar
- `.dashboard-domain-badge` - Individual domain badge (class)

#### Progress Chart (`src/components/dashboard/progress-chart.tsx`)
- `#dashboard-progress-chart` - Progress visualization chart

---

### Task Components

#### Task List (`src/components/tasks/task-list.tsx`)
- `#tasks-list` - Main task list container
- `#tasks-card` - Task list card
- `#tasks-input-form` - Add task form
- `#tasks-input-field` - Task input field
- `#tasks-add-btn` - Add task button
- `#tasks-ai-breakdown-btn` - AI breakdown button
- `#tasks-clarification-alert` - AI clarification alert
- `#tasks-pending-section` - Pending tasks section
- `#tasks-completed-section` - Completed tasks section

#### Task Item (`src/components/tasks/task-item.tsx`)
- `.tasks-item` - Individual task item (class)
- `.tasks-item-checkbox` - Task checkbox
- `.tasks-item-label` - Task label

#### Task Deck (`src/components/tasks/task-deck.tsx`)
- `.tasks-deck` - Task deck container (class)
- `.tasks-deck-header` - Deck header
- `.tasks-deck-title` - Deck title
- `.tasks-deck-progress` - Deck progress indicator
- `.tasks-deck-content` - Collapsible task list

---

### Prioritize Components

#### Prioritization Form (`src/components/prioritize/prioritization-form.tsx`)
- `#prioritize-form` - Main prioritization form
- `#prioritize-form-card` - Form card container
- `#prioritize-project-checkboxes` - Project selection area
- `#prioritize-goals-input` - User goals textarea
- `#prioritize-timing-input` - Timing/context textarea
- `#prioritize-submit-btn` - Submit button

#### Prioritization Result (`src/components/prioritize/prioritization-result.tsx`)
- `#prioritize-result` - Result display container
- `#prioritize-result-card` - Result card
- `#prioritize-result-content` - Result markdown content

---

### Common UI Components (shadcn/ui)

These components use **data attributes** for styling since they appear in multiple contexts:

- `[data-ui="button"]` - Button component
- `[data-ui="card"]` - Card component
- `[data-ui="input"]` - Input component
- `[data-ui="modal"]` - Dialog/Modal component
- `[data-ui="tooltip"]` - Tooltip component

---

## Usage in globals.css

Add custom styles using the IDs defined above:

```css
/* Example: Customize project cards */
.dashboard-project-card {
  border: 2px solid var(--primary);
  transition: transform 0.2s;
}

.dashboard-project-card:hover {
  transform: scale(1.02);
}

/* Example: Customize sidebar */
#layout-sidebar {
  background: linear-gradient(to bottom, var(--card), var(--background));
}

/* Example: Customize header */
#layout-header {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
```

---

## Implementation Status

- [x] Layout components (sidebar, header, settings)
- [x] Dashboard components (project list, cards, modals)
- [x] Task components (task list, items, decks)
- [x] Prioritize components (form, results)
- [x] CSS section added to globals.css

All semantic IDs have been implemented and documented!
````

## File: components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
````

## File: firebase.json
````json
{
  "hosting": {
    "site": "briizos-dash",
    "public": "public"
  },
  "apphosting": [
    {
      "backendId": "dex",
      "rootDir": ".",
      "ignore": [
        "node_modules",
        ".git",
        ".history",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "functions"
      ],
      "alwaysDeployFromSource": true
    }
  ]
}
````

## File: next.config.ts
````typescript
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
````

## File: package.json
````json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "inject-ids": "node scripts/inject-ids.js"
  },
  "dependencies": {
    "@genkit-ai/googleai": "1.14.1",
    "@genkit-ai/next": "1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^12.4.0",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "next": "15.5.9",
    "next-themes": "^0.3.0",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@babel/generator": "^7.28.5",
    "@babel/parser": "^7.28.5",
    "@babel/traverse": "^7.28.5",
    "@babel/types": "^7.28.5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "firebase-admin": "^13.6.0",
    "genkit-cli": "1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
````

## File: postcss.config.mjs
````javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
````

## File: project-import-prompt.txt
````
You are helping generate project data for import into ActionDeck, a task management application.

Generate valid JSON that conforms to the following schema:

---

PROJECT SCHEMA:
{
  "id": string,          // Unique identifier (use UUID v4 or kebab-case-slug)
  "name": string,        // Project name
  "description": string, // Brief project description
  "deadline": string,    // Date in YYYY-MM-DD format
  "importance": number,  // Priority level from 1 (low) to 10 (critical)
  "size": number,        // Estimated hours to complete
  "relevance": string,   // Why this project matters / context
  "coverImage": string,  // (Optional) URL to cover image
  "tasks": Task[]        // Array of tasks (see below)
}

TASK SCHEMA:
{
  "id": string,          // Unique identifier (use UUID v4 or task-slug)
  "title": string,       // Task description
  "completed": boolean   // Whether task is done (true/false)
}

---

RULES:
1. All dates must be valid YYYY-MM-DD format
2. Importance must be an integer between 1-10
3. Size must be a positive number representing estimated hours
4. Each project must have a unique id
5. Each task must have a unique id within its project
6. Tasks array can be empty [] for new projects

---

EXAMPLE OUTPUT (single project):
{
  "id": "website-redesign",
  "name": "Website Redesign",
  "description": "Complete overhaul of company website with new branding",
  "deadline": "2025-03-15",
  "importance": 8,
  "size": 40,
  "relevance": "Critical for Q1 marketing launch",
  "coverImage": "https://picsum.photos/seed/website/400/300",
  "tasks": [
    { "id": "task-1", "title": "Create wireframes", "completed": true },
    { "id": "task-2", "title": "Design mockups in Figma", "completed": false },
    { "id": "task-3", "title": "Implement responsive layout", "completed": false },
    { "id": "task-4", "title": "Test across browsers", "completed": false }
  ]
}

EXAMPLE OUTPUT (multiple projects as array):
[
  {
    "id": "project-alpha",
    "name": "Project Alpha",
    "description": "First phase of platform development",
    "deadline": "2025-02-28",
    "importance": 9,
    "size": 80,
    "relevance": "Foundation for all future features",
    "tasks": []
  },
  {
    "id": "project-beta",
    "name": "Project Beta",
    "description": "User authentication system",
    "deadline": "2025-04-01",
    "importance": 7,
    "size": 24,
    "relevance": "Required for user accounts",
    "tasks": [
      { "id": "auth-1", "title": "Set up Firebase Auth", "completed": false },
      { "id": "auth-2", "title": "Create login page", "completed": false }
    ]
  }
]

---

When the user describes their projects, convert their description into valid JSON following this schema. Output ONLY the JSON, without explanations or comments.
````

## File: style-mappings.json
````json
{
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-card shadow-lg neon-glow:65:4": "stylo-0",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader::66:6": "stylo-1",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-between:67:8": "stylo-2",
  "src/components/dashboard/dashboard-summary.tsx:div:space-y-1 dashboard-header:68:10": "stylo-3",
  "src/components/dashboard/dashboard-summary.tsx:h1:text-2xl font-bold tracking-tight:69:12": "stylo-4",
  "src/components/dashboard/dashboard-summary.tsx:CardContent::73:6": "stylo-5",
  "src/components/dashboard/dashboard-summary.tsx:div:grid grid-cols-1 md:grid-cols-3 gap-4:74:6": "stylo-6",
  "src/components/dashboard/dashboard-summary.tsx:div:md:col-span-1 space-y-4:76:8": "stylo-7",
  "src/components/dashboard/dashboard-summary.tsx:div:grid grid-cols-3 gap-4:77:10": "stylo-8",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-metrics-card:78:14": "stylo-9",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader:p-4 flex flex-col items-center justify-center space-y-2 text-teal-100:79:16": "stylo-10",
  "src/components/dashboard/dashboard-summary.tsx:CardTitle:text-3xl font-bold:80:19": "stylo-11",
  "src/components/dashboard/dashboard-summary.tsx:ListTodo:h-5 w-5 text-cyan-200/80:81:19": "stylo-12",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-metrics-card:84:14": "stylo-13",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader:p-4 flex flex-col items-center justify-center space-y-2 text-teal-100:85:16": "stylo-14",
  "src/components/dashboard/dashboard-summary.tsx:CardTitle:text-3xl font-bold:86:19": "stylo-15",
  "src/components/dashboard/dashboard-summary.tsx:CheckCircle2:h-5 w-5 text-cyan-200/80:87:19": "stylo-16",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-metrics-card:90:14": "stylo-17",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader:p-4 flex flex-col items-center justify-center space-y-2 text-teal-100:91:16": "stylo-18",
  "src/components/dashboard/dashboard-summary.tsx:CardTitle:text-3xl font-bold:92:19": "stylo-19",
  "src/components/dashboard/dashboard-summary.tsx:Circle:h-5 w-5 text-cyan-200/80:93:19": "stylo-20",
  "src/components/dashboard/dashboard-summary.tsx:Select::97:10": "stylo-21",
  "src/components/dashboard/dashboard-summary.tsx:SelectTrigger:dashboard-input dashboard-select:98:12": "stylo-22",
  "src/components/dashboard/dashboard-summary.tsx:SelectValue::99:14": "stylo-23",
  "src/components/dashboard/dashboard-summary.tsx:SelectContent::101:12": "stylo-24",
  "src/components/dashboard/dashboard-summary.tsx:SelectItem::102:14": "stylo-25",
  "src/components/dashboard/dashboard-summary.tsx:SelectItem::103:14": "stylo-26",
  "src/components/dashboard/dashboard-summary.tsx:SelectItem::104:14": "stylo-27",
  "src/components/dashboard/dashboard-summary.tsx:SelectItem::105:14": "stylo-28",
  "src/components/dashboard/dashboard-summary.tsx:div:md:col-span-2:111:8": "stylo-29",
  "src/components/dashboard/dashboard-summary.tsx:Card:h-full flex items-center justify-center p-4 dashboard-chart-card:112:12": "stylo-30",
  "src/components/dashboard/dashboard-summary.tsx:div:w-full h-full flex items-center justify-center:114:14": "stylo-31",
  "src/components/dashboard/dashboard-summary.tsx:ChartContainer:mx-auto aspect-square max-h-[160px]:115:24": "stylo-32",
  "src/components/dashboard/dashboard-summary.tsx:RadialBarChart::116:28": "stylo-33",
  "src/components/dashboard/dashboard-summary.tsx:PolarAngleAxis::123:32": "stylo-34",
  "src/components/dashboard/dashboard-summary.tsx:RadialBar::124:32": "stylo-35",
  "src/components/dashboard/dashboard-summary.tsx:text:fill-white text-2xl font-bold:125:33": "stylo-36",
  "src/components/dashboard/dashboard-summary.tsx:div:ml-8 space-y-2 text-sm text-teal-100:136:24": "stylo-37",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center gap-2:137:28": "stylo-38",
  "src/components/dashboard/dashboard-summary.tsx:div:h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]:138:32": "stylo-39",
  "src/components/dashboard/dashboard-summary.tsx:span::139:32": "stylo-40",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center gap-2:141:28": "stylo-41",
  "src/components/dashboard/dashboard-summary.tsx:div:h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]:142:32": "stylo-42",
  "src/components/dashboard/dashboard-summary.tsx:span::143:32": "stylo-43",
  "src/components/dashboard/dashboard-summary.tsx:div:h-[160px] w-full flex items-center justify-center:148:14": "stylo-44",
  "src/components/dashboard/dashboard-summary.tsx:p::149:24": "stylo-45",
  "src/components/dashboard/dashboard-summary.tsx:div:dashboard-quick-row:155:6": "stylo-46",
  "src/components/dashboard/dashboard-summary.tsx:Input:dashboard-input:156:8": "stylo-47",
  "src/components/dashboard/dashboard-summary.tsx:Select::162:8": "stylo-48",
  "src/components/dashboard/dashboard-summary.tsx:SelectTrigger:dashboard-input dashboard-select:163:10": "stylo-49",
  "src/components/dashboard/dashboard-summary.tsx:SelectValue::164:12": "stylo-50",
  "src/components/dashboard/dashboard-summary.tsx:SelectContent::166:10": "stylo-51",
  "src/components/dashboard/dashboard-summary.tsx:SelectItem::167:12": "stylo-52",
  "src/components/dashboard/dashboard-summary.tsx:SelectItem::169:14": "stylo-53",
  "src/components/dashboard/dashboard-summary.tsx:Button:dashboard-button-primary:173:8": "stylo-54",
  "src/components/dashboard/domain-filter-bar.tsx:div:dynamic:22:4": "stylo-55",
  "src/components/dashboard/domain-filter-bar.tsx:ScrollArea:w-full whitespace-nowrap:23:6": "stylo-56",
  "src/components/dashboard/domain-filter-bar.tsx:div:flex gap-2 pb-3 px-1:24:8": "stylo-57",
  "src/components/dashboard/domain-filter-bar.tsx:button:dynamic:26:10": "stylo-58",
  "src/components/dashboard/domain-filter-bar.tsx:LayoutGrid:h-4 w-4:36:12": "stylo-59",
  "src/components/dashboard/domain-filter-bar.tsx:button:dynamic:46:14": "stylo-60",
  "src/components/dashboard/domain-filter-bar.tsx:Icon:h-4 w-4:65:16": "stylo-61",
  "src/components/dashboard/domain-filter-bar.tsx:ScrollBar:h-2:71:8": "stylo-62",
  "src/components/dashboard/domain-filter-bar.tsx:div:dynamic:84:4": "stylo-63",
  "src/components/dashboard/domain-filter-bar.tsx:button:dynamic:90:10": "stylo-64",
  "src/components/dashboard/domain-filter-bar.tsx:Icon:h-4 w-4:109:12": "stylo-65",
  "src/components/dashboard/domain-filter-bar.tsx:div:dynamic:133:4": "stylo-66",
  "src/components/dashboard/domain-filter-bar.tsx:Icon:dynamic:144:6": "stylo-67",
  "src/components/dashboard/milestone-list.tsx:div:space-y-4:83:4": "stylo-68",
  "src/components/dashboard/milestone-list.tsx:div:flex items-center justify-between:84:6": "stylo-69",
  "src/components/dashboard/milestone-list.tsx:div:flex items-center gap-2:85:8": "stylo-70",
  "src/components/dashboard/milestone-list.tsx:MilestoneIcon:h-5 w-5 text-primary:86:10": "stylo-71",
  "src/components/dashboard/milestone-list.tsx:h3:text-lg font-medium:87:10": "stylo-72",
  "src/components/dashboard/milestone-list.tsx:span:text-sm text-muted-foreground:89:8": "stylo-73",
  "src/components/dashboard/milestone-list.tsx:form:flex gap-2:95:6": "stylo-74",
  "src/components/dashboard/milestone-list.tsx:Input:flex-1:96:10": "stylo-75",
  "src/components/dashboard/milestone-list.tsx:Button::102:10": "stylo-76",
  "src/components/dashboard/milestone-list.tsx:Plus:h-4 w-4 mr-1:103:12": "stylo-77",
  "src/components/dashboard/milestone-list.tsx:div:space-y-2:109:6": "stylo-78",
  "src/components/dashboard/milestone-list.tsx:p:text-sm text-muted-foreground text-center py-4:111:8": "stylo-79",
  "src/components/dashboard/milestone-list.tsx:div:dynamic:116:8": "stylo-80",
  "src/components/dashboard/milestone-list.tsx:Checkbox::125:14": "stylo-81",
  "src/components/dashboard/milestone-list.tsx:Label:dynamic:131:14": "stylo-82",
  "src/components/dashboard/milestone-list.tsx:span:text-xs text-muted-foreground mr-2:138:16": "stylo-83",
  "src/components/dashboard/milestone-list.tsx:div:flex items-center gap-1:145:10": "stylo-84",
  "src/components/dashboard/milestone-list.tsx:Button:h-7 w-7 p-0:146:18": "stylo-85",
  "src/components/dashboard/milestone-list.tsx:ChevronUp:h-4 w-4:154:20": "stylo-86",
  "src/components/dashboard/milestone-list.tsx:Button:h-7 w-7 p-0:156:18": "stylo-87",
  "src/components/dashboard/milestone-list.tsx:ChevronDown:h-4 w-4:164:20": "stylo-88",
  "src/components/dashboard/milestone-list.tsx:Button:h-7 w-7 p-0 text-destructive hover:text-destructive:166:18": "stylo-89",
  "src/components/dashboard/milestone-list.tsx:Trash2:h-4 w-4:173:20": "stylo-90",
  "src/components/dashboard/progress-chart.tsx:div:h-[24px] w-full animate-pulse rounded-lg bg-muted:29:11": "stylo-91",
  "src/components/dashboard/progress-chart.tsx:div::33:4": "stylo-92",
  "src/components/dashboard/progress-chart.tsx:ResponsiveContainer::34:12": "stylo-93",
  "src/components/dashboard/progress-chart.tsx:BarChart::35:16": "stylo-94",
  "src/components/dashboard/progress-chart.tsx:XAxis::41:20": "stylo-95",
  "src/components/dashboard/progress-chart.tsx:YAxis::42:20": "stylo-96",
  "src/components/dashboard/progress-chart.tsx:Tooltip::43:20": "stylo-97",
  "src/components/dashboard/progress-chart.tsx:Bar::55:20": "stylo-98",
  "src/components/dashboard/progress-chart.tsx:Bar::56:20": "stylo-99",
  "src/components/dashboard/progress-ring.tsx:div:dynamic:26:4": "stylo-100",
  "src/components/dashboard/progress-ring.tsx:svg:transform -rotate-90:27:6": "stylo-101",
  "src/components/dashboard/progress-ring.tsx:circle::33:8": "stylo-102",
  "src/components/dashboard/progress-ring.tsx:circle:transition-all duration-500 ease-out:42:8": "stylo-103",
  "src/components/dashboard/progress-ring.tsx:span:absolute text-xs font-medium:59:6": "stylo-104",
  "src/components/dashboard/progress-ring.tsx:div:dynamic:89:4": "stylo-105",
  "src/components/dashboard/progress-ring.tsx:svg:transform -rotate-90:90:6": "stylo-106",
  "src/components/dashboard/progress-ring.tsx:circle::96:8": "stylo-107",
  "src/components/dashboard/progress-ring.tsx:circle:transition-all duration-500 ease-out:105:8": "stylo-108",
  "src/components/dashboard/progress-ring.tsx:span:absolute text-xs font-bold:122:6": "stylo-109",
  "src/components/dashboard/project-card.tsx:Card:dashboard-project-card project-card group relative flex flex-col h-full hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300 overflow-hidden:41:6": "stylo-110",
  "src/components/dashboard/project-card.tsx:div:absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0:44:12": "stylo-111",
  "src/components/dashboard/project-card.tsx:div:absolute inset-0 bg-black/20 transition-opacity duration-300 opacity-100 group-hover:opacity-0:48:12": "stylo-112",
  "src/components/dashboard/project-card.tsx:div:dynamic:51:8": "stylo-113",
  "src/components/dashboard/project-card.tsx:CardHeader:dashboard-project-card-header pb-2:52:10": "stylo-114",
  "src/components/dashboard/project-card.tsx:div:flex items-center justify-between gap-2 mb-2:54:12": "stylo-115",
  "src/components/dashboard/project-card.tsx:DomainBadge::56:14": "stylo-116",
  "src/components/dashboard/project-card.tsx:StatusBadge::58:14": "stylo-117",
  "src/components/dashboard/project-card.tsx:CardTitle:dashboard-project-card-title text-lg font-semibold line-clamp-1:61:12": "stylo-118",
  "src/components/dashboard/project-card.tsx:CardDescription:dashboard-project-card-description h-10 line-clamp-2:62:12": "stylo-119",
  "src/components/dashboard/project-card.tsx:CardContent:dashboard-project-card-content flex-grow space-y-3 pt-0:65:10": "stylo-120",
  "src/components/dashboard/project-card.tsx:TagBadges::68:12": "stylo-121",
  "src/components/dashboard/project-card.tsx:div:flex items-center justify-between gap-4:72:12": "stylo-122",
  "src/components/dashboard/project-card.tsx:div:flex-1 space-y-1:73:14": "stylo-123",
  "src/components/dashboard/project-card.tsx:div:text-xs text-muted-foreground:74:16": "stylo-124",
  "src/components/dashboard/project-card.tsx:span:animate-pulse:75:41": "stylo-125",
  "src/components/dashboard/project-card.tsx:div:text-xs text-muted-foreground/70:78:16": "stylo-126",
  "src/components/dashboard/project-card.tsx:div:text-xs text-muted-foreground:82:16": "stylo-127",
  "src/components/dashboard/project-card.tsx:span::84:18": "stylo-128",
  "src/components/dashboard/project-card.tsx:span::86:18": "stylo-129",
  "src/components/dashboard/project-card.tsx:DomainProgressRing::92:14": "stylo-130",
  "src/components/dashboard/project-card.tsx:CardFooter:dashboard-project-card-footer pt-0:102:10": "stylo-131",
  "src/components/dashboard/project-card.tsx:Button:dashboard-project-card-view-btn w-full:103:12": "stylo-132",
  "src/components/dashboard/project-card.tsx:ProjectModal::109:6": "stylo-133",
  "src/components/dashboard/project-form.tsx:Dialog::142:4": "stylo-134",
  "src/components/dashboard/project-form.tsx:DialogContent:sm:max-w-[500px] max-h-[90vh] overflow-y-auto:143:12": "stylo-135",
  "src/components/dashboard/project-form.tsx:DialogHeader::144:16": "stylo-136",
  "src/components/dashboard/project-form.tsx:DialogTitle::145:20": "stylo-137",
  "src/components/dashboard/project-form.tsx:DialogDescription::146:20": "stylo-138",
  "src/components/dashboard/project-form.tsx:Form::150:16": "stylo-139",
  "src/components/dashboard/project-form.tsx:form:space-y-4 py-4:151:20": "stylo-140",
  "src/components/dashboard/project-form.tsx:FormField::152:24": "stylo-141",
  "src/components/dashboard/project-form.tsx:FormItem::156:14": "stylo-142",
  "src/components/dashboard/project-form.tsx:FormLabel::157:36": "stylo-143",
  "src/components/dashboard/project-form.tsx:FormControl::158:36": "stylo-144",
  "src/components/dashboard/project-form.tsx:Input::159:40": "stylo-145",
  "src/components/dashboard/project-form.tsx:FormMessage::161:36": "stylo-146",
  "src/components/dashboard/project-form.tsx:div:grid grid-cols-2 gap-4:166:24": "stylo-147",
  "src/components/dashboard/project-form.tsx:FormField::167:28": "stylo-148",
  "src/components/dashboard/project-form.tsx:FormItem::171:16": "stylo-149",
  "src/components/dashboard/project-form.tsx:FormLabel::172:40": "stylo-150",
  "src/components/dashboard/project-form.tsx:Select::173:40": "stylo-151",
  "src/components/dashboard/project-form.tsx:FormControl::174:44": "stylo-152",
  "src/components/dashboard/project-form.tsx:SelectTrigger::175:48": "stylo-153",
  "src/components/dashboard/project-form.tsx:SelectValue::176:52": "stylo-154",
  "src/components/dashboard/project-form.tsx:SelectContent::179:44": "stylo-155",
  "src/components/dashboard/project-form.tsx:SelectItem::183:26": "stylo-156",
  "src/components/dashboard/project-form.tsx:div:flex items-center gap-2:184:60": "stylo-157",
  "src/components/dashboard/project-form.tsx:Icon:h-4 w-4:185:64": "stylo-158",
  "src/components/dashboard/project-form.tsx:FormMessage::193:40": "stylo-159",
  "src/components/dashboard/project-form.tsx:FormField::198:28": "stylo-160",
  "src/components/dashboard/project-form.tsx:FormItem::202:16": "stylo-161",
  "src/components/dashboard/project-form.tsx:FormLabel::203:40": "stylo-162",
  "src/components/dashboard/project-form.tsx:Select::204:40": "stylo-163",
  "src/components/dashboard/project-form.tsx:FormControl::205:44": "stylo-164",
  "src/components/dashboard/project-form.tsx:SelectTrigger::206:48": "stylo-165",
  "src/components/dashboard/project-form.tsx:SelectValue::207:52": "stylo-166",
  "src/components/dashboard/project-form.tsx:SelectContent::210:44": "stylo-167",
  "src/components/dashboard/project-form.tsx:SelectItem::212:22": "stylo-168",
  "src/components/dashboard/project-form.tsx:div:flex items-center gap-2:213:56": "stylo-169",
  "src/components/dashboard/project-form.tsx:div:h-2 w-2 rounded-full:214:60": "stylo-170",
  "src/components/dashboard/project-form.tsx:FormMessage::224:40": "stylo-171",
  "src/components/dashboard/project-form.tsx:FormField::230:24": "stylo-172",
  "src/components/dashboard/project-form.tsx:FormItem::234:14": "stylo-173",
  "src/components/dashboard/project-form.tsx:FormLabel::235:36": "stylo-174",
  "src/components/dashboard/project-form.tsx:FormControl::236:36": "stylo-175",
  "src/components/dashboard/project-form.tsx:Input::237:40": "stylo-176",
  "src/components/dashboard/project-form.tsx:FormMessage::239:36": "stylo-177",
  "src/components/dashboard/project-form.tsx:FormField::244:24": "stylo-178",
  "src/components/dashboard/project-form.tsx:FormItem::248:14": "stylo-179",
  "src/components/dashboard/project-form.tsx:FormLabel::249:36": "stylo-180",
  "src/components/dashboard/project-form.tsx:FormControl::250:36": "stylo-181",
  "src/components/dashboard/project-form.tsx:Textarea::251:40": "stylo-182",
  "src/components/dashboard/project-form.tsx:FormMessage::253:36": "stylo-183",
  "src/components/dashboard/project-form.tsx:FormField::258:24": "stylo-184",
  "src/components/dashboard/project-form.tsx:FormItem::262:14": "stylo-185",
  "src/components/dashboard/project-form.tsx:FormLabel::263:36": "stylo-186",
  "src/components/dashboard/project-form.tsx:FormControl::264:36": "stylo-187",
  "src/components/dashboard/project-form.tsx:Input::265:40": "stylo-188",
  "src/components/dashboard/project-form.tsx:FormDescription::267:36": "stylo-189",
  "src/components/dashboard/project-form.tsx:FormMessage::268:36": "stylo-190",
  "src/components/dashboard/project-form.tsx:FormField::273:24": "stylo-191",
  "src/components/dashboard/project-form.tsx:FormItem:flex flex-col:277:14": "stylo-192",
  "src/components/dashboard/project-form.tsx:FormLabel::278:36": "stylo-193",
  "src/components/dashboard/project-form.tsx:Popover::279:36": "stylo-194",
  "src/components/dashboard/project-form.tsx:PopoverTrigger::280:40": "stylo-195",
  "src/components/dashboard/project-form.tsx:FormControl::281:44": "stylo-196",
  "src/components/dashboard/project-form.tsx:Button:dynamic:282:48": "stylo-197",
  "src/components/dashboard/project-form.tsx:span::292:24": "stylo-198",
  "src/components/dashboard/project-form.tsx:CalendarIcon:ml-auto h-4 w-4 opacity-50:294:52": "stylo-199",
  "src/components/dashboard/project-form.tsx:PopoverContent:w-auto p-0:298:40": "stylo-200",
  "src/components/dashboard/project-form.tsx:Calendar::299:44": "stylo-201",
  "src/components/dashboard/project-form.tsx:FormMessage::310:36": "stylo-202",
  "src/components/dashboard/project-form.tsx:div:grid grid-cols-2 gap-4:315:24": "stylo-203",
  "src/components/dashboard/project-form.tsx:FormField::316:28": "stylo-204",
  "src/components/dashboard/project-form.tsx:FormItem::320:16": "stylo-205",
  "src/components/dashboard/project-form.tsx:FormLabel::321:40": "stylo-206",
  "src/components/dashboard/project-form.tsx:FormControl::322:40": "stylo-207",
  "src/components/dashboard/project-form.tsx:Input::323:44": "stylo-208",
  "src/components/dashboard/project-form.tsx:FormMessage::325:40": "stylo-209",
  "src/components/dashboard/project-form.tsx:FormField::329:28": "stylo-210",
  "src/components/dashboard/project-form.tsx:FormItem::333:16": "stylo-211",
  "src/components/dashboard/project-form.tsx:FormLabel::334:40": "stylo-212",
  "src/components/dashboard/project-form.tsx:FormControl::335:40": "stylo-213",
  "src/components/dashboard/project-form.tsx:Input::336:44": "stylo-214",
  "src/components/dashboard/project-form.tsx:FormMessage::338:40": "stylo-215",
  "src/components/dashboard/project-form.tsx:FormField::344:24": "stylo-216",
  "src/components/dashboard/project-form.tsx:FormItem::348:14": "stylo-217",
  "src/components/dashboard/project-form.tsx:FormLabel::349:36": "stylo-218",
  "src/components/dashboard/project-form.tsx:FormControl::350:36": "stylo-219",
  "src/components/dashboard/project-form.tsx:Input::351:40": "stylo-220",
  "src/components/dashboard/project-form.tsx:FormMessage::353:36": "stylo-221",
  "src/components/dashboard/project-form.tsx:FormField::358:24": "stylo-222",
  "src/components/dashboard/project-form.tsx:FormItem::362:14": "stylo-223",
  "src/components/dashboard/project-form.tsx:FormLabel::363:36": "stylo-224",
  "src/components/dashboard/project-form.tsx:FormControl::364:36": "stylo-225",
  "src/components/dashboard/project-form.tsx:Textarea:min-h-[80px]:365:40": "stylo-226",
  "src/components/dashboard/project-form.tsx:FormDescription::371:36": "stylo-227",
  "src/components/dashboard/project-form.tsx:FormMessage::372:36": "stylo-228",
  "src/components/dashboard/project-form.tsx:div:space-y-4 p-4 rounded-lg border border-border/50 bg-muted/20:377:24": "stylo-229",
  "src/components/dashboard/project-form.tsx:FormField::378:28": "stylo-230",
  "src/components/dashboard/project-form.tsx:FormItem:flex flex-row items-center justify-between:382:16": "stylo-231",
  "src/components/dashboard/project-form.tsx:div:space-y-0.5:383:40": "stylo-232",
  "src/components/dashboard/project-form.tsx:FormLabel::384:44": "stylo-233",
  "src/components/dashboard/project-form.tsx:FormDescription::385:44": "stylo-234",
  "src/components/dashboard/project-form.tsx:FormControl::389:40": "stylo-235",
  "src/components/dashboard/project-form.tsx:Switch::390:44": "stylo-236",
  "src/components/dashboard/project-form.tsx:FormField::400:14": "stylo-237",
  "src/components/dashboard/project-form.tsx:FormItem::404:16": "stylo-238",
  "src/components/dashboard/project-form.tsx:div:flex justify-between items-center:405:44": "stylo-239",
  "src/components/dashboard/project-form.tsx:FormLabel::406:48": "stylo-240",
  "src/components/dashboard/project-form.tsx:FormControl::408:44": "stylo-241",
  "src/components/dashboard/project-form.tsx:Slider:w-full:409:48": "stylo-242",
  "src/components/dashboard/project-form.tsx:FormMessage::418:44": "stylo-243",
  "src/components/dashboard/project-form.tsx:DialogFooter::425:24": "stylo-244",
  "src/components/dashboard/project-form.tsx:Button::426:28": "stylo-245",
  "src/components/dashboard/project-form.tsx:Button::427:28": "stylo-246",
  "src/components/dashboard/project-list.tsx:div:space-y-4:87:4": "stylo-247",
  "src/components/dashboard/project-list.tsx:div:flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200:90:6": "stylo-248",
  "src/components/dashboard/project-list.tsx:WifiOff:h-4 w-4:93:14": "stylo-249",
  "src/components/dashboard/project-list.tsx:span:text-sm:94:14": "stylo-250",
  "src/components/dashboard/project-list.tsx:CloudOff:h-4 w-4:100:14": "stylo-251",
  "src/components/dashboard/project-list.tsx:span:text-sm:101:14": "stylo-252",
  "src/components/dashboard/project-list.tsx:div:project-toolbar flex flex-col sm:flex-row gap-4:110:6": "stylo-253",
  "src/components/dashboard/project-list.tsx:SearchBar:flex-1:112:8": "stylo-254",
  "src/components/dashboard/project-list.tsx:div:flex gap-2:121:8": "stylo-255",
  "src/components/dashboard/project-list.tsx:Button:btn-outline-glass export-json:122:10": "stylo-256",
  "src/components/dashboard/project-list.tsx:Download:mr-2 h-4 w-4:123:12": "stylo-257",
  "src/components/dashboard/project-list.tsx:Button:btn-primary-glass new-project:126:10": "stylo-258",
  "src/components/dashboard/project-list.tsx:PlusCircle:mr-2 h-4 w-4:127:12": "stylo-259",
  "src/components/dashboard/project-list.tsx:Tabs::134:6": "stylo-260",
  "src/components/dashboard/project-list.tsx:TabsList:bg-muted/30 border border-border/50:135:8": "stylo-261",
  "src/components/dashboard/project-list.tsx:TabsTrigger:data-[state=active]:bg-primary/20:136:10": "stylo-262",
  "src/components/dashboard/project-list.tsx:Badge:ml-2 text-xs:138:12": "stylo-263",
  "src/components/dashboard/project-list.tsx:TabsTrigger:data-[state=active]:bg-primary/20:143:10": "stylo-264",
  "src/components/dashboard/project-list.tsx:span:h-2 w-2 rounded-full mr-2:148:14": "stylo-265",
  "src/components/dashboard/project-list.tsx:Badge:ml-2 text-xs:154:12": "stylo-266",
  "src/components/dashboard/project-list.tsx:div:flex items-center gap-2 text-sm text-muted-foreground:165:6": "stylo-267",
  "src/components/dashboard/project-list.tsx:span::166:10": "stylo-268",
  "src/components/dashboard/project-list.tsx:Button:text-xs h-6:169:10": "stylo-269",
  "src/components/dashboard/project-list.tsx:div:grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4:182:6": "stylo-270",
  "src/components/dashboard/project-list.tsx:ProjectCard::184:8": "stylo-271",
  "src/components/dashboard/project-list.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:188:6": "stylo-272",
  "src/components/dashboard/project-list.tsx:h3:text-xl font-semibold text-muted-foreground:189:10": "stylo-273",
  "src/components/dashboard/project-list.tsx:p:text-muted-foreground mt-2:190:10": "stylo-274",
  "src/components/dashboard/project-list.tsx:Button:mt-4:193:10": "stylo-275",
  "src/components/dashboard/project-list.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:198:6": "stylo-276",
  "src/components/dashboard/project-list.tsx:h3:text-xl font-semibold text-muted-foreground:199:10": "stylo-277",
  "src/components/dashboard/project-list.tsx:p:text-muted-foreground mt-2:200:10": "stylo-278",
  "src/components/dashboard/project-list.tsx:Button:mt-4:201:10": "stylo-279",
  "src/components/dashboard/project-list.tsx:PlusCircle:mr-2 h-4 w-4:202:12": "stylo-280",
  "src/components/dashboard/project-list.tsx:div:fixed bottom-0 left-0 right-0 sm:left-14 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-4 px-4 z-20:209:6": "stylo-281",
  "src/components/dashboard/project-list.tsx:DomainFilterBar::210:8": "stylo-282",
  "src/components/dashboard/project-list.tsx:div:h-20:217:6": "stylo-283",
  "src/components/dashboard/project-list.tsx:ProjectForm::219:6": "stylo-284",
  "src/components/dashboard/project-modal.tsx:Sheet::113:6": "stylo-285",
  "src/components/dashboard/project-modal.tsx:SheetContent:sm:max-w-xl w-full p-0 flex flex-col modal-panel:114:8": "stylo-286",
  "src/components/dashboard/project-modal.tsx:SheetHeader:p-6 pb-2 modal-header:115:10": "stylo-287",
  "src/components/dashboard/project-modal.tsx:div:flex items-center gap-2 mb-2:117:12": "stylo-288",
  "src/components/dashboard/project-modal.tsx:DomainBadge::119:14": "stylo-289",
  "src/components/dashboard/project-modal.tsx:SheetTitle:font-headline text-3xl text-primary:123:12": "stylo-290",
  "src/components/dashboard/project-modal.tsx:SheetDescription::124:12": "stylo-291",
  "src/components/dashboard/project-modal.tsx:div:flex flex-wrap gap-2 pt-2:127:12": "stylo-292",
  "src/components/dashboard/project-modal.tsx:Badge::128:14": "stylo-293",
  "src/components/dashboard/project-modal.tsx:Badge::129:14": "stylo-294",
  "src/components/dashboard/project-modal.tsx:Badge::130:14": "stylo-295",
  "src/components/dashboard/project-modal.tsx:Badge:flex items-center gap-1:132:14": "stylo-296",
  "src/components/dashboard/project-modal.tsx:Clock:h-3 w-3:133:18": "stylo-297",
  "src/components/dashboard/project-modal.tsx:div:pt-3:140:12": "stylo-298",
  "src/components/dashboard/project-modal.tsx:Label:text-sm font-medium mb-2 block:141:14": "stylo-299",
  "src/components/dashboard/project-modal.tsx:StatusButtons::142:14": "stylo-300",
  "src/components/dashboard/project-modal.tsx:div:flex-grow overflow-y-auto p-6 space-y-6:149:10": "stylo-301",
  "src/components/dashboard/project-modal.tsx:div:flex items-center justify-between:151:12": "stylo-302",
  "src/components/dashboard/project-modal.tsx:div::152:14": "stylo-303",
  "src/components/dashboard/project-modal.tsx:div:flex justify-between items-center text-sm text-muted-foreground mb-2:153:16": "stylo-304",
  "src/components/dashboard/project-modal.tsx:h3:text-lg font-medium text-foreground:154:18": "stylo-305",
  "src/components/dashboard/project-modal.tsx:span:text-sm text-muted-foreground:157:16": "stylo-306",
  "src/components/dashboard/project-modal.tsx:span:text-sm text-muted-foreground:159:16": "stylo-307",
  "src/components/dashboard/project-modal.tsx:DomainProgressRing::162:14": "stylo-308",
  "src/components/dashboard/project-modal.tsx:div:space-y-2:173:12": "stylo-309",
  "src/components/dashboard/project-modal.tsx:Label:text-sm:174:16": "stylo-310",
  "src/components/dashboard/project-modal.tsx:Slider::175:16": "stylo-311",
  "src/components/dashboard/project-modal.tsx:Separator::185:12": "stylo-312",
  "src/components/dashboard/project-modal.tsx:div::188:12": "stylo-313",
  "src/components/dashboard/project-modal.tsx:Label:text-sm font-medium mb-2 block:189:14": "stylo-314",
  "src/components/dashboard/project-modal.tsx:TagsInput::190:14": "stylo-315",
  "src/components/dashboard/project-modal.tsx:Separator::196:12": "stylo-316",
  "src/components/dashboard/project-modal.tsx:Accordion:w-full:199:12": "stylo-317",
  "src/components/dashboard/project-modal.tsx:AccordionItem::201:14": "stylo-318",
  "src/components/dashboard/project-modal.tsx:AccordionTrigger::202:16": "stylo-319",
  "src/components/dashboard/project-modal.tsx:AccordionContent::205:16": "stylo-320",
  "src/components/dashboard/project-modal.tsx:MilestoneList::206:18": "stylo-321",
  "src/components/dashboard/project-modal.tsx:AccordionItem::214:14": "stylo-322",
  "src/components/dashboard/project-modal.tsx:AccordionTrigger::215:16": "stylo-323",
  "src/components/dashboard/project-modal.tsx:AccordionContent::218:16": "stylo-324",
  "src/components/dashboard/project-modal.tsx:form:flex gap-2 mb-3:219:18": "stylo-325",
  "src/components/dashboard/project-modal.tsx:Input::220:20": "stylo-326",
  "src/components/dashboard/project-modal.tsx:Button::225:20": "stylo-327",
  "src/components/dashboard/project-modal.tsx:div:space-y-2 max-h-[300px] overflow-y-auto:227:18": "stylo-328",
  "src/components/dashboard/project-modal.tsx:p:text-sm text-muted-foreground text-center py-4:229:20": "stylo-329",
  "src/components/dashboard/project-modal.tsx:div:flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50:234:20": "stylo-330",
  "src/components/dashboard/project-modal.tsx:Checkbox::235:26": "stylo-331",
  "src/components/dashboard/project-modal.tsx:Label:dynamic:240:26": "stylo-332",
  "src/components/dashboard/project-modal.tsx:AccordionItem::254:14": "stylo-333",
  "src/components/dashboard/project-modal.tsx:AccordionTrigger::255:16": "stylo-334",
  "src/components/dashboard/project-modal.tsx:div:flex items-center gap-2:256:18": "stylo-335",
  "src/components/dashboard/project-modal.tsx:StickyNote:h-4 w-4:257:20": "stylo-336",
  "src/components/dashboard/project-modal.tsx:AccordionContent::261:16": "stylo-337",
  "src/components/dashboard/project-modal.tsx:Textarea:min-h-[120px]:262:18": "stylo-338",
  "src/components/dashboard/project-modal.tsx:p:text-xs text-muted-foreground mt-1:273:18": "stylo-339",
  "src/components/dashboard/project-modal.tsx:SheetFooter:p-6 pt-0 grid grid-cols-2 gap-2 modal-footer:282:10": "stylo-340",
  "src/components/dashboard/project-modal.tsx:AlertDialog::283:12": "stylo-341",
  "src/components/dashboard/project-modal.tsx:AlertDialogTrigger::284:14": "stylo-342",
  "src/components/dashboard/project-modal.tsx:Button:w-full:285:16": "stylo-343",
  "src/components/dashboard/project-modal.tsx:Trash2:mr-2 h-4 w-4:286:18": "stylo-344",
  "src/components/dashboard/project-modal.tsx:AlertDialogContent::290:14": "stylo-345",
  "src/components/dashboard/project-modal.tsx:AlertDialogHeader::291:16": "stylo-346",
  "src/components/dashboard/project-modal.tsx:AlertDialogTitle::292:18": "stylo-347",
  "src/components/dashboard/project-modal.tsx:AlertDialogDescription::293:18": "stylo-348",
  "src/components/dashboard/project-modal.tsx:AlertDialogFooter::298:16": "stylo-349",
  "src/components/dashboard/project-modal.tsx:AlertDialogCancel::299:18": "stylo-350",
  "src/components/dashboard/project-modal.tsx:AlertDialogAction::300:18": "stylo-351",
  "src/components/dashboard/project-modal.tsx:Button:w-full btn-outline-glass:310:12": "stylo-352",
  "src/components/dashboard/project-modal.tsx:PenSquare:mr-2 h-4 w-4:311:14": "stylo-353",
  "src/components/dashboard/project-modal.tsx:ProjectForm::317:6": "stylo-354",
  "src/components/dashboard/search-bar.tsx:div:dynamic:49:4": "stylo-355",
  "src/components/dashboard/search-bar.tsx:Search:absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none:50:6": "stylo-356",
  "src/components/dashboard/search-bar.tsx:Input:pl-9 pr-9 dashboard-input:51:6": "stylo-357",
  "src/components/dashboard/search-bar.tsx:button:absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors:59:6": "stylo-358",
  "src/components/dashboard/search-bar.tsx:X:h-4 w-4:64:10": "stylo-359",
  "src/components/dashboard/status-select.tsx:Select::34:4": "stylo-360",
  "src/components/dashboard/status-select.tsx:SelectTrigger:dynamic:35:6": "stylo-361",
  "src/components/dashboard/status-select.tsx:SelectValue::36:8": "stylo-362",
  "src/components/dashboard/status-select.tsx:div:flex items-center gap-2:37:10": "stylo-363",
  "src/components/dashboard/status-select.tsx:Icon:h-4 w-4:38:12": "stylo-364",
  "src/components/dashboard/status-select.tsx:span::39:12": "stylo-365",
  "src/components/dashboard/status-select.tsx:SelectContent::43:6": "stylo-366",
  "src/components/dashboard/status-select.tsx:SelectItem::48:12": "stylo-367",
  "src/components/dashboard/status-select.tsx:div:flex items-center gap-2:49:14": "stylo-368",
  "src/components/dashboard/status-select.tsx:StatusIcon:h-4 w-4:50:16": "stylo-369",
  "src/components/dashboard/status-select.tsx:span::51:16": "stylo-370",
  "src/components/dashboard/status-select.tsx:div:dynamic:75:4": "stylo-371",
  "src/components/dashboard/status-select.tsx:Icon:dynamic:86:6": "stylo-372",
  "src/components/dashboard/status-select.tsx:div:dynamic:99:4": "stylo-373",
  "src/components/dashboard/status-select.tsx:button:dynamic:106:10": "stylo-374",
  "src/components/dashboard/status-select.tsx:Icon:h-4 w-4:127:12": "stylo-375",
  "src/components/dashboard/tags-input.tsx:div:dynamic:76:4": "stylo-376",
  "src/components/dashboard/tags-input.tsx:div:flex flex-wrap gap-2:78:6": "stylo-377",
  "src/components/dashboard/tags-input.tsx:Badge:px-2 py-1 text-xs flex items-center gap-1:80:8": "stylo-378",
  "src/components/dashboard/tags-input.tsx:button:ml-1 hover:text-destructive transition-colors:87:10": "stylo-379",
  "src/components/dashboard/tags-input.tsx:X:h-3 w-3:92:16": "stylo-380",
  "src/components/dashboard/tags-input.tsx:div:relative:101:6": "stylo-381",
  "src/components/dashboard/tags-input.tsx:Input:text-sm:102:10": "stylo-382",
  "src/components/dashboard/tags-input.tsx:div:absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-auto:118:8": "stylo-383",
  "src/components/dashboard/tags-input.tsx:button:w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2:120:10": "stylo-384",
  "src/components/dashboard/tags-input.tsx:Plus:h-3 w-3:126:18": "stylo-385",
  "src/components/dashboard/tags-input.tsx:p:text-xs text-muted-foreground:136:6": "stylo-386",
  "src/components/dashboard/tags-input.tsx:div:dynamic:158:4": "stylo-387",
  "src/components/dashboard/tags-input.tsx:span:px-2 py-0.5 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50:160:6": "stylo-388",
  "src/components/dashboard/tags-input.tsx:span:px-2 py-0.5 text-xs rounded-full bg-muted/30 text-muted-foreground:168:6": "stylo-389",
  "src/components/icons/logo.tsx:svg::3:4": "stylo-390",
  "src/components/icons/logo.tsx:path::9:8": "stylo-391",
  "src/components/icons/logo.tsx:path::14:8": "stylo-392",
  "src/components/icons/logo.tsx:path::20:8": "stylo-393",
  "src/components/layout/app-sidebar.tsx:aside:fixed inset-y-0 left-0 z-10 hidden w-14 flex-col app-sidebar sm:flex:34:4": "stylo-394",
  "src/components/layout/app-sidebar.tsx:nav:flex flex-col items-center gap-4 px-2 sm:py-5:35:6": "stylo-395",
  "src/components/layout/app-sidebar.tsx:Link:group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base:36:8": "stylo-396",
  "src/components/layout/app-sidebar.tsx:Logo:h-5 w-5 text-primary-foreground transition-all group-hover:scale-110:41:10": "stylo-397",
  "src/components/layout/app-sidebar.tsx:span:sr-only:42:10": "stylo-398",
  "src/components/layout/app-sidebar.tsx:TooltipProvider::45:8": "stylo-399",
  "src/components/layout/app-sidebar.tsx:Tooltip::49:14": "stylo-400",
  "src/components/layout/app-sidebar.tsx:TooltipTrigger::50:16": "stylo-401",
  "src/components/layout/app-sidebar.tsx:Link:dynamic:51:18": "stylo-402",
  "src/components/layout/app-sidebar.tsx:item.icon:h-5 w-5:59:20": "stylo-403",
  "src/components/layout/app-sidebar.tsx:span:sr-only:60:20": "stylo-404",
  "src/components/layout/app-sidebar.tsx:TooltipContent::63:16": "stylo-405",
  "src/components/layout/app-sidebar.tsx:Collapsible::69:10": "stylo-406",
  "src/components/layout/app-sidebar.tsx:Tooltip::70:12": "stylo-407",
  "src/components/layout/app-sidebar.tsx:TooltipTrigger::71:14": "stylo-408",
  "src/components/layout/app-sidebar.tsx:CollapsibleTrigger:dynamic:72:16": "stylo-409",
  "src/components/layout/app-sidebar.tsx:ChevronDown:dynamic:79:18": "stylo-410",
  "src/components/layout/app-sidebar.tsx:span:sr-only:80:18": "stylo-411",
  "src/components/layout/app-sidebar.tsx:TooltipContent::83:14": "stylo-412",
  "src/components/layout/app-sidebar.tsx:CollapsibleContent:space-y-1 mt-1:86:12": "stylo-413",
  "src/components/layout/app-sidebar.tsx:Tooltip::92:18": "stylo-414",
  "src/components/layout/app-sidebar.tsx:TooltipTrigger::93:20": "stylo-415",
  "src/components/layout/app-sidebar.tsx:Link:dynamic:94:22": "stylo-416",
  "src/components/layout/app-sidebar.tsx:Icon:h-4 w-4:111:24": "stylo-417",
  "src/components/layout/app-sidebar.tsx:span:sr-only:112:24": "stylo-418",
  "src/components/layout/app-sidebar.tsx:TooltipContent::115:20": "stylo-419",
  "src/components/layout/app-sidebar.tsx:Tooltip::122:10": "stylo-420",
  "src/components/layout/app-sidebar.tsx:TooltipTrigger::123:12": "stylo-421",
  "src/components/layout/app-sidebar.tsx:button:flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8:124:14": "stylo-422",
  "src/components/layout/app-sidebar.tsx:Settings:h-5 w-5:129:16": "stylo-423",
  "src/components/layout/app-sidebar.tsx:TooltipContent::132:12": "stylo-424",
  "src/components/layout/filters-modal.tsx:Dialog::79:4": "stylo-425",
  "src/components/layout/filters-modal.tsx:DialogPortal::83:6": "stylo-426",
  "src/components/layout/filters-modal.tsx:DialogOverlay:bg-transparent:85:8": "stylo-427",
  "src/components/layout/filters-modal.tsx:DialogPrimitive.Content:fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-primary/50 bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg shadow-[0_0_60px_20px_rgba(0,0,0,0.8),0_0_100px_40px_rgba(0,0,0,0.6)] border-t-2 border-t-primary:88:8": "stylo-428",
  "src/components/layout/filters-modal.tsx:h2:font-headline text-2xl text-primary lowercase tracking-wide:91:10": "stylo-429",
  "src/components/layout/filters-modal.tsx:div:space-y-6 py-4:93:10": "stylo-430",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:95:12": "stylo-431",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:96:14": "stylo-432",
  "src/components/layout/filters-modal.tsx:Slider:flex-1:99:14": "stylo-433",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:110:12": "stylo-434",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:111:14": "stylo-435",
  "src/components/layout/filters-modal.tsx:Slider:flex-1:114:14": "stylo-436",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:125:12": "stylo-437",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:126:14": "stylo-438",
  "src/components/layout/filters-modal.tsx:Slider:flex-1:129:14": "stylo-439",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:140:12": "stylo-440",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:141:14": "stylo-441",
  "src/components/layout/filters-modal.tsx:Slider:flex-1:144:14": "stylo-442",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:155:12": "stylo-443",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:156:14": "stylo-444",
  "src/components/layout/filters-modal.tsx:Slider:flex-1:159:14": "stylo-445",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:170:12": "stylo-446",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:171:14": "stylo-447",
  "src/components/layout/filters-modal.tsx:Checkbox:h-5 w-5:172:14": "stylo-448",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:180:12": "stylo-449",
  "src/components/layout/filters-modal.tsx:Label:text-base font-medium min-w-[140px]:181:14": "stylo-450",
  "src/components/layout/filters-modal.tsx:Select::182:14": "stylo-451",
  "src/components/layout/filters-modal.tsx:SelectTrigger:w-[200px]:186:16": "stylo-452",
  "src/components/layout/filters-modal.tsx:SelectValue::187:18": "stylo-453",
  "src/components/layout/filters-modal.tsx:SelectContent::189:16": "stylo-454",
  "src/components/layout/filters-modal.tsx:SelectItem::191:18": "stylo-455",
  "src/components/layout/filters-modal.tsx:DialogFooter::200:10": "stylo-456",
  "src/components/layout/filters-modal.tsx:Button::201:12": "stylo-457",
  "src/components/layout/filters-modal.tsx:Button::202:12": "stylo-458",
  "src/components/layout/filters-modal.tsx:DialogPrimitive.Close:absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2:206:10": "stylo-459",
  "src/components/layout/filters-modal.tsx:X:h-4 w-4:207:12": "stylo-460",
  "src/components/layout/filters-modal.tsx:span:sr-only:208:12": "stylo-461",
  "src/components/layout/header.tsx:header:sticky top-0 z-30 flex h-14 items-center gap-4 app-header-bar px-4 sm:static sm:h-auto sm:px-6:29:4": "stylo-462",
  "src/components/layout/header.tsx:Sheet::30:6": "stylo-463",
  "src/components/layout/header.tsx:SheetTrigger::31:8": "stylo-464",
  "src/components/layout/header.tsx:Button:sm:hidden:32:10": "stylo-465",
  "src/components/layout/header.tsx:PanelLeft:h-5 w-5:33:12": "stylo-466",
  "src/components/layout/header.tsx:span:sr-only:34:12": "stylo-467",
  "src/components/layout/header.tsx:SheetContent:sm:max-w-xs:37:8": "stylo-468",
  "src/components/layout/header.tsx:SheetTitle:sr-only:38:10": "stylo-469",
  "src/components/layout/header.tsx:nav:grid gap-6 text-lg font-medium:39:10": "stylo-470",
  "src/components/layout/header.tsx:Link:group flex h-10 items-center gap-4 rounded-full text-lg font-semibold:40:12": "stylo-471",
  "src/components/layout/header.tsx:div:bg-primary rounded-full p-2:44:14": "stylo-472",
  "src/components/layout/header.tsx:Logo:h-5 w-5 text-primary-foreground:45:16": "stylo-473",
  "src/components/layout/header.tsx:span:font-headline text-xl text-primary:47:14": "stylo-474",
  "src/components/layout/header.tsx:Link:dynamic:50:12": "stylo-475",
  "src/components/layout/header.tsx:item.icon:h-5 w-5:58:16": "stylo-476",
  "src/components/layout/header.tsx:button:text-left flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground:62:12": "stylo-477",
  "src/components/layout/header.tsx:Settings:h-5 w-5:66:14": "stylo-478",
  "src/components/layout/header.tsx:Breadcrumb:hidden md:flex:73:6": "stylo-479",
  "src/components/layout/header.tsx:BreadcrumbList::74:8": "stylo-480",
  "src/components/layout/header.tsx:BreadcrumbItem::75:10": "stylo-481",
  "src/components/layout/header.tsx:BreadcrumbLink::76:12": "stylo-482",
  "src/components/layout/header.tsx:Link::77:14": "stylo-483",
  "src/components/layout/header.tsx:BreadcrumbSeparator::80:10": "stylo-484",
  "src/components/layout/header.tsx:BreadcrumbItem::81:10": "stylo-485",
  "src/components/layout/header.tsx:BreadcrumbPage::82:12": "stylo-486",
  "src/components/layout/header.tsx:div:relative ml-auto flex items-center gap-2:87:6": "stylo-487",
  "src/components/layout/header.tsx:ThemeToggle::88:8": "stylo-488",
  "src/components/layout/header.tsx:Button::89:8": "stylo-489",
  "src/components/layout/header.tsx:Settings:h-8 w-8:90:10": "stylo-490",
  "src/components/layout/header.tsx:button:hidden:93:8": "stylo-491",
  "src/components/layout/header.tsx:SettingsModal::94:8": "stylo-492",
  "src/components/layout/header.tsx:FiltersModal::95:8": "stylo-493",
  "src/components/layout/settings-modal.tsx:Dialog::109:4": "stylo-494",
  "src/components/layout/settings-modal.tsx:DialogContent:sm:max-w-2xl:110:6": "stylo-495",
  "src/components/layout/settings-modal.tsx:DialogHeader::111:8": "stylo-496",
  "src/components/layout/settings-modal.tsx:DialogTitle::112:10": "stylo-497",
  "src/components/layout/settings-modal.tsx:DialogDescription::113:10": "stylo-498",
  "src/components/layout/settings-modal.tsx:div:grid md:grid-cols-2 gap-6:116:8": "stylo-499",
  "src/components/layout/settings-modal.tsx:div:space-y-3:117:10": "stylo-500",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:118:12": "stylo-501",
  "src/components/layout/settings-modal.tsx:div:space-y-2:120:12": "stylo-502",
  "src/components/layout/settings-modal.tsx:div:text-sm text-muted-foreground:121:16": "stylo-503",
  "src/components/layout/settings-modal.tsx:Button::122:16": "stylo-504",
  "src/components/layout/settings-modal.tsx:form:space-y-2:125:12": "stylo-505",
  "src/components/layout/settings-modal.tsx:Input::126:16": "stylo-506",
  "src/components/layout/settings-modal.tsx:Input::127:16": "stylo-507",
  "src/components/layout/settings-modal.tsx:div:text-sm text-destructive:128:26": "stylo-508",
  "src/components/layout/settings-modal.tsx:div:flex gap-2:129:16": "stylo-509",
  "src/components/layout/settings-modal.tsx:Button::130:18": "stylo-510",
  "src/components/layout/settings-modal.tsx:Button::131:18": "stylo-511",
  "src/components/layout/settings-modal.tsx:div:space-y-4 pt-4:138:12": "stylo-512",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:139:14": "stylo-513",
  "src/components/layout/settings-modal.tsx:div:flex items-start justify-between gap-4:140:14": "stylo-514",
  "src/components/layout/settings-modal.tsx:div:text-sm:141:16": "stylo-515",
  "src/components/layout/settings-modal.tsx:Label::142:18": "stylo-516",
  "src/components/layout/settings-modal.tsx:p:text-muted-foreground:143:18": "stylo-517",
  "src/components/layout/settings-modal.tsx:Switch::145:16": "stylo-518",
  "src/components/layout/settings-modal.tsx:div:flex items-start justify-between gap-4:147:14": "stylo-519",
  "src/components/layout/settings-modal.tsx:div:text-sm:148:16": "stylo-520",
  "src/components/layout/settings-modal.tsx:Label::149:18": "stylo-521",
  "src/components/layout/settings-modal.tsx:p:text-muted-foreground:150:18": "stylo-522",
  "src/components/layout/settings-modal.tsx:Switch::152:16": "stylo-523",
  "src/components/layout/settings-modal.tsx:div:space-y-3:157:10": "stylo-524",
  "src/components/layout/settings-modal.tsx:div:flex items-center justify-between:158:12": "stylo-525",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:159:14": "stylo-526",
  "src/components/layout/settings-modal.tsx:Button::160:14": "stylo-527",
  "src/components/layout/settings-modal.tsx:Textarea::162:12": "stylo-528",
  "src/components/layout/settings-modal.tsx:div:space-y-2 mt-6:166:8": "stylo-529",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:167:10": "stylo-530",
  "src/components/layout/settings-modal.tsx:Textarea::168:10": "stylo-531",
  "src/components/layout/settings-modal.tsx:div:flex gap-2 justify-end:169:10": "stylo-532",
  "src/components/layout/settings-modal.tsx:Button::170:12": "stylo-533",
  "src/components/layout/settings-modal.tsx:Button::171:12": "stylo-534",
  "src/components/layout/settings-modal.tsx:DialogFooter::175:8": "stylo-535",
  "src/components/layout/settings-modal.tsx:Button::176:10": "stylo-536",
  "src/components/prioritize/prioritization-form.tsx:div:grid md:grid-cols-2 gap-8 items-start:65:4": "stylo-537",
  "src/components/prioritize/prioritization-form.tsx:Card::66:12": "stylo-538",
  "src/components/prioritize/prioritization-form.tsx:CardHeader::67:16": "stylo-539",
  "src/components/prioritize/prioritization-form.tsx:CardTitle::68:20": "stylo-540",
  "src/components/prioritize/prioritization-form.tsx:CardDescription::69:20": "stylo-541",
  "src/components/prioritize/prioritization-form.tsx:CardContent::71:16": "stylo-542",
  "src/components/prioritize/prioritization-form.tsx:Form::72:20": "stylo-543",
  "src/components/prioritize/prioritization-form.tsx:form:space-y-6:73:24": "stylo-544",
  "src/components/prioritize/prioritization-form.tsx:FormField::74:28": "stylo-545",
  "src/components/prioritize/prioritization-form.tsx:FormItem::78:16": "stylo-546",
  "src/components/prioritize/prioritization-form.tsx:div:mb-4:79:40": "stylo-547",
  "src/components/prioritize/prioritization-form.tsx:FormLabel:text-base:80:44": "stylo-548",
  "src/components/prioritize/prioritization-form.tsx:FormDescription::81:44": "stylo-549",
  "src/components/prioritize/prioritization-form.tsx:div:space-y-2:83:40": "stylo-550",
  "src/components/prioritize/prioritization-form.tsx:FormField::85:20": "stylo-551",
  "src/components/prioritize/prioritization-form.tsx:FormItem:flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3:91:26": "stylo-552",
  "src/components/prioritize/prioritization-form.tsx:FormControl::95:64": "stylo-553",
  "src/components/prioritize/prioritization-form.tsx:Checkbox::96:68": "stylo-554",
  "src/components/prioritize/prioritization-form.tsx:FormLabel:font-normal:109:64": "stylo-555",
  "src/components/prioritize/prioritization-form.tsx:FormMessage::118:40": "stylo-556",
  "src/components/prioritize/prioritization-form.tsx:FormField::122:28": "stylo-557",
  "src/components/prioritize/prioritization-form.tsx:FormItem::126:16": "stylo-558",
  "src/components/prioritize/prioritization-form.tsx:FormLabel::127:40": "stylo-559",
  "src/components/prioritize/prioritization-form.tsx:FormControl::128:40": "stylo-560",
  "src/components/prioritize/prioritization-form.tsx:Textarea::129:44": "stylo-561",
  "src/components/prioritize/prioritization-form.tsx:FormDescription::131:40": "stylo-562",
  "src/components/prioritize/prioritization-form.tsx:FormMessage::132:40": "stylo-563",
  "src/components/prioritize/prioritization-form.tsx:FormField::136:28": "stylo-564",
  "src/components/prioritize/prioritization-form.tsx:FormItem::140:16": "stylo-565",
  "src/components/prioritize/prioritization-form.tsx:FormLabel::141:40": "stylo-566",
  "src/components/prioritize/prioritization-form.tsx:FormControl::142:40": "stylo-567",
  "src/components/prioritize/prioritization-form.tsx:Textarea::143:44": "stylo-568",
  "src/components/prioritize/prioritization-form.tsx:FormDescription::145:40": "stylo-569",
  "src/components/prioritize/prioritization-form.tsx:FormMessage::146:40": "stylo-570",
  "src/components/prioritize/prioritization-form.tsx:Button:w-full:150:28": "stylo-571",
  "src/components/prioritize/prioritization-form.tsx:Loader2:mr-2 h-4 w-4 animate-spin:151:46": "stylo-572",
  "src/components/prioritize/prioritization-form.tsx:PrioritizationResult::159:12": "stylo-573",
  "src/components/prioritize/prioritization-result.tsx:div:dynamic:16:4": "stylo-574",
  "src/components/prioritize/prioritization-result.tsx:h3:font-semibold text-lg mt-4 border-b pb-1:19:17": "stylo-575",
  "src/components/prioritize/prioritization-result.tsx:p:font-bold:22:17": "stylo-576",
  "src/components/prioritize/prioritization-result.tsx:div:flex gap-2:25:17": "stylo-577",
  "src/components/prioritize/prioritization-result.tsx:span:text-muted-foreground:25:65": "stylo-578",
  "src/components/prioritize/prioritization-result.tsx:p::25:130": "stylo-579",
  "src/components/prioritize/prioritization-result.tsx:div:flex gap-2:28:17": "stylo-580",
  "src/components/prioritize/prioritization-result.tsx:span:font-medium:28:65": "stylo-581",
  "src/components/prioritize/prioritization-result.tsx:p::28:156": "stylo-582",
  "src/components/prioritize/prioritization-result.tsx:p::33:15": "stylo-583",
  "src/components/prioritize/prioritization-result.tsx:div:space-y-4 p-4:44:8": "stylo-584",
  "src/components/prioritize/prioritization-result.tsx:Skeleton:h-8 w-1/2:45:20": "stylo-585",
  "src/components/prioritize/prioritization-result.tsx:Skeleton:h-4 w-full:46:20": "stylo-586",
  "src/components/prioritize/prioritization-result.tsx:Skeleton:h-4 w-4/5:47:20": "stylo-587",
  "src/components/prioritize/prioritization-result.tsx:Skeleton:h-4 w-full:48:20": "stylo-588",
  "src/components/prioritize/prioritization-result.tsx:Alert::55:8": "stylo-589",
  "src/components/prioritize/prioritization-result.tsx:AlertCircle:h-4 w-4:56:20": "stylo-590",
  "src/components/prioritize/prioritization-result.tsx:AlertTitle::57:20": "stylo-591",
  "src/components/prioritize/prioritization-result.tsx:AlertDescription::58:20": "stylo-592",
  "src/components/prioritize/prioritization-result.tsx:div:animate-in fade-in-50:65:8": "stylo-593",
  "src/components/prioritize/prioritization-result.tsx:h3:font-bold text-lg mb-2:66:20": "stylo-594",
  "src/components/prioritize/prioritization-result.tsx:ol:list-decimal list-inside space-y-1 mb-6 rounded-md border p-4:67:20": "stylo-595",
  "src/components/prioritize/prioritization-result.tsx:li:pl-2 font-medium:69:12": "stylo-596",
  "src/components/prioritize/prioritization-result.tsx:h3:font-bold text-lg mb-2:72:20": "stylo-597",
  "src/components/prioritize/prioritization-result.tsx:div:p-4 rounded-md border bg-muted/20:73:20": "stylo-598",
  "src/components/prioritize/prioritization-result.tsx:BasicMarkdown::74:24": "stylo-599",
  "src/components/prioritize/prioritization-result.tsx:div:flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8:81:6": "stylo-600",
  "src/components/prioritize/prioritization-result.tsx:BotMessageSquare:h-12 w-12 mb-4:82:16": "stylo-601",
  "src/components/prioritize/prioritization-result.tsx:p:text-lg font-medium:83:16": "stylo-602",
  "src/components/prioritize/prioritization-result.tsx:p::84:16": "stylo-603",
  "src/components/prioritize/prioritization-result.tsx:Card:min-h-[400px]:90:4": "stylo-604",
  "src/components/prioritize/prioritization-result.tsx:CardHeader::91:12": "stylo-605",
  "src/components/prioritize/prioritization-result.tsx:CardTitle::92:16": "stylo-606",
  "src/components/prioritize/prioritization-result.tsx:CardDescription::93:17": "stylo-607",
  "src/components/prioritize/prioritization-result.tsx:CardContent::95:12": "stylo-608",
  "src/components/tasks/task-deck-item.tsx:div:dynamic:11:4": "stylo-609",
  "src/components/tasks/task-deck-item.tsx:Checkbox::17:12": "stylo-610",
  "src/components/tasks/task-deck-item.tsx:Label:dynamic:23:12": "stylo-611",
  "src/components/tasks/task-deck-item.tsx:Button:h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive:32:14": "stylo-612",
  "src/components/tasks/task-deck-item.tsx:Trash2:h-3 w-3:38:16": "stylo-613",
  "src/components/tasks/task-deck-item.tsx:Badge:dynamic:42:12": "stylo-614",
  "src/components/tasks/task-deck.tsx:div:dynamic:24:4": "stylo-615",
  "src/components/tasks/task-deck.tsx:div:tasks-deck-header flex items-center gap-2 mb-2:25:6": "stylo-616",
  "src/components/tasks/task-deck.tsx:Button:h-7 w-7:26:9": "stylo-617",
  "src/components/tasks/task-deck.tsx:Plus:dynamic:32:10": "stylo-618",
  "src/components/tasks/task-deck.tsx:span:sr-only:33:11": "stylo-619",
  "src/components/tasks/task-deck.tsx:div:flex-grow cursor-pointer:36:8": "stylo-620",
  "src/components/tasks/task-deck.tsx:h3:dynamic:37:10": "stylo-621",
  "src/components/tasks/task-deck.tsx:p:tasks-deck-progress text-xs text-muted-foreground:48:8": "stylo-622",
  "src/components/tasks/task-deck.tsx:Button:h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive:53:10": "stylo-623",
  "src/components/tasks/task-deck.tsx:Trash2:h-4 w-4:59:12": "stylo-624",
  "src/components/tasks/task-deck.tsx:div:dynamic:65:6": "stylo-625",
  "src/components/tasks/task-deck.tsx:div:task-deck-item:67:8": "stylo-626",
  "src/components/tasks/task-deck.tsx:TaskDeckItem::68:12": "stylo-627",
  "src/components/tasks/task-item.tsx:div:tasks-item group flex items-center space-x-3 p-3 rounded-lg transition-colors bg-background hover:bg-muted/50 border:9:4": "stylo-628",
  "src/components/tasks/task-item.tsx:Checkbox:tasks-item-checkbox:10:12": "stylo-629",
  "src/components/tasks/task-item.tsx:Label:dynamic:17:12": "stylo-630",
  "src/components/tasks/task-item.tsx:Button:h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive:26:14": "stylo-631",
  "src/components/tasks/task-item.tsx:Trash2:h-4 w-4:32:16": "stylo-632",
  "src/components/tasks/task-list.tsx:Card:task-card:297:4": "stylo-633",
  "src/components/tasks/task-list.tsx:CardHeader::298:12": "stylo-634",
  "src/components/tasks/task-list.tsx:CardTitle::299:16": "stylo-635",
  "src/components/tasks/task-list.tsx:CardDescription::300:16": "stylo-636",
  "src/components/tasks/task-list.tsx:CardContent::302:12": "stylo-637",
  "src/components/tasks/task-list.tsx:div:mb-6 space-y-4 animate-in fade-in-50:304:8": "stylo-638",
  "src/components/tasks/task-list.tsx:Alert::305:24": "stylo-639",
  "src/components/tasks/task-list.tsx:Bot:h-4 w-4:306:28": "stylo-640",
  "src/components/tasks/task-list.tsx:AlertTitle::307:28": "stylo-641",
  "src/components/tasks/task-list.tsx:AlertDescription::308:28": "stylo-642",
  "src/components/tasks/task-list.tsx:form:task-input-row:310:24": "stylo-643",
  "src/components/tasks/task-list.tsx:Input:dashboard-input:311:29": "stylo-644",
  "src/components/tasks/task-list.tsx:Button:dashboard-button-primary:319:28": "stylo-645",
  "src/components/tasks/task-list.tsx:Loader2:h-4 w-4 animate-spin:320:50": "stylo-646",
  "src/components/tasks/task-list.tsx:Button:btn-outline-glass:322:28": "stylo-647",
  "src/components/tasks/task-list.tsx:form:task-input-row:328:8": "stylo-648",
  "src/components/tasks/task-list.tsx:Input:dashboard-input:329:24": "stylo-649",
  "src/components/tasks/task-list.tsx:Button:dashboard-button-primary:337:24": "stylo-650",
  "src/components/tasks/task-list.tsx:Plus:h-4 w-4:338:28": "stylo-651",
  "src/components/tasks/task-list.tsx:Button:btn-outline-glass:340:24": "stylo-652",
  "src/components/tasks/task-list.tsx:Loader2:h-4 w-4 animate-spin:341:46": "stylo-653",
  "src/components/tasks/task-list.tsx:Bot:h-4 w-4:341:93": "stylo-654",
  "src/components/tasks/task-list.tsx:div:space-y-4:347:16": "stylo-655",
  "src/components/tasks/task-list.tsx:div:relative space-y-2:348:20": "stylo-656",
  "src/components/tasks/task-list.tsx:TaskDeckComponent::352:12": "stylo-657",
  "src/components/tasks/task-list.tsx:TaskItem::353:12": "stylo-658",
  "src/components/tasks/task-list.tsx:p:text-sm text-muted-foreground py-4 text-center:356:12": "stylo-659",
  "src/components/tasks/task-list.tsx:div::362:10": "stylo-660",
  "src/components/tasks/task-list.tsx:Separator:my-4:363:28": "stylo-661",
  "src/components/tasks/task-list.tsx:h3:text-sm font-medium mb-2 text-muted-foreground:364:28": "stylo-662",
  "src/components/tasks/task-list.tsx:div:space-y-2:365:28": "stylo-663",
  "src/components/tasks/task-list.tsx:TaskDeckComponent::368:14": "stylo-664",
  "src/components/tasks/task-list.tsx:TaskItem::369:14": "stylo-665",
  "src/components/theme-provider.tsx:NextThemesProvider::8:9": "stylo-666",
  "src/components/theme-toggle.tsx:DropdownMenu::19:4": "stylo-667",
  "src/components/theme-toggle.tsx:DropdownMenuTrigger::20:6": "stylo-668",
  "src/components/theme-toggle.tsx:Button::21:8": "stylo-669",
  "src/components/theme-toggle.tsx:Sun:h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0:22:10": "stylo-670",
  "src/components/theme-toggle.tsx:Moon:absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100:23:10": "stylo-671",
  "src/components/theme-toggle.tsx:span:sr-only:24:10": "stylo-672",
  "src/components/theme-toggle.tsx:DropdownMenuContent::27:6": "stylo-673",
  "src/components/theme-toggle.tsx:DropdownMenuItem::28:8": "stylo-674",
  "src/components/theme-toggle.tsx:DropdownMenuItem::31:8": "stylo-675",
  "src/components/theme-toggle.tsx:DropdownMenuItem::34:8": "stylo-676",
  "src/components/today/ai-chat-panel.tsx:Button:fixed bottom-20 right-6 h-12 w-12 rounded-full shadow-lg z-40:154:6": "stylo-677",
  "src/components/today/ai-chat-panel.tsx:MessageSquare:h-5 w-5:160:8": "stylo-678",
  "src/components/today/ai-chat-panel.tsx:Card:w-80 flex-shrink-0 flex flex-col h-[calc(100vh-200px)] max-h-[600px]:166:4": "stylo-679",
  "src/components/today/ai-chat-panel.tsx:CardHeader:pb-2 flex-shrink-0:167:6": "stylo-680",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center justify-between:168:8": "stylo-681",
  "src/components/today/ai-chat-panel.tsx:CardTitle:text-lg flex items-center gap-2:169:10": "stylo-682",
  "src/components/today/ai-chat-panel.tsx:Sparkles:h-4 w-4:170:12": "stylo-683",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center gap-1:173:10": "stylo-684",
  "src/components/today/ai-chat-panel.tsx:Button:h-8 w-8:175:12": "stylo-685",
  "src/components/today/ai-chat-panel.tsx:Trash2:h-4 w-4:182:16": "stylo-686",
  "src/components/today/ai-chat-panel.tsx:Button:h-8 w-8:185:12": "stylo-687",
  "src/components/today/ai-chat-panel.tsx:X:h-4 w-4:191:14": "stylo-688",
  "src/components/today/ai-chat-panel.tsx:CardContent:flex-1 flex flex-col p-3 pt-0 overflow-hidden:197:6": "stylo-689",
  "src/components/today/ai-chat-panel.tsx:Collapsible:mb-3:200:8": "stylo-690",
  "src/components/today/ai-chat-panel.tsx:CollapsibleTrigger::201:12": "stylo-691",
  "src/components/today/ai-chat-panel.tsx:Button:w-full justify-between h-8 px-2:202:14": "stylo-692",
  "src/components/today/ai-chat-panel.tsx:span:text-xs font-medium flex items-center gap-1:203:16": "stylo-693",
  "src/components/today/ai-chat-panel.tsx:Badge:ml-1 h-5 px-1.5:205:18": "stylo-694",
  "src/components/today/ai-chat-panel.tsx:ChevronDown:dynamic:209:16": "stylo-695",
  "src/components/today/ai-chat-panel.tsx:CollapsibleContent::212:12": "stylo-696",
  "src/components/today/ai-chat-panel.tsx:div:space-y-1 mt-1 p-2 bg-muted/50 rounded-md:213:14": "stylo-697",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center justify-between gap-2 text-xs py-1:215:14": "stylo-698",
  "src/components/today/ai-chat-panel.tsx:span:truncate flex-1:219:20": "stylo-699",
  "src/components/today/ai-chat-panel.tsx:Button:h-5 w-5 flex-shrink-0:220:20": "stylo-700",
  "src/components/today/ai-chat-panel.tsx:X:h-3 w-3:226:22": "stylo-701",
  "src/components/today/ai-chat-panel.tsx:Button:w-full h-6 text-xs text-muted-foreground mt-1:230:16": "stylo-702",
  "src/components/today/ai-chat-panel.tsx:ScrollArea:flex-1 pr-3:244:8": "stylo-703",
  "src/components/today/ai-chat-panel.tsx:div:space-y-3:245:10": "stylo-704",
  "src/components/today/ai-chat-panel.tsx:div:text-center text-muted-foreground py-8:247:12": "stylo-705",
  "src/components/today/ai-chat-panel.tsx:Sparkles:h-8 w-8 mx-auto mb-2 opacity-50:248:16": "stylo-706",
  "src/components/today/ai-chat-panel.tsx:p:text-sm:249:16": "stylo-707",
  "src/components/today/ai-chat-panel.tsx:p:text-xs mt-1:250:16": "stylo-708",
  "src/components/today/ai-chat-panel.tsx:p:text-xs mt-2 text-primary:252:14": "stylo-709",
  "src/components/today/ai-chat-panel.tsx:div:dynamic:259:12": "stylo-710",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center gap-2 text-muted-foreground p-3:273:12": "stylo-711",
  "src/components/today/ai-chat-panel.tsx:Loader2:h-4 w-4 animate-spin:274:16": "stylo-712",
  "src/components/today/ai-chat-panel.tsx:span:text-sm:275:16": "stylo-713",
  "src/components/today/ai-chat-panel.tsx:form:flex gap-2 mt-3 flex-shrink-0:282:8": "stylo-714",
  "src/components/today/ai-chat-panel.tsx:Input:flex-1:283:10": "stylo-715",
  "src/components/today/ai-chat-panel.tsx:Button::290:10": "stylo-716",
  "src/components/today/ai-chat-panel.tsx:Send:h-4 w-4:291:12": "stylo-717",
  "src/components/today/ai-recommend-button.tsx:Popover::92:4": "stylo-718",
  "src/components/today/ai-recommend-button.tsx:PopoverTrigger::93:6": "stylo-719",
  "src/components/today/ai-recommend-button.tsx:Button:fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40:94:8": "stylo-720",
  "src/components/today/ai-recommend-button.tsx:Loader2:h-6 w-6 animate-spin:105:10": "stylo-721",
  "src/components/today/ai-recommend-button.tsx:Sparkles:h-6 w-6:107:10": "stylo-722",
  "src/components/today/ai-recommend-button.tsx:PopoverContent:w-80 p-0:112:6": "stylo-723",
  "src/components/today/ai-recommend-button.tsx:div:p-4 border-b:118:8": "stylo-724",
  "src/components/today/ai-recommend-button.tsx:div:flex items-center justify-between:119:10": "stylo-725",
  "src/components/today/ai-recommend-button.tsx:h3:font-semibold flex items-center gap-2:120:12": "stylo-726",
  "src/components/today/ai-recommend-button.tsx:Sparkles:h-4 w-4:121:14": "stylo-727",
  "src/components/today/ai-recommend-button.tsx:Button:h-6 w-6:124:12": "stylo-728",
  "src/components/today/ai-recommend-button.tsx:X:h-4 w-4:130:14": "stylo-729",
  "src/components/today/ai-recommend-button.tsx:p:text-sm text-muted-foreground mt-2:134:10": "stylo-730",
  "src/components/today/ai-recommend-button.tsx:div:max-h-[300px] overflow-y-auto:138:8": "stylo-731",
  "src/components/today/ai-recommend-button.tsx:div:flex items-center justify-center py-8:140:10": "stylo-732",
  "src/components/today/ai-recommend-button.tsx:Loader2:h-6 w-6 animate-spin text-muted-foreground:141:14": "stylo-733",
  "src/components/today/ai-recommend-button.tsx:div:text-center py-8 text-muted-foreground:144:10": "stylo-734",
  "src/components/today/ai-recommend-button.tsx:p:text-sm:145:14": "stylo-735",
  "src/components/today/ai-recommend-button.tsx:Button:mt-2:146:14": "stylo-736",
  "src/components/today/ai-recommend-button.tsx:div:divide-y:156:10": "stylo-737",
  "src/components/today/ai-recommend-button.tsx:div:p-3 hover:bg-muted/50 transition-colors:158:12": "stylo-738",
  "src/components/today/ai-recommend-button.tsx:div:flex items-start justify-between gap-2:159:18": "stylo-739",
  "src/components/today/ai-recommend-button.tsx:div:flex-1 min-w-0:160:20": "stylo-740",
  "src/components/today/ai-recommend-button.tsx:div:font-medium text-sm truncate:161:22": "stylo-741",
  "src/components/today/ai-recommend-button.tsx:div:text-xs text-muted-foreground:162:22": "stylo-742",
  "src/components/today/ai-recommend-button.tsx:p:text-xs text-muted-foreground mt-1 line-clamp-2:165:22": "stylo-743",
  "src/components/today/ai-recommend-button.tsx:Button:h-8 w-8 flex-shrink-0:169:20": "stylo-744",
  "src/components/today/ai-recommend-button.tsx:Plus:h-4 w-4:175:22": "stylo-745",
  "src/components/today/ai-recommend-button.tsx:div:p-3 border-t:184:8": "stylo-746",
  "src/components/today/ai-recommend-button.tsx:Button:w-full:185:10": "stylo-747",
  "src/components/today/date-navigator.tsx:div:flex items-center gap-2:20:4": "stylo-748",
  "src/components/today/date-navigator.tsx:Button::21:6": "stylo-749",
  "src/components/today/date-navigator.tsx:ChevronLeft:h-4 w-4:27:8": "stylo-750",
  "src/components/today/date-navigator.tsx:div:flex items-center gap-2 min-w-[200px] justify-center:30:6": "stylo-751",
  "src/components/today/date-navigator.tsx:Calendar:h-4 w-4 text-muted-foreground:31:8": "stylo-752",
  "src/components/today/date-navigator.tsx:span:text-sm font-medium:32:8": "stylo-753",
  "src/components/today/date-navigator.tsx:Button::35:6": "stylo-754",
  "src/components/today/date-navigator.tsx:ChevronRight:h-4 w-4:41:8": "stylo-755",
  "src/components/today/date-navigator.tsx:Button:ml-2:45:6": "stylo-756",
  "src/components/today/item-source-picker.tsx:Dialog::111:4": "stylo-757",
  "src/components/today/item-source-picker.tsx:DialogContent:sm:max-w-lg:112:6": "stylo-758",
  "src/components/today/item-source-picker.tsx:DialogHeader::113:8": "stylo-759",
  "src/components/today/item-source-picker.tsx:DialogTitle::114:10": "stylo-760",
  "src/components/today/item-source-picker.tsx:div:relative:118:8": "stylo-761",
  "src/components/today/item-source-picker.tsx:Search:absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground:119:10": "stylo-762",
  "src/components/today/item-source-picker.tsx:Input:pl-9:120:10": "stylo-763",
  "src/components/today/item-source-picker.tsx:Tabs:flex-1:128:8": "stylo-764",
  "src/components/today/item-source-picker.tsx:TabsList:grid w-full grid-cols-2:129:10": "stylo-765",
  "src/components/today/item-source-picker.tsx:TabsTrigger::130:12": "stylo-766",
  "src/components/today/item-source-picker.tsx:TabsTrigger::131:12": "stylo-767",
  "src/components/today/item-source-picker.tsx:TabsContent:mt-4:134:10": "stylo-768",
  "src/components/today/item-source-picker.tsx:ScrollArea:h-[300px] pr-4:135:12": "stylo-769",
  "src/components/today/item-source-picker.tsx:p:text-center text-muted-foreground py-8:137:14": "stylo-770",
  "src/components/today/item-source-picker.tsx:div:space-y-2:141:14": "stylo-771",
  "src/components/today/item-source-picker.tsx:div:flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer:143:16": "stylo-772",
  "src/components/today/item-source-picker.tsx:Checkbox::148:22": "stylo-773",
  "src/components/today/item-source-picker.tsx:div:flex-1 min-w-0:152:22": "stylo-774",
  "src/components/today/item-source-picker.tsx:div:font-medium text-sm truncate:153:24": "stylo-775",
  "src/components/today/item-source-picker.tsx:div:text-xs text-muted-foreground:156:24": "stylo-776",
  "src/components/today/item-source-picker.tsx:TabsContent::167:10": "stylo-777",
  "src/components/today/item-source-picker.tsx:p:text-center text-muted-foreground py-8:168:12": "stylo-778",
  "src/components/today/item-source-picker.tsx:DialogFooter::174:8": "stylo-779",
  "src/components/today/item-source-picker.tsx:Button::175:10": "stylo-780",
  "src/components/today/item-source-picker.tsx:Button::178:10": "stylo-781",
  "src/components/today/quick-entry-panel.tsx:Card:today-entry-card:63:6": "stylo-782",
  "src/components/today/quick-entry-panel.tsx:CardContent:pt-4:64:8": "stylo-783",
  "src/components/today/quick-entry-panel.tsx:TooltipProvider::65:10": "stylo-784",
  "src/components/today/quick-entry-panel.tsx:form:flex gap-2 items-center:66:12": "stylo-785",
  "src/components/today/quick-entry-panel.tsx:Tooltip::67:14": "stylo-786",
  "src/components/today/quick-entry-panel.tsx:TooltipTrigger::68:16": "stylo-787",
  "src/components/today/quick-entry-panel.tsx:Button::69:18": "stylo-788",
  "src/components/today/quick-entry-panel.tsx:ListTodo:h-4 w-4:75:20": "stylo-789",
  "src/components/today/quick-entry-panel.tsx:TooltipContent::78:16": "stylo-790",
  "src/components/today/quick-entry-panel.tsx:Input:flex-1:80:14": "stylo-791",
  "src/components/today/quick-entry-panel.tsx:Tooltip::86:14": "stylo-792",
  "src/components/today/quick-entry-panel.tsx:TooltipTrigger::87:16": "stylo-793",
  "src/components/today/quick-entry-panel.tsx:Button::88:18": "stylo-794",
  "src/components/today/quick-entry-panel.tsx:Plus:h-4 w-4:89:20": "stylo-795",
  "src/components/today/quick-entry-panel.tsx:TooltipContent::92:16": "stylo-796",
  "src/components/today/quick-entry-panel.tsx:Tooltip::94:14": "stylo-797",
  "src/components/today/quick-entry-panel.tsx:TooltipTrigger::95:16": "stylo-798",
  "src/components/today/quick-entry-panel.tsx:Button::96:18": "stylo-799",
  "src/components/today/quick-entry-panel.tsx:MessageSquarePlus:h-4 w-4:103:20": "stylo-800",
  "src/components/today/quick-entry-panel.tsx:TooltipContent::106:16": "stylo-801",
  "src/components/today/quick-entry-panel.tsx:ItemSourcePicker::113:6": "stylo-802",
  "src/components/today/timeline-item.tsx:div:dynamic:116:4": "stylo-803",
  "src/components/today/timeline-item.tsx:div:absolute left-0 top-0 bottom-0 w-6 cursor-grab active:cursor-grabbing flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity:135:6": "stylo-804",
  "src/components/today/timeline-item.tsx:GripVertical:h-4 w-4:142:8": "stylo-805",
  "src/components/today/timeline-item.tsx:div:flex items-start gap-2 pl-5 pr-8:146:6": "stylo-806",
  "src/components/today/timeline-item.tsx:Checkbox:mt-0.5:147:8": "stylo-807",
  "src/components/today/timeline-item.tsx:div:flex-1 min-w-0:152:8": "stylo-808",
  "src/components/today/timeline-item.tsx:div:dynamic:153:10": "stylo-809",
  "src/components/today/timeline-item.tsx:div:text-xs text-muted-foreground:159:10": "stylo-810",
  "src/components/today/timeline-item.tsx:Button:absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive:166:6": "stylo-811",
  "src/components/today/timeline-item.tsx:Trash2:h-3 w-3:172:8": "stylo-812",
  "src/components/today/timeline-item.tsx:div:absolute left-2 right-2 bottom-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity:176:6": "stylo-813",
  "src/components/today/timeline-item.tsx:div:w-8 h-1 bg-muted-foreground/50 rounded mx-auto mt-0.5:183:8": "stylo-814",
  "src/components/today/timeline-view.tsx:div:today-hour-marker absolute left-0 right-0 flex items-start:68:6": "stylo-815",
  "src/components/today/timeline-view.tsx:span:w-16 text-xs text-muted-foreground pr-2 text-right flex-shrink-0:73:8": "stylo-816",
  "src/components/today/timeline-view.tsx:div:flex-1 border-t border-border/30 mt-2:76:8": "stylo-817",
  "src/components/today/timeline-view.tsx:Card:today-timeline-card flex-1:83:6": "stylo-818",
  "src/components/today/timeline-view.tsx:CardContent:p-4:84:8": "stylo-819",
  "src/components/today/timeline-view.tsx:div:animate-pulse space-y-4:85:10": "stylo-820",
  "src/components/today/timeline-view.tsx:div:h-8 bg-muted rounded:86:12": "stylo-821",
  "src/components/today/timeline-view.tsx:div:h-64 bg-muted rounded:87:12": "stylo-822",
  "src/components/today/timeline-view.tsx:Card:today-timeline-card flex-1 overflow-hidden:95:4": "stylo-823",
  "src/components/today/timeline-view.tsx:CardContent:p-0:96:6": "stylo-824",
  "src/components/today/timeline-view.tsx:div:today-timeline-scroll overflow-y-auto:97:8": "stylo-825",
  "src/components/today/timeline-view.tsx:div:today-timeline relative ml-16:102:10": "stylo-826",
  "src/components/today/timeline-view.tsx:div:absolute inset-0 -ml-16:107:12": "stylo-827",
  "src/components/today/timeline-view.tsx:div:today-current-time-indicator absolute left-0 right-0 z-20 pointer-events-none:113:12": "stylo-828",
  "src/components/today/timeline-view.tsx:div:relative:117:16": "stylo-829",
  "src/components/today/timeline-view.tsx:div:absolute -left-16 -top-2 w-3 h-3 rounded-full bg-destructive:118:18": "stylo-830",
  "src/components/today/timeline-view.tsx:div:h-0.5 bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]:119:18": "stylo-831",
  "src/components/today/timeline-view.tsx:div:absolute inset-0 pr-4:125:12": "stylo-832",
  "src/components/today/timeline-view.tsx:TimelineItem::127:14": "stylo-833",
  "src/components/today/timeline-view.tsx:div:absolute inset-0 flex items-center justify-center text-muted-foreground:133:12": "stylo-834",
  "src/components/today/timeline-view.tsx:p:text-center:134:16": "stylo-835",
  "src/components/today/timeline-view.tsx:br::135:37": "stylo-836",
  "src/components/today/timeline-view.tsx:span:text-sm:136:18": "stylo-837",
  "src/components/today/today-page.tsx:TodayProvider::13:4": "stylo-838",
  "src/components/today/today-page.tsx:div:today-page flex flex-col gap-4 relative:14:6": "stylo-839",
  "src/components/today/today-page.tsx:Card:today-header-card:16:8": "stylo-840",
  "src/components/today/today-page.tsx:CardHeader:pb-2:17:10": "stylo-841",
  "src/components/today/today-page.tsx:div:flex items-center justify-between:18:12": "stylo-842",
  "src/components/today/today-page.tsx:div::19:14": "stylo-843",
  "src/components/today/today-page.tsx:CardTitle:text-2xl font-headline:20:16": "stylo-844",
  "src/components/today/today-page.tsx:CardDescription::21:16": "stylo-845",
  "src/components/today/today-page.tsx:DateNavigator::23:14": "stylo-846",
  "src/components/today/today-page.tsx:div:flex gap-4 flex-1:29:8": "stylo-847",
  "src/components/today/today-page.tsx:div:flex-1 flex flex-col gap-4 min-w-0:31:10": "stylo-848",
  "src/components/today/today-page.tsx:QuickEntryPanel::33:12": "stylo-849",
  "src/components/today/today-page.tsx:TimelineView::36:12": "stylo-850",
  "src/components/today/today-page.tsx:AIChatPanel::40:10": "stylo-851",
  "src/components/today/today-page.tsx:AIRecommendButton::44:8": "stylo-852",
  "src/app/(app)/dashboard/page.tsx:div:space-y-6:7:4": "stylo-853",
  "src/app/(app)/dashboard/page.tsx:DashboardSummary::8:6": "stylo-854",
  "src/app/(app)/dashboard/page.tsx:ProjectList::9:6": "stylo-855",
  "src/app/(app)/domain/[domain]/page.tsx:div:space-y-6:76:4": "stylo-856",
  "src/app/(app)/domain/[domain]/page.tsx:div:rounded-xl p-6 relative overflow-hidden:78:6": "stylo-857",
  "src/app/(app)/domain/[domain]/page.tsx:div:relative z-10:82:8": "stylo-858",
  "src/app/(app)/domain/[domain]/page.tsx:Link::83:10": "stylo-859",
  "src/app/(app)/domain/[domain]/page.tsx:Button:mb-4 text-white/80 hover:text-white hover:bg-white/10:84:12": "stylo-860",
  "src/app/(app)/domain/[domain]/page.tsx:ArrowLeft:mr-2 h-4 w-4:85:14": "stylo-861",
  "src/app/(app)/domain/[domain]/page.tsx:div:flex items-center gap-4:90:10": "stylo-862",
  "src/app/(app)/domain/[domain]/page.tsx:div:p-4 rounded-full bg-white/20 backdrop-blur-sm:91:12": "stylo-863",
  "src/app/(app)/domain/[domain]/page.tsx:Icon:h-10 w-10 text-white:92:14": "stylo-864",
  "src/app/(app)/domain/[domain]/page.tsx:div::94:12": "stylo-865",
  "src/app/(app)/domain/[domain]/page.tsx:h1:text-3xl font-headline text-white:95:14": "stylo-866",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-white/80:96:14": "stylo-867",
  "src/app/(app)/domain/[domain]/page.tsx:div:absolute top-0 right-0 opacity-10:104:8": "stylo-868",
  "src/app/(app)/domain/[domain]/page.tsx:Icon:h-64 w-64 -translate-y-10 translate-x-10:105:10": "stylo-869",
  "src/app/(app)/domain/[domain]/page.tsx:div:grid grid-cols-2 md:grid-cols-4 gap-4:110:6": "stylo-870",
  "src/app/(app)/domain/[domain]/page.tsx:Card:dashboard-metrics-card:111:8": "stylo-871",
  "src/app/(app)/domain/[domain]/page.tsx:CardHeader:p-4:112:10": "stylo-872",
  "src/app/(app)/domain/[domain]/page.tsx:CardTitle:text-sm text-muted-foreground:113:12": "stylo-873",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold:114:12": "stylo-874",
  "src/app/(app)/domain/[domain]/page.tsx:Card:dashboard-metrics-card:119:8": "stylo-875",
  "src/app/(app)/domain/[domain]/page.tsx:CardHeader:p-4:120:10": "stylo-876",
  "src/app/(app)/domain/[domain]/page.tsx:CardTitle:text-sm text-muted-foreground:121:12": "stylo-877",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold text-green-400:122:12": "stylo-878",
  "src/app/(app)/domain/[domain]/page.tsx:Card:dashboard-metrics-card:127:8": "stylo-879",
  "src/app/(app)/domain/[domain]/page.tsx:CardHeader:p-4:128:10": "stylo-880",
  "src/app/(app)/domain/[domain]/page.tsx:CardTitle:text-sm text-muted-foreground:129:12": "stylo-881",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold text-blue-400:130:12": "stylo-882",
  "src/app/(app)/domain/[domain]/page.tsx:Card:dashboard-metrics-card:135:8": "stylo-883",
  "src/app/(app)/domain/[domain]/page.tsx:CardHeader:p-4:136:10": "stylo-884",
  "src/app/(app)/domain/[domain]/page.tsx:CardTitle:text-sm text-muted-foreground:137:12": "stylo-885",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold text-cyan-400:138:12": "stylo-886",
  "src/app/(app)/domain/[domain]/page.tsx:div:flex flex-col sm:flex-row gap-4:146:6": "stylo-887",
  "src/app/(app)/domain/[domain]/page.tsx:SearchBar:flex-1:147:8": "stylo-888",
  "src/app/(app)/domain/[domain]/page.tsx:Button:btn-primary-glass:153:8": "stylo-889",
  "src/app/(app)/domain/[domain]/page.tsx:PlusCircle:mr-2 h-4 w-4:157:10": "stylo-890",
  "src/app/(app)/domain/[domain]/page.tsx:Tabs::163:6": "stylo-891",
  "src/app/(app)/domain/[domain]/page.tsx:TabsList:bg-muted/30 border border-border/50:164:8": "stylo-892",
  "src/app/(app)/domain/[domain]/page.tsx:TabsTrigger:data-[state=active]:bg-primary/20:165:10": "stylo-893",
  "src/app/(app)/domain/[domain]/page.tsx:Badge:ml-2 text-xs:167:12": "stylo-894",
  "src/app/(app)/domain/[domain]/page.tsx:TabsTrigger:data-[state=active]:bg-primary/20:172:10": "stylo-895",
  "src/app/(app)/domain/[domain]/page.tsx:span:h-2 w-2 rounded-full mr-2:177:14": "stylo-896",
  "src/app/(app)/domain/[domain]/page.tsx:Badge:ml-2 text-xs:183:12": "stylo-897",
  "src/app/(app)/domain/[domain]/page.tsx:div:grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4:194:6": "stylo-898",
  "src/app/(app)/domain/[domain]/page.tsx:ProjectCard::196:8": "stylo-899",
  "src/app/(app)/domain/[domain]/page.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:200:6": "stylo-900",
  "src/app/(app)/domain/[domain]/page.tsx:h3:text-xl font-semibold text-muted-foreground:201:10": "stylo-901",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-muted-foreground mt-2:202:10": "stylo-902",
  "src/app/(app)/domain/[domain]/page.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:207:6": "stylo-903",
  "src/app/(app)/domain/[domain]/page.tsx:Icon:h-16 w-16 mx-auto mb-4 text-muted-foreground/50:208:10": "stylo-904",
  "src/app/(app)/domain/[domain]/page.tsx:h3:text-xl font-semibold text-muted-foreground:209:10": "stylo-905",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-muted-foreground mt-2:212:10": "stylo-906",
  "src/app/(app)/domain/[domain]/page.tsx:Button:mt-4:215:10": "stylo-907",
  "src/app/(app)/domain/[domain]/page.tsx:PlusCircle:mr-2 h-4 w-4:216:12": "stylo-908",
  "src/app/(app)/domain/[domain]/page.tsx:ProjectForm::222:6": "stylo-909",
  "src/app/(app)/import/page.tsx:div:space-y-6 max-w-4xl mx-auto:207:4": "stylo-910",
  "src/app/(app)/import/page.tsx:div:flex items-center justify-between:208:6": "stylo-911",
  "src/app/(app)/import/page.tsx:div:flex items-center gap-3:209:8": "stylo-912",
  "src/app/(app)/import/page.tsx:div:p-2 rounded-lg bg-primary/10:210:10": "stylo-913",
  "src/app/(app)/import/page.tsx:FolderInput:h-6 w-6 text-primary:211:12": "stylo-914",
  "src/app/(app)/import/page.tsx:div::213:10": "stylo-915",
  "src/app/(app)/import/page.tsx:h1:text-2xl font-bold tracking-tight:214:12": "stylo-916",
  "src/app/(app)/import/page.tsx:p:text-muted-foreground:215:12": "stylo-917",
  "src/app/(app)/import/page.tsx:Dialog::221:8": "stylo-918",
  "src/app/(app)/import/page.tsx:DialogTrigger::222:10": "stylo-919",
  "src/app/(app)/import/page.tsx:Button:gap-2:223:12": "stylo-920",
  "src/app/(app)/import/page.tsx:HelpCircle:h-4 w-4:224:14": "stylo-921",
  "src/app/(app)/import/page.tsx:DialogContent:max-w-2xl max-h-[85vh] overflow-y-auto:228:10": "stylo-922",
  "src/app/(app)/import/page.tsx:DialogHeader::229:12": "stylo-923",
  "src/app/(app)/import/page.tsx:DialogTitle::230:14": "stylo-924",
  "src/app/(app)/import/page.tsx:DialogDescription::231:14": "stylo-925",
  "src/app/(app)/import/page.tsx:div:space-y-6 mt-4:236:12": "stylo-926",
  "src/app/(app)/import/page.tsx:div:space-y-3:238:14": "stylo-927",
  "src/app/(app)/import/page.tsx:h3:font-semibold flex items-center gap-2:239:16": "stylo-928",
  "src/app/(app)/import/page.tsx:FileText:h-5 w-5 text-primary:240:18": "stylo-929",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground:243:16": "stylo-930",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4 space-y-2:247:16": "stylo-931",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide:248:18": "stylo-932",
  "src/app/(app)/import/page.tsx:pre:text-sm font-mono bg-background rounded p-3 overflow-x-auto:249:18": "stylo-933",
  "src/app/(app)/import/page.tsx:div:text-sm space-y-2:255:16": "stylo-934",
  "src/app/(app)/import/page.tsx:p:font-medium:256:18": "stylo-935",
  "src/app/(app)/import/page.tsx:ul:list-disc list-inside space-y-1 text-muted-foreground ml-2:257:18": "stylo-936",
  "src/app/(app)/import/page.tsx:li::258:20": "stylo-937",
  "src/app/(app)/import/page.tsx:strong::258:36": "stylo-938",
  "src/app/(app)/import/page.tsx:li::259:20": "stylo-939",
  "src/app/(app)/import/page.tsx:strong::259:36": "stylo-940",
  "src/app/(app)/import/page.tsx:li::260:20": "stylo-941",
  "src/app/(app)/import/page.tsx:strong::260:36": "stylo-942",
  "src/app/(app)/import/page.tsx:li::261:20": "stylo-943",
  "src/app/(app)/import/page.tsx:strong::261:36": "stylo-944",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4:265:16": "stylo-945",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2:266:18": "stylo-946",
  "src/app/(app)/import/page.tsx:div:grid grid-cols-2 gap-2 text-sm:267:18": "stylo-947",
  "src/app/(app)/import/page.tsx:div::268:20": "stylo-948",
  "src/app/(app)/import/page.tsx:code:text-xs:268:37": "stylo-949",
  "src/app/(app)/import/page.tsx:div::269:20": "stylo-950",
  "src/app/(app)/import/page.tsx:code:text-xs:269:37": "stylo-951",
  "src/app/(app)/import/page.tsx:div::270:20": "stylo-952",
  "src/app/(app)/import/page.tsx:code:text-xs:270:37": "stylo-953",
  "src/app/(app)/import/page.tsx:div::271:20": "stylo-954",
  "src/app/(app)/import/page.tsx:code:text-xs:271:37": "stylo-955",
  "src/app/(app)/import/page.tsx:div::272:20": "stylo-956",
  "src/app/(app)/import/page.tsx:code:text-xs:272:37": "stylo-957",
  "src/app/(app)/import/page.tsx:Separator::277:14": "stylo-958",
  "src/app/(app)/import/page.tsx:div:space-y-3:280:14": "stylo-959",
  "src/app/(app)/import/page.tsx:h3:font-semibold flex items-center gap-2:281:16": "stylo-960",
  "src/app/(app)/import/page.tsx:Inbox:h-5 w-5 text-primary:282:18": "stylo-961",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground:285:16": "stylo-962",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4 space-y-2:289:16": "stylo-963",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide:290:18": "stylo-964",
  "src/app/(app)/import/page.tsx:pre:text-sm font-mono bg-background rounded p-3 overflow-x-auto:291:18": "stylo-965",
  "src/app/(app)/import/page.tsx:div:text-sm space-y-2:299:16": "stylo-966",
  "src/app/(app)/import/page.tsx:p:font-medium:300:18": "stylo-967",
  "src/app/(app)/import/page.tsx:ul:list-disc list-inside space-y-1 text-muted-foreground ml-2:301:18": "stylo-968",
  "src/app/(app)/import/page.tsx:li::302:20": "stylo-969",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:302:36": "stylo-970",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:302:112": "stylo-971",
  "src/app/(app)/import/page.tsx:li::303:20": "stylo-972",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:303:36": "stylo-973",
  "src/app/(app)/import/page.tsx:li::304:20": "stylo-974",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:304:36": "stylo-975",
  "src/app/(app)/import/page.tsx:li::305:20": "stylo-976",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4:309:16": "stylo-977",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2:310:18": "stylo-978",
  "src/app/(app)/import/page.tsx:div:flex flex-wrap gap-2:311:18": "stylo-979",
  "src/app/(app)/import/page.tsx:Badge::313:20": "stylo-980",
  "src/app/(app)/import/page.tsx:Separator::321:14": "stylo-981",
  "src/app/(app)/import/page.tsx:div:space-y-3:324:14": "stylo-982",
  "src/app/(app)/import/page.tsx:h3:font-semibold:325:16": "stylo-983",
  "src/app/(app)/import/page.tsx:ul:text-sm space-y-2 text-muted-foreground:326:16": "stylo-984",
  "src/app/(app)/import/page.tsx:li:flex gap-2:327:18": "stylo-985",
  "src/app/(app)/import/page.tsx:CheckCircle2:h-4 w-4 text-green-500 mt-0.5 shrink-0:328:20": "stylo-986",
  "src/app/(app)/import/page.tsx:span::329:20": "stylo-987",
  "src/app/(app)/import/page.tsx:strong::329:42": "stylo-988",
  "src/app/(app)/import/page.tsx:li:flex gap-2:331:18": "stylo-989",
  "src/app/(app)/import/page.tsx:CheckCircle2:h-4 w-4 text-green-500 mt-0.5 shrink-0:332:20": "stylo-990",
  "src/app/(app)/import/page.tsx:span::333:20": "stylo-991",
  "src/app/(app)/import/page.tsx:strong::333:59": "stylo-992",
  "src/app/(app)/import/page.tsx:li:flex gap-2:335:18": "stylo-993",
  "src/app/(app)/import/page.tsx:CheckCircle2:h-4 w-4 text-green-500 mt-0.5 shrink-0:336:20": "stylo-994",
  "src/app/(app)/import/page.tsx:span::337:20": "stylo-995",
  "src/app/(app)/import/page.tsx:strong::337:56": "stylo-996",
  "src/app/(app)/import/page.tsx:li:flex gap-2:339:18": "stylo-997",
  "src/app/(app)/import/page.tsx:CheckCircle2:h-4 w-4 text-green-500 mt-0.5 shrink-0:340:20": "stylo-998",
  "src/app/(app)/import/page.tsx:span::341:20": "stylo-999",
  "src/app/(app)/import/page.tsx:strong::341:49": "stylo-1000",
  "src/app/(app)/import/page.tsx:Tabs:w-full:350:6": "stylo-1001",
  "src/app/(app)/import/page.tsx:TabsList:grid w-full grid-cols-2:351:8": "stylo-1002",
  "src/app/(app)/import/page.tsx:TabsTrigger:flex items-center gap-2:352:10": "stylo-1003",
  "src/app/(app)/import/page.tsx:FileText:h-4 w-4:353:12": "stylo-1004",
  "src/app/(app)/import/page.tsx:TabsTrigger:flex items-center gap-2:356:10": "stylo-1005",
  "src/app/(app)/import/page.tsx:Inbox:h-4 w-4:357:12": "stylo-1006",
  "src/app/(app)/import/page.tsx:TabsContent:space-y-6 mt-6:362:8": "stylo-1007",
  "src/app/(app)/import/page.tsx:Card::363:10": "stylo-1008",
  "src/app/(app)/import/page.tsx:CardHeader::364:12": "stylo-1009",
  "src/app/(app)/import/page.tsx:CardTitle:text-lg:365:14": "stylo-1010",
  "src/app/(app)/import/page.tsx:CardDescription::366:14": "stylo-1011",
  "src/app/(app)/import/page.tsx:CardContent:space-y-4:370:8": "stylo-1012",
  "src/app/(app)/import/page.tsx:Textarea:font-mono text-sm:371:10": "stylo-1013",
  "src/app/(app)/import/page.tsx:div::381:10": "stylo-1014",
  "src/app/(app)/import/page.tsx:label:text-sm font-medium mb-2 block:382:12": "stylo-1015",
  "src/app/(app)/import/page.tsx:Textarea::383:12": "stylo-1016",
  "src/app/(app)/import/page.tsx:CardFooter::391:8": "stylo-1017",
  "src/app/(app)/import/page.tsx:Button::392:10": "stylo-1018",
  "src/app/(app)/import/page.tsx:Loader2:mr-2 h-4 w-4 animate-spin:395:16": "stylo-1019",
  "src/app/(app)/import/page.tsx:Sparkles:mr-2 h-4 w-4:400:16": "stylo-1020",
  "src/app/(app)/import/page.tsx:Alert::411:12": "stylo-1021",
  "src/app/(app)/import/page.tsx:FileWarning:h-4 w-4:412:14": "stylo-1022",
  "src/app/(app)/import/page.tsx:AlertTitle::413:14": "stylo-1023",
  "src/app/(app)/import/page.tsx:AlertDescription::414:14": "stylo-1024",
  "src/app/(app)/import/page.tsx:ul:mt-2 space-y-1 text-sm:415:16": "stylo-1025",
  "src/app/(app)/import/page.tsx:li:font-mono:417:18": "stylo-1026",
  "src/app/(app)/import/page.tsx:span:text-muted-foreground:418:22": "stylo-1027",
  "src/app/(app)/import/page.tsx:Card::427:12": "stylo-1028",
  "src/app/(app)/import/page.tsx:CardHeader::428:14": "stylo-1029",
  "src/app/(app)/import/page.tsx:div:flex items-center justify-between:429:16": "stylo-1030",
  "src/app/(app)/import/page.tsx:div::430:18": "stylo-1031",
  "src/app/(app)/import/page.tsx:CardTitle:text-lg flex items-center gap-2:431:20": "stylo-1032",
  "src/app/(app)/import/page.tsx:CheckCircle2:h-5 w-5 text-green-500:432:22": "stylo-1033",
  "src/app/(app)/import/page.tsx:CardDescription::435:20": "stylo-1034",
  "src/app/(app)/import/page.tsx:Button::439:18": "stylo-1035",
  "src/app/(app)/import/page.tsx:CardContent::444:14": "stylo-1036",
  "src/app/(app)/import/page.tsx:ScrollArea:h-[400px] pr-4:445:16": "stylo-1037",
  "src/app/(app)/import/page.tsx:div:space-y-4:446:18": "stylo-1038",
  "src/app/(app)/import/page.tsx:div:dynamic:452:24": "stylo-1039",
  "src/app/(app)/import/page.tsx:div:flex items-start gap-3:459:26": "stylo-1040",
  "src/app/(app)/import/page.tsx:Checkbox::460:28": "stylo-1041",
  "src/app/(app)/import/page.tsx:div:flex-1 min-w-0:465:28": "stylo-1042",
  "src/app/(app)/import/page.tsx:div:flex items-center gap-2 flex-wrap:466:30": "stylo-1043",
  "src/app/(app)/import/page.tsx:h3:font-semibold:467:32": "stylo-1044",
  "src/app/(app)/import/page.tsx:Badge::469:32": "stylo-1045",
  "src/app/(app)/import/page.tsx:Badge::479:32": "stylo-1046",
  "src/app/(app)/import/page.tsx:Badge::482:32": "stylo-1047",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground mt-1:486:30": "stylo-1048",
  "src/app/(app)/import/page.tsx:div:flex gap-1 mt-2 flex-wrap:490:30": "stylo-1049",
  "src/app/(app)/import/page.tsx:Badge:text-xs:492:32": "stylo-1050",
  "src/app/(app)/import/page.tsx:div:mt-3:499:30": "stylo-1051",
  "src/app/(app)/import/page.tsx:p:text-xs text-muted-foreground mb-1:500:34": "stylo-1052",
  "src/app/(app)/import/page.tsx:ul:text-sm space-y-1:503:34": "stylo-1053",
  "src/app/(app)/import/page.tsx:li:flex items-center gap-2:505:34": "stylo-1054",
  "src/app/(app)/import/page.tsx:span:w-1.5 h-1.5 rounded-full bg-muted-foreground:506:40": "stylo-1055",
  "src/app/(app)/import/page.tsx:li:text-muted-foreground text-xs:511:34": "stylo-1056",
  "src/app/(app)/import/page.tsx:p:text-xs text-muted-foreground mt-2 font-mono truncate:518:30": "stylo-1057",
  "src/app/(app)/import/page.tsx:Separator::529:14": "stylo-1058",
  "src/app/(app)/import/page.tsx:CardFooter:pt-4:530:14": "stylo-1059",
  "src/app/(app)/import/page.tsx:Button:w-full:531:16": "stylo-1060",
  "src/app/(app)/import/page.tsx:Loader2:mr-2 h-4 w-4 animate-spin:538:22": "stylo-1061",
  "src/app/(app)/import/page.tsx:Alert::550:12": "stylo-1062",
  "src/app/(app)/import/page.tsx:AlertCircle:h-4 w-4:551:14": "stylo-1063",
  "src/app/(app)/import/page.tsx:AlertTitle::552:14": "stylo-1064",
  "src/app/(app)/import/page.tsx:AlertDescription::553:14": "stylo-1065",
  "src/app/(app)/import/page.tsx:TabsContent:space-y-6 mt-6:563:8": "stylo-1066",
  "src/app/(app)/import/page.tsx:Card::564:10": "stylo-1067",
  "src/app/(app)/import/page.tsx:CardHeader::565:12": "stylo-1068",
  "src/app/(app)/import/page.tsx:CardTitle:text-lg:566:14": "stylo-1069",
  "src/app/(app)/import/page.tsx:CardDescription::567:14": "stylo-1070",
  "src/app/(app)/import/page.tsx:CardContent:space-y-4:571:12": "stylo-1071",
  "src/app/(app)/import/page.tsx:Textarea:font-mono text-sm:572:14": "stylo-1072",
  "src/app/(app)/import/page.tsx:div:text-xs text-muted-foreground space-y-1:583:14": "stylo-1073",
  "src/app/(app)/import/page.tsx:p::584:16": "stylo-1074",
  "src/app/(app)/import/page.tsx:strong::584:31": "stylo-1075",
  "src/app/(app)/import/page.tsx:p::585:16": "stylo-1076",
  "src/app/(app)/import/page.tsx:strong::585:31": "stylo-1077",
  "src/app/(app)/import/page.tsx:p::586:16": "stylo-1078",
  "src/app/(app)/import/page.tsx:strong::586:31": "stylo-1079",
  "src/app/(app)/import/page.tsx:CardFooter::589:12": "stylo-1080",
  "src/app/(app)/import/page.tsx:Button::590:14": "stylo-1081",
  "src/app/(app)/import/page.tsx:Inbox:mr-2 h-4 w-4:591:16": "stylo-1082",
  "src/app/(app)/import/page.tsx:Card::598:10": "stylo-1083",
  "src/app/(app)/import/page.tsx:CardHeader::599:14": "stylo-1084",
  "src/app/(app)/import/page.tsx:CardTitle:text-lg flex items-center gap-2:600:16": "stylo-1085",
  "src/app/(app)/import/page.tsx:CheckCircle2:h-5 w-5 text-green-500:601:18": "stylo-1086",
  "src/app/(app)/import/page.tsx:CardDescription::604:16": "stylo-1087",
  "src/app/(app)/import/page.tsx:CardContent::608:14": "stylo-1088",
  "src/app/(app)/import/page.tsx:div:space-y-3:609:16": "stylo-1089",
  "src/app/(app)/import/page.tsx:div:dynamic:615:20": "stylo-1090",
  "src/app/(app)/import/page.tsx:div:flex items-start gap-3:622:24": "stylo-1091",
  "src/app/(app)/import/page.tsx:Checkbox::623:26": "stylo-1092",
  "src/app/(app)/import/page.tsx:div:flex-1:628:26": "stylo-1093",
  "src/app/(app)/import/page.tsx:div:flex items-center gap-2 flex-wrap:629:28": "stylo-1094",
  "src/app/(app)/import/page.tsx:span:font-medium:630:30": "stylo-1095",
  "src/app/(app)/import/page.tsx:Badge::632:28": "stylo-1096",
  "src/app/(app)/import/page.tsx:Badge:text-xs:640:28": "stylo-1097",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground mt-1:646:26": "stylo-1098",
  "src/app/(app)/import/page.tsx:Separator::657:14": "stylo-1099",
  "src/app/(app)/import/page.tsx:CardFooter:pt-4:658:14": "stylo-1100",
  "src/app/(app)/import/page.tsx:Button:w-full:659:16": "stylo-1101",
  "src/app/(app)/import/page.tsx:Loader2:mr-2 h-4 w-4 animate-spin:666:22": "stylo-1102",
  "src/app/(app)/import/page.tsx:Alert::682:6": "stylo-1103",
  "src/app/(app)/import/page.tsx:AlertCircle:h-4 w-4:683:10": "stylo-1104",
  "src/app/(app)/import/page.tsx:AlertTitle::684:10": "stylo-1105",
  "src/app/(app)/import/page.tsx:AlertDescription::685:10": "stylo-1106",
  "src/app/(app)/layout.tsx:SettingsProvider::17:4": "stylo-1107",
  "src/app/(app)/layout.tsx:ProjectProvider::18:6": "stylo-1108",
  "src/app/(app)/layout.tsx:div:app-background-panel fixed inset-0 -z-10:20:6": "stylo-1109",
  "src/app/(app)/layout.tsx:div:flex min-h-screen w-full flex-col bg-muted/40:23:6": "stylo-1110",
  "src/app/(app)/layout.tsx:AppSidebar::24:8": "stylo-1111",
  "src/app/(app)/layout.tsx:div:flex flex-col sm:gap-4 sm:py-4 sm:pl-14:25:8": "stylo-1112",
  "src/app/(app)/layout.tsx:Header::26:10": "stylo-1113",
  "src/app/(app)/layout.tsx:main:grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8:27:10": "stylo-1114",
  "src/app/(app)/layout.tsx:FilterInitializer::34:6": "stylo-1115",
  "src/app/(app)/prioritize/page.tsx:div:space-y-2:5:4": "stylo-1116",
  "src/app/(app)/prioritize/page.tsx:div:flex items-center justify-between:6:13": "stylo-1117",
  "src/app/(app)/prioritize/page.tsx:div:space-y-1:7:16": "stylo-1118",
  "src/app/(app)/prioritize/page.tsx:h1:text-2xl font-bold tracking-tight:8:20": "stylo-1119",
  "src/app/(app)/prioritize/page.tsx:p:text-muted-foreground max-w-2xl:9:20": "stylo-1120",
  "src/app/(app)/prioritize/page.tsx:div:pt-4:14:12": "stylo-1121",
  "src/app/(app)/prioritize/page.tsx:PrioritizationForm::15:14": "stylo-1122",
  "src/app/(app)/settings/page.tsx:Card::23:4": "stylo-1123",
  "src/app/(app)/settings/page.tsx:CardHeader::24:6": "stylo-1124",
  "src/app/(app)/settings/page.tsx:CardTitle::25:8": "stylo-1125",
  "src/app/(app)/settings/page.tsx:CardDescription::26:8": "stylo-1126",
  "src/app/(app)/settings/page.tsx:CardContent:space-y-6:28:6": "stylo-1127",
  "src/app/(app)/settings/page.tsx:div:text-sm text-muted-foreground:30:8": "stylo-1128",
  "src/app/(app)/settings/page.tsx:div:flex items-center justify-between:32:8": "stylo-1129",
  "src/app/(app)/settings/page.tsx:div::33:10": "stylo-1130",
  "src/app/(app)/settings/page.tsx:Label::34:12": "stylo-1131",
  "src/app/(app)/settings/page.tsx:p:text-sm text-muted-foreground:35:12": "stylo-1132",
  "src/app/(app)/settings/page.tsx:Switch::37:10": "stylo-1133",
  "src/app/(app)/settings/page.tsx:div:flex items-center justify-between:39:8": "stylo-1134",
  "src/app/(app)/settings/page.tsx:div::40:10": "stylo-1135",
  "src/app/(app)/settings/page.tsx:Label::41:12": "stylo-1136",
  "src/app/(app)/settings/page.tsx:p:text-sm text-muted-foreground:42:12": "stylo-1137",
  "src/app/(app)/settings/page.tsx:Switch::44:10": "stylo-1138",
  "src/app/(app)/tasks/page.tsx:div:space-y-4:5:4": "stylo-1139",
  "src/app/(app)/tasks/page.tsx:TaskList::6:12": "stylo-1140",
  "src/app/(app)/today/page.tsx:div:space-y-4:5:4": "stylo-1141",
  "src/app/(app)/today/page.tsx:TodayPageContent::6:6": "stylo-1142",
  "src/app/layout.tsx:html::19:4": "stylo-1143",
  "src/app/layout.tsx:head::20:6": "stylo-1144",
  "src/app/layout.tsx:link::21:8": "stylo-1145",
  "src/app/layout.tsx:link::22:8": "stylo-1146",
  "src/app/layout.tsx:link::23:8": "stylo-1147",
  "src/app/layout.tsx:body:font-body antialiased browzr-skin:25:6": "stylo-1148",
  "src/app/layout.tsx:ThemeProvider::26:8": "stylo-1149",
  "src/app/layout.tsx:AutoIdInjector::32:10": "stylo-1150",
  "src/app/layout.tsx:Toaster::34:10": "stylo-1151",
  "src/app/login/page.tsx:div:flex items-center justify-center min-h-[60vh] p-4:47:4": "stylo-1152",
  "src/app/login/page.tsx:Card:w-full max-w-md:48:6": "stylo-1153",
  "src/app/login/page.tsx:CardHeader::49:8": "stylo-1154",
  "src/app/login/page.tsx:CardTitle::50:10": "stylo-1155",
  "src/app/login/page.tsx:CardDescription::51:10": "stylo-1156",
  "src/app/login/page.tsx:CardContent::55:8": "stylo-1157",
  "src/app/login/page.tsx:div:space-y-4:57:10": "stylo-1158",
  "src/app/login/page.tsx:div:text-sm text-muted-foreground:58:14": "stylo-1159",
  "src/app/login/page.tsx:div:text-sm text-muted-foreground:59:14": "stylo-1160",
  "src/app/login/page.tsx:Button::60:14": "stylo-1161",
  "src/app/login/page.tsx:form:space-y-4:63:10": "stylo-1162",
  "src/app/login/page.tsx:div:grid gap-2:64:14": "stylo-1163",
  "src/app/login/page.tsx:label:text-sm:65:16": "stylo-1164",
  "src/app/login/page.tsx:Input::66:16": "stylo-1165",
  "src/app/login/page.tsx:div:grid gap-2:68:14": "stylo-1166",
  "src/app/login/page.tsx:label:text-sm:69:16": "stylo-1167",
  "src/app/login/page.tsx:Input::70:16": "stylo-1168",
  "src/app/login/page.tsx:div:text-sm text-destructive:72:24": "stylo-1169",
  "src/app/login/page.tsx:div:flex items-center gap-2:73:14": "stylo-1170",
  "src/app/login/page.tsx:Button::74:16": "stylo-1171",
  "src/app/login/page.tsx:Button::75:16": "stylo-1172",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-card shadow-lg neon-glow:34:6": "stylo-1173",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader::35:8": "stylo-1174",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-between:36:10": "stylo-1175",
  "src/components/dashboard/dashboard-summary.tsx:div:space-y-1 dashboard-header:37:12": "stylo-1176",
  "src/components/dashboard/dashboard-summary.tsx:h1:text-2xl font-bold tracking-tight flex items-center gap-2:38:14": "stylo-1177",
  "src/components/dashboard/dashboard-summary.tsx:Brain:h-6 w-6 text-cyan-400:39:16": "stylo-1178",
  "src/components/dashboard/dashboard-summary.tsx:CardContent::45:8": "stylo-1179",
  "src/components/dashboard/dashboard-summary.tsx:div:flex flex-col items-center justify-center py-12 text-center:46:10": "stylo-1180",
  "src/components/dashboard/dashboard-summary.tsx:AlertCircle:h-12 w-12 text-amber-400/60 mb-4:47:12": "stylo-1181",
  "src/components/dashboard/dashboard-summary.tsx:p:text-teal-100 font-medium:48:12": "stylo-1182",
  "src/components/dashboard/dashboard-summary.tsx:p:text-sm text-muted-foreground mt-1:49:12": "stylo-1183",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-card shadow-lg neon-glow:61:6": "stylo-1184",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader::62:8": "stylo-1185",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-between:63:10": "stylo-1186",
  "src/components/dashboard/dashboard-summary.tsx:div:space-y-1 dashboard-header:64:12": "stylo-1187",
  "src/components/dashboard/dashboard-summary.tsx:h1:text-2xl font-bold tracking-tight flex items-center gap-2:65:14": "stylo-1188",
  "src/components/dashboard/dashboard-summary.tsx:Brain:h-6 w-6 text-cyan-400:66:16": "stylo-1189",
  "src/components/dashboard/dashboard-summary.tsx:CardContent::72:8": "stylo-1190",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-center py-12:73:10": "stylo-1191",
  "src/components/dashboard/dashboard-summary.tsx:div:animate-pulse text-teal-100:74:12": "stylo-1192",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-card shadow-lg neon-glow:84:6": "stylo-1193",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader::85:8": "stylo-1194",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-between:86:10": "stylo-1195",
  "src/components/dashboard/dashboard-summary.tsx:div:space-y-1 dashboard-header:87:12": "stylo-1196",
  "src/components/dashboard/dashboard-summary.tsx:h1:text-2xl font-bold tracking-tight flex items-center gap-2:88:14": "stylo-1197",
  "src/components/dashboard/dashboard-summary.tsx:Brain:h-6 w-6 text-cyan-400:89:16": "stylo-1198",
  "src/components/dashboard/dashboard-summary.tsx:CardContent::95:8": "stylo-1199",
  "src/components/dashboard/dashboard-summary.tsx:div:flex flex-col items-center justify-center py-12 text-center:96:10": "stylo-1200",
  "src/components/dashboard/dashboard-summary.tsx:Inbox:h-12 w-12 text-cyan-400/40 mb-4:97:12": "stylo-1201",
  "src/components/dashboard/dashboard-summary.tsx:p:text-teal-100 font-medium:98:12": "stylo-1202",
  "src/components/dashboard/dashboard-summary.tsx:p:text-sm text-muted-foreground mt-1:99:12": "stylo-1203",
  "src/components/dashboard/dashboard-summary.tsx:Card:dashboard-card shadow-lg neon-glow:113:4": "stylo-1204",
  "src/components/dashboard/dashboard-summary.tsx:CardHeader:pb-2:114:6": "stylo-1205",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-between flex-wrap gap-3:115:8": "stylo-1206",
  "src/components/dashboard/dashboard-summary.tsx:div:space-y-1 dashboard-header:116:10": "stylo-1207",
  "src/components/dashboard/dashboard-summary.tsx:h1:text-2xl font-bold tracking-tight flex items-center gap-2:117:12": "stylo-1208",
  "src/components/dashboard/dashboard-summary.tsx:Brain:h-6 w-6 text-cyan-400:118:14": "stylo-1209",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center gap-3:122:10": "stylo-1210",
  "src/components/dashboard/dashboard-summary.tsx:InboxArchiveModal::123:12": "stylo-1211",
  "src/components/dashboard/dashboard-summary.tsx:InboxDateNavigator::128:12": "stylo-1212",
  "src/components/dashboard/dashboard-summary.tsx:CardContent::138:6": "stylo-1213",
  "src/components/dashboard/dashboard-summary.tsx:div:mb-4 flex items-center gap-4:142:12": "stylo-1214",
  "src/components/dashboard/dashboard-summary.tsx:div:dashboard-metrics-card px-4 py-2 inline-flex items-center gap-2:143:14": "stylo-1215",
  "src/components/dashboard/dashboard-summary.tsx:span:text-2xl font-bold text-teal-100:144:16": "stylo-1216",
  "src/components/dashboard/dashboard-summary.tsx:span:text-sm text-cyan-200/80:147:16": "stylo-1217",
  "src/components/dashboard/dashboard-summary.tsx:ScrollArea:h-[280px] pr-4:154:12": "stylo-1218",
  "src/components/dashboard/dashboard-summary.tsx:InboxTaskList::155:14": "stylo-1219",
  "src/components/dashboard/dashboard-summary.tsx:div:flex flex-col items-center justify-center py-12 text-center:159:10": "stylo-1220",
  "src/components/dashboard/dashboard-summary.tsx:Inbox:h-10 w-10 text-cyan-400/40 mb-4:160:12": "stylo-1221",
  "src/components/dashboard/dashboard-summary.tsx:p:text-teal-100 font-medium:161:12": "stylo-1222",
  "src/components/dashboard/dashboard-summary.tsx:button:mt-3 text-sm text-cyan-300 hover:text-cyan-200 underline:163:14": "stylo-1223",
  "src/components/dashboard/inbox-archive-modal.tsx:Dialog::36:4": "stylo-1224",
  "src/components/dashboard/inbox-archive-modal.tsx:DialogTrigger::37:6": "stylo-1225",
  "src/components/dashboard/inbox-archive-modal.tsx:Button:text-cyan-300/80 hover:text-cyan-200 hover:bg-teal-900/30:38:8": "stylo-1226",
  "src/components/dashboard/inbox-archive-modal.tsx:Archive:h-4 w-4 mr-2:43:10": "stylo-1227",
  "src/components/dashboard/inbox-archive-modal.tsx:DialogContent:sm:max-w-[500px] border-[hsla(165,70%,35%,0.4)] bg-gradient-to-b from-[hsl(210,35%,12%)] to-[hsl(210,30%,8%)]:47:6": "stylo-1228",
  "src/components/dashboard/inbox-archive-modal.tsx:DialogHeader:pb-4:48:8": "stylo-1229",
  "src/components/dashboard/inbox-archive-modal.tsx:DialogTitle:text-xl text-teal-100:49:10": "stylo-1230",
  "src/components/dashboard/inbox-archive-modal.tsx:ScrollArea:max-h-[60vh]:51:8": "stylo-1231",
  "src/components/dashboard/inbox-archive-modal.tsx:div:space-y-2 pr-4:52:10": "stylo-1232",
  "src/components/dashboard/inbox-archive-modal.tsx:p:text-center py-8 text-muted-foreground:54:14": "stylo-1233",
  "src/components/dashboard/inbox-archive-modal.tsx:button:w-full p-3 rounded-lg text-left\n                               border border-[hsla(165,70%,40%,0.25)]\n                               bg-gradient-to-b from-[rgba(0,128,128,0.08)] to-[rgba(0,0,0,0.4)]\n                               hover:border-[hsla(165,70%,40%,0.5)] hover:from-[rgba(0,128,128,0.15)]\n                               transition-all group:67:18": "stylo-1234",
  "src/components/dashboard/inbox-archive-modal.tsx:div:flex items-center justify-between:76:20": "stylo-1235",
  "src/components/dashboard/inbox-archive-modal.tsx:div::77:22": "stylo-1236",
  "src/components/dashboard/inbox-archive-modal.tsx:p:text-sm font-medium text-teal-100:78:24": "stylo-1237",
  "src/components/dashboard/inbox-archive-modal.tsx:p:text-xs text-cyan-300/60 mt-0.5:79:24": "stylo-1238",
  "src/components/dashboard/inbox-archive-modal.tsx:ChevronRight:h-4 w-4 text-cyan-300/40 group-hover:text-cyan-300/80 transition-colors:83:22": "stylo-1239",
  "src/components/dashboard/inbox-date-navigator.tsx:div:flex items-center gap-2:45:4": "stylo-1240",
  "src/components/dashboard/inbox-date-navigator.tsx:Button:text-teal-200 hover:text-teal-100 hover:bg-teal-900/30 disabled:opacity-30:46:6": "stylo-1241",
  "src/components/dashboard/inbox-date-navigator.tsx:ChevronLeft:h-4 w-4:54:8": "stylo-1242",
  "src/components/dashboard/inbox-date-navigator.tsx:div:flex items-center gap-2 min-w-[200px] justify-center:57:6": "stylo-1243",
  "src/components/dashboard/inbox-date-navigator.tsx:Calendar:h-4 w-4 text-cyan-300/80:58:8": "stylo-1244",
  "src/components/dashboard/inbox-date-navigator.tsx:span:text-sm font-medium text-teal-100:59:8": "stylo-1245",
  "src/components/dashboard/inbox-date-navigator.tsx:Button:text-teal-200 hover:text-teal-100 hover:bg-teal-900/30 disabled:opacity-30:62:6": "stylo-1246",
  "src/components/dashboard/inbox-date-navigator.tsx:ChevronRight:h-4 w-4:70:8": "stylo-1247",
  "src/components/dashboard/inbox-date-navigator.tsx:Button:ml-2 text-xs border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/30 hover:text-cyan-200:74:8": "stylo-1248",
  "src/components/dashboard/inbox-task-list.tsx:div:text-center py-8 text-muted-foreground:13:6": "stylo-1249",
  "src/components/dashboard/inbox-task-list.tsx:p::14:8": "stylo-1250",
  "src/components/dashboard/inbox-task-list.tsx:div:space-y-3:20:4": "stylo-1251",
  "src/components/dashboard/inbox-task-list.tsx:div:inbox-task-item p-3 rounded-lg border border-[hsla(165,70%,40%,0.35)]\n                     bg-gradient-to-b from-[rgba(0,128,128,0.1)] to-[rgba(0,0,0,0.6)]\n                     hover:border-[hsla(165,70%,40%,0.5)] transition-colors:22:8": "stylo-1252",
  "src/components/dashboard/inbox-task-list.tsx:div:flex items-start gap-3:28:10": "stylo-1253",
  "src/components/dashboard/inbox-task-list.tsx:Clock:h-4 w-4 text-cyan-400 mt-1 flex-shrink-0:29:12": "stylo-1254",
  "src/components/dashboard/inbox-task-list.tsx:div:flex-1 min-w-0:30:12": "stylo-1255",
  "src/components/dashboard/inbox-task-list.tsx:p:text-teal-100 text-sm leading-relaxed:31:14": "stylo-1256",
  "src/components/dashboard/inbox-task-list.tsx:div:flex items-center gap-1.5 mt-2 text-xs text-cyan-300/80:33:16": "stylo-1257",
  "src/components/dashboard/inbox-task-list.tsx:Calendar:h-3 w-3:34:18": "stylo-1258",
  "src/components/dashboard/inbox-task-list.tsx:span::35:18": "stylo-1259"
}
````

## File: tailwind.config.ts
````typescript
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Jost', 'sans-serif'],
        headline: ['Nokie', 'sans-serif'],
        code: ['"Playwrite NL"', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        'orange-500': '#f97316',
        'magenta-500': '#ec4899',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
````

## File: scripts/inject-ids.js
````javascript
#!/usr/bin/env node

/**
 * Automated Test ID Injection System
 *
 * Usage:
 *   node scripts/inject-ids.js              # Add IDs to all elements
 *   node scripts/inject-ids.js --clean tid  # Remove all attributes with "tid-" prefix
 *   node scripts/inject-ids.js --clean el   # Remove all attributes with "el-" prefix
 *
 * This script:
 * 1. Scans all component files (.tsx, .jsx)
 * 2. Parses JSX/TSX to find ALL elements (HTML and React components)
 * 3. Assigns permanent, unique data-testid attributes to each element
 * 4. Stores ID mappings in a JSON file
 * 5. Modifies source files directly with the IDs
 * 6. Reuses existing IDs on subsequent runs (stable across changes)
 *
 * Uses data-testid instead of id because:
 * - Works with React components (they forward data-* attributes)
 * - Industry standard for testing (Playwright, Cypress, etc.)
 * - Won't conflict with CSS or accessibility IDs
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Configuration
const COMPONENT_DIRS = [
  'src/components',
  'src/app'
];

const ID_MAP_FILE = 'style-mappings.json';
const ID_PREFIX = 'stylo';
const ATTR_NAME = 'data-style-id';

// Parse command line arguments
const args = process.argv.slice(2);
const cleanIndex = args.indexOf('--clean');
const isCleanMode = cleanIndex !== -1;
const cleanPrefix = isCleanMode ? args[cleanIndex + 1] : null;

if (isCleanMode && !cleanPrefix) {
  console.error('❌ Error: --clean requires a prefix argument');
  console.error('   Example: node scripts/inject-ids.js --clean tid');
  console.error('   Example: node scripts/inject-ids.js --clean el');
  process.exit(1);
}

// Load existing ID mappings or create new one
let idMappings = {};
let idCounter = 0;

if (!isCleanMode && fs.existsSync(ID_MAP_FILE)) {
  idMappings = JSON.parse(fs.readFileSync(ID_MAP_FILE, 'utf-8'));
  // Find highest existing ID number
  Object.values(idMappings).forEach(id => {
    const match = id.match(new RegExp(`${ID_PREFIX}-(\\d+)`));
    if (match) {
      const num = parseInt(match[1]);
      if (num >= idCounter) idCounter = num + 1;
    }
  });
  console.log(`📂 Loaded ${Object.keys(idMappings).length} existing test ID mappings`);
} else if (!isCleanMode) {
  console.log('🆕 Creating new test ID mapping file');
}

/**
 * Generate a unique key for an element based on:
 * - File path
 * - Element type (tag name)
 * - Attributes (especially className)
 * - Position in file
 */
function generateElementKey(filePath, element, line, column) {
  const nameNode = element.openingElement.name;
  // Handle both simple names and member expressions (e.g., Card.Header)
  let tag = 'unknown';
  if (nameNode.name) {
    tag = nameNode.name;
  } else if (nameNode.object && nameNode.property) {
    tag = `${nameNode.object.name}.${nameNode.property.name}`;
  }

  // Get className if it exists
  let className = '';
  const classAttr = element.openingElement.attributes.find(attr =>
    attr.name && attr.name.name === 'className'
  );

  if (classAttr && classAttr.value) {
    if (t.isStringLiteral(classAttr.value)) {
      className = classAttr.value.value;
    } else if (t.isJSXExpressionContainer(classAttr.value)) {
      // For template strings or expressions, use a simplified version
      className = 'dynamic';
    }
  }

  // Create unique key
  const relativePath = path.relative(process.cwd(), filePath);
  return `${relativePath}:${tag}:${className}:${line}:${column}`;
}

/**
 * Get or create ID for an element
 */
function getOrCreateId(elementKey) {
  if (idMappings[elementKey]) {
    return idMappings[elementKey];
  }

  const newId = `${ID_PREFIX}-${idCounter++}`;
  idMappings[elementKey] = newId;
  return newId;
}

/**
 * Clean file - remove attributes with given prefix
 */
function cleanFile(filePath, prefix) {
  console.log(`\n📄 Cleaning: ${path.relative(process.cwd(), filePath)}`);

  const code = fs.readFileSync(filePath, 'utf-8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (error) {
    console.error(`❌ Parse error in ${filePath}:`, error.message);
    return 0;
  }

  let modified = false;
  let removedCount = 0;
  const prefixPattern = new RegExp(`^${prefix}-\\d+$`);

  traverse(ast, {
    JSXElement(path) {
      const element = path.node;
      const attrs = element.openingElement.attributes;

      // Find and remove attributes with matching prefix
      for (let i = attrs.length - 1; i >= 0; i--) {
        const attr = attrs[i];
        if (attr.name && attr.value && t.isStringLiteral(attr.value)) {
          if (prefixPattern.test(attr.value.value)) {
            attrs.splice(i, 1);
            modified = true;
            removedCount++;
          }
        }
      }
    }
  });

  if (modified) {
    const output = generate(ast, {
      retainLines: true,
      retainFunctionParens: true,
    }, code);

    fs.writeFileSync(filePath, output.code, 'utf-8');
    console.log(`🧹 Removed ${removedCount} attributes with "${prefix}-" prefix`);
  } else {
    console.log(`⏭️  No "${prefix}-" attributes found`);
  }

  return removedCount;
}

/**
 * Process a single file - add IDs
 */
function processFile(filePath) {
  console.log(`\n📄 Processing: ${path.relative(process.cwd(), filePath)}`);

  const code = fs.readFileSync(filePath, 'utf-8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (error) {
    console.error(`❌ Parse error in ${filePath}:`, error.message);
    return;
  }

  let modified = false;
  let addedCount = 0;
  let skippedCount = 0;

  traverse(ast, {
    JSXElement(path) {
      const element = path.node;
      const { line, column } = element.loc.start;

      // Get the tag name (works for both HTML elements and React components)
      const nameNode = element.openingElement.name;
      let tagName = null;
      if (nameNode.name) {
        tagName = nameNode.name;
      } else if (nameNode.object && nameNode.property) {
        tagName = `${nameNode.object.name}.${nameNode.property.name}`;
      }

      if (!tagName) {
        return;
      }

      // Skip if already has the attribute
      const hasTestId = element.openingElement.attributes.some(attr =>
        attr.name && attr.name.name === ATTR_NAME
      );

      if (hasTestId) {
        skippedCount++;
        return;
      }

      // Generate element key and get/create ID
      const elementKey = generateElementKey(filePath, element, line, column);
      const id = getOrCreateId(elementKey);

      // Add attribute
      const testIdAttr = t.jsxAttribute(
        t.jsxIdentifier(ATTR_NAME),
        t.stringLiteral(id)
      );

      element.openingElement.attributes.unshift(testIdAttr);
      modified = true;
      addedCount++;
    }
  });

  if (modified) {
    const output = generate(ast, {
      retainLines: true,
      retainFunctionParens: true,
    }, code);

    fs.writeFileSync(filePath, output.code, 'utf-8');
    console.log(`✅ Added ${addedCount} IDs, skipped ${skippedCount} (already have IDs)`);
  } else {
    console.log(`⏭️  No changes needed (${skippedCount} elements already have IDs)`);
  }
}

/**
 * Recursively find all component files
 */
function findComponentFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Directory not found: ${dir}`);
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (item === 'node_modules' || item === '.next' || item === 'ui') {
        continue;
      }
      files.push(...findComponentFiles(fullPath));
    } else if (item.match(/\.(tsx|jsx)$/) && !item.includes('.test.') && !item.includes('.spec.')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main execution
 */
function main() {
  if (isCleanMode) {
    console.log(`🧹 Starting Clean Mode - Removing "${cleanPrefix}-" prefixed attributes\n`);
    console.log('='.repeat(60));
  } else {
    console.log('🚀 Starting Automated ID Injection System\n');
    console.log(`   Attribute: ${ATTR_NAME}`);
    console.log(`   Prefix: ${ID_PREFIX}\n`);
    console.log('='.repeat(60));
  }

  // Find all component files
  let allFiles = [];
  for (const dir of COMPONENT_DIRS) {
    const files = findComponentFiles(dir);
    allFiles.push(...files);
  }

  console.log(`\n📦 Found ${allFiles.length} component files to process\n`);

  if (isCleanMode) {
    // Clean mode - remove attributes
    let totalRemoved = 0;
    for (const file of allFiles) {
      totalRemoved += cleanFile(file, cleanPrefix);
    }
    console.log('\n' + '='.repeat(60));
    console.log(`\n🧹 Cleaned ${totalRemoved} total "${cleanPrefix}-" attributes`);
    console.log('\n✨ Done!');
  } else {
    // Normal mode - add IDs
    for (const file of allFiles) {
      processFile(file);
    }

    // Save updated ID mappings
    fs.writeFileSync(ID_MAP_FILE, JSON.stringify(idMappings, null, 2), 'utf-8');
    console.log('\n' + '='.repeat(60));
    console.log(`\n💾 Saved ${Object.keys(idMappings).length} ID mappings to ${ID_MAP_FILE}`);
    console.log(`\n✨ Done! All elements now have permanent IDs.`);
    console.log(`\nNext ID will be: ${ID_PREFIX}-${idCounter}`);
  }
}

// Run the script
main();
````

## File: src/ai/flows/recommend-today-flow.ts
````typescript
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Input schema
const RecommendTodayInputSchema = z.object({
  currentSchedule: z.array(z.object({
    title: z.string(),
    startMinute: z.number(),
    durationMinutes: z.number(),
    completed: z.boolean(),
  })),
  availableProjects: z.array(z.object({
    name: z.string(),
    deadline: z.string(),
    importance: z.number(),
    tasks: z.array(z.object({
      title: z.string(),
      completed: z.boolean(),
    })),
  })),
  casualTasks: z.array(z.object({
    title: z.string(),
    completed: z.boolean(),
  })),
  currentTimeMinute: z.number(),
  userContext: z.string().optional(),
  // Tasks the user specifically wants help scheduling (highest priority)
  aiTaskList: z.array(z.object({
    title: z.string(),
  })).optional(),
});

// Output schema
const RecommendTodayOutputSchema = z.object({
  recommendations: z.array(z.object({
    title: z.string(),
    suggestedStartMinute: z.number(),
    suggestedDurationMinutes: z.number(),
    reasoning: z.string(),
    sourceType: z.enum(['project', 'casual', 'new']),
    sourceId: z.string().optional(),
  })),
  overallSuggestion: z.string(),
});

export type RecommendTodayInput = z.infer<typeof RecommendTodayInputSchema>;
export type RecommendTodayOutput = z.infer<typeof RecommendTodayOutputSchema>;

// Helper to format minute to time string
function formatMinuteToTime(minute: number): string {
  const hours = Math.floor(minute / 60);
  const mins = minute % 60;
  const displayHour = hours % 12 || 12;
  const ampm = hours < 12 ? 'AM' : 'PM';
  return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
}

export const recommendTodayFlow = ai.defineFlow(
  {
    name: 'recommendTodayFlow',
    inputSchema: RecommendTodayInputSchema,
    outputSchema: RecommendTodayOutputSchema,
  },
  async (input) => {
    const currentTime = formatMinuteToTime(input.currentTimeMinute);

    // Build context about current schedule
    const scheduleContext = input.currentSchedule.length > 0
      ? input.currentSchedule.map((item) =>
          `- ${item.title} (${formatMinuteToTime(item.startMinute)} - ${formatMinuteToTime(item.startMinute + item.durationMinutes)})${item.completed ? ' [DONE]' : ''}`
        ).join('\n')
      : 'No items scheduled yet.';

    // Build context about available tasks
    const projectTasksContext = input.availableProjects
      .filter((p) => p.tasks.some((t) => !t.completed))
      .map((p) => {
        const undoneTasks = p.tasks.filter((t) => !t.completed);
        return `Project: ${p.name} (Deadline: ${p.deadline}, Importance: ${p.importance}/10)\n  Tasks: ${undoneTasks.map((t) => t.title).join(', ')}`;
      }).join('\n\n');

    const casualTasksContext = input.casualTasks
      .filter((t) => !t.completed)
      .map((t) => `- ${t.title}`)
      .join('\n') || 'None';

    // Build AI task list context (tasks user wants help scheduling - highest priority)
    const aiTaskListContext = input.aiTaskList && input.aiTaskList.length > 0
      ? input.aiTaskList.map((t) => `- ${t.title}`).join('\n')
      : '';

    const prompt = `You are a productivity assistant helping plan someone's day.

Current time: ${currentTime}

CURRENT SCHEDULE:
${scheduleContext}

${aiTaskListContext ? `PRIORITY TASKS (user wants these scheduled):\n${aiTaskListContext}\n` : ''}

AVAILABLE PROJECT TASKS:
${projectTasksContext || 'No project tasks available.'}

CASUAL TASKS:
${casualTasksContext}

${input.userContext ? `USER CONTEXT: ${input.userContext}` : ''}

Based on the current time and what's already scheduled, recommend 2-4 tasks that the user should consider adding to their schedule. For each recommendation:
1. ${aiTaskListContext ? 'PRIORITIZE tasks from the "PRIORITY TASKS" list first, then ' : ''}Choose from available project tasks or casual tasks (prefer tasks from high-importance projects with upcoming deadlines)
2. Suggest a specific start time that doesn't conflict with existing schedule
3. Suggest an appropriate duration (30-120 minutes)
4. Provide brief reasoning

Also provide an overall suggestion about how to approach the rest of the day.

IMPORTANT:
- Don't recommend completed tasks
- Don't overlap with existing scheduled items
- Consider the current time (don't suggest past times)
- ${aiTaskListContext ? 'Always include tasks from PRIORITY TASKS list in recommendations\n- ' : ''}Prioritize based on deadlines and importance`;

    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt,
      output: { schema: RecommendTodayOutputSchema },
    });

    return output ?? {
      recommendations: [],
      overallSuggestion: 'Unable to generate recommendations at this time.',
    };
  }
);

export async function recommendToday(input: RecommendTodayInput): Promise<RecommendTodayOutput> {
  return recommendTodayFlow(input);
}
````

## File: src/ai/flows/today-chat-flow.ts
````typescript
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Input schema
const TodayChatInputSchema = z.object({
  message: z.string(),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })),
  currentSchedule: z.array(z.object({
    id: z.string(),
    title: z.string(),
    startMinute: z.number(),
    durationMinutes: z.number(),
    completed: z.boolean(),
  })),
  availableProjects: z.array(z.object({
    name: z.string(),
    deadline: z.string(),
    importance: z.number(),
    tasks: z.array(z.object({
      title: z.string(),
      completed: z.boolean(),
    })),
  })),
  currentDate: z.string(),
  currentTimeMinute: z.number(),
  // Tasks the user specifically wants help scheduling
  aiTaskList: z.array(z.object({
    title: z.string(),
  })).optional(),
});

// Output schema
const TodayChatOutputSchema = z.object({
  response: z.string(),
  suggestedActions: z.array(z.object({
    type: z.enum(['add_item', 'move_item', 'resize_item', 'remove_item', 'complete_item']),
    itemId: z.string().optional(),
    title: z.string().optional(),
    startMinute: z.number().optional(),
    durationMinutes: z.number().optional(),
  })).optional(),
});

export type TodayChatInput = z.infer<typeof TodayChatInputSchema>;
export type TodayChatOutput = z.infer<typeof TodayChatOutputSchema>;

// Helper to format minute to time string
function formatMinuteToTime(minute: number): string {
  const hours = Math.floor(minute / 60);
  const mins = minute % 60;
  const displayHour = hours % 12 || 12;
  const ampm = hours < 12 ? 'AM' : 'PM';
  return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
}

export const todayChatFlow = ai.defineFlow(
  {
    name: 'todayChatFlow',
    inputSchema: TodayChatInputSchema,
    outputSchema: TodayChatOutputSchema,
  },
  async (input) => {
    const currentTime = formatMinuteToTime(input.currentTimeMinute);

    // Build context about current schedule
    const scheduleContext = input.currentSchedule.length > 0
      ? input.currentSchedule.map((item) =>
          `- [${item.id}] ${item.title} (${formatMinuteToTime(item.startMinute)} - ${formatMinuteToTime(item.startMinute + item.durationMinutes)})${item.completed ? ' [COMPLETED]' : ''}`
        ).join('\n')
      : 'No items scheduled yet.';

    // Build context about available tasks
    const projectTasksContext = input.availableProjects
      .filter((p) => p.tasks.some((t) => !t.completed))
      .slice(0, 5) // Limit to 5 projects for context size
      .map((p) => {
        const undoneTasks = p.tasks.filter((t) => !t.completed).slice(0, 3);
        return `${p.name} (Due: ${p.deadline}, Priority: ${p.importance}/10): ${undoneTasks.map((t) => t.title).join(', ')}`;
      }).join('\n');

    // Build AI task list context (tasks user wants help scheduling)
    const aiTaskListContext = input.aiTaskList && input.aiTaskList.length > 0
      ? input.aiTaskList.map((t) => `- ${t.title}`).join('\n')
      : '';

    // Build chat history context
    const historyContext = input.chatHistory.length > 0
      ? input.chatHistory.slice(-6).map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')
      : '';

    const systemPrompt = `You are a helpful productivity assistant helping someone plan their day. You have access to their schedule, available tasks, and can DIRECTLY MODIFY their schedule.

DATE: ${input.currentDate}
CURRENT TIME: ${currentTime}

TODAY'S SCHEDULE:
${scheduleContext}

${aiTaskListContext ? `TASKS USER WANTS HELP SCHEDULING:\n${aiTaskListContext}\n` : ''}

AVAILABLE TASKS (from projects):
${projectTasksContext || 'No pending tasks.'}

${historyContext ? `CONVERSATION HISTORY:\n${historyContext}\n` : ''}

The user is now asking: "${input.message}"

You can:
- Answer questions about their schedule
- Suggest how to reorganize their day
- ADD items to their schedule (provide title, startMinute 0-1440, durationMinutes)
- MOVE existing items (provide itemId and new startMinute)
- RESIZE items (provide itemId and new durationMinutes)
- REMOVE items (provide itemId)
- COMPLETE items (provide itemId)

IMPORTANT: When you make schedule changes, you MUST include suggestedActions in your response with the specific actions.
- For add_item: include title, startMinute, durationMinutes
- For move_item: include itemId, startMinute
- For resize_item: include itemId, durationMinutes
- For remove_item: include itemId
- For complete_item: include itemId

Times are in minutes from midnight (e.g., 9:00 AM = 540, 2:30 PM = 870).

If the user has tasks in their "TASKS USER WANTS HELP SCHEDULING" list, proactively suggest when to schedule them.

Keep responses brief and actionable.`;

    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: systemPrompt,
      output: { schema: TodayChatOutputSchema },
    });

    return output ?? {
      response: 'I apologize, but I was unable to process your request. Please try again.',
    };
  }
);

export async function chatAboutToday(input: TodayChatInput): Promise<TodayChatOutput> {
  return todayChatFlow(input);
}
````

## File: src/app/(app)/dashboard/page.tsx
````typescript
import { DashboardSummary } from '@/components/dashboard/dashboard-summary';
import { ProjectList } from '@/components/dashboard/project-list';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div data-style-id="stylo-853" id="el-196" className="space-y-6">
      <DashboardSummary data-style-id="stylo-854" />
      <ProjectList data-style-id="stylo-855" />
    </div>);

}
````

## File: src/app/(app)/domain/[domain]/page.tsx
````typescript
'use client';

import { useParams, notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useProjects } from '@/context/project-context';
import { DOMAINS, DOMAIN_LIST, STATUS_CONFIG } from '@/lib/domains';
import type { Domain, ProjectStatus } from '@/lib/types';
import { ProjectCard } from '@/components/dashboard/project-card';
import { ProjectForm } from '@/components/dashboard/project-form';
import { SearchBar } from '@/components/dashboard/search-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type StatusFilter = ProjectStatus | 'all';

export default function DomainPage() {
  const params = useParams();
  const domainParam = params.domain as string;
  const { projects } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Validate domain
  const isValidDomain = DOMAIN_LIST.some((d) => d.value === domainParam);
  if (!isValidDomain) {
    notFound();
  }

  const domain = domainParam as Domain;
  const domainConfig = DOMAINS[domain];
  const Icon = domainConfig.icon;

  // Filter projects for this domain
  const domainProjects = useMemo(() => {
    return projects.filter((p) => {
      if (p.domain !== domain) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.name.toLowerCase().includes(query);
        const matchesDescription = p.description.toLowerCase().includes(query);
        const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && p.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [projects, domain, searchQuery, statusFilter]);

  // Statistics for this domain
  const stats = useMemo(() => {
    const domainAll = projects.filter((p) => p.domain === domain);
    const totalTasks = domainAll.flatMap((p) => p.tasks).length;
    const completedTasks = domainAll.flatMap((p) => p.tasks).filter((t) => t.completed).length;
    const statusCounts: Record<string, number> = { all: domainAll.length };
    for (const status of Object.keys(STATUS_CONFIG)) {
      statusCounts[status] = domainAll.filter((p) => p.status === status).length;
    }
    return { totalProjects: domainAll.length, totalTasks, completedTasks, statusCounts };
  }, [projects, domain]);

  return (
    <div data-style-id="stylo-856" id="el-197" className="space-y-6">
      {/* Domain Header */}
      <div data-style-id="stylo-857" id="el-198"
      className="rounded-xl p-6 relative overflow-hidden"
      style={{ background: domainConfig.bgGradient }}>

        <div data-style-id="stylo-858" id="el-199" className="relative z-10">
        

          <div data-style-id="stylo-862" id="el-200" className="flex items-center gap-4">
            <div data-style-id="stylo-863" id="el-201" className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <Icon data-style-id="stylo-864" className="h-10 w-10 text-white" />
            </div>
            <div data-style-id="stylo-865" id="el-202">
              <h1 data-style-id="stylo-866" id="el-203" className="text-3xl font-headline text-white">{domainConfig.label}</h1>
              <p data-style-id="stylo-867" id="el-204" className="text-white/80">
                {stats.totalProjects} projects, {stats.completedTasks}/{stats.totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div data-style-id="stylo-868" id="el-205" className="absolute top-0 right-0 opacity-10">
          <Icon data-style-id="stylo-869" className="h-64 w-64 -translate-y-10 translate-x-10" />
        </div>
      </div>

      {/* Stats Cards */}
      <div data-style-id="stylo-870" id="el-206" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-style-id="stylo-871" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-872" className="p-4">
            <CardTitle data-style-id="stylo-873" className="text-sm text-muted-foreground">Total Projects</CardTitle>
            <p data-style-id="stylo-874" id="el-207" className="text-2xl font-bold" style={{ color: domainConfig.color }}>
              {stats.totalProjects}
            </p>
          </CardHeader>
        </Card>
        <Card data-style-id="stylo-875" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-876" className="p-4">
            <CardTitle data-style-id="stylo-877" className="text-sm text-muted-foreground">Active</CardTitle>
            <p data-style-id="stylo-878" id="el-208" className="text-2xl font-bold text-green-400">
              {stats.statusCounts.active || 0}
            </p>
          </CardHeader>
        </Card>
        <Card data-style-id="stylo-879" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-880" className="p-4">
            <CardTitle data-style-id="stylo-881" className="text-sm text-muted-foreground">Completed</CardTitle>
            <p data-style-id="stylo-882" id="el-209" className="text-2xl font-bold text-blue-400">
              {stats.statusCounts.done || 0}
            </p>
          </CardHeader>
        </Card>
        <Card data-style-id="stylo-883" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-884" className="p-4">
            <CardTitle data-style-id="stylo-885" className="text-sm text-muted-foreground">Tasks Done</CardTitle>
            <p data-style-id="stylo-886" id="el-210" className="text-2xl font-bold text-cyan-400">
              {stats.completedTasks}
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div data-style-id="stylo-887" id="el-211" className="flex flex-col sm:flex-row gap-4">
        <SearchBar data-style-id="stylo-888"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={`Search ${domainConfig.label.toLowerCase()} projects...`}
        className="flex-1" />

        <Button data-style-id="stylo-889"
        className="btn-primary-glass"
        onClick={() => setIsFormOpen(true)}>

          <PlusCircle data-style-id="stylo-890" className="mr-2 h-4 w-4" />
          New {domainConfig.label} Project
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs data-style-id="stylo-891" value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
        <TabsList data-style-id="stylo-892" className="bg-muted/30 border border-border/50">
          <TabsTrigger data-style-id="stylo-893" value="all" className="data-[state=active]:bg-primary/20">
            All
            <Badge data-style-id="stylo-894" variant="secondary" className="ml-2 text-xs">
              {stats.statusCounts.all}
            </Badge>
          </TabsTrigger>
          {Object.entries(STATUS_CONFIG).map(([key, config]) =>
          <TabsTrigger data-style-id="stylo-895"
          key={key}
          value={key}
          className="data-[state=active]:bg-primary/20">

              <span data-style-id="stylo-896" id="el-212"
            className="h-2 w-2 rounded-full mr-2"
            style={{ backgroundColor: config.color }} />

              {config.label}
              {(stats.statusCounts[key] || 0) > 0 &&
            <Badge data-style-id="stylo-897" variant="secondary" className="ml-2 text-xs">
                  {stats.statusCounts[key]}
                </Badge>
            }
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>

      {/* Project Grid */}
      {domainProjects.length > 0 ?
      <div data-style-id="stylo-898" id="el-213" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {domainProjects.map((project) =>
        <ProjectCard data-style-id="stylo-899" key={project.id} project={project} />
        )}
        </div> :
      stats.totalProjects > 0 ?
      <div data-style-id="stylo-900" id="el-214" className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 data-style-id="stylo-901" id="el-215" className="text-xl font-semibold text-muted-foreground">No Matching Projects</h3>
          <p data-style-id="stylo-902" id="el-216" className="text-muted-foreground mt-2">
            Try adjusting your search or status filter
          </p>
        </div> :

      <div data-style-id="stylo-903" id="el-217" className="text-center py-16 border-2 border-dashed rounded-lg">
          <Icon data-style-id="stylo-904" className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 data-style-id="stylo-905" id="el-218" className="text-xl font-semibold text-muted-foreground">
            No {domainConfig.label} Projects Yet
          </h3>
          <p data-style-id="stylo-906" id="el-219" className="text-muted-foreground mt-2">
            Create your first {domainConfig.label.toLowerCase()} project to get started.
          </p>
          <Button data-style-id="stylo-907" className="mt-4" onClick={() => setIsFormOpen(true)}>
            <PlusCircle data-style-id="stylo-908" className="mr-2 h-4 w-4" />
            Create {domainConfig.label} Project
          </Button>
        </div>
      }

      <ProjectForm data-style-id="stylo-909" isOpen={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>);

}
````

## File: src/app/(app)/import/page.tsx
````typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, FolderInput, Sparkles, AlertCircle, CheckCircle2, FileWarning, Inbox, FileText, HelpCircle } from 'lucide-react';
import { scanAndAnalyzeFiles, GeneratedProject } from '@/lib/actions';
import { useProjects } from '@/context/project-context';
import { DOMAINS } from '@/lib/domains';
import { parseInboxText, inboxItemsToProjects } from '@/lib/inbox-parser';
import type { Project, Task } from '@/lib/types';

// Type for inbox-parsed projects (simpler than AI-generated)
type InboxProject = {
  name: string;
  description: string;
  domain?: Project['domain'];
  tags: string[];
  tasks: Task[];
};

export default function ImportPage() {
  // File scan state
  const [pathsInput, setPathsInput] = useState('');
  const [userContext, setUserContext] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    projects: GeneratedProject[];
    skipped: {path: string;reason: string;}[];
  } | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set());

  // Inbox state
  const [inboxInput, setInboxInput] = useState('');
  const [inboxProjects, setInboxProjects] = useState<InboxProject[] | null>(null);
  const [selectedInboxProjects, setSelectedInboxProjects] = useState<Set<number>>(new Set());
  const [isImportingInbox, setIsImportingInbox] = useState(false);

  const { projects: existingProjects, addProject } = useProjects();

  const handleScan = async () => {
    setError(null);
    setScanResult(null);
    setSelectedProjects(new Set());
    setIsScanning(true);

    try {
      const paths = pathsInput.
      split('\n').
      map((p) => p.trim()).
      filter((p) => p.length > 0);

      if (paths.length === 0) {
        setError('Please enter at least one file path');
        return;
      }

      const result = await scanAndAnalyzeFiles({
        filePaths: paths,
        existingProjectNames: existingProjects.map((p) => p.name),
        userContext: userContext || undefined
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setScanResult(result.data);
      // Select all by default
      setSelectedProjects(new Set(result.data.projects.map((_, i) => i)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred');
    } finally {
      setIsScanning(false);
    }
  };

  const handleImport = async () => {
    if (!scanResult) return;

    setIsImporting(true);
    setError(null);

    try {
      const projectsToImport = scanResult.projects.filter((_, i) => selectedProjects.has(i));

      for (const genProject of projectsToImport) {
        const project: Omit<Project, 'id' | 'updatedAt' | 'createdAt'> = {
          name: genProject.name,
          description: genProject.description,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks out
          importance: genProject.importance,
          size: genProject.size,
          relevance: genProject.relevance,
          domain: genProject.domain,
          status: 'active',
          tags: genProject.tags,
          tasks: genProject.tasks,
          milestones: [],
          sourcePaths: genProject.sourcePaths
        };

        addProject(project);
      }

      // Clear form after successful import
      setPathsInput('');
      setUserContext('');
      setScanResult(null);
      setSelectedProjects(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to import projects');
    } finally {
      setIsImporting(false);
    }
  };

  const toggleProject = (index: number) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedProjects(newSelected);
  };

  const toggleAll = () => {
    if (!scanResult) return;
    if (selectedProjects.size === scanResult.projects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(scanResult.projects.map((_, i) => i)));
    }
  };

  // Inbox handlers
  const handleParseInbox = () => {
    setError(null);
    const items = parseInboxText(inboxInput);
    if (items.length === 0) {
      setError('No valid items found. Use format: "- Task @domain #tag"');
      return;
    }
    const result = inboxItemsToProjects(items);
    setInboxProjects(result.projects);
    setSelectedInboxProjects(new Set(result.projects.map((_, i) => i)));
  };

  const handleImportInbox = async () => {
    if (!inboxProjects) return;
    setIsImportingInbox(true);
    setError(null);

    try {
      const toImport = inboxProjects.filter((_, i) => selectedInboxProjects.has(i));

      for (const p of toImport) {
        const project: Omit<Project, 'id' | 'updatedAt' | 'createdAt'> = {
          name: p.name,
          description: p.description,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          importance: 5,
          size: 4,
          relevance: '',
          domain: p.domain,
          status: 'active',
          tags: p.tags,
          tasks: p.tasks,
          milestones: []
        };
        addProject(project);
      }

      setInboxInput('');
      setInboxProjects(null);
      setSelectedInboxProjects(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to import');
    } finally {
      setIsImportingInbox(false);
    }
  };

  const toggleInboxProject = (index: number) => {
    const newSelected = new Set(selectedInboxProjects);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedInboxProjects(newSelected);
  };

  return (
    <div data-style-id="stylo-910" id="el-220" className="space-y-6 max-w-4xl mx-auto">
      <div data-style-id="stylo-911" id="el-221" className="flex items-center justify-between">
        <div data-style-id="stylo-912" id="el-222" className="flex items-center gap-3">
          <div data-style-id="stylo-913" id="el-223" className="p-2 rounded-lg bg-primary/10">
            <FolderInput data-style-id="stylo-914" className="h-6 w-6 text-primary" />
          </div>
          <div data-style-id="stylo-915" id="el-224">
            <h1 data-style-id="stylo-916" id="el-225" className="text-2xl font-bold tracking-tight">AI Import</h1>
            <p data-style-id="stylo-917" id="el-226" className="text-muted-foreground">
              Analyze files and create projects automatically using AI
            </p>
          </div>
        </div>

        <Dialog data-style-id="stylo-918">
          <DialogTrigger data-style-id="stylo-919" asChild>
            <Button data-style-id="stylo-920" variant="outline" size="sm" className="gap-2">
              <HelpCircle data-style-id="stylo-921" className="h-4 w-4" />
              How it works
            </Button>
          </DialogTrigger>
          <DialogContent data-style-id="stylo-922" className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader data-style-id="stylo-923">
              <DialogTitle data-style-id="stylo-924">AI Import Guide</DialogTitle>
              <DialogDescription data-style-id="stylo-925">
                Two ways to quickly create projects from your files and ideas
              </DialogDescription>
            </DialogHeader>

            <div data-style-id="stylo-926" id="el-227" className="space-y-6 mt-4">
              {/* Scan Files Section */}
              <div data-style-id="stylo-927" id="el-228" className="space-y-3">
                <h3 data-style-id="stylo-928" id="el-229" className="font-semibold flex items-center gap-2">
                  <FileText data-style-id="stylo-929" className="h-5 w-5 text-primary" />
                  Scan Files
                </h3>
                <p data-style-id="stylo-930" id="el-230" className="text-sm text-muted-foreground">
                  Point the AI at files on your computer. It reads the content and creates projects with relevant tasks, tags, and domain categorization.
                </p>

                <div data-style-id="stylo-931" id="el-231" className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p data-style-id="stylo-932" id="el-232" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example file paths:</p>
                  <pre data-style-id="stylo-933" id="el-233" className="text-sm font-mono bg-background rounded p-3 overflow-x-auto">{`/Users/you/Documents/album-concept.md
/Users/you/Code/my-app/README.md
/Users/you/Writing/poem-draft.txt
~/Desktop/project-notes.md`}</pre>
                </div>

                <div data-style-id="stylo-934" id="el-234" className="text-sm space-y-2">
                  <p data-style-id="stylo-935" id="el-235" className="font-medium">The AI will automatically detect:</p>
                  <ul data-style-id="stylo-936" id="el-236" className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li data-style-id="stylo-937" id="el-237"><strong data-style-id="stylo-938" id="el-238">Domain</strong> from file type (.ly → music, .py → coding, etc.)</li>
                    <li data-style-id="stylo-939" id="el-239"><strong data-style-id="stylo-940" id="el-240">Tasks</strong> from TODOs, action items, or logical next steps</li>
                    <li data-style-id="stylo-941" id="el-241"><strong data-style-id="stylo-942" id="el-242">Tags</strong> from keywords in the content</li>
                    <li data-style-id="stylo-943" id="el-243"><strong data-style-id="stylo-944" id="el-244">Priority</strong> based on urgency cues in the text</li>
                  </ul>
                </div>

                <div data-style-id="stylo-945" id="el-245" className="bg-muted/50 rounded-lg p-4">
                  <p data-style-id="stylo-946" id="el-246" className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Domain detection by file type:</p>
                  <div data-style-id="stylo-947" id="el-247" className="grid grid-cols-2 gap-2 text-sm">
                    <div data-style-id="stylo-948" id="el-248"><code data-style-id="stylo-949" id="el-249" className="text-xs">.ly .midi .wav</code> → Music</div>
                    <div data-style-id="stylo-950" id="el-250"><code data-style-id="stylo-951" id="el-251" className="text-xs">.ts .js .py .rs</code> → Coding</div>
                    <div data-style-id="stylo-952" id="el-252"><code data-style-id="stylo-953" id="el-253" className="text-xs">.script</code> → Theatre</div>
                    <div data-style-id="stylo-954" id="el-254"><code data-style-id="stylo-955" id="el-255" className="text-xs">.psd .sketch .fig</code> → Visual Art</div>
                    <div data-style-id="stylo-956" id="el-256"><code data-style-id="stylo-957" id="el-257" className="text-xs">.md .txt</code> → (analyzed by content)</div>
                  </div>
                </div>
              </div>

              <Separator data-style-id="stylo-958" />

              {/* Quick Add Section */}
              <div data-style-id="stylo-959" id="el-258" className="space-y-3">
                <h3 data-style-id="stylo-960" id="el-259" className="font-semibold flex items-center gap-2">
                  <Inbox data-style-id="stylo-961" className="h-5 w-5 text-primary" />
                  Quick Add (Inbox Format)
                </h3>
                <p data-style-id="stylo-962" id="el-260" className="text-sm text-muted-foreground">
                  Dump ideas quickly using a simple text format. No AI call needed—instant parsing.
                </p>

                <div data-style-id="stylo-963" id="el-261" className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p data-style-id="stylo-964" id="el-262" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example inbox text:</p>
                  <pre data-style-id="stylo-965" id="el-263" className="text-sm font-mono bg-background rounded p-3 overflow-x-auto">{`- [ ] Finish album cover design @visual-art #urgent
- Record vocals for track 3 @music #studio
- Fix authentication bug @coding #backend
- Schedule dentist appointment @health
- Research Baroque counterpoint @theory @music
- Outline new screenplay @theatre #draft`}</pre>
                </div>

                <div data-style-id="stylo-966" id="el-264" className="text-sm space-y-2">
                  <p data-style-id="stylo-967" id="el-265" className="font-medium">Format syntax:</p>
                  <ul data-style-id="stylo-968" id="el-266" className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li data-style-id="stylo-969" id="el-267"><code data-style-id="stylo-970" id="el-268" className="text-xs bg-muted px-1 rounded">- [ ]</code> or <code data-style-id="stylo-971" id="el-269" className="text-xs bg-muted px-1 rounded">-</code> starts a new item</li>
                    <li data-style-id="stylo-972" id="el-270"><code data-style-id="stylo-973" id="el-271" className="text-xs bg-muted px-1 rounded">@domain</code> assigns a domain (music, coding, health, etc.)</li>
                    <li data-style-id="stylo-974" id="el-272"><code data-style-id="stylo-975" id="el-273" className="text-xs bg-muted px-1 rounded">#tag</code> adds tags (can use multiple)</li>
                    <li data-style-id="stylo-976" id="el-274">Items are grouped by domain into projects</li>
                  </ul>
                </div>

                <div data-style-id="stylo-977" id="el-275" className="bg-muted/50 rounded-lg p-4">
                  <p data-style-id="stylo-978" id="el-276" className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Available domains:</p>
                  <div data-style-id="stylo-979" id="el-277" className="flex flex-wrap gap-2">
                    {Object.entries(DOMAINS).map(([key, config]) =>
                    <Badge data-style-id="stylo-980" key={key} variant="outline" style={{ borderColor: config.color, color: config.color }}>
                        @{key}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator data-style-id="stylo-981" />

              {/* Tips Section */}
              <div data-style-id="stylo-982" id="el-278" className="space-y-3">
                <h3 data-style-id="stylo-983" id="el-279" className="font-semibold">Tips</h3>
                <ul data-style-id="stylo-984" id="el-280" className="text-sm space-y-2 text-muted-foreground">
                  <li data-style-id="stylo-985" id="el-281" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-986" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-987" id="el-282">Add <strong data-style-id="stylo-988" id="el-283">context</strong> in the Scan Files tab to help the AI understand your goals</span>
                  </li>
                  <li data-style-id="stylo-989" id="el-284" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-990" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-991" id="el-285">Projects track their <strong data-style-id="stylo-992" id="el-286">source files</strong>, so you can re-scan to update them later</span>
                  </li>
                  <li data-style-id="stylo-993" id="el-287" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-994" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-995" id="el-288">Use Quick Add for <strong data-style-id="stylo-996" id="el-289">brain dumps</strong>—type fast, organize later</span>
                  </li>
                  <li data-style-id="stylo-997" id="el-290" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-998" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-999" id="el-291">Review and <strong data-style-id="stylo-1000" id="el-292">deselect</strong> any projects you don't want before importing</span>
                  </li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs data-style-id="stylo-1001" defaultValue="files" className="w-full">
        <TabsList data-style-id="stylo-1002" className="grid w-full grid-cols-2">
          <TabsTrigger data-style-id="stylo-1003" value="files" className="flex items-center gap-2">
            <FileText data-style-id="stylo-1004" className="h-4 w-4" />
            Scan Files
          </TabsTrigger>
          <TabsTrigger data-style-id="stylo-1005" value="inbox" className="flex items-center gap-2">
            <Inbox data-style-id="stylo-1006" className="h-4 w-4" />
            Quick Add
          </TabsTrigger>
        </TabsList>

        <TabsContent data-style-id="stylo-1007" value="files" className="space-y-6 mt-6">
          <Card data-style-id="stylo-1008">
            <CardHeader data-style-id="stylo-1009">
              <CardTitle data-style-id="stylo-1010" className="text-lg">File Paths</CardTitle>
              <CardDescription data-style-id="stylo-1011">
                Enter file paths to analyze (one per line). The AI will read each file and suggest projects.
              </CardDescription>
            </CardHeader>
        <CardContent data-style-id="stylo-1012" className="space-y-4">
          <Textarea data-style-id="stylo-1013"
              placeholder={`/Users/you/Documents/project-idea.md
/Users/you/Music/new-song.ly
/Users/you/Code/app/README.md`}
              value={pathsInput}
              onChange={(e) => setPathsInput(e.target.value)}
              rows={6}
              className="font-mono text-sm" />


          <div data-style-id="stylo-1014" id="el-293">
            <label data-style-id="stylo-1015" id="el-294" className="text-sm font-medium mb-2 block">Context (optional)</label>
            <Textarea data-style-id="stylo-1016"
                placeholder="Add context about your goals or preferences to help the AI..."
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                rows={2} />

          </div>
        </CardContent>
        <CardFooter data-style-id="stylo-1017">
          <Button data-style-id="stylo-1018" onClick={handleScan} disabled={isScanning || !pathsInput.trim()}>
            {isScanning ?
                <>
                <Loader2 data-style-id="stylo-1019" className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </> :

                <>
                <Sparkles data-style-id="stylo-1020" className="mr-2 h-4 w-4" />
                Scan Files
              </>
                }
          </Button>
        </CardFooter>
      </Card>

      {scanResult &&
          <>
          {scanResult.skipped.length > 0 &&
            <Alert data-style-id="stylo-1021">
              <FileWarning data-style-id="stylo-1022" className="h-4 w-4" />
              <AlertTitle data-style-id="stylo-1023">Skipped Files ({scanResult.skipped.length})</AlertTitle>
              <AlertDescription data-style-id="stylo-1024">
                <ul data-style-id="stylo-1025" id="el-295" className="mt-2 space-y-1 text-sm">
                  {scanResult.skipped.map((s, i) =>
                  <li data-style-id="stylo-1026" id="el-296" key={i} className="font-mono">
                      <span data-style-id="stylo-1027" id="el-297" className="text-muted-foreground">{s.path}:</span> {s.reason}
                    </li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
            }

          {scanResult.projects.length > 0 ?
            <Card data-style-id="stylo-1028">
              <CardHeader data-style-id="stylo-1029">
                <div data-style-id="stylo-1030" id="el-298" className="flex items-center justify-between">
                  <div data-style-id="stylo-1031" id="el-299">
                    <CardTitle data-style-id="stylo-1032" className="text-lg flex items-center gap-2">
                      <CheckCircle2 data-style-id="stylo-1033" className="h-5 w-5 text-green-500" />
                      Generated Projects ({scanResult.projects.length})
                    </CardTitle>
                    <CardDescription data-style-id="stylo-1034">
                      Review and select projects to import
                    </CardDescription>
                  </div>
                  <Button data-style-id="stylo-1035" variant="outline" size="sm" onClick={toggleAll}>
                    {selectedProjects.size === scanResult.projects.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent data-style-id="stylo-1036">
                <ScrollArea data-style-id="stylo-1037" className="h-[400px] pr-4">
                  <div data-style-id="stylo-1038" id="el-300" className="space-y-4">
                    {scanResult.projects.map((project, index) => {
                      const domainConfig = project.domain ? DOMAINS[project.domain] : null;
                      const isSelected = selectedProjects.has(index);

                      return (
                        <div data-style-id="stylo-1039" id="el-301"
                        key={index}
                        className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/50'}`
                        }
                        onClick={() => toggleProject(index)}>

                          <div data-style-id="stylo-1040" id="el-302" className="flex items-start gap-3">
                            <Checkbox data-style-id="stylo-1041"
                            checked={isSelected}
                            onCheckedChange={() => toggleProject(index)}
                            onClick={(e) => e.stopPropagation()} />

                            <div data-style-id="stylo-1042" id="el-303" className="flex-1 min-w-0">
                              <div data-style-id="stylo-1043" id="el-304" className="flex items-center gap-2 flex-wrap">
                                <h3 data-style-id="stylo-1044" id="el-305" className="font-semibold">{project.name}</h3>
                                {domainConfig &&
                                <Badge data-style-id="stylo-1045"
                                variant="outline"
                                style={{
                                  borderColor: domainConfig.color,
                                  color: domainConfig.color
                                }}>

                                    {domainConfig.label}
                                  </Badge>
                                }
                                <Badge data-style-id="stylo-1046" variant="secondary">
                                  {project.importance}/10 priority
                                </Badge>
                                <Badge data-style-id="stylo-1047" variant="secondary">
                                  ~{project.size}h
                                </Badge>
                              </div>
                              <p data-style-id="stylo-1048" id="el-306" className="text-sm text-muted-foreground mt-1">
                                {project.description}
                              </p>
                              {project.tags.length > 0 &&
                              <div data-style-id="stylo-1049" id="el-307" className="flex gap-1 mt-2 flex-wrap">
                                  {project.tags.map((tag, i) =>
                                <Badge data-style-id="stylo-1050" key={i} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                )}
                                </div>
                              }
                              {project.tasks.length > 0 &&
                              <div data-style-id="stylo-1051" id="el-308" className="mt-3">
                                  <p data-style-id="stylo-1052" id="el-309" className="text-xs text-muted-foreground mb-1">
                                    Tasks ({project.tasks.length}):
                                  </p>
                                  <ul data-style-id="stylo-1053" id="el-310" className="text-sm space-y-1">
                                    {project.tasks.slice(0, 3).map((task, i) =>
                                  <li data-style-id="stylo-1054" id="el-311" key={i} className="flex items-center gap-2">
                                        <span data-style-id="stylo-1055" id="el-312" className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                                        {task.title}
                                      </li>
                                  )}
                                    {project.tasks.length > 3 &&
                                  <li data-style-id="stylo-1056" id="el-313" className="text-muted-foreground text-xs">
                                        +{project.tasks.length - 3} more tasks
                                      </li>
                                  }
                                  </ul>
                                </div>
                              }
                              <p data-style-id="stylo-1057" id="el-314" className="text-xs text-muted-foreground mt-2 font-mono truncate">
                                Source: {project.sourcePaths.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>);

                    })}
                  </div>
                </ScrollArea>
              </CardContent>
              <Separator data-style-id="stylo-1058" />
              <CardFooter data-style-id="stylo-1059" className="pt-4">
                <Button data-style-id="stylo-1060"
                onClick={handleImport}
                disabled={isImporting || selectedProjects.size === 0}
                className="w-full">

                  {isImporting ?
                  <>
                      <Loader2 data-style-id="stylo-1061" className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </> :

                  <>
                      Import {selectedProjects.size} Project{selectedProjects.size !== 1 ? 's' : ''}
                    </>
                  }
                </Button>
              </CardFooter>
            </Card> :

            <Alert data-style-id="stylo-1062">
              <AlertCircle data-style-id="stylo-1063" className="h-4 w-4" />
              <AlertTitle data-style-id="stylo-1064">No Projects Generated</AlertTitle>
              <AlertDescription data-style-id="stylo-1065">
                The AI didn't find any files suitable for conversion to projects.
                Try different files or add more context.
              </AlertDescription>
            </Alert>
            }
        </>
          }
        </TabsContent>

        <TabsContent data-style-id="stylo-1066" value="inbox" className="space-y-6 mt-6">
          <Card data-style-id="stylo-1067">
            <CardHeader data-style-id="stylo-1068">
              <CardTitle data-style-id="stylo-1069" className="text-lg">Quick Add</CardTitle>
              <CardDescription data-style-id="stylo-1070">
                Paste or type items in inbox format. Use @domain and #tags to categorize.
              </CardDescription>
            </CardHeader>
            <CardContent data-style-id="stylo-1071" className="space-y-4">
              <Textarea data-style-id="stylo-1072"
              placeholder={`- [ ] Finish album artwork @visual-art #urgent
- Schedule dentist @health
- Fix login bug @coding #actiondeck
- Build new synth patch @music
- Research color theory @theory @visual-art`}
              value={inboxInput}
              onChange={(e) => setInboxInput(e.target.value)}
              rows={8}
              className="font-mono text-sm" />

              <div data-style-id="stylo-1073" id="el-315" className="text-xs text-muted-foreground space-y-1">
                <p data-style-id="stylo-1074" id="el-316"><strong data-style-id="stylo-1075" id="el-317">Format:</strong> Lines starting with - or - [ ] become items</p>
                <p data-style-id="stylo-1076" id="el-318"><strong data-style-id="stylo-1077" id="el-319">@domain:</strong> music, poetry, theatre, theory, coding, visual-art, health, home</p>
                <p data-style-id="stylo-1078" id="el-320"><strong data-style-id="stylo-1079" id="el-321">#tag:</strong> Add any tags you want</p>
              </div>
            </CardContent>
            <CardFooter data-style-id="stylo-1080">
              <Button data-style-id="stylo-1081" onClick={handleParseInbox} disabled={!inboxInput.trim()}>
                <Inbox data-style-id="stylo-1082" className="mr-2 h-4 w-4" />
                Parse Items
              </Button>
            </CardFooter>
          </Card>

          {inboxProjects && inboxProjects.length > 0 &&
          <Card data-style-id="stylo-1083">
              <CardHeader data-style-id="stylo-1084">
                <CardTitle data-style-id="stylo-1085" className="text-lg flex items-center gap-2">
                  <CheckCircle2 data-style-id="stylo-1086" className="h-5 w-5 text-green-500" />
                  Parsed Projects ({inboxProjects.length})
                </CardTitle>
                <CardDescription data-style-id="stylo-1087">
                  Review and import your items
                </CardDescription>
              </CardHeader>
              <CardContent data-style-id="stylo-1088">
                <div data-style-id="stylo-1089" id="el-322" className="space-y-3">
                  {inboxProjects.map((project, index) => {
                  const domainConfig = project.domain ? DOMAINS[project.domain] : null;
                  const isSelected = selectedInboxProjects.has(index);

                  return (
                    <div data-style-id="stylo-1090" id="el-323"
                    key={index}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'}`
                    }
                    onClick={() => toggleInboxProject(index)}>

                        <div data-style-id="stylo-1091" id="el-324" className="flex items-start gap-3">
                          <Checkbox data-style-id="stylo-1092"
                        checked={isSelected}
                        onCheckedChange={() => toggleInboxProject(index)}
                        onClick={(e) => e.stopPropagation()} />

                          <div data-style-id="stylo-1093" id="el-325" className="flex-1">
                            <div data-style-id="stylo-1094" id="el-326" className="flex items-center gap-2 flex-wrap">
                              <span data-style-id="stylo-1095" id="el-327" className="font-medium">{project.name}</span>
                              {domainConfig &&
                            <Badge data-style-id="stylo-1096"
                            variant="outline"
                            style={{ borderColor: domainConfig.color, color: domainConfig.color }}>

                                  {domainConfig.label}
                                </Badge>
                            }
                              {project.tags.map((tag, i) =>
                            <Badge data-style-id="stylo-1097" key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                            )}
                            </div>
                            {project.tasks.length > 0 &&
                          <p data-style-id="stylo-1098" id="el-328" className="text-sm text-muted-foreground mt-1">
                                {project.tasks.length} task{project.tasks.length !== 1 ? 's' : ''}
                              </p>
                          }
                          </div>
                        </div>
                      </div>);

                })}
                </div>
              </CardContent>
              <Separator data-style-id="stylo-1099" />
              <CardFooter data-style-id="stylo-1100" className="pt-4">
                <Button data-style-id="stylo-1101"
              onClick={handleImportInbox}
              disabled={isImportingInbox || selectedInboxProjects.size === 0}
              className="w-full">

                  {isImportingInbox ?
                <>
                      <Loader2 data-style-id="stylo-1102" className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </> :

                <>
                      Import {selectedInboxProjects.size} Project{selectedInboxProjects.size !== 1 ? 's' : ''}
                    </>
                }
                </Button>
              </CardFooter>
            </Card>
          }
        </TabsContent>
      </Tabs>

      {error &&
      <Alert data-style-id="stylo-1103" variant="destructive">
          <AlertCircle data-style-id="stylo-1104" className="h-4 w-4" />
          <AlertTitle data-style-id="stylo-1105">Error</AlertTitle>
          <AlertDescription data-style-id="stylo-1106">{error}</AlertDescription>
        </Alert>
      }
    </div>);

}
````

## File: src/app/(app)/prioritize/page.tsx
````typescript
import { PrioritizationForm } from '@/components/prioritize/prioritization-form';

export default function PrioritizePage() {
  return (
    <div data-style-id="stylo-1116" id="el-332" className="space-y-2">
             <div data-style-id="stylo-1117" id="el-333" className="flex items-center justify-between">
                <div data-style-id="stylo-1118" id="el-334" className="space-y-1">
                    <h1 data-style-id="stylo-1119" id="el-335" className="text-2xl font-bold tracking-tight">AI Project Prioritizer</h1>
                    <p data-style-id="stylo-1120" id="el-336" className="text-muted-foreground max-w-2xl">
                        Let AI help you decide what to work on next. Select projects from your dashboard, add your current goals, and get a prioritized list with clear reasoning.
                    </p>
                </div>
            </div>
            <div data-style-id="stylo-1121" id="el-337" className="pt-4">
              <PrioritizationForm data-style-id="stylo-1122" />
            </div>
        </div>);

}
````

## File: src/app/(app)/settings/page.tsx
````typescript
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/context/settings-context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const { settings, isReady, updateSettings, uid } = useSettings();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const stop = onAuthStateChanged(getAuth(), (u) => setAuthed(!!u));
    return () => stop();
  }, []);

  return (
    <Card data-style-id="stylo-1123">
      <CardHeader data-style-id="stylo-1124">
        <CardTitle data-style-id="stylo-1125">Settings</CardTitle>
        <CardDescription data-style-id="stylo-1126">Configure Action Deck behavior. These settings are saved to your account.</CardDescription>
      </CardHeader>
      <CardContent data-style-id="stylo-1127" className="space-y-6">
        {!authed &&
        <div data-style-id="stylo-1128" id="el-338" className="text-sm text-muted-foreground">Sign in on the Login page to change settings.</div>
        }
        <div data-style-id="stylo-1129" id="el-339" className="flex items-center justify-between">
          <div data-style-id="stylo-1130" id="el-340">
            <Label data-style-id="stylo-1131" htmlFor="sync">Save to cloud</Label>
            <p data-style-id="stylo-1132" id="el-341" className="text-sm text-muted-foreground">When on, projects and tasks save to your Firestore under users/&lt;uid&gt;/apps/actionDeck/…</p>
          </div>
          <Switch data-style-id="stylo-1133" id="sync" checked={!!settings.enableSync} disabled={!authed || !isReady} onCheckedChange={(v) => updateSettings({ enableSync: !!v })} />
        </div>
        <div data-style-id="stylo-1134" id="el-342" className="flex items-center justify-between">
          <div data-style-id="stylo-1135" id="el-343">
            <Label data-style-id="stylo-1136" htmlFor="import">Import from briizOS</Label>
            <p data-style-id="stylo-1137" id="el-344" className="text-sm text-muted-foreground">Show briizOS organizer items in the Casual Task List (read-only).</p>
          </div>
          <Switch data-style-id="stylo-1138" id="import" checked={!!settings.importBriizOS} disabled={!authed || !isReady} onCheckedChange={(v) => updateSettings({ importBriizOS: !!v })} />
        </div>
      </CardContent>
    </Card>);

}
````

## File: src/app/(app)/tasks/page.tsx
````typescript
import { TaskList } from '@/components/tasks/task-list';

export default function TasksPage() {
  return (
    <div data-style-id="stylo-1139" id="el-345" className="space-y-4">
            <TaskList data-style-id="stylo-1140" />
        </div>);

}
````

## File: src/app/(app)/today/page.tsx
````typescript
import { TodayPageContent } from '@/components/today/today-page';

export default function TodayPage() {
  return (
    <div data-style-id="stylo-1141" id="el-447" className="space-y-4">
      <TodayPageContent data-style-id="stylo-1142" />
    </div>);

}
````

## File: src/app/(app)/layout.tsx
````typescript
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { ProjectProvider } from '@/context/project-context';
import { SettingsProvider } from '@/context/settings-context';
import { FilterInitializer } from '@/components/layout/filter-initializer';

// Force dynamic rendering for all app routes using Firebase
export const dynamic = 'force-dynamic';

export default function AppLayout({
  children


}: {children: React.ReactNode;}) {

  return (
    <SettingsProvider data-style-id="stylo-1107">
      <ProjectProvider data-style-id="stylo-1108">
      {/* Background panel layer - sits behind everything */}
      <div data-style-id="stylo-1109" id="app-background-panel" className="app-background-panel fixed inset-0 -z-10" />

      {/* Filter container - CSS filters are applied to this */}
      <div data-style-id="stylo-1110" id="app-filter-container" className="flex min-h-screen w-full flex-col bg-muted/40">
        <AppSidebar data-style-id="stylo-1111" />
        <div data-style-id="stylo-1112" id="el-330" className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header data-style-id="stylo-1113" />
          <main data-style-id="stylo-1114" id="el-331" className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>

      {/* Initializes filters from saved settings */}
      <FilterInitializer data-style-id="stylo-1115" />
    </ProjectProvider>
    </SettingsProvider>);

}
````

## File: src/app/login/page.tsx
````typescript
'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{uid: string;email: string | null;} | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? { uid: u.uid, email: u.email } : null);
    });
    return () => unsub();
  }, [auth]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-style-id="stylo-1152" id="el-352" className="flex items-center justify-center min-h-[60vh] p-4">
      <Card data-style-id="stylo-1153" className="w-full max-w-md">
        <CardHeader data-style-id="stylo-1154">
          <CardTitle data-style-id="stylo-1155">{user ? 'Account' : mode === 'login' ? 'Log in' : 'Create account'}</CardTitle>
          <CardDescription data-style-id="stylo-1156">
            {user ? 'You are signed in. Use the app routes now.' : 'Use email + password to authenticate.'}
          </CardDescription>
        </CardHeader>
        <CardContent data-style-id="stylo-1157">
          {user ?
          <div data-style-id="stylo-1158" id="el-353" className="space-y-4">
              <div data-style-id="stylo-1159" id="el-354" className="text-sm text-muted-foreground">UID: {user.uid}</div>
              <div data-style-id="stylo-1160" id="el-355" className="text-sm text-muted-foreground">Email: {user.email || '—'}</div>
              <Button data-style-id="stylo-1161" onClick={() => signOut(auth)}>Sign out</Button>
            </div> :

          <form data-style-id="stylo-1162" id="el-356" onSubmit={handleSubmit} className="space-y-4">
              <div data-style-id="stylo-1163" id="el-357" className="grid gap-2">
                <label data-style-id="stylo-1164" id="el-358" className="text-sm">Email</label>
                <Input data-style-id="stylo-1165" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div data-style-id="stylo-1166" id="el-359" className="grid gap-2">
                <label data-style-id="stylo-1167" id="el-360" className="text-sm">Password</label>
                <Input data-style-id="stylo-1168" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <div data-style-id="stylo-1169" id="el-361" className="text-sm text-destructive">{error}</div>}
              <div data-style-id="stylo-1170" id="el-362" className="flex items-center gap-2">
                <Button data-style-id="stylo-1171" type="submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}</Button>
                <Button data-style-id="stylo-1172" type="button" variant="outline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                  {mode === 'login' ? 'Need an account?' : 'Have an account?'}
                </Button>
              </div>
            </form>
          }
        </CardContent>
      </Card>
    </div>);

}
````

## File: src/app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Neon teal cyber theme inspired by browzrbase */
  :root {
    --background: 210 30% 15%; /* near-black */

    --card: 210 30% 5%;
    --card-foreground: 180 15% 92%;

    --popover: 210 30% 5%;
    --popover-foreground: 180 15% 92%;

    --primary: 165 100% 45%; /* neon teal */
    --primary-foreground: 210 30% 6%;

    --secondary: 200 70% 45%; /* sky/cyan accents */
    --secondary-foreground: 180 15% 92%;

    --muted: 210 20% 14%;
    --muted-foreground: 190 10% 70%;

    --accent: 315 85% 55%; /* pink/magenta accent */
    --accent-foreground: 180 15% 92%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 180 15% 92%;

    --border: 165 70% 30%; /* teal border */
    --input: 210 20% 18%;
    --ring: 165 100% 45%;

    --radius: 1.2rem;

    --chart-1: 165 100% 45%;
    --chart-2: 200 70% 45%;
    --chart-3: 315 85% 55%;
    --chart-4: 180 5% 96%;
    --chart-5: 210 20% 14%;
  }

  .dark {
    /* same values in dark for consistent neon look */
    --background: 210 30% 2.5%;
    --foreground: 180 15% 92%;
    --card: 210 30% 5%;
    --card-foreground: 180 15% 92%;
    --popover: 210 30% 5%;
    --popover-foreground: 180 15% 92%;
    --primary: 165 80% 45%;
    --primary-foreground: 210 30% 6%;
    --secondary: 200 70% 45%;
    --secondary-foreground: 180 15% 92%;
    --muted: 210 20% 14%;
    --muted-foreground: 190 10% 70%;
    --accent: 315 85% 39%;
    --accent-foreground: 180 15% 92%;
    --destructive: 0 62% 35%;
    --destructive-foreground: 180 15% 92%;
    --border: 165 70% 22%;
    --input: 210 20% 18%;
    --ring: 165 100% 45%;
    --chart-1: 165 100% 45%;
    --chart-2: 210 20% 14%;
    --chart-3: 315 85% 55%;
    --chart-4: 180 15% 92%;
    --chart-5: 210 30% 5%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
header, body > div.flex.min-h-screen.w-full.flex-col > div > header {
  background:linear-gradient(to top, black, rgba(0, 0, 0, 0.743), rgba(0, 128, 128, 0.275));;
  z-index:100000;
  position:fixed;
  top:0;
  padding:10px;
  padding-top:4px;
  padding-bottom:4px;
  left:10%;
  box-shadow:-50vw 0 40px black, 50vw 0 40px black;
  right:10%;
  border-radius:0 0 30px 30px;
  backdrop-filter:blur(5px);
}
@layer components {
  /* Global skin similar to browzrbase window */
  .browzr-skin {
    background: linear-gradient(to bottom, hsl(180 100% 25%), hsl(210 30% 2.5%) 8%, hsl(210 30% 2.5%));
    box-shadow: inset 0 0 30px hsla(165, 100%, 35%, 0.4);
    min-height: 100vh;
    overflow-y: scroll;
  }

  /* Subtle neon edges for cards/containers */
  .neon-surface {
    background: linear-gradient(
      to bottom,
      hsla(180, 100%, 25%, 0.2),
      hsla(210, 30%, 2%, 0.9)
    );
    border: 1px solid hsla(165, 70%, 40%, 0.35);
    border-radius: 16px;
    box-shadow: 0 0 8px hsla(165, 100%, 45%, 0.25) inset;
  }

  .neon-input {
    background: linear-gradient(to bottom, hsla(180, 100%, 25%, 0.35), hsl(210 30% 2.5%) 36%, hsl(210 30% 2.5%));
    border: 1px solid hsla(165, 70%, 40%, 0.55);
    color: hsl(165 100% 75%);
  }

  .neon-glow {
    box-shadow: 0 0 8px hsla(165, 100%, 45%, 0.6), 0 0 16px hsla(190, 90%, 60%, 0.25);
  }
  main {
    padding-top: 40px !important;
  }
  /* Glassy teal button look */
  .glass-green {
    background: linear-gradient(
      to bottom,
      hsla(165, 100%, 45%, 0.25),
      hsla(165, 100%, 35%, 0.12)
    );
    border: 1px solid hsla(165, 90%, 55%, 0.45);
    color: hsl(165 100% 80%);
    backdrop-filter: saturate(140%) blur(2px);
    -webkit-backdrop-filter: saturate(140%) blur(2px);
    text-shadow: 0 0 6px hsla(165, 100%, 45%, 0.4);
  }
  .glass-green:hover {
    background: linear-gradient(
      to bottom,
      hsla(165, 100%, 55%, 0.35),
      hsla(165, 100%, 35%, 0.2)
    );
    box-shadow: 0 0 10px hsla(165, 100%, 45%, 0.5), inset 0 0 10px hsla(165, 100%, 35%, 0.25);
  }

  .task-deck {
    @apply relative space-y-2;
  }
  
  .task-deck[data-state='collapsed'] {
     @apply min-h-[64px];
  }

  .task-deck[data-state='collapsed'] .task-deck-item {
    @apply transition-all duration-300 ease-in-out;
  }
  
  .task-deck[data-state='collapsed'] .task-deck-item {
    @apply absolute left-0 right-0 top-0 rounded-lg border bg-background shadow-sm;
  }
  
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(1) {
     transform: translateY(0px) translateX(0px);
     z-index: 0;
  }
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(2) {
    transform: translateY(4px) translateX(4px);
    z-index: -1;
  }
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(3) {
    transform: translateY(8px) translateX(8px);
    z-index: -2;
  }
  /* Show only the first 3 stacked cards */
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(n+4) {
    @apply hidden;
  }
  
  .task-deck[data-state='expanded'] .task-deck-item {
    @apply mb-2;
  }
}

/* ============================================================================
   COMPONENT CUSTOMIZATION SECTION
   ============================================================================

   This section contains all semantic IDs and classes for ActionDeck components.
   Use these selectors to customize the appearance of specific UI elements.

   Documentation: See COMPONENT-IDS.md for the complete mapping of all IDs.
   ============================================================================ */

/* ============================================================================
   LAYOUT COMPONENTS
   ============================================================================ */

/* Sidebar */
#layout-sidebar {
  /* Main sidebar container */
}

#layout-sidebar-nav {
  /* Navigation container within sidebar */
}

#layout-sidebar-logo {
  /* Logo/home link */
}

#layout-sidebar-nav-dashboard,
#layout-sidebar-nav-tasks,
#layout-sidebar-nav-prioritize,
#layout-sidebar-nav-import {
  /* Individual navigation links */
}

#layout-sidebar-domains {
  /* Domain collapsible section */
}

#layout-sidebar-domains-trigger {
  /* Domain expand/collapse button */
}

#layout-sidebar-settings {
  /* Settings button in sidebar */
}

/* Header */
#layout-header {
  /* Main header container */
}

#layout-header-mobile-trigger {
  /* Mobile menu button */
}

#layout-header-breadcrumb {
  /* Breadcrumb navigation */
}

#layout-header-settings-trigger {
  /* Settings button in header */
}

/* ============================================================================
   DASHBOARD COMPONENTS
   ============================================================================ */

/* Project List & Toolbar */
#dashboard-project-list {
  /* Main project list container */
}

#dashboard-toolbar {
  /* Top toolbar with search and actions */
}

#dashboard-search {
  /* Search bar */
}

#dashboard-export-btn {
  /* Export button */
}

#dashboard-new-project-btn {
  /* New project button */
}

#dashboard-status-tabs {
  /* Status filter tabs */
}

#dashboard-project-grid {
  /* Project card grid container */
}

/* Project Cards (multiple instances - use classes) */
.dashboard-project-card {
  /* Individual project card */
}

.dashboard-project-card-header {
  /* Card header section */
}

.dashboard-project-card-title {
  /* Project title */
}

.dashboard-project-card-description {
  /* Project description */
}

.dashboard-project-card-content {
  /* Card main content area */
}

.dashboard-project-card-footer {
  /* Card footer with actions */
}

.dashboard-project-card-view-btn {
  /* View details button */
}

/* ============================================================================
   TASK COMPONENTS
   ============================================================================ */

/* Task List */
#tasks-card {
  /* Main task list card */
}

#tasks-input-form {
  /* Add task form */
}

#tasks-input-field {
  /* Task input field */
}

#tasks-add-btn {
  /* Add task button */
}

#tasks-ai-breakdown-btn {
  /* AI breakdown button */
}

#tasks-clarification-alert {
  /* AI clarification alert */
}

#tasks-pending-section {
  /* Pending tasks section */
}

#tasks-completed-section {
  /* Completed tasks section */
}

/* Task Items (multiple instances - use classes) */
.tasks-item {
  /* Individual task item */
}

.tasks-item-checkbox {
  /* Task checkbox */
}

.tasks-item-label {
  /* Task label text */
}

/* Task Decks (multiple instances - use classes) */
.tasks-deck {
  /* Task deck container */
}

.tasks-deck-header {
  /* Deck header with title and controls */
}

.tasks-deck-title {
  /* Deck title */
}

.tasks-deck-progress {
  /* Deck progress indicator (X/Y format) */
}

.tasks-deck-content {
  /* Collapsible task list within deck */
}

/* ============================================================================
   PRIORITIZE COMPONENTS
   ============================================================================ */

/* Prioritization Form */
#prioritize-form-card {
  /* Form card container */
}

#prioritize-form {
  /* Main prioritization form */
}

#prioritize-project-checkboxes {
  /* Project selection checkboxes area */
}

#prioritize-goals-input {
  /* User goals textarea */
}

#prioritize-timing-input {
  /* Timing/context textarea */
}

#prioritize-submit-btn {
  /* Submit button */
}

/* Prioritization Result */
#prioritize-result-card {
  /* Result card container */
}

#prioritize-result {
  /* Result display container */
}

#prioritize-result-content {
  /* Result content with prioritized list and reasoning */
}

#layout-sidebar {
  background: linear-gradient(to bottom, var(--card), var(--background));
  border-right: 2px solid var(--border);
}

.dashboard-project-card {
  transition: all 0.3s ease;
}

.dashboard-project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

#tasks-input-form {
  padding: 1rem;
  background: var(--muted);
  border-radius: 0.5rem;
}

.tasks-deck {
  border-left: 3px solid var(--primary);
  padding-left: 1rem;
}

#prioritize-submit-btn {
  background: var(--primary);
  color: var(--primary-foreground);
  font-weight: 600;
}


#el-71 {
  position:absolute;
left:8px;
  bottom:5%;
  width:4%;
  background:red;
animation:alert .51s linear infinite;
transform:scale(.3);
 overflow:hidden;
  text-wrap-mode:nowrap;;
}
@keyframes alert{
  0%, 100%{
    filter:brightness(0);
  }
  50%{
   filter:brightness(1);
  }
}

#dashboard-status-tabs, #dashboard-status-tabs>div { 
border:none !important;
display:flex;
gap:10px;
}

#radix-_R_3rabnalb_ {
  overflow: scroll !important;
  height:90vh !important;
  box-shadow:inset 0 0 40px teal;
  border-radius:0px 0px 20px 20px;
}


#layout-sidebar {background:linear-gradient(to right, rgb(0, 11,10), transparent);;border-right:1px solid teal;;}

/* Background Panel Styles */
.app-background-panel {
  pointer-events: none;
}

.app-background-panel.bg-none {
  background: transparent;
}

.app-background-panel.bg-stars {
  background:
    radial-gradient(2px 2px at 20px 30px, white, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, white, transparent),
    radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 230px 80px, white, transparent),
    radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 370px 50px, white, transparent),
    radial-gradient(2px 2px at 450px 180px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 520px 90px, white, transparent),
    radial-gradient(2px 2px at 600px 200px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 680px 60px, white, transparent),
    radial-gradient(2px 2px at 750px 140px, rgba(255,255,255,0.9), transparent);
  background-size: 800px 250px;
  background-color: transparent;
  animation: twinkle 8s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

.app-background-panel.bg-grid {
  background-image:
    linear-gradient(rgba(0, 128, 128, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 128, 128, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

.app-background-panel.bg-dots {
  background-image: radial-gradient(rgba(0, 128, 128, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

.app-background-panel.bg-waves {
  background:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(0, 128, 128, 0.05) 20px,
      rgba(0, 128, 128, 0.05) 40px
    );
}

/* ============================================
   Today Page Styles
   ============================================ */

.today-page {
  min-height: calc(100vh - 120px);
}

.today-header-card {
  background: linear-gradient(to bottom, hsla(165, 100%, 45%, 0.1), hsla(210, 30%, 5%, 0.8));
  border: 1px solid hsla(165, 70%, 40%, 0.3);
}

.today-entry-card {
  background: linear-gradient(to bottom, hsla(165, 100%, 45%, 0.08), hsla(210, 30%, 5%, 0.6));
  border: 1px solid hsla(165, 70%, 40%, 0.25);
}

.today-timeline-card {
  backdrop-filter: brightness(.7)blur(80px);
  margin:10px;
  background:none;
  margin-top:0px;
  border: 1px solid hsla(165, 70%, 40%, 0.2);
}

.today-timeline {
}

.today-time-block {
  background: linear-gradient(to bottom, hsla(165, 100%, 45%, 0.15), hsla(165, 100%, 35%, 0.08));
  border: 1px solid hsla(165, 90%, 55%, 0.3);
  transition: all 0.15s ease;
}

.today-time-block:hover {
  border-color: hsla(165, 90%, 55%, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.today-time-block.completed {
  background: linear-gradient(to bottom, hsla(210, 20%, 25%, 0.2), hsla(210, 20%, 20%, 0.15));
  border-color: hsla(210, 20%, 40%, 0.3);
}

.today-hour-marker {
  color: hsl(190, 10%, 50%);
  font-size: 0.75rem;
}

.today-current-time-indicator {
  pointer-events: none;
  z-index: 20;
}

.today-timeline-scroll {
  scrollbar-width: thin;
  scrollbar-color: hsla(165, 70%, 40%, 0.3) transparent;
}

.today-timeline-scroll::-webkit-scrollbar {
  width: 8px;
}

.today-timeline-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.today-timeline-scroll::-webkit-scrollbar-thumb {
  background: hsla(165, 70%, 40%, 0.3);
  border-radius: 4px;
}

.today-timeline-scroll::-webkit-scrollbar-thumb:hover {
  background: hsla(165, 70%, 40%, 0.5);
}



[data-style-id="stylo-528"], [data-style-id="stylo-531"] {
    height:40px !important;
  }

[data-style-id="stylo-536"] {
  width:100%;
  color:rgb(163, 245, 163);
  background:black;
  box-shadow:inset 0 -10px 8px rgba(0,80,80,.5), inset 0 8px 10px rgba(0, 191, 255, 0.165);;
}

[data-style-id="stylo-536"]:hover {
  background:black !important;background-color:black !important;
  box-shadow:inset 0 -10px 8px rgba(0, 80, 80, 0.718), inset 0 7px 8px rgba(0, 191, 255, 0.45);;
}

[data-style-id="stylo-495"],[data-style-id="stylo-1228"],[data-style-id="stylo-428"] {
background:rgba(0,0,0,.1);
backdrop-filter:blur(22px);
}

[data-id="button-inline-flex-done"]{
  background:rgba(255,255,255,.2);
  color:rgb(131, 251, 131);
  opacity:.8;
  border: 1.5px solid rgba(255, 255, 255, 0.508);
  box-shadow:inset 0 4px 8px teal, inset 0 -3px 4px rgba(26, 241, 26, 0.732);
}
[data-id="button-inline-flex-done"]:hover {
    background:rgba(255,255,255,.2) !important;
    background-color:transparent !important;
  border: 1.5px solid rgba(255, 255, 255, 0.508);
  box-shadow:inset 0 4px 8px teal, inset 0 -3px 4px rgba(26, 241, 26, 0.732);

  opacity:1;color:skyblue;
}

[data-style-id="stylo-395"] {
margin-top:-5vh;
opacity:.7;
padding-top:20vh !important;
transition:all .2s;
}

[data-style-id="stylo-395"]:hover {
opacity:1;
}

[data-style-id="stylo-422"] svg {
  display:none;

}

[data-style-id="stylo-429"]  {
font-size:3rem;
padding-top:6px;
}
[data-style-id="stylo-422"]  {
 border:none;
 transform:scale(1.2);
 position:absolute;
top:8vh;left:15%;
 background-size:cover;
 filter:saturate(.3)hue-rotate(210deg)brightness(1.2);;
background-image:url("https://i.ibb.co/pBHtkJcD/brii.png") !important;
transition:all .5s ease;
}
[data-style-id="stylo-422"]:hover  {
filter:saturate(.8)brightness(1.3);
transform:scale(1.5)rotate(380deg);

}

button [data-id="button-right-4-close"] {
  transform:scale(2) !important;
}

[data-style-id="stylo-1110"] {
  height:100vh;
  box-shadow: inset 0 0 8000px black,inset 0 0 8000px black,inset 0 0 8000px black;
  overflow:hidden;

}

[data-style-id="stylo-1112"] {
overflow:scroll}

[data-style-id="stylo-1204"],[data-style-id="stylo-0"]{
    background:radial-gradient(circle at bottom, black, teal, black, transparent, rgba(255, 20, 145, 0.515), transparent),radial-gradient(circle at top, black, teal, black, transparent, rgba(0, 191, 255, 0.326), transparent) !important;
box-shadow:inset 0 0 40px black, inset 0 0 40px black !important;
  background-size:40% 400% !important;
border: 2.5px solid rgba(255, 255, 255, 0.254) !important;
padding:20px;margin:40px;}

[data-id="div-today-page"]{
    border-radius:18px;
    background:radial-gradient(circle at bottom, black, teal, black, transparent, rgb(2, 71, 94), transparent),radial-gradient(circle at top, black, teal, black, transparent, deepskyblue, transparent);;
}
[data-style-id="stylo-782"]{
border-radius:0;background:none;border: none;box-shadow:none !important}
	[data-style-id="stylo-857"]:hover{box-shadow:inset 0 0 40px white;}

  	[data-style-id="stylo-857"]{OPACITY:.45;box-shadow:inset 0 0 40px black; transition:all 1s ease;}
````

## File: src/app/layout.tsx
````typescript
import type { Metadata } from 'next';
import './globals.css';
import '../styles/dashboard.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AutoIdInjector } from '@/components/auto-id-injector';

export const metadata: Metadata = {
  title: 'Action Deck',
  description: 'Casual todos and personal project management.'
};

export default function RootLayout({
  children


}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html data-style-id="stylo-1143" id="el-346" lang="en" suppressHydrationWarning>
      <head data-style-id="stylo-1144" id="el-347">
        <link data-style-id="stylo-1145" id="el-348" rel="preconnect" href="https://fonts.googleapis.com" />
        <link data-style-id="stylo-1146" id="el-349" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link data-style-id="stylo-1147" id="el-350" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Nokie&family=Playwrite+NL&display=swap" rel="stylesheet" />
      </head>
      <body data-style-id="stylo-1148" id="el-351" className="font-body antialiased browzr-skin">
        <ThemeProvider data-style-id="stylo-1149"
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>

          <AutoIdInjector data-style-id="stylo-1150" />
          {children}
          <Toaster data-style-id="stylo-1151" />
        </ThemeProvider>
      </body>
    </html>);

}
````

## File: src/components/dashboard/dashboard-summary.tsx
````typescript
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Inbox, AlertCircle } from 'lucide-react';
import { useInboxDaily } from '@/hooks/use-inbox-daily';
import { InboxTaskList } from './inbox-task-list';
import { InboxDateNavigator } from './inbox-date-navigator';
import { InboxArchiveModal } from './inbox-archive-modal';
import { getTodayMMDDYYYY } from '@/lib/inbox-parser';

export function DashboardSummary() {
  const { inboxByDate, availableDates, isLoading, isConnected } = useInboxDaily();

  // Track currently viewed date (default to today)
  const todayKey = getTodayMMDDYYYY();
  const [selectedDate, setSelectedDate] = useState<string>(todayKey);

  // Get the inbox for selected date
  const currentInbox = useMemo(() => {
    return inboxByDate.get(selectedDate) || null;
  }, [inboxByDate, selectedDate]);

  const isToday = selectedDate === todayKey;

  const handleGoToToday = () => {
    setSelectedDate(todayKey);
  };

  // Not connected state
  if (!isConnected) {
    return (
      <Card data-style-id="stylo-1173" className="dashboard-card shadow-lg neon-glow">
        <CardHeader data-style-id="stylo-1174">
          <div data-style-id="stylo-1175" className="flex items-center justify-between">
            <div data-style-id="stylo-1176" className="space-y-1 dashboard-header">
              <h1 data-style-id="stylo-1177" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Brain data-style-id="stylo-1178" className="h-6 w-6 text-cyan-400" />
                CC Daily Inbox
              </h1>
            </div>
          </div>
        </CardHeader>
        <CardContent data-style-id="stylo-1179">
          <div data-style-id="stylo-1180" className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle data-style-id="stylo-1181" className="h-12 w-12 text-amber-400/60 mb-4" />
            <p data-style-id="stylo-1182" className="text-teal-100 font-medium">Sign in to view your CC Daily emails</p>
            <p data-style-id="stylo-1183" className="text-sm text-muted-foreground mt-1">
              Sync must be enabled in settings
            </p>
          </div>
        </CardContent>
      </Card>);

  }

  // Loading state
  if (isLoading) {
    return (
      <Card data-style-id="stylo-1184" className="dashboard-card shadow-lg neon-glow">
        <CardHeader data-style-id="stylo-1185">
          <div data-style-id="stylo-1186" className="flex items-center justify-between">
            <div data-style-id="stylo-1187" className="space-y-1 dashboard-header">
              <h1 data-style-id="stylo-1188" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Brain data-style-id="stylo-1189" className="h-6 w-6 text-cyan-400" />
                CC Daily Inbox
              </h1>
            </div>
          </div>
        </CardHeader>
        <CardContent data-style-id="stylo-1190">
          <div data-style-id="stylo-1191" className="flex items-center justify-center py-12">
            <div data-style-id="stylo-1192" className="animate-pulse text-teal-100">Loading inbox...</div>
          </div>
        </CardContent>
      </Card>);

  }

  // No data available at all
  if (availableDates.length === 0) {
    return (
      <Card data-style-id="stylo-1193" className="dashboard-card shadow-lg neon-glow">
        <CardHeader data-style-id="stylo-1194">
          <div data-style-id="stylo-1195" className="flex items-center justify-between">
            <div data-style-id="stylo-1196" className="space-y-1 dashboard-header">
              <h1 data-style-id="stylo-1197" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Brain data-style-id="stylo-1198" className="h-6 w-6 text-cyan-400" />
                CC Daily Inbox
              </h1>
            </div>
          </div>
        </CardHeader>
        <CardContent data-style-id="stylo-1199">
          <div data-style-id="stylo-1200" className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox data-style-id="stylo-1201" className="h-12 w-12 text-cyan-400/40 mb-4" />
            <p data-style-id="stylo-1202" className="text-teal-100 font-medium">No CC Daily emails found</p>
            <p data-style-id="stylo-1203" className="text-sm text-muted-foreground mt-1">
              CC Daily "Your Day Ahead" emails will appear here
            </p>
          </div>
        </CardContent>
      </Card>);

  }

  // If selected date has no data but other dates exist, show message with option to view latest
  const hasCurrentDateData = currentInbox !== null;
  const latestDate = availableDates[0];

  return (
    <Card data-style-id="stylo-1204" className="dashboard-card shadow-lg neon-glow">
      <CardHeader data-style-id="stylo-1205" className="pb-2">
        <div data-style-id="stylo-1206" className="flex items-center justify-between flex-wrap gap-3">
          <div data-style-id="stylo-1207" className="space-y-1 dashboard-header">
            <h1 data-style-id="stylo-1208" className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Brain data-style-id="stylo-1209" className="h-6 w-6 text-cyan-400" />
              CC Daily Inbox
            </h1>
          </div>
          <div data-style-id="stylo-1210" className="flex items-center gap-3">
            <InboxArchiveModal data-style-id="stylo-1211"
            inboxByDate={inboxByDate}
            availableDates={availableDates}
            onSelectDate={setSelectedDate} />

            <InboxDateNavigator data-style-id="stylo-1212"
            currentDate={hasCurrentDateData ? selectedDate : latestDate}
            availableDates={availableDates}
            onDateChange={setSelectedDate}
            isToday={isToday && hasCurrentDateData}
            onGoToToday={handleGoToToday} />

          </div>
        </div>
      </CardHeader>
      <CardContent data-style-id="stylo-1213">
        {hasCurrentDateData ?
        <>
            {/* Task count summary */}
            <div data-style-id="stylo-1214" className="mb-4 flex items-center gap-4">
              <div data-style-id="stylo-1215" className="dashboard-metrics-card px-4 py-2 inline-flex items-center gap-2">
                <span data-style-id="stylo-1216" className="text-2xl font-bold text-teal-100">
                  {currentInbox.tasks.length}
                </span>
                <span data-style-id="stylo-1217" className="text-sm text-cyan-200/80">
                  Top of Mind task{currentInbox.tasks.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Task list with scroll area */}
            <ScrollArea data-style-id="stylo-1218" className="h-[280px] pr-4">
              <InboxTaskList data-style-id="stylo-1219" tasks={currentInbox.tasks} />
            </ScrollArea>
          </> :

        <div data-style-id="stylo-1220" className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox data-style-id="stylo-1221" className="h-10 w-10 text-cyan-400/40 mb-4" />
            <p data-style-id="stylo-1222" className="text-teal-100 font-medium">No CC Daily email for this date</p>
            {latestDate && latestDate !== selectedDate &&
          <button data-style-id="stylo-1223"
          onClick={() => setSelectedDate(latestDate)}
          className="mt-3 text-sm text-cyan-300 hover:text-cyan-200 underline">

                View latest ({latestDate})
              </button>
          }
          </div>
        }
      </CardContent>
    </Card>);

}
````

## File: src/components/dashboard/domain-filter-bar.tsx
````typescript
'use client';

import React from 'react';
import { DOMAIN_LIST, type DomainConfig } from '@/lib/domains';
import type { Domain } from '@/lib/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LayoutGrid } from 'lucide-react';

interface DomainFilterBarProps {
  selectedDomain: Domain | null;
  onDomainChange: (domain: Domain | null) => void;
  className?: string;
}

export function DomainFilterBar({
  selectedDomain,
  onDomainChange,
  className
}: DomainFilterBarProps) {
  return (
    <div data-style-id="stylo-55" id="el-19" className={cn('w-full', className)}>
      <ScrollArea data-style-id="stylo-56" className="w-full whitespace-nowrap">
        <div data-style-id="stylo-57" id="el-20" className="flex gap-2 pb-3 px-1">
          {/* All domains button */}
          <button data-style-id="stylo-58" id="el-21"
          onClick={() => onDomainChange(null)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            'border whitespace-nowrap shrink-0',
            selectedDomain === null ?
            'bg-gradient-to-r from-teal-500/30 to-cyan-500/30 border-teal-400/50 text-teal-100 shadow-lg shadow-teal-500/20' :
            'bg-black/30 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
          )}>

            <LayoutGrid data-style-id="stylo-59" className="h-4 w-4" />
            All
          </button>

          {/* Domain buttons */}
          {DOMAIN_LIST.map((domain) => {
            const Icon = domain.icon;
            const isSelected = selectedDomain === domain.value;

            return (
              <button data-style-id="stylo-60" id="el-22"
              key={domain.value}
              onClick={() => onDomainChange(domain.value)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                'border whitespace-nowrap shrink-0',
                isSelected ?
                'border-transparent text-white shadow-lg' :
                'bg-black/30 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
              )}
              style={
              isSelected ?
              {
                background: domain.bgGradient,
                boxShadow: `0 4px 15px ${domain.color}40`
              } :
              undefined
              }>

                <Icon data-style-id="stylo-61" className="h-4 w-4" />
                {domain.label}
              </button>);

          })}
        </div>
        <ScrollBar data-style-id="stylo-62" orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>);

}

// Compact version for sidebar
export function DomainIconBar({
  selectedDomain,
  onDomainChange,
  className
}: DomainFilterBarProps) {
  return (
    <div data-style-id="stylo-63" id="el-23" className={cn('flex flex-wrap gap-1', className)}>
      {DOMAIN_LIST.map((domain) => {
        const Icon = domain.icon;
        const isSelected = selectedDomain === domain.value;

        return (
          <button data-style-id="stylo-64" id="el-24"
          key={domain.value}
          onClick={() => onDomainChange(isSelected ? null : domain.value)}
          title={domain.label}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            isSelected ?
            'text-white' :
            'text-white/50 hover:text-white/80 hover:bg-white/5'
          )}
          style={
          isSelected ?
          {
            background: domain.bgGradient,
            boxShadow: `0 2px 8px ${domain.color}40`
          } :
          undefined
          }>

            <Icon data-style-id="stylo-65" className="h-4 w-4" />
          </button>);

      })}
    </div>);

}

// Badge component for displaying domain on cards
export function DomainBadge({
  domain,
  size = 'default',
  className




}: {domain: Domain;size?: 'small' | 'default';className?: string;}) {
  const config = DOMAIN_LIST.find((d) => d.value === domain);
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div data-style-id="stylo-66" id="el-25"
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full text-white font-medium',
      size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      className
    )}
    style={{
      background: config.bgGradient,
      boxShadow: `0 2px 8px ${config.color}30`
    }}>

      <Icon data-style-id="stylo-67" className={size === 'small' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </div>);

}
````

## File: src/components/dashboard/milestone-list.tsx
````typescript
'use client';

import React, { useState } from 'react';
import type { Milestone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronUp, ChevronDown, Trash2, Plus, Milestone as MilestoneIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MilestoneListProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
  readOnly?: boolean;
}

export function MilestoneList({ milestones, onChange, readOnly = false }: MilestoneListProps) {
  const [newMilestoneName, setNewMilestoneName] = useState('');

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newMilestoneName.trim();
    if (!name) return;

    const newMilestone: Milestone = {
      id: `ms-${Date.now()}`,
      name,
      completed: false,
      order: milestones.length
    };

    onChange([...milestones, newMilestone]);
    setNewMilestoneName('');
  };

  const handleToggle = (id: string) => {
    onChange(
      milestones.map((m) =>
      m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const handleDelete = (id: string) => {
    const filtered = milestones.filter((m) => m.id !== id);
    // Re-order remaining milestones
    const reordered = filtered.map((m, index) => ({ ...m, order: index }));
    onChange(reordered);
  };

  const handleMoveUp = (id: string) => {
    const index = sortedMilestones.findIndex((m) => m.id === id);
    if (index <= 0) return;

    const updated = sortedMilestones.map((m, i) => {
      if (i === index) return { ...m, order: m.order - 1 };
      if (i === index - 1) return { ...m, order: m.order + 1 };
      return m;
    });

    onChange(updated);
  };

  const handleMoveDown = (id: string) => {
    const index = sortedMilestones.findIndex((m) => m.id === id);
    if (index >= sortedMilestones.length - 1) return;

    const updated = sortedMilestones.map((m, i) => {
      if (i === index) return { ...m, order: m.order + 1 };
      if (i === index + 1) return { ...m, order: m.order - 1 };
      return m;
    });

    onChange(updated);
  };

  const completedCount = milestones.filter((m) => m.completed).length;

  return (
    <div data-style-id="stylo-68" id="el-26" className="space-y-4">
      <div data-style-id="stylo-69" id="el-27" className="flex items-center justify-between">
        <div data-style-id="stylo-70" id="el-28" className="flex items-center gap-2">
          <MilestoneIcon data-style-id="stylo-71" className="h-5 w-5 text-primary" />
          <h3 data-style-id="stylo-72" id="el-29" className="text-lg font-medium">Milestones</h3>
        </div>
        <span data-style-id="stylo-73" id="el-30" className="text-sm text-muted-foreground">
          {completedCount}/{milestones.length} complete
        </span>
      </div>

      {!readOnly &&
      <form data-style-id="stylo-74" id="el-31" onSubmit={handleAddMilestone} className="flex gap-2">
          <Input data-style-id="stylo-75"
        placeholder="Add a milestone..."
        value={newMilestoneName}
        onChange={(e) => setNewMilestoneName(e.target.value)}
        className="flex-1" />

          <Button data-style-id="stylo-76" type="submit" variant="secondary" size="sm">
            <Plus data-style-id="stylo-77" className="h-4 w-4 mr-1" />
            Add
          </Button>
        </form>
      }

      <div data-style-id="stylo-78" id="el-32" className="space-y-2">
        {sortedMilestones.length === 0 ?
        <p data-style-id="stylo-79" id="el-33" className="text-sm text-muted-foreground text-center py-4">
            No milestones yet. Add your first project phase above.
          </p> :

        sortedMilestones.map((milestone, index) =>
        <div data-style-id="stylo-80" id="el-34"
        key={milestone.id}
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border transition-colors',
          milestone.completed ?
          'bg-primary/5 border-primary/20' :
          'bg-muted/30 border-border/50 hover:border-border'
        )}>

              <Checkbox data-style-id="stylo-81"
          id={`milestone-${milestone.id}`}
          checked={milestone.completed}
          onCheckedChange={() => !readOnly && handleToggle(milestone.id)}
          disabled={readOnly} />

              <Label data-style-id="stylo-82"
          htmlFor={`milestone-${milestone.id}`}
          className={cn(
            'flex-1 cursor-pointer font-medium',
            milestone.completed && 'line-through text-muted-foreground'
          )}>

                <span data-style-id="stylo-83" id="el-35" className="text-xs text-muted-foreground mr-2">
                  Phase {index + 1}:
                </span>
                {milestone.name}
              </Label>

              {!readOnly &&
          <div data-style-id="stylo-84" id="el-36" className="flex items-center gap-1">
                  <Button data-style-id="stylo-85"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleMoveUp(milestone.id)}
            disabled={index === 0}
            className="h-7 w-7 p-0">

                    <ChevronUp data-style-id="stylo-86" className="h-4 w-4" />
                  </Button>
                  <Button data-style-id="stylo-87"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleMoveDown(milestone.id)}
            disabled={index === sortedMilestones.length - 1}
            className="h-7 w-7 p-0">

                    <ChevronDown data-style-id="stylo-88" className="h-4 w-4" />
                  </Button>
                  <Button data-style-id="stylo-89"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(milestone.id)}
            className="h-7 w-7 p-0 text-destructive hover:text-destructive">

                    <Trash2 data-style-id="stylo-90" className="h-4 w-4" />
                  </Button>
                </div>
          }
            </div>
        )
        }
      </div>
    </div>);

}
````

## File: src/components/dashboard/progress-chart.tsx
````typescript
'use client';

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Task } from '@/lib/types';
import React, { useEffect, useState } from 'react';

export function ProgressChart({ tasks }: {tasks: Task[];}) {
  const [isClient, setIsClient] = useState(false);
  const [chartColors, setChartColors] = useState({ completed: '', pending: '' });

  useEffect(() => {
    setIsClient(true);
    // This is safe because it's in a useEffect, which only runs on the client.
    const computedStyle = getComputedStyle(document.documentElement);
    setChartColors({
      completed: `hsl(${computedStyle.getPropertyValue('--primary').trim()})`,
      pending: `hsl(${computedStyle.getPropertyValue('--muted').trim()})`
    });
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const data = [
  { name: 'Tasks', completed: completed, pending: pending }];


  if (!isClient) {
    return <div data-style-id="stylo-91" id="el-37" className="h-[24px] w-full animate-pulse rounded-lg bg-muted" />;
  }

  return (
    <div data-style-id="stylo-92" id="el-38" style={{ width: '100%', height: '24px' }}>
            <ResponsiveContainer data-style-id="stylo-93" width="100%" height="100%">
                <BarChart data-style-id="stylo-94"
        layout="vertical"
        data={data}
        stackOffset="expand"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>

                    <XAxis data-style-id="stylo-95" hide type="number" />
                    <YAxis data-style-id="stylo-96" hide type="category" dataKey="name" />
                    <Tooltip data-style-id="stylo-97"
          cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
          contentStyle={{
            background: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)'
          }}
          formatter={(value, name) => {
            const label = String(name);
            return [`${value} tasks`, label.charAt(0).toUpperCase() + label.slice(1)];
          }} />

                    <Bar data-style-id="stylo-98" dataKey="completed" fill={chartColors.completed} stackId="a" radius={[5, 0, 0, 5]} />
                    <Bar data-style-id="stylo-99" dataKey="pending" fill={chartColors.pending} stackId="a" radius={[0, 5, 5, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>);

}
````

## File: src/components/dashboard/progress-ring.tsx
````typescript
'use client';

import React from 'react';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 48,
  strokeWidth = 4,
  showLabel = true,
  className = ''
}: ProgressRingProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - normalizedProgress / 100 * circumference;

  return (
    <div data-style-id="stylo-100" id="el-39" className={`relative inline-flex items-center justify-center ${className}`}>
      <svg data-style-id="stylo-101" id="el-40"
      width={size}
      height={size}
      className="transform -rotate-90">

        {/* Background circle */}
        <circle data-style-id="stylo-102" id="el-41"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsla(165, 70%, 35%, 0.2)"
        strokeWidth={strokeWidth} />

        {/* Progress circle */}
        <circle data-style-id="stylo-103" id="el-42"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(165, 100%, 45%)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
        style={{
          filter: normalizedProgress > 0 ? 'drop-shadow(0 0 3px hsla(165, 100%, 45%, 0.5))' : 'none'
        }} />

      </svg>
      {showLabel &&
      <span data-style-id="stylo-104" id="el-43"
      className="absolute text-xs font-medium"
      style={{ color: 'hsl(165, 100%, 75%)' }}>

          {Math.round(normalizedProgress)}%
        </span>
      }
    </div>);

}

// Variant for project cards with domain-colored progress
interface DomainProgressRingProps extends ProgressRingProps {
  color?: string;
}

export function DomainProgressRing({
  progress,
  size = 48,
  strokeWidth = 4,
  showLabel = true,
  color = 'hsl(165, 100%, 45%)',
  className = ''
}: DomainProgressRingProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - normalizedProgress / 100 * circumference;

  return (
    <div data-style-id="stylo-105" id="el-44" className={`relative inline-flex items-center justify-center ${className}`}>
      <svg data-style-id="stylo-106" id="el-45"
      width={size}
      height={size}
      className="transform -rotate-90">

        {/* Background circle */}
        <circle data-style-id="stylo-107" id="el-46"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsla(210, 20%, 30%, 0.3)"
        strokeWidth={strokeWidth} />

        {/* Progress circle */}
        <circle data-style-id="stylo-108" id="el-47"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
        style={{
          filter: normalizedProgress > 0 ? `drop-shadow(0 0 4px ${color})` : 'none'
        }} />

      </svg>
      {showLabel &&
      <span data-style-id="stylo-109" id="el-48"
      className="absolute text-xs font-bold"
      style={{ color }}>

          {Math.round(normalizedProgress)}%
        </span>
      }
    </div>);

}
````

## File: src/components/dashboard/project-card.tsx
````typescript
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import { ProjectModal } from './project-modal';
import { DomainProgressRing } from './progress-ring';
import { DomainBadge } from './domain-filter-bar';
import { StatusBadge } from './status-select';
import { TagBadges } from './tags-input';
import { DOMAINS } from '@/lib/domains';
import { formatDistanceToNow } from 'date-fns';

export function ProjectCard({ project }: {project: Project;}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formattedDate, setFormattedDate] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState('');

  React.useEffect(() => {
    if (project.deadline) {
      setFormattedDate(new Date(project.deadline).toLocaleDateString());
    }
    if (project.updatedAt) {
      setLastUpdated(formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }));
    }
  }, [project.deadline, project.updatedAt]);

  // Calculate progress - use manual override if set, otherwise calculate from tasks
  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const taskProgress = totalTasks > 0 ? completedTasks / totalTasks * 100 : 0;
  const progress = project.manualProgress !== undefined ? project.manualProgress : taskProgress;

  // Get domain color for progress ring
  const domainConfig = project.domain ? DOMAINS[project.domain] : null;
  const progressColor = domainConfig?.color || 'hsl(165, 100%, 45%)';

  return (
    <>
      <Card data-style-id="stylo-110" className="dashboard-project-card project-card group relative flex flex-col h-full hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {project.coverImage &&
        <>
            <div data-style-id="stylo-111" id="el-49"
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          style={{ backgroundImage: `url(${project.coverImage})` }} />

            <div data-style-id="stylo-112" id="el-50" className="absolute inset-0 bg-black/20 transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
          </>
        }
        <div data-style-id="stylo-113" id="el-51" className={project.coverImage ? "relative z-10 flex flex-col h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" : "flex flex-col h-full"}>
          <CardHeader data-style-id="stylo-114" className="dashboard-project-card-header pb-2">
            {/* Top row: Domain badge and Status */}
            <div data-style-id="stylo-115" id="el-52" className="flex items-center justify-between gap-2 mb-2">
              {project.domain &&
              <DomainBadge data-style-id="stylo-116" domain={project.domain} size="small" />
              }
              <StatusBadge data-style-id="stylo-117" status={project.status} size="small" />
            </div>

            <CardTitle data-style-id="stylo-118" className="dashboard-project-card-title text-lg font-semibold line-clamp-1">{project.name}</CardTitle>
            <CardDescription data-style-id="stylo-119" className="dashboard-project-card-description h-10 line-clamp-2">{project.description}</CardDescription>
          </CardHeader>

          <CardContent data-style-id="stylo-120" className="dashboard-project-card-content flex-grow space-y-3 pt-0">
            {/* Tags */}
            {project.tags.length > 0 &&
            <TagBadges data-style-id="stylo-121" tags={project.tags} max={3} />
            }

            {/* Progress ring and metadata */}
            <div data-style-id="stylo-122" id="el-53" className="flex items-center justify-between gap-4">
              <div data-style-id="stylo-123" id="el-54" className="flex-1 space-y-1">
                <div data-style-id="stylo-124" id="el-55" className="text-xs text-muted-foreground">
                  Due: {formattedDate || <span data-style-id="stylo-125" id="el-56" className="animate-pulse">Loading...</span>}
                </div>
                {lastUpdated &&
                <div data-style-id="stylo-126" id="el-57" className="text-xs text-muted-foreground/70">
                    Updated {lastUpdated}
                  </div>
                }
                <div data-style-id="stylo-127" id="el-58" className="text-xs text-muted-foreground">
                  {project.manualProgress !== undefined ?
                  <span data-style-id="stylo-128" id="el-59">Progress: {Math.round(progress)}% (manual)</span> :

                  <span data-style-id="stylo-129" id="el-60">Tasks: {completedTasks}/{totalTasks}</span>
                  }
                </div>
              </div>

              {/* Progress Ring */}
              <DomainProgressRing data-style-id="stylo-130"
              progress={progress}
              size={56}
              strokeWidth={5}
              color={progressColor}
              showLabel={true} />

            </div>
          </CardContent>

          <CardFooter data-style-id="stylo-131" className="dashboard-project-card-footer pt-0">
            <Button data-style-id="stylo-132" variant="secondary" className="dashboard-project-card-view-btn w-full" onClick={() => setIsModalOpen(true)}>
              View Details
            </Button>
          </CardFooter>
        </div>
      </Card>
      <ProjectModal data-style-id="stylo-133" project={project} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>);

}
````

## File: src/components/dashboard/project-form.tsx
````typescript
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Project, ProjectFormData, Domain, ProjectStatus } from '@/lib/types';
import { useProjects } from '@/context/project-context';
import { DOMAIN_LIST, STATUS_CONFIG } from '@/lib/domains';

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required.'),
  description: z.string().min(1, 'Description is required.'),
  deadline: z.date({ required_error: 'Deadline is required.' }),
  importance: z.coerce.number().min(1).max(10),
  size: z.coerce.number().min(0),
  relevance: z.string().min(1, 'Relevance is required.'),
  coverImage: z.string().url().optional().or(z.literal('')),
  domain: z.string().optional(),
  status: z.enum(['active', 'paused', 'done', 'archived']),
  tags: z.string(),
  notes: z.string().optional(),
  manualProgress: z.number().min(0).max(100).optional(),
  useManualProgress: z.boolean()
});

interface ProjectFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  projectToEdit?: Project;
}

export function ProjectForm({ isOpen, onOpenChange, projectToEdit }: ProjectFormProps) {
  const { addProject, updateProject } = useProjects();
  const isEditMode = !!projectToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode ?
    {
      ...projectToEdit,
      deadline: new Date(projectToEdit.deadline),
      tags: projectToEdit.tags?.join(', ') || '',
      useManualProgress: projectToEdit.manualProgress !== undefined,
      manualProgress: projectToEdit.manualProgress ?? 0
    } : {
      name: '',
      description: '',
      deadline: new Date(),
      importance: 5,
      size: 10,
      relevance: '',
      coverImage: '',
      domain: undefined,
      status: 'active' as ProjectStatus,
      tags: '',
      notes: '',
      manualProgress: 0,
      useManualProgress: false
    }
  });

  const useManualProgress = form.watch('useManualProgress');

  React.useEffect(() => {
    if (isOpen && projectToEdit) {
      form.reset({
        ...projectToEdit,
        deadline: new Date(projectToEdit.deadline),
        tags: projectToEdit.tags?.join(', ') || '',
        useManualProgress: projectToEdit.manualProgress !== undefined,
        manualProgress: projectToEdit.manualProgress ?? 0
      });
    }
    if (isOpen && !projectToEdit) {
      form.reset({
        name: '',
        description: '',
        deadline: new Date(),
        importance: 5,
        size: 10,
        relevance: '',
        coverImage: '',
        domain: undefined,
        status: 'active' as ProjectStatus,
        tags: '',
        notes: '',
        manualProgress: 0,
        useManualProgress: false
      });
    }
  }, [isOpen, projectToEdit, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Parse tags from comma-separated string
    const parsedTags = values.tags.
    split(',').
    map((t) => t.trim().toLowerCase()).
    filter((t) => t.length > 0);

    const projectData: ProjectFormData = {
      name: values.name,
      description: values.description,
      deadline: format(values.deadline, 'yyyy-MM-dd'),
      importance: values.importance,
      size: values.size,
      relevance: values.relevance,
      coverImage: values.coverImage || undefined,
      domain: values.domain as Domain | undefined,
      status: values.status,
      tags: parsedTags,
      notes: values.notes || undefined,
      manualProgress: values.useManualProgress ? values.manualProgress : undefined
    };

    if (isEditMode) {
      updateProject({
        ...projectToEdit,
        ...projectData
      });
    } else {
      addProject(projectData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog data-style-id="stylo-134" open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent data-style-id="stylo-135" className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader data-style-id="stylo-136">
                    <DialogTitle data-style-id="stylo-137">{isEditMode ? 'Edit Project' : 'Create Project'}</DialogTitle>
                    <DialogDescription data-style-id="stylo-138">
                        {isEditMode ? "Update the details of your project." : "Add a new project to your dashboard."}
                    </DialogDescription>
                </DialogHeader>
                <Form data-style-id="stylo-139" {...form}>
                    <form data-style-id="stylo-140" id="el-61" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField data-style-id="stylo-141"
            control={form.control}
            name="name"
            render={({ field }) =>
            <FormItem data-style-id="stylo-142">
                                    <FormLabel data-style-id="stylo-143">Project Name</FormLabel>
                                    <FormControl data-style-id="stylo-144">
                                        <Input data-style-id="stylo-145" placeholder="e.g., My Awesome Project" {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-146" />
                                </FormItem>
            } />


                        <div data-style-id="stylo-147" id="el-62" className="grid grid-cols-2 gap-4">
                            <FormField data-style-id="stylo-148"
              control={form.control}
              name="domain"
              render={({ field }) =>
              <FormItem data-style-id="stylo-149">
                                        <FormLabel data-style-id="stylo-150">Domain</FormLabel>
                                        <Select data-style-id="stylo-151" onValueChange={field.onChange} value={field.value}>
                                            <FormControl data-style-id="stylo-152">
                                                <SelectTrigger data-style-id="stylo-153">
                                                    <SelectValue data-style-id="stylo-154" placeholder="Select domain" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent data-style-id="stylo-155">
                                                {DOMAIN_LIST.map((domain) => {
                      const Icon = domain.icon;
                      return (
                        <SelectItem data-style-id="stylo-156" key={domain.value} value={domain.value}>
                                                            <div data-style-id="stylo-157" id="el-63" className="flex items-center gap-2">
                                                                <Icon data-style-id="stylo-158" className="h-4 w-4" style={{ color: domain.color }} />
                                                                {domain.label}
                                                            </div>
                                                        </SelectItem>);

                    })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage data-style-id="stylo-159" />
                                    </FormItem>
              } />


                            <FormField data-style-id="stylo-160"
              control={form.control}
              name="status"
              render={({ field }) =>
              <FormItem data-style-id="stylo-161">
                                        <FormLabel data-style-id="stylo-162">Status</FormLabel>
                                        <Select data-style-id="stylo-163" onValueChange={field.onChange} value={field.value}>
                                            <FormControl data-style-id="stylo-164">
                                                <SelectTrigger data-style-id="stylo-165">
                                                    <SelectValue data-style-id="stylo-166" placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent data-style-id="stylo-167">
                                                {Object.entries(STATUS_CONFIG).map(([key, config]) =>
                    <SelectItem data-style-id="stylo-168" key={key} value={key}>
                                                        <div data-style-id="stylo-169" id="el-64" className="flex items-center gap-2">
                                                            <div data-style-id="stylo-170" id="el-65"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: config.color }} />

                                                            {config.label}
                                                        </div>
                                                    </SelectItem>
                    )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage data-style-id="stylo-171" />
                                    </FormItem>
              } />

                        </div>

                        <FormField data-style-id="stylo-172"
            control={form.control}
            name="coverImage"
            render={({ field }) =>
            <FormItem data-style-id="stylo-173">
                                    <FormLabel data-style-id="stylo-174">Cover Image URL</FormLabel>
                                    <FormControl data-style-id="stylo-175">
                                        <Input data-style-id="stylo-176" placeholder="https://images.unsplash.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-177" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-178"
            control={form.control}
            name="description"
            render={({ field }) =>
            <FormItem data-style-id="stylo-179">
                                    <FormLabel data-style-id="stylo-180">Description</FormLabel>
                                    <FormControl data-style-id="stylo-181">
                                        <Textarea data-style-id="stylo-182" placeholder="What is this project about?" {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-183" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-184"
            control={form.control}
            name="tags"
            render={({ field }) =>
            <FormItem data-style-id="stylo-185">
                                    <FormLabel data-style-id="stylo-186">Tags</FormLabel>
                                    <FormControl data-style-id="stylo-187">
                                        <Input data-style-id="stylo-188" placeholder="e.g., frontend, urgent, v2" {...field} />
                                    </FormControl>
                                    <FormDescription data-style-id="stylo-189">Comma-separated tags for filtering</FormDescription>
                                    <FormMessage data-style-id="stylo-190" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-191"
            control={form.control}
            name="deadline"
            render={({ field }) =>
            <FormItem data-style-id="stylo-192" className="flex flex-col">
                                    <FormLabel data-style-id="stylo-193">Deadline</FormLabel>
                                    <Popover data-style-id="stylo-194">
                                        <PopoverTrigger data-style-id="stylo-195" asChild>
                                            <FormControl data-style-id="stylo-196">
                                                <Button data-style-id="stylo-197"
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}>

                                                    {field.value ?
                      format(field.value, "PPP") :

                      <span data-style-id="stylo-198" id="el-66">Pick a date</span>
                      }
                                                    <CalendarIcon data-style-id="stylo-199" className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent data-style-id="stylo-200" className="w-auto p-0" align="start">
                                            <Calendar data-style-id="stylo-201"
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                  date < new Date("1900-01-01")
                  }
                  initialFocus />

                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage data-style-id="stylo-202" />
                                </FormItem>
            } />


                        <div data-style-id="stylo-203" id="el-67" className="grid grid-cols-2 gap-4">
                            <FormField data-style-id="stylo-204"
              control={form.control}
              name="importance"
              render={({ field }) =>
              <FormItem data-style-id="stylo-205">
                                        <FormLabel data-style-id="stylo-206">Importance (1-10)</FormLabel>
                                        <FormControl data-style-id="stylo-207">
                                            <Input data-style-id="stylo-208" type="number" min="1" max="10" {...field} />
                                        </FormControl>
                                        <FormMessage data-style-id="stylo-209" />
                                    </FormItem>
              } />

                            <FormField data-style-id="stylo-210"
              control={form.control}
              name="size"
              render={({ field }) =>
              <FormItem data-style-id="stylo-211">
                                        <FormLabel data-style-id="stylo-212">Size (hours)</FormLabel>
                                        <FormControl data-style-id="stylo-213">
                                            <Input data-style-id="stylo-214" type="number" min="0" {...field} />
                                        </FormControl>
                                        <FormMessage data-style-id="stylo-215" />
                                    </FormItem>
              } />

                        </div>

                        <FormField data-style-id="stylo-216"
            control={form.control}
            name="relevance"
            render={({ field }) =>
            <FormItem data-style-id="stylo-217">
                                    <FormLabel data-style-id="stylo-218">Relevance</FormLabel>
                                    <FormControl data-style-id="stylo-219">
                                        <Input data-style-id="stylo-220" placeholder="e.g., Career goals" {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-221" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-222"
            control={form.control}
            name="notes"
            render={({ field }) =>
            <FormItem data-style-id="stylo-223">
                                    <FormLabel data-style-id="stylo-224">Notes</FormLabel>
                                    <FormControl data-style-id="stylo-225">
                                        <Textarea data-style-id="stylo-226"
                placeholder="Freeform notes about this project..."
                className="min-h-[80px]"
                {...field} />

                                    </FormControl>
                                    <FormDescription data-style-id="stylo-227">Additional notes separate from description</FormDescription>
                                    <FormMessage data-style-id="stylo-228" />
                                </FormItem>
            } />


                        <div data-style-id="stylo-229" id="el-68" className="space-y-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                            <FormField data-style-id="stylo-230"
              control={form.control}
              name="useManualProgress"
              render={({ field }) =>
              <FormItem data-style-id="stylo-231" className="flex flex-row items-center justify-between">
                                        <div data-style-id="stylo-232" id="el-69" className="space-y-0.5">
                                            <FormLabel data-style-id="stylo-233">Manual Progress Override</FormLabel>
                                            <FormDescription data-style-id="stylo-234">
                                                Set progress manually instead of auto-calculating from tasks
                                            </FormDescription>
                                        </div>
                                        <FormControl data-style-id="stylo-235">
                                            <Switch data-style-id="stylo-236"
                  checked={field.value}
                  onCheckedChange={field.onChange} />

                                        </FormControl>
                                    </FormItem>
              } />


                            {useManualProgress &&
              <FormField data-style-id="stylo-237"
              control={form.control}
              name="manualProgress"
              render={({ field }) =>
              <FormItem data-style-id="stylo-238">
                                            <div data-style-id="stylo-239" id="el-70" className="flex justify-between items-center">
                                                <FormLabel data-style-id="stylo-240">Progress: {field.value}%</FormLabel>
                                            </div>
                                            <FormControl data-style-id="stylo-241">
                                                <Slider data-style-id="stylo-242"
                  value={[field.value || 0]}
                  onValueChange={(values) => field.onChange(values[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full" />

                                            </FormControl>
                                            <FormMessage data-style-id="stylo-243" />
                                        </FormItem>
              } />

              }
                        </div>

                        <DialogFooter data-style-id="stylo-244">
                            <Button data-style-id="stylo-245" type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button data-style-id="stylo-246" type="submit">{isEditMode ? 'Save Changes' : 'Create Project'}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>);

}
````

## File: src/components/dashboard/project-list.tsx
````typescript
'use client';

import React, { useState, useMemo } from 'react';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, PlusCircle, WifiOff, CloudOff } from 'lucide-react';
import { useProjects } from '@/context/project-context';
import { ProjectForm } from './project-form';
import { SearchBar } from './search-bar';
import { DomainFilterBar } from './domain-filter-bar';
import type { Domain, ProjectStatus } from '@/lib/types';
import { STATUS_CONFIG } from '@/lib/domains';
import { Badge } from '@/components/ui/badge';

type StatusFilter = ProjectStatus | 'all';

export function ProjectList() {
  const { projects, isOffline, hasPendingChanges } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<Domain | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Filter projects based on search, domain, and status
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter - check title, description, and tags
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.name.toLowerCase().includes(query);
        const matchesDescription = project.description.toLowerCase().includes(query);
        const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      // Domain filter
      if (domainFilter && project.domain !== domainFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && project.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, domainFilter, statusFilter]);

  // Count projects by status for badge display
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    for (const status of Object.keys(STATUS_CONFIG)) {
      counts[status] = projects.filter((p) => p.status === status).length;
    }
    return counts;
  }, [projects]);

  const handleExport = () => {
    if (projects.length === 0) {
      alert("There are no projects to export.");
      return;
    }
    const dataStr = JSON.stringify(projects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'action-deck-projects.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDomainFilter(null);
    setStatusFilter('all');
  };

  const hasActiveFilters = searchQuery || domainFilter || statusFilter !== 'all';

  return (
    <div data-style-id="stylo-247" id="dashboard-project-list" className="space-y-4">
      {/* Offline/Sync Status Indicator */}
      {(isOffline || hasPendingChanges) &&
      <div data-style-id="stylo-248" id="el-71" className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
          {isOffline ?
        <>
              <WifiOff data-style-id="stylo-249" className="h-4 w-4" />
              <span data-style-id="stylo-250" id="el-72" className="text-sm">
                Offline mode - Changes saved locally and will sync when online
              </span>
            </> :
        hasPendingChanges ?
        <>
              <CloudOff data-style-id="stylo-251" className="h-4 w-4" />
              <span data-style-id="stylo-252" id="el-73" className="text-sm">
                Syncing pending changes...
              </span>
            </> :
        null}
        </div>
      }

      {/* Toolbar */}
      <div data-style-id="stylo-253" id="dashboard-toolbar" className="project-toolbar flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <SearchBar data-style-id="stylo-254"
        id="dashboard-search"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search projects, descriptions, tags..."
        className="flex-1" />


        {/* Actions */}
        <div data-style-id="stylo-255" id="el-74" className="flex gap-2">
          <Button data-style-id="stylo-256" id="dashboard-export-btn" variant="outline" onClick={handleExport} className="btn-outline-glass export-json">
            <Download data-style-id="stylo-257" className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button data-style-id="stylo-258" id="dashboard-new-project-btn" className="btn-primary-glass new-project" onClick={() => setIsFormOpen(true)}>
            <PlusCircle data-style-id="stylo-259" className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <Tabs data-style-id="stylo-260" id="dashboard-status-tabs" value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
        <TabsList data-style-id="stylo-261" className="bg-muted/30 border border-border/50">
          <TabsTrigger data-style-id="stylo-262" value="all" className="data-[state=active]:bg-primary/20">
            All
            <Badge data-style-id="stylo-263" variant="secondary" className="ml-2 text-xs">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          {Object.entries(STATUS_CONFIG).map(([key, config]) =>
          <TabsTrigger data-style-id="stylo-264"
          key={key}
          value={key}
          className="data-[state=active]:bg-primary/20">

              <span data-style-id="stylo-265" id="el-75"
            className="h-2 w-2 rounded-full mr-2"
            style={{ backgroundColor: config.color }} />

              {config.label}
              {statusCounts[key] > 0 &&
            <Badge data-style-id="stylo-266" variant="secondary" className="ml-2 text-xs">
                  {statusCounts[key]}
                </Badge>
            }
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>

      {/* Active Filters Summary */}
      {hasActiveFilters &&
      <div data-style-id="stylo-267" id="el-76" className="flex items-center gap-2 text-sm text-muted-foreground">
          <span data-style-id="stylo-268" id="el-77">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          <Button data-style-id="stylo-269"
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="text-xs h-6">

            Clear filters
          </Button>
        </div>
      }

      {/* Project Grid */}
      {filteredProjects.length > 0 ?
      <div data-style-id="stylo-270" id="dashboard-project-grid" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) =>
        <ProjectCard data-style-id="stylo-271" key={project.id} project={project} />
        )}
        </div> :
      projects.length > 0 ?
      <div data-style-id="stylo-272" id="el-78" className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 data-style-id="stylo-273" id="el-79" className="text-xl font-semibold text-muted-foreground">No Matching Projects</h3>
          <p data-style-id="stylo-274" id="el-80" className="text-muted-foreground mt-2">
            Try adjusting your search or filters
          </p>
          <Button data-style-id="stylo-275" variant="outline" className="mt-4" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div> :

      <div data-style-id="stylo-276" id="el-81" className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 data-style-id="stylo-277" id="el-82" className="text-xl font-semibold text-muted-foreground">No Projects Yet</h3>
          <p data-style-id="stylo-278" id="el-83" className="text-muted-foreground mt-2">Click "New Project" to get started.</p>
          <Button data-style-id="stylo-279" className="mt-4" onClick={() => setIsFormOpen(true)}>
            <PlusCircle data-style-id="stylo-280" className="mr-2 h-4 w-4" />
            Create Your First Project
          </Button>
        </div>
      }

      {/* Domain Filter Bar at bottom */}
      <div data-style-id="stylo-281" id="el-84" className="fixed bottom-0 left-0 right-0 sm:left-14 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-4 px-4 z-20">
        <DomainFilterBar data-style-id="stylo-282"
        selectedDomain={domainFilter}
        onDomainChange={setDomainFilter} />

      </div>

      {/* Spacer for fixed domain bar */}
      <div data-style-id="stylo-283" id="el-85" className="h-20" />

      <ProjectForm data-style-id="stylo-284" isOpen={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>);

}
````

## File: src/components/dashboard/project-modal.tsx
````typescript
'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Project, Task, Milestone } from '@/lib/types';
import { DomainProgressRing } from './progress-ring';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { PenSquare, Trash2, StickyNote, Clock } from 'lucide-react';
import { useProjects } from '@/context/project-context';
import { ProjectForm } from './project-form';
import { DomainBadge } from './domain-filter-bar';
import { StatusButtons } from './status-select';
import { TagsInput } from './tags-input';
import { MilestoneList } from './milestone-list';
import { DOMAINS } from '@/lib/domains';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from
"@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";

export function ProjectModal({ project, isOpen, onOpenChange }: {project: Project;isOpen: boolean;onOpenChange: (isOpen: boolean) => void;}) {
  const { updateProject, deleteProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [formattedDate, setFormattedDate] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState('');
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [localNotes, setLocalNotes] = React.useState(project.notes || '');
  const [notesChanged, setNotesChanged] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      if (project.deadline) {
        setFormattedDate(new Date(project.deadline).toLocaleDateString());
      }
      if (project.updatedAt) {
        setLastUpdated(formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }));
      }
      setLocalNotes(project.notes || '');
      setNotesChanged(false);
    }
  }, [isOpen, project.deadline, project.updatedAt, project.notes]);

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = project.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateProject({ ...project, tasks: updatedTasks });
  };

  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const taskProgress = totalTasks > 0 ? completedTasks / totalTasks * 100 : 0;
  const progress = project.manualProgress !== undefined ? project.manualProgress : taskProgress;

  const domainConfig = project.domain ? DOMAINS[project.domain] : null;
  const progressColor = domainConfig?.color || 'hsl(165, 100%, 45%)';

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;
    const newTask: Task = { id: `ptask-${Date.now()}`, title, completed: false };
    updateProject({ ...project, tasks: [newTask, ...project.tasks] });
    setNewTaskTitle('');
  };

  const handleStatusChange = (status: typeof project.status) => {
    updateProject({ ...project, status });
  };

  const handleTagsChange = (tags: string[]) => {
    updateProject({ ...project, tags });
  };

  const handleMilestonesChange = (milestones: Milestone[]) => {
    updateProject({ ...project, milestones });
  };

  const handleNotesBlur = () => {
    if (notesChanged && localNotes !== project.notes) {
      updateProject({ ...project, notes: localNotes || undefined });
      setNotesChanged(false);
    }
  };

  const handleManualProgressChange = (value: number[]) => {
    updateProject({ ...project, manualProgress: value[0] });
  };

  return (
    <>
      <Sheet data-style-id="stylo-285" open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent data-style-id="stylo-286" className="sm:max-w-xl w-full p-0 flex flex-col modal-panel">
          <SheetHeader data-style-id="stylo-287" className="p-6 pb-2 modal-header">
            {/* Domain and Status Row */}
            <div data-style-id="stylo-288" id="el-86" className="flex items-center gap-2 mb-2">
              {project.domain &&
              <DomainBadge data-style-id="stylo-289" domain={project.domain} size="small" />
              }
            </div>

            <SheetTitle data-style-id="stylo-290" className="font-headline text-3xl text-primary">{project.name}</SheetTitle>
            <SheetDescription data-style-id="stylo-291">{project.description}</SheetDescription>

            {/* Metadata badges */}
            <div data-style-id="stylo-292" id="el-87" className="flex flex-wrap gap-2 pt-2">
              <Badge data-style-id="stylo-293" variant="outline">Due: {formattedDate}</Badge>
              <Badge data-style-id="stylo-294" variant="outline">Importance: {project.importance}/10</Badge>
              <Badge data-style-id="stylo-295" variant="outline">Size: {project.size} hrs</Badge>
              {lastUpdated &&
              <Badge data-style-id="stylo-296" variant="outline" className="flex items-center gap-1">
                  <Clock data-style-id="stylo-297" className="h-3 w-3" />
                  {lastUpdated}
                </Badge>
              }
            </div>

            {/* Status quick-change */}
            <div data-style-id="stylo-298" id="el-88" className="pt-3">
              <Label data-style-id="stylo-299" className="text-sm font-medium mb-2 block">Status</Label>
              <StatusButtons data-style-id="stylo-300"
              value={project.status}
              onChange={handleStatusChange} />

            </div>
          </SheetHeader>

          <div data-style-id="stylo-301" id="el-89" className="flex-grow overflow-y-auto p-6 space-y-6">
            {/* Progress Overview */}
            <div data-style-id="stylo-302" id="el-90" className="flex items-center justify-between">
              <div data-style-id="stylo-303" id="el-91">
                <div data-style-id="stylo-304" id="el-92" className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                  <h3 data-style-id="stylo-305" id="el-93" className="text-lg font-medium text-foreground">Progress</h3>
                </div>
                {project.manualProgress !== undefined ?
                <span data-style-id="stylo-306" id="el-94" className="text-sm text-muted-foreground">Manual: {Math.round(progress)}%</span> :

                <span data-style-id="stylo-307" id="el-95" className="text-sm text-muted-foreground">Tasks: {completedTasks}/{totalTasks}</span>
                }
              </div>
              <DomainProgressRing data-style-id="stylo-308"
              progress={progress}
              size={72}
              strokeWidth={6}
              color={progressColor}
              showLabel={true} />

            </div>

            {/* Manual Progress Override */}
            {project.manualProgress !== undefined &&
            <div data-style-id="stylo-309" id="el-96" className="space-y-2">
                <Label data-style-id="stylo-310" className="text-sm">Adjust Manual Progress</Label>
                <Slider data-style-id="stylo-311"
              value={[project.manualProgress]}
              onValueChange={handleManualProgressChange}
              min={0}
              max={100}
              step={1} />

              </div>
            }

            <Separator data-style-id="stylo-312" />

            {/* Tags */}
            <div data-style-id="stylo-313" id="el-97">
              <Label data-style-id="stylo-314" className="text-sm font-medium mb-2 block">Tags</Label>
              <TagsInput data-style-id="stylo-315"
              tags={project.tags}
              onChange={handleTagsChange} />

            </div>

            <Separator data-style-id="stylo-316" />

            {/* Accordion for organized sections */}
            <Accordion data-style-id="stylo-317" type="multiple" defaultValue={['milestones', 'tasks']} className="w-full">
              {/* Milestones Section */}
              <AccordionItem data-style-id="stylo-318" value="milestones">
                <AccordionTrigger data-style-id="stylo-319">
                  Milestones ({project.milestones.filter((m) => m.completed).length}/{project.milestones.length})
                </AccordionTrigger>
                <AccordionContent data-style-id="stylo-320">
                  <MilestoneList data-style-id="stylo-321"
                  milestones={project.milestones}
                  onChange={handleMilestonesChange} />

                </AccordionContent>
              </AccordionItem>

              {/* Tasks Section */}
              <AccordionItem data-style-id="stylo-322" value="tasks">
                <AccordionTrigger data-style-id="stylo-323">
                  Tasks ({completedTasks}/{totalTasks})
                </AccordionTrigger>
                <AccordionContent data-style-id="stylo-324">
                  <form data-style-id="stylo-325" id="el-98" onSubmit={handleAddTask} className="flex gap-2 mb-3">
                    <Input data-style-id="stylo-326"
                    placeholder="Add task to this project..."
                    value={newTaskTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)} />

                    <Button data-style-id="stylo-327" type="submit" variant="secondary">Add</Button>
                  </form>
                  <div data-style-id="stylo-328" id="el-99" className="space-y-2 max-h-[300px] overflow-y-auto">
                    {project.tasks.length === 0 ?
                    <p data-style-id="stylo-329" id="el-100" className="text-sm text-muted-foreground text-center py-4">
                        No tasks yet. Add your first task above.
                      </p> :

                    project.tasks.map((task) =>
                    <div data-style-id="stylo-330" id="el-101" key={task.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                          <Checkbox data-style-id="stylo-331"
                      id={`modal-task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)} />

                          <Label data-style-id="stylo-332"
                      htmlFor={`modal-task-${task.id}`}
                      className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}>

                            {task.title}
                          </Label>
                        </div>
                    )
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Notes Section */}
              <AccordionItem data-style-id="stylo-333" value="notes">
                <AccordionTrigger data-style-id="stylo-334">
                  <div data-style-id="stylo-335" id="el-102" className="flex items-center gap-2">
                    <StickyNote data-style-id="stylo-336" className="h-4 w-4" />
                    Notes
                  </div>
                </AccordionTrigger>
                <AccordionContent data-style-id="stylo-337">
                  <Textarea data-style-id="stylo-338"
                  placeholder="Add freeform notes here..."
                  value={localNotes}
                  onChange={(e) => {
                    setLocalNotes(e.target.value);
                    setNotesChanged(true);
                  }}
                  onBlur={handleNotesBlur}
                  className="min-h-[120px]" />

                  {notesChanged &&
                  <p data-style-id="stylo-339" id="el-103" className="text-xs text-muted-foreground mt-1">
                      Notes will save when you click away
                    </p>
                  }
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <SheetFooter data-style-id="stylo-340" className='p-6 pt-0 grid grid-cols-2 gap-2 modal-footer'>
            <AlertDialog data-style-id="stylo-341">
              <AlertDialogTrigger data-style-id="stylo-342" asChild>
                <Button data-style-id="stylo-343" variant="destructive" className="w-full">
                  <Trash2 data-style-id="stylo-344" className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-style-id="stylo-345">
                <AlertDialogHeader data-style-id="stylo-346">
                  <AlertDialogTitle data-style-id="stylo-347">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription data-style-id="stylo-348">
                    This action cannot be undone. This will permanently delete your
                    project and all of its tasks and milestones.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter data-style-id="stylo-349">
                  <AlertDialogCancel data-style-id="stylo-350">Cancel</AlertDialogCancel>
                  <AlertDialogAction data-style-id="stylo-351" onClick={() => {
                    deleteProject(project.id);
                    onOpenChange(false);
                  }}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button data-style-id="stylo-352" variant="outline" className="w-full btn-outline-glass" onClick={() => setIsFormOpen(true)}>
              <PenSquare data-style-id="stylo-353" className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <ProjectForm data-style-id="stylo-354"
      isOpen={isFormOpen}
      onOpenChange={setIsFormOpen}
      projectToEdit={project} />

    </>);

}
````

## File: src/components/dashboard/search-bar.tsx
````typescript
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchBar({
  id,
  value,
  onChange,
  placeholder = 'Search projects...',
  className,
  debounceMs = 300
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync local value with external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange, value]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  return (
    <div data-style-id="stylo-355" id={id} className={cn('relative', className)}>
      <Search data-style-id="stylo-356" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input data-style-id="stylo-357"
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      className="pl-9 pr-9 dashboard-input" />

      {localValue &&
      <button data-style-id="stylo-358" id="el-104"
      onClick={handleClear}
      className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Clear search">

          <X data-style-id="stylo-359" className="h-4 w-4" />
        </button>
      }
    </div>);

}
````

## File: src/components/dashboard/status-select.tsx
````typescript
'use client';

import React from 'react';
import type { ProjectStatus } from '@/lib/types';
import { STATUS_CONFIG } from '@/lib/domains';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { cn } from '@/lib/utils';
import { Play, Pause, CheckCircle2, Archive } from 'lucide-react';

const STATUS_ICONS: Record<ProjectStatus, React.ComponentType<{className?: string;}>> = {
  active: Play,
  paused: Pause,
  done: CheckCircle2,
  archived: Archive
};

interface StatusSelectProps {
  value: ProjectStatus;
  onChange: (status: ProjectStatus) => void;
  className?: string;
}

export function StatusSelect({ value, onChange, className }: StatusSelectProps) {
  const config = STATUS_CONFIG[value];
  const Icon = STATUS_ICONS[value];

  return (
    <Select data-style-id="stylo-360" value={value} onValueChange={(v) => onChange(v as ProjectStatus)}>
      <SelectTrigger data-style-id="stylo-361" className={cn('w-[140px]', className)}>
        <SelectValue data-style-id="stylo-362">
          <div data-style-id="stylo-363" id="el-105" className="flex items-center gap-2" style={{ color: config.color }}>
            <Icon data-style-id="stylo-364" className="h-4 w-4" />
            <span data-style-id="stylo-365" id="el-106">{config.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent data-style-id="stylo-366">
        {(Object.keys(STATUS_CONFIG) as ProjectStatus[]).map((status) => {
          const statusConfig = STATUS_CONFIG[status];
          const StatusIcon = STATUS_ICONS[status];
          return (
            <SelectItem data-style-id="stylo-367" key={status} value={status}>
              <div data-style-id="stylo-368" id="el-107" className="flex items-center gap-2" style={{ color: statusConfig.color }}>
                <StatusIcon data-style-id="stylo-369" className="h-4 w-4" />
                <span data-style-id="stylo-370" id="el-108">{statusConfig.label}</span>
              </div>
            </SelectItem>);

        })}
      </SelectContent>
    </Select>);

}

// Badge version for display on cards
export function StatusBadge({
  status,
  size = 'default',
  className




}: {status: ProjectStatus;size?: 'small' | 'default';className?: string;}) {
  const config = STATUS_CONFIG[status];
  const Icon = STATUS_ICONS[status];

  return (
    <div data-style-id="stylo-371" id="el-109"
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      className
    )}
    style={{
      backgroundColor: config.bgColor,
      color: config.color
    }}>

      <Icon data-style-id="stylo-372" className={size === 'small' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </div>);

}

// Quick status buttons for modal
export function StatusButtons({
  value,
  onChange,
  className
}: StatusSelectProps) {
  return (
    <div data-style-id="stylo-373" id="el-110" className={cn('flex gap-2 flex-wrap', className)}>
      {(Object.keys(STATUS_CONFIG) as ProjectStatus[]).map((status) => {
        const config = STATUS_CONFIG[status];
        const Icon = STATUS_ICONS[status];
        const isActive = value === status;

        return (
          <button data-style-id="stylo-374" id="el-111"
          key={status}
          type="button"
          onClick={() => onChange(status)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
            'border',
            isActive ?
            'border-transparent' :
            'border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted/50'
          )}
          style={
          isActive ?
          {
            backgroundColor: config.bgColor,
            color: config.color,
            borderColor: config.color
          } :
          undefined
          }>

            <Icon data-style-id="stylo-375" className="h-4 w-4" />
            {config.label}
          </button>);

      })}
    </div>);

}
````

## File: src/components/dashboard/tags-input.tsx
````typescript
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export function TagsInput({
  tags,
  onChange,
  suggestions = [],
  placeholder = 'Add tag...',
  className,
  readOnly = false
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input and exclude already added tags
  const filteredSuggestions = suggestions.filter(
    (s) =>
    s.toLowerCase().includes(inputValue.toLowerCase()) &&
    !tags.includes(s)
  );

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAddTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag on backspace if input is empty
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div data-style-id="stylo-376" id="el-112" ref={containerRef} className={cn('space-y-2', className)}>
      {/* Tags display */}
      <div data-style-id="stylo-377" id="el-113" className="flex flex-wrap gap-2">
        {tags.map((tag) =>
        <Badge data-style-id="stylo-378"
        key={tag}
        variant="secondary"
        className="px-2 py-1 text-xs flex items-center gap-1">

            #{tag}
            {!readOnly &&
          <button data-style-id="stylo-379" id="el-114"
          type="button"
          onClick={() => handleRemoveTag(tag)}
          className="ml-1 hover:text-destructive transition-colors">

                <X data-style-id="stylo-380" className="h-3 w-3" />
              </button>
          }
          </Badge>
        )}
      </div>

      {/* Input for adding new tags */}
      {!readOnly &&
      <div data-style-id="stylo-381" id="el-115" className="relative">
          <Input data-style-id="stylo-382"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="text-sm" />


          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 &&
        <div data-style-id="stylo-383" id="el-116" className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-auto">
              {filteredSuggestions.map((suggestion) =>
          <button data-style-id="stylo-384" id="el-117"
          key={suggestion}
          type="button"
          onClick={() => handleAddTag(suggestion)}
          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2">

                  <Plus data-style-id="stylo-385" className="h-3 w-3" />
                  {suggestion}
                </button>
          )}
            </div>
        }
        </div>
      }

      {!readOnly &&
      <p data-style-id="stylo-386" id="el-118" className="text-xs text-muted-foreground">
          Press Enter or comma to add a tag
        </p>
      }
    </div>);

}

// Simple tag display component for cards
export function TagBadges({
  tags,
  max = 3,
  className




}: {tags: string[];max?: number;className?: string;}) {
  const displayTags = tags.slice(0, max);
  const remaining = tags.length - max;

  return (
    <div data-style-id="stylo-387" id="el-119" className={cn('flex flex-wrap gap-1', className)}>
      {displayTags.map((tag) =>
      <span data-style-id="stylo-388" id="el-120"
      key={tag}
      className="px-2 py-0.5 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50">

          #{tag}
        </span>
      )}
      {remaining > 0 &&
      <span data-style-id="stylo-389" id="el-121" className="px-2 py-0.5 text-xs rounded-full bg-muted/30 text-muted-foreground">
          +{remaining}
        </span>
      }
    </div>);

}
````

## File: src/components/icons/logo.tsx
````typescript
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg data-style-id="stylo-390" id="el-122"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">

        <path data-style-id="stylo-391" id="el-123"
      d="M7.5 4.5H19.5C20.6046 4.5 21.5 5.39543 21.5 6.5V17.5C21.5 18.6046 20.6046 19.5 19.5 19.5H7.5C6.39543 19.5 5.5 18.6046 5.5 17.5V6.5C5.5 5.39543 6.39543 4.5 7.5 4.5Z"
      stroke="currentColor"
      strokeWidth="1.5" />

        <path data-style-id="stylo-392" id="el-124"
      d="M4.5 6.5C4.5 5.39543 3.60457 4.5 2.5 4.5V4.5C3.60457 4.5 4.5 5.39543 4.5 6.5V17.5C4.5 16.3954 3.60457 15.5 2.5 15.5V15.5C3.60457 15.5 4.5 16.3954 4.5 17.5V17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round" />

        <path data-style-id="stylo-393" id="el-125"
      d="M10 12.5L12.5 15L17 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />

      </svg>);

}
````

## File: src/components/layout/app-sidebar.tsx
````typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  BotMessageSquare,
  Settings,
  ChevronDown,
  FolderInput,
  CalendarDays } from
'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { DOMAIN_LIST } from '@/lib/domains';
import { useState } from 'react';

const navItems = [
{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
{ href: '/today', icon: CalendarDays, label: 'Today' },
{ href: '/tasks', icon: CheckSquare, label: 'Tasks' },
{ href: '/prioritize', icon: BotMessageSquare, label: 'AI Prioritizer' },
{ href: '/import', icon: FolderInput, label: 'AI Import' }];


export function AppSidebar() {
  const pathname = usePathname();
  const [domainsOpen, setDomainsOpen] = useState(false);

  return (
    <aside data-style-id="stylo-394" id="layout-sidebar" className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col app-sidebar sm:flex">
      <nav data-style-id="stylo-395" id="layout-sidebar-nav" className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link data-style-id="stylo-396"
        id="layout-sidebar-logo"
        href="/dashboard"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">

          <Logo data-style-id="stylo-397" className="h-5 w-5 text-primary-foreground transition-all group-hover:scale-110" />
          <span data-style-id="stylo-398" id="el-126" className="sr-only">Action Deck</span>
        </Link>

        <TooltipProvider data-style-id="stylo-399">
          {navItems.map((item) => {
            const navId = `layout-sidebar-nav-${item.href.split('/').pop()}`;
            return (
              <Tooltip data-style-id="stylo-400" key={item.href}>
                <TooltipTrigger data-style-id="stylo-401" asChild>
                  <Link data-style-id="stylo-402"
                  id={navId}
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
                  )}>

                    <item.icon data-style-id="stylo-403" className="h-5 w-5" />
                    <span data-style-id="stylo-404" id="el-127" className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent data-style-id="stylo-405" side="right">{item.label}</TooltipContent>
              </Tooltip>);

          })}

          {/* Domains Section */}
          <Collapsible data-style-id="stylo-406" id="layout-sidebar-domains" open={domainsOpen} onOpenChange={setDomainsOpen}>
            <Tooltip data-style-id="stylo-407">
              <TooltipTrigger data-style-id="stylo-408" asChild>
                <CollapsibleTrigger data-style-id="stylo-409"
                id="layout-sidebar-domains-trigger"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathname.startsWith('/domain') && "bg-accent text-accent-foreground"
                )}>

                  <ChevronDown data-style-id="stylo-410" className={cn("h-5 w-5 transition-transform", domainsOpen && "rotate-180")} />
                  <span data-style-id="stylo-411" id="el-128" className="sr-only">Styles</span>
                </CollapsibleTrigger>
              </TooltipTrigger>
              <TooltipContent data-style-id="stylo-412" side="right">Domains</TooltipContent>
            </Tooltip>

            <CollapsibleContent data-style-id="stylo-413" className="space-y-1 mt-1">
              {DOMAIN_LIST.map((domain) => {
                const Icon = domain.icon;
                const isActive = pathname === `/domain/${domain.value}`;

                return (
                  <Tooltip data-style-id="stylo-414" key={domain.value}>
                    <TooltipTrigger data-style-id="stylo-415" asChild>
                      <Link data-style-id="stylo-416"
                      href={`/domain/${domain.value}`}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-all mx-auto",
                        isActive ?
                        "text-white" :
                        "text-muted-foreground hover:text-foreground"
                      )}
                      style={
                      isActive ?
                      {
                        background: domain.bgGradient,
                        boxShadow: `0 2px 8px ${domain.color}40`
                      } :
                      undefined
                      }>

                        <Icon data-style-id="stylo-417" className="h-4 w-4" style={!isActive ? { color: domain.color } : undefined} />
                        <span data-style-id="stylo-418" id="el-129" className="sr-only">{domain.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent data-style-id="stylo-419" side="right">{domain.label}</TooltipContent>
                  </Tooltip>);

              })}
            </CollapsibleContent>
          </Collapsible>

          <Tooltip data-style-id="stylo-420">
            <TooltipTrigger data-style-id="stylo-421" asChild>
              <button data-style-id="stylo-422" id="layout-sidebar-settings"
              onClick={() => {const btn = document.getElementById('header-filters-trigger') as HTMLButtonElement | null;btn?.click();}}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              aria-label="Filters">

                <Settings data-style-id="stylo-423" className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent data-style-id="stylo-424" side="right">Filters</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>);

}
````

## File: src/components/layout/filters-modal.tsx
````typescript
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogPortal, DialogOverlay, DialogFooter } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/context/settings-context';

export type FilterSettings = {
  brightness: number;
  contrast: number;
  saturate: number;
  hueRotate: number;
  sepia: number;
  invert: boolean;
  backgroundPanel: string;
};

export const defaultFilters: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
  sepia: 0,
  invert: false,
  backgroundPanel: 'none'
};

const backgroundOptions = [
{ value: 'none', label: 'None' },
{ value: 'stars', label: 'Stars' },
{ value: 'grid', label: 'Grid' },
{ value: 'dots', label: 'Dots' },
{ value: 'waves', label: 'Waves' }];


export function FiltersModal({ open, onOpenChange }: {open: boolean;onOpenChange: (v: boolean) => void;}) {
  const { settings, updateSettings, isReady } = useSettings();

  // Local state for live preview
  const [filters, setFilters] = useState<FilterSettings>(defaultFilters);

  // Load from settings when modal opens
  useEffect(() => {
    if (open && isReady && settings.filters) {
      setFilters({ ...defaultFilters, ...settings.filters });
    }
  }, [open, isReady, settings.filters]);

  // Apply filter to document in real-time for preview
  useEffect(() => {
    if (open) {
      applyFiltersToDocument(filters);
    }
  }, [filters, open]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const handleDone = async () => {
    await updateSettings({ filters });
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Revert to saved settings
    const saved = settings.filters || defaultFilters;
    applyFiltersToDocument(saved as FilterSettings);
    onOpenChange(false);
  };

  return (
    <Dialog data-style-id="stylo-425" open={open} onOpenChange={(v) => {
      if (!v) handleCancel();else
      onOpenChange(v);
    }}>
      <DialogPortal data-style-id="stylo-426">
        {/* Transparent overlay - allows seeing filter effects */}
        <DialogOverlay data-style-id="stylo-427" className="bg-transparent" />

        {/* Modal with strong shadow instead of overlay */}
        <DialogPrimitive.Content data-style-id="stylo-428"
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-primary/50 bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg shadow-[0_0_60px_20px_rgba(0,0,0,0.8),0_0_100px_40px_rgba(0,0,0,0.6)] border-t-2 border-t-primary">

          <h2 data-style-id="stylo-429" id="el-363" className="font-headline text-2xl text-primary lowercase tracking-wide">filters</h2>

          <div data-style-id="stylo-430" id="el-364" className="space-y-6 py-4">
            {/* Brightness */}
            <div data-style-id="stylo-431" id="el-365" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-432" className="text-base font-medium min-w-[140px]">
                Brightness {filters.brightness}%
              </Label>
              <Slider data-style-id="stylo-433"
              value={[filters.brightness]}
              onValueChange={([v]) => setFilters({ ...filters, brightness: v })}
              min={0}
              max={200}
              step={1}
              className="flex-1" />

            </div>

            {/* Contrast */}
            <div data-style-id="stylo-434" id="el-366" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-435" className="text-base font-medium min-w-[140px]">
                Contrast {filters.contrast}%
              </Label>
              <Slider data-style-id="stylo-436"
              value={[filters.contrast]}
              onValueChange={([v]) => setFilters({ ...filters, contrast: v })}
              min={0}
              max={200}
              step={1}
              className="flex-1" />

            </div>

            {/* Saturate */}
            <div data-style-id="stylo-437" id="el-367" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-438" className="text-base font-medium min-w-[140px]">
                Saturate {filters.saturate}%
              </Label>
              <Slider data-style-id="stylo-439"
              value={[filters.saturate]}
              onValueChange={([v]) => setFilters({ ...filters, saturate: v })}
              min={0}
              max={200}
              step={1}
              className="flex-1" />

            </div>

            {/* Hue Rotate */}
            <div data-style-id="stylo-440" id="el-368" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-441" className="text-base font-medium min-w-[140px]">
                Hue Rotate {filters.hueRotate}°
              </Label>
              <Slider data-style-id="stylo-442"
              value={[filters.hueRotate]}
              onValueChange={([v]) => setFilters({ ...filters, hueRotate: v })}
              min={0}
              max={360}
              step={1}
              className="flex-1" />

            </div>

            {/* Sepia */}
            <div data-style-id="stylo-443" id="el-369" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-444" className="text-base font-medium min-w-[140px]">
                Sepia {filters.sepia}%
              </Label>
              <Slider data-style-id="stylo-445"
              value={[filters.sepia]}
              onValueChange={([v]) => setFilters({ ...filters, sepia: v })}
              min={0}
              max={100}
              step={1}
              className="flex-1" />

            </div>

            {/* Invert */}
            <div data-style-id="stylo-446" id="el-370" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-447" className="text-base font-medium min-w-[140px]">Invert</Label>
              <Checkbox data-style-id="stylo-448"
              checked={filters.invert}
              onCheckedChange={(checked) => setFilters({ ...filters, invert: !!checked })}
              className="h-5 w-5" />

            </div>

            {/* Background Panel */}
            <div data-style-id="stylo-449" id="el-371" className="flex items-center justify-between gap-8">
              <Label data-style-id="stylo-450" className="text-base font-medium min-w-[140px]">Background Panel</Label>
              <Select data-style-id="stylo-451"
              value={filters.backgroundPanel}
              onValueChange={(v) => setFilters({ ...filters, backgroundPanel: v })}>

                <SelectTrigger data-style-id="stylo-452" className="w-[200px]">
                  <SelectValue data-style-id="stylo-453" placeholder="Select background" />
                </SelectTrigger>
                <SelectContent data-style-id="stylo-454">
                  {backgroundOptions.map((opt) =>
                  <SelectItem data-style-id="stylo-455" key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter data-style-id="stylo-456">
            <Button data-style-id="stylo-457" variant="outline" onClick={handleReset}>Reset</Button>
            <Button data-style-id="stylo-458" onClick={handleDone}>Done</Button>
          </DialogFooter>

          {/* Close button */}
          <DialogPrimitive.Close data-style-id="stylo-459" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X data-style-id="stylo-460" className="h-4 w-4" />
            <span data-style-id="stylo-461" id="el-372" className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>);

}

// Helper to apply CSS filters to the main app container
export function applyFiltersToDocument(filters: FilterSettings) {
  const appContainer = document.getElementById('app-filter-container');
  if (!appContainer) return;

  const filterString = [
  `brightness(${filters.brightness}%)`,
  `contrast(${filters.contrast}%)`,
  `saturate(${filters.saturate}%)`,
  `hue-rotate(${filters.hueRotate}deg)`,
  `sepia(${filters.sepia}%)`,
  filters.invert ? 'invert(1)' : ''].
  filter(Boolean).join(' ');

  appContainer.style.filter = filterString;

  // Apply background panel
  const bgContainer = document.getElementById('app-background-panel');
  if (bgContainer) {
    bgContainer.className = `app-background-panel bg-${filters.backgroundPanel}`;
  }
}
````

## File: src/components/layout/header.tsx
````typescript
'use client';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, LayoutDashboard, CheckSquare, BotMessageSquare, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';
import { SettingsModal } from './settings-modal';
import { FiltersModal } from './filters-modal';

const navItems = [
{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
{ href: '/tasks', icon: CheckSquare, label: 'Tasks' },
{ href: '/prioritize', icon: BotMessageSquare, label: 'AI Prioritizer' }];


export function Header() {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => pathname.startsWith(item.href))?.label || 'Dashboard';
  const [open, setOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  return (
    <header data-style-id="stylo-462" id="layout-header" className="sticky top-0 z-30 flex h-14 items-center gap-4 app-header-bar px-4 sm:static sm:h-auto sm:px-6">
      <Sheet data-style-id="stylo-463">
        <SheetTrigger data-style-id="stylo-464" asChild>
          <Button data-style-id="stylo-465" id="layout-header-mobile-trigger" size="icon" variant="outline" className="sm:hidden">
            <PanelLeft data-style-id="stylo-466" className="h-5 w-5" />
            <span data-style-id="stylo-467" id="el-130" className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent data-style-id="stylo-468" side="left" className="sm:max-w-xs">
          <SheetTitle data-style-id="stylo-469" className="sr-only">Main Menu</SheetTitle>
          <nav data-style-id="stylo-470" id="el-131" className="grid gap-6 text-lg font-medium">
            <Link data-style-id="stylo-471"
            href="/dashboard"
            className="group flex h-10 items-center gap-4 rounded-full text-lg font-semibold">

              <div data-style-id="stylo-472" id="el-132" className="bg-primary rounded-full p-2">
                <Logo data-style-id="stylo-473" className="h-5 w-5 text-primary-foreground" />
              </div>
              <span data-style-id="stylo-474" id="el-133" className="font-headline text-xl text-primary">Action Deck</span>
            </Link>
            {navItems.map((item) =>
            <Link data-style-id="stylo-475"
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              pathname.startsWith(item.href) && "text-foreground"
            )}>

                <item.icon data-style-id="stylo-476" className="h-5 w-5" />
                {item.label}
              </Link>
            )}
            <button data-style-id="stylo-477" id="el-134"
            onClick={(e) => {e.preventDefault();const btn = document.getElementById('header-settings-trigger');(btn as HTMLButtonElement)?.click();}}
            className="text-left flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">

              <Settings data-style-id="stylo-478" className="h-5 w-5" />
              Settings
            </button>
          </nav>
        </SheetContent>
      </Sheet>
      
      <Breadcrumb data-style-id="stylo-479" id="layout-header-breadcrumb" className="hidden md:flex">
        <BreadcrumbList data-style-id="stylo-480">
          <BreadcrumbItem data-style-id="stylo-481">
            <BreadcrumbLink data-style-id="stylo-482" asChild>
              <Link data-style-id="stylo-483" href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator data-style-id="stylo-484" />
          <BreadcrumbItem data-style-id="stylo-485">
            <BreadcrumbPage data-style-id="stylo-486">{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div data-style-id="stylo-487" id="el-135" className="relative ml-auto flex items-center gap-2">
        <ThemeToggle data-style-id="stylo-488" />
        <Button data-style-id="stylo-489" id="layout-header-settings-trigger" size="icon" variant="outline" onClick={() => setOpen(true)} aria-label="Settings">
          <Settings data-style-id="stylo-490" className="h-8 w-8" />
        </Button>
        {/* Hidden trigger for filters modal - used by sidebar */}
        <button data-style-id="stylo-491" id="header-filters-trigger" className="hidden" onClick={() => setFiltersOpen(true)} aria-hidden="true" />
        <SettingsModal data-style-id="stylo-492" open={open} onOpenChange={setOpen} />
        <FiltersModal data-style-id="stylo-493" open={filtersOpen} onOpenChange={setFiltersOpen} />
      </div>
    </header>);

}
````

## File: src/components/layout/settings-modal.tsx
````typescript
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import type { Project, TaskListItem } from '@/lib/types';
import { useSettings } from '@/context/settings-context';

type ExportShape = {
  projects: Project[];
  casualTasks: TaskListItem[];
};

export function SettingsModal({ open, onOpenChange }: {open: boolean;onOpenChange: (v: boolean) => void;}) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [uid, setUid] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const [exportData, setExportData] = useState('');
  const [importText, setImportText] = useState('');
  const [busy, setBusy] = useState(false);
  const { settings, updateSettings, isReady } = useSettings();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
  }, [auth]);

  const example = useMemo(() => JSON.stringify({
    projects: [
    {
      id: 'proj-123',
      name: 'Example',
      description: '',
      deadline: '2025-12-31',
      importance: 5,
      size: 10,
      relevance: '',
      tasks: [],
      coverImage: '',
      status: 'active',
      tags: [],
      milestones: [],
      updatedAt: Date.now(),
      createdAt: Date.now()
    }],

    casualTasks: [
    { id: 'ctask-1', title: 'Sample task', completed: false }]

  } as ExportShape, null, 2), []);

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);setBusy(true);
    try {
      if (mode === 'login') await signInWithEmailAndPassword(auth, email.trim(), password);else
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      setError(e?.message || 'Authentication failed');
    } finally {setBusy(false);}
  }

  async function handleExport() {
    if (!uid) {setError('Please log in first');return;}
    setBusy(true);setError(null);
    try {
      const projSnap = await getDocs(collection(db, 'users', uid, 'apps', 'actionDeck', 'projects'));
      const projects: Project[] = projSnap.docs.map((d) => d.data() as Project);
      const taskSnap = await getDocs(collection(db, 'users', uid, 'apps', 'actionDeck', 'casualTasks'));
      const casualTasks: TaskListItem[] = taskSnap.docs.map((d) => d.data() as TaskListItem);
      const payload: ExportShape = { projects, casualTasks };
      setExportData(JSON.stringify(payload, null, 2));
    } catch (e: any) {
      setError(e?.message || 'Export failed');
    } finally {setBusy(false);}
  }

  async function handleImport() {
    if (!uid) {setError('Please log in first');return;}
    setBusy(true);setError(null);
    try {
      const parsed = JSON.parse(importText || '{}') as ExportShape;
      if (Array.isArray(parsed.projects)) {
        for (const p of parsed.projects) {
          await setDoc(doc(db, 'users', uid, 'apps', 'actionDeck', 'projects', p.id), p, { merge: true });
        }
      }
      if (Array.isArray(parsed.casualTasks)) {
        for (const t of parsed.casualTasks) {
          await setDoc(doc(db, 'users', uid, 'apps', 'actionDeck', 'casualTasks', t.id), t as any, { merge: true });
        }
      }
    } catch (e: any) {
      setError(e?.message || 'Import failed — ensure JSON matches the example');
    } finally {setBusy(false);}
  }

  return (
    <Dialog data-style-id="stylo-494" open={open} onOpenChange={onOpenChange}>
      <DialogContent data-style-id="stylo-495" className="sm:max-w-2xl">
        <DialogHeader data-style-id="stylo-496">
          <DialogTitle data-style-id="stylo-497">Settings</DialogTitle>
          <DialogDescription data-style-id="stylo-498">Manage account, and import/export your Action Deck data.</DialogDescription>
        </DialogHeader>

        <div data-style-id="stylo-499" id="el-136" className="grid md:grid-cols-2 gap-6">
          <div data-style-id="stylo-500" id="el-137" className="space-y-3">
            <div data-style-id="stylo-501" id="el-138" className="text-sm font-medium">Account</div>
            {uid ?
            <div data-style-id="stylo-502" id="el-139" className="space-y-2">
                <div data-style-id="stylo-503" id="el-140" className="text-sm text-muted-foreground">Signed in as: {uid}</div>
                <Button data-style-id="stylo-504" variant="secondary" onClick={() => signOut(auth)}>Log out</Button>
              </div> :

            <form data-style-id="stylo-505" id="el-141" onSubmit={handleAuthSubmit} className="space-y-2">
                <Input data-style-id="stylo-506" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input data-style-id="stylo-507" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <div data-style-id="stylo-508" id="el-142" className="text-sm text-destructive">{error}</div>}
                <div data-style-id="stylo-509" id="el-143" className="flex gap-2">
                  <Button data-style-id="stylo-510" type="submit" disabled={busy}>{mode === 'login' ? 'Log in' : 'Sign up'}</Button>
                  <Button data-style-id="stylo-511" type="button" variant="outline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                    {mode === 'login' ? 'Need an account?' : 'Have an account?'}
                  </Button>
                </div>
              </form>
            }

            <div data-style-id="stylo-512" id="el-144" className="space-y-4 pt-4">
              <div data-style-id="stylo-513" id="el-145" className="text-sm font-medium">Behavior</div>
              <div data-style-id="stylo-514" id="el-146" className="flex items-start justify-between gap-4">
                <div data-style-id="stylo-515" id="el-147" className="text-sm">
                  <Label data-style-id="stylo-516" htmlFor="cloud">Save to cloud</Label>
                  <p data-style-id="stylo-517" id="el-148" className="text-muted-foreground">When off, the app is read-only. Any changes you make will not be saved and are lost on reload or page change unless you Export first.</p>
                </div>
                <Switch data-style-id="stylo-518" id="cloud" checked={!!settings.enableSync} disabled={!uid || !isReady} onCheckedChange={(v) => updateSettings({ enableSync: !!v })} />
              </div>
              <div data-style-id="stylo-519" id="el-149" className="flex items-start justify-between gap-4">
                <div data-style-id="stylo-520" id="el-150" className="text-sm">
                  <Label data-style-id="stylo-521" htmlFor="briizos">Import from briizOS</Label>
                  <p data-style-id="stylo-522" id="el-151" className="text-muted-foreground">When on, the Casual Task List shows briizOS organizer items (read-only). Import happens each time you open or refocus the Tasks page.</p>
                </div>
                <Switch data-style-id="stylo-523" id="briizos" checked={!!settings.importBriizOS} disabled={!uid || !isReady} onCheckedChange={(v) => updateSettings({ importBriizOS: !!v })} />
              </div>
            </div>
          </div>

          <div data-style-id="stylo-524" id="el-152" className="space-y-3">
            <div data-style-id="stylo-525" id="el-153" className="flex items-center justify-between">
              <div data-style-id="stylo-526" id="el-154" className="text-sm font-medium">Export</div>
              <Button data-style-id="stylo-527" size="sm" onClick={handleExport} disabled={busy}>Export now</Button>
            </div>
            <Textarea data-style-id="stylo-528" value={exportData} readOnly rows={10} placeholder="Click Export to generate JSON" />
          </div>
        </div>

        <div data-style-id="stylo-529" id="el-155" className="space-y-2 mt-6">
          <div data-style-id="stylo-530" id="el-156" className="text-sm font-medium">Import</div>
          <Textarea data-style-id="stylo-531" rows={8} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={example} />
          <div data-style-id="stylo-532" id="el-157" className="flex gap-2 justify-end">
            <Button data-style-id="stylo-533" variant="outline" onClick={() => setImportText(example)}>Load example</Button>
            <Button data-style-id="stylo-534" onClick={handleImport} disabled={busy || !uid}>Import</Button>
          </div>
        </div>

        <DialogFooter data-style-id="stylo-535">
          <Button data-style-id="stylo-536" variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

}
````

## File: src/components/prioritize/prioritization-form.tsx
````typescript
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { handlePrioritization } from '@/lib/actions';
import { useProjects } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { PrioritizationResult } from './prioritization-result';
import type { PrioritizeProjectsOutput } from '@/ai/flows/intelligent-project-prioritization';

const formSchema = z.object({
  projectIds: z.array(z.string()).min(1, 'Please select at least one project.'),
  userGoals: z.string().min(10, 'Please describe your goals in at least 10 characters.'),
  timing: z.string().min(10, 'Please describe the timing/context in at least 10 characters.')
});

export function PrioritizationForm() {
  const { projects } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PrioritizeProjectsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectIds: projects.map((p) => p.id),
      userGoals: 'I want to improve my skills and build something impressive for my portfolio.',
      timing: 'I want to decide what to focus on for the next quarter.'
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const selectedProjects = projects.filter((p) => values.projectIds.includes(p.id));

    try {
      const response = await handlePrioritization({
        projects: selectedProjects.map(({ name, deadline, importance, size, relevance }) => ({ name, deadline, importance, size, relevance })),
        userGoals: values.userGoals,
        timing: values.timing
      });
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error || 'An unknown error occurred.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div data-style-id="stylo-537" id="el-158" className="grid md:grid-cols-2 gap-8 items-start">
            <Card data-style-id="stylo-538" id="prioritize-form-card">
                <CardHeader data-style-id="stylo-539">
                    <CardTitle data-style-id="stylo-540">Create Prioritization Request</CardTitle>
                    <CardDescription data-style-id="stylo-541">Fill out the details below to get an AI-powered recommendation.</CardDescription>
                </CardHeader>
                <CardContent data-style-id="stylo-542">
                    <Form data-style-id="stylo-543" {...form}>
                        <form data-style-id="stylo-544" id="prioritize-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField data-style-id="stylo-545"
              control={form.control}
              name="projectIds"
              render={() =>
              <FormItem data-style-id="stylo-546">
                                        <div data-style-id="stylo-547" id="el-159" className="mb-4">
                                            <FormLabel data-style-id="stylo-548" className="text-base">Projects to Prioritize</FormLabel>
                                            <FormDescription data-style-id="stylo-549">Select which of your projects to include in the analysis.</FormDescription>
                                        </div>
                                        <div data-style-id="stylo-550" id="prioritize-project-checkboxes" className="space-y-2">
                                            {projects.map((project) =>
                  <FormField data-style-id="stylo-551"
                  key={project.id}
                  control={form.control}
                  name="projectIds"
                  render={({ field }) => {
                    return (
                      <FormItem data-style-id="stylo-552"
                      key={project.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">

                                                                <FormControl data-style-id="stylo-553">
                                                                    <Checkbox data-style-id="stylo-554"
                          checked={field.value?.includes(project.id)}
                          onCheckedChange={(checked) => {
                            return checked ?
                            field.onChange([...(field.value || []), project.id]) :
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== project.id
                              ) || []
                            );
                          }} />

                                                                </FormControl>
                                                                <FormLabel data-style-id="stylo-555" className="font-normal">
                                                                    {project.name}
                                                                </FormLabel>
                                                            </FormItem>);

                  }} />

                  )}
                                        </div>
                                        <FormMessage data-style-id="stylo-556" />
                                    </FormItem>
              } />

                            <FormField data-style-id="stylo-557"
              control={form.control}
              name="userGoals"
              render={({ field }) =>
              <FormItem data-style-id="stylo-558">
                                        <FormLabel data-style-id="stylo-559">Your Goals</FormLabel>
                                        <FormControl data-style-id="stylo-560">
                                            <Textarea data-style-id="stylo-561" id="prioritize-goals-input" placeholder="e.g., Learn a new skill for career growth, improve my health..." {...field} />
                                        </FormControl>
                                        <FormDescription data-style-id="stylo-562">What are you trying to achieve right now?</FormDescription>
                                        <FormMessage data-style-id="stylo-563" />
                                    </FormItem>
              } />

                            <FormField data-style-id="stylo-564"
              control={form.control}
              name="timing"
              render={({ field }) =>
              <FormItem data-style-id="stylo-565">
                                        <FormLabel data-style-id="stylo-566">Timing / Context</FormLabel>
                                        <FormControl data-style-id="stylo-567">
                                            <Textarea data-style-id="stylo-568" id="prioritize-timing-input" placeholder="e.g., Planning for the next month, have extra free time on weekends..." {...field} />
                                        </FormControl>
                                        <FormDescription data-style-id="stylo-569">Any relevant context about your current situation.</FormDescription>
                                        <FormMessage data-style-id="stylo-570" />
                                    </FormItem>
              } />

                            <Button data-style-id="stylo-571" id="prioritize-submit-btn" type="submit" disabled={isLoading} className="w-full">
                                {isLoading && <Loader2 data-style-id="stylo-572" className="mr-2 h-4 w-4 animate-spin" />}
                                Prioritize My Projects
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <PrioritizationResult data-style-id="stylo-573" result={result} isLoading={isLoading} error={error} />
        </div>);

}
````

## File: src/components/prioritize/prioritization-result.tsx
````typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, BotMessageSquare } from 'lucide-react';
import type { PrioritizeProjectsOutput } from '@/ai/flows/intelligent-project-prioritization';
import { cn } from '@/lib/utils';

interface PrioritizationResultProps {
  result: PrioritizeProjectsOutput | null;
  isLoading: boolean;
  error: string | null;
}

function BasicMarkdown({ text, className }: {text: string;className?: string;}) {
  return (
    <div data-style-id="stylo-574" id="el-160" className={cn("space-y-4 text-sm", className)}>
            {text.split('\n').map((line, i) => {
        if (line.startsWith('### ')) {
          return <h3 data-style-id="stylo-575" id="el-161" key={i} className="font-semibold text-lg mt-4 border-b pb-1">{line.substring(4)}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p data-style-id="stylo-576" id="el-162" key={i} className="font-bold">{line.substring(2, line.length - 2)}</p>;
        }
        if (line.startsWith('* ')) {
          return <div data-style-id="stylo-577" id="el-163" key={i} className="flex gap-2"><span data-style-id="stylo-578" id="el-164" className="text-muted-foreground">&bull;</span><p data-style-id="stylo-579" id="el-165">{line.substring(2)}</p></div>;
        }
        if (line.match(/^\d+\. /)) {
          return <div data-style-id="stylo-580" id="el-166" key={i} className="flex gap-2"><span data-style-id="stylo-581" id="el-167" className="font-medium">{line.substring(0, line.indexOf(' ') + 1)}</span><p data-style-id="stylo-582" id="el-168">{line.substring(line.indexOf(' ') + 1)}</p></div>;
        }
        if (line.trim() === '') {
          return null;
        }
        return <p data-style-id="stylo-583" id="el-169" key={i}>{line}</p>;
      })}
        </div>);

}


export function PrioritizationResult({ result, isLoading, error }: PrioritizationResultProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div data-style-id="stylo-584" id="el-170" className="space-y-4 p-4">
                    <Skeleton data-style-id="stylo-585" className="h-8 w-1/2" />
                    <Skeleton data-style-id="stylo-586" className="h-4 w-full" />
                    <Skeleton data-style-id="stylo-587" className="h-4 w-4/5" />
                    <Skeleton data-style-id="stylo-588" className="h-4 w-full" />
                </div>);

    }

    if (error) {
      return (
        <Alert data-style-id="stylo-589" variant="destructive">
                    <AlertCircle data-style-id="stylo-590" className="h-4 w-4" />
                    <AlertTitle data-style-id="stylo-591">Error</AlertTitle>
                    <AlertDescription data-style-id="stylo-592">{error}</AlertDescription>
                </Alert>);

    }

    if (result) {
      return (
        <div data-style-id="stylo-593" id="prioritize-result-content" className="animate-in fade-in-50">
                    <h3 data-style-id="stylo-594" id="el-171" className="font-bold text-lg mb-2">Prioritized List</h3>
                    <ol data-style-id="stylo-595" id="el-172" className="list-decimal list-inside space-y-1 mb-6 rounded-md border p-4">
                        {result.prioritizedList.map((project, index) =>
            <li data-style-id="stylo-596" id="el-173" key={index} className="pl-2 font-medium">{project}</li>
            )}
                    </ol>
                    <h3 data-style-id="stylo-597" id="el-174" className="font-bold text-lg mb-2">Reasoning</h3>
                    <div data-style-id="stylo-598" id="el-175" className="p-4 rounded-md border bg-muted/20">
                        <BasicMarkdown data-style-id="stylo-599" text={result.reasoning} />
                    </div>
                </div>);

    }

    return (
      <div data-style-id="stylo-600" id="el-176" className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <BotMessageSquare data-style-id="stylo-601" className="h-12 w-12 mb-4" />
                <p data-style-id="stylo-602" id="el-177" className="text-lg font-medium">AI Analysis</p>
                <p data-style-id="stylo-603" id="el-178">Your AI-powered project priority list will appear here.</p>
            </div>);

  };

  return (
    <Card data-style-id="stylo-604" id="prioritize-result-card" className="min-h-[400px]">
            <CardHeader data-style-id="stylo-605">
                <CardTitle data-style-id="stylo-606">AI Recommendation</CardTitle>
                 <CardDescription data-style-id="stylo-607">Here's what the AI suggests based on your input.</CardDescription>
            </CardHeader>
            <CardContent data-style-id="stylo-608" id="prioritize-result">
                {renderContent()}
            </CardContent>
        </Card>);

}
````

## File: src/components/tasks/task-deck-item.tsx
````typescript
import { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Trash2 } from 'lucide-react';

export function TaskDeckItem({ task, onToggle, onDelete, index }: {task: Task;onToggle: (id: string) => void;onDelete?: () => void;index: number;}) {
  return (
    <div data-style-id="stylo-609" id="el-179" className={cn(
      "group flex items-center space-x-3 p-3 rounded-lg transition-colors border",
      task.completed ? 'bg-background/50 border-border/20' : 'border-accent/80',
      index % 2 !== 0 && !task.completed ? 'bg-accent/20' : 'bg-background',
      'hover:bg-accent/30'
    )}>
            <Checkbox data-style-id="stylo-610"
      id={`task-item-${task.id}`}
      checked={task.completed}
      onCheckedChange={() => onToggle(task.id)}
      aria-labelledby={`task-label-${task.id}`} />

            <Label data-style-id="stylo-611"
      id={`task-label-${task.id}`}
      htmlFor={`task-item-${task.id}`}
      className={`flex-1 cursor-pointer transition-colors ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>

                {task.title}
            </Label>

            {onDelete &&
      <Button data-style-id="stylo-612"
      variant="ghost"
      size="icon"
      onClick={onDelete}
      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      aria-label="Delete task">
                <Trash2 data-style-id="stylo-613" className="h-3 w-3" />
              </Button>
      }

            <Badge data-style-id="stylo-614"
      variant={task.completed ? 'secondary' : 'default'}
      className={cn(
        "flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold",
        task.completed ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
      )}>

                {index}
            </Badge>
        </div>);

}
````

## File: src/components/tasks/task-deck.tsx
````typescript
'use client';
import React, { useState } from 'react';
import { TaskDeck as TaskDeckType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { TaskDeckItem } from './task-deck-item';
import { cn } from '@/lib/utils';

interface TaskDeckProps {
  deck: TaskDeckType;
  onToggleTask: (taskId: string, deckId: string) => void;
  onDeleteTask?: (taskId: string, deckId?: string) => void;
}

export function TaskDeck({ deck, onToggleTask, onDeleteTask }: TaskDeckProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedTasks = deck.tasks.filter((t) => t.completed).length;
  const allTasksCompleted = completedTasks === deck.tasks.length;

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <div data-style-id="stylo-615" id="el-180" className={cn("tasks-deck group py-2", allTasksCompleted && 'opacity-50')}>
      <div data-style-id="stylo-616" id="el-181" className="tasks-deck-header flex items-center gap-2 mb-2">
         <Button data-style-id="stylo-617"
        variant="ghost"
        size="icon"
        onClick={toggleExpansion}
        className="h-7 w-7">

          <Plus data-style-id="stylo-618" className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-45")} />
           <span data-style-id="stylo-619" id="el-182" className="sr-only">{isExpanded ? 'Collapse' : 'Expand'} deck</span>
        </Button>

        <div data-style-id="stylo-620" id="el-183" className="flex-grow cursor-pointer" onClick={toggleExpansion}>
          <h3 data-style-id="stylo-621" id="el-184"
          className={cn(
            "tasks-deck-title font-semibold transition-all text-base",
            allTasksCompleted && 'line-through',
            isExpanded ? 'text-foreground' : 'text-muted-foreground'
          )}>

            {deck.title}
          </h3>
        </div>

        <p data-style-id="stylo-622" id="el-185" className="tasks-deck-progress text-xs text-muted-foreground">
            {completedTasks} / {deck.tasks.length}
        </p>

        {onDeleteTask &&
        <Button data-style-id="stylo-623"
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(deck.id)}
        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        aria-label="Delete deck">
            <Trash2 data-style-id="stylo-624" className="h-4 w-4" />
          </Button>
        }

      </div>

      <div data-style-id="stylo-625" id="el-186" className={cn("tasks-deck-content task-deck pl-9")} data-state={isExpanded ? 'expanded' : 'collapsed'}>
        {deck.tasks.map((task, index) =>
        <div data-style-id="stylo-626" id="el-187" key={task.id} className="task-deck-item">
            <TaskDeckItem data-style-id="stylo-627"
          task={task}
          onToggle={() => onToggleTask(task.id, deck.id)}
          onDelete={onDeleteTask ? () => onDeleteTask(task.id, deck.id) : undefined}
          index={index + 1} />

          </div>
        )}
      </div>
    </div>);

}
````

## File: src/components/tasks/task-item.tsx
````typescript
import { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function TaskItem({ task, onToggle, onDelete }: {task: Task;onToggle: (id: string) => void;onDelete?: () => void;}) {
  return (
    <div data-style-id="stylo-628" id="el-188" className="tasks-item group flex items-center space-x-3 p-3 rounded-lg transition-colors bg-background hover:bg-muted/50 border">
            <Checkbox data-style-id="stylo-629"
      id={`task-item-${task.id}`}
      className="tasks-item-checkbox"
      checked={task.completed}
      onCheckedChange={() => onToggle(task.id)}
      aria-labelledby={`task-label-${task.id}`} />

            <Label data-style-id="stylo-630"
      id={`task-label-${task.id}`}
      htmlFor={`task-item-${task.id}`}
      className={`tasks-item-label flex-1 cursor-pointer transition-colors ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>

                {task.title}
            </Label>

            {onDelete &&
      <Button data-style-id="stylo-631"
      variant="ghost"
      size="icon"
      onClick={onDelete}
      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      aria-label="Delete task">
                <Trash2 data-style-id="stylo-632" className="h-4 w-4" />
              </Button>
      }
        </div>);

}
````

## File: src/components/tasks/task-list.tsx
````typescript
'use client';
import React, { useState } from 'react';
import { Task, TaskDeck, TaskListItem } from '@/lib/types';
import { TaskItem } from './task-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { initialCasualTasks } from '@/lib/data';
import { subscribeCasualTasks, upsertCasualItem, removeCasualItem } from '@/lib/persistence';
import { fetchBriizOSSnapshot, mapBriizOSToTasks } from '@/lib/briizos';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSettings } from '@/context/settings-context';
import { handleTaskBreakdown } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TaskDeck as TaskDeckComponent } from './task-deck';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskListItem[]>(initialCasualTasks);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [isBreakingDown, setIsBreakingDown] = useState(false);
  const { toast } = useToast();

  // State for conversational AI
  const [clarifyingQuestion, setClarifyingQuestion] = useState<string | null>(null);
  const [originalGoal, setOriginalGoal] = useState<string>('');
  const [context, setContext] = useState<string>('');

  const { settings } = useSettings();

  // Load/save casual tasks per settings; also re-fetch briizOS on focus.
  // Wait for Firebase auth, then subscribe and fetch. Also re-fetch briizOS on page focus.
  React.useEffect(() => {
    const auth = getAuth();

    const fetchFromBriizOS = () => {
      if (!settings.importBriizOS) return;
      console.log('[tasks] briizOS import enabled; attempting fetch…');
      fetchBriizOSSnapshot().
      then((snap) => {
        if (!snap) {
          console.log('[tasks] briizOS snapshot: null');
          return;
        }
        const imported = mapBriizOSToTasks(snap);
        console.log('[tasks] briizOS mapped tasks count:', imported.length);
        if (imported.length === 0) return;
        setTasks((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          const merged: TaskListItem[] = [...prev];
          let added = 0;
          for (const t of imported) {
            if (!existingIds.has(t.id)) {merged.unshift(t);added++;}
          }
          console.log('[tasks] briizOS tasks merged; added:', added);
          return merged;
        });
      }).
      catch((e) => {console.error('[tasks] briizOS fetch error', e);});
    };

    let unsubPersist: (() => void) | undefined;
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('[tasks] onAuthStateChanged: no user');
        return;
      }
      console.log('[tasks] onAuthStateChanged: uid', user.uid);
      // Start Action Deck persistence subscription now that uid is ready
      unsubPersist = subscribeCasualTasks((remote) => setTasks(remote));

      // LocalStorage fallback when Firestore sync is disabled
      if (!settings.enableSync) {
        try {
          const stored = localStorage.getItem('action-deck-casual-tasks');
          if (stored) setTasks(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load casual tasks from localStorage', e);
        }
      }

      // Initial import and on focus/visibility
      fetchFromBriizOS();
      const onFocus = () => fetchFromBriizOS();
      const onVis = () => {if (document.visibilityState === 'visible') fetchFromBriizOS();};
      window.addEventListener('focus', onFocus);
      document.addEventListener('visibilitychange', onVis);

      // Cleanup focus listeners if auth changes away
      return () => {
        window.removeEventListener('focus', onFocus);
        document.removeEventListener('visibilitychange', onVis);
      };
    });

    return () => {
      if (typeof unsubPersist === 'function') unsubPersist();
      unsubAuth();
    };
  }, [settings.enableSync, settings.importBriizOS]);

  React.useEffect(() => {
    if (settings.enableSync) return; // Firestore drives state when enabled
    try {
      localStorage.setItem('action-deck-casual-tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save casual tasks to localStorage', e);
    }
  }, [tasks, settings.enableSync]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemTitle.trim()) {
      const newTask: Task = {
        id: `ctask-${Date.now()}`,
        title: newItemTitle.trim(),
        completed: false
      };
      setTasks((prev) => [newTask, ...prev]);
      upsertCasualItem(newTask).catch(() => {});
      setNewItemTitle('');
    }
  };

  const handleAiBreakdown = async () => {
    const goal = newItemTitle;
    if (!goal.trim()) return;

    setIsBreakingDown(true);
    setOriginalGoal(goal);
    setNewItemTitle('');

    const result = await handleTaskBreakdown({ goal });

    if (result.success) {
      if (result.data.isDone && result.data.tasks) {
        const newDeck: TaskDeck = {
          id: `deck-${Date.now()}`,
          title: goal,
          tasks: result.data.tasks.map((title, index) => ({
            id: `deck-task-${Date.now()}-${index}`,
            title,
            completed: false
          })),
          isDeck: true
        };
        setTasks((prev) => [newDeck, ...prev]);
        upsertCasualItem(newDeck).catch(() => {});
        toast({
          title: 'Task Deck Created',
          description: `AI broke down "${goal}" into a new deck.`
        });
        resetAiState();
      } else if (result.data.clarifyingQuestion) {
        setClarifyingQuestion(result.data.clarifyingQuestion);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error
      });
      setNewItemTitle(goal); // Restore input if AI fails
    }
    setIsBreakingDown(false);
  };

  const handleClarificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBreakingDown(true);

    const result = await handleTaskBreakdown({ goal: originalGoal, context: context });

    if (result.success) {
      if (result.data?.isDone && result.data.tasks) {
        const newDeck: TaskDeck = {
          id: `deck-${Date.now()}`,
          title: originalGoal,
          tasks: result.data.tasks.map((title, index) => ({
            id: `deck-task-${Date.now()}-${index}`,
            title,
            completed: false
          })),
          isDeck: true
        };
        setTasks((prev) => [newDeck, ...prev]);
        upsertCasualItem(newDeck).catch(() => {});
        toast({
          title: 'Task Deck Created',
          description: `AI broke down "${originalGoal}" into a new deck.`
        });
        resetAiState();
      } else if (result.data?.clarifyingQuestion) {
        setClarifyingQuestion(result.data.clarifyingQuestion);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'The AI was unable to generate tasks. Please try rephrasing your goal.'
        });
        setNewItemTitle(originalGoal);
        resetAiState();
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error
      });
      setNewItemTitle(originalGoal);
      resetAiState();
    }
    setIsBreakingDown(false);
  };

  const resetAiState = () => {
    setClarifyingQuestion(null);
    setOriginalGoal('');
    setContext('');
  };


  const toggleTask = (taskId: string, deckId?: string) => {
    setTasks((prevTasks) => {
      const next = prevTasks.map((item) => {
        if (deckId && 'isDeck' in item && item.id === deckId) {
          return {
            ...item,
            tasks: item.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
            )
          };
        }
        if (!deckId && !('isDeck' in item) && item.id === taskId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });

      // Persist the changed item
      const changed = next.find((it) => {
        if (deckId) return 'isDeck' in it && it.id === deckId;
        return !('isDeck' in it) && it.id === taskId;
      });
      if (changed) {
        upsertCasualItem(changed as any).catch(() => {});
      }

      return next;
    });
  };

  const deleteTask = (taskId: string, deckId?: string) => {
    setTasks((prevTasks) => {
      // If deleting from a deck, remove the task from within the deck
      if (deckId) {
        return prevTasks.map((item) => {
          if ('isDeck' in item && item.id === deckId) {
            const updatedDeck = {
              ...item,
              tasks: item.tasks.filter((t) => t.id !== taskId)
            };
            // Persist the updated deck (or remove it if empty)
            if (updatedDeck.tasks.length === 0) {
              removeCasualItem(deckId).catch(() => {});
              return null; // Mark for removal
            }
            upsertCasualItem(updatedDeck).catch(() => {});
            return updatedDeck;
          }
          return item;
        }).filter(Boolean) as typeof prevTasks;
      }
      // Deleting a standalone task or entire deck
      removeCasualItem(taskId).catch(() => {});
      return prevTasks.filter((item) => item.id !== taskId);
    });
  };

  const pendingTasks = tasks.filter((item) => {
    if ('isDeck' in item) {
      return item.tasks.some((t) => !t.completed);
    }
    return !item.completed;
  });

  const completedTasks = tasks.filter((item) => {
    if ('isDeck' in item) {
      return item.tasks.every((t) => t.completed);
    }
    return item.completed;
  });

  return (
    <Card data-style-id="stylo-633" id="tasks-card" className="task-card">
            <CardHeader data-style-id="stylo-634">
                <CardTitle data-style-id="stylo-635">Casual Task List</CardTitle>
                <CardDescription data-style-id="stylo-636">A simple place for your day-to-day tasks. Use the magic wand to break a larger goal into a collapsible task deck.</CardDescription>
            </CardHeader>
            <CardContent data-style-id="stylo-637">
                {clarifyingQuestion ?
        <div data-style-id="stylo-638" id="el-189" className="mb-6 space-y-4 animate-in fade-in-50">
                        <Alert data-style-id="stylo-639" id="tasks-clarification-alert">
                            <Bot data-style-id="stylo-640" className="h-4 w-4" />
                            <AlertTitle data-style-id="stylo-641">The AI needs more information:</AlertTitle>
                            <AlertDescription data-style-id="stylo-642">{clarifyingQuestion}</AlertDescription>
                        </Alert>
                        <form data-style-id="stylo-643" id="el-190" onSubmit={handleClarificationSubmit} className="task-input-row">
                             <Input data-style-id="stylo-644"
            className="dashboard-input"
            placeholder="Your answer..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            disabled={isBreakingDown}
            autoFocus />

                            <Button data-style-id="stylo-645" type="submit" disabled={isBreakingDown} className="dashboard-button-primary">
                                {isBreakingDown ? <Loader2 data-style-id="stylo-646" className="h-4 w-4 animate-spin" /> : "Submit"}
                            </Button>
                            <Button data-style-id="stylo-647" type="button" variant="ghost" onClick={resetAiState} disabled={isBreakingDown} className="btn-outline-glass">
                                Cancel
                            </Button>
                        </form>
                    </div> :

        <form data-style-id="stylo-648" id="tasks-input-form" onSubmit={handleAddItem} className="task-input-row">
                        <Input data-style-id="stylo-649"
          id="tasks-input-field"
          className="dashboard-input"
          placeholder="Add a task or use AI to create a task deck..."
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          disabled={isBreakingDown} />

                        <Button data-style-id="stylo-650" id="tasks-add-btn" type="submit" size="icon" aria-label="Add Task" disabled={isBreakingDown} className="dashboard-button-primary">
                            <Plus data-style-id="stylo-651" className="h-4 w-4" />
                        </Button>
                        <Button data-style-id="stylo-652" id="tasks-ai-breakdown-btn" type="button" size="icon" variant="outline" aria-label="Breakdown with AI" onClick={handleAiBreakdown} disabled={isBreakingDown} className="btn-outline-glass">
                            {isBreakingDown ? <Loader2 data-style-id="stylo-653" className="h-4 w-4 animate-spin" /> : <Bot data-style-id="stylo-654" className="h-4 w-4" />}
                        </Button>
                    </form>
        }


                <div data-style-id="stylo-655" id="el-191" className="space-y-4">
                    <div data-style-id="stylo-656" id="tasks-pending-section" className="relative space-y-2">
                        {pendingTasks.length > 0 ?
            pendingTasks.map((item) =>
            'isDeck' in item ?
            <TaskDeckComponent data-style-id="stylo-657" key={item.id} deck={item} onToggleTask={toggleTask} onDeleteTask={deleteTask} /> :
            <TaskItem data-style-id="stylo-658" key={item.id} task={item} onToggle={() => toggleTask(item.id)} onDelete={() => deleteTask(item.id)} />
            ) :

            <p data-style-id="stylo-659" id="el-192" className="text-sm text-muted-foreground py-4 text-center">All done for now! 🎉</p>

            }
                    </div>

                    {completedTasks.length > 0 &&
          <div data-style-id="stylo-660" id="tasks-completed-section">
                            <Separator data-style-id="stylo-661" className="my-4" />
                            <h3 data-style-id="stylo-662" id="el-193" className="text-sm font-medium mb-2 text-muted-foreground">Completed</h3>
                            <div data-style-id="stylo-663" id="el-194" className="space-y-2">
                                {completedTasks.map((item) =>
              'isDeck' in item ?
              <TaskDeckComponent data-style-id="stylo-664" key={item.id} deck={item} onToggleTask={toggleTask} onDeleteTask={deleteTask} /> :
              <TaskItem data-style-id="stylo-665" key={item.id} task={item} onToggle={() => toggleTask(item.id)} onDelete={() => deleteTask(item.id)} />
              )}
                            </div>
                        </div>
          }
                </div>
            </CardContent>
        </Card>);

}
````

## File: src/components/today/ai-chat-panel.tsx
````typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { useToday, getCurrentMinute } from '@/context/today-context';
import { useProjects } from '@/context/project-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MessageSquare, Send, X, Loader2, Trash2, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleTodayChat } from '@/lib/actions';
import type { TodayChatOutput } from '@/ai/flows/today-chat-flow';

type SuggestedAction = NonNullable<TodayChatOutput['suggestedActions']>[number];

export function AIChatPanel() {
  const {
    isChatOpen,
    setChatOpen,
    chatHistory,
    addChatMessage,
    clearChatHistory,
    items,
    currentDate,
    aiTaskList,
    removeAITask,
    clearAITaskList,
    addItem,
    updateItem,
    deleteItem,
    toggleItemComplete
  } = useToday();
  const { projects } = useProjects();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskListOpen, setIsTaskListOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Execute suggested actions from AI
  const executeActions = (actions: SuggestedAction[]) => {
    for (const action of actions) {
      switch (action.type) {
        case 'add_item':
          if (action.title && action.startMinute !== undefined && action.durationMinutes !== undefined) {
            addItem({
              title: action.title,
              startMinute: action.startMinute,
              durationMinutes: action.durationMinutes,
              source: { type: 'manual' },
              completed: false
            });
          }
          break;
        case 'move_item':
          if (action.itemId && action.startMinute !== undefined) {
            const item = items.find((i) => i.id === action.itemId);
            if (item) {
              updateItem({
                ...item,
                startMinute: action.startMinute
              });
            }
          }
          break;
        case 'resize_item':
          if (action.itemId && action.durationMinutes !== undefined) {
            const item = items.find((i) => i.id === action.itemId);
            if (item) {
              updateItem({
                ...item,
                durationMinutes: action.durationMinutes
              });
            }
          }
          break;
        case 'remove_item':
          if (action.itemId) {
            deleteItem(action.itemId);
          }
          break;
        case 'complete_item':
          if (action.itemId) {
            toggleItemComplete(action.itemId);
          }
          break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');

    // Add user message
    addChatMessage({ role: 'user', content: userMessage });

    setIsLoading(true);

    try {
      const result = await handleTodayChat({
        message: userMessage,
        chatHistory: chatHistory.map((m) => ({ role: m.role, content: m.content })),
        currentSchedule: items,
        availableProjects: projects.map((p) => ({
          name: p.name,
          deadline: p.deadline,
          importance: p.importance,
          tasks: p.tasks
        })),
        currentDate,
        currentTimeMinute: getCurrentMinute(),
        aiTaskList: aiTaskList.map((t) => ({ title: t.title }))
      });

      if (result.success && result.data) {
        addChatMessage({ role: 'assistant', content: result.data.response });

        // Execute suggested actions if present
        if (result.data.suggestedActions && result.data.suggestedActions.length > 0) {
          executeActions(result.data.suggestedActions);
        }
      } else {
        addChatMessage({
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        });
      }
    } catch (error) {
      console.error('[chat] Error:', error);
      addChatMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return (
      <Button data-style-id="stylo-677"
      variant="outline"
      size="icon"
      className="fixed bottom-20 right-6 h-12 w-12 rounded-full shadow-lg z-40"
      onClick={() => setChatOpen(true)}>

        <MessageSquare data-style-id="stylo-678" className="h-5 w-5" />
      </Button>);

  }

  return (
    <Card data-style-id="stylo-679" className="w-80 flex-shrink-0 flex flex-col h-[calc(100vh-200px)] max-h-[600px]">
      <CardHeader data-style-id="stylo-680" className="pb-2 flex-shrink-0">
        <div data-style-id="stylo-681" id="el-373" className="flex items-center justify-between">
          <CardTitle data-style-id="stylo-682" className="text-lg flex items-center gap-2">
            <Sparkles data-style-id="stylo-683" className="h-4 w-4" />
            AI Assistant
          </CardTitle>
          <div data-style-id="stylo-684" id="el-374" className="flex items-center gap-1">
            {chatHistory.length > 0 &&
            <Button data-style-id="stylo-685"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={clearChatHistory}
            title="Clear chat">

                <Trash2 data-style-id="stylo-686" className="h-4 w-4" />
              </Button>
            }
            <Button data-style-id="stylo-687"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setChatOpen(false)}>

              <X data-style-id="stylo-688" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent data-style-id="stylo-689" className="flex-1 flex flex-col p-3 pt-0 overflow-hidden">
        {/* AI Task List */}
        {aiTaskList.length > 0 &&
        <Collapsible data-style-id="stylo-690" open={isTaskListOpen} onOpenChange={setIsTaskListOpen} className="mb-3">
            <CollapsibleTrigger data-style-id="stylo-691" asChild>
              <Button data-style-id="stylo-692" variant="ghost" size="sm" className="w-full justify-between h-8 px-2">
                <span data-style-id="stylo-693" id="el-375" className="text-xs font-medium flex items-center gap-1">
                  Tasks for AI
                  <Badge data-style-id="stylo-694" variant="secondary" className="ml-1 h-5 px-1.5">
                    {aiTaskList.length}
                  </Badge>
                </span>
                <ChevronDown data-style-id="stylo-695" className={cn('h-4 w-4 transition-transform', isTaskListOpen && 'rotate-180')} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent data-style-id="stylo-696">
              <div data-style-id="stylo-697" id="el-376" className="space-y-1 mt-1 p-2 bg-muted/50 rounded-md">
                {aiTaskList.map((task) =>
              <div data-style-id="stylo-698" id="el-377"
              key={task.id}
              className="flex items-center justify-between gap-2 text-xs py-1">

                    <span data-style-id="stylo-699" id="el-378" className="truncate flex-1">{task.title}</span>
                    <Button data-style-id="stylo-700"
                variant="ghost"
                size="icon"
                className="h-5 w-5 flex-shrink-0"
                onClick={() => removeAITask(task.id)}>

                      <X data-style-id="stylo-701" className="h-3 w-3" />
                    </Button>
                  </div>
              )}
                <Button data-style-id="stylo-702"
              variant="ghost"
              size="sm"
              className="w-full h-6 text-xs text-muted-foreground mt-1"
              onClick={clearAITaskList}>

                  Clear all
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        }

        {/* Messages */}
        <ScrollArea data-style-id="stylo-703" className="flex-1 pr-3" ref={scrollRef}>
          <div data-style-id="stylo-704" id="el-379" className="space-y-3">
            {chatHistory.length === 0 ?
            <div data-style-id="stylo-705" id="el-380" className="text-center text-muted-foreground py-8">
                <Sparkles data-style-id="stylo-706" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p data-style-id="stylo-707" id="el-381" className="text-sm">Ask me about your schedule!</p>
                <p data-style-id="stylo-708" id="el-382" className="text-xs mt-1">I can help prioritize, suggest times, or reorganize your day.</p>
                {aiTaskList.length > 0 &&
              <p data-style-id="stylo-709" id="el-383" className="text-xs mt-2 text-primary">
                    I see {aiTaskList.length} task{aiTaskList.length > 1 ? 's' : ''} to help schedule.
                  </p>
              }
              </div> :

            chatHistory.map((msg) =>
            <div data-style-id="stylo-710" id="el-384"
            key={msg.id}
            className={cn(
              'p-3 rounded-lg text-sm',
              msg.role === 'user' ?
              'bg-primary text-primary-foreground ml-4' :
              'bg-muted mr-4'
            )}>

                  {msg.content}
                </div>
            )
            }
            {isLoading &&
            <div data-style-id="stylo-711" id="el-385" className="flex items-center gap-2 text-muted-foreground p-3">
                <Loader2 data-style-id="stylo-712" className="h-4 w-4 animate-spin" />
                <span data-style-id="stylo-713" id="el-386" className="text-sm">Thinking...</span>
              </div>
            }
          </div>
        </ScrollArea>

        {/* Input */}
        <form data-style-id="stylo-714" id="el-387" onSubmit={handleSubmit} className="flex gap-2 mt-3 flex-shrink-0">
          <Input data-style-id="stylo-715"
          placeholder="Ask about your day..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1" />

          <Button data-style-id="stylo-716" type="submit" size="icon" disabled={!message.trim() || isLoading}>
            <Send data-style-id="stylo-717" className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>);

}
````

## File: src/components/today/ai-recommend-button.tsx
````typescript
'use client';

import { useState } from 'react';
import { useToday, getCurrentMinute } from '@/context/today-context';
import { useProjects } from '@/context/project-context';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sparkles, Loader2, Plus, X } from 'lucide-react';
import { handleTodayRecommend } from '@/lib/actions';
import { cn } from '@/lib/utils';

type Recommendation = {
  title: string;
  suggestedStartMinute: number;
  suggestedDurationMinutes: number;
  reasoning: string;
  sourceType: 'project' | 'casual' | 'new';
  sourceId?: string;
};

export function AIRecommendButton() {
  const { items, addItem, isChatOpen, aiTaskList } = useToday();
  const { projects } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [summary, setSummary] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendations([]);
    setSummary('');

    try {
      const result = await handleTodayRecommend({
        currentSchedule: items.map((i) => ({
          title: i.title,
          startMinute: i.startMinute,
          durationMinutes: i.durationMinutes,
          completed: i.completed
        })),
        availableProjects: projects.map((p) => ({
          name: p.name,
          deadline: p.deadline,
          importance: p.importance,
          tasks: p.tasks.map((t) => ({ title: t.title, completed: t.completed }))
        })),
        casualTasks: [], // TODO: Add casual tasks
        currentTimeMinute: getCurrentMinute(),
        aiTaskList: aiTaskList.map((t) => ({ title: t.title }))
      });

      if (result.success && result.data) {
        setRecommendations(result.data.recommendations || []);
        setSummary(result.data.overallSuggestion || '');
      }
    } catch (error) {
      console.error('[recommend] Error:', error);
      setSummary('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecommendation = (rec: Recommendation) => {
    addItem({
      title: rec.title,
      startMinute: rec.suggestedStartMinute,
      durationMinutes: rec.suggestedDurationMinutes,
      source: rec.sourceType === 'project' && rec.sourceId ?
      { type: 'project', projectId: rec.sourceId } :
      { type: 'manual' },
      completed: false
    });

    // Remove from recommendations
    setRecommendations((prev) => prev.filter((r) => r.title !== rec.title));
  };

  const formatTime = (minute: number) => {
    const hours = Math.floor(minute / 60);
    const mins = minute % 60;
    const displayHour = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  // Don't show if chat is open (to avoid cluttering)
  if (isChatOpen) return null;

  return (
    <Popover data-style-id="stylo-718" open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger data-style-id="stylo-719" asChild>
        <Button data-style-id="stylo-720"
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
        onClick={() => {
          setIsOpen(true);
          if (recommendations.length === 0 && !isLoading) {
            handleGetRecommendations();
          }
        }}>

          {isLoading ?
          <Loader2 data-style-id="stylo-721" className="h-6 w-6 animate-spin" /> :

          <Sparkles data-style-id="stylo-722" className="h-6 w-6" />
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent data-style-id="stylo-723"
      side="top"
      align="end"
      className="w-80 p-0"
      sideOffset={8}>

        <div data-style-id="stylo-724" id="el-388" className="p-4 border-b">
          <div data-style-id="stylo-725" id="el-389" className="flex items-center justify-between">
            <h3 data-style-id="stylo-726" id="el-390" className="font-semibold flex items-center gap-2">
              <Sparkles data-style-id="stylo-727" className="h-4 w-4" />
              AI Recommendations
            </h3>
            <Button data-style-id="stylo-728"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}>

              <X data-style-id="stylo-729" className="h-4 w-4" />
            </Button>
          </div>
          {summary &&
          <p data-style-id="stylo-730" id="el-391" className="text-sm text-muted-foreground mt-2">{summary}</p>
          }
        </div>

        <div data-style-id="stylo-731" id="el-392" className="max-h-[300px] overflow-y-auto">
          {isLoading ?
          <div data-style-id="stylo-732" id="el-393" className="flex items-center justify-center py-8">
              <Loader2 data-style-id="stylo-733" className="h-6 w-6 animate-spin text-muted-foreground" />
            </div> :
          recommendations.length === 0 ?
          <div data-style-id="stylo-734" id="el-394" className="text-center py-8 text-muted-foreground">
              <p data-style-id="stylo-735" id="el-395" className="text-sm">No recommendations available.</p>
              <Button data-style-id="stylo-736"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleGetRecommendations}>

                Try Again
              </Button>
            </div> :

          <div data-style-id="stylo-737" id="el-396" className="divide-y">
              {recommendations.map((rec, index) =>
            <div data-style-id="stylo-738" id="el-397" key={index} className="p-3 hover:bg-muted/50 transition-colors">
                  <div data-style-id="stylo-739" id="el-398" className="flex items-start justify-between gap-2">
                    <div data-style-id="stylo-740" id="el-399" className="flex-1 min-w-0">
                      <div data-style-id="stylo-741" id="el-400" className="font-medium text-sm truncate">{rec.title}</div>
                      <div data-style-id="stylo-742" id="el-401" className="text-xs text-muted-foreground">
                        {formatTime(rec.suggestedStartMinute)} ({rec.suggestedDurationMinutes} min)
                      </div>
                      <p data-style-id="stylo-743" id="el-402" className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {rec.reasoning}
                      </p>
                    </div>
                    <Button data-style-id="stylo-744"
                size="icon"
                variant="ghost"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => handleAddRecommendation(rec)}>

                      <Plus data-style-id="stylo-745" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
            )}
            </div>
          }
        </div>

        <div data-style-id="stylo-746" id="el-403" className="p-3 border-t">
          <Button data-style-id="stylo-747"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleGetRecommendations}
          disabled={isLoading}>

            {isLoading ? 'Loading...' : 'Refresh Recommendations'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>);

}
````

## File: src/components/today/date-navigator.tsx
````typescript
'use client';

import { useToday, getTodayDateString } from '@/context/today-context';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';

export function DateNavigator() {
  const { currentDate, setCurrentDate, goToToday, isToday } = useToday();

  const parsedDate = parseISO(currentDate);
  const displayDate = format(parsedDate, 'EEEE, MMMM d, yyyy');

  const navigateDay = (offset: number) => {
    const newDate = addDays(parsedDate, offset);
    setCurrentDate(format(newDate, 'yyyy-MM-dd'));
  };

  return (
    <div data-style-id="stylo-748" id="el-404" className="flex items-center gap-2">
      <Button data-style-id="stylo-749"
      variant="ghost"
      size="icon"
      onClick={() => navigateDay(-1)}
      title="Previous day">

        <ChevronLeft data-style-id="stylo-750" className="h-4 w-4" />
      </Button>

      <div data-style-id="stylo-751" id="el-405" className="flex items-center gap-2 min-w-[200px] justify-center">
        <Calendar data-style-id="stylo-752" className="h-4 w-4 text-muted-foreground" />
        <span data-style-id="stylo-753" id="el-406" className="text-sm font-medium">{displayDate}</span>
      </div>

      <Button data-style-id="stylo-754"
      variant="ghost"
      size="icon"
      onClick={() => navigateDay(1)}
      title="Next day">

        <ChevronRight data-style-id="stylo-755" className="h-4 w-4" />
      </Button>

      {!isToday &&
      <Button data-style-id="stylo-756"
      variant="outline"
      size="sm"
      onClick={goToToday}
      className="ml-2">

          Today
        </Button>
      }
    </div>);

}
````

## File: src/components/today/item-source-picker.tsx
````typescript
'use client';

import { useState, useMemo } from 'react';
import { useToday, getCurrentMinute } from '@/context/today-context';
import { useProjects } from '@/context/project-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import type { Task } from '@/lib/types';

interface ItemSourcePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SelectableTask = Task & {
  projectId?: string;
  projectName?: string;
  sourceType: 'project' | 'casual';
};

export function ItemSourcePicker({ open, onOpenChange }: ItemSourcePickerProps) {
  const { addItem, items } = useToday();
  const { projects } = useProjects();
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Get all uncompleted tasks from projects
  const projectTasks = useMemo(() => {
    const tasks: SelectableTask[] = [];
    for (const project of projects) {
      for (const task of project.tasks) {
        if (!task.completed) {
          tasks.push({
            ...task,
            projectId: project.id,
            projectName: project.name,
            sourceType: 'project'
          });
        }
      }
    }
    return tasks;
  }, [projects]);

  // Filter tasks by search
  const filteredProjectTasks = useMemo(() => {
    if (!search.trim()) return projectTasks;
    const lower = search.toLowerCase();
    return projectTasks.filter(
      (t) => t.title.toLowerCase().includes(lower) ||
      t.projectName?.toLowerCase().includes(lower)
    );
  }, [projectTasks, search]);

  // Find next available start time
  const getNextAvailableStart = (): number => {
    const currentMinute = getCurrentMinute();

    if (items.length === 0) {
      return Math.ceil(currentMinute / 15) * 15;
    }

    const sortedItems = [...items].sort((a, b) => a.startMinute - b.startMinute);
    const lastItem = sortedItems[sortedItems.length - 1];
    const lastEndTime = lastItem.startMinute + lastItem.durationMinutes;

    const startAfter = Math.max(currentMinute, lastEndTime);
    return Math.ceil(startAfter / 15) * 15;
  };

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleAddSelected = () => {
    let startMinute = getNextAvailableStart();

    // Add all selected tasks
    for (const task of filteredProjectTasks) {
      if (selectedIds.has(task.id)) {
        addItem({
          title: task.title,
          startMinute,
          durationMinutes: 60, // Default 1 hour
          source: task.sourceType === 'project' ?
          { type: 'project', projectId: task.projectId!, taskId: task.id } :
          { type: 'casual', taskId: task.id },
          completed: false
        });
        startMinute += 60; // Stack items
      }
    }

    setSelectedIds(new Set());
    setSearch('');
    onOpenChange(false);
  };

  return (
    <Dialog data-style-id="stylo-757" open={open} onOpenChange={onOpenChange}>
      <DialogContent data-style-id="stylo-758" className="sm:max-w-lg">
        <DialogHeader data-style-id="stylo-759">
          <DialogTitle data-style-id="stylo-760">Add from Existing Tasks</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div data-style-id="stylo-761" id="el-407" className="relative">
          <Search data-style-id="stylo-762" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input data-style-id="stylo-763"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9" />

        </div>

        <Tabs data-style-id="stylo-764" defaultValue="projects" className="flex-1">
          <TabsList data-style-id="stylo-765" className="grid w-full grid-cols-2">
            <TabsTrigger data-style-id="stylo-766" value="projects">From Projects</TabsTrigger>
            <TabsTrigger data-style-id="stylo-767" value="casual" disabled>Casual Tasks</TabsTrigger>
          </TabsList>

          <TabsContent data-style-id="stylo-768" value="projects" className="mt-4">
            <ScrollArea data-style-id="stylo-769" className="h-[300px] pr-4">
              {filteredProjectTasks.length === 0 ?
              <p data-style-id="stylo-770" id="el-408" className="text-center text-muted-foreground py-8">
                  No uncompleted tasks found
                </p> :

              <div data-style-id="stylo-771" id="el-409" className="space-y-2">
                  {filteredProjectTasks.map((task) =>
                <div data-style-id="stylo-772" id="el-410"
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toggleSelection(task.id)}>

                      <Checkbox data-style-id="stylo-773"
                  checked={selectedIds.has(task.id)}
                  onCheckedChange={() => toggleSelection(task.id)} />

                      <div data-style-id="stylo-774" id="el-411" className="flex-1 min-w-0">
                        <div data-style-id="stylo-775" id="el-412" className="font-medium text-sm truncate">
                          {task.title}
                        </div>
                        <div data-style-id="stylo-776" id="el-413" className="text-xs text-muted-foreground">
                          {task.projectName}
                        </div>
                      </div>
                    </div>
                )}
                </div>
              }
            </ScrollArea>
          </TabsContent>

          <TabsContent data-style-id="stylo-777" value="casual">
            <p data-style-id="stylo-778" id="el-414" className="text-center text-muted-foreground py-8">
              Casual task import coming soon
            </p>
          </TabsContent>
        </Tabs>

        <DialogFooter data-style-id="stylo-779">
          <Button data-style-id="stylo-780" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button data-style-id="stylo-781"
          onClick={handleAddSelected}
          disabled={selectedIds.size === 0}>

            Add {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

}
````

## File: src/components/today/quick-entry-panel.tsx
````typescript
'use client';

import { useState } from 'react';
import { useToday, getCurrentMinute } from '@/context/today-context';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, ListTodo, MessageSquarePlus } from 'lucide-react';
import { ItemSourcePicker } from './item-source-picker';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const DEFAULT_DURATION = 30; // minutes - user can resize on timeline

export function QuickEntryPanel() {
  const { addItem, addAITask, items } = useToday();
  const [title, setTitle] = useState('');
  const [showSourcePicker, setShowSourcePicker] = useState(false);

  // Find the next available time slot (after the last item or current time)
  const getNextAvailableStart = (): number => {
    const currentMinute = getCurrentMinute();

    if (items.length === 0) {
      // Round up to next 15-minute mark
      return Math.ceil(currentMinute / 15) * 15;
    }

    // Find the end of the last scheduled item
    const sortedItems = [...items].sort((a, b) => a.startMinute - b.startMinute);
    const lastItem = sortedItems[sortedItems.length - 1];
    const lastEndTime = lastItem.startMinute + lastItem.durationMinutes;

    // Use whichever is later: current time or last item end
    const startAfter = Math.max(currentMinute, lastEndTime);
    return Math.ceil(startAfter / 15) * 15;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const startMinute = getNextAvailableStart();

    addItem({
      title: title.trim(),
      startMinute,
      durationMinutes: DEFAULT_DURATION,
      source: { type: 'manual' },
      completed: false
    });

    setTitle('');
  };

  const handleAddToAI = () => {
    if (!title.trim()) return;
    addAITask(title.trim(), { type: 'manual' });
    setTitle('');
  };

  return (
    <>
      <Card data-style-id="stylo-782" className="today-entry-card">
        <CardContent data-style-id="stylo-783" className="pt-4">
          <TooltipProvider data-style-id="stylo-784">
            <form data-style-id="stylo-785" id="el-415" onSubmit={handleSubmit} className="flex gap-2 items-center">
              <Tooltip data-style-id="stylo-786">
                <TooltipTrigger data-style-id="stylo-787" asChild>
                  <Button data-style-id="stylo-788"
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSourcePicker(true)}>

                    <ListTodo data-style-id="stylo-789" className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent data-style-id="stylo-790">Pull from existing tasks</TooltipContent>
              </Tooltip>
              <Input data-style-id="stylo-791"
              placeholder="What's on your plate today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1" />

              <Tooltip data-style-id="stylo-792">
                <TooltipTrigger data-style-id="stylo-793" asChild>
                  <Button data-style-id="stylo-794" type="submit" size="icon" disabled={!title.trim()}>
                    <Plus data-style-id="stylo-795" className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent data-style-id="stylo-796">Add to schedule</TooltipContent>
              </Tooltip>
              <Tooltip data-style-id="stylo-797">
                <TooltipTrigger data-style-id="stylo-798" asChild>
                  <Button data-style-id="stylo-799"
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddToAI}
                  disabled={!title.trim()}>

                    <MessageSquarePlus data-style-id="stylo-800" className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent data-style-id="stylo-801">Add to AI task list</TooltipContent>
              </Tooltip>
            </form>
          </TooltipProvider>
        </CardContent>
      </Card>

      <ItemSourcePicker data-style-id="stylo-802"
      open={showSourcePicker}
      onOpenChange={setShowSourcePicker} />

    </>);

}
````

## File: src/components/today/timeline-item.tsx
````typescript
'use client';

import { useState, useRef, useCallback } from 'react';
import { useToday } from '@/context/today-context';
import type { TodayItem } from '@/lib/types';
import { minuteToPixel, pixelToMinute } from './timeline-view';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

const PIXELS_PER_HOUR = 64;
const MIN_DURATION = 15; // minutes

interface TimelineItemProps {
  item: TodayItem;
}

export function TimelineItem({ item }: TimelineItemProps) {
  const { updateItem, deleteItem, toggleItemComplete } = useToday();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragState, setDragState] = useState({ startY: 0, startMinute: 0 });
  const [resizeState, setResizeState] = useState({ startY: 0, startDuration: 0 });

  const top = minuteToPixel(item.startMinute);
  const height = item.durationMinutes / 60 * PIXELS_PER_HOUR;

  // Format time for display
  const formatTime = (minute: number) => {
    const hours = Math.floor(minute / 60);
    const mins = minute % 60;
    const displayHour = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  const startTime = formatTime(item.startMinute);
  const endTime = formatTime(item.startMinute + item.durationMinutes);

  // Drag handlers
  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (isResizing) return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragState({
      startY: e.clientY,
      startMinute: item.startMinute
    });
  }, [item.startMinute, isResizing]);

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaY = e.clientY - dragState.startY;
    const deltaMinutes = Math.round(deltaY / PIXELS_PER_HOUR * 60 / 15) * 15;
    const newStartMinute = Math.max(0, Math.min(1440 - item.durationMinutes, dragState.startMinute + deltaMinutes));

    if (newStartMinute !== item.startMinute) {
      updateItem({ ...item, startMinute: newStartMinute });
    }
  }, [isDragging, dragState, item, updateItem]);

  const handleDragEnd = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }, [isDragging]);

  // Resize handlers (bottom edge)
  const handleResizeStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsResizing(true);
    setResizeState({
      startY: e.clientY,
      startDuration: item.durationMinutes
    });
  }, [item.durationMinutes]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!isResizing) return;
    e.preventDefault();

    const deltaY = e.clientY - resizeState.startY;
    const deltaMinutes = Math.round(deltaY / PIXELS_PER_HOUR * 60 / 15) * 15;
    const newDuration = Math.max(MIN_DURATION, resizeState.startDuration + deltaMinutes);

    if (newDuration !== item.durationMinutes) {
      updateItem({ ...item, durationMinutes: newDuration });
    }
  }, [isResizing, resizeState, item, updateItem]);

  const handleResizeEnd = useCallback((e: React.PointerEvent) => {
    if (!isResizing) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsResizing(false);
  }, [isResizing]);

  // Get source indicator color
  const getSourceColor = () => {
    if (item.color) return item.color;
    switch (item.source.type) {
      case 'project':return 'hsl(var(--primary))';
      case 'casual':return 'hsl(var(--secondary))';
      default:return 'hsl(var(--muted-foreground))';
    }
  };

  return (
    <div data-style-id="stylo-803" id="el-416"
    ref={itemRef}
    className={cn(
      'today-time-block absolute left-0 right-0 rounded-lg border p-2 group transition-shadow',
      isDragging && 'shadow-xl z-30 opacity-90',
      isResizing && 'z-30',
      item.completed && 'opacity-50'
    )}
    style={{
      top,
      height: Math.max(height, 24),
      borderLeftWidth: 3,
      borderLeftColor: getSourceColor(),
      background: item.completed ?
      'linear-gradient(to bottom, hsla(210, 20%, 25%, 0.3), hsla(210, 20%, 20%, 0.2))' :
      'linear-gradient(to bottom, hsla(165, 100%, 45%, 0.15), hsla(165, 100%, 35%, 0.08))'
    }}>

      {/* Drag handle */}
      <div data-style-id="stylo-804" id="el-417"
      className="absolute left-0 top-0 bottom-0 w-6 cursor-grab active:cursor-grabbing flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity"
      onPointerDown={handleDragStart}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
      onPointerCancel={handleDragEnd}>

        <GripVertical data-style-id="stylo-805" className="h-4 w-4" />
      </div>

      {/* Content */}
      <div data-style-id="stylo-806" id="el-418" className="flex items-start gap-2 pl-5 pr-8">
        <Checkbox data-style-id="stylo-807"
        checked={item.completed}
        onCheckedChange={() => toggleItemComplete(item.id)}
        className="mt-0.5" />

        <div data-style-id="stylo-808" id="el-419" className="flex-1 min-w-0">
          <div data-style-id="stylo-809" id="el-420" className={cn(
            'font-medium text-sm truncate',
            item.completed && 'line-through text-muted-foreground'
          )}>
            {item.title}
          </div>
          <div data-style-id="stylo-810" id="el-421" className="text-xs text-muted-foreground">
            {startTime} - {endTime}
          </div>
        </div>
      </div>

      {/* Delete button */}
      <Button data-style-id="stylo-811"
      variant="ghost"
      size="icon"
      className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      onClick={() => deleteItem(item.id)}>

        <Trash2 data-style-id="stylo-812" className="h-3 w-3" />
      </Button>

      {/* Resize handle (bottom) */}
      <div data-style-id="stylo-813" id="el-422"
      className="absolute left-2 right-2 bottom-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity"
      onPointerDown={handleResizeStart}
      onPointerMove={handleResizeMove}
      onPointerUp={handleResizeEnd}
      onPointerCancel={handleResizeEnd}>

        <div data-style-id="stylo-814" id="el-423" className="w-8 h-1 bg-muted-foreground/50 rounded mx-auto mt-0.5" />
      </div>
    </div>);

}
````

## File: src/components/today/timeline-view.tsx
````typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { useToday, getCurrentMinute } from '@/context/today-context';
import { Card, CardContent } from '@/components/ui/card';
import { TimelineItem } from './timeline-item';
import { cn } from '@/lib/utils';

// Timeline configuration
const START_HOUR = 6; // 6 AM
const END_HOUR = 23; // 11 PM
const PIXELS_PER_HOUR = 64;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const TIMELINE_HEIGHT = TOTAL_HOURS * PIXELS_PER_HOUR;

// Convert minute to pixel position
export function minuteToPixel(minute: number): number {
  const adjustedMinute = minute - START_HOUR * 60;
  return adjustedMinute / 60 * PIXELS_PER_HOUR;
}

// Convert pixel position to minute
export function pixelToMinute(pixel: number): number {
  const minute = pixel / PIXELS_PER_HOUR * 60 + START_HOUR * 60;
  // Snap to 15-minute intervals
  return Math.round(minute / 15) * 15;
}

export function TimelineView() {
  const { items, isLoading, isToday } = useToday();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(null);

  // Update current time indicator
  useEffect(() => {
    const updateCurrentTime = () => {
      if (isToday) {
        const minute = getCurrentMinute();
        if (minute >= START_HOUR * 60 && minute <= END_HOUR * 60) {
          setCurrentTimePosition(minuteToPixel(minute));
        } else {
          setCurrentTimePosition(null);
        }
      } else {
        setCurrentTimePosition(null);
      }
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [isToday]);

  // Scroll to current time on mount
  useEffect(() => {
    if (containerRef.current && currentTimePosition !== null) {
      const scrollTo = Math.max(0, currentTimePosition - 100);
      containerRef.current.scrollTop = scrollTo;
    }
  }, [currentTimePosition]);

  // Generate hour markers
  const hourMarkers = [];
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const displayHour = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    hourMarkers.push(
      <div data-style-id="stylo-815" id="el-424"
      key={hour}
      className="today-hour-marker absolute left-0 right-0 flex items-start"
      style={{ top: (hour - START_HOUR) * PIXELS_PER_HOUR }}>

        <span data-style-id="stylo-816" id="el-425" className="w-16 text-xs text-muted-foreground pr-2 text-right flex-shrink-0">
          {displayHour} {ampm}
        </span>
        <div data-style-id="stylo-817" id="el-426" className="flex-1 border-t border-border/30 mt-2" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card data-style-id="stylo-818" className="today-timeline-card flex-1">
        <CardContent data-style-id="stylo-819" className="p-4">
          <div data-style-id="stylo-820" id="el-427" className="animate-pulse space-y-4">
            <div data-style-id="stylo-821" id="el-428" className="h-8 bg-muted rounded" />
            <div data-style-id="stylo-822" id="el-429" className="h-64 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>);

  }

  return (
    <Card data-style-id="stylo-823" className="today-timeline-card flex-1 overflow-hidden">
      <CardContent data-style-id="stylo-824" className="p-0">
        <div data-style-id="stylo-825" id="el-430"
        ref={containerRef}
        className="today-timeline-scroll overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 320px)' }}>

          <div data-style-id="stylo-826" id="el-431"
          className="today-timeline relative ml-16"
          style={{ height: TIMELINE_HEIGHT, minHeight: TIMELINE_HEIGHT }}>

            {/* Hour markers */}
            <div data-style-id="stylo-827" id="el-432" className="absolute inset-0 -ml-16">
              {hourMarkers}
            </div>

            {/* Current time indicator */}
            {currentTimePosition !== null &&
            <div data-style-id="stylo-828" id="el-433"
            className="today-current-time-indicator absolute left-0 right-0 z-20 pointer-events-none"
            style={{ top: currentTimePosition }}>

                <div data-style-id="stylo-829" id="el-434" className="relative">
                  <div data-style-id="stylo-830" id="el-435" className="absolute -left-16 -top-2 w-3 h-3 rounded-full bg-destructive" />
                  <div data-style-id="stylo-831" id="el-436" className="h-0.5 bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                </div>
              </div>
            }

            {/* Schedule items */}
            <div data-style-id="stylo-832" id="el-437" className="absolute inset-0 pr-4">
              {items.map((item) =>
              <TimelineItem data-style-id="stylo-833" key={item.id} item={item} />
              )}
            </div>

            {/* Empty state */}
            {items.length === 0 &&
            <div data-style-id="stylo-834" id="el-438" className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p data-style-id="stylo-835" id="el-439" className="text-center">
                  No items scheduled.<br data-style-id="stylo-836" id="el-440" />
                  <span data-style-id="stylo-837" id="el-441" className="text-sm">Add something above or pull from your tasks.</span>
                </p>
              </div>
            }
          </div>
        </div>
      </CardContent>
    </Card>);

}
````

## File: src/components/today/today-page.tsx
````typescript
'use client';

import { TodayProvider } from '@/context/today-context';
import { QuickEntryPanel } from './quick-entry-panel';
import { TimelineView } from './timeline-view';
import { AIChatPanel } from './ai-chat-panel';
import { AIRecommendButton } from './ai-recommend-button';
import { DateNavigator } from './date-navigator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TodayPageContent() {
  return (
    <TodayProvider data-style-id="stylo-838">
      <div data-style-id="stylo-839" id="el-442" className="today-page flex flex-col gap-4 relative">
        {/* Header with date navigation */}
        <Card data-style-id="stylo-840" className="today-header-card">
          <CardHeader data-style-id="stylo-841" className="pb-2">
            <div data-style-id="stylo-842" id="el-443" className="flex items-center justify-between">
              <div data-style-id="stylo-843" id="el-444">
                <CardTitle data-style-id="stylo-844" className="text-2xl font-headline">Today</CardTitle>
                <CardDescription data-style-id="stylo-845">Plan your day, get AI recommendations</CardDescription>
              </div>
              <DateNavigator data-style-id="stylo-846" />
            </div>
          </CardHeader>
        </Card>

        {/* Main content area */}
        <div data-style-id="stylo-847" id="el-445" className="flex gap-4 flex-1">
          {/* Left column: Entry + Timeline */}
          <div data-style-id="stylo-848" id="el-446" className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Quick entry panel */}
            <QuickEntryPanel data-style-id="stylo-849" />

            {/* Timeline */}
            <TimelineView data-style-id="stylo-850" />
          </div>

          {/* Right column: AI Chat (collapsible) */}
          <AIChatPanel data-style-id="stylo-851" />
        </div>

        {/* Floating AI recommend button */}
        <AIRecommendButton data-style-id="stylo-852" />
      </div>
    </TodayProvider>);

}
````

## File: src/components/theme-provider.tsx
````typescript
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider data-style-id="stylo-666" {...props}>{children}</NextThemesProvider>;
}
````

## File: src/components/theme-toggle.tsx
````typescript
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu data-style-id="stylo-667">
      <DropdownMenuTrigger data-style-id="stylo-668" asChild>
        <Button data-style-id="stylo-669" variant="ghost" size="icon">
          <Sun data-style-id="stylo-670" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon data-style-id="stylo-671" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span data-style-id="stylo-672" id="el-195" className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-style-id="stylo-673" align="end">
        <DropdownMenuItem data-style-id="stylo-674" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem data-style-id="stylo-675" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem data-style-id="stylo-676" onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);

}
````

## File: src/context/today-context.tsx
````typescript
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { TodayItem, DailySchedule, ChatMessage, AITaskItem, TodayItemSource } from '@/lib/types';
import { subscribeDailySchedule, upsertDailySchedule } from '@/lib/persistence';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSettings } from '@/context/settings-context';

const STORAGE_KEY = 'action-deck-today';

// Helper to get today's date as YYYY-MM-DD
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

// Helper to get current time in minutes from midnight
export function getCurrentMinute(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

interface TodayContextType {
  // Current date being viewed
  currentDate: string;
  setCurrentDate: (date: string) => void;
  goToToday: () => void;
  isToday: boolean;

  // Schedule data
  schedule: DailySchedule | null;
  items: TodayItem[];
  isLoading: boolean;

  // Item CRUD
  addItem: (item: Omit<TodayItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (item: TodayItem) => void;
  deleteItem: (itemId: string) => void;
  toggleItemComplete: (itemId: string) => void;

  // Chat
  chatHistory: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;

  // AI Task List - tasks user wants AI help scheduling
  aiTaskList: AITaskItem[];
  addAITask: (title: string, source: TodayItemSource) => void;
  removeAITask: (taskId: string) => void;
  clearAITaskList: () => void;

  // UI state
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

const TodayContext = createContext<TodayContextType | undefined>(undefined);

function createEmptySchedule(date: string): DailySchedule {
  const now = Date.now();
  return {
    id: date,
    date,
    items: [],
    chatHistory: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function TodayProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDateState] = useState<string>(getTodayDateString());
  const [schedule, setSchedule] = useState<DailySchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authedUid, setAuthedUid] = useState<string | null>(null);
  const [isChatOpen, setChatOpen] = useState(false);

  const { settings } = useSettings();
  const canPersist = Boolean(authedUid && settings.enableSync);

  const isToday = currentDate === getTodayDateString();

  // Auth state tracking
  useEffect(() => {
    const auth = getAuth();
    const stopAuth = onAuthStateChanged(auth, (u) => {
      setAuthedUid(u?.uid || null);
    });
    return () => stopAuth();
  }, []);

  // Subscribe to schedule changes
  useEffect(() => {
    let stopSub: (() => void) | undefined;

    if (canPersist) {
      setIsLoading(true);
      stopSub = subscribeDailySchedule(currentDate, (remote) => {
        if (remote) {
          setSchedule(remote);
        } else {
          // No schedule for this date yet - create empty one
          setSchedule(createEmptySchedule(currentDate));
        }
        setIsLoading(false);
      });
    } else {
      // Offline mode: load from localStorage
      try {
        const stored = localStorage.getItem(`${STORAGE_KEY}-${currentDate}`);
        if (stored) {
          setSchedule(JSON.parse(stored));
        } else {
          setSchedule(createEmptySchedule(currentDate));
        }
      } catch (e) {
        console.error('[today] Failed to load from localStorage:', e);
        setSchedule(createEmptySchedule(currentDate));
      }
      setIsLoading(false);
    }

    return () => {
      if (stopSub) stopSub();
    };
  }, [canPersist, currentDate]);

  // Save to localStorage when schedule changes (for offline access)
  useEffect(() => {
    if (schedule) {
      try {
        localStorage.setItem(`${STORAGE_KEY}-${currentDate}`, JSON.stringify(schedule));
      } catch (e) {
        console.error('[today] Failed to save to localStorage:', e);
      }
    }
  }, [schedule, currentDate]);

  // Persist schedule changes
  const persistSchedule = useCallback((updatedSchedule: DailySchedule) => {
    setSchedule(updatedSchedule);
    if (canPersist) {
      upsertDailySchedule(updatedSchedule).catch((e) => {
        console.error('[today] Failed to persist schedule:', e);
      });
    }
  }, [canPersist]);

  const setCurrentDate = useCallback((date: string) => {
    setCurrentDateState(date);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDateState(getTodayDateString());
  }, []);

  const addItem = useCallback((itemData: Omit<TodayItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!schedule) return;

    const now = Date.now();
    const newItem: TodayItem = {
      ...itemData,
      id: `item-${now}`,
      createdAt: now,
      updatedAt: now,
    };

    const updatedSchedule: DailySchedule = {
      ...schedule,
      items: [...schedule.items, newItem],
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const updateItem = useCallback((item: TodayItem) => {
    if (!schedule) return;

    const now = Date.now();
    const updatedSchedule: DailySchedule = {
      ...schedule,
      items: schedule.items.map((i) =>
        i.id === item.id ? { ...item, updatedAt: now } : i
      ),
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const deleteItem = useCallback((itemId: string) => {
    if (!schedule) return;

    const now = Date.now();
    const updatedSchedule: DailySchedule = {
      ...schedule,
      items: schedule.items.filter((i) => i.id !== itemId),
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const toggleItemComplete = useCallback((itemId: string) => {
    if (!schedule) return;

    const now = Date.now();
    const updatedSchedule: DailySchedule = {
      ...schedule,
      items: schedule.items.map((i) =>
        i.id === itemId ? { ...i, completed: !i.completed, updatedAt: now } : i
      ),
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const addChatMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    if (!schedule) return;

    const now = Date.now();
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${now}`,
      timestamp: now,
    };

    const updatedSchedule: DailySchedule = {
      ...schedule,
      chatHistory: [...(schedule.chatHistory || []), newMessage],
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const clearChatHistory = useCallback(() => {
    if (!schedule) return;

    const now = Date.now();
    const updatedSchedule: DailySchedule = {
      ...schedule,
      chatHistory: [],
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const addAITask = useCallback((title: string, source: TodayItemSource) => {
    if (!schedule) return;

    const now = Date.now();
    const newTask: AITaskItem = {
      id: `ai-task-${now}`,
      title,
      source,
      addedAt: now,
    };

    const updatedSchedule: DailySchedule = {
      ...schedule,
      aiTaskList: [...(schedule.aiTaskList || []), newTask],
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const removeAITask = useCallback((taskId: string) => {
    if (!schedule) return;

    const now = Date.now();
    const updatedSchedule: DailySchedule = {
      ...schedule,
      aiTaskList: (schedule.aiTaskList || []).filter((t) => t.id !== taskId),
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const clearAITaskList = useCallback(() => {
    if (!schedule) return;

    const now = Date.now();
    const updatedSchedule: DailySchedule = {
      ...schedule,
      aiTaskList: [],
      updatedAt: now,
    };

    persistSchedule(updatedSchedule);
  }, [schedule, persistSchedule]);

  const items = schedule?.items || [];
  const chatHistory = schedule?.chatHistory || [];
  const aiTaskList = schedule?.aiTaskList || [];

  const value = useMemo<TodayContextType>(() => ({
    currentDate,
    setCurrentDate,
    goToToday,
    isToday,
    schedule,
    items,
    isLoading,
    addItem,
    updateItem,
    deleteItem,
    toggleItemComplete,
    chatHistory,
    addChatMessage,
    clearChatHistory,
    aiTaskList,
    addAITask,
    removeAITask,
    clearAITaskList,
    isChatOpen,
    setChatOpen,
  }), [
    currentDate, setCurrentDate, goToToday, isToday, schedule, items, isLoading,
    addItem, updateItem, deleteItem, toggleItemComplete,
    chatHistory, addChatMessage, clearChatHistory,
    aiTaskList, addAITask, removeAITask, clearAITaskList, isChatOpen
  ]);

  return (
    <TodayContext.Provider value={value}>
      {children}
    </TodayContext.Provider>
  );
}

export function useToday() {
  const context = useContext(TodayContext);
  if (!context) {
    throw new Error('useToday must be used within a TodayProvider');
  }
  return context;
}
````

## File: src/lib/types.ts
````typescript
export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskDeck = {
  id: string;
  title: string;
  tasks: Task[];
  isDeck: true;
}

export type TaskListItem = Task | TaskDeck;

// 8 Distinct Domains for project categorization
export type Domain =
  | 'music'
  | 'poetry'
  | 'theatre'
  | 'theory'
  | 'coding'
  | 'visual-art'
  | 'health'
  | 'home';

// 4-State Project Status workflow
export type ProjectStatus = 'active' | 'paused' | 'done' | 'archived';

// Named Milestones - distinct from flat tasks, representing project phases
export type Milestone = {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  order: number;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  deadline: string; // YYYY-MM-DD
  importance: number; // 1-10
  size: number; // hours
  relevance: string;
  coverImage?: string;
  tasks: Task[];
  // Domain categorization
  domain?: Domain;
  // Project workflow status
  status: ProjectStatus;
  // Freeform tags for filtering
  tags: string[];
  // Named milestones (project phases)
  milestones: Milestone[];
  // Separate freeform notes field
  notes?: string;
  // Manual progress override (0-100), bypasses task-based calculation
  manualProgress?: number;
  // Source file paths for AI-imported projects (many-to-many: project can have multiple sources)
  sourcePaths?: string[];
  // Timestamps for smart merge and display
  updatedAt: number;
  createdAt: number;
};

export type ProjectFormData = Omit<Project, 'id' | 'tasks' | 'milestones' | 'updatedAt' | 'createdAt'>;

// ============================================
// Today Page Types
// ============================================

// Source reference for pulling in existing items
export type TodayItemSource =
  | { type: 'manual' }
  | { type: 'project'; projectId: string; taskId?: string }
  | { type: 'casual'; taskId: string };

// Individual time block on the Today timeline
export type TodayItem = {
  id: string;
  title: string;
  description?: string;
  startMinute: number;      // 0-1440 (minutes from midnight)
  durationMinutes: number;  // e.g., 60 = 1 hour
  color?: string;           // Optional custom color
  source: TodayItemSource;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

// Chat message for AI panel
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

// Task added to AI task list for scheduling assistance
export type AITaskItem = {
  id: string;
  title: string;
  source: TodayItemSource;
  addedAt: number;
};

// A saved daily schedule
export type DailySchedule = {
  id: string;               // Format: YYYY-MM-DD
  date: string;             // ISO date string YYYY-MM-DD
  items: TodayItem[];
  chatHistory?: ChatMessage[];
  aiTaskList?: AITaskItem[]; // Tasks user wants AI help scheduling
  createdAt: number;
  updatedAt: number;
};

// ============================================
// CC Daily Inbox Types
// ============================================

// Raw email document from Firestore inboxDaily collection
export type RawInboxEmail = {
  messageId: string;
  subject: string;
  body: string;
  receivedAt: { _seconds: number; _nanoseconds?: number } | number;
};

// Parsed task from CC "Top of Mind" section
export type InboxTask = {
  id: string;           // Generated from index
  item: string;         // Task description text
  hasDueDate: boolean;  // Whether a specific due date was found
  dueDate: string | null; // Parsed due date string (e.g., "Monday, January 19th")
};

// Parsed daily inbox for a specific date
export type ParsedDailyInbox = {
  date: string;         // MM/DD/YYYY format (from email subject)
  dateISO: string;      // YYYY-MM-DD for sorting/comparison
  tasks: InboxTask[];
  rawEmailId: string;   // Reference to original messageId
  receivedAt: number;   // Timestamp in milliseconds
};
````

## File: src/styles/dashboard.css
````css
/* Editable dashboard styles (no Tailwind required) */

/* Wrapper card */
.dashboard-card {
  background: linear-gradient(to bottom, hsl(180 100% 20%), hsl(210 30% 6%) 40%, hsl(210 30% 3%));
  color: hsl(180 15% 92%);
  border-radius: 16px;
  box-shadow: 0 0 10px hsla(165, 100%, 45%, 0.35);
  border: 1px solid hsla(165, 70%, 35%, 0.4);
}
.dashboard-header {
  color: hsl(170 60% 80%);
}

/* Metric cards */
.dashboard-metrics-card {
  background: linear-gradient(to bottom, rgba(0, 128, 128, 0.18), rgba(0,0,0,0.7));
  border: 1px solid hsla(165, 70%, 40%, 0.35);
  border-radius: 12px;
  box-shadow: inset 0 0 10px hsla(165, 100%, 35%, 0.25);
}

.dashboard-chart-card {
  background: linear-gradient(to bottom, rgba(0, 128, 128, 0.15), rgba(0,0,0,0.75));
  border: 1px solid hsla(165, 70%, 40%, 0.35);
  border-radius: 12px;
}

/* Quick input row */
.dashboard-quick-row {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

@media (min-width: 768px) {
  .dashboard-quick-row { flex-direction: row; align-items: center; }
}

.dashboard-input {
  background: linear-gradient(to bottom, hsla(180, 100%, 25%, 0.35), hsl(210 30% 3%) 36%, hsl(210 30% 3%));
  border: 1px solid hsla(165, 70%, 40%, 0.55);
  color: hsl(165 100% 85%);
}
.dashboard-input::placeholder { color: hsla(190, 90%, 70%, 0.7); }

.dashboard-select { color: hsl(165 100% 85%); }

.dashboard-button-primary {
  background: linear-gradient(to bottom, hsla(165, 100%, 45%, 0.811), hsla(165, 100%, 35%, 0.12));
  border: 1px solid hsla(165, 90%, 55%, 0.45);
  color: hsl(165 100% 80%);
  border-radius: 10px;
  padding: .5rem 1rem;
  backdrop-filter: saturate(140%) blur(2px);
  -webkit-backdrop-filter: saturate(140%) blur(2px);
  box-shadow: 0 0 8px hsla(165, 100%, 45%, 0.35), inset 0 0 8px hsla(165, 100%, 35%, 0.2);
}
.dashboard-button-primary:hover {
  background: linear-gradient(to bottom, hsla(165, 100%, 55%, 0.35), hsla(165, 100%, 35%, 0.2));
}

/* Project toolbar */
.project-toolbar { display: flex; justify-content: end; gap: .5rem; align-items: center; }

.btn-primary-glass {
  background: linear-gradient(to bottom, hsla(165, 100%, 45%, 0.25), hsla(165, 100%, 35%, 0.12));
  border: 1px solid hsla(165, 90%, 55%, 0.45);
  color: hsl(165 100% 80%);
  border-radius: 10px;
}
.btn-outline-glass {
  background: linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.05));
  border: 1px solid hsla(190, 90%, 70%, 0.35);
  color: hsl(190 80% 75%);
  border-radius: 10px;
}

/* Project card */
.project-card {
  border: 1px solid hsla(165, 70%, 40%, 0.35);
  background: linear-gradient(to bottom, rgba(0, 128, 128, 0.12), rgba(0,0,0,0.6));
  box-shadow: inset 0 0 8px hsla(165, 100%, 35%, 0.18);
}

#radix-«R7mmql7» {
  height: 80vh;
  overflow:scroll;
}
#radix-«R7mmql7» button {color:lime;
}
/* Task list */
.task-card { border: 1px solid hsla(165,70%,40%,0.35); background: linear-gradient(to bottom, rgba(0,128,128,0.1), rgba(0,0,0,0.6)); }
.task-input-row { display: flex; gap: .5rem; margin-bottom: 1.5rem; }
.task-item-row { padding: .4rem .6rem; border-radius: 8px; border: 1px solid hsla(165,70%,40%,0.25); }

/* App shell */
.app-header-bar { border-bottom: 1px solid hsla(165,70%,35%,0.4); background: linear-gradient(to bottom, rgba(0,128,128,0.25), rgba(0,0,0,0)); }
.app-sidebar { background: linear-gradient(to bottom, rgba(0,128,128,0.2), rgba(0,0,0,0.7)); border-right: 1px solid hsla(165,70%,35%,0.4); }

/* Modal look */
.modal-panel { background: linear-gradient(to bottom, rgba(0,128,128,0.2), rgba(0,0,0,0.85)); border-left: 1px solid hsla(165,70%,35%,0.4); }
.modal-header { background: linear-gradient(to bottom, rgba(0,128,128,0.25), transparent); }
.modal-footer { background: linear-gradient(to top, rgba(0,128,128,0.15), transparent); }

/* Domain filter bar */
.domain-filter-bar {
  padding: 1rem;
}

/* Status badges */
.status-badge-active { background: hsla(165, 100%, 45%, 0.15); color: hsl(165, 100%, 45%); }
.status-badge-paused { background: hsla(45, 90%, 55%, 0.15); color: hsl(45, 90%, 55%); }
.status-badge-done { background: hsla(210, 70%, 55%, 0.15); color: hsl(210, 70%, 55%); }
.status-badge-archived { background: hsla(210, 10%, 50%, 0.15); color: hsl(210, 10%, 50%); }

/* Progress ring glow */
.progress-ring-glow {
  filter: drop-shadow(0 0 4px currentColor);
}

/* Milestone item */
.milestone-item {
  border: 1px solid hsla(165, 70%, 40%, 0.25);
  background: linear-gradient(to bottom, rgba(0, 128, 128, 0.08), rgba(0,0,0,0.4));
  border-radius: 8px;
  transition: all 0.2s ease;
}
.milestone-item:hover {
  border-color: hsla(165, 70%, 40%, 0.4);
}
.milestone-item.completed {
  background: linear-gradient(to bottom, hsla(165, 100%, 45%, 0.08), rgba(0,0,0,0.4));
  border-color: hsla(165, 100%, 45%, 0.3);
}

/* Domain page header */
.domain-header {
  position: relative;
  overflow: hidden;
}
.domain-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(40px);
  opacity: 0.3;
  z-index: -1;
}

/* Offline indicator */
.offline-indicator {
  background: linear-gradient(to right, hsla(45, 90%, 55%, 0.1), hsla(45, 90%, 55%, 0.05));
  border: 1px solid hsla(45, 90%, 55%, 0.3);
  border-radius: 8px;
}

/* Tag chips */
.tag-chip {
  background: hsla(210, 20%, 30%, 0.5);
  border: 1px solid hsla(210, 20%, 50%, 0.3);
  border-radius: 999px;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}

/* Search bar styling */
.search-bar-container {
  position: relative;
}
.search-bar-container input {
  padding-left: 2.5rem;
}

/* Accordion styling for modal */
[data-state="open"] > .accordion-trigger-icon {
  transform: rotate(180deg);
}

/* Scrollbar styling for domain filter */
.domain-scroll::-webkit-scrollbar {
  height: 6px;
}
.domain-scroll::-webkit-scrollbar-track {
  background: hsla(210, 30%, 10%, 0.5);
  border-radius: 3px;
}
.domain-scroll::-webkit-scrollbar-thumb {
  background: hsla(165, 70%, 40%, 0.5);
  border-radius: 3px;
}
.domain-scroll::-webkit-scrollbar-thumb:hover {
  background: hsla(165, 70%, 40%, 0.7);
}

/* ============================================
   CC Daily Inbox Styles
   ============================================ */

.inbox-task-item {
  transition: all 0.2s ease;
}

.inbox-task-item:hover {
  transform: translateX(2px);
  box-shadow: 0 0 12px hsla(165, 100%, 45%, 0.15);
}

/* Scrollbar styling for inbox task list */
.inbox-scroll::-webkit-scrollbar {
  width: 6px;
}
.inbox-scroll::-webkit-scrollbar-track {
  background: hsla(210, 30%, 10%, 0.5);
  border-radius: 3px;
}
.inbox-scroll::-webkit-scrollbar-thumb {
  background: hsla(165, 70%, 40%, 0.5);
  border-radius: 3px;
}
.inbox-scroll::-webkit-scrollbar-thumb:hover {
  background: hsla(165, 70%, 40%, 0.7);
}
````

## File: src/styles/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Neon teal cyber theme inspired by browzrbase */
  :root {
    --background: 210 30% 15%; /* near-black */

    --card: 210 30% 5%;
    --card-foreground: 180 15% 92%;

    --popover: 210 30% 5%;
    --popover-foreground: 180 15% 92%;

    --primary: 165 100% 45%; /* neon teal */
    --primary-foreground: 210 30% 6%;

    --secondary: 200 70% 45%; /* sky/cyan accents */
    --secondary-foreground: 180 15% 92%;

    --muted: 210 20% 14%;
    --muted-foreground: 190 10% 70%;

    --accent: 315 85% 55%; /* pink/magenta accent */
    --accent-foreground: 180 15% 92%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 180 15% 92%;

    --border: 165 70% 30%; /* teal border */
    --input: 210 20% 18%;
    --ring: 165 100% 45%;

    --radius: 1.2rem;

    --chart-1: 165 100% 45%;
    --chart-2: 200 70% 45%;
    --chart-3: 315 85% 55%;
    --chart-4: 180 5% 96%;
    --chart-5: 210 20% 14%;
  }

  .dark {
    /* same values in dark for consistent neon look */
    --background: 210 30% 2.5%;
    --foreground: 180 15% 92%;
    --card: 210 30% 5%;
    --card-foreground: 180 15% 92%;
    --popover: 210 30% 5%;
    --popover-foreground: 180 15% 92%;
    --primary: 165 100% 45%;
    --primary-foreground: 210 30% 6%;
    --secondary: 200 70% 45%;
    --secondary-foreground: 180 15% 92%;
    --muted: 210 20% 14%;
    --muted-foreground: 190 10% 70%;
    --accent: 315 85% 55%;
    --accent-foreground: 180 15% 92%;
    --destructive: 0 62% 35%;
    --destructive-foreground: 180 15% 92%;
    --border: 165 70% 22%;
    --input: 210 20% 18%;
    --ring: 165 100% 45%;
    --chart-1: 165 100% 45%;
    --chart-2: 210 20% 14%;
    --chart-3: 315 85% 55%;
    --chart-4: 180 15% 92%;
    --chart-5: 210 30% 5%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
header, body > div.flex.min-h-screen.w-full.flex-col > div > header {
  background:linear-gradient(to top, black, rgba(0, 0, 0, 0.743), rgba(0, 128, 128, 0.275));;
  z-index:100000;
  position:fixed;
  top:0;
  padding:10px;
  padding-top:4px;
  padding-bottom:4px;
  left:10%;
  box-shadow:-50vw 0 40px black, 50vw 0 40px black;
  right:10%;
  border-radius:0 0 30px 30px;
  backdrop-filter:blur(5px);
}
@layer components {
  /* Global skin similar to browzrbase window */
  .browzr-skin {
    background: linear-gradient(to bottom, hsl(180 100% 25%), hsl(210 30% 2.5%) 8%, hsl(210 30% 2.5%));
    box-shadow: inset 0 0 30px hsla(165, 100%, 35%, 0.4);
    min-height: 100vh;
    overflow-y: scroll;
  }

  /* Subtle neon edges for cards/containers */
  .neon-surface {
    background: linear-gradient(
      to bottom,
      hsla(180, 100%, 25%, 0.2),
      hsla(210, 30%, 2%, 0.9)
    );
    border: 1px solid hsla(165, 70%, 40%, 0.35);
    border-radius: 16px;
    box-shadow: 0 0 8px hsla(165, 100%, 45%, 0.25) inset;
  }

  .neon-input {
    background: linear-gradient(to bottom, hsla(180, 100%, 25%, 0.35), hsl(210 30% 2.5%) 36%, hsl(210 30% 2.5%));
    border: 1px solid hsla(165, 70%, 40%, 0.55);
    color: hsl(165 100% 75%);
  }

  .neon-glow {
    box-shadow: 0 0 8px hsla(165, 100%, 45%, 0.6), 0 0 16px hsla(190, 90%, 60%, 0.25);
  }

  /* Glassy teal button look */
  .glass-green {
    background: linear-gradient(
      to bottom,
      hsla(165, 100%, 45%, 0.25),
      hsla(165, 100%, 35%, 0.12)
    );
    border: 1px solid hsla(165, 90%, 55%, 0.45);
    color: hsl(165 100% 80%);
    backdrop-filter: saturate(140%) blur(2px);
    -webkit-backdrop-filter: saturate(140%) blur(2px);
    text-shadow: 0 0 6px hsla(165, 100%, 45%, 0.4);
  }
  .glass-green:hover {
    background: linear-gradient(
      to bottom,
      hsla(165, 100%, 55%, 0.35),
      hsla(165, 100%, 35%, 0.2)
    );
    box-shadow: 0 0 10px hsla(165, 100%, 45%, 0.5), inset 0 0 10px hsla(165, 100%, 35%, 0.25);
  }

  .task-deck {
    @apply relative space-y-2;
  }
  
  .task-deck[data-state='collapsed'] {
     @apply min-h-[64px];
  }

  .task-deck[data-state='collapsed'] .task-deck-item {
    @apply transition-all duration-300 ease-in-out;
  }
  
  .task-deck[data-state='collapsed'] .task-deck-item {
    @apply absolute left-0 right-0 top-0 rounded-lg border bg-background shadow-sm;
  }
  
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(1) {
     transform: translateY(0px) translateX(0px);
     z-index: 0;
  }
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(2) {
    transform: translateY(4px) translateX(4px);
    z-index: -1;
  }
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(3) {
    transform: translateY(8px) translateX(8px);
    z-index: -2;
  }
  /* Show only the first 3 stacked cards */
  .task-deck[data-state='collapsed'] .task-deck-item:nth-child(n+4) {
    @apply hidden;
  }
  
  .task-deck[data-state='expanded'] .task-deck-item {
    @apply mb-2;
  }
}

[data-style-id="stylo-524"] {
    height:40px !important;
  }
````

## File: id-mappings.json
````json
{
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center justify-between:67:8": "el-0",
  "src/components/dashboard/dashboard-summary.tsx:div:space-y-1 dashboard-header:68:10": "el-1",
  "src/components/dashboard/dashboard-summary.tsx:h1:text-2xl font-bold tracking-tight:69:12": "el-2",
  "src/components/dashboard/dashboard-summary.tsx:div:grid grid-cols-1 md:grid-cols-3 gap-4:74:6": "el-3",
  "src/components/dashboard/dashboard-summary.tsx:div:md:col-span-1 space-y-4:76:8": "el-4",
  "src/components/dashboard/dashboard-summary.tsx:div:grid grid-cols-3 gap-4:77:10": "el-5",
  "src/components/dashboard/dashboard-summary.tsx:div:md:col-span-2:111:8": "el-6",
  "src/components/dashboard/dashboard-summary.tsx:div:w-full h-full flex items-center justify-center:114:20": "el-7",
  "src/components/dashboard/dashboard-summary.tsx:text:fill-white text-2xl font-bold:125:33": "el-8",
  "src/components/dashboard/dashboard-summary.tsx:div:ml-8 space-y-2 text-sm text-teal-100:136:24": "el-9",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center gap-2:137:28": "el-10",
  "src/components/dashboard/dashboard-summary.tsx:div:h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]:138:32": "el-11",
  "src/components/dashboard/dashboard-summary.tsx:span::139:32": "el-12",
  "src/components/dashboard/dashboard-summary.tsx:div:flex items-center gap-2:141:28": "el-13",
  "src/components/dashboard/dashboard-summary.tsx:div:h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]:142:32": "el-14",
  "src/components/dashboard/dashboard-summary.tsx:span::143:32": "el-15",
  "src/components/dashboard/dashboard-summary.tsx:div:h-[160px] w-full flex items-center justify-center:148:20": "el-16",
  "src/components/dashboard/dashboard-summary.tsx:p::149:24": "el-17",
  "src/components/dashboard/dashboard-summary.tsx:div:dashboard-quick-row:155:6": "el-18",
  "src/components/dashboard/domain-filter-bar.tsx:div:dynamic:22:4": "el-19",
  "src/components/dashboard/domain-filter-bar.tsx:div:flex gap-2 pb-3 px-1:24:8": "el-20",
  "src/components/dashboard/domain-filter-bar.tsx:button:dynamic:26:10": "el-21",
  "src/components/dashboard/domain-filter-bar.tsx:button:dynamic:46:14": "el-22",
  "src/components/dashboard/domain-filter-bar.tsx:div:dynamic:84:4": "el-23",
  "src/components/dashboard/domain-filter-bar.tsx:button:dynamic:90:10": "el-24",
  "src/components/dashboard/domain-filter-bar.tsx:div:dynamic:133:4": "el-25",
  "src/components/dashboard/milestone-list.tsx:div:space-y-4:83:4": "el-26",
  "src/components/dashboard/milestone-list.tsx:div:flex items-center justify-between:84:6": "el-27",
  "src/components/dashboard/milestone-list.tsx:div:flex items-center gap-2:85:8": "el-28",
  "src/components/dashboard/milestone-list.tsx:h3:text-lg font-medium:87:10": "el-29",
  "src/components/dashboard/milestone-list.tsx:span:text-sm text-muted-foreground:89:8": "el-30",
  "src/components/dashboard/milestone-list.tsx:form:flex gap-2:95:8": "el-31",
  "src/components/dashboard/milestone-list.tsx:div:space-y-2:109:6": "el-32",
  "src/components/dashboard/milestone-list.tsx:p:text-sm text-muted-foreground text-center py-4:111:10": "el-33",
  "src/components/dashboard/milestone-list.tsx:div:dynamic:116:12": "el-34",
  "src/components/dashboard/milestone-list.tsx:span:text-xs text-muted-foreground mr-2:138:16": "el-35",
  "src/components/dashboard/milestone-list.tsx:div:flex items-center gap-1:145:16": "el-36",
  "src/components/dashboard/progress-chart.tsx:div:h-[24px] w-full animate-pulse rounded-lg bg-muted:29:15": "el-37",
  "src/components/dashboard/progress-chart.tsx:div::33:8": "el-38",
  "src/components/dashboard/progress-ring.tsx:div:dynamic:26:4": "el-39",
  "src/components/dashboard/progress-ring.tsx:svg:transform -rotate-90:27:6": "el-40",
  "src/components/dashboard/progress-ring.tsx:circle::33:8": "el-41",
  "src/components/dashboard/progress-ring.tsx:circle:transition-all duration-500 ease-out:42:8": "el-42",
  "src/components/dashboard/progress-ring.tsx:span:absolute text-xs font-medium:59:8": "el-43",
  "src/components/dashboard/progress-ring.tsx:div:dynamic:89:4": "el-44",
  "src/components/dashboard/progress-ring.tsx:svg:transform -rotate-90:90:6": "el-45",
  "src/components/dashboard/progress-ring.tsx:circle::96:8": "el-46",
  "src/components/dashboard/progress-ring.tsx:circle:transition-all duration-500 ease-out:105:8": "el-47",
  "src/components/dashboard/progress-ring.tsx:span:absolute text-xs font-bold:122:8": "el-48",
  "src/components/dashboard/project-card.tsx:div:absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0:44:12": "el-49",
  "src/components/dashboard/project-card.tsx:div:absolute inset-0 bg-black/20 transition-opacity duration-300 opacity-100 group-hover:opacity-0:48:12": "el-50",
  "src/components/dashboard/project-card.tsx:div:dynamic:51:8": "el-51",
  "src/components/dashboard/project-card.tsx:div:flex items-center justify-between gap-2 mb-2:54:12": "el-52",
  "src/components/dashboard/project-card.tsx:div:flex items-center justify-between gap-4:72:12": "el-53",
  "src/components/dashboard/project-card.tsx:div:flex-1 space-y-1:73:14": "el-54",
  "src/components/dashboard/project-card.tsx:div:text-xs text-muted-foreground:74:16": "el-55",
  "src/components/dashboard/project-card.tsx:span:animate-pulse:75:41": "el-56",
  "src/components/dashboard/project-card.tsx:div:text-xs text-muted-foreground/70:78:18": "el-57",
  "src/components/dashboard/project-card.tsx:div:text-xs text-muted-foreground:82:16": "el-58",
  "src/components/dashboard/project-card.tsx:span::84:20": "el-59",
  "src/components/dashboard/project-card.tsx:span::86:20": "el-60",
  "src/components/dashboard/project-form.tsx:form:space-y-4 py-4:151:20": "el-61",
  "src/components/dashboard/project-form.tsx:div:grid grid-cols-2 gap-4:166:24": "el-62",
  "src/components/dashboard/project-form.tsx:div:flex items-center gap-2:184:60": "el-63",
  "src/components/dashboard/project-form.tsx:div:flex items-center gap-2:213:56": "el-64",
  "src/components/dashboard/project-form.tsx:div:h-2 w-2 rounded-full:214:60": "el-65",
  "src/components/dashboard/project-form.tsx:span::292:56": "el-66",
  "src/components/dashboard/project-form.tsx:div:grid grid-cols-2 gap-4:315:24": "el-67",
  "src/components/dashboard/project-form.tsx:div:space-y-4 p-4 rounded-lg border border-border/50 bg-muted/20:377:24": "el-68",
  "src/components/dashboard/project-form.tsx:div:space-y-0.5:383:40": "el-69",
  "src/components/dashboard/project-form.tsx:div:flex justify-between items-center:405:44": "el-70",
  "src/components/dashboard/project-list.tsx:div:flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200:90:8": "el-71",
  "src/components/dashboard/project-list.tsx:span:text-sm:94:14": "el-72",
  "src/components/dashboard/project-list.tsx:span:text-sm:101:14": "el-73",
  "src/components/dashboard/project-list.tsx:div:flex gap-2:121:8": "el-74",
  "src/components/dashboard/project-list.tsx:span:h-2 w-2 rounded-full mr-2:148:14": "el-75",
  "src/components/dashboard/project-list.tsx:div:flex items-center gap-2 text-sm text-muted-foreground:165:8": "el-76",
  "src/components/dashboard/project-list.tsx:span::166:10": "el-77",
  "src/components/dashboard/project-list.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:188:8": "el-78",
  "src/components/dashboard/project-list.tsx:h3:text-xl font-semibold text-muted-foreground:189:10": "el-79",
  "src/components/dashboard/project-list.tsx:p:text-muted-foreground mt-2:190:10": "el-80",
  "src/components/dashboard/project-list.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:198:8": "el-81",
  "src/components/dashboard/project-list.tsx:h3:text-xl font-semibold text-muted-foreground:199:10": "el-82",
  "src/components/dashboard/project-list.tsx:p:text-muted-foreground mt-2:200:10": "el-83",
  "src/components/dashboard/project-list.tsx:div:fixed bottom-0 left-0 right-0 sm:left-14 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-4 px-4 z-20:209:6": "el-84",
  "src/components/dashboard/project-list.tsx:div:h-20:217:6": "el-85",
  "src/components/dashboard/project-modal.tsx:div:flex items-center gap-2 mb-2:117:12": "el-86",
  "src/components/dashboard/project-modal.tsx:div:flex flex-wrap gap-2 pt-2:127:12": "el-87",
  "src/components/dashboard/project-modal.tsx:div:pt-3:140:12": "el-88",
  "src/components/dashboard/project-modal.tsx:div:flex-grow overflow-y-auto p-6 space-y-6:149:10": "el-89",
  "src/components/dashboard/project-modal.tsx:div:flex items-center justify-between:151:12": "el-90",
  "src/components/dashboard/project-modal.tsx:div::152:14": "el-91",
  "src/components/dashboard/project-modal.tsx:div:flex justify-between items-center text-sm text-muted-foreground mb-2:153:16": "el-92",
  "src/components/dashboard/project-modal.tsx:h3:text-lg font-medium text-foreground:154:18": "el-93",
  "src/components/dashboard/project-modal.tsx:span:text-sm text-muted-foreground:157:18": "el-94",
  "src/components/dashboard/project-modal.tsx:span:text-sm text-muted-foreground:159:18": "el-95",
  "src/components/dashboard/project-modal.tsx:div:space-y-2:173:14": "el-96",
  "src/components/dashboard/project-modal.tsx:div::188:12": "el-97",
  "src/components/dashboard/project-modal.tsx:form:flex gap-2 mb-3:219:18": "el-98",
  "src/components/dashboard/project-modal.tsx:div:space-y-2 max-h-[300px] overflow-y-auto:227:18": "el-99",
  "src/components/dashboard/project-modal.tsx:p:text-sm text-muted-foreground text-center py-4:229:22": "el-100",
  "src/components/dashboard/project-modal.tsx:div:flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50:234:24": "el-101",
  "src/components/dashboard/project-modal.tsx:div:flex items-center gap-2:256:18": "el-102",
  "src/components/dashboard/project-modal.tsx:p:text-xs text-muted-foreground mt-1:273:20": "el-103",
  "src/components/dashboard/search-bar.tsx:button:absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors:59:8": "el-104",
  "src/components/dashboard/status-select.tsx:div:flex items-center gap-2:37:10": "el-105",
  "src/components/dashboard/status-select.tsx:span::39:12": "el-106",
  "src/components/dashboard/status-select.tsx:div:flex items-center gap-2:49:14": "el-107",
  "src/components/dashboard/status-select.tsx:span::51:16": "el-108",
  "src/components/dashboard/status-select.tsx:div:dynamic:75:4": "el-109",
  "src/components/dashboard/status-select.tsx:div:dynamic:99:4": "el-110",
  "src/components/dashboard/status-select.tsx:button:dynamic:106:10": "el-111",
  "src/components/dashboard/tags-input.tsx:div:dynamic:76:4": "el-112",
  "src/components/dashboard/tags-input.tsx:div:flex flex-wrap gap-2:78:6": "el-113",
  "src/components/dashboard/tags-input.tsx:button:ml-1 hover:text-destructive transition-colors:87:14": "el-114",
  "src/components/dashboard/tags-input.tsx:div:relative:101:8": "el-115",
  "src/components/dashboard/tags-input.tsx:div:absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-auto:118:12": "el-116",
  "src/components/dashboard/tags-input.tsx:button:w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2:120:16": "el-117",
  "src/components/dashboard/tags-input.tsx:p:text-xs text-muted-foreground:136:8": "el-118",
  "src/components/dashboard/tags-input.tsx:div:dynamic:158:4": "el-119",
  "src/components/dashboard/tags-input.tsx:span:px-2 py-0.5 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50:160:8": "el-120",
  "src/components/dashboard/tags-input.tsx:span:px-2 py-0.5 text-xs rounded-full bg-muted/30 text-muted-foreground:168:8": "el-121",
  "src/components/icons/logo.tsx:svg::3:6": "el-122",
  "src/components/icons/logo.tsx:path::9:8": "el-123",
  "src/components/icons/logo.tsx:path::14:8": "el-124",
  "src/components/icons/logo.tsx:path::20:8": "el-125",
  "src/components/layout/app-sidebar.tsx:span:sr-only:40:10": "el-126",
  "src/components/layout/app-sidebar.tsx:span:sr-only:58:20": "el-127",
  "src/components/layout/app-sidebar.tsx:span:sr-only:78:18": "el-128",
  "src/components/layout/app-sidebar.tsx:span:sr-only:110:24": "el-129",
  "src/components/layout/header.tsx:span:sr-only:32:12": "el-130",
  "src/components/layout/header.tsx:nav:grid gap-6 text-lg font-medium:37:10": "el-131",
  "src/components/layout/header.tsx:div:bg-primary rounded-full p-2:42:14": "el-132",
  "src/components/layout/header.tsx:span:font-headline text-xl text-primary:45:14": "el-133",
  "src/components/layout/header.tsx:button:text-left flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground:60:12": "el-134",
  "src/components/layout/header.tsx:div:relative ml-auto flex items-center gap-2:85:6": "el-135",
  "src/components/layout/settings-modal.tsx:div:grid md:grid-cols-2 gap-6:116:8": "el-136",
  "src/components/layout/settings-modal.tsx:div:space-y-3:117:10": "el-137",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:118:12": "el-138",
  "src/components/layout/settings-modal.tsx:div:space-y-2:120:14": "el-139",
  "src/components/layout/settings-modal.tsx:div:text-sm text-muted-foreground:121:16": "el-140",
  "src/components/layout/settings-modal.tsx:form:space-y-2:125:14": "el-141",
  "src/components/layout/settings-modal.tsx:div:text-sm text-destructive:128:26": "el-142",
  "src/components/layout/settings-modal.tsx:div:flex gap-2:129:16": "el-143",
  "src/components/layout/settings-modal.tsx:div:space-y-4 pt-4:138:12": "el-144",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:139:14": "el-145",
  "src/components/layout/settings-modal.tsx:div:flex items-start justify-between gap-4:140:14": "el-146",
  "src/components/layout/settings-modal.tsx:div:text-sm:141:16": "el-147",
  "src/components/layout/settings-modal.tsx:p:text-muted-foreground:143:18": "el-148",
  "src/components/layout/settings-modal.tsx:div:flex items-start justify-between gap-4:147:14": "el-149",
  "src/components/layout/settings-modal.tsx:div:text-sm:148:16": "el-150",
  "src/components/layout/settings-modal.tsx:p:text-muted-foreground:150:18": "el-151",
  "src/components/layout/settings-modal.tsx:div:space-y-3:157:10": "el-152",
  "src/components/layout/settings-modal.tsx:div:flex items-center justify-between:158:12": "el-153",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:159:14": "el-154",
  "src/components/layout/settings-modal.tsx:div:space-y-2 mt-6:166:8": "el-155",
  "src/components/layout/settings-modal.tsx:div:text-sm font-medium:167:10": "el-156",
  "src/components/layout/settings-modal.tsx:div:flex gap-2 justify-end:169:10": "el-157",
  "src/components/prioritize/prioritization-form.tsx:div:grid md:grid-cols-2 gap-8 items-start:65:8": "el-158",
  "src/components/prioritize/prioritization-form.tsx:div:mb-4:79:40": "el-159",
  "src/components/prioritize/prioritization-result.tsx:div:dynamic:16:8": "el-160",
  "src/components/prioritize/prioritization-result.tsx:h3:font-semibold text-lg mt-4 border-b pb-1:19:27": "el-161",
  "src/components/prioritize/prioritization-result.tsx:p:font-bold:22:27": "el-162",
  "src/components/prioritize/prioritization-result.tsx:div:flex gap-2:25:28": "el-163",
  "src/components/prioritize/prioritization-result.tsx:span:text-muted-foreground:25:64": "el-164",
  "src/components/prioritize/prioritization-result.tsx:p::25:117": "el-165",
  "src/components/prioritize/prioritization-result.tsx:div:flex gap-2:28:27": "el-166",
  "src/components/prioritize/prioritization-result.tsx:span:font-medium:28:63": "el-167",
  "src/components/prioritize/prioritization-result.tsx:p::28:140": "el-168",
  "src/components/prioritize/prioritization-result.tsx:p::33:23": "el-169",
  "src/components/prioritize/prioritization-result.tsx:div:space-y-4 p-4:44:16": "el-170",
  "src/components/prioritize/prioritization-result.tsx:h3:font-bold text-lg mb-2:66:20": "el-171",
  "src/components/prioritize/prioritization-result.tsx:ol:list-decimal list-inside space-y-1 mb-6 rounded-md border p-4:67:20": "el-172",
  "src/components/prioritize/prioritization-result.tsx:li:pl-2 font-medium:69:28": "el-173",
  "src/components/prioritize/prioritization-result.tsx:h3:font-bold text-lg mb-2:72:20": "el-174",
  "src/components/prioritize/prioritization-result.tsx:div:p-4 rounded-md border bg-muted/20:73:20": "el-175",
  "src/components/prioritize/prioritization-result.tsx:div:flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8:81:12": "el-176",
  "src/components/prioritize/prioritization-result.tsx:p:text-lg font-medium:83:16": "el-177",
  "src/components/prioritize/prioritization-result.tsx:p::84:16": "el-178",
  "src/components/tasks/task-deck-item.tsx:div:dynamic:9:8": "el-179",
  "src/components/tasks/task-deck.tsx:div:dynamic:23:4": "el-180",
  "src/components/tasks/task-deck.tsx:div:tasks-deck-header flex items-center gap-2 mb-2:24:6": "el-181",
  "src/components/tasks/task-deck.tsx:span:sr-only:32:11": "el-182",
  "src/components/tasks/task-deck.tsx:div:flex-grow cursor-pointer:35:8": "el-183",
  "src/components/tasks/task-deck.tsx:h3:dynamic:36:10": "el-184",
  "src/components/tasks/task-deck.tsx:p:tasks-deck-progress text-xs text-muted-foreground:47:8": "el-185",
  "src/components/tasks/task-deck.tsx:div:dynamic:53:6": "el-186",
  "src/components/tasks/task-deck.tsx:div:task-deck-item:55:10": "el-187",
  "src/components/tasks/task-item.tsx:div:tasks-item flex items-center space-x-3 p-3 rounded-lg transition-colors bg-background hover:bg-muted/50 border:7:8": "el-188",
  "src/components/tasks/task-list.tsx:div:mb-6 space-y-4 animate-in fade-in-50:277:20": "el-189",
  "src/components/tasks/task-list.tsx:form:task-input-row:283:24": "el-190",
  "src/components/tasks/task-list.tsx:div:space-y-4:320:16": "el-191",
  "src/components/tasks/task-list.tsx:p:text-sm text-muted-foreground py-4 text-center:329:28": "el-192",
  "src/components/tasks/task-list.tsx:h3:text-sm font-medium mb-2 text-muted-foreground:337:28": "el-193",
  "src/components/tasks/task-list.tsx:div:space-y-2:338:28": "el-194",
  "src/components/theme-toggle.tsx:span:sr-only:24:10": "el-195",
  "src/app/(app)/dashboard/page.tsx:div:space-y-6:7:4": "el-196",
  "src/app/(app)/domain/[domain]/page.tsx:div:space-y-6:76:4": "el-197",
  "src/app/(app)/domain/[domain]/page.tsx:div:rounded-xl p-6 relative overflow-hidden:78:6": "el-198",
  "src/app/(app)/domain/[domain]/page.tsx:div:relative z-10:82:8": "el-199",
  "src/app/(app)/domain/[domain]/page.tsx:div:flex items-center gap-4:90:10": "el-200",
  "src/app/(app)/domain/[domain]/page.tsx:div:p-4 rounded-full bg-white/20 backdrop-blur-sm:91:12": "el-201",
  "src/app/(app)/domain/[domain]/page.tsx:div::94:12": "el-202",
  "src/app/(app)/domain/[domain]/page.tsx:h1:text-3xl font-headline text-white:95:14": "el-203",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-white/80:96:14": "el-204",
  "src/app/(app)/domain/[domain]/page.tsx:div:absolute top-0 right-0 opacity-10:104:8": "el-205",
  "src/app/(app)/domain/[domain]/page.tsx:div:grid grid-cols-2 md:grid-cols-4 gap-4:110:6": "el-206",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold:114:12": "el-207",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold text-green-400:122:12": "el-208",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold text-blue-400:130:12": "el-209",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-2xl font-bold text-cyan-400:138:12": "el-210",
  "src/app/(app)/domain/[domain]/page.tsx:div:flex flex-col sm:flex-row gap-4:146:6": "el-211",
  "src/app/(app)/domain/[domain]/page.tsx:span:h-2 w-2 rounded-full mr-2:177:14": "el-212",
  "src/app/(app)/domain/[domain]/page.tsx:div:grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4:194:8": "el-213",
  "src/app/(app)/domain/[domain]/page.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:200:8": "el-214",
  "src/app/(app)/domain/[domain]/page.tsx:h3:text-xl font-semibold text-muted-foreground:201:10": "el-215",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-muted-foreground mt-2:202:10": "el-216",
  "src/app/(app)/domain/[domain]/page.tsx:div:text-center py-16 border-2 border-dashed rounded-lg:207:8": "el-217",
  "src/app/(app)/domain/[domain]/page.tsx:h3:text-xl font-semibold text-muted-foreground:209:10": "el-218",
  "src/app/(app)/domain/[domain]/page.tsx:p:text-muted-foreground mt-2:212:10": "el-219",
  "src/app/(app)/import/page.tsx:div:space-y-6 max-w-4xl mx-auto:207:4": "el-220",
  "src/app/(app)/import/page.tsx:div:flex items-center justify-between:208:6": "el-221",
  "src/app/(app)/import/page.tsx:div:flex items-center gap-3:209:8": "el-222",
  "src/app/(app)/import/page.tsx:div:p-2 rounded-lg bg-primary/10:210:10": "el-223",
  "src/app/(app)/import/page.tsx:div::213:10": "el-224",
  "src/app/(app)/import/page.tsx:h1:text-2xl font-bold tracking-tight:214:12": "el-225",
  "src/app/(app)/import/page.tsx:p:text-muted-foreground:215:12": "el-226",
  "src/app/(app)/import/page.tsx:div:space-y-6 mt-4:236:12": "el-227",
  "src/app/(app)/import/page.tsx:div:space-y-3:238:14": "el-228",
  "src/app/(app)/import/page.tsx:h3:font-semibold flex items-center gap-2:239:16": "el-229",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground:243:16": "el-230",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4 space-y-2:247:16": "el-231",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide:248:18": "el-232",
  "src/app/(app)/import/page.tsx:pre:text-sm font-mono bg-background rounded p-3 overflow-x-auto:249:18": "el-233",
  "src/app/(app)/import/page.tsx:div:text-sm space-y-2:255:16": "el-234",
  "src/app/(app)/import/page.tsx:p:font-medium:256:18": "el-235",
  "src/app/(app)/import/page.tsx:ul:list-disc list-inside space-y-1 text-muted-foreground ml-2:257:18": "el-236",
  "src/app/(app)/import/page.tsx:li::258:20": "el-237",
  "src/app/(app)/import/page.tsx:strong::258:24": "el-238",
  "src/app/(app)/import/page.tsx:li::259:20": "el-239",
  "src/app/(app)/import/page.tsx:strong::259:24": "el-240",
  "src/app/(app)/import/page.tsx:li::260:20": "el-241",
  "src/app/(app)/import/page.tsx:strong::260:24": "el-242",
  "src/app/(app)/import/page.tsx:li::261:20": "el-243",
  "src/app/(app)/import/page.tsx:strong::261:24": "el-244",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4:265:16": "el-245",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2:266:18": "el-246",
  "src/app/(app)/import/page.tsx:div:grid grid-cols-2 gap-2 text-sm:267:18": "el-247",
  "src/app/(app)/import/page.tsx:div::268:20": "el-248",
  "src/app/(app)/import/page.tsx:code:text-xs:268:25": "el-249",
  "src/app/(app)/import/page.tsx:div::269:20": "el-250",
  "src/app/(app)/import/page.tsx:code:text-xs:269:25": "el-251",
  "src/app/(app)/import/page.tsx:div::270:20": "el-252",
  "src/app/(app)/import/page.tsx:code:text-xs:270:25": "el-253",
  "src/app/(app)/import/page.tsx:div::271:20": "el-254",
  "src/app/(app)/import/page.tsx:code:text-xs:271:25": "el-255",
  "src/app/(app)/import/page.tsx:div::272:20": "el-256",
  "src/app/(app)/import/page.tsx:code:text-xs:272:25": "el-257",
  "src/app/(app)/import/page.tsx:div:space-y-3:280:14": "el-258",
  "src/app/(app)/import/page.tsx:h3:font-semibold flex items-center gap-2:281:16": "el-259",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground:285:16": "el-260",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4 space-y-2:289:16": "el-261",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide:290:18": "el-262",
  "src/app/(app)/import/page.tsx:pre:text-sm font-mono bg-background rounded p-3 overflow-x-auto:291:18": "el-263",
  "src/app/(app)/import/page.tsx:div:text-sm space-y-2:299:16": "el-264",
  "src/app/(app)/import/page.tsx:p:font-medium:300:18": "el-265",
  "src/app/(app)/import/page.tsx:ul:list-disc list-inside space-y-1 text-muted-foreground ml-2:301:18": "el-266",
  "src/app/(app)/import/page.tsx:li::302:20": "el-267",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:302:24": "el-268",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:302:88": "el-269",
  "src/app/(app)/import/page.tsx:li::303:20": "el-270",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:303:24": "el-271",
  "src/app/(app)/import/page.tsx:li::304:20": "el-272",
  "src/app/(app)/import/page.tsx:code:text-xs bg-muted px-1 rounded:304:24": "el-273",
  "src/app/(app)/import/page.tsx:li::305:20": "el-274",
  "src/app/(app)/import/page.tsx:div:bg-muted/50 rounded-lg p-4:309:16": "el-275",
  "src/app/(app)/import/page.tsx:p:text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2:310:18": "el-276",
  "src/app/(app)/import/page.tsx:div:flex flex-wrap gap-2:311:18": "el-277",
  "src/app/(app)/import/page.tsx:div:space-y-3:324:14": "el-278",
  "src/app/(app)/import/page.tsx:h3:font-semibold:325:16": "el-279",
  "src/app/(app)/import/page.tsx:ul:text-sm space-y-2 text-muted-foreground:326:16": "el-280",
  "src/app/(app)/import/page.tsx:li:flex gap-2:327:18": "el-281",
  "src/app/(app)/import/page.tsx:span::329:20": "el-282",
  "src/app/(app)/import/page.tsx:strong::329:30": "el-283",
  "src/app/(app)/import/page.tsx:li:flex gap-2:331:18": "el-284",
  "src/app/(app)/import/page.tsx:span::333:20": "el-285",
  "src/app/(app)/import/page.tsx:strong::333:47": "el-286",
  "src/app/(app)/import/page.tsx:li:flex gap-2:335:18": "el-287",
  "src/app/(app)/import/page.tsx:span::337:20": "el-288",
  "src/app/(app)/import/page.tsx:strong::337:44": "el-289",
  "src/app/(app)/import/page.tsx:li:flex gap-2:339:18": "el-290",
  "src/app/(app)/import/page.tsx:span::341:20": "el-291",
  "src/app/(app)/import/page.tsx:strong::341:37": "el-292",
  "src/app/(app)/import/page.tsx:div::381:10": "el-293",
  "src/app/(app)/import/page.tsx:label:text-sm font-medium mb-2 block:382:12": "el-294",
  "src/app/(app)/import/page.tsx:ul:mt-2 space-y-1 text-sm:415:16": "el-295",
  "src/app/(app)/import/page.tsx:li:font-mono:417:20": "el-296",
  "src/app/(app)/import/page.tsx:span:text-muted-foreground:418:22": "el-297",
  "src/app/(app)/import/page.tsx:div:flex items-center justify-between:429:16": "el-298",
  "src/app/(app)/import/page.tsx:div::430:18": "el-299",
  "src/app/(app)/import/page.tsx:div:space-y-4:446:18": "el-300",
  "src/app/(app)/import/page.tsx:div:dynamic:452:24": "el-301",
  "src/app/(app)/import/page.tsx:div:flex items-start gap-3:459:26": "el-302",
  "src/app/(app)/import/page.tsx:div:flex-1 min-w-0:465:28": "el-303",
  "src/app/(app)/import/page.tsx:div:flex items-center gap-2 flex-wrap:466:30": "el-304",
  "src/app/(app)/import/page.tsx:h3:font-semibold:467:32": "el-305",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground mt-1:486:30": "el-306",
  "src/app/(app)/import/page.tsx:div:flex gap-1 mt-2 flex-wrap:490:32": "el-307",
  "src/app/(app)/import/page.tsx:div:mt-3:499:32": "el-308",
  "src/app/(app)/import/page.tsx:p:text-xs text-muted-foreground mb-1:500:34": "el-309",
  "src/app/(app)/import/page.tsx:ul:text-sm space-y-1:503:34": "el-310",
  "src/app/(app)/import/page.tsx:li:flex items-center gap-2:505:38": "el-311",
  "src/app/(app)/import/page.tsx:span:w-1.5 h-1.5 rounded-full bg-muted-foreground:506:40": "el-312",
  "src/app/(app)/import/page.tsx:li:text-muted-foreground text-xs:511:38": "el-313",
  "src/app/(app)/import/page.tsx:p:text-xs text-muted-foreground mt-2 font-mono truncate:518:30": "el-314",
  "src/app/(app)/import/page.tsx:div:text-xs text-muted-foreground space-y-1:583:14": "el-315",
  "src/app/(app)/import/page.tsx:p::584:16": "el-316",
  "src/app/(app)/import/page.tsx:strong::584:19": "el-317",
  "src/app/(app)/import/page.tsx:p::585:16": "el-318",
  "src/app/(app)/import/page.tsx:strong::585:19": "el-319",
  "src/app/(app)/import/page.tsx:p::586:16": "el-320",
  "src/app/(app)/import/page.tsx:strong::586:19": "el-321",
  "src/app/(app)/import/page.tsx:div:space-y-3:609:16": "el-322",
  "src/app/(app)/import/page.tsx:div:dynamic:615:22": "el-323",
  "src/app/(app)/import/page.tsx:div:flex items-start gap-3:622:24": "el-324",
  "src/app/(app)/import/page.tsx:div:flex-1:628:26": "el-325",
  "src/app/(app)/import/page.tsx:div:flex items-center gap-2 flex-wrap:629:28": "el-326",
  "src/app/(app)/import/page.tsx:span:font-medium:630:30": "el-327",
  "src/app/(app)/import/page.tsx:p:text-sm text-muted-foreground mt-1:646:30": "el-328",
  "src/app/(app)/layout.tsx:div:flex min-h-screen w-full flex-col bg-muted/40:18:6": "el-329",
  "src/app/(app)/layout.tsx:div:flex flex-col sm:gap-4 sm:py-4 sm:pl-14:20:8": "el-330",
  "src/app/(app)/layout.tsx:main:grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8:22:10": "el-331",
  "src/app/(app)/prioritize/page.tsx:div:space-y-2:5:8": "el-332",
  "src/app/(app)/prioritize/page.tsx:div:flex items-center justify-between:6:13": "el-333",
  "src/app/(app)/prioritize/page.tsx:div:space-y-1:7:16": "el-334",
  "src/app/(app)/prioritize/page.tsx:h1:text-2xl font-bold tracking-tight:8:20": "el-335",
  "src/app/(app)/prioritize/page.tsx:p:text-muted-foreground max-w-2xl:9:20": "el-336",
  "src/app/(app)/prioritize/page.tsx:div:pt-4:14:12": "el-337",
  "src/app/(app)/settings/page.tsx:div:text-sm text-muted-foreground:30:10": "el-338",
  "src/app/(app)/settings/page.tsx:div:flex items-center justify-between:32:8": "el-339",
  "src/app/(app)/settings/page.tsx:div::33:10": "el-340",
  "src/app/(app)/settings/page.tsx:p:text-sm text-muted-foreground:35:12": "el-341",
  "src/app/(app)/settings/page.tsx:div:flex items-center justify-between:39:8": "el-342",
  "src/app/(app)/settings/page.tsx:div::40:10": "el-343",
  "src/app/(app)/settings/page.tsx:p:text-sm text-muted-foreground:42:12": "el-344",
  "src/app/(app)/tasks/page.tsx:div:space-y-4:5:8": "el-345",
  "src/app/layout.tsx:html::19:4": "el-346",
  "src/app/layout.tsx:head::20:6": "el-347",
  "src/app/layout.tsx:link::21:8": "el-348",
  "src/app/layout.tsx:link::22:8": "el-349",
  "src/app/layout.tsx:link::23:8": "el-350",
  "src/app/layout.tsx:body:font-body antialiased browzr-skin:25:6": "el-351",
  "src/app/login/page.tsx:div:flex items-center justify-center min-h-[60vh] p-4:47:4": "el-352",
  "src/app/login/page.tsx:div:space-y-4:57:12": "el-353",
  "src/app/login/page.tsx:div:text-sm text-muted-foreground:58:14": "el-354",
  "src/app/login/page.tsx:div:text-sm text-muted-foreground:59:14": "el-355",
  "src/app/login/page.tsx:form:space-y-4:63:12": "el-356",
  "src/app/login/page.tsx:div:grid gap-2:64:14": "el-357",
  "src/app/login/page.tsx:label:text-sm:65:16": "el-358",
  "src/app/login/page.tsx:div:grid gap-2:68:14": "el-359",
  "src/app/login/page.tsx:label:text-sm:69:16": "el-360",
  "src/app/login/page.tsx:div:text-sm text-destructive:72:24": "el-361",
  "src/app/login/page.tsx:div:flex items-center gap-2:73:14": "el-362",
  "src/components/layout/filters-modal.tsx:h2:font-headline text-2xl text-primary lowercase tracking-wide:91:10": "el-363",
  "src/components/layout/filters-modal.tsx:div:space-y-6 py-4:93:10": "el-364",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:95:12": "el-365",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:110:12": "el-366",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:125:12": "el-367",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:140:12": "el-368",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:155:12": "el-369",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:170:12": "el-370",
  "src/components/layout/filters-modal.tsx:div:flex items-center justify-between gap-8:180:12": "el-371",
  "src/components/layout/filters-modal.tsx:span:sr-only:208:12": "el-372",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center justify-between:168:8": "el-373",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center gap-1:173:10": "el-374",
  "src/components/today/ai-chat-panel.tsx:span:text-xs font-medium flex items-center gap-1:203:16": "el-375",
  "src/components/today/ai-chat-panel.tsx:div:space-y-1 mt-1 p-2 bg-muted/50 rounded-md:213:14": "el-376",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center justify-between gap-2 text-xs py-1:215:18": "el-377",
  "src/components/today/ai-chat-panel.tsx:span:truncate flex-1:219:20": "el-378",
  "src/components/today/ai-chat-panel.tsx:div:space-y-3:245:10": "el-379",
  "src/components/today/ai-chat-panel.tsx:div:text-center text-muted-foreground py-8:247:14": "el-380",
  "src/components/today/ai-chat-panel.tsx:p:text-sm:249:16": "el-381",
  "src/components/today/ai-chat-panel.tsx:p:text-xs mt-1:250:16": "el-382",
  "src/components/today/ai-chat-panel.tsx:p:text-xs mt-2 text-primary:252:18": "el-383",
  "src/components/today/ai-chat-panel.tsx:div:dynamic:259:16": "el-384",
  "src/components/today/ai-chat-panel.tsx:div:flex items-center gap-2 text-muted-foreground p-3:273:14": "el-385",
  "src/components/today/ai-chat-panel.tsx:span:text-sm:275:16": "el-386",
  "src/components/today/ai-chat-panel.tsx:form:flex gap-2 mt-3 flex-shrink-0:282:8": "el-387",
  "src/components/today/ai-recommend-button.tsx:div:p-4 border-b:118:8": "el-388",
  "src/components/today/ai-recommend-button.tsx:div:flex items-center justify-between:119:10": "el-389",
  "src/components/today/ai-recommend-button.tsx:h3:font-semibold flex items-center gap-2:120:12": "el-390",
  "src/components/today/ai-recommend-button.tsx:p:text-sm text-muted-foreground mt-2:134:12": "el-391",
  "src/components/today/ai-recommend-button.tsx:div:max-h-[300px] overflow-y-auto:138:8": "el-392",
  "src/components/today/ai-recommend-button.tsx:div:flex items-center justify-center py-8:140:12": "el-393",
  "src/components/today/ai-recommend-button.tsx:div:text-center py-8 text-muted-foreground:144:12": "el-394",
  "src/components/today/ai-recommend-button.tsx:p:text-sm:145:14": "el-395",
  "src/components/today/ai-recommend-button.tsx:div:divide-y:156:12": "el-396",
  "src/components/today/ai-recommend-button.tsx:div:p-3 hover:bg-muted/50 transition-colors:158:16": "el-397",
  "src/components/today/ai-recommend-button.tsx:div:flex items-start justify-between gap-2:159:18": "el-398",
  "src/components/today/ai-recommend-button.tsx:div:flex-1 min-w-0:160:20": "el-399",
  "src/components/today/ai-recommend-button.tsx:div:font-medium text-sm truncate:161:22": "el-400",
  "src/components/today/ai-recommend-button.tsx:div:text-xs text-muted-foreground:162:22": "el-401",
  "src/components/today/ai-recommend-button.tsx:p:text-xs text-muted-foreground mt-1 line-clamp-2:165:22": "el-402",
  "src/components/today/ai-recommend-button.tsx:div:p-3 border-t:184:8": "el-403",
  "src/components/today/date-navigator.tsx:div:flex items-center gap-2:20:4": "el-404",
  "src/components/today/date-navigator.tsx:div:flex items-center gap-2 min-w-[200px] justify-center:30:6": "el-405",
  "src/components/today/date-navigator.tsx:span:text-sm font-medium:32:8": "el-406",
  "src/components/today/item-source-picker.tsx:div:relative:118:8": "el-407",
  "src/components/today/item-source-picker.tsx:p:text-center text-muted-foreground py-8:137:16": "el-408",
  "src/components/today/item-source-picker.tsx:div:space-y-2:141:16": "el-409",
  "src/components/today/item-source-picker.tsx:div:flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer:143:20": "el-410",
  "src/components/today/item-source-picker.tsx:div:flex-1 min-w-0:152:22": "el-411",
  "src/components/today/item-source-picker.tsx:div:font-medium text-sm truncate:153:24": "el-412",
  "src/components/today/item-source-picker.tsx:div:text-xs text-muted-foreground:156:24": "el-413",
  "src/components/today/item-source-picker.tsx:p:text-center text-muted-foreground py-8:168:12": "el-414",
  "src/components/today/quick-entry-panel.tsx:form:flex gap-2 items-center:66:12": "el-415",
  "src/components/today/timeline-item.tsx:div:dynamic:116:4": "el-416",
  "src/components/today/timeline-item.tsx:div:absolute left-0 top-0 bottom-0 w-6 cursor-grab active:cursor-grabbing flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity:135:6": "el-417",
  "src/components/today/timeline-item.tsx:div:flex items-start gap-2 pl-5 pr-8:146:6": "el-418",
  "src/components/today/timeline-item.tsx:div:flex-1 min-w-0:152:8": "el-419",
  "src/components/today/timeline-item.tsx:div:dynamic:153:10": "el-420",
  "src/components/today/timeline-item.tsx:div:text-xs text-muted-foreground:159:10": "el-421",
  "src/components/today/timeline-item.tsx:div:absolute left-2 right-2 bottom-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity:176:6": "el-422",
  "src/components/today/timeline-item.tsx:div:w-8 h-1 bg-muted-foreground/50 rounded mx-auto mt-0.5:183:8": "el-423",
  "src/components/today/timeline-view.tsx:div:today-hour-marker absolute left-0 right-0 flex items-start:68:6": "el-424",
  "src/components/today/timeline-view.tsx:span:w-16 text-xs text-muted-foreground pr-2 text-right flex-shrink-0:73:8": "el-425",
  "src/components/today/timeline-view.tsx:div:flex-1 border-t border-border/30 mt-2:76:8": "el-426",
  "src/components/today/timeline-view.tsx:div:animate-pulse space-y-4:85:10": "el-427",
  "src/components/today/timeline-view.tsx:div:h-8 bg-muted rounded:86:12": "el-428",
  "src/components/today/timeline-view.tsx:div:h-64 bg-muted rounded:87:12": "el-429",
  "src/components/today/timeline-view.tsx:div:today-timeline-scroll overflow-y-auto:97:8": "el-430",
  "src/components/today/timeline-view.tsx:div:today-timeline relative ml-16:102:10": "el-431",
  "src/components/today/timeline-view.tsx:div:absolute inset-0 -ml-16:107:12": "el-432",
  "src/components/today/timeline-view.tsx:div:today-current-time-indicator absolute left-0 right-0 z-20 pointer-events-none:113:14": "el-433",
  "src/components/today/timeline-view.tsx:div:relative:117:16": "el-434",
  "src/components/today/timeline-view.tsx:div:absolute -left-16 -top-2 w-3 h-3 rounded-full bg-destructive:118:18": "el-435",
  "src/components/today/timeline-view.tsx:div:h-0.5 bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]:119:18": "el-436",
  "src/components/today/timeline-view.tsx:div:absolute inset-0 pr-4:125:12": "el-437",
  "src/components/today/timeline-view.tsx:div:absolute inset-0 flex items-center justify-center text-muted-foreground:133:14": "el-438",
  "src/components/today/timeline-view.tsx:p:text-center:134:16": "el-439",
  "src/components/today/timeline-view.tsx:br::135:37": "el-440",
  "src/components/today/timeline-view.tsx:span:text-sm:136:18": "el-441",
  "src/components/today/today-page.tsx:div:today-page flex flex-col gap-4 relative:14:6": "el-442",
  "src/components/today/today-page.tsx:div:flex items-center justify-between:18:12": "el-443",
  "src/components/today/today-page.tsx:div::19:14": "el-444",
  "src/components/today/today-page.tsx:div:flex gap-4 flex-1:29:8": "el-445",
  "src/components/today/today-page.tsx:div:flex-1 flex flex-col gap-4 min-w-0:31:10": "el-446",
  "src/app/(app)/today/page.tsx:div:space-y-4:5:4": "el-447"
}
````

## File: apphosting.yaml
````yaml
# Settings for Cloud Run backend
runConfig:
  minInstances: 0
  cpu: 1
  memoryMiB: 2048
  maxInstances: 100

# Environment variables
# Public Firebase config (these are client-side, not secrets)
env:
  - variable: NEXT_PUBLIC_FIREBASE_API_KEY
    value: AIzaSyDibdtqeea1yHqi4ddlZCmAhuq269iK06c
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    value: briizos.firebaseapp.com
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID
    value: briizos
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    value: briizos.firebasestorage.app
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    value: "719807847926"
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_FIREBASE_APP_ID
    value: "1:719807847926:web:849e8024234baba825fbd77"
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_ENABLE_FIRESTORE_SYNC
    value: "true"
    availability:
      - BUILD
      - RUNTIME

  - variable: NEXT_PUBLIC_READ_BRIIzOS
    value: "true"
    availability:
      - BUILD
      - RUNTIME

  # Gemini API key - stored as secret in Secret Manager
  - variable: GEMINI_API_KEY
    secret: GEMINI_API_KEY
    availability:
      - RUNTIME
````
