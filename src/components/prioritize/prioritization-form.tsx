'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { handlePrioritization } from '@/lib/actions';
import { useProjects } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { PrioritizationResult } from './prioritization-result';
import type { PrioritizeProjectsOutput } from '@/ai/flows/intelligent-project-prioritization';

const formSchema = z.object({
  projectIds: z.array(z.string()).min(1, 'Please select at least one project.'),
  userGoals: z.string().min(10, 'Please describe your goals in at least 10 characters.'),
  timing: z.string().min(10, 'Please describe the timing/context in at least 10 characters.')
});

export function PrioritizationForm() {
  const { projects } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PrioritizeProjectsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectIds: projects.map((p) => p.id),
      userGoals: 'I want to improve my skills and build something impressive for my portfolio.',
      timing: 'I want to decide what to focus on for the next quarter.'
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const selectedProjects = projects.filter((p) => values.projectIds.includes(p.id));

    try {
      const response = await handlePrioritization({
        projects: selectedProjects.map(({ name, deadline, importance, size, relevance }) => ({ name, deadline, importance, size, relevance })),
        userGoals: values.userGoals,
        timing: values.timing
      });
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error || 'An unknown error occurred.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div data-style-id="stylo-537" id="el-158" className="grid md:grid-cols-2 gap-8 items-start">
            <Card data-style-id="stylo-538" id="prioritize-form-card">
                <CardHeader data-style-id="stylo-539">
                    <CardTitle data-style-id="stylo-540">Create Prioritization Request</CardTitle>
                    <CardDescription data-style-id="stylo-541">Fill out the details below to get an AI-powered recommendation.</CardDescription>
                </CardHeader>
                <CardContent data-style-id="stylo-542">
                    <Form data-style-id="stylo-543" {...form}>
                        <form data-style-id="stylo-544" id="prioritize-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField data-style-id="stylo-545"
              control={form.control}
              name="projectIds"
              render={() =>
              <FormItem data-style-id="stylo-546">
                                        <div data-style-id="stylo-547" id="el-159" className="mb-4">
                                            <FormLabel data-style-id="stylo-548" className="text-base">Projects to Prioritize</FormLabel>
                                            <FormDescription data-style-id="stylo-549">Select which of your projects to include in the analysis.</FormDescription>
                                        </div>
                                        <div data-style-id="stylo-550" id="prioritize-project-checkboxes" className="space-y-2">
                                            {projects.map((project) =>
                  <FormField data-style-id="stylo-551"
                  key={project.id}
                  control={form.control}
                  name="projectIds"
                  render={({ field }) => {
                    return (
                      <FormItem data-style-id="stylo-552"
                      key={project.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">

                                                                <FormControl data-style-id="stylo-553">
                                                                    <Checkbox data-style-id="stylo-554"
                          checked={field.value?.includes(project.id)}
                          onCheckedChange={(checked) => {
                            return checked ?
                            field.onChange([...(field.value || []), project.id]) :
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== project.id
                              ) || []
                            );
                          }} />

                                                                </FormControl>
                                                                <FormLabel data-style-id="stylo-555" className="font-normal">
                                                                    {project.name}
                                                                </FormLabel>
                                                            </FormItem>);

                  }} />

                  )}
                                        </div>
                                        <FormMessage data-style-id="stylo-556" />
                                    </FormItem>
              } />

                            <FormField data-style-id="stylo-557"
              control={form.control}
              name="userGoals"
              render={({ field }) =>
              <FormItem data-style-id="stylo-558">
                                        <FormLabel data-style-id="stylo-559">Your Goals</FormLabel>
                                        <FormControl data-style-id="stylo-560">
                                            <Textarea data-style-id="stylo-561" id="prioritize-goals-input" placeholder="e.g., Learn a new skill for career growth, improve my health..." {...field} />
                                        </FormControl>
                                        <FormDescription data-style-id="stylo-562">What are you trying to achieve right now?</FormDescription>
                                        <FormMessage data-style-id="stylo-563" />
                                    </FormItem>
              } />

                            <FormField data-style-id="stylo-564"
              control={form.control}
              name="timing"
              render={({ field }) =>
              <FormItem data-style-id="stylo-565">
                                        <FormLabel data-style-id="stylo-566">Timing / Context</FormLabel>
                                        <FormControl data-style-id="stylo-567">
                                            <Textarea data-style-id="stylo-568" id="prioritize-timing-input" placeholder="e.g., Planning for the next month, have extra free time on weekends..." {...field} />
                                        </FormControl>
                                        <FormDescription data-style-id="stylo-569">Any relevant context about your current situation.</FormDescription>
                                        <FormMessage data-style-id="stylo-570" />
                                    </FormItem>
              } />

                            <Button data-style-id="stylo-571" id="prioritize-submit-btn" type="submit" disabled={isLoading} className="w-full">
                                {isLoading && <Loader2 data-style-id="stylo-572" className="mr-2 h-4 w-4 animate-spin" />}
                                Prioritize My Projects
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <PrioritizationResult data-style-id="stylo-573" result={result} isLoading={isLoading} error={error} />
        </div>);

}