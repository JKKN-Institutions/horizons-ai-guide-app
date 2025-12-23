import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Briefcase, BookOpen, Code, Home, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JKKNRegisterSuccess() {
  const [learnerNumber, setLearnerNumber] = useState<number | null>(null);

  useEffect(() => {
    // Get the learner number from localStorage if stored during registration
    const storedNumber = localStorage.getItem('jkkn_learner_number');
    if (storedNumber) {
      setLearnerNumber(parseInt(storedNumber));
      localStorage.removeItem('jkkn_learner_number');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#2E7D32] flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">
            🎉 Registration Successful!
          </h1>
          <p className="text-[#64748B] text-lg">
            Welcome to JKKN Community
          </p>
        </div>

        {/* Learner Badge */}
        {learnerNumber && (
          <div className="bg-[#2E7D32] text-white rounded-2xl p-4 text-center mb-6">
            <p className="text-sm opacity-90">You are Learner</p>
            <p className="text-3xl font-bold">#{learnerNumber}</p>
          </div>
        )}

        {/* Highlight Box */}
        <div className="bg-gradient-to-r from-[#FFD54F] to-[#FFC107] rounded-2xl p-4 text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-[#1E293B]" />
            <p className="text-[#1E293B] font-semibold">
              You're now at the TOP of the Learners list!
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-medium text-[#64748B] uppercase tracking-wide text-center">
            What's Next?
          </h3>
          
          <Link to="/jkkn?tab=jobs" className="block">
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-[#1E293B]">💼 Browse Jobs</p>
                <p className="text-sm text-[#64748B]">500+ opportunities waiting</p>
              </div>
            </div>
          </Link>

          <Link to="/jkkn?tab=learn" className="block">
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-[#1E293B]">📚 Start Learning</p>
                <p className="text-sm text-[#64748B]">100+ free courses</p>
              </div>
            </div>
          </Link>

          <Link to="/jkkn?tab=practice" className="block">
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-[#1E293B]">💻 Practice Coding</p>
                <p className="text-sm text-[#64748B]">200+ problems to solve</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Go Home Button */}
        <Link to="/jkkn">
          <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-6 text-lg rounded-xl">
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
