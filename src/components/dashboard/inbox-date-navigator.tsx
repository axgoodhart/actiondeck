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