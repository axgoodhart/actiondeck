'use client';

import { useParams, notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useProjects } from '@/context/project-context';
import { DOMAINS, DOMAIN_LIST, STATUS_CONFIG } from '@/lib/domains';
import type { Domain, ProjectStatus } from '@/lib/types';
import { ProjectCard } from '@/components/dashboard/project-card';
import { ProjectForm } from '@/components/dashboard/project-form';
import { SearchBar } from '@/components/dashboard/search-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type StatusFilter = ProjectStatus | 'all';

export default function DomainPage() {
  const params = useParams();
  const domainParam = params.domain as string;
  const { projects } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Validate domain
  const isValidDomain = DOMAIN_LIST.some((d) => d.value === domainParam);
  if (!isValidDomain) {
    notFound();
  }

  const domain = domainParam as Domain;
  const domainConfig = DOMAINS[domain];
  const Icon = domainConfig.icon;

  // Filter projects for this domain
  const domainProjects = useMemo(() => {
    return projects.filter((p) => {
      if (p.domain !== domain) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.name.toLowerCase().includes(query);
        const matchesDescription = p.description.toLowerCase().includes(query);
        const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && p.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [projects, domain, searchQuery, statusFilter]);

  // Statistics for this domain
  const stats = useMemo(() => {
    const domainAll = projects.filter((p) => p.domain === domain);
    const totalTasks = domainAll.flatMap((p) => p.tasks).length;
    const completedTasks = domainAll.flatMap((p) => p.tasks).filter((t) => t.completed).length;
    const statusCounts: Record<string, number> = { all: domainAll.length };
    for (const status of Object.keys(STATUS_CONFIG)) {
      statusCounts[status] = domainAll.filter((p) => p.status === status).length;
    }
    return { totalProjects: domainAll.length, totalTasks, completedTasks, statusCounts };
  }, [projects, domain]);

  return (
    <div data-style-id="stylo-856" id="el-197" className="space-y-6">
      {/* Domain Header */}
      <div data-style-id="stylo-857" id="el-198"
      className="rounded-xl p-6 relative overflow-hidden"
      style={{ background: domainConfig.bgGradient }}>

        <div data-style-id="stylo-858" id="el-199" className="relative z-10">
        

          <div data-style-id="stylo-862" id="el-200" className="flex items-center gap-4">
            <div data-style-id="stylo-863" id="el-201" className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <Icon data-style-id="stylo-864" className="h-10 w-10 text-white" />
            </div>
            <div data-style-id="stylo-865" id="el-202">
              <h1 data-style-id="stylo-866" id="el-203" className="text-3xl font-headline text-white">{domainConfig.label}</h1>
              <p data-style-id="stylo-867" id="el-204" className="text-white/80">
                {stats.totalProjects} projects, {stats.completedTasks}/{stats.totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div data-style-id="stylo-868" id="el-205" className="absolute top-0 right-0 opacity-10">
          <Icon data-style-id="stylo-869" className="h-64 w-64 -translate-y-10 translate-x-10" />
        </div>
      </div>

      {/* Stats Cards */}
      <div data-style-id="stylo-870" id="el-206" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-style-id="stylo-871" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-872" className="p-4">
            <CardTitle data-style-id="stylo-873" className="text-sm text-muted-foreground">Total Projects</CardTitle>
            <p data-style-id="stylo-874" id="el-207" className="text-2xl font-bold" style={{ color: domainConfig.color }}>
              {stats.totalProjects}
            </p>
          </CardHeader>
        </Card>
        <Card data-style-id="stylo-875" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-876" className="p-4">
            <CardTitle data-style-id="stylo-877" className="text-sm text-muted-foreground">Active</CardTitle>
            <p data-style-id="stylo-878" id="el-208" className="text-2xl font-bold text-green-400">
              {stats.statusCounts.active || 0}
            </p>
          </CardHeader>
        </Card>
        <Card data-style-id="stylo-879" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-880" className="p-4">
            <CardTitle data-style-id="stylo-881" className="text-sm text-muted-foreground">Completed</CardTitle>
            <p data-style-id="stylo-882" id="el-209" className="text-2xl font-bold text-blue-400">
              {stats.statusCounts.done || 0}
            </p>
          </CardHeader>
        </Card>
        <Card data-style-id="stylo-883" className="dashboard-metrics-card">
          <CardHeader data-style-id="stylo-884" className="p-4">
            <CardTitle data-style-id="stylo-885" className="text-sm text-muted-foreground">Tasks Done</CardTitle>
            <p data-style-id="stylo-886" id="el-210" className="text-2xl font-bold text-cyan-400">
              {stats.completedTasks}
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div data-style-id="stylo-887" id="el-211" className="flex flex-col sm:flex-row gap-4">
        <SearchBar data-style-id="stylo-888"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={`Search ${domainConfig.label.toLowerCase()} projects...`}
        className="flex-1" />

        <Button data-style-id="stylo-889"
        className="btn-primary-glass"
        onClick={() => setIsFormOpen(true)}>

          <PlusCircle data-style-id="stylo-890" className="mr-2 h-4 w-4" />
          New {domainConfig.label} Project
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs data-style-id="stylo-891" value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
        <TabsList data-style-id="stylo-892" className="bg-muted/30 border border-border/50">
          <TabsTrigger data-style-id="stylo-893" value="all" className="data-[state=active]:bg-primary/20">
            All
            <Badge data-style-id="stylo-894" variant="secondary" className="ml-2 text-xs">
              {stats.statusCounts.all}
            </Badge>
          </TabsTrigger>
          {Object.entries(STATUS_CONFIG).map(([key, config]) =>
          <TabsTrigger data-style-id="stylo-895"
          key={key}
          value={key}
          className="data-[state=active]:bg-primary/20">

              <span data-style-id="stylo-896" id="el-212"
            className="h-2 w-2 rounded-full mr-2"
            style={{ backgroundColor: config.color }} />

              {config.label}
              {(stats.statusCounts[key] || 0) > 0 &&
            <Badge data-style-id="stylo-897" variant="secondary" className="ml-2 text-xs">
                  {stats.statusCounts[key]}
                </Badge>
            }
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>

      {/* Project Grid */}
      {domainProjects.length > 0 ?
      <div data-style-id="stylo-898" id="el-213" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {domainProjects.map((project) =>
        <ProjectCard data-style-id="stylo-899" key={project.id} project={project} />
        )}
        </div> :
      stats.totalProjects > 0 ?
      <div data-style-id="stylo-900" id="el-214" className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 data-style-id="stylo-901" id="el-215" className="text-xl font-semibold text-muted-foreground">No Matching Projects</h3>
          <p data-style-id="stylo-902" id="el-216" className="text-muted-foreground mt-2">
            Try adjusting your search or status filter
          </p>
        </div> :

      <div data-style-id="stylo-903" id="el-217" className="text-center py-16 border-2 border-dashed rounded-lg">
          <Icon data-style-id="stylo-904" className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 data-style-id="stylo-905" id="el-218" className="text-xl font-semibold text-muted-foreground">
            No {domainConfig.label} Projects Yet
          </h3>
          <p data-style-id="stylo-906" id="el-219" className="text-muted-foreground mt-2">
            Create your first {domainConfig.label.toLowerCase()} project to get started.
          </p>
          <Button data-style-id="stylo-907" className="mt-4" onClick={() => setIsFormOpen(true)}>
            <PlusCircle data-style-id="stylo-908" className="mr-2 h-4 w-4" />
            Create {domainConfig.label} Project
          </Button>
        </div>
      }

      <ProjectForm data-style-id="stylo-909" isOpen={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>);

}