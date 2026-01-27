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