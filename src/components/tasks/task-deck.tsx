'use client';
import React, { useState } from 'react';
import { TaskDeck as TaskDeckType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { TaskDeckItem } from './task-deck-item';
import { cn } from '@/lib/utils';

interface TaskDeckProps {
  deck: TaskDeckType;
  onToggleTask: (taskId: string, deckId: string) => void;
  onDeleteTask?: (taskId: string, deckId?: string) => void;
}

export function TaskDeck({ deck, onToggleTask, onDeleteTask }: TaskDeckProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedTasks = deck.tasks.filter((t) => t.completed).length;
  const allTasksCompleted = completedTasks === deck.tasks.length;

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <div data-style-id="stylo-615" id="el-180" className={cn("tasks-deck group py-2", allTasksCompleted && 'opacity-50')}>
      <div data-style-id="stylo-616" id="el-181" className="tasks-deck-header flex items-center gap-2 mb-2">
         <Button data-style-id="stylo-617"
        variant="ghost"
        size="icon"
        onClick={toggleExpansion}
        className="h-7 w-7">

          <Plus data-style-id="stylo-618" className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-45")} />
           <span data-style-id="stylo-619" id="el-182" className="sr-only">{isExpanded ? 'Collapse' : 'Expand'} deck</span>
        </Button>

        <div data-style-id="stylo-620" id="el-183" className="flex-grow cursor-pointer" onClick={toggleExpansion}>
          <h3 data-style-id="stylo-621" id="el-184"
          className={cn(
            "tasks-deck-title font-semibold transition-all text-base",
            allTasksCompleted && 'line-through',
            isExpanded ? 'text-foreground' : 'text-muted-foreground'
          )}>

            {deck.title}
          </h3>
        </div>

        <p data-style-id="stylo-622" id="el-185" className="tasks-deck-progress text-xs text-muted-foreground">
            {completedTasks} / {deck.tasks.length}
        </p>

        {onDeleteTask &&
        <Button data-style-id="stylo-623"
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(deck.id)}
        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        aria-label="Delete deck">
            <Trash2 data-style-id="stylo-624" className="h-4 w-4" />
          </Button>
        }

      </div>

      <div data-style-id="stylo-625" id="el-186" className={cn("tasks-deck-content task-deck pl-9")} data-state={isExpanded ? 'expanded' : 'collapsed'}>
        {deck.tasks.map((task, index) =>
        <div data-style-id="stylo-626" id="el-187" key={task.id} className="task-deck-item">
            <TaskDeckItem data-style-id="stylo-627"
          task={task}
          onToggle={() => onToggleTask(task.id, deck.id)}
          onDelete={onDeleteTask ? () => onDeleteTask(task.id, deck.id) : undefined}
          index={index + 1} />

          </div>
        )}
      </div>
    </div>);

}