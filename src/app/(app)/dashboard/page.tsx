import { DashboardSummary } from '@/components/dashboard/dashboard-summary';
import { ProjectList } from '@/components/dashboard/project-list';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div data-style-id="stylo-853" id="el-196" className="space-y-6">
      <DashboardSummary data-style-id="stylo-854" />
      <ProjectList data-style-id="stylo-855" />
    </div>);

}