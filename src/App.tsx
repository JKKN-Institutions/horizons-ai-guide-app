import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import CareerChat from "./pages/CareerChat";
import Register12thLearner from "./pages/Register12thLearner";
import RegisterLearner from "./pages/RegisterLearner";
import RegisterEmployer from "./pages/RegisterEmployer";
import EmployerRegistrationSuccess from "./pages/EmployerRegistrationSuccess";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerJobs from "./pages/EmployerJobs";
import EmployerPostJob from "./pages/EmployerPostJob";
import AdminLogin from "./pages/AdminLogin";
import AdminSetup from "./pages/AdminSetup";
import AdminDashboard from "./pages/AdminDashboard";
import CareerAssessmentColleges from "./pages/CareerAssessmentColleges";
import TakeAssessment from "./pages/TakeAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import CareerAssessment12thLearners from "./pages/CareerAssessment12thLearners";
import TakeStudentAssessment from "./pages/TakeStudentAssessment";
import StudentAssessmentResults from "./pages/StudentAssessmentResults";
import IndustryTrends from "./pages/IndustryTrends";
import SavedJobs from "./pages/SavedJobs";
import JobPortal from "./pages/JobPortal";
import PYQPractice from "./pages/PYQPractice";
import NotFound from "./pages/NotFound";

// JKKN Career Hub Pages
import JKKNCareerHub from "./pages/JKKNCareerHub";
import JKKNRegister from "./pages/JKKNRegister";
import JKKNRegisterSuccess from "./pages/JKKNRegisterSuccess";
import JKKNJobDetail from "./pages/JKKNJobDetail";
import JKKNProblemDetail from "./pages/JKKNProblemDetail";
import JKKNRoadmapDetail from "./pages/JKKNRoadmapDetail";
import JKKNLearnerProfile from "./pages/JKKNLearnerProfile";
import CareerAssessment from "./pages/CareerAssessment";
import AICareerPredictor from "./pages/AICareerPredictor";
import SavedCourses from "./pages/SavedCourses";

// Government Exams Pages
import GovernmentExams from "./pages/GovernmentExams";
import GovernmentExamCategory from "./pages/GovernmentExamCategory";
import GovernmentExamDetail from "./pages/GovernmentExamDetail";

// Study Abroad Pages
import AlumniVerification from "./pages/AlumniVerification";

// TN University Entrance Pages
import { UniversityEntranceExams, UniversityDetail, CourseDetail, ExamCalendar, MyReminders, UniversityCompare, SavedQuestions as TNSavedQuestions, PreparationTips as TNPreparationTips, TNStudyPlanner, TNMockTest, ChapterWeightage, PerformanceAnalytics, StudyStreaks, AIQuestionGenerator, DailyChallenge, TNForum, WeakTopicIdentifier, TNLeaderboard } from "./components/UniversityEntrance";
import TNUniversityBrowse from "./pages/TNUniversityBrowse";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Job Seeker Routes */}
                <Route path="/jobs" element={<JobPortal />} />
                <Route path="/jobs/*" element={<JobPortal />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/register/learner" element={<RegisterLearner />} />
                <Route path="/register/12th-learner" element={<Register12thLearner />} />
                
                {/* Employer Routes */}
                <Route path="/register/employer" element={<RegisterEmployer />} />
                <Route path="/employer/register/success" element={<EmployerRegistrationSuccess />} />
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/profile" element={<EmployerProfile />} />
                <Route path="/employer/jobs" element={<EmployerJobs />} />
                <Route path="/employer/jobs/new" element={<EmployerPostJob />} />
                <Route path="/employer/jobs/:id/edit" element={<EmployerPostJob />} />
                
                {/* Student Routes */}
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/career-assessment" element={<AICareerPredictor />} />
                <Route path="/career-assessment/chat" element={<CareerChat />} />
                <Route path="/career-assessment/colleges" element={<CareerAssessmentColleges />} />
                <Route path="/career-assessment/take/:type" element={<TakeAssessment />} />
                <Route path="/career-assessment/results/:attemptId" element={<AssessmentResults />} />
                <Route path="/career-assessment/12th-learners" element={<CareerAssessment12thLearners />} />
                <Route path="/career-assessment/12th-learners/take" element={<TakeStudentAssessment />} />
                <Route path="/career-assessment/12th-learners/results/:attemptId" element={<StudentAssessmentResults />} />
                <Route path="/career-assessment/industry-trends" element={<IndustryTrends />} />
                <Route path="/career-assessment/pyq-practice" element={<PYQPractice />} />
                <Route path="/career-assessment/boosting" element={<CareerAssessment />} />
                <Route path="/career-assessment/ai-predictor" element={<AICareerPredictor />} />
                <Route path="/career-assessment/saved-courses" element={<SavedCourses />} />
                
                {/* Government Exams Routes */}
                <Route path="/government-exams" element={<GovernmentExams />} />
                <Route path="/government-exams/:categoryId" element={<GovernmentExamCategory />} />
                <Route path="/government-exams/:categoryId/:examId" element={<GovernmentExamDetail />} />
                
{/* TN University Entrance Exams Routes */}
                <Route path="/tn-university-entrance" element={<UniversityEntranceExams />} />
                <Route path="/tn-university-entrance/browse" element={<TNUniversityBrowse />} />
                <Route path="/tn-university-entrance/exam-calendar" element={<ExamCalendar />} />
                <Route path="/tn-university-entrance/my-reminders" element={<MyReminders />} />
                <Route path="/tn-university-entrance/compare" element={<UniversityCompare />} />
                <Route path="/tn-university-entrance/saved-questions" element={<TNSavedQuestions />} />
                <Route path="/tn-university-entrance/preparation-tips" element={<TNPreparationTips />} />
                <Route path="/tn-university-entrance/study-planner" element={<TNStudyPlanner />} />
                <Route path="/tn-university-entrance/mock-test" element={<TNMockTest />} />
                <Route path="/tn-university-entrance/chapter-weightage" element={<ChapterWeightage />} />
                <Route path="/tn-university-entrance/analytics" element={<PerformanceAnalytics />} />
                <Route path="/tn-university-entrance/streaks" element={<StudyStreaks />} />
                <Route path="/tn-university-entrance/ai-questions" element={<AIQuestionGenerator />} />
                <Route path="/tn-university-entrance/daily-challenge" element={<DailyChallenge />} />
                <Route path="/tn-university-entrance/forum" element={<TNForum />} />
                <Route path="/tn-university-entrance/weak-topics" element={<WeakTopicIdentifier />} />
                <Route path="/tn-university-entrance/leaderboard" element={<TNLeaderboard />} />
                <Route path="/tn-university-entrance/:universityId" element={<UniversityDetail />} />
                <Route path="/tn-university-entrance/:universityId/:courseId" element={<CourseDetail />} />
                
{/* Admin Routes */}
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/setup" element={<AdminSetup />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/alumni-verification" element={<AlumniVerification />} />
                
                {/* JKKN Career Hub Routes */}
                <Route path="/jkkn" element={<JKKNCareerHub />} />
                <Route path="/jkkn/register" element={<JKKNRegister />} />
                <Route path="/jkkn/register/success" element={<JKKNRegisterSuccess />} />
                <Route path="/jkkn/job/:id" element={<JKKNJobDetail />} />
                <Route path="/jkkn/problem/:id" element={<JKKNProblemDetail />} />
                <Route path="/jkkn/roadmap/:id" element={<JKKNRoadmapDetail />} />
                <Route path="/jkkn/learner/:id" element={<JKKNLearnerProfile />} />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
}

export default App;