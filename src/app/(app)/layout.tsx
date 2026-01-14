import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { ProjectProvider } from '@/context/project-context';
import { SettingsProvider } from '@/context/settings-context';
import { FilterInitializer } from '@/components/layout/filter-initializer';

// Force dynamic rendering for all app routes using Firebase
export const dynamic = 'force-dynamic';

export default function AppLayout({
  children


}: {children: React.ReactNode;}) {

  return (
    <SettingsProvider data-style-id="stylo-1107">
      <ProjectProvider data-style-id="stylo-1108">
      {/* Background panel layer - sits behind everything */}
      <div data-style-id="stylo-1109" id="app-background-panel" className="app-background-panel fixed inset-0 -z-10" />

      {/* Filter container - CSS filters are applied to this */}
      <div data-style-id="stylo-1110" id="app-filter-container" className="flex min-h-screen w-full flex-col bg-muted/40">
        <AppSidebar data-style-id="stylo-1111" />
        <div data-style-id="stylo-1112" id="el-330" className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header data-style-id="stylo-1113" />
          <main data-style-id="stylo-1114" id="el-331" className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>

      {/* Initializes filters from saved settings */}
      <FilterInitializer data-style-id="stylo-1115" />
    </ProjectProvider>
    </SettingsProvider>);

}