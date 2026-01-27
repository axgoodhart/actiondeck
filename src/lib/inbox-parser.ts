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
