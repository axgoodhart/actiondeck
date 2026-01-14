'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export function TagsInput({
  tags,
  onChange,
  suggestions = [],
  placeholder = 'Add tag...',
  className,
  readOnly = false
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input and exclude already added tags
  const filteredSuggestions = suggestions.filter(
    (s) =>
    s.toLowerCase().includes(inputValue.toLowerCase()) &&
    !tags.includes(s)
  );

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAddTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag on backspace if input is empty
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div data-style-id="stylo-376" id="el-112" ref={containerRef} className={cn('space-y-2', className)}>
      {/* Tags display */}
      <div data-style-id="stylo-377" id="el-113" className="flex flex-wrap gap-2">
        {tags.map((tag) =>
        <Badge data-style-id="stylo-378"
        key={tag}
        variant="secondary"
        className="px-2 py-1 text-xs flex items-center gap-1">

            #{tag}
            {!readOnly &&
          <button data-style-id="stylo-379" id="el-114"
          type="button"
          onClick={() => handleRemoveTag(tag)}
          className="ml-1 hover:text-destructive transition-colors">

                <X data-style-id="stylo-380" className="h-3 w-3" />
              </button>
          }
          </Badge>
        )}
      </div>

      {/* Input for adding new tags */}
      {!readOnly &&
      <div data-style-id="stylo-381" id="el-115" className="relative">
          <Input data-style-id="stylo-382"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="text-sm" />


          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 &&
        <div data-style-id="stylo-383" id="el-116" className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-auto">
              {filteredSuggestions.map((suggestion) =>
          <button data-style-id="stylo-384" id="el-117"
          key={suggestion}
          type="button"
          onClick={() => handleAddTag(suggestion)}
          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2">

                  <Plus data-style-id="stylo-385" className="h-3 w-3" />
                  {suggestion}
                </button>
          )}
            </div>
        }
        </div>
      }

      {!readOnly &&
      <p data-style-id="stylo-386" id="el-118" className="text-xs text-muted-foreground">
          Press Enter or comma to add a tag
        </p>
      }
    </div>);

}

// Simple tag display component for cards
export function TagBadges({
  tags,
  max = 3,
  className




}: {tags: string[];max?: number;className?: string;}) {
  const displayTags = tags.slice(0, max);
  const remaining = tags.length - max;

  return (
    <div data-style-id="stylo-387" id="el-119" className={cn('flex flex-wrap gap-1', className)}>
      {displayTags.map((tag) =>
      <span data-style-id="stylo-388" id="el-120"
      key={tag}
      className="px-2 py-0.5 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50">

          #{tag}
        </span>
      )}
      {remaining > 0 &&
      <span data-style-id="stylo-389" id="el-121" className="px-2 py-0.5 text-xs rounded-full bg-muted/30 text-muted-foreground">
          +{remaining}
        </span>
      }
    </div>);

}