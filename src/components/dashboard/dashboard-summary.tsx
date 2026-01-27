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