
'use client';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, LayoutDashboard, CheckSquare, BotMessageSquare, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';
import { SettingsModal } from './settings-modal';
import { FiltersModal } from './filters-modal';

const navItems = [
{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
{ href: '/tasks', icon: CheckSquare, label: 'Tasks' },
{ href: '/prioritize', icon: BotMessageSquare, label: 'AI Prioritizer' }];


export function Header() {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => pathname.startsWith(item.href))?.label || 'Dashboard';
  const [open, setOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  return (
    <header data-style-id="stylo-462" id="layout-header" className="sticky top-0 z-30 flex h-14 items-center gap-4 app-header-bar px-4 sm:static sm:h-auto sm:px-6">
      <Sheet data-style-id="stylo-463">
        <SheetTrigger data-style-id="stylo-464" asChild>
          <Button data-style-id="stylo-465" id="layout-header-mobile-trigger" size="icon" variant="outline" className="sm:hidden">
            <PanelLeft data-style-id="stylo-466" className="h-5 w-5" />
            <span data-style-id="stylo-467" id="el-130" className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent data-style-id="stylo-468" side="left" className="sm:max-w-xs">
          <SheetTitle data-style-id="stylo-469" className="sr-only">Main Menu</SheetTitle>
          <nav data-style-id="stylo-470" id="el-131" className="grid gap-6 text-lg font-medium">
            <Link data-style-id="stylo-471"
            href="/dashboard"
            className="group flex h-10 items-center gap-4 rounded-full text-lg font-semibold">

              <div data-style-id="stylo-472" id="el-132" className="bg-primary rounded-full p-2">
                <Logo data-style-id="stylo-473" className="h-5 w-5 text-primary-foreground" />
              </div>
              <span data-style-id="stylo-474" id="el-133" className="font-headline text-xl text-primary">Action Deck</span>
            </Link>
            {navItems.map((item) =>
            <Link data-style-id="stylo-475"
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              pathname.startsWith(item.href) && "text-foreground"
            )}>

                <item.icon data-style-id="stylo-476" className="h-5 w-5" />
                {item.label}
              </Link>
            )}
            <button data-style-id="stylo-477" id="el-134"
            onClick={(e) => {e.preventDefault();const btn = document.getElementById('header-settings-trigger');(btn as HTMLButtonElement)?.click();}}
            className="text-left flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">

              <Settings data-style-id="stylo-478" className="h-5 w-5" />
              Settings
            </button>
          </nav>
        </SheetContent>
      </Sheet>
      
      <Breadcrumb data-style-id="stylo-479" id="layout-header-breadcrumb" className="hidden md:flex">
        <BreadcrumbList data-style-id="stylo-480">
          <BreadcrumbItem data-style-id="stylo-481">
            <BreadcrumbLink data-style-id="stylo-482" asChild>
              <Link data-style-id="stylo-483" href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator data-style-id="stylo-484" />
          <BreadcrumbItem data-style-id="stylo-485">
            <BreadcrumbPage data-style-id="stylo-486">{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div data-style-id="stylo-487" id="el-135" className="relative ml-auto flex items-center gap-2">
        <ThemeToggle data-style-id="stylo-488" />
        <Button data-style-id="stylo-489" id="layout-header-settings-trigger" size="icon" variant="outline" onClick={() => setOpen(true)} aria-label="Settings">
          <Settings data-style-id="stylo-490" className="h-8 w-8" />
        </Button>
        {/* Hidden trigger for filters modal - used by sidebar */}
        <button data-style-id="stylo-491" id="header-filters-trigger" className="hidden" onClick={() => setFiltersOpen(true)} aria-hidden="true" />
        <SettingsModal data-style-id="stylo-492" open={open} onOpenChange={setOpen} />
        <FiltersModal data-style-id="stylo-493" open={filtersOpen} onOpenChange={setFiltersOpen} />
      </div>
    </header>);

}