import { CollegesPageLayout } from '@/components/CollegesPageLayout';
import { CollegeSearch } from '@/components/CollegeSearch';
import { ScholarshipFinder } from '@/components/ScholarshipFinder';
import { EduCutoff } from '@/components/EduCutoff';
import { EntranceExams } from '@/components/EntranceExams';
import { CounsellingSimulator } from '@/components/CounsellingSimulator';
import { PreviousYearQuestions } from '@/components/PreviousYearQuestions';
import { GovernmentJobs } from '@/components/GovernmentJobs';
import { UniversityEntranceExams } from '@/components/UniversityEntrance';
import { CourseExplorer } from '@/components/CourseExplorer';

export const FindCollegesPage = () => (
  <CollegesPageLayout activeTab="colleges">
    <CollegeSearch />
  </CollegesPageLayout>
);

export const ScholarshipsPage = () => (
  <CollegesPageLayout activeTab="scholarships">
    <ScholarshipFinder />
  </CollegesPageLayout>
);

export const EduCutoffPage = () => (
  <CollegesPageLayout activeTab="educutoff">
    <EduCutoff />
  </CollegesPageLayout>
);

export const EntranceExamsPage = () => (
  <CollegesPageLayout activeTab="entranceexams">
    <EntranceExams />
  </CollegesPageLayout>
);

export const CounsellingPage = () => (
  <CollegesPageLayout activeTab="counselling">
    <CounsellingSimulator />
  </CollegesPageLayout>
);

export const PYQPage = () => (
  <CollegesPageLayout activeTab="pyq">
    <PreviousYearQuestions />
  </CollegesPageLayout>
);

export const GovtJobsPage = () => (
  <CollegesPageLayout activeTab="govtjobs">
    <GovernmentJobs />
  </CollegesPageLayout>
);

export const TNUniversityPage = () => (
  <CollegesPageLayout activeTab="tnuniversity">
    <UniversityEntranceExams />
  </CollegesPageLayout>
);

export const CourseExplorerPage = () => (
  <CollegesPageLayout activeTab="courseexplorer">
    <CourseExplorer />
  </CollegesPageLayout>
);
