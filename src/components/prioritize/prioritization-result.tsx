import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, BotMessageSquare } from 'lucide-react';
import type { PrioritizeProjectsOutput } from '@/ai/flows/intelligent-project-prioritization';
import { cn } from '@/lib/utils';

interface PrioritizationResultProps {
  result: PrioritizeProjectsOutput | null;
  isLoading: boolean;
  error: string | null;
}

function BasicMarkdown({ text, className }: {text: string;className?: string;}) {
  return (
    <div data-style-id="stylo-574" id="el-160" className={cn("space-y-4 text-sm", className)}>
            {text.split('\n').map((line, i) => {
        if (line.startsWith('### ')) {
          return <h3 data-style-id="stylo-575" id="el-161" key={i} className="font-semibold text-lg mt-4 border-b pb-1">{line.substring(4)}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p data-style-id="stylo-576" id="el-162" key={i} className="font-bold">{line.substring(2, line.length - 2)}</p>;
        }
        if (line.startsWith('* ')) {
          return <div data-style-id="stylo-577" id="el-163" key={i} className="flex gap-2"><span data-style-id="stylo-578" id="el-164" className="text-muted-foreground">&bull;</span><p data-style-id="stylo-579" id="el-165">{line.substring(2)}</p></div>;
        }
        if (line.match(/^\d+\. /)) {
          return <div data-style-id="stylo-580" id="el-166" key={i} className="flex gap-2"><span data-style-id="stylo-581" id="el-167" className="font-medium">{line.substring(0, line.indexOf(' ') + 1)}</span><p data-style-id="stylo-582" id="el-168">{line.substring(line.indexOf(' ') + 1)}</p></div>;
        }
        if (line.trim() === '') {
          return null;
        }
        return <p data-style-id="stylo-583" id="el-169" key={i}>{line}</p>;
      })}
        </div>);

}


export function PrioritizationResult({ result, isLoading, error }: PrioritizationResultProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div data-style-id="stylo-584" id="el-170" className="space-y-4 p-4">
                    <Skeleton data-style-id="stylo-585" className="h-8 w-1/2" />
                    <Skeleton data-style-id="stylo-586" className="h-4 w-full" />
                    <Skeleton data-style-id="stylo-587" className="h-4 w-4/5" />
                    <Skeleton data-style-id="stylo-588" className="h-4 w-full" />
                </div>);

    }

    if (error) {
      return (
        <Alert data-style-id="stylo-589" variant="destructive">
                    <AlertCircle data-style-id="stylo-590" className="h-4 w-4" />
                    <AlertTitle data-style-id="stylo-591">Error</AlertTitle>
                    <AlertDescription data-style-id="stylo-592">{error}</AlertDescription>
                </Alert>);

    }

    if (result) {
      return (
        <div data-style-id="stylo-593" id="prioritize-result-content" className="animate-in fade-in-50">
                    <h3 data-style-id="stylo-594" id="el-171" className="font-bold text-lg mb-2">Prioritized List</h3>
                    <ol data-style-id="stylo-595" id="el-172" className="list-decimal list-inside space-y-1 mb-6 rounded-md border p-4">
                        {result.prioritizedList.map((project, index) =>
            <li data-style-id="stylo-596" id="el-173" key={index} className="pl-2 font-medium">{project}</li>
            )}
                    </ol>
                    <h3 data-style-id="stylo-597" id="el-174" className="font-bold text-lg mb-2">Reasoning</h3>
                    <div data-style-id="stylo-598" id="el-175" className="p-4 rounded-md border bg-muted/20">
                        <BasicMarkdown data-style-id="stylo-599" text={result.reasoning} />
                    </div>
                </div>);

    }

    return (
      <div data-style-id="stylo-600" id="el-176" className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <BotMessageSquare data-style-id="stylo-601" className="h-12 w-12 mb-4" />
                <p data-style-id="stylo-602" id="el-177" className="text-lg font-medium">AI Analysis</p>
                <p data-style-id="stylo-603" id="el-178">Your AI-powered project priority list will appear here.</p>
            </div>);

  };

  return (
    <Card data-style-id="stylo-604" id="prioritize-result-card" className="min-h-[400px]">
            <CardHeader data-style-id="stylo-605">
                <CardTitle data-style-id="stylo-606">AI Recommendation</CardTitle>
                 <CardDescription data-style-id="stylo-607">Here's what the AI suggests based on your input.</CardDescription>
            </CardHeader>
            <CardContent data-style-id="stylo-608" id="prioritize-result">
                {renderContent()}
            </CardContent>
        </Card>);

}