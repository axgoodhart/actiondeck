
'use client';

import { useProjects } from '@/context/project-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import React, { useState, useEffect } from 'react';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format, addDays } from 'date-fns';

export function DashboardSummary() {
  const { projects, updateProject, addProject } = useProjects();
  const [isClient, setIsClient] = useState(false);
  const [quickText, setQuickText] = useState('');
  const [quickMode, setQuickMode] = useState<string>('new');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalProjects = projects.length;
  const allTasks = projects.flatMap((p) => p.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const chartData = [
  { name: 'Pending', value: pendingTasks, fill: 'hsl(var(--chart-3))' },
  { name: 'Completed', value: completedTasks, fill: 'hsl(var(--chart-1))' }];


  const totalCompleted = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const handleQuickSubmit = () => {
    const text = quickText.trim();
    if (!text) return;
    if (quickMode === 'new') {
      // Create minimal project
      const twoWeeks = addDays(new Date(), 14);
      addProject({
        name: text,
        description: '',
        deadline: format(twoWeeks, 'yyyy-MM-dd'),
        importance: 5,
        size: 10,
        relevance: '',
        coverImage: '' as any
      } as any);
    } else {
      const proj = projects.find((p) => p.id === quickMode);
      if (proj) {
        const newTask = { id: `ptask-${Date.now()}`, title: text, completed: false };
        updateProject({ ...proj, tasks: [newTask, ...proj.tasks] });
      }
    }
    setQuickText('');
  };


  return (
    <Card data-style-id="stylo-0" className="dashboard-card shadow-lg neon-glow">
      <CardHeader data-style-id="stylo-1">
        <div data-style-id="stylo-2" id="el-0" className="flex items-center justify-between">
          <div data-style-id="stylo-3" id="el-1" className="space-y-1 dashboard-header">
            <h1 data-style-id="stylo-4" id="el-2" className="text-2xl font-bold tracking-tight">Smart Dashboard</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent data-style-id="stylo-5">
      <div data-style-id="stylo-6" id="el-3" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left side: Summary Cards and Filter */}
        <div data-style-id="stylo-7" id="el-4" className="md:col-span-1 space-y-4">
          <div data-style-id="stylo-8" id="el-5" className="grid grid-cols-3 gap-4">
              <Card data-style-id="stylo-9" className="dashboard-metrics-card">
                <CardHeader data-style-id="stylo-10" className="p-4 flex flex-col items-center justify-center space-y-2 text-teal-100">
                   <CardTitle data-style-id="stylo-11" className="text-3xl font-bold">{totalProjects}</CardTitle>
                   <ListTodo data-style-id="stylo-12" className="h-5 w-5 text-cyan-200/80" />
                </CardHeader>
              </Card>
              <Card data-style-id="stylo-13" className="dashboard-metrics-card">
                <CardHeader data-style-id="stylo-14" className="p-4 flex flex-col items-center justify-center space-y-2 text-teal-100">
                   <CardTitle data-style-id="stylo-15" className="text-3xl font-bold">{completedTasks}</CardTitle>
                   <CheckCircle2 data-style-id="stylo-16" className="h-5 w-5 text-cyan-200/80" />
                </CardHeader>
              </Card>
              <Card data-style-id="stylo-17" className="dashboard-metrics-card">
                <CardHeader data-style-id="stylo-18" className="p-4 flex flex-col items-center justify-center space-y-2 text-teal-100">
                   <CardTitle data-style-id="stylo-19" className="text-3xl font-bold">{pendingTasks}</CardTitle>
                   <Circle data-style-id="stylo-20" className="h-5 w-5 text-cyan-200/80" />
                </CardHeader>
              </Card>
          </div>
          <Select data-style-id="stylo-21" defaultValue="7">
            <SelectTrigger data-style-id="stylo-22" className="dashboard-input dashboard-select">
              <SelectValue data-style-id="stylo-23" placeholder="Select a time range" />
            </SelectTrigger>
            <SelectContent data-style-id="stylo-24">
              <SelectItem data-style-id="stylo-25" value="1">Last 24 hours</SelectItem>
              <SelectItem data-style-id="stylo-26" value="3">Last 3 days</SelectItem>
              <SelectItem data-style-id="stylo-27" value="7">Last 7 days</SelectItem>
              <SelectItem data-style-id="stylo-28" value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right side: Chart */}
        <div data-style-id="stylo-29" id="el-6" className="md:col-span-2">
            <Card data-style-id="stylo-30" className="h-full flex items-center justify-center p-4 dashboard-chart-card">
                 {isClient ?
              <div data-style-id="stylo-31" id="el-7" className="w-full h-full flex items-center justify-center">
                        <ChartContainer data-style-id="stylo-32" config={{}} className="mx-auto aspect-square max-h-[160px]">
                            <RadialBarChart data-style-id="stylo-33"
                  data={chartData}
                  innerRadius="60%"
                  outerRadius="110%"
                  startAngle={90}
                  endAngle={-270}>

                                <PolarAngleAxis data-style-id="stylo-34" type="number" domain={[0, totalCompleted]} tick={false} />
                                <RadialBar data-style-id="stylo-35" background={{ fill: 'rgba(255,255,255,0.1)' }} dataKey="value" cornerRadius={10} />
                                 <text data-style-id="stylo-36" id="el-8"
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-2xl font-bold">

                                    {totalTasks}
                                </text>
                            </RadialBarChart>
                        </ChartContainer>
                        <div data-style-id="stylo-37" id="el-9" className="ml-8 space-y-2 text-sm text-teal-100">
                            <div data-style-id="stylo-38" id="el-10" className="flex items-center gap-2">
                                <div data-style-id="stylo-39" id="el-11" className="h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                                <span data-style-id="stylo-40" id="el-12">{pendingTasks} Pending</span>
                            </div>
                            <div data-style-id="stylo-41" id="el-13" className="flex items-center gap-2">
                                <div data-style-id="stylo-42" id="el-14" className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                                <span data-style-id="stylo-43" id="el-15">{completedTasks} Complete</span>
                            </div>
                        </div>
                    </div> :

              <div data-style-id="stylo-44" id="el-16" className="h-[160px] w-full flex items-center justify-center">
                        <p data-style-id="stylo-45" id="el-17">Loading chart...</p>
                    </div>
              }
            </Card>
        </div>
      </div>
      <div data-style-id="stylo-46" id="el-18" className="dashboard-quick-row">
        <Input data-style-id="stylo-47"
          placeholder="Quick: create project or add task"
          value={quickText}
          onChange={(e) => setQuickText(e.target.value)}
          className="dashboard-input" />

        <Select data-style-id="stylo-48" value={quickMode} onValueChange={setQuickMode}>
          <SelectTrigger data-style-id="stylo-49" className="dashboard-input dashboard-select">
            <SelectValue data-style-id="stylo-50" placeholder="Choose action" />
          </SelectTrigger>
          <SelectContent data-style-id="stylo-51">
            <SelectItem data-style-id="stylo-52" value="new">Create new project</SelectItem>
            {projects.map((p) =>
              <SelectItem data-style-id="stylo-53" key={p.id} value={p.id}>Add task to: {p.name}</SelectItem>
              )}
          </SelectContent>
        </Select>
        <Button data-style-id="stylo-54" onClick={handleQuickSubmit} className="dashboard-button-primary">Go</Button>
      </div>
      </CardContent>
    </Card>);

}