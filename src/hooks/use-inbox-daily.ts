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
        const hasBrain = e.body?.includes('\u{1F9E0}') ? 'Y' : 'N';
        console.log('  ' + (i + 1) + '. [' + hasBrain + '] ' + (e.subject?.slice(0, 50) || ''));
      });
      console.log('=== PARSED (filtered) ===', inboxByDate.size, 'dates');
      inboxByDate.forEach((inbox, date) => {
        console.log('  ' + date + ': ' + inbox.tasks.length + ' tasks');
        inbox.tasks.forEach((t) => console.log('    - ' + t.item.slice(0, 60)));
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
