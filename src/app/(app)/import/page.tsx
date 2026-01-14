'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, FolderInput, Sparkles, AlertCircle, CheckCircle2, FileWarning, Inbox, FileText, HelpCircle } from 'lucide-react';
import { scanAndAnalyzeFiles, GeneratedProject } from '@/lib/actions';
import { useProjects } from '@/context/project-context';
import { DOMAINS } from '@/lib/domains';
import { parseInboxText, inboxItemsToProjects } from '@/lib/inbox-parser';
import type { Project, Task } from '@/lib/types';

// Type for inbox-parsed projects (simpler than AI-generated)
type InboxProject = {
  name: string;
  description: string;
  domain?: Project['domain'];
  tags: string[];
  tasks: Task[];
};

export default function ImportPage() {
  // File scan state
  const [pathsInput, setPathsInput] = useState('');
  const [userContext, setUserContext] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    projects: GeneratedProject[];
    skipped: {path: string;reason: string;}[];
  } | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set());

  // Inbox state
  const [inboxInput, setInboxInput] = useState('');
  const [inboxProjects, setInboxProjects] = useState<InboxProject[] | null>(null);
  const [selectedInboxProjects, setSelectedInboxProjects] = useState<Set<number>>(new Set());
  const [isImportingInbox, setIsImportingInbox] = useState(false);

  const { projects: existingProjects, addProject } = useProjects();

  const handleScan = async () => {
    setError(null);
    setScanResult(null);
    setSelectedProjects(new Set());
    setIsScanning(true);

    try {
      const paths = pathsInput.
      split('\n').
      map((p) => p.trim()).
      filter((p) => p.length > 0);

      if (paths.length === 0) {
        setError('Please enter at least one file path');
        return;
      }

      const result = await scanAndAnalyzeFiles({
        filePaths: paths,
        existingProjectNames: existingProjects.map((p) => p.name),
        userContext: userContext || undefined
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setScanResult(result.data);
      // Select all by default
      setSelectedProjects(new Set(result.data.projects.map((_, i) => i)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred');
    } finally {
      setIsScanning(false);
    }
  };

  const handleImport = async () => {
    if (!scanResult) return;

    setIsImporting(true);
    setError(null);

    try {
      const projectsToImport = scanResult.projects.filter((_, i) => selectedProjects.has(i));

      for (const genProject of projectsToImport) {
        const project: Omit<Project, 'id' | 'updatedAt' | 'createdAt'> = {
          name: genProject.name,
          description: genProject.description,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks out
          importance: genProject.importance,
          size: genProject.size,
          relevance: genProject.relevance,
          domain: genProject.domain,
          status: 'active',
          tags: genProject.tags,
          tasks: genProject.tasks,
          milestones: [],
          sourcePaths: genProject.sourcePaths
        };

        addProject(project);
      }

      // Clear form after successful import
      setPathsInput('');
      setUserContext('');
      setScanResult(null);
      setSelectedProjects(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to import projects');
    } finally {
      setIsImporting(false);
    }
  };

  const toggleProject = (index: number) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedProjects(newSelected);
  };

  const toggleAll = () => {
    if (!scanResult) return;
    if (selectedProjects.size === scanResult.projects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(scanResult.projects.map((_, i) => i)));
    }
  };

  // Inbox handlers
  const handleParseInbox = () => {
    setError(null);
    const items = parseInboxText(inboxInput);
    if (items.length === 0) {
      setError('No valid items found. Use format: "- Task @domain #tag"');
      return;
    }
    const result = inboxItemsToProjects(items);
    setInboxProjects(result.projects);
    setSelectedInboxProjects(new Set(result.projects.map((_, i) => i)));
  };

  const handleImportInbox = async () => {
    if (!inboxProjects) return;
    setIsImportingInbox(true);
    setError(null);

    try {
      const toImport = inboxProjects.filter((_, i) => selectedInboxProjects.has(i));

      for (const p of toImport) {
        const project: Omit<Project, 'id' | 'updatedAt' | 'createdAt'> = {
          name: p.name,
          description: p.description,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          importance: 5,
          size: 4,
          relevance: '',
          domain: p.domain,
          status: 'active',
          tags: p.tags,
          tasks: p.tasks,
          milestones: []
        };
        addProject(project);
      }

      setInboxInput('');
      setInboxProjects(null);
      setSelectedInboxProjects(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to import');
    } finally {
      setIsImportingInbox(false);
    }
  };

  const toggleInboxProject = (index: number) => {
    const newSelected = new Set(selectedInboxProjects);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedInboxProjects(newSelected);
  };

  return (
    <div data-style-id="stylo-910" id="el-220" className="space-y-6 max-w-4xl mx-auto">
      <div data-style-id="stylo-911" id="el-221" className="flex items-center justify-between">
        <div data-style-id="stylo-912" id="el-222" className="flex items-center gap-3">
          <div data-style-id="stylo-913" id="el-223" className="p-2 rounded-lg bg-primary/10">
            <FolderInput data-style-id="stylo-914" className="h-6 w-6 text-primary" />
          </div>
          <div data-style-id="stylo-915" id="el-224">
            <h1 data-style-id="stylo-916" id="el-225" className="text-2xl font-bold tracking-tight">AI Import</h1>
            <p data-style-id="stylo-917" id="el-226" className="text-muted-foreground">
              Analyze files and create projects automatically using AI
            </p>
          </div>
        </div>

        <Dialog data-style-id="stylo-918">
          <DialogTrigger data-style-id="stylo-919" asChild>
            <Button data-style-id="stylo-920" variant="outline" size="sm" className="gap-2">
              <HelpCircle data-style-id="stylo-921" className="h-4 w-4" />
              How it works
            </Button>
          </DialogTrigger>
          <DialogContent data-style-id="stylo-922" className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader data-style-id="stylo-923">
              <DialogTitle data-style-id="stylo-924">AI Import Guide</DialogTitle>
              <DialogDescription data-style-id="stylo-925">
                Two ways to quickly create projects from your files and ideas
              </DialogDescription>
            </DialogHeader>

            <div data-style-id="stylo-926" id="el-227" className="space-y-6 mt-4">
              {/* Scan Files Section */}
              <div data-style-id="stylo-927" id="el-228" className="space-y-3">
                <h3 data-style-id="stylo-928" id="el-229" className="font-semibold flex items-center gap-2">
                  <FileText data-style-id="stylo-929" className="h-5 w-5 text-primary" />
                  Scan Files
                </h3>
                <p data-style-id="stylo-930" id="el-230" className="text-sm text-muted-foreground">
                  Point the AI at files on your computer. It reads the content and creates projects with relevant tasks, tags, and domain categorization.
                </p>

                <div data-style-id="stylo-931" id="el-231" className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p data-style-id="stylo-932" id="el-232" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example file paths:</p>
                  <pre data-style-id="stylo-933" id="el-233" className="text-sm font-mono bg-background rounded p-3 overflow-x-auto">{`/Users/you/Documents/album-concept.md
/Users/you/Code/my-app/README.md
/Users/you/Writing/poem-draft.txt
~/Desktop/project-notes.md`}</pre>
                </div>

                <div data-style-id="stylo-934" id="el-234" className="text-sm space-y-2">
                  <p data-style-id="stylo-935" id="el-235" className="font-medium">The AI will automatically detect:</p>
                  <ul data-style-id="stylo-936" id="el-236" className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li data-style-id="stylo-937" id="el-237"><strong data-style-id="stylo-938" id="el-238">Domain</strong> from file type (.ly → music, .py → coding, etc.)</li>
                    <li data-style-id="stylo-939" id="el-239"><strong data-style-id="stylo-940" id="el-240">Tasks</strong> from TODOs, action items, or logical next steps</li>
                    <li data-style-id="stylo-941" id="el-241"><strong data-style-id="stylo-942" id="el-242">Tags</strong> from keywords in the content</li>
                    <li data-style-id="stylo-943" id="el-243"><strong data-style-id="stylo-944" id="el-244">Priority</strong> based on urgency cues in the text</li>
                  </ul>
                </div>

                <div data-style-id="stylo-945" id="el-245" className="bg-muted/50 rounded-lg p-4">
                  <p data-style-id="stylo-946" id="el-246" className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Domain detection by file type:</p>
                  <div data-style-id="stylo-947" id="el-247" className="grid grid-cols-2 gap-2 text-sm">
                    <div data-style-id="stylo-948" id="el-248"><code data-style-id="stylo-949" id="el-249" className="text-xs">.ly .midi .wav</code> → Music</div>
                    <div data-style-id="stylo-950" id="el-250"><code data-style-id="stylo-951" id="el-251" className="text-xs">.ts .js .py .rs</code> → Coding</div>
                    <div data-style-id="stylo-952" id="el-252"><code data-style-id="stylo-953" id="el-253" className="text-xs">.script</code> → Theatre</div>
                    <div data-style-id="stylo-954" id="el-254"><code data-style-id="stylo-955" id="el-255" className="text-xs">.psd .sketch .fig</code> → Visual Art</div>
                    <div data-style-id="stylo-956" id="el-256"><code data-style-id="stylo-957" id="el-257" className="text-xs">.md .txt</code> → (analyzed by content)</div>
                  </div>
                </div>
              </div>

              <Separator data-style-id="stylo-958" />

              {/* Quick Add Section */}
              <div data-style-id="stylo-959" id="el-258" className="space-y-3">
                <h3 data-style-id="stylo-960" id="el-259" className="font-semibold flex items-center gap-2">
                  <Inbox data-style-id="stylo-961" className="h-5 w-5 text-primary" />
                  Quick Add (Inbox Format)
                </h3>
                <p data-style-id="stylo-962" id="el-260" className="text-sm text-muted-foreground">
                  Dump ideas quickly using a simple text format. No AI call needed—instant parsing.
                </p>

                <div data-style-id="stylo-963" id="el-261" className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p data-style-id="stylo-964" id="el-262" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example inbox text:</p>
                  <pre data-style-id="stylo-965" id="el-263" className="text-sm font-mono bg-background rounded p-3 overflow-x-auto">{`- [ ] Finish album cover design @visual-art #urgent
- Record vocals for track 3 @music #studio
- Fix authentication bug @coding #backend
- Schedule dentist appointment @health
- Research Baroque counterpoint @theory @music
- Outline new screenplay @theatre #draft`}</pre>
                </div>

                <div data-style-id="stylo-966" id="el-264" className="text-sm space-y-2">
                  <p data-style-id="stylo-967" id="el-265" className="font-medium">Format syntax:</p>
                  <ul data-style-id="stylo-968" id="el-266" className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li data-style-id="stylo-969" id="el-267"><code data-style-id="stylo-970" id="el-268" className="text-xs bg-muted px-1 rounded">- [ ]</code> or <code data-style-id="stylo-971" id="el-269" className="text-xs bg-muted px-1 rounded">-</code> starts a new item</li>
                    <li data-style-id="stylo-972" id="el-270"><code data-style-id="stylo-973" id="el-271" className="text-xs bg-muted px-1 rounded">@domain</code> assigns a domain (music, coding, health, etc.)</li>
                    <li data-style-id="stylo-974" id="el-272"><code data-style-id="stylo-975" id="el-273" className="text-xs bg-muted px-1 rounded">#tag</code> adds tags (can use multiple)</li>
                    <li data-style-id="stylo-976" id="el-274">Items are grouped by domain into projects</li>
                  </ul>
                </div>

                <div data-style-id="stylo-977" id="el-275" className="bg-muted/50 rounded-lg p-4">
                  <p data-style-id="stylo-978" id="el-276" className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Available domains:</p>
                  <div data-style-id="stylo-979" id="el-277" className="flex flex-wrap gap-2">
                    {Object.entries(DOMAINS).map(([key, config]) =>
                    <Badge data-style-id="stylo-980" key={key} variant="outline" style={{ borderColor: config.color, color: config.color }}>
                        @{key}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator data-style-id="stylo-981" />

              {/* Tips Section */}
              <div data-style-id="stylo-982" id="el-278" className="space-y-3">
                <h3 data-style-id="stylo-983" id="el-279" className="font-semibold">Tips</h3>
                <ul data-style-id="stylo-984" id="el-280" className="text-sm space-y-2 text-muted-foreground">
                  <li data-style-id="stylo-985" id="el-281" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-986" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-987" id="el-282">Add <strong data-style-id="stylo-988" id="el-283">context</strong> in the Scan Files tab to help the AI understand your goals</span>
                  </li>
                  <li data-style-id="stylo-989" id="el-284" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-990" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-991" id="el-285">Projects track their <strong data-style-id="stylo-992" id="el-286">source files</strong>, so you can re-scan to update them later</span>
                  </li>
                  <li data-style-id="stylo-993" id="el-287" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-994" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-995" id="el-288">Use Quick Add for <strong data-style-id="stylo-996" id="el-289">brain dumps</strong>—type fast, organize later</span>
                  </li>
                  <li data-style-id="stylo-997" id="el-290" className="flex gap-2">
                    <CheckCircle2 data-style-id="stylo-998" className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-style-id="stylo-999" id="el-291">Review and <strong data-style-id="stylo-1000" id="el-292">deselect</strong> any projects you don't want before importing</span>
                  </li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs data-style-id="stylo-1001" defaultValue="files" className="w-full">
        <TabsList data-style-id="stylo-1002" className="grid w-full grid-cols-2">
          <TabsTrigger data-style-id="stylo-1003" value="files" className="flex items-center gap-2">
            <FileText data-style-id="stylo-1004" className="h-4 w-4" />
            Scan Files
          </TabsTrigger>
          <TabsTrigger data-style-id="stylo-1005" value="inbox" className="flex items-center gap-2">
            <Inbox data-style-id="stylo-1006" className="h-4 w-4" />
            Quick Add
          </TabsTrigger>
        </TabsList>

        <TabsContent data-style-id="stylo-1007" value="files" className="space-y-6 mt-6">
          <Card data-style-id="stylo-1008">
            <CardHeader data-style-id="stylo-1009">
              <CardTitle data-style-id="stylo-1010" className="text-lg">File Paths</CardTitle>
              <CardDescription data-style-id="stylo-1011">
                Enter file paths to analyze (one per line). The AI will read each file and suggest projects.
              </CardDescription>
            </CardHeader>
        <CardContent data-style-id="stylo-1012" className="space-y-4">
          <Textarea data-style-id="stylo-1013"
              placeholder={`/Users/you/Documents/project-idea.md
/Users/you/Music/new-song.ly
/Users/you/Code/app/README.md`}
              value={pathsInput}
              onChange={(e) => setPathsInput(e.target.value)}
              rows={6}
              className="font-mono text-sm" />


          <div data-style-id="stylo-1014" id="el-293">
            <label data-style-id="stylo-1015" id="el-294" className="text-sm font-medium mb-2 block">Context (optional)</label>
            <Textarea data-style-id="stylo-1016"
                placeholder="Add context about your goals or preferences to help the AI..."
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                rows={2} />

          </div>
        </CardContent>
        <CardFooter data-style-id="stylo-1017">
          <Button data-style-id="stylo-1018" onClick={handleScan} disabled={isScanning || !pathsInput.trim()}>
            {isScanning ?
                <>
                <Loader2 data-style-id="stylo-1019" className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </> :

                <>
                <Sparkles data-style-id="stylo-1020" className="mr-2 h-4 w-4" />
                Scan Files
              </>
                }
          </Button>
        </CardFooter>
      </Card>

      {scanResult &&
          <>
          {scanResult.skipped.length > 0 &&
            <Alert data-style-id="stylo-1021">
              <FileWarning data-style-id="stylo-1022" className="h-4 w-4" />
              <AlertTitle data-style-id="stylo-1023">Skipped Files ({scanResult.skipped.length})</AlertTitle>
              <AlertDescription data-style-id="stylo-1024">
                <ul data-style-id="stylo-1025" id="el-295" className="mt-2 space-y-1 text-sm">
                  {scanResult.skipped.map((s, i) =>
                  <li data-style-id="stylo-1026" id="el-296" key={i} className="font-mono">
                      <span data-style-id="stylo-1027" id="el-297" className="text-muted-foreground">{s.path}:</span> {s.reason}
                    </li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
            }

          {scanResult.projects.length > 0 ?
            <Card data-style-id="stylo-1028">
              <CardHeader data-style-id="stylo-1029">
                <div data-style-id="stylo-1030" id="el-298" className="flex items-center justify-between">
                  <div data-style-id="stylo-1031" id="el-299">
                    <CardTitle data-style-id="stylo-1032" className="text-lg flex items-center gap-2">
                      <CheckCircle2 data-style-id="stylo-1033" className="h-5 w-5 text-green-500" />
                      Generated Projects ({scanResult.projects.length})
                    </CardTitle>
                    <CardDescription data-style-id="stylo-1034">
                      Review and select projects to import
                    </CardDescription>
                  </div>
                  <Button data-style-id="stylo-1035" variant="outline" size="sm" onClick={toggleAll}>
                    {selectedProjects.size === scanResult.projects.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent data-style-id="stylo-1036">
                <ScrollArea data-style-id="stylo-1037" className="h-[400px] pr-4">
                  <div data-style-id="stylo-1038" id="el-300" className="space-y-4">
                    {scanResult.projects.map((project, index) => {
                      const domainConfig = project.domain ? DOMAINS[project.domain] : null;
                      const isSelected = selectedProjects.has(index);

                      return (
                        <div data-style-id="stylo-1039" id="el-301"
                        key={index}
                        className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/50'}`
                        }
                        onClick={() => toggleProject(index)}>

                          <div data-style-id="stylo-1040" id="el-302" className="flex items-start gap-3">
                            <Checkbox data-style-id="stylo-1041"
                            checked={isSelected}
                            onCheckedChange={() => toggleProject(index)}
                            onClick={(e) => e.stopPropagation()} />

                            <div data-style-id="stylo-1042" id="el-303" className="flex-1 min-w-0">
                              <div data-style-id="stylo-1043" id="el-304" className="flex items-center gap-2 flex-wrap">
                                <h3 data-style-id="stylo-1044" id="el-305" className="font-semibold">{project.name}</h3>
                                {domainConfig &&
                                <Badge data-style-id="stylo-1045"
                                variant="outline"
                                style={{
                                  borderColor: domainConfig.color,
                                  color: domainConfig.color
                                }}>

                                    {domainConfig.label}
                                  </Badge>
                                }
                                <Badge data-style-id="stylo-1046" variant="secondary">
                                  {project.importance}/10 priority
                                </Badge>
                                <Badge data-style-id="stylo-1047" variant="secondary">
                                  ~{project.size}h
                                </Badge>
                              </div>
                              <p data-style-id="stylo-1048" id="el-306" className="text-sm text-muted-foreground mt-1">
                                {project.description}
                              </p>
                              {project.tags.length > 0 &&
                              <div data-style-id="stylo-1049" id="el-307" className="flex gap-1 mt-2 flex-wrap">
                                  {project.tags.map((tag, i) =>
                                <Badge data-style-id="stylo-1050" key={i} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                )}
                                </div>
                              }
                              {project.tasks.length > 0 &&
                              <div data-style-id="stylo-1051" id="el-308" className="mt-3">
                                  <p data-style-id="stylo-1052" id="el-309" className="text-xs text-muted-foreground mb-1">
                                    Tasks ({project.tasks.length}):
                                  </p>
                                  <ul data-style-id="stylo-1053" id="el-310" className="text-sm space-y-1">
                                    {project.tasks.slice(0, 3).map((task, i) =>
                                  <li data-style-id="stylo-1054" id="el-311" key={i} className="flex items-center gap-2">
                                        <span data-style-id="stylo-1055" id="el-312" className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                                        {task.title}
                                      </li>
                                  )}
                                    {project.tasks.length > 3 &&
                                  <li data-style-id="stylo-1056" id="el-313" className="text-muted-foreground text-xs">
                                        +{project.tasks.length - 3} more tasks
                                      </li>
                                  }
                                  </ul>
                                </div>
                              }
                              <p data-style-id="stylo-1057" id="el-314" className="text-xs text-muted-foreground mt-2 font-mono truncate">
                                Source: {project.sourcePaths.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>);

                    })}
                  </div>
                </ScrollArea>
              </CardContent>
              <Separator data-style-id="stylo-1058" />
              <CardFooter data-style-id="stylo-1059" className="pt-4">
                <Button data-style-id="stylo-1060"
                onClick={handleImport}
                disabled={isImporting || selectedProjects.size === 0}
                className="w-full">

                  {isImporting ?
                  <>
                      <Loader2 data-style-id="stylo-1061" className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </> :

                  <>
                      Import {selectedProjects.size} Project{selectedProjects.size !== 1 ? 's' : ''}
                    </>
                  }
                </Button>
              </CardFooter>
            </Card> :

            <Alert data-style-id="stylo-1062">
              <AlertCircle data-style-id="stylo-1063" className="h-4 w-4" />
              <AlertTitle data-style-id="stylo-1064">No Projects Generated</AlertTitle>
              <AlertDescription data-style-id="stylo-1065">
                The AI didn't find any files suitable for conversion to projects.
                Try different files or add more context.
              </AlertDescription>
            </Alert>
            }
        </>
          }
        </TabsContent>

        <TabsContent data-style-id="stylo-1066" value="inbox" className="space-y-6 mt-6">
          <Card data-style-id="stylo-1067">
            <CardHeader data-style-id="stylo-1068">
              <CardTitle data-style-id="stylo-1069" className="text-lg">Quick Add</CardTitle>
              <CardDescription data-style-id="stylo-1070">
                Paste or type items in inbox format. Use @domain and #tags to categorize.
              </CardDescription>
            </CardHeader>
            <CardContent data-style-id="stylo-1071" className="space-y-4">
              <Textarea data-style-id="stylo-1072"
              placeholder={`- [ ] Finish album artwork @visual-art #urgent
- Schedule dentist @health
- Fix login bug @coding #actiondeck
- Build new synth patch @music
- Research color theory @theory @visual-art`}
              value={inboxInput}
              onChange={(e) => setInboxInput(e.target.value)}
              rows={8}
              className="font-mono text-sm" />

              <div data-style-id="stylo-1073" id="el-315" className="text-xs text-muted-foreground space-y-1">
                <p data-style-id="stylo-1074" id="el-316"><strong data-style-id="stylo-1075" id="el-317">Format:</strong> Lines starting with - or - [ ] become items</p>
                <p data-style-id="stylo-1076" id="el-318"><strong data-style-id="stylo-1077" id="el-319">@domain:</strong> music, poetry, theatre, theory, coding, visual-art, health, home</p>
                <p data-style-id="stylo-1078" id="el-320"><strong data-style-id="stylo-1079" id="el-321">#tag:</strong> Add any tags you want</p>
              </div>
            </CardContent>
            <CardFooter data-style-id="stylo-1080">
              <Button data-style-id="stylo-1081" onClick={handleParseInbox} disabled={!inboxInput.trim()}>
                <Inbox data-style-id="stylo-1082" className="mr-2 h-4 w-4" />
                Parse Items
              </Button>
            </CardFooter>
          </Card>

          {inboxProjects && inboxProjects.length > 0 &&
          <Card data-style-id="stylo-1083">
              <CardHeader data-style-id="stylo-1084">
                <CardTitle data-style-id="stylo-1085" className="text-lg flex items-center gap-2">
                  <CheckCircle2 data-style-id="stylo-1086" className="h-5 w-5 text-green-500" />
                  Parsed Projects ({inboxProjects.length})
                </CardTitle>
                <CardDescription data-style-id="stylo-1087">
                  Review and import your items
                </CardDescription>
              </CardHeader>
              <CardContent data-style-id="stylo-1088">
                <div data-style-id="stylo-1089" id="el-322" className="space-y-3">
                  {inboxProjects.map((project, index) => {
                  const domainConfig = project.domain ? DOMAINS[project.domain] : null;
                  const isSelected = selectedInboxProjects.has(index);

                  return (
                    <div data-style-id="stylo-1090" id="el-323"
                    key={index}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'}`
                    }
                    onClick={() => toggleInboxProject(index)}>

                        <div data-style-id="stylo-1091" id="el-324" className="flex items-start gap-3">
                          <Checkbox data-style-id="stylo-1092"
                        checked={isSelected}
                        onCheckedChange={() => toggleInboxProject(index)}
                        onClick={(e) => e.stopPropagation()} />

                          <div data-style-id="stylo-1093" id="el-325" className="flex-1">
                            <div data-style-id="stylo-1094" id="el-326" className="flex items-center gap-2 flex-wrap">
                              <span data-style-id="stylo-1095" id="el-327" className="font-medium">{project.name}</span>
                              {domainConfig &&
                            <Badge data-style-id="stylo-1096"
                            variant="outline"
                            style={{ borderColor: domainConfig.color, color: domainConfig.color }}>

                                  {domainConfig.label}
                                </Badge>
                            }
                              {project.tags.map((tag, i) =>
                            <Badge data-style-id="stylo-1097" key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                            )}
                            </div>
                            {project.tasks.length > 0 &&
                          <p data-style-id="stylo-1098" id="el-328" className="text-sm text-muted-foreground mt-1">
                                {project.tasks.length} task{project.tasks.length !== 1 ? 's' : ''}
                              </p>
                          }
                          </div>
                        </div>
                      </div>);

                })}
                </div>
              </CardContent>
              <Separator data-style-id="stylo-1099" />
              <CardFooter data-style-id="stylo-1100" className="pt-4">
                <Button data-style-id="stylo-1101"
              onClick={handleImportInbox}
              disabled={isImportingInbox || selectedInboxProjects.size === 0}
              className="w-full">

                  {isImportingInbox ?
                <>
                      <Loader2 data-style-id="stylo-1102" className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </> :

                <>
                      Import {selectedInboxProjects.size} Project{selectedInboxProjects.size !== 1 ? 's' : ''}
                    </>
                }
                </Button>
              </CardFooter>
            </Card>
          }
        </TabsContent>
      </Tabs>

      {error &&
      <Alert data-style-id="stylo-1103" variant="destructive">
          <AlertCircle data-style-id="stylo-1104" className="h-4 w-4" />
          <AlertTitle data-style-id="stylo-1105">Error</AlertTitle>
          <AlertDescription data-style-id="stylo-1106">{error}</AlertDescription>
        </Alert>
      }
    </div>);

}