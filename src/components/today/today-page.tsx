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