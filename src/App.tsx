import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import CareerChat from "./pages/CareerChat";
import Register12thLearner from "./pages/Register12thLearner";
import RegisterLearner from "./pages/RegisterLearner";
import RegisterEmployer from "./pages/RegisterEmployer";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/career-assessment/chat" element={<CareerChat />} />
              <Route path="/register/12th-learner" element={<Register12thLearner />} />
              <Route path="/register/learner" element={<RegisterLearner />} />
              <Route path="/register/employer" element={<RegisterEmployer />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/setup" element={<AdminSetup />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/career-assessment/colleges" element={<CareerAssessmentColleges />} />
              <Route path="/career-assessment/take/:type" element={<TakeAssessment />} />
              <Route path="/career-assessment/results/:attemptId" element={<AssessmentResults />} />
              <Route path="/career-assessment/12th-learners" element={<CareerAssessment12thLearners />} />
              <Route path="/career-assessment/12th-learners/take" element={<TakeStudentAssessment />} />
              <Route path="/career-assessment/12th-learners/results/:attemptId" element={<StudentAssessmentResults />} />
              <Route path="/career-assessment/industry-trends" element={<IndustryTrends />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/jobs" element={<JobPortal />} />
              <Route path="/jobs/*" element={<JobPortal />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;