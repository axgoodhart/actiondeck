'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Project, Task, Milestone } from '@/lib/types';
import { DomainProgressRing } from './progress-ring';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { PenSquare, Trash2, StickyNote, Clock } from 'lucide-react';
import { useProjects } from '@/context/project-context';
import { ProjectForm } from './project-form';
import { DomainBadge } from './domain-filter-bar';
import { StatusButtons } from './status-select';
import { TagsInput } from './tags-input';
import { MilestoneList } from './milestone-list';
import { DOMAINS } from '@/lib/domains';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from
"@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";

export function ProjectModal({ project, isOpen, onOpenChange }: {project: Project;isOpen: boolean;onOpenChange: (isOpen: boolean) => void;}) {
  const { updateProject, deleteProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [formattedDate, setFormattedDate] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState('');
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [localNotes, setLocalNotes] = React.useState(project.notes || '');
  const [notesChanged, setNotesChanged] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      if (project.deadline) {
        setFormattedDate(new Date(project.deadline).toLocaleDateString());
      }
      if (project.updatedAt) {
        setLastUpdated(formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }));
      }
      setLocalNotes(project.notes || '');
      setNotesChanged(false);
    }
  }, [isOpen, project.deadline, project.updatedAt, project.notes]);

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = project.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateProject({ ...project, tasks: updatedTasks });
  };

  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const taskProgress = totalTasks > 0 ? completedTasks / totalTasks * 100 : 0;
  const progress = project.manualProgress !== undefined ? project.manualProgress : taskProgress;

  const domainConfig = project.domain ? DOMAINS[project.domain] : null;
  const progressColor = domainConfig?.color || 'hsl(165, 100%, 45%)';

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;
    const newTask: Task = { id: `ptask-${Date.now()}`, title, completed: false };
    updateProject({ ...project, tasks: [newTask, ...project.tasks] });
    setNewTaskTitle('');
  };

  const handleStatusChange = (status: typeof project.status) => {
    updateProject({ ...project, status });
  };

  const handleTagsChange = (tags: string[]) => {
    updateProject({ ...project, tags });
  };

  const handleMilestonesChange = (milestones: Milestone[]) => {
    updateProject({ ...project, milestones });
  };

  const handleNotesBlur = () => {
    if (notesChanged && localNotes !== project.notes) {
      updateProject({ ...project, notes: localNotes || undefined });
      setNotesChanged(false);
    }
  };

  const handleManualProgressChange = (value: number[]) => {
    updateProject({ ...project, manualProgress: value[0] });
  };

  return (
    <>
      <Sheet data-style-id="stylo-285" open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent data-style-id="stylo-286" className="sm:max-w-xl w-full p-0 flex flex-col modal-panel">
          <SheetHeader data-style-id="stylo-287" className="p-6 pb-2 modal-header">
            {/* Domain and Status Row */}
            <div data-style-id="stylo-288" id="el-86" className="flex items-center gap-2 mb-2">
              {project.domain &&
              <DomainBadge data-style-id="stylo-289" domain={project.domain} size="small" />
              }
            </div>

            <SheetTitle data-style-id="stylo-290" className="font-headline text-3xl text-primary">{project.name}</SheetTitle>
            <SheetDescription data-style-id="stylo-291">{project.description}</SheetDescription>

            {/* Metadata badges */}
            <div data-style-id="stylo-292" id="el-87" className="flex flex-wrap gap-2 pt-2">
              <Badge data-style-id="stylo-293" variant="outline">Due: {formattedDate}</Badge>
              <Badge data-style-id="stylo-294" variant="outline">Importance: {project.importance}/10</Badge>
              <Badge data-style-id="stylo-295" variant="outline">Size: {project.size} hrs</Badge>
              {lastUpdated &&
              <Badge data-style-id="stylo-296" variant="outline" className="flex items-center gap-1">
                  <Clock data-style-id="stylo-297" className="h-3 w-3" />
                  {lastUpdated}
                </Badge>
              }
            </div>

            {/* Status quick-change */}
            <div data-style-id="stylo-298" id="el-88" className="pt-3">
              <Label data-style-id="stylo-299" className="text-sm font-medium mb-2 block">Status</Label>
              <StatusButtons data-style-id="stylo-300"
              value={project.status}
              onChange={handleStatusChange} />

            </div>
          </SheetHeader>

          <div data-style-id="stylo-301" id="el-89" className="flex-grow overflow-y-auto p-6 space-y-6">
            {/* Progress Overview */}
            <div data-style-id="stylo-302" id="el-90" className="flex items-center justify-between">
              <div data-style-id="stylo-303" id="el-91">
                <div data-style-id="stylo-304" id="el-92" className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                  <h3 data-style-id="stylo-305" id="el-93" className="text-lg font-medium text-foreground">Progress</h3>
                </div>
                {project.manualProgress !== undefined ?
                <span data-style-id="stylo-306" id="el-94" className="text-sm text-muted-foreground">Manual: {Math.round(progress)}%</span> :

                <span data-style-id="stylo-307" id="el-95" className="text-sm text-muted-foreground">Tasks: {completedTasks}/{totalTasks}</span>
                }
              </div>
              <DomainProgressRing data-style-id="stylo-308"
              progress={progress}
              size={72}
              strokeWidth={6}
              color={progressColor}
              showLabel={true} />

            </div>

            {/* Manual Progress Override */}
            {project.manualProgress !== undefined &&
            <div data-style-id="stylo-309" id="el-96" className="space-y-2">
                <Label data-style-id="stylo-310" className="text-sm">Adjust Manual Progress</Label>
                <Slider data-style-id="stylo-311"
              value={[project.manualProgress]}
              onValueChange={handleManualProgressChange}
              min={0}
              max={100}
              step={1} />

              </div>
            }

            <Separator data-style-id="stylo-312" />

            {/* Tags */}
            <div data-style-id="stylo-313" id="el-97">
              <Label data-style-id="stylo-314" className="text-sm font-medium mb-2 block">Tags</Label>
              <TagsInput data-style-id="stylo-315"
              tags={project.tags}
              onChange={handleTagsChange} />

            </div>

            <Separator data-style-id="stylo-316" />

            {/* Accordion for organized sections */}
            <Accordion data-style-id="stylo-317" type="multiple" defaultValue={['milestones', 'tasks']} className="w-full">
              {/* Milestones Section */}
              <AccordionItem data-style-id="stylo-318" value="milestones">
                <AccordionTrigger data-style-id="stylo-319">
                  Milestones ({project.milestones.filter((m) => m.completed).length}/{project.milestones.length})
                </AccordionTrigger>
                <AccordionContent data-style-id="stylo-320">
                  <MilestoneList data-style-id="stylo-321"
                  milestones={project.milestones}
                  onChange={handleMilestonesChange} />

                </AccordionContent>
              </AccordionItem>

              {/* Tasks Section */}
              <AccordionItem data-style-id="stylo-322" value="tasks">
                <AccordionTrigger data-style-id="stylo-323">
                  Tasks ({completedTasks}/{totalTasks})
                </AccordionTrigger>
                <AccordionContent data-style-id="stylo-324">
                  <form data-style-id="stylo-325" id="el-98" onSubmit={handleAddTask} className="flex gap-2 mb-3">
                    <Input data-style-id="stylo-326"
                    placeholder="Add task to this project..."
                    value={newTaskTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)} />

                    <Button data-style-id="stylo-327" type="submit" variant="secondary">Add</Button>
                  </form>
                  <div data-style-id="stylo-328" id="el-99" className="space-y-2 max-h-[300px] overflow-y-auto">
                    {project.tasks.length === 0 ?
                    <p data-style-id="stylo-329" id="el-100" className="text-sm text-muted-foreground text-center py-4">
                        No tasks yet. Add your first task above.
                      </p> :

                    project.tasks.map((task) =>
                    <div data-style-id="stylo-330" id="el-101" key={task.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                          <Checkbox data-style-id="stylo-331"
                      id={`modal-task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)} />

                          <Label data-style-id="stylo-332"
                      htmlFor={`modal-task-${task.id}`}
                      className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}>

                            {task.title}
                          </Label>
                        </div>
                    )
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Notes Section */}
              <AccordionItem data-style-id="stylo-333" value="notes">
                <AccordionTrigger data-style-id="stylo-334">
                  <div data-style-id="stylo-335" id="el-102" className="flex items-center gap-2">
                    <StickyNote data-style-id="stylo-336" className="h-4 w-4" />
                    Notes
                  </div>
                </AccordionTrigger>
                <AccordionContent data-style-id="stylo-337">
                  <Textarea data-style-id="stylo-338"
                  placeholder="Add freeform notes here..."
                  value={localNotes}
                  onChange={(e) => {
                    setLocalNotes(e.target.value);
                    setNotesChanged(true);
                  }}
                  onBlur={handleNotesBlur}
                  className="min-h-[120px]" />

                  {notesChanged &&
                  <p data-style-id="stylo-339" id="el-103" className="text-xs text-muted-foreground mt-1">
                      Notes will save when you click away
                    </p>
                  }
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <SheetFooter data-style-id="stylo-340" className='p-6 pt-0 grid grid-cols-2 gap-2 modal-footer'>
            <AlertDialog data-style-id="stylo-341">
              <AlertDialogTrigger data-style-id="stylo-342" asChild>
                <Button data-style-id="stylo-343" variant="destructive" className="w-full">
                  <Trash2 data-style-id="stylo-344" className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-style-id="stylo-345">
                <AlertDialogHeader data-style-id="stylo-346">
                  <AlertDialogTitle data-style-id="stylo-347">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription data-style-id="stylo-348">
                    This action cannot be undone. This will permanently delete your
                    project and all of its tasks and milestones.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter data-style-id="stylo-349">
                  <AlertDialogCancel data-style-id="stylo-350">Cancel</AlertDialogCancel>
                  <AlertDialogAction data-style-id="stylo-351" onClick={() => {
                    deleteProject(project.id);
                    onOpenChange(false);
                  }}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button data-style-id="stylo-352" variant="outline" className="w-full btn-outline-glass" onClick={() => setIsFormOpen(true)}>
              <PenSquare data-style-id="stylo-353" className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <ProjectForm data-style-id="stylo-354"
      isOpen={isFormOpen}
      onOpenChange={setIsFormOpen}
      projectToEdit={project} />

    </>);

}