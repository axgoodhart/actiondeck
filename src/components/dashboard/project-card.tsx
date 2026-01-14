'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import { ProjectModal } from './project-modal';
import { DomainProgressRing } from './progress-ring';
import { DomainBadge } from './domain-filter-bar';
import { StatusBadge } from './status-select';
import { TagBadges } from './tags-input';
import { DOMAINS } from '@/lib/domains';
import { formatDistanceToNow } from 'date-fns';

export function ProjectCard({ project }: {project: Project;}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formattedDate, setFormattedDate] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState('');

  React.useEffect(() => {
    if (project.deadline) {
      setFormattedDate(new Date(project.deadline).toLocaleDateString());
    }
    if (project.updatedAt) {
      setLastUpdated(formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }));
    }
  }, [project.deadline, project.updatedAt]);

  // Calculate progress - use manual override if set, otherwise calculate from tasks
  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const taskProgress = totalTasks > 0 ? completedTasks / totalTasks * 100 : 0;
  const progress = project.manualProgress !== undefined ? project.manualProgress : taskProgress;

  // Get domain color for progress ring
  const domainConfig = project.domain ? DOMAINS[project.domain] : null;
  const progressColor = domainConfig?.color || 'hsl(165, 100%, 45%)';

  return (
    <>
      <Card data-style-id="stylo-110" className="dashboard-project-card project-card group relative flex flex-col h-full hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {project.coverImage &&
        <>
            <div data-style-id="stylo-111" id="el-49"
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          style={{ backgroundImage: `url(${project.coverImage})` }} />

            <div data-style-id="stylo-112" id="el-50" className="absolute inset-0 bg-black/20 transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
          </>
        }
        <div data-style-id="stylo-113" id="el-51" className={project.coverImage ? "relative z-10 flex flex-col h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" : "flex flex-col h-full"}>
          <CardHeader data-style-id="stylo-114" className="dashboard-project-card-header pb-2">
            {/* Top row: Domain badge and Status */}
            <div data-style-id="stylo-115" id="el-52" className="flex items-center justify-between gap-2 mb-2">
              {project.domain &&
              <DomainBadge data-style-id="stylo-116" domain={project.domain} size="small" />
              }
              <StatusBadge data-style-id="stylo-117" status={project.status} size="small" />
            </div>

            <CardTitle data-style-id="stylo-118" className="dashboard-project-card-title text-lg font-semibold line-clamp-1">{project.name}</CardTitle>
            <CardDescription data-style-id="stylo-119" className="dashboard-project-card-description h-10 line-clamp-2">{project.description}</CardDescription>
          </CardHeader>

          <CardContent data-style-id="stylo-120" className="dashboard-project-card-content flex-grow space-y-3 pt-0">
            {/* Tags */}
            {project.tags.length > 0 &&
            <TagBadges data-style-id="stylo-121" tags={project.tags} max={3} />
            }

            {/* Progress ring and metadata */}
            <div data-style-id="stylo-122" id="el-53" className="flex items-center justify-between gap-4">
              <div data-style-id="stylo-123" id="el-54" className="flex-1 space-y-1">
                <div data-style-id="stylo-124" id="el-55" className="text-xs text-muted-foreground">
                  Due: {formattedDate || <span data-style-id="stylo-125" id="el-56" className="animate-pulse">Loading...</span>}
                </div>
                {lastUpdated &&
                <div data-style-id="stylo-126" id="el-57" className="text-xs text-muted-foreground/70">
                    Updated {lastUpdated}
                  </div>
                }
                <div data-style-id="stylo-127" id="el-58" className="text-xs text-muted-foreground">
                  {project.manualProgress !== undefined ?
                  <span data-style-id="stylo-128" id="el-59">Progress: {Math.round(progress)}% (manual)</span> :

                  <span data-style-id="stylo-129" id="el-60">Tasks: {completedTasks}/{totalTasks}</span>
                  }
                </div>
              </div>

              {/* Progress Ring */}
              <DomainProgressRing data-style-id="stylo-130"
              progress={progress}
              size={56}
              strokeWidth={5}
              color={progressColor}
              showLabel={true} />

            </div>
          </CardContent>

          <CardFooter data-style-id="stylo-131" className="dashboard-project-card-footer pt-0">
            <Button data-style-id="stylo-132" variant="secondary" className="dashboard-project-card-view-btn w-full" onClick={() => setIsModalOpen(true)}>
              View Details
            </Button>
          </CardFooter>
        </div>
      </Card>
      <ProjectModal data-style-id="stylo-133" project={project} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>);

}