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