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