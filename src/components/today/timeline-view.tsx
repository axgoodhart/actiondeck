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