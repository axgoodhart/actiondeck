
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Project, ProjectFormData, Domain, ProjectStatus } from '@/lib/types';
import { useProjects } from '@/context/project-context';
import { DOMAIN_LIST, STATUS_CONFIG } from '@/lib/domains';

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required.'),
  description: z.string().min(1, 'Description is required.'),
  deadline: z.date({ required_error: 'Deadline is required.' }),
  importance: z.coerce.number().min(1).max(10),
  size: z.coerce.number().min(0),
  relevance: z.string().min(1, 'Relevance is required.'),
  coverImage: z.string().url().optional().or(z.literal('')),
  domain: z.string().optional(),
  status: z.enum(['active', 'paused', 'done', 'archived']),
  tags: z.string(),
  notes: z.string().optional(),
  manualProgress: z.number().min(0).max(100).optional(),
  useManualProgress: z.boolean()
});

interface ProjectFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  projectToEdit?: Project;
}

export function ProjectForm({ isOpen, onOpenChange, projectToEdit }: ProjectFormProps) {
  const { addProject, updateProject } = useProjects();
  const isEditMode = !!projectToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode ?
    {
      ...projectToEdit,
      deadline: new Date(projectToEdit.deadline),
      tags: projectToEdit.tags?.join(', ') || '',
      useManualProgress: projectToEdit.manualProgress !== undefined,
      manualProgress: projectToEdit.manualProgress ?? 0
    } : {
      name: '',
      description: '',
      deadline: new Date(),
      importance: 5,
      size: 10,
      relevance: '',
      coverImage: '',
      domain: undefined,
      status: 'active' as ProjectStatus,
      tags: '',
      notes: '',
      manualProgress: 0,
      useManualProgress: false
    }
  });

  const useManualProgress = form.watch('useManualProgress');

  React.useEffect(() => {
    if (isOpen && projectToEdit) {
      form.reset({
        ...projectToEdit,
        deadline: new Date(projectToEdit.deadline),
        tags: projectToEdit.tags?.join(', ') || '',
        useManualProgress: projectToEdit.manualProgress !== undefined,
        manualProgress: projectToEdit.manualProgress ?? 0
      });
    }
    if (isOpen && !projectToEdit) {
      form.reset({
        name: '',
        description: '',
        deadline: new Date(),
        importance: 5,
        size: 10,
        relevance: '',
        coverImage: '',
        domain: undefined,
        status: 'active' as ProjectStatus,
        tags: '',
        notes: '',
        manualProgress: 0,
        useManualProgress: false
      });
    }
  }, [isOpen, projectToEdit, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Parse tags from comma-separated string
    const parsedTags = values.tags.
    split(',').
    map((t) => t.trim().toLowerCase()).
    filter((t) => t.length > 0);

    const projectData: ProjectFormData = {
      name: values.name,
      description: values.description,
      deadline: format(values.deadline, 'yyyy-MM-dd'),
      importance: values.importance,
      size: values.size,
      relevance: values.relevance,
      coverImage: values.coverImage || undefined,
      domain: values.domain as Domain | undefined,
      status: values.status,
      tags: parsedTags,
      notes: values.notes || undefined,
      manualProgress: values.useManualProgress ? values.manualProgress : undefined
    };

    if (isEditMode) {
      updateProject({
        ...projectToEdit,
        ...projectData
      });
    } else {
      addProject(projectData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog data-style-id="stylo-134" open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent data-style-id="stylo-135" className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader data-style-id="stylo-136">
                    <DialogTitle data-style-id="stylo-137">{isEditMode ? 'Edit Project' : 'Create Project'}</DialogTitle>
                    <DialogDescription data-style-id="stylo-138">
                        {isEditMode ? "Update the details of your project." : "Add a new project to your dashboard."}
                    </DialogDescription>
                </DialogHeader>
                <Form data-style-id="stylo-139" {...form}>
                    <form data-style-id="stylo-140" id="el-61" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField data-style-id="stylo-141"
            control={form.control}
            name="name"
            render={({ field }) =>
            <FormItem data-style-id="stylo-142">
                                    <FormLabel data-style-id="stylo-143">Project Name</FormLabel>
                                    <FormControl data-style-id="stylo-144">
                                        <Input data-style-id="stylo-145" placeholder="e.g., My Awesome Project" {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-146" />
                                </FormItem>
            } />


                        <div data-style-id="stylo-147" id="el-62" className="grid grid-cols-2 gap-4">
                            <FormField data-style-id="stylo-148"
              control={form.control}
              name="domain"
              render={({ field }) =>
              <FormItem data-style-id="stylo-149">
                                        <FormLabel data-style-id="stylo-150">Domain</FormLabel>
                                        <Select data-style-id="stylo-151" onValueChange={field.onChange} value={field.value}>
                                            <FormControl data-style-id="stylo-152">
                                                <SelectTrigger data-style-id="stylo-153">
                                                    <SelectValue data-style-id="stylo-154" placeholder="Select domain" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent data-style-id="stylo-155">
                                                {DOMAIN_LIST.map((domain) => {
                      const Icon = domain.icon;
                      return (
                        <SelectItem data-style-id="stylo-156" key={domain.value} value={domain.value}>
                                                            <div data-style-id="stylo-157" id="el-63" className="flex items-center gap-2">
                                                                <Icon data-style-id="stylo-158" className="h-4 w-4" style={{ color: domain.color }} />
                                                                {domain.label}
                                                            </div>
                                                        </SelectItem>);

                    })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage data-style-id="stylo-159" />
                                    </FormItem>
              } />


                            <FormField data-style-id="stylo-160"
              control={form.control}
              name="status"
              render={({ field }) =>
              <FormItem data-style-id="stylo-161">
                                        <FormLabel data-style-id="stylo-162">Status</FormLabel>
                                        <Select data-style-id="stylo-163" onValueChange={field.onChange} value={field.value}>
                                            <FormControl data-style-id="stylo-164">
                                                <SelectTrigger data-style-id="stylo-165">
                                                    <SelectValue data-style-id="stylo-166" placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent data-style-id="stylo-167">
                                                {Object.entries(STATUS_CONFIG).map(([key, config]) =>
                    <SelectItem data-style-id="stylo-168" key={key} value={key}>
                                                        <div data-style-id="stylo-169" id="el-64" className="flex items-center gap-2">
                                                            <div data-style-id="stylo-170" id="el-65"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: config.color }} />

                                                            {config.label}
                                                        </div>
                                                    </SelectItem>
                    )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage data-style-id="stylo-171" />
                                    </FormItem>
              } />

                        </div>

                        <FormField data-style-id="stylo-172"
            control={form.control}
            name="coverImage"
            render={({ field }) =>
            <FormItem data-style-id="stylo-173">
                                    <FormLabel data-style-id="stylo-174">Cover Image URL</FormLabel>
                                    <FormControl data-style-id="stylo-175">
                                        <Input data-style-id="stylo-176" placeholder="https://images.unsplash.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-177" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-178"
            control={form.control}
            name="description"
            render={({ field }) =>
            <FormItem data-style-id="stylo-179">
                                    <FormLabel data-style-id="stylo-180">Description</FormLabel>
                                    <FormControl data-style-id="stylo-181">
                                        <Textarea data-style-id="stylo-182" placeholder="What is this project about?" {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-183" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-184"
            control={form.control}
            name="tags"
            render={({ field }) =>
            <FormItem data-style-id="stylo-185">
                                    <FormLabel data-style-id="stylo-186">Tags</FormLabel>
                                    <FormControl data-style-id="stylo-187">
                                        <Input data-style-id="stylo-188" placeholder="e.g., frontend, urgent, v2" {...field} />
                                    </FormControl>
                                    <FormDescription data-style-id="stylo-189">Comma-separated tags for filtering</FormDescription>
                                    <FormMessage data-style-id="stylo-190" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-191"
            control={form.control}
            name="deadline"
            render={({ field }) =>
            <FormItem data-style-id="stylo-192" className="flex flex-col">
                                    <FormLabel data-style-id="stylo-193">Deadline</FormLabel>
                                    <Popover data-style-id="stylo-194">
                                        <PopoverTrigger data-style-id="stylo-195" asChild>
                                            <FormControl data-style-id="stylo-196">
                                                <Button data-style-id="stylo-197"
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}>

                                                    {field.value ?
                      format(field.value, "PPP") :

                      <span data-style-id="stylo-198" id="el-66">Pick a date</span>
                      }
                                                    <CalendarIcon data-style-id="stylo-199" className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent data-style-id="stylo-200" className="w-auto p-0" align="start">
                                            <Calendar data-style-id="stylo-201"
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                  date < new Date("1900-01-01")
                  }
                  initialFocus />

                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage data-style-id="stylo-202" />
                                </FormItem>
            } />


                        <div data-style-id="stylo-203" id="el-67" className="grid grid-cols-2 gap-4">
                            <FormField data-style-id="stylo-204"
              control={form.control}
              name="importance"
              render={({ field }) =>
              <FormItem data-style-id="stylo-205">
                                        <FormLabel data-style-id="stylo-206">Importance (1-10)</FormLabel>
                                        <FormControl data-style-id="stylo-207">
                                            <Input data-style-id="stylo-208" type="number" min="1" max="10" {...field} />
                                        </FormControl>
                                        <FormMessage data-style-id="stylo-209" />
                                    </FormItem>
              } />

                            <FormField data-style-id="stylo-210"
              control={form.control}
              name="size"
              render={({ field }) =>
              <FormItem data-style-id="stylo-211">
                                        <FormLabel data-style-id="stylo-212">Size (hours)</FormLabel>
                                        <FormControl data-style-id="stylo-213">
                                            <Input data-style-id="stylo-214" type="number" min="0" {...field} />
                                        </FormControl>
                                        <FormMessage data-style-id="stylo-215" />
                                    </FormItem>
              } />

                        </div>

                        <FormField data-style-id="stylo-216"
            control={form.control}
            name="relevance"
            render={({ field }) =>
            <FormItem data-style-id="stylo-217">
                                    <FormLabel data-style-id="stylo-218">Relevance</FormLabel>
                                    <FormControl data-style-id="stylo-219">
                                        <Input data-style-id="stylo-220" placeholder="e.g., Career goals" {...field} />
                                    </FormControl>
                                    <FormMessage data-style-id="stylo-221" />
                                </FormItem>
            } />


                        <FormField data-style-id="stylo-222"
            control={form.control}
            name="notes"
            render={({ field }) =>
            <FormItem data-style-id="stylo-223">
                                    <FormLabel data-style-id="stylo-224">Notes</FormLabel>
                                    <FormControl data-style-id="stylo-225">
                                        <Textarea data-style-id="stylo-226"
                placeholder="Freeform notes about this project..."
                className="min-h-[80px]"
                {...field} />

                                    </FormControl>
                                    <FormDescription data-style-id="stylo-227">Additional notes separate from description</FormDescription>
                                    <FormMessage data-style-id="stylo-228" />
                                </FormItem>
            } />


                        <div data-style-id="stylo-229" id="el-68" className="space-y-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                            <FormField data-style-id="stylo-230"
              control={form.control}
              name="useManualProgress"
              render={({ field }) =>
              <FormItem data-style-id="stylo-231" className="flex flex-row items-center justify-between">
                                        <div data-style-id="stylo-232" id="el-69" className="space-y-0.5">
                                            <FormLabel data-style-id="stylo-233">Manual Progress Override</FormLabel>
                                            <FormDescription data-style-id="stylo-234">
                                                Set progress manually instead of auto-calculating from tasks
                                            </FormDescription>
                                        </div>
                                        <FormControl data-style-id="stylo-235">
                                            <Switch data-style-id="stylo-236"
                  checked={field.value}
                  onCheckedChange={field.onChange} />

                                        </FormControl>
                                    </FormItem>
              } />


                            {useManualProgress &&
              <FormField data-style-id="stylo-237"
              control={form.control}
              name="manualProgress"
              render={({ field }) =>
              <FormItem data-style-id="stylo-238">
                                            <div data-style-id="stylo-239" id="el-70" className="flex justify-between items-center">
                                                <FormLabel data-style-id="stylo-240">Progress: {field.value}%</FormLabel>
                                            </div>
                                            <FormControl data-style-id="stylo-241">
                                                <Slider data-style-id="stylo-242"
                  value={[field.value || 0]}
                  onValueChange={(values) => field.onChange(values[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full" />

                                            </FormControl>
                                            <FormMessage data-style-id="stylo-243" />
                                        </FormItem>
              } />

              }
                        </div>

                        <DialogFooter data-style-id="stylo-244">
                            <Button data-style-id="stylo-245" type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button data-style-id="stylo-246" type="submit">{isEditMode ? 'Save Changes' : 'Create Project'}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>);

}