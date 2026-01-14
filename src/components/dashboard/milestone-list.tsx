'use client';

import React, { useState } from 'react';
import type { Milestone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronUp, ChevronDown, Trash2, Plus, Milestone as MilestoneIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MilestoneListProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
  readOnly?: boolean;
}

export function MilestoneList({ milestones, onChange, readOnly = false }: MilestoneListProps) {
  const [newMilestoneName, setNewMilestoneName] = useState('');

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newMilestoneName.trim();
    if (!name) return;

    const newMilestone: Milestone = {
      id: `ms-${Date.now()}`,
      name,
      completed: false,
      order: milestones.length
    };

    onChange([...milestones, newMilestone]);
    setNewMilestoneName('');
  };

  const handleToggle = (id: string) => {
    onChange(
      milestones.map((m) =>
      m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const handleDelete = (id: string) => {
    const filtered = milestones.filter((m) => m.id !== id);
    // Re-order remaining milestones
    const reordered = filtered.map((m, index) => ({ ...m, order: index }));
    onChange(reordered);
  };

  const handleMoveUp = (id: string) => {
    const index = sortedMilestones.findIndex((m) => m.id === id);
    if (index <= 0) return;

    const updated = sortedMilestones.map((m, i) => {
      if (i === index) return { ...m, order: m.order - 1 };
      if (i === index - 1) return { ...m, order: m.order + 1 };
      return m;
    });

    onChange(updated);
  };

  const handleMoveDown = (id: string) => {
    const index = sortedMilestones.findIndex((m) => m.id === id);
    if (index >= sortedMilestones.length - 1) return;

    const updated = sortedMilestones.map((m, i) => {
      if (i === index) return { ...m, order: m.order + 1 };
      if (i === index + 1) return { ...m, order: m.order - 1 };
      return m;
    });

    onChange(updated);
  };

  const completedCount = milestones.filter((m) => m.completed).length;

  return (
    <div data-style-id="stylo-68" id="el-26" className="space-y-4">
      <div data-style-id="stylo-69" id="el-27" className="flex items-center justify-between">
        <div data-style-id="stylo-70" id="el-28" className="flex items-center gap-2">
          <MilestoneIcon data-style-id="stylo-71" className="h-5 w-5 text-primary" />
          <h3 data-style-id="stylo-72" id="el-29" className="text-lg font-medium">Milestones</h3>
        </div>
        <span data-style-id="stylo-73" id="el-30" className="text-sm text-muted-foreground">
          {completedCount}/{milestones.length} complete
        </span>
      </div>

      {!readOnly &&
      <form data-style-id="stylo-74" id="el-31" onSubmit={handleAddMilestone} className="flex gap-2">
          <Input data-style-id="stylo-75"
        placeholder="Add a milestone..."
        value={newMilestoneName}
        onChange={(e) => setNewMilestoneName(e.target.value)}
        className="flex-1" />

          <Button data-style-id="stylo-76" type="submit" variant="secondary" size="sm">
            <Plus data-style-id="stylo-77" className="h-4 w-4 mr-1" />
            Add
          </Button>
        </form>
      }

      <div data-style-id="stylo-78" id="el-32" className="space-y-2">
        {sortedMilestones.length === 0 ?
        <p data-style-id="stylo-79" id="el-33" className="text-sm text-muted-foreground text-center py-4">
            No milestones yet. Add your first project phase above.
          </p> :

        sortedMilestones.map((milestone, index) =>
        <div data-style-id="stylo-80" id="el-34"
        key={milestone.id}
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border transition-colors',
          milestone.completed ?
          'bg-primary/5 border-primary/20' :
          'bg-muted/30 border-border/50 hover:border-border'
        )}>

              <Checkbox data-style-id="stylo-81"
          id={`milestone-${milestone.id}`}
          checked={milestone.completed}
          onCheckedChange={() => !readOnly && handleToggle(milestone.id)}
          disabled={readOnly} />

              <Label data-style-id="stylo-82"
          htmlFor={`milestone-${milestone.id}`}
          className={cn(
            'flex-1 cursor-pointer font-medium',
            milestone.completed && 'line-through text-muted-foreground'
          )}>

                <span data-style-id="stylo-83" id="el-35" className="text-xs text-muted-foreground mr-2">
                  Phase {index + 1}:
                </span>
                {milestone.name}
              </Label>

              {!readOnly &&
          <div data-style-id="stylo-84" id="el-36" className="flex items-center gap-1">
                  <Button data-style-id="stylo-85"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleMoveUp(milestone.id)}
            disabled={index === 0}
            className="h-7 w-7 p-0">

                    <ChevronUp data-style-id="stylo-86" className="h-4 w-4" />
                  </Button>
                  <Button data-style-id="stylo-87"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleMoveDown(milestone.id)}
            disabled={index === sortedMilestones.length - 1}
            className="h-7 w-7 p-0">

                    <ChevronDown data-style-id="stylo-88" className="h-4 w-4" />
                  </Button>
                  <Button data-style-id="stylo-89"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(milestone.id)}
            className="h-7 w-7 p-0 text-destructive hover:text-destructive">

                    <Trash2 data-style-id="stylo-90" className="h-4 w-4" />
                  </Button>
                </div>
          }
            </div>
        )
        }
      </div>
    </div>);

}