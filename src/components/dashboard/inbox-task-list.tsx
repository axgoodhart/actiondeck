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