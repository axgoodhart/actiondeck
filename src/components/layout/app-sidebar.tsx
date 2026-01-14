'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  BotMessageSquare,
  Settings,
  ChevronDown,
  FolderInput,
  CalendarDays } from
'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { DOMAIN_LIST } from '@/lib/domains';
import { useState } from 'react';

const navItems = [
{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
{ href: '/today', icon: CalendarDays, label: 'Today' },
{ href: '/tasks', icon: CheckSquare, label: 'Tasks' },
{ href: '/prioritize', icon: BotMessageSquare, label: 'AI Prioritizer' },
{ href: '/import', icon: FolderInput, label: 'AI Import' }];


export function AppSidebar() {
  const pathname = usePathname();
  const [domainsOpen, setDomainsOpen] = useState(false);

  return (
    <aside data-style-id="stylo-394" id="layout-sidebar" className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col app-sidebar sm:flex">
      <nav data-style-id="stylo-395" id="layout-sidebar-nav" className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link data-style-id="stylo-396"
        id="layout-sidebar-logo"
        href="/dashboard"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">

          <Logo data-style-id="stylo-397" className="h-5 w-5 text-primary-foreground transition-all group-hover:scale-110" />
          <span data-style-id="stylo-398" id="el-126" className="sr-only">Action Deck</span>
        </Link>

        <TooltipProvider data-style-id="stylo-399">
          {navItems.map((item) => {
            const navId = `layout-sidebar-nav-${item.href.split('/').pop()}`;
            return (
              <Tooltip data-style-id="stylo-400" key={item.href}>
                <TooltipTrigger data-style-id="stylo-401" asChild>
                  <Link data-style-id="stylo-402"
                  id={navId}
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
                  )}>

                    <item.icon data-style-id="stylo-403" className="h-5 w-5" />
                    <span data-style-id="stylo-404" id="el-127" className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent data-style-id="stylo-405" side="right">{item.label}</TooltipContent>
              </Tooltip>);

          })}

          {/* Domains Section */}
          <Collapsible data-style-id="stylo-406" id="layout-sidebar-domains" open={domainsOpen} onOpenChange={setDomainsOpen}>
            <Tooltip data-style-id="stylo-407">
              <TooltipTrigger data-style-id="stylo-408" asChild>
                <CollapsibleTrigger data-style-id="stylo-409"
                id="layout-sidebar-domains-trigger"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathname.startsWith('/domain') && "bg-accent text-accent-foreground"
                )}>

                  <ChevronDown data-style-id="stylo-410" className={cn("h-5 w-5 transition-transform", domainsOpen && "rotate-180")} />
                  <span data-style-id="stylo-411" id="el-128" className="sr-only">Styles</span>
                </CollapsibleTrigger>
              </TooltipTrigger>
              <TooltipContent data-style-id="stylo-412" side="right">Domains</TooltipContent>
            </Tooltip>

            <CollapsibleContent data-style-id="stylo-413" className="space-y-1 mt-1">
              {DOMAIN_LIST.map((domain) => {
                const Icon = domain.icon;
                const isActive = pathname === `/domain/${domain.value}`;

                return (
                  <Tooltip data-style-id="stylo-414" key={domain.value}>
                    <TooltipTrigger data-style-id="stylo-415" asChild>
                      <Link data-style-id="stylo-416"
                      href={`/domain/${domain.value}`}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-all mx-auto",
                        isActive ?
                        "text-white" :
                        "text-muted-foreground hover:text-foreground"
                      )}
                      style={
                      isActive ?
                      {
                        background: domain.bgGradient,
                        boxShadow: `0 2px 8px ${domain.color}40`
                      } :
                      undefined
                      }>

                        <Icon data-style-id="stylo-417" className="h-4 w-4" style={!isActive ? { color: domain.color } : undefined} />
                        <span data-style-id="stylo-418" id="el-129" className="sr-only">{domain.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent data-style-id="stylo-419" side="right">{domain.label}</TooltipContent>
                  </Tooltip>);

              })}
            </CollapsibleContent>
          </Collapsible>

          <Tooltip data-style-id="stylo-420">
            <TooltipTrigger data-style-id="stylo-421" asChild>
              <button data-style-id="stylo-422" id="layout-sidebar-settings"
              onClick={() => {const btn = document.getElementById('header-filters-trigger') as HTMLButtonElement | null;btn?.click();}}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              aria-label="Filters">

                <Settings data-style-id="stylo-423" className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent data-style-id="stylo-424" side="right">Filters</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>);

}