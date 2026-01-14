'use client';

import { useState, useRef, useEffect } from 'react';
import { useToday, getCurrentMinute } from '@/context/today-context';
import { useProjects } from '@/context/project-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MessageSquare, Send, X, Loader2, Trash2, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleTodayChat } from '@/lib/actions';
import type { TodayChatOutput } from '@/ai/flows/today-chat-flow';

type SuggestedAction = NonNullable<TodayChatOutput['suggestedActions']>[number];

export function AIChatPanel() {
  const {
    isChatOpen,
    setChatOpen,
    chatHistory,
    addChatMessage,
    clearChatHistory,
    items,
    currentDate,
    aiTaskList,
    removeAITask,
    clearAITaskList,
    addItem,
    updateItem,
    deleteItem,
    toggleItemComplete
  } = useToday();
  const { projects } = useProjects();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskListOpen, setIsTaskListOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Execute suggested actions from AI
  const executeActions = (actions: SuggestedAction[]) => {
    for (const action of actions) {
      switch (action.type) {
        case 'add_item':
          if (action.title && action.startMinute !== undefined && action.durationMinutes !== undefined) {
            addItem({
              title: action.title,
              startMinute: action.startMinute,
              durationMinutes: action.durationMinutes,
              source: { type: 'manual' },
              completed: false
            });
          }
          break;
        case 'move_item':
          if (action.itemId && action.startMinute !== undefined) {
            const item = items.find((i) => i.id === action.itemId);
            if (item) {
              updateItem({
                ...item,
                startMinute: action.startMinute
              });
            }
          }
          break;
        case 'resize_item':
          if (action.itemId && action.durationMinutes !== undefined) {
            const item = items.find((i) => i.id === action.itemId);
            if (item) {
              updateItem({
                ...item,
                durationMinutes: action.durationMinutes
              });
            }
          }
          break;
        case 'remove_item':
          if (action.itemId) {
            deleteItem(action.itemId);
          }
          break;
        case 'complete_item':
          if (action.itemId) {
            toggleItemComplete(action.itemId);
          }
          break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');

    // Add user message
    addChatMessage({ role: 'user', content: userMessage });

    setIsLoading(true);

    try {
      const result = await handleTodayChat({
        message: userMessage,
        chatHistory: chatHistory.map((m) => ({ role: m.role, content: m.content })),
        currentSchedule: items,
        availableProjects: projects.map((p) => ({
          name: p.name,
          deadline: p.deadline,
          importance: p.importance,
          tasks: p.tasks
        })),
        currentDate,
        currentTimeMinute: getCurrentMinute(),
        aiTaskList: aiTaskList.map((t) => ({ title: t.title }))
      });

      if (result.success && result.data) {
        addChatMessage({ role: 'assistant', content: result.data.response });

        // Execute suggested actions if present
        if (result.data.suggestedActions && result.data.suggestedActions.length > 0) {
          executeActions(result.data.suggestedActions);
        }
      } else {
        addChatMessage({
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        });
      }
    } catch (error) {
      console.error('[chat] Error:', error);
      addChatMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return (
      <Button data-style-id="stylo-677"
      variant="outline"
      size="icon"
      className="fixed bottom-20 right-6 h-12 w-12 rounded-full shadow-lg z-40"
      onClick={() => setChatOpen(true)}>

        <MessageSquare data-style-id="stylo-678" className="h-5 w-5" />
      </Button>);

  }

  return (
    <Card data-style-id="stylo-679" className="w-80 flex-shrink-0 flex flex-col h-[calc(100vh-200px)] max-h-[600px]">
      <CardHeader data-style-id="stylo-680" className="pb-2 flex-shrink-0">
        <div data-style-id="stylo-681" id="el-373" className="flex items-center justify-between">
          <CardTitle data-style-id="stylo-682" className="text-lg flex items-center gap-2">
            <Sparkles data-style-id="stylo-683" className="h-4 w-4" />
            AI Assistant
          </CardTitle>
          <div data-style-id="stylo-684" id="el-374" className="flex items-center gap-1">
            {chatHistory.length > 0 &&
            <Button data-style-id="stylo-685"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={clearChatHistory}
            title="Clear chat">

                <Trash2 data-style-id="stylo-686" className="h-4 w-4" />
              </Button>
            }
            <Button data-style-id="stylo-687"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setChatOpen(false)}>

              <X data-style-id="stylo-688" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent data-style-id="stylo-689" className="flex-1 flex flex-col p-3 pt-0 overflow-hidden">
        {/* AI Task List */}
        {aiTaskList.length > 0 &&
        <Collapsible data-style-id="stylo-690" open={isTaskListOpen} onOpenChange={setIsTaskListOpen} className="mb-3">
            <CollapsibleTrigger data-style-id="stylo-691" asChild>
              <Button data-style-id="stylo-692" variant="ghost" size="sm" className="w-full justify-between h-8 px-2">
                <span data-style-id="stylo-693" id="el-375" className="text-xs font-medium flex items-center gap-1">
                  Tasks for AI
                  <Badge data-style-id="stylo-694" variant="secondary" className="ml-1 h-5 px-1.5">
                    {aiTaskList.length}
                  </Badge>
                </span>
                <ChevronDown data-style-id="stylo-695" className={cn('h-4 w-4 transition-transform', isTaskListOpen && 'rotate-180')} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent data-style-id="stylo-696">
              <div data-style-id="stylo-697" id="el-376" className="space-y-1 mt-1 p-2 bg-muted/50 rounded-md">
                {aiTaskList.map((task) =>
              <div data-style-id="stylo-698" id="el-377"
              key={task.id}
              className="flex items-center justify-between gap-2 text-xs py-1">

                    <span data-style-id="stylo-699" id="el-378" className="truncate flex-1">{task.title}</span>
                    <Button data-style-id="stylo-700"
                variant="ghost"
                size="icon"
                className="h-5 w-5 flex-shrink-0"
                onClick={() => removeAITask(task.id)}>

                      <X data-style-id="stylo-701" className="h-3 w-3" />
                    </Button>
                  </div>
              )}
                <Button data-style-id="stylo-702"
              variant="ghost"
              size="sm"
              className="w-full h-6 text-xs text-muted-foreground mt-1"
              onClick={clearAITaskList}>

                  Clear all
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        }

        {/* Messages */}
        <ScrollArea data-style-id="stylo-703" className="flex-1 pr-3" ref={scrollRef}>
          <div data-style-id="stylo-704" id="el-379" className="space-y-3">
            {chatHistory.length === 0 ?
            <div data-style-id="stylo-705" id="el-380" className="text-center text-muted-foreground py-8">
                <Sparkles data-style-id="stylo-706" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p data-style-id="stylo-707" id="el-381" className="text-sm">Ask me about your schedule!</p>
                <p data-style-id="stylo-708" id="el-382" className="text-xs mt-1">I can help prioritize, suggest times, or reorganize your day.</p>
                {aiTaskList.length > 0 &&
              <p data-style-id="stylo-709" id="el-383" className="text-xs mt-2 text-primary">
                    I see {aiTaskList.length} task{aiTaskList.length > 1 ? 's' : ''} to help schedule.
                  </p>
              }
              </div> :

            chatHistory.map((msg) =>
            <div data-style-id="stylo-710" id="el-384"
            key={msg.id}
            className={cn(
              'p-3 rounded-lg text-sm',
              msg.role === 'user' ?
              'bg-primary text-primary-foreground ml-4' :
              'bg-muted mr-4'
            )}>

                  {msg.content}
                </div>
            )
            }
            {isLoading &&
            <div data-style-id="stylo-711" id="el-385" className="flex items-center gap-2 text-muted-foreground p-3">
                <Loader2 data-style-id="stylo-712" className="h-4 w-4 animate-spin" />
                <span data-style-id="stylo-713" id="el-386" className="text-sm">Thinking...</span>
              </div>
            }
          </div>
        </ScrollArea>

        {/* Input */}
        <form data-style-id="stylo-714" id="el-387" onSubmit={handleSubmit} className="flex gap-2 mt-3 flex-shrink-0">
          <Input data-style-id="stylo-715"
          placeholder="Ask about your day..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1" />

          <Button data-style-id="stylo-716" type="submit" size="icon" disabled={!message.trim() || isLoading}>
            <Send data-style-id="stylo-717" className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>);

}