import { UserPlus } from 'lucide-react';
import { JKKNNavbar } from '@/components/JKKN/JKKNNavbar';
import { LearnerRegistrationForm } from '@/components/JKKN/LearnerRegistrationForm';

export default function JKKNRegister() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fresh-green-bg via-white to-fresh-gold-light">
      <JKKNNavbar />
      
      {/* Header */}
      <div className="fresh-page-header mx-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Register as JKKN Learner
            </h1>
            <p className="text-fresh-gold-medium font-tamil mt-1">
              ஜேகேகேஎன் கற்றவராக பதிவு செய்க
            </p>
          </div>
        </div>
        <p className="text-white/80 mt-4 max-w-2xl">
          Join the JKKN Career Hub! No password needed - just fill in your details 
          and appear at the top of the learners directory instantly.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl">
          <LearnerRegistrationForm />
        </div>
      </div>
    </div>
  );
}
